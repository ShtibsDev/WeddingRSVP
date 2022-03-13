import Invitee from "@src/models/Invitee"
import { createContext } from "react"

export interface InviteeContextModel {
  invitee: Invitee
  setInvitee: (invitee: Invitee) => void
}

export const defaultInvitee: Invitee = {
  firstName: '',
  lastName: '',
  isBringsPlusOne: false,
  isFinal: false,
  isGroup: false,
  isMale: true,
  lang: 'he',
  phoneNumber: ''
}

const InviteeContext = createContext<InviteeContextModel>({
  invitee: defaultInvitee,
  setInvitee: (invitee: Invitee) => { }
})

export default InviteeContext