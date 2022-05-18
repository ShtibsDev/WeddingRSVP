import { useTranslation } from 'react-i18next'
import InviteeContext from '../../context/InviteeContext'
import { useContext, useEffect } from 'react'
import CalendarEvent from '../../models/CalendarEvent'
import AddEventBtn from '../AddEventBtn'


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
    <div className='result-page'>
      <h1>{msg}</h1>

      <div>
        <a href="https://waze.com/ul/hsvbbgfueq" className="h3">
          <i className="fa-brands fa-waze fa-bounce mx-1"></i>
          קישור לWAZE
        </a>
      </div>



      <AddEventBtn />

      <div>
        <a href="https://web.payboxapp.com/?v=j&g=62818b7f623a26000747f901#/" className="h3">
          <i className="fa-solid fa-gift fa-beat mx-1"></i>
          ברשותך לתת מתנה בPayBox
        </a>
      </div>

    </div >
  )
}
