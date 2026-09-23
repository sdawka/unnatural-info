// Move only the reflection on the hovered control. No idle animation or scroll work.
const pointer = matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const selector = '.metal-action, .book-button, .practice-workbench button, .analysis-send';
let active: HTMLElement | null = null;
let frame = 0;
let x = 0;
let y = 0;

function reset() {
  cancelAnimationFrame(frame);
  frame = 0;
  active?.style.removeProperty('--metal-x');
  active?.style.removeProperty('--metal-y');
  active = null;
}

document.addEventListener('pointermove', (event) => {
  if (!pointer.matches || reducedMotion.matches || event.pointerType === 'touch') return;
  const target = event.target instanceof Element ? event.target.closest<HTMLElement>(selector) : null;
  const control = target?.matches(':disabled') ? null : target;
  if (control !== active) { reset(); active = control; }
  if (!active) return;
  x = event.clientX;
  y = event.clientY;
  if (!frame) frame = requestAnimationFrame(() => {
    frame = 0;
    if (!active) return;
    const rect = active.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    active.style.setProperty('--metal-x', `${Math.max(0, Math.min(100, (x - rect.left) / rect.width * 100))}%`);
    active.style.setProperty('--metal-y', `${Math.max(0, Math.min(100, (y - rect.top) / rect.height * 100))}%`);
  });
}, { passive: true });

document.addEventListener('pointerout', (event) => {
  if (active && !(event.relatedTarget instanceof Node && active.contains(event.relatedTarget))) reset();
}, { passive: true });
window.addEventListener('blur', reset);
window.addEventListener('pagehide', reset);
pointer.addEventListener('change', reset);
reducedMotion.addEventListener('change', reset);
