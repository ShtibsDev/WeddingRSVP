import { useTranslation } from 'react-i18next'
import React, { useContext } from 'react'
import InviteeContext from '@src/context/InviteeContext'

export default function ResultPage() {
  const { t } = useTranslation()
  const { invitee } = useContext(InviteeContext)
  const gender = invitee.isMale ? 'm' : 'f'

  const msg = (() => {
    if (invitee.isArriving) return t(`${gender}.lookingToSeeYou`)
    if (!invitee.isFinal) return t(`${gender}.canComeAgain`)
    return t(`${gender}.FU`)
  })()

  return (
    <div className='d-flex justify-content-center align-items-center main-content'>
      <h1>{msg}</h1>
    </div>
  )
}
