export function getPhoneNumber() {
  const url = new URL(window.location.href)
  const phoneNumber = url.searchParams.get('t')
  if (!phoneNumber) throw Error('URL is invalid.')
  return phoneNumber
}

export function classNames(classes: object) {
  return Object.entries(classes)
    .filter(([key, value]) => value)
    .map(([key, value]) => key)
    .join(' ')
}
