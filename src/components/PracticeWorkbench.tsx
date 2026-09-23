import React, { useEffect, useState } from "react";
import {
  ROUTES,
  gardenOutcome,
  recommendRoute,
  type Answers,
  type Field,
  type Practice,
} from "../lib/practices";
import {
  BREAD_FEEDBACK,
  BREAD_RESULTS,
  LABEL_VIEWS,
  MODE_PASSES,
  PATTERN_INSTRUCTIONS,
  WINDOW_CONTEXT,
} from "../lib/practice-models";
import {
  createPracticeNote,
  legacyStorageKey,
  noteMarkdown,
  practiceStorageKey,
  readLegacyPracticeNote,
  readPracticeNote,
  type SavedNote,
} from "../lib/practice-notes";
import "../styles/practice.css";

type Props = { practice: Practice };
type WidgetProps = {
  answers: Answers;
  change: (key: string, value: string) => void;
};
const widgetLabels: Record<string, string> = {
  priority: "Route priority",
  stepFree: "Need a route without steps",
  reveal: "Extra context revealed",
  access: "Garden access",
  work: "Garden maintenance",
  voice: "Garden decisions",
  weather: "Weather",
  label: "Cup description selected",
  comparison: "Experimental comparison",
  mode: "Paper pass displayed",
  pattern: "Instruction displayed",
};
function defaults(slug: string): Answers {
  const options: Record<string, Answers> = {
    maps: { priority: "time", stepFree: "no", reveal: "no" },
    garden: {
      access: "open",
      work: "volunteer",
      voice: "few",
      weather: "normal",
    },
    experiment: { comparison: "many", reveal: "no" },
    modes: { mode: "learn" },
    labels: { label: "tool" },
    patterns: { pattern: "first" },
    disagreement: { reveal: "no" },
  };
  return options[slug] ?? {};
}
function Choice({
  label,
  name,
  value,
  options,
  change,
}: {
  label: string;
  name: string;
  value: string;
  options: [string, string][];
  change: WidgetProps["change"];
}) {
  return (
    <label className="practice-field">
      <span>{label}</span>
      <select
        name={name}
        value={value}
        onChange={(e) => change(name, e.target.value)}
      >
        {options.map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
function FieldInput({
  field,
  answers,
  change,
}: { field: Field } & WidgetProps) {
  const value = answers[field.key] ?? "";
  const id = `answer-${field.key}`;
  const estimate = /^\d+$/.test(value)
    ? Math.min(100, Number(value))
    : undefined;
  return (
    <div className="practice-field">
      <label htmlFor={id}>{field.label}</label>
      {field.hint && (
        <p id={`${id}-hint`} className="practice-hint">
          {field.hint}
        </p>
      )}
      {field.type === "range" ? (
        <div className="practice-range">
          <div className="practice-range-endpoints">
            <span>0%</span>
            <span>100%</span>
          </div>
          <input
            id={id}
            name={field.key}
            type="range"
            min="0"
            max="100"
            step="5"
            value={estimate ?? 50}
            aria-valuetext={
              estimate == null
                ? "Not set; slider starts at 50 percent"
                : `${estimate} percent`
            }
            onChange={(e) => change(field.key, e.target.value)}
          />
          <output htmlFor={id}>
            {estimate == null ? "Not set" : `${estimate}%`}
          </output>
          <span className="practice-hint">
            A personal estimate. Nothing is recorded until you move the slider.
          </span>
        </div>
      ) : field.type === "date" ? (
        <input
          id={id}
          name={field.key}
          type="date"
          value={value}
          onChange={(e) => change(field.key, e.target.value)}
        />
      ) : (
        <textarea
          id={id}
          name={field.key}
          rows={3}
          maxLength={12000}
          value={value}
          aria-describedby={field.hint ? `${id}-hint` : undefined}
          onChange={(e) => change(field.key, e.target.value)}
        />
      )}
    </div>
  );
}
function MapWidget({
  answers,
  change,
  prediction,
}: WidgetProps & { prediction: Field }) {
  const revealed = answers.reveal === "yes";
  const stepFree = answers.stepFree === "yes";
  const priority = answers.priority || "time";
  const recommended = recommendRoute(priority, stepFree);
  return (
    <section className="practice-model" aria-labelledby="map-model-heading">
      <h2 id="map-model-heading">Three ways to get there</h2>
      <Choice
        label="What should the map favor?"
        name="priority"
        value={priority}
        options={[
          ["time", "Less time"],
          ["cost", "Less money"],
        ]}
        change={change}
      />
      <div
        className="practice-table-wrap"
        tabIndex={0}
        aria-label="Scrollable route comparison table"
      >
        <table>
          <caption>Invented routes to the same shop</caption>
          <thead>
            <tr>
              <th scope="col">Route</th>
              <th scope="col">Minutes</th>
              <th scope="col">Cost</th>
              <th scope="col">Steps</th>
            </tr>
          </thead>
          <tbody>
            {ROUTES.map((route) => (
              <tr key={route.name}>
                <th scope="row">{route.name}</th>
                <td>{route.minutes}</td>
                <td>${route.cost}</td>
                <td>{revealed ? route.steps : "Not shown"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="practice-result" aria-live="polite">
        With these priorities: <strong>{recommended.name}</strong>.
      </p>
      <FieldInput field={prediction} answers={answers} change={change} />
      <p className="practice-hint">
        Pause for a guess. You can hold it in mind instead of writing.
      </p>
      {!revealed ? (
        <button type="button" onClick={() => change("reveal", "yes")}>
          Reveal what the map omitted
        </button>
      ) : (
        <div className="practice-reveal">
          <p>
            The footbridge has 38 steps. Suppose you are traveling with a
            wheelchair or a heavy trolley. The free shortcut may be unusable.
          </p>
          <label className="practice-check">
            <input
              type="checkbox"
              checked={stepFree}
              onChange={(e) =>
                change("stepFree", e.target.checked ? "yes" : "no")
              }
            />{" "}
            Only recommend routes without steps
          </label>
          <p className="practice-hint">
            Cost ties are resolved by time. Traffic, distance to the bus stop,
            and reliability are still outside this map.
          </p>
        </div>
      )}
    </section>
  );
}
function GardenWidget({ answers, change }: WidgetProps) {
  const access = answers.access || "open",
    work = answers.work || "volunteer",
    voice = answers.voice || "few",
    weather = answers.weather || "normal";
  const result = gardenOutcome(access, work, voice, weather);
  return (
    <section className="practice-model" aria-labelledby="garden-model-heading">
      <h2 id="garden-model-heading">One invented season</h2>
      <div className="practice-controls">
        <Choice
          label="Who gets access?"
          name="access"
          value={access}
          options={[
            ["open", "All ten households"],
            ["members", "Six registered households"],
          ]}
          change={change}
        />
        <Choice
          label="How is maintenance arranged?"
          name="work"
          value={work}
          options={[
            ["volunteer", "Whoever volunteers"],
            ["shared", "An agreed shared rota"],
          ]}
          change={change}
        />
        <Choice
          label="Who can change the rules?"
          name="voice"
          value={voice}
          options={[
            ["few", "Four organizers"],
            ["all", "All ten households"],
          ]}
          change={change}
        />
        <Choice
          label="What is the weather like?"
          name="weather"
          value={weather}
          options={[
            ["normal", "Ordinary rainfall"],
            ["dry", "A dry season"],
          ]}
          change={change}
        />
      </div>
      <dl
        className="practice-outcomes"
        aria-label="Invented garden outcomes"
        aria-live="polite"
      >
        <div>
          <dt>Harvest units</dt>
          <dd>{result.harvest}</dd>
        </div>
        <div>
          <dt>Hours of work and meetings</dt>
          <dd>{result.hours}</dd>
        </div>
        <div>
          <dt>Households without access</dt>
          <dd>{result.excluded}</dd>
        </div>
        <div>
          <dt>Households without a vote</dt>
          <dd>{result.unheard}</dd>
        </div>
      </dl>
      <details>
        <summary>Open the assumptions behind these numbers</summary>
        <p>
          Rain provides 100 water units, or 60 in a dry season. Demand is 120
          with open access and 75 with registration. Volunteering supplies 4
          maintenance hours; a rota supplies 8. Meetings take 1 hour with four
          organizers and 4 with everyone.
        </p>
        <p>
          Harvest = 0.6 × the smaller of water and demand, plus 3 × maintenance
          hours, minus 2 × meeting hours, rounded down. Hours are maintenance
          plus meetings.
        </p>
        <p>
          The assumptions give participation a time cost and shared work a
          harvest benefit. Real communities might show different effects.
          Unequal ability to contribute, trust, ownership, and the distribution
          of food are missing. A higher harvest cannot settle what is fair.
        </p>
      </details>
    </section>
  );
}
function ExperimentWidget({
  answers,
  change,
  prediction,
}: WidgetProps & { prediction: Field }) {
  const comparison = answers.comparison === "yeast" ? "yeast" : "many";
  const revealed = answers.reveal === "yes";
  return (
    <section
      className="practice-model"
      aria-labelledby="experiment-model-heading"
    >
      <h2 id="experiment-model-heading">Choose a comparison</h2>
      <Choice
        label="What will you compare?"
        name="comparison"
        value={comparison}
        change={(key, value) => {
          change(key, value);
          change("reveal", "no");
        }}
        options={[
          ["many", "Change yeast, water temperature, and kneading"],
          ["yeast", "Change yeast; keep the other conditions similar"],
        ]}
      />
      <p className="practice-hint">
        Imagine equal amounts of dough in matching containers, left for the same
        time. Kitchen conditions can still vary.
      </p>
      <FieldInput field={prediction} answers={answers} change={change} />
      {!revealed ? (
        <button type="button" onClick={() => change("reveal", "yes")}>
          Look at three rounds of results
        </button>
      ) : (
        <div className="practice-reveal">
          <div
            className="practice-table-wrap"
            tabIndex={0}
            aria-label="Scrollable experiment results table"
          >
            <table>
              <caption>
                Invented increase in dough height, in centimetres
              </caption>
              <thead>
                <tr>
                  <th scope="col">Round</th>
                  <th scope="col">Original method</th>
                  <th scope="col">Changed method</th>
                </tr>
              </thead>
              <tbody>
                {BREAD_RESULTS.original.map((value, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{value}</td>
                    <td>{BREAD_RESULTS[comparison][i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>{BREAD_FEEDBACK[comparison]}</p>
        </div>
      )}
    </section>
  );
}
function ModeWidget({ answers, change }: WidgetProps) {
  const mode =
    MODE_PASSES.find((pass) => pass.key === answers.mode) ?? MODE_PASSES[0];
  return (
    <section className="practice-model" aria-labelledby="mode-model-heading">
      <h2 id="mode-model-heading">Three passes with the paper</h2>
      <Choice
        label="Which pass would you like to try?"
        name="mode"
        value={mode.key}
        change={change}
        options={MODE_PASSES.map((pass) => [pass.key, pass.title])}
      />
      <div className="practice-pass" aria-live="polite">
        <h3>{mode.verbs}</h3>
        <ol>
          {mode.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
      <p className="practice-hint">
        Try another pass when you want to. The aim of the activity changes; the
        material can stay the same.
      </p>
    </section>
  );
}
function LabelWidget({ answers, change }: WidgetProps) {
  const view =
    LABEL_VIEWS.find((view) => view.key === answers.label) ?? LABEL_VIEWS[0];
  return (
    <section className="practice-model" aria-labelledby="label-model-heading">
      <h2 id="label-model-heading">Same cup. Different description.</h2>
      <Choice
        label="Consider the cup as…"
        name="label"
        value={view.key}
        change={change}
        options={LABEL_VIEWS.map((view) => [view.key, view.title])}
      />
      <p className="practice-result" aria-live="polite">
        {view.question}
      </p>
    </section>
  );
}
function PatternWidget({ answers, change }: WidgetProps) {
  const pattern =
    PATTERN_INSTRUCTIONS.find((p) => p.key === answers.pattern) ??
    PATTERN_INSTRUCTIONS[0];
  return (
    <section className="practice-model" aria-labelledby="pattern-model-heading">
      <h2 id="pattern-model-heading">Let the marks do something</h2>
      <Choice
        label="Which instruction is on the screen?"
        name="pattern"
        value={pattern.key}
        change={change}
        options={PATTERN_INSTRUCTIONS.map((p) => [p.key, p.title])}
      />
      <p
        className={`practice-instruction practice-instruction--${pattern.key}`}
        aria-live="polite"
      >
        {pattern.text}
      </p>
      <p className="practice-hint">
        Make the mark on paper or trace it with a finger. Compare what changed
        when the type changed with what changed when “inside” became “outside.”
      </p>
    </section>
  );
}
export default function PracticeWorkbench({ practice }: Props) {
  const [answers, setAnswers] = useState<Answers>(() =>
    defaults(practice.slug),
  );
  const [message, setMessage] = useState("Your notes are unsaved.");
  const [ready, setReady] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [legacy, setLegacy] = useState<SavedNote | null>(null);
  const [legacyUnreadable, setLegacyUnreadable] = useState(false);
  const [restoredNote, setRestoredNote] = useState<SavedNote | null>(null);
  const storageKey = practiceStorageKey(practice.slug);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const restored = readPracticeNote(raw);
      if (restored) {
        setAnswers({ ...defaults(practice.slug), ...restored.answers });
        setRestoredNote(restored);
        setMessage("Your saved note is open. Save again to keep changes.");
      } else if (raw)
        setMessage(
          "The saved note could not be read. It has not been overwritten.",
        );
      const previous = localStorage.getItem(legacyStorageKey(practice.slug));
      const earlier = readLegacyPracticeNote(previous, practice.slug);
      setLegacy(earlier);
      setLegacyUnreadable(Boolean(previous && !earlier));
    } catch {
      setMessage(
        "Browser storage is unavailable. You can still write here and download your note.",
      );
    }
    setReady(true);
  }, [storageKey, practice.slug]);
  function change(key: string, value: string) {
    setAnswers((previous) => ({ ...previous, [key]: value }));
    setRestoredNote(null);
    setMessage("Unsaved changes. Save or download a copy to keep them.");
  }
  function save() {
    try {
      const note = createPracticeNote(practice, answers, widgetLabels);
      localStorage.setItem(storageKey, JSON.stringify(note));
      setRestoredNote(note);
      setMessage("Saved on this device.");
    } catch {
      setMessage(
        "Could not save on this device. Download a copy to keep your note.",
      );
    }
  }
  function clear() {
    try {
      localStorage.removeItem(storageKey);
      setAnswers(defaults(practice.slug));
      setRestoredNote(null);
      setConfirmClear(false);
      setMessage(
        "This exercise’s current note has been cleared. Earlier-version notes are kept separately.",
      );
    } catch {
      setMessage(
        "Could not remove the saved note. You can clear this site’s data in your browser settings.",
      );
    }
  }
  function download(note: SavedNote, previous = false) {
    const url = URL.createObjectURL(
      new Blob([noteMarkdown(note)], { type: "text/markdown;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `unnatural-${practice.slug}${previous ? "-previous" : ""}.md`;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("A copy was downloaded.");
  }
  const props = { answers, change };
  const before = practice.fields.filter((f) => !f.after),
    after = practice.fields.filter((f) => f.after);
  return (
    <div className="practice-workbench">
      <p className="practice-privacy">
        Try the activity first. These spaces are here if you want a record;
        thinking or using paper is fine. Answers are not sent to a server. They
        are kept only when you choose Save or Download.
      </p>
      {legacy && (
        <details className="practice-legacy">
          <summary>Your note from the earlier exercise</summary>
          <p>
            These questions have changed. Your earlier note is kept under its
            original title and questions.
          </p>
          <h2>{legacy.title}</h2>
          <dl>
            {Object.entries(legacy.answers)
              .filter(([, value]) => value.trim())
              .map(([key, value]) => (
                <div key={key}>
                  <dt>{legacy.labels[key] ?? `Unlabelled field (${key})`}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
          </dl>
          <button type="button" onClick={() => download(legacy, true)}>
            Download previous note
          </button>
        </details>
      )}
      {legacyUnreadable && (
        <p className="practice-hint">
          An earlier saved note could not be read. It has been left untouched.
        </p>
      )}
      <fieldset disabled={!ready} className="practice-inputs">
        <legend className="visually-hidden">
          Optional notes and exercise controls
        </legend>
        {practice.slug === "maps" && (
          <MapWidget {...props} prediction={before[0]} />
        )}
        {practice.slug === "experiment" && (
          <ExperimentWidget {...props} prediction={before[0]} />
        )}
        {practice.slug === "labels" && <LabelWidget {...props} />}
        {practice.slug === "modes" && <ModeWidget {...props} />}
        {practice.slug === "patterns" && <PatternWidget {...props} />}
        {!["maps", "experiment"].includes(practice.slug) &&
          before.map((field) => (
            <FieldInput key={field.key} field={field} {...props} />
          ))}
        {practice.slug === "garden" && <GardenWidget {...props} />}
        {practice.slug === "disagreement" && (
          <section className="practice-model" aria-labelledby="window-heading">
            <h2 id="window-heading">Where are they standing?</h2>
            <p className="practice-hint">
              Hold both possible reasons in mind before looking.
            </p>
            {answers.reveal === "yes" ? (
              <div className="practice-reveal">
                {WINDOW_CONTEXT.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            ) : (
              <button type="button" onClick={() => change("reveal", "yes")}>
                Look at their positions
              </button>
            )}
          </section>
        )}
        {after.length > 0 && (
          <section className="practice-return" aria-labelledby="return-heading">
            <h2 id="return-heading">
              {practice.slug === "one-week"
                ? "For when you return"
                : "After trying it"}
            </h2>
            {practice.slug === "one-week" && (
              <p className="practice-hint">
                Save or download the first note below. The site does not send
                reminders.
              </p>
            )}
            {after.map((field) => (
              <FieldInput key={field.key} field={field} {...props} />
            ))}
          </section>
        )}
      </fieldset>
      <p className="practice-note">{practice.note}</p>
      <div className="practice-save">
        <button type="button" disabled={!ready} onClick={save}>
          Save on this device
        </button>
        <button
          type="button"
          disabled={!ready}
          onClick={() =>
            download(
              restoredNote ??
                createPracticeNote(practice, answers, widgetLabels),
            )
          }
        >
          Download my note
        </button>
        <button
          type="button"
          disabled={!ready}
          aria-expanded={confirmClear}
          aria-controls="clear-confirmation"
          onClick={() => setConfirmClear(true)}
        >
          Clear this note
        </button>
      </div>
      <div id="clear-confirmation" hidden={!confirmClear}>
        {confirmClear && (
          <fieldset className="practice-reveal">
            <legend>
              Clear the current exercise’s saved note and writing?
            </legend>
            <button type="button" onClick={clear}>
              Yes, clear this note
            </button>{" "}
            <button type="button" onClick={() => setConfirmClear(false)}>
              Keep it
            </button>
          </fieldset>
        )}
      </div>
      <p role="status" aria-live="polite" className="practice-status">
        {message}
      </p>
      <p className="practice-hint">
        A saved note is available to anyone using this browser profile. Browser
        data clearing may remove it. Download a copy if you want to keep it
        elsewhere.
      </p>
    </div>
  );
}
