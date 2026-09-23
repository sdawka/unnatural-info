import React, { useEffect, useState } from 'react';
import { ROUTES, gardenOutcome, parseSavedAnswers, recommendRoute, type Answers, type Field, type Practice } from '../lib/practices';
import '../styles/practice.css';

type Props = { practice: Practice };
type WidgetProps = { answers: Answers; change: (key: string, value: string) => void };

const widgetLabels: Record<string, string> = {
  priority: 'Route priority', stepFree: 'Need a route without steps', reveal: 'Extra context revealed',
  access: 'Garden access', work: 'Garden maintenance', voice: 'Garden decisions', weather: 'Weather',
  label: 'Label considered', comparison: 'Experimental comparison', mode: 'Response considered', order: 'Order of concerns',
};

function Choice({ label, name, value, options, change }: { label: string; name: string; value: string; options: [string, string][]; change: WidgetProps['change'] }) {
  return <label className="practice-field"><span>{label}</span><select name={name} value={value} onChange={e => change(name, e.target.value)}>{options.map(([key, text]) => <option key={key} value={key}>{text}</option>)}</select></label>;
}

function FieldInput({ field, answers, change }: { field: Field } & WidgetProps) {
  const value = answers[field.key] ?? '';
  const id = `answer-${field.key}`;
  return <div className="practice-field">
    <label htmlFor={id}>{field.label}</label>
    {field.hint && <p id={`${id}-hint`} className="practice-hint">{field.hint}</p>}
    {field.type === 'range' ? <div className="practice-range">
      <input id={id} name={field.key} type="range" min="0" max="100" step="5" value={/^\d+$/.test(value) ? Math.min(100, Number(value)) : 50} aria-valuetext={value ? `${value} percent` : 'Not set; slider starts at 50 percent'} onChange={e => change(field.key, e.target.value)} />
      <output htmlFor={id}>{value ? `${value}%` : 'Not set'}</output>
      <span className="practice-hint">A personal estimate. The slider starts in the middle; nothing is recorded until you move it.</span>
    </div> : field.type === 'date' ? <input id={id} name={field.key} type="date" value={value} onChange={e => change(field.key, e.target.value)} />
      : <textarea id={id} name={field.key} rows={3} maxLength={12000} value={value} aria-describedby={field.hint ? `${id}-hint` : undefined} onChange={e => change(field.key, e.target.value)} />}
  </div>;
}

function MapWidget({ answers, change, prediction }: WidgetProps & { prediction: Field }) {
  const revealed = answers.reveal === 'yes';
  const stepFree = answers.stepFree === 'yes';
  const priority = answers.priority || 'time';
  const recommended = recommendRoute(priority, stepFree);
  return <section className="practice-model" aria-labelledby="map-model-heading">
    <h2 id="map-model-heading">Three ways to get there</h2>
    <Choice label="What should the map favor?" name="priority" value={priority} options={[[ 'time', 'Less time' ], [ 'cost', 'Less money' ]]} change={change} />
    <div className="practice-table-wrap"><table><caption>Invented routes to the same destination</caption><thead><tr><th scope="col">Route</th><th scope="col">Minutes</th><th scope="col">Cost</th><th scope="col">Steps</th></tr></thead><tbody>{ROUTES.map(route => <tr key={route.name}><th scope="row">{route.name}</th><td>{route.minutes}</td><td>${route.cost}</td><td>{revealed ? route.steps : 'Not shown'}</td></tr>)}</tbody></table></div>
    <p className="practice-result" aria-live="polite">With these priorities: <strong>{recommended.name}</strong>.</p>
    <FieldInput field={prediction} answers={answers} change={change} />
    <p className="practice-hint">Pause for a guess before opening the detail. Thinking it through is enough; writing is optional.</p>
    {!revealed ? <button type="button" onClick={() => change('reveal', 'yes')}>Reveal what the map omitted</button> : <div className="practice-reveal">
      <p>The footbridge has 38 steps. Suppose you are traveling with a wheelchair or a heavy trolley. The free shortcut may be unusable.</p>
      <label className="practice-check"><input type="checkbox" checked={stepFree} onChange={e => change('stepFree', e.target.checked ? 'yes' : 'no')} /> Only recommend routes without steps</label>
      <p className="practice-hint">Cost ties are resolved by time. Traffic, distance to the bus stop, and service reliability are not modeled.</p>
    </div>}
  </section>;
}

