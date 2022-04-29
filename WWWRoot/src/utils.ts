import Invitee from './models/Invitee'
import Option from './models/Option'

export function getPhoneNumber() {
  const url = new URL(window.location.href)
  const phoneNumber = url.searchParams.get('t')
  if (!phoneNumber) throw Error('URL is invalid.')
  return phoneNumber
}

export function classNames(classes: object) {
  return Object.entries(classes)
    .filter(([_, value]) => value)
    .map(([key, _]) => key)
    .join(' ')
}

export function getEvaluatedInvitee(inv: Invitee, option: Option) {
  switch (option.value) {
    case 1:
      return {
        ...inv,
        isArriving: true,
        isStayingForNight: false,
        isFinal: true,
      }
    case 2:
      return {
        ...inv,
        isArriving: true,
        isStayingForNight: true,
        isFinal: true,
      }
    case 4:
      return {
        ...inv,
        isArriving: false,
        isStayingForNight: false,
        isFinal: true,
      }
  }
  return inv
}
