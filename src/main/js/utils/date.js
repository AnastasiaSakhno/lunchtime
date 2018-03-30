import moment from 'moment'

export const DATE_FORMAT = 'YYYY-MM-DD'

export const weekDate = (weekBeginningFormatted, dayOfWeek) =>
  moment(weekBeginningFormatted, DATE_FORMAT).day(dayOfWeek)

export const weekDateJson = (weekBeginningFormatted, dayOfWeek) => {
  let date = weekDate(weekBeginningFormatted, dayOfWeek)
  return {
    dayOfWeek: dayOfWeek,
    dayOfMonth: date.date(),
    year: date.year(),
    monthOfYear: date.month() + 1
  }
}

export const dateLong = (dateFormatted) => moment(dateFormatted, DATE_FORMAT).valueOf()

export const weekDateLong = (weekBeginningFormatted, dayOfWeek) =>
  weekDate(weekBeginningFormatted, dayOfWeek).valueOf()

export const weekDateFormattedFromString = (weekBeginningFormatted, dayOfWeek) =>
  moment(weekBeginningFormatted).day(dayOfWeek).format(DATE_FORMAT)

export const weekDateFormattedFromObject = (weekBeginning, dayOfWeek) =>
  weekBeginning.day(dayOfWeek).format(DATE_FORMAT)

export const dateFromJson = (date) => date ? moment([date.year, date.monthOfYear - 1, date.dayOfMonth]) : null

export const formattedDate = (date) => dateFromJson(date).format(DATE_FORMAT)

export const weekRange = (startDate) => {
  const weekStart = weekDateFormattedFromObject(startDate, 1)
  const weekEnd = weekDateFormattedFromObject(startDate, 5)
  return {from: weekStart, to: weekEnd}
}
