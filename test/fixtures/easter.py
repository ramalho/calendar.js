#!/usr/bin/env python
# calculating the date of Easter Sunday
# tested with Python24    vegaseat    16apr2006

import datetime
try:
    from dateutil.easter import easter
except ImportError:
    check = False
else:
    check = True

def calc_easter(year):
    """returns the date of Easter Sunday of the given yyyy year"""
    y = year
    # golden year - 1
    g = y % 19
    # offset
    e = 0
    # century
    c = y/100
    # h is (23 - Epact) mod 30
    h = (c-c/4-(8*c+13)/25+19*g+15)%30
    # number of days from March 21 to Paschal Full Moon
    i = h-(h/28)*(1-(h/28)*(29/(h+1))*((21-g)/11))
    # weekday for Paschal Full Moon (0=Sunday)
    j = (y+y/4+i+2-c+c/4)%7
    # number of days from March 21 to Sunday on or before Paschal Full Moon
    # p can be from -6 to 28
    p = i-j+e
    d = 1+(p+27+(p+6)/40)%31
    m = 3+(p+26)/30
    return datetime.date(y,m,d)


# test the calc_easter function
if __name__ == '__main__':
    for y in range(1970,2100):
        e = calc_easter(y)
        print e
        if check:
            assert e == easter(y), '%s != %s' % (e, easter(y))
