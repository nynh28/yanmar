import moment from 'moment';

export function VideoTime(seconds, startTime) {
    let _timeStart = startTime.hours() + ":" + startTime.minutes() + ":" + startTime.seconds()
    let _sumSecords = (seconds + timeToSeconds(_timeStart))

    return moment(startTime).format('YYYY-MM-DD ' + format(_sumSecords))
}

function format(seconds) {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = pad(date.getUTCSeconds())
    if (hh) {
        return `${pad(hh)}:${pad(mm)}:${ss}`
    }
    return '00:' + `${pad(mm)}:${ss}`
}

function timeToSeconds(time) {
    var actualTime = time.split(':');
    return (+actualTime[0]) * 60 * 60 + (+actualTime[1]) * 60 + (+actualTime[2]);
}

function pad(string) {
    return ('0' + string).slice(-2)
}