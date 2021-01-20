const observer = new ResizeObserver(entries => {
  for (const entry of entries) {
    entry.target.dispatchEvent(new CustomEvent('elResize', { detail: entry }));
  }
});

export function resize(node) {
  observer.observe(node);
  return {
    destroy() {
      observer.unobserve(node);
    }
  };
}
