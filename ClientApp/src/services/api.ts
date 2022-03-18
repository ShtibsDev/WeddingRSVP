import axios from 'axios'
import Invitee from '@models/Invitee'

export async function getInvitee(phoneNumber: string) {
  try {
    const response = await axios.get<Invitee>(
      `/api/Invitees/GetInvitee/${phoneNumber}`
    )

    return response.data
  } catch (error) {
    console.warn(error)
  }
}

export async function submitInvitee(invitee: Invitee) {
  try {
    const response = await axios.put(`/api/Invitees/SubmitInvitee`, invitee)
  } catch (error) {
    console.warn(error)
  }
}
