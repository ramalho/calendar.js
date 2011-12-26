oneDay = 24 * 60 * 60 * 1000; // H, M, S, miliseconds
firstWeekDay = 0;  // 0 = Sunday

function weekStartDate(date) {
    while (date.getDay() !== firstWeekDay) {
        date = new Date(date.getTime() - oneDay);
    }
    return date;
}

function monthDatesCalendar(year, month) {
    var weeks = [];
    var week = []
    var date, i;
    date = weekStartDate(new Date(year, month, 1));
    do {
        for (i=0; i<7; i++) {
            week.push(date);
            date = new Date(date.getTime() + oneDay);
        }
        weeks.push(week);
        week = [];
    } while (date.getMonth()<=month);
    return weeks;
}