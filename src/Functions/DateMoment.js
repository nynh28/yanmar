import React, { Suspense } from 'react'
import moment from 'moment-timezone';
// import { t } from '../Components/Translation'
import { useTranslation } from 'react-i18next'

const versatile = state => state.versatile

export function t(KEY_NAME) {
  const Translation = () => {
    const { t } = useTranslation()
    return t(KEY_NAME)
  }
  return <Translation />
}

export function momentDate(striDate, format = 'DD/MM/YYYY HH:mm:ss', nameTimeZone = 'Asia/Bangkok', lang = 'en') {
  if (striDate === '' || striDate === null || striDate === '-') {
    return '-'
  }
  if (typeof striDate === 'number') {
    if (striDate.toString().length === 10 || striDate.toString().includes('.')) {
      striDate = striDate * 1000
    }
  }
  return moment.utc(striDate).tz(nameTimeZone).lang(lang).format(format)
  // return moment.utc(striDate).tz(nameTimeZone).format('DD/MM/YYYY HH:mm:ss ZZ')
}

export function momentDate2(striDate, format = 'DD/MM/YYYY HH:mm:ss', nameTimeZone = 'Africa/Abidjan', lang = 'en') {
  if (striDate === '' || striDate === null || striDate === '-') {
    return '-'
  }
  if (typeof striDate === 'number') {
    if (striDate.toString().length === 10 || striDate.toString().includes('.')) {
      striDate = striDate * 1000
    }
  }

  return moment(striDate).tz(nameTimeZone).format(format)
}

export function calculateToTimestamp(date, time = 0) {
  if (!date._isAMomentObject) date = moment(date)

  let timestamp = Number(date.format('X')) + time
  return timestamp
}

export function calculateToDuration(time, format) {
  // time = 246363
  // const ver = yield select(versatile)
  if (format === 'drivingTime') {
    let hour = ((time / 1000) / 60) | 0
    let minute = (time / 1000) % 60 | 0
    return <Suspense>
      {hour !== 0 && <span>{hour}{' '}{t('realtime_44')}</span>}
      <span>{' '}{minute}{' '} {t('realtime_45')}</span>
    </Suspense>
  } else {
    let hour = (time / 3600) | 0
    time -= (3600 * hour)
    let minute = (time / 60) | 0
    let second = time - (60 * minute)
    //  return  ((hour === 0 ? '' : hour + 'h ') + (minute === 0 ? '' : minute + 'm ') + second + 's')
    if (format === 'hideSec') {
      return <span>
        {hour !== 0 && [hour + ' ', t('realtime_44'), ' ']}
        {[minute + ' ', t('realtime_45')]}
      </span>
    } else {
      return <span>
        {hour !== 0 && [hour + ' ', t('realtime_44'), ' ']}
        {(minute !== 0 || hour !== 0) && [minute + ' ', t('realtime_45'), ' ']}
        {[second + ' ', t('realtime_90')]}
      </span>
      // return <Suspense>
      //   {hour !== 0 && <span>{hour}{' '}{t('realtime_44')}{' '}</span>}
      //   {minute !== 0 && <span>{minute}{' '}{t('realtime_45')}{' '}</span>}
      //   <span>{second}{' '}{t('realtime_90')}</span>
      // </Suspense>
    }
  }
}


export function isDate(sDate) {
  if (sDate.toString() == parseInt(sDate).toString()) return false;
  var tryDate = new Date(sDate);
  return (tryDate && tryDate.toString() != "NaN" && tryDate != "Invalid Date");
}

