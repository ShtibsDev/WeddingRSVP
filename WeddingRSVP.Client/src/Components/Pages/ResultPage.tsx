import { useTranslation } from 'react-i18next'
import InviteeContext from '../../context/InviteeContext'
import { useContext } from 'react'
import AddEventBtn from '../Pages/ResultPage.AddEventBtn'
import SelectedOption from './ResultPage.SelectedOption'
import { ResponseType } from '../../models/Enums'

export default function ResultPage() {
  const { t } = useTranslation()
  const { invitee } = useContext(InviteeContext)
  const gender = invitee.isMale ? 'm' : 'f'

  const msg = (() => {
    if (invitee.response === ResponseType.NotSure || invitee.response === ResponseType.NotComing)
      return t(`finalMessage.noArrive`).format(invitee.firstName)
    return t(`finalMessage.arrive`).format(invitee.firstName)
  })()

  return (
    <div className='result-page'>
      <h2>
        {msg}
        <br />
        {t('timeAddress')}
      </h2>

      <SelectedOption />

      <div>
        <a
          href='https://ul.waze.com/ul?place=ChIJrZaKX_QOHRURmEaC70NS8EA&ll=32.49111800%2C34.97570000&navigate=yes&utm_campaign=share_d&utm_source=waze_app&utm_medium=lm_share_location'
          className='h2'
        >
          <i className='fa-brands fa-waze fa-bounce mx-1'></i>
          {t('linkToWaze')}
        </a>
      </div>

      <AddEventBtn />

      <div>
        <a href='https://payboxapp.page.link/LGVQ1vsHtHNnr1Ge9' className='h3'>
          <i className='fa-solid fa-gift fa-beat mx-1'></i>
          {t(`${gender}.payWithPaybox`)}
        </a>
      </div>
    </div>
  )
}
