import axios from "axios";
import Invitee from "../models/Invitee";

export async function getInvitee(phoneNumber: string) {
    const url = ''
    return (await axios.get<Invitee>(`${url}${phoneNumber}`)).data
}
