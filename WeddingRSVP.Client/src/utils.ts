import { ResponseType } from './models/Enums'
import Invitee from './models/Invitee'
import Option from './models/Option'
import i18n from './services/i18n'

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

export const isMobile = window.innerWidth <= 768

export async function wait(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export function getOptions(allowNight: boolean | undefined, gender: string): Option[] {
  let options = [
    { value: ResponseType.Coming, text: i18n.t(`${gender}.options.arriving`) },
    { value: ResponseType.StayingTheNight, text: i18n.t(`${gender}.options.stayingTheNight`) },
    { value: ResponseType.NotSure, text: i18n.t(`${gender}.options.notSure`) },
    { value: ResponseType.NotComing, text: i18n.t(`${gender}.options.notComing`) },
  ]

  if (!allowNight) {
    options = options.filter((o) => o.value !== ResponseType.StayingTheNight)
  }

  return options
}

export function getEvaluatedInvitee(inv: Invitee, option: Option) {
  switch (option.value) {
    case 1:
      return {
        ...inv,
        isArriving: true,
        isStayingForNight: false,
      }
    case 2:
      return {
        ...inv,
        isArriving: true,
        isStayingForNight: true,
      }
    case 4:
      return {
        ...inv,
        isArriving: false,
        isStayingForNight: false,
      }
  }
  return inv
}

export function isIOS() {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod', 'MacIntel'].includes(navigator.platform) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    // iPad on iOS 13 detection
  )
}
