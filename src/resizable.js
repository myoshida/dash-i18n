import interact from 'interact.js';

export function resizable(target, options = {}) {
  const { edge = 'top', onend = null, margin = 8 } = options;
  const edges = { top: false, left: false, bottom: false, right: false };
  edges[edge] = true;
  interact(target).resizable({
    // margin is the distance from the right edge of the div
    // clicking in which will start resizing.
    margin,
    edges,
    invert: 'none',
    onmove(event) {
      const target = event.target;
      if (edge === 'left' || edge === 'right') {
        target.style.width = `${event.rect.width}px`;
      } else {
        target.style.height = `${event.rect.height}px`;
      }
    },
    onend() {
      if (onend) { onend(); }
    },
  });
}

export default resizable;
