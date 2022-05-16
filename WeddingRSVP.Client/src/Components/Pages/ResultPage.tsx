import '../../font-awesome/css/all.min.css'
import { useTranslation } from 'react-i18next'
import InviteeContext from '../../context/InviteeContext'
import { useContext } from 'react'

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

      <div>
        <a href="" className="h3">
          <i className="fa-brands fa-waze mx-1"></i>
          קישור לWAZE
        </a>
      </div>
    </div>
  )
}
