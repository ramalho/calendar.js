/*!
 * calendar.js: inspired by the calendar module from Python
 * Copyright(c) 2011 Luciano Ramalho <luciano@ramalho.org>
 * MIT Licensed
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var version = exports.version = '0.1.0';

var CalendarException = function () {
  function CalendarException(message) {
    _classCallCheck(this, CalendarException);

    this.message = message;
  }

  _createClass(CalendarException, [{
    key: 'toString',
    value: function toString() {
      return this.constructor.name + ': ' + this.message;
    }
  }]);

  return CalendarException;
}();

var Calendar = exports.Calendar = function () {
  function Calendar(firstWeekDay) {
    _classCallCheck(this, Calendar);

    this.firstWeekDay = firstWeekDay || 0;
  }

  _createClass(Calendar, [{
    key: 'weekStartDate',
    value: function weekStartDate(date) {
      var startDate = new Date(date.getTime());
      while (startDate.getDay() !== this.firstWeekDay) {
        startDate.setDate(startDate.getDate() - 1);
      }
      return startDate;
    }
  }, {
    key: 'monthDates',
    value: function monthDates(year, month, dayFormatter, weekFormatter) {
      if (typeof year !== 'number' || year < 1970) {
        throw new CalendarException('year must be a number >= 1970');
      }
      if (typeof month !== 'number' || month < 0 || month > 11) {
        throw new CalendarException('month must be a number (Jan is 0)');
      }
      var weeks = [];
      var week = [];
      var date = this.weekStartDate(new Date(year, month, 1));
      do {
        for (var i = 0; i < 7; i++) {
          week.push(dayFormatter ? dayFormatter(date) : date);
          date = new Date(date.getTime());
          date.setDate(date.getDate() + 1);
        }
        weeks.push(weekFormatter ? weekFormatter(week) : week);
        week = [];
      } while (date.getMonth() <= month && date.getFullYear() === year);
      return weeks;
    }
  }, {
    key: 'monthDays',
    value: function monthDays(year, month) {
      var getDayOrZero = function getDayOrZero(date) {
        return date.getMonth() === month ? date.getDate() : 0;
      };
      return this.monthDates(year, month, getDayOrZero);
    }
  }, {
    key: 'monthText',
    value: function monthText(year, month) {
      if (typeof year === 'undefined') {
        var now = new Date();
        year = now.getFullYear();
        month = now.getMonth();
      }
      var getDayOrBlank = function getDayOrBlank(date) {
        var s = date.getMonth() === month ? date.getDate().toString() : ' ';
        while (s.length < 2) {
          s = ' ' + s;
        }
        return s;
      };
      var weeks = this.monthDates(year, month, getDayOrBlank, function (week) {
        return week.join(' ');
      });
      return weeks.join('\n');
    }
  }]);

  return Calendar;
}();

'JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC'.split(' ').forEach(function (month, index) {
  Calendar[month] = index;
});