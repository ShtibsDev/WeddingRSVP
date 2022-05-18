import { ResponseType } from './Enums'

export default interface Invitee {
  id: string
  firstName: string
  lastName: string
  phoneNumber: string
  lang: 'he' | 'ru'
  response: ResponseType
  allowNight: boolean
  isArriving?: boolean
  isStayingForNight?: boolean
  isBringsPlusOne: boolean
  isGroup: boolean
  isMale: boolean
  isFinal: boolean
  group?: Invitee[]
  submittingInvitee?: Invitee
}
