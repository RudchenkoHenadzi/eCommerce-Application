import { ageForValigation } from '@/configs/project-configs'
const DAYS_PER_YEAR = 365
const HOURS_PER_DAY = 24
const MINUTES_PER_HOUR = 60
const SECONDS_PER_MINUTE = 60
const MS_PER_SECOND = 1000
const MS_PER_YEAR =
  DAYS_PER_YEAR * HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MS_PER_SECOND

function checkValidationDate() {
  const today = new Date().getTime()
  const delta = ageForValigation * MS_PER_YEAR
  const newDate = new Date(today - delta)
  return newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate()
}

const validationDate = checkValidationDate()

function greaterThanCurrentAge(value: string) {
  return new Date(validationDate).getTime() >= new Date(value).getTime()
}

export default greaterThanCurrentAge
