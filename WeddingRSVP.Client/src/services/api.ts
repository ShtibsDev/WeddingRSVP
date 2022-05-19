import axios from 'axios'
import Invitee from '../models/Invitee'

const server = process.env.REACT_APP_SERVER_ADDRESS

export async function getInvitee(phoneNumber: string) {
  try {
    const response = await axios.get<Invitee>(`${server}/api/Invitees/GetInvitee/${phoneNumber}`)

    return response.data
  } catch (error) {
    console.warn(error)
  }
}

export async function submitInvitee(invitee: Invitee) {
  const response = await axios.patch<Invitee>(`${server}/api/Invitees/SubmitInvitee`, invitee)
  if (response.data) return response.data
  else throw new Error('Error with submited data')
}

export async function resetSubmition(invitee: Invitee) {
  const response = await axios.patch<Invitee>(`${server}/api/Invitees/ResetSubmition/${invitee.id}`)
  if (response.data) return response.data
  else throw new Error('Error with resetting submition')
}
