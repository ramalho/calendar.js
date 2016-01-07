/*!
 * calendar.js: inspired by the calendar module from Python
 * Copyright(c) 2011 Luciano Ramalho <luciano@ramalho.org>
 * MIT Licensed
 */

'use strict'

export const version = '0.1.0'

class CalendarException {
  constructor(message) {
    this.message = message
  }

  toString() {
    return `${this.constructor.name}: ${this.message}`
  }
}

export class Calendar {
  constructor(firstWeekDay) {
    this.firstWeekDay = firstWeekDay || 0
  }

  weekStartDate(date) {
    const startDate = new Date(date.getTime())
    while (startDate.getDay() !== this.firstWeekDay) {
      startDate.setDate(startDate.getDate() - 1)
    }
    return startDate
  }

  monthDates(year, month, dayFormatter, weekFormatter) {
    if ((typeof year !== 'number') || (year < 1970)) {
      throw new CalendarException('year must be a number >= 1970')
    }
    if ((typeof month !== 'number') || (month < 0) || (month > 11)) {
      throw new CalendarException('month must be a number (Jan is 0)')
    }
    const weeks = []
    let week = []
    let date = this.weekStartDate(new Date(year, month, 1))
    do {
      for (let i = 0; i < 7; i++) {
        week.push(dayFormatter ? dayFormatter(date) : date)
        date = new Date(date.getTime())
        date.setDate(date.getDate() + 1)
      }
      weeks.push(weekFormatter ? weekFormatter(week) : week)
      week = []
    } while ((date.getMonth() <= month) && (date.getFullYear() === year))
    return weeks
  }

  monthDays(year, month) {
    const getDayOrZero = (date) => (date.getMonth() === month ? date.getDate() : 0)
    return this.monthDates(year, month, getDayOrZero)
  }

  monthText(year, month) {
    if (typeof year === 'undefined') {
      const now = new Date()
      year = now.getFullYear()
      month = now.getMonth()
    }
    const getDayOrBlank = (date) => {
      let s = date.getMonth() === month ? date.getDate().toString() : ' '
      while (s.length < 2) {
        s = ` ${s}`
      }
      return s
    }
    const weeks = this.monthDates(year, month, getDayOrBlank, (week) => week.join(' '))
    return weeks.join('\n')
  }
}

'JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC'.split(' ').forEach((month, index) => {
  Calendar[month] = index
})
