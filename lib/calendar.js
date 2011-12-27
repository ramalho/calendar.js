var Calendar = function Calendar(firstWeekDay) {
    //properties
    this.firstWeekDay = firstWeekDay || 0; // 0 = Sunday
};

Calendar.prototype = {
    constructor : Calendar,
    weekStartDate : function weekStartDate(date) {
        var startDate = new Date(date.getTime());
        while (startDate.getDay() !== this.firstWeekDay) {
            startDate.setDate(startDate.getDate() - 1);
        }
        return startDate;
    },
    monthDates : function monthDates(year, month, dayFormatter, weekFormatter) {
        var weeks = [],
            week = [],
            i = 0,
            date = this.weekStartDate(new Date(year, month, 1));
        do {
            for (i=0; i<7; i++) {
                week.push(dayFormatter ? dayFormatter(date) : date);
                date = new Date(date.getTime());
                date.setDate(date.getDate() + 1);
            }
            weeks.push(weekFormatter ? weekFormatter(week) : week);
            week = [];
        } while (date.getMonth()<=month);
        return weeks;
    },
    monthDays : function monthDays(year, month) {
        var getDayOrZero = function getDayOrZero(date) {
            return date.getMonth() === month ? date.getDate() : 0;
        };
        return this.monthDates(year, month, getDayOrZero);
    },
    monthText : function monthText(year, month) {
        if (typeof year === "undefined") {
            var now = Date.now();
            year = now.getYear();
            month = now.getMonth();
        };
        var getDayOrBlank = function getDayOrZero(date) {
            var s = date.getMonth() === month ? date.getDate().toString() : "  ";
            while (s.length < 2) s = " "+s;
            return s;
        };
        var weeks = this.monthDates(year, month, getDayOrBlank,
            function (week) { return week.join(" ") });
        return weeks.join("\n");
    }
};
var months = "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" ");
for (var i=0; i<months.length; i++)
    Calendar[months[i]] = i;

exports = {
    Calendar : Calendar
};
