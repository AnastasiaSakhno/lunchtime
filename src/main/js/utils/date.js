import moment from 'moment'

export const DATE_FORMAT = 'YYYY-MM-DD'

export const weekDateLong = (weekBeginningFormatted, dayOfWeek) =>
  moment(weekBeginningFormatted, DATE_FORMAT).day(dayOfWeek).valueOf()

export const weekDateFormattedFromString = (weekBeginningFormatted, dayOfWeek) =>
  moment(weekBeginningFormatted).day(dayOfWeek).format(DATE_FORMAT)

export const weekDateFormattedFromObject = (weekBeginning, dayOfWeek) =>
  weekBeginning.day(dayOfWeek).format(DATE_FORMAT)
