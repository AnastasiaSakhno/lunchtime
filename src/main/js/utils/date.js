import moment from 'moment-timezone'

export const DATE_FORMAT = 'YYYY-MM-DD'

export const dateMomentFromString = (dateFormatted) => moment.tz(dateFormatted, 'utc')

export const weekDate = (weekBeginningFormatted, dayOfWeek) =>
  dateMomentFromString(weekBeginningFormatted).day(dayOfWeek)

export const weekDateJson = (weekBeginningFormatted, dayOfWeek) => {
  let date = weekDate(weekBeginningFormatted, dayOfWeek)
  return {
    dayOfWeek: dayOfWeek,
    dayOfMonth: date.date(),
    year: date.year(),
    monthOfYear: date.month() + 1
  }
}

export const dateLong = (dateFormatted) => dateMomentFromString(dateFormatted).valueOf()

export const weekDateLong = (weekBeginningFormatted, dayOfWeek) =>
  weekDate(weekBeginningFormatted, dayOfWeek).valueOf()

export const weekDateFormattedFromString = (weekBeginningFormatted, dayOfWeek) =>
  weekDate(weekBeginningFormatted, dayOfWeek).format(DATE_FORMAT)

export const weekDateFormattedFromObject = (weekBeginning, dayOfWeek) =>
  weekBeginning.day(dayOfWeek).format(DATE_FORMAT)

export const dateFromJson = (date) => date ? moment.tz([date.year, date.monthOfYear - 1, date.dayOfMonth], 'utc') : null

export const formattedDate = (date) => dateFromJson(date).format(DATE_FORMAT)

export const weekRange = (startDate) => {
  const weekStart = weekDateFormattedFromObject(startDate, 1)
  const weekEnd = weekDateFormattedFromObject(startDate, 5)
  return {from: weekStart, to: weekEnd}
}