function GardenWidget({ answers, change }: WidgetProps) {
  const access = answers.access || 'open';
  const work = answers.work || 'volunteer';
  const voice = answers.voice || 'few';
  const weather = answers.weather || 'normal';
  const result = gardenOutcome(access, work, voice, weather);
  return <section className="practice-model" aria-labelledby="garden-model-heading">
    <h2 id="garden-model-heading">One invented season</h2>
    <div className="practice-controls">
      <Choice label="Who gets access?" name="access" value={access} options={[[ 'open', 'All ten households' ], [ 'members', 'Six registered households' ]]} change={change} />
      <Choice label="How is maintenance arranged?" name="work" value={work} options={[[ 'volunteer', 'Whoever volunteers' ], [ 'shared', 'An agreed shared rota' ]]} change={change} />
      <Choice label="Who can change the rules?" name="voice" value={voice} options={[[ 'few', 'Four organizers' ], [ 'all', 'All ten households' ]]} change={change} />
      <Choice label="What is the weather like?" name="weather" value={weather} options={[[ 'normal', 'Ordinary rainfall' ], [ 'dry', 'A dry season' ]]} change={change} />
    </div>
    <dl className="practice-outcomes" aria-live="polite">
      <div><dt>Harvest units</dt><dd>{result.harvest}</dd></div>
      <div><dt>Hours of work and meetings</dt><dd>{result.hours}</dd></div>
      <div><dt>Households without access</dt><dd>{result.excluded}</dd></div>
      <div><dt>Households without a vote</dt><dd>{result.unheard}</dd></div>
    </dl>
    <details><summary>Open the assumptions behind these numbers</summary>
      <p>Rain provides 100 water units, or 60 in a dry season. Demand is 120 with open access and 75 with registration. This model assigns 4 hours of maintenance to volunteering and 8 to a rota. Meetings take 1 hour with four organizers and 4 with everyone.</p>
      <p>Harvest = 0.6 × the smaller of water and demand, plus 3 × maintenance hours, minus 2 × meeting hours, rounded down. Hours are maintenance plus meetings.</p>
      <p>These choices deliberately give participation a time cost and shared work a harvest benefit. Real communities might show different effects. Unequal ability to contribute, trust, ownership, and the distribution of food are missing. A higher harvest cannot settle what is fair.</p>
    </details>
  </section>;
}

function ExperimentWidget({ answers, change, prediction }: WidgetProps & { prediction: Field }) {
  const comparison = answers.comparison || 'many';
  const revealed = answers.reveal === 'yes';
  return <section className="practice-model" aria-labelledby="experiment-model-heading">
    <h2 id="experiment-model-heading">Choose a comparison</h2>
    <Choice label="What will you compare?" name="comparison" value={comparison} change={(key, value) => { change(key, value); change('reveal', ''); }} options={[[ 'many', 'Change salt, flour, and temperature together' ], [ 'salt', 'Change salt; keep flour and temperature the same' ]]} />
    <p className="practice-hint">Imagine batches made on comparable days and tasters who do not know which batch is which. Even this leaves ingredients, ovens, and people that vary.</p>
    <FieldInput field={prediction} answers={answers} change={change} />
    <p className="practice-hint">Make a guess before looking. You can hold it in mind or write it down.</p>
    {!revealed ? <button type="button" onClick={() => change('reveal', 'yes')}>Look at three rounds of results</button> : <div className="practice-reveal">
      <div className="practice-table-wrap"><table><caption>Invented taste ratings, out of ten</caption><thead><tr><th scope="col">Round</th><th scope="col">Original recipe</th><th scope="col">Changed recipe</th></tr></thead><tbody>{[0, 1, 2].map(i => <tr key={i}><th scope="row">{i + 1}</th><td>{[5, 6, 5][i]}</td><td>{(comparison === 'salt' ? [6, 5, 6] : [7, 7, 8])[i]}</td></tr>)}</tbody></table></div>
      <p>{comparison === 'salt' ? 'The small differences go both ways. These results do not establish a reliable salt effect. More well-designed comparisons could help.' : 'The changed recipe did better here. You still cannot tell whether salt, flour, temperature, or their combination explains the difference.'}</p>
    </div>}
  </section>;
}

