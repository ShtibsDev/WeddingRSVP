
export function getPhoneNumber() {
  const url = new URL(window.location.href);
  return url.searchParams.get('t')
}

export function classNames(classes: object) {
  return Object.entries(classes)
    .filter(([key, value]) => value)
    .map(([key, value]) => key)
    .join(' ');
}