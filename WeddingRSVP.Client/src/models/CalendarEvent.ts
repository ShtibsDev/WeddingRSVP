export default interface CalendarEvent {
  name: string,
  description?: string,
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  location: string,
  label: string,
  options: string[],
  timeZone?: string,
  timeZoneOffset?: string,
  trigger?: 'click' | 'hover',
  iCalFileName?: string,
  geo?: string
}