function ModeWidget({ answers, change }: WidgetProps) {
  const mode = answers.mode || '';
  const responses: Record<string, string> = {
    learn: 'Look for a missing fact or another explanation. Set a limit on investigation if more information is becoming a way to postpone a small, reversible step.',
    create: 'Try a small action whose effects you can notice. Ask whether the other person has room to decline and whether the goal is still worth pursuing.',
    become: 'Attend without requiring an immediate solution. Leave room for the situation to show you something. Receptivity can coexist with a necessary practical step.',
    rest: 'An exhausted person may need fewer demands. Consider what can wait, what needs support, and whether the conditions themselves need to change.',
    help: 'Another person may bring skill, support, or power to change the conditions. Choose an appropriate source of help and a specific thing to ask for.',
  };
  return <section className="practice-model" aria-labelledby="mode-model-heading"><h2 id="mode-model-heading">Which response is worth trying?</h2>
    <Choice label="A possible response" name="mode" value={mode} change={change} options={[[ '', 'Choose a response' ], [ 'learn', 'Investigate — Learning' ], [ 'create', 'Try a small act — Creating' ], [ 'become', 'Attend and make room — Becoming' ], [ 'rest', 'Rest or reduce demands' ], [ 'help', 'Ask for support or change the conditions' ]]} />
    <p className="practice-result" aria-live="polite">{responses[mode] || 'Several responses can fit. Choose one to explore its tradeoffs.'}</p>
  </section>;
}

function LabelWidget({ answers, change }: WidgetProps) {
  const selected = answers.label || 'lazy';
  const questions: Record<string, string> = {
    lazy: 'Are you turning one undone task into a stable trait? What other observations would that require?',
    overloaded: 'What competing demands have you actually seen? A kinder explanation still needs evidence.',
    uninterested: 'Uninterested in the task, this arrangement, or being here? Those are different possibilities.',
  };
  return <section className="practice-model" aria-labelledby="label-model-heading"><h2 id="label-model-heading">The dishes are still on the table.</h2>
    <Choice label="Try a label" name="label" value={selected} change={change} options={[[ 'lazy', 'Lazy' ], [ 'overloaded', 'Overloaded' ], [ 'uninterested', 'Uninterested' ]]} />
    <p className="practice-result" aria-live="polite">{questions[selected]}</p>
  </section>;
}

