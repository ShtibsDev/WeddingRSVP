import CalendarEvent from '../models/CalendarEvent'

export default function AddEventBtn() {
  const calendarEvent: CalendarEvent = {
    name: 'החתונה של אלי ואופיר',
    startDate: '2022-06-17',
    endDate: '2022-06-17',
    startTime: '12:30',
    endTime: '17:00',
    location: 'וויט\\, Tidhar St\\, Pardes Hanna-Karkur\\, Israel',
    options: ['iCal'],
    label: 'הכנס ללוח השנה',
    trigger: 'click',
    timeZone: 'Asia/Jerusalem',
    geo: '37.5739497;-85.7399606'

  }


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
      <i className="fa-regular fa-calendar-plus"></i>
      <span>הוסף ללוח השנה</span>
    </button>
  )
}