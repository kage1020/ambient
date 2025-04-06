export function scrollIntoView(element: HTMLElement | null) {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  element.parentElement?.scrollTo({
    top: element.offsetTop - (window.innerHeight - rect.height) / 2,
    behavior: 'smooth',
  });
}
