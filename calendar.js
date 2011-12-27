firstWeekDay = 0;  // 0 = Sunday

function weekStartDate(date) {
    while (date.getDay() !== firstWeekDay) {
        date.setDate(date.getDate() - 1);
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
            date = new Date(date);
            date.setDate(date.getDate() + 1);
        }
        weeks.push(week);
        week = [];
    } while (date.getMonth()<=month);
    return weeks;
}