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
    <div className='result-page'>
      <h1>{msg}</h1>

      <div>
        <a href="https://waze.com/ul/hsvbbgfueq" className="h3">
          <i className="fa-brands fa-waze fa-bounce mx-1"></i>
          קישור לWAZE
        </a>
      </div>
    </div>
  )
}
