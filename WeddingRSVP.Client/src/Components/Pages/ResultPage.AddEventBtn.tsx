import { useTranslation } from 'react-i18next'
import { isIOS } from '../../utils'

export default function AddEventBtn() {
  const { t } = useTranslation()
  const handleClick = () => {
    if (isIOS()) {
      const link = document.createElement('a')
      const fileName = 'event.ics'
      link.href = `${location.origin}/${fileName}`
      link.download = fileName
      link.click()
      link.remove()
      return
    }
    const url =
      'https://calendar.google.com/event?action=TEMPLATE&tmeid=XzhvcjQ0ZGE2NzUwazRiOW82c3NrNGI5azc1MWs0YmEyNjBvMzBiOWg3MG80YWNpMzcwb2s0ZDFqNm8gb2ZpcnN0aWJlckBt&tmsrc=ofirstiber%40gmail.com'
    window.open(url, '_blank')!.focus()
  }

  return (
    <button onClick={handleClick} className='cal-btn'>
      <i className='fa-regular fa-calendar-plus'></i>
      <span>{t('addToCalendar')}</span>
    </button>
  )
}
