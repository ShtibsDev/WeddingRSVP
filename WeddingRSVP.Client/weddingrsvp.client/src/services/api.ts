import axios from 'axios'
import Invitee from '@models/Invitee'

// require('dotenv').config()
const server = 'https://localhost:7243'

export async function getInvitee(phoneNumber: string) {
  try {
    const response = await axios.get<Invitee>(`${server}/api/Invitees/GetInvitee/${phoneNumber}`)

    return response.data
  } catch (error) {
    console.warn(error)
  }
}

export async function submitInvitee(invitee: Invitee) {
  try {
    await axios.put(`${server}/api/Invitees/SubmitInvitee`, invitee)
  } catch (error) {
    console.warn(error)
  }
}
