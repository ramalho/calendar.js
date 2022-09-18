# calendar-es6
============

## A fork of calendar.js

This package may be temporary. There is a pull request to include the changes provided in this package. 

There is a new method:  `monthMap(year, month, InfoClass)`

Also, the author has taken the liberty of using ES6 classes. The interface for use is about the same. There are few new test pages having to do with the new method.


## Original

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


Use in node.js

```
const Calendar = require('calendar')

or 
const {Calendar} = require('calendar')
```

Use in HTML:

```
 <script type="text/javascript" src="../lib/calendar.js"></script>
```


## New Memthod : `monthMap(year, month, InfoClass)`


This method is similar to `monthDays(year, month)`.

But, notice that it takes an **InfoClass**.  The **InfoClass** is a class that will occupy a day of the month. It is expected to have a constructor that take an index and day parameters.

For example, a minimal class definition for InfoClass would be the following:

```
class Events {
    constructor(day,index) {
        this.day = day
        this.index = index
    }
}
```

The method returns a structure with three fields:

* **list**
* **table**
* **map**

The table is returned by **monthDates**. As above, but it will have the Boolean value **false** instead of 0 (zero). And, it will have string which are comma delimmited pairs, e.g. "2,3", for day and index. The string pairs are keys into the map.

The list is a flattened version of the table. The *index* parameter finds a key to the class instance in the list. The class instance will be in the map. The list will either have a key to a day in the month, or it will have a Boolean value **false**. The false value represents that the day is not in the month. These are at either end of the list.

Here is an example of outout: 

```
{
  table: [
    [
      false, false, false, '1,3', '2,4', '3,5', '4,6'
    ],
    [
      '5,7',   '6,8', '7,9',   '8,10', '9,11',  '10,12', '11,13'
    ],
    [
      '12,14', '13,15', '14,16', '15,17', '16,18', '17,19', '18,20'
    ],
    [
      '19,21', '20,22', '21,23', '22,24', '23,25', '24,26', '25,27'
    ],
    [
      '26,28', '27,29', '28,30', '29,31', '30,32', false, false
    ]
  ],
  list: [
    false,   false,   false,   '1,3',
    '2,4',   '3,5',   '4,6',   '5,7',
    '6,8',   '7,9',   '8,10',  '9,11',
    '10,12', '11,13', '12,14', '13,15',
    '14,16', '15,17', '16,18', '17,19',
    '18,20', '19,21', '20,22', '21,23',
    '22,24', '23,25', '24,26', '25,27',
    '26,28', '27,29', '28,30', '29,31',
    '30,32', false,   false
  ],
  map: {
    '1,3': Events { day: 1, index: 3 },
    '2,4': Events { day: 2, index: 4 },
    '3,5': Events { day: 3, index: 5 },
    '4,6': Events { day: 4, index: 6 },
    '5,7': Events { day: 5, index: 7 },
    '6,8': Events { day: 6, index: 8 },
    '7,9': Events { day: 7, index: 9 },
    '8,10': Events { day: 8, index: 10 },
    '9,11': Events { day: 9, index: 11 },
    '10,12': Events { day: 10, index: 12 },
    '11,13': Events { day: 11, index: 13 },
    '12,14': Events { day: 12, index: 14 },
    '13,15': Events { day: 13, index: 15 },
    '14,16': Events { day: 14, index: 16 },
    '15,17': Events { day: 15, index: 17 },
    '16,18': Events { day: 16, index: 18 },
    '17,19': Events { day: 17, index: 19 },
    '18,20': Events { day: 18, index: 20 },
    '19,21': Events { day: 19, index: 21 },
    '20,22': Events { day: 20, index: 22 },
    '21,23': Events { day: 21, index: 23 },
    '22,24': Events { day: 22, index: 24 },
    '23,25': Events { day: 23, index: 25 },
    '24,26': Events { day: 24, index: 26 },
    '25,27': Events { day: 25, index: 27 },
    '26,28': Events { day: 26, index: 28 },
    '27,29': Events { day: 27, index: 29 },
    '28,30': Events { day: 28, index: 30 },
    '29,31': Events { day: 29, index: 31 },
    '30,32': Events { day: 30, index: 32 }
  }
}
```

