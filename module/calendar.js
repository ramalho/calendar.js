/*!
 * calendar.js: inspired by the calendar module from Python
 * Copyright(c) 2011 Luciano Ramalho <luciano@ramalho.org>
 * MIT Licensed
 */
export let version = '0.2.0';

class CalendarException {
    constructor(message) {
        this.message = message;
        this.toString = () => {
            return "CalendarException: " + this.message;
        };
    }
}
export class Calendar {
    static JAN = 0;
    static FEB = 1;
    static MAR = 2;
    static APR = 3;
    static MAY = 4;
    static JUN = 5;
    static JUL = 6;
    static AUG = 7;
    static SEP = 8;
    static OCT = 9;
    static NOV = 10;
    static DEC = 11;

    constructor(firstWeekDay) {
        this.firstWeekDay = firstWeekDay || 0;
    }
    weekStartDate(date) {
        let startDate = new Date(date.getTime());
        while (startDate.getDay() !== this.firstWeekDay) {
            startDate.setDate(startDate.getDate() - 1);
        }
        return startDate;
    }
    monthDates(year, month, dayFormatter, weekFormatter) {
        if ((typeof year !== "number") || (year < 1970)) {
            throw new CalendarException('year must be a number >= 1970');
        }
        ;
        if ((typeof month !== "number") || (month < 0) || (month > 11)) {
            throw new CalendarException('month must be a number (Jan is 0)');
        }
        ;
        let weeks = new Array();
        let date = this.weekStartDate(new Date(year, month, 1));
        let count = 0;
        do {
            let week = new Array();
            for (let i = 0; (i < 7); i++) {
                let rslt = (dayFormatter ? dayFormatter(date, count++) : date);
                week.push(rslt);
                date = new Date(date.getTime());
                date.setDate(date.getDate() + 1);
            }
            weeks.push(weekFormatter ? weekFormatter(week) : week);
        } while ((date.getMonth() <= month) && (date.getFullYear() === year));
        return weeks;
    }
    monthDays(year, month) {
        let getDayOrZero = (date) => {
            return date.getMonth() === month ? date.getDate() : 0;
        };
        return this.monthDates(year, month, getDayOrZero);
    }
    monthMap(year, month, InfoClass) {
        let getDayOrFalse = (date, count) => {
            return (date.getMonth() === month) ? `${date.getDate()},${count}` : false;
        };
        let month_table = this.monthDates(year, month, getDayOrFalse);
        let mlist = month_table.flat();
        let the_map = false;
        if (InfoClass !== undefined) {
            the_map = {};
            for (let day of mlist) {
                if (day !== false) {
                    let ds = day.toString();
                    the_map[ds] = new InfoClass(...((ds.split(',').map(dd => parseInt(dd)))));
                }
            }
        }
        let month_map = {
            "table": month_table,
            "list": mlist,
            "map": the_map
        };
        return month_map;
    }
    monthText(year, month) {
        if (typeof year === "undefined") {
            let now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
        }
        ;
        let getDayOrBlank = (date) => {
            let s = date.getMonth() === month ? date.getDate().toString() : "  ";
            while (s.length < 2)
                s = " " + s;
            return s;
        };
        let weeks = this.monthDates(year, month, getDayOrBlank, (week) => { return week.join(" "); });
        return weeks.join("\n");
    }
}
