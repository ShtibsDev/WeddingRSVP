export default interface Invitee{
    firstName: string
    lastName: string
    phoneNumber: string
    lang: 'he' | 'ru'
    isArriving?: boolean
    isStayingForNight?: boolean
    isBringsPlusOne: boolean
    isGroup: boolean
    isMale: boolean
    isFinal: boolean
    group?: Invitee[]
}