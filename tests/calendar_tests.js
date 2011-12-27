var jan_1_2012 = new Date(2012,0,1);

test('January 1, 2012 is Sunday', function() {
    equal(jan_1_2012.toISOString().slice(0,10), '2012-01-01', 'month 0 is January');
    equal(jan_1_2012.getDay(), 0, 'weekday 0 is Sunday');
});
test('weekStartDate', function() {
    equal(weekStartDate(jan_1_2012), jan_1_2012, 'Jan. 1st 2012 is the start of a week');
    deepEqual(weekStartDate(new Date(2012,0,2)), jan_1_2012, 'first week of 2012 starts on Jan. 1st');
    deepEqual(weekStartDate(new Date(2012,0,7)), jan_1_2012, 'first week of 2012 starts on Jan. 1st');
    deepEqual(weekStartDate(new Date(2012,0,8)), new Date(2012,0,8), 'second week of 2012 starts on Jan. 8th');
    deepEqual(weekStartDate(new Date(2012,0,10)), new Date(2012,0,8), 'second week of 2012 starts on Jan. 8th');
});
test('monthDatesCalendar', function() {
    var mdc_jan_2012 = monthDatesCalendar(2012,0);
    var mdc_feb_2012 = monthDatesCalendar(2012,1);
    equal(mdc_jan_2012.length, 5, 'January 2012 spans 5 calendar weeks');
    equal(mdc_feb_2012.length, 5, 'February 2012 spans 5 calendar weeks');
    deepEqual(mdc_jan_2012[0][0], jan_1_2012, 'first Sunday is Jan. 1st. = '+mdc_jan_2012[0][0]);
    deepEqual(mdc_jan_2012[1][0], new Date(2012,0,8), 'second Sunday is Jan. 8th.');
    deepEqual(mdc_jan_2012[mdc_jan_2012.length-1][6], new Date(2012,1,4), 'last Saturday Feb. 4th.');
    deepEqual(mdc_feb_2012[mdc_feb_2012.length-1][6], new Date(2012,2,3), 'last Saturday Mar. 3rd. ='+mdc_feb_2012[4][6]);
});
