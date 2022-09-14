let {Calendar} = require('../lib/calendar')

let cal = new Calendar(1)


class Events {
    constructor(day,index) {
        this.day = day
        this.index = index
    }
}

let m = cal.monthMap(2022, Calendar.SEP, Events);

let table = m.table

console.log("----------------------------------------------------------------")
for ( let row of table ) {
    let out = ""
    for ( let col of row ) {
        if ( col ) {
            let info = m.map[col]
            out += info.day + "\t"
        } else out += "-\t"
    }
    console.log(out)
    console.log("----------------------------------------------------------------")
}