export default function PracticeWorkbench({ practice }: Props) {
  const [answers, setAnswers] = useState<Answers>({});
  const [message, setMessage] = useState('Your notes are unsaved.');
  const [ready, setReady] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const storageKey = `unnatural:practice:v1:${practice.slug}`;
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const restored = parseSavedAnswers(raw);
      if (restored) { setAnswers(restored); setMessage('Your saved note is open. Changes are saved only when you choose Save.'); }
      else if (raw) setMessage('The saved note could not be read. It has not been overwritten.');
    } catch { setMessage('Browser storage is unavailable. You can still write here and download your note.'); }
    setReady(true);
  }, [storageKey]);

  function change(key: string, value: string) {
    setAnswers(previous => ({ ...previous, [key]: value }));
    setMessage('Unsaved changes. Save on this device or download a copy to keep them.');
  }
  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify({ version: 1, answers, updated: new Date().toISOString() })); setMessage('Saved on this device. You can return to this page later.'); }
    catch { setMessage('Could not save on this device. Download a copy to keep your note.'); }
  }
  function clear() {
    try { localStorage.removeItem(storageKey); setAnswers({}); setMessage('The saved note and the notes on this page have been cleared.'); setConfirmClear(false); }
    catch { setMessage('Could not remove the saved note. You can clear this site’s data in your browser settings.'); }
  }
  function download() {
    const labels = { ...widgetLabels, ...Object.fromEntries(practice.fields.map(f => [f.key, f.label])) };
    const body = `# ${practice.title}\n\n${new Date().toLocaleDateString()}\n\n` + Object.entries(answers).filter(([, value]) => value.trim()).map(([key, value]) => `## ${labels[key] || key}\n\n${value}\n`).join('\n') + `\n---\n${practice.note}\n`;
    const url = URL.createObjectURL(new Blob([body], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = `unnatural-${practice.slug}.md`; document.body.append(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage('A copy was downloaded. Saving on this device is a separate choice.');
  }

  const props = { answers, change };
  const before = practice.fields.filter(f => !f.after);
  const after = practice.fields.filter(f => f.after);
  const concernKeys = ['urge', 'enjoyment', 'obligation', 'fear', 'value'];
  const savedOrder = (answers.order || '').split(',');
  const order = savedOrder.length === 5 && new Set(savedOrder).size === 5 && savedOrder.every(key => concernKeys.includes(key)) ? savedOrder : concernKeys;
  function reorder(key: string, direction: number) {
    const next = [...order]; const index = next.indexOf(key); const target = index + direction;
    if (target >= 0 && target < next.length) { [next[index], next[target]] = [next[target], next[index]]; change('order', next.join(',')); }
  }

  return <div className="practice-workbench">
    <p className="practice-privacy">Write here, use paper, or just think it through. Notes stay in this page unless you choose to save them on this device or download a copy. These exercises do not send your answers to a server.</p>
    <fieldset disabled={!ready} className="practice-inputs"><legend className="visually-hidden">Your exercise</legend>
      {practice.slug === 'maps' && <MapWidget {...props} prediction={before[0]} />}
      {practice.slug === 'garden' && <GardenWidget {...props} />}
      {practice.slug === 'labels' && <LabelWidget {...props} />}
      {practice.slug === 'modes' && <ModeWidget {...props} />}
      {practice.slug === 'wants' ? <>
        <FieldInput field={before[0]} {...props} />
        <p className="practice-hint">Move concerns into an order you want to consider. There is no correct ranking.</p>
        <ol className="practice-concerns">{order.map((key, index) => { const field = before.find(f => f.key === key)!; return <li key={key}>
          <FieldInput field={field} {...props} /><div className="practice-reorder"><button type="button" disabled={index === 0} onClick={() => reorder(key, -1)} aria-label={`Move ${field.label.toLowerCase()} earlier`}>↑ Earlier</button><button type="button" disabled={index === order.length - 1} onClick={() => reorder(key, 1)} aria-label={`Move ${field.label.toLowerCase()} later`}>↓ Later</button></div>
        </li>; })}</ol><FieldInput field={before[before.length - 1]} {...props} />
      </> : !['maps', 'experiment'].includes(practice.slug) && before.map(field => <FieldInput key={field.key} field={field} {...props} />)}
      {practice.slug === 'experiment' && <ExperimentWidget {...props} prediction={before[0]} />}
      {practice.slug === 'disagreement' && <section className="practice-model" aria-labelledby="disagreement-reveal-heading">
        <h2 id="disagreement-reveal-heading">Another piece of the story</h2>
        <p className="practice-hint">Consider your first account and one alternative before looking. You can do this without writing.</p>
        {answers.reveal === 'yes' ? <div className="practice-reveal"><p>In this imagined scene, your friend has been covering someone else's shifts and caring for a parent. They have not told you. They may still owe you a kinder reply.</p><p>This explains one possible scene. In your own conversation, their circumstances would be something to ask about, not something this page can know.</p></div> : <button type="button" onClick={() => change('reveal', 'yes')}>Reveal some missing context</button>}
      </section>}
      {after.length > 0 && <section className="practice-return" aria-labelledby="return-heading"><h2 id="return-heading">{practice.slug === 'one-week' || practice.slug === 'notebook' ? 'For later, if you return' : 'Look again'}</h2>{(practice.slug === 'one-week' || practice.slug === 'notebook') && <p className="practice-hint">Save or download your first note below so you can compare it with what happens.</p>}{after.map(field => <FieldInput key={field.key} field={field} {...props} />)}</section>}
    </fieldset>
    <p className="practice-note">{practice.note}</p>
    <div className="practice-save"><button type="button" disabled={!ready} onClick={save}>Save on this device</button><button type="button" disabled={!ready} onClick={download}>Download my note</button><button type="button" disabled={!ready} aria-expanded={confirmClear} aria-controls="clear-confirmation" onClick={() => setConfirmClear(true)}>Clear this note</button></div>
    <div id="clear-confirmation" hidden={!confirmClear}>{confirmClear && <fieldset className="practice-reveal"><legend>Clear this exercise's saved note and current writing?</legend><button type="button" onClick={clear}>Yes, clear this note</button> <button type="button" onClick={() => setConfirmClear(false)}>Keep it</button></fieldset>}</div>
    <p role="status" aria-live="polite" className="practice-status">{message}</p>
    <p className="practice-hint">A saved note is available to anyone using this browser profile. It will not follow you to another device. Browser data clearing may remove it.</p>
  </div>;
}
