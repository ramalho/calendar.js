calendar.js
============

Functions inspired by the calendar module from the Python standard library.

The `monthDates` function builds an array of weeks to display one month,
starting on Sunday (default) or Monday. Each week is an array of seven Date
instances, including dates from the month before or after, as needed to fill
the first and last weeks.

Optional formatting functions may be passed as third and fourth arguments:
one to format each date, the other to format each week.

    > cal = new c.Calendar();               // weeks start on Sunday by default
    > m = cal.monthDates(2012,0,            // January is 0 in JS Date
    ...   function(d) {return (' '+d.getDate()).slice(-2)}, 
    ...   function(w) {return w.join(' | ')}
    );
    > for (i=0; i<m.length; i++) console.log(m[i]);
     1 |  2 |  3 |  4 |  5 |  6 |  7
     8 |  9 | 10 | 11 | 12 | 13 | 14
    15 | 16 | 17 | 18 | 19 | 20 | 21
    22 | 23 | 24 | 25 | 26 | 27 | 28
    29 | 30 | 31 |  1 |  2 |  3 |  4

The `monthDays` function calls `monthDates` passing a simple function which
returns the day number from a date, or zero if the date does not belong to the
month.

    > cal = new Calendar(1);               // weeks starting on Monday
    > m = cal.monthDays(2012, 1);
    > for (i=0; i<m.length; i++) console.log(m[i]);
    [0, 0, 1, 2, 3, 4, 5]
    [6, 7, 8, 9, 10, 11, 12]
    [13, 14, 15, 16, 17, 18, 19]
    [20, 21, 22, 23, 24, 25, 26]
    [27, 28, 29, 0, 0, 0, 0]
