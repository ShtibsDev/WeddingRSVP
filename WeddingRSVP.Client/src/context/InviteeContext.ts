import Invitee from '../models/Invitee'
import { createContext } from 'react'
import { ResponseType } from '../models/Enums'

export interface InviteeContextModel {
  invitee: Invitee
  setInvitee: (invitee: Invitee) => void
}

export const defaultInvitee: Invitee = {
  id: '',
  firstName: '',
  lastName: '',
  isBringsPlusOne: false,
  isPlusOne: false,
  isGroup: false,
  isMale: true,
  lang: 'he',
  allowNight: false,
  response: ResponseType.None,
  phoneNumber: '',
}

const InviteeContext = createContext<InviteeContextModel>({
  invitee: defaultInvitee,
  setInvitee: (invitee: Invitee) => {},
})

export default InviteeContext
