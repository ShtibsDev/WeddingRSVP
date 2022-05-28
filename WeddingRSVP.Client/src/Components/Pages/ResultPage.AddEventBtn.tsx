import { useTranslation } from 'react-i18next'

export default function AddEventBtn() {
  const { t } = useTranslation()
  const handleClick = () => {
    const link = document.createElement('a')
    const fileName = 'event.ics'
    link.href = `${location.origin}/${fileName}`
    link.download = fileName
    link.click()
    link.remove()
  }

  return (
    <button onClick={handleClick} className='cal-btn'>
      <i className='fa-regular fa-calendar-plus'></i>
      <span>{t('addToCalendar')}</span>
    </button>
  )
}
