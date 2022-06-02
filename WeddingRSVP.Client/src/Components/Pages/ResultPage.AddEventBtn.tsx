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
      'https://calendar.google.com/event?action=TEMPLATE&tmeid=XzZvczRjY2kzNmQxNDJiYTI2MHJrYWI5azY0cGpjYjlvOG9vamFiOXA2Z3MzZ2g5Zzg0czNhY2hqNm8gMTZtcnNoM2I3ZnRlYmc1dmZsMmxqcXNvNGdAZw&tmsrc=16mrsh3b7ftebg5vfl2ljqso4g%40group.calendar.google.com'
    window.open(url, '_blank')!.focus()
  }

  return (
    <button onClick={handleClick} className='cal-btn'>
      <i className='fa-regular fa-calendar-plus'></i>
      <span>{t('addToCalendar')}</span>
    </button>
  )
}
