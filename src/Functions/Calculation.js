import moment from 'moment-timezone';

export function formatMath(num) {
  var str = num.toString().split('.');
  if (str[0].length >= 4) {
    //add comma every 3 digits befor decimal
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str.length == 2) {
    if (str[1].length >= 2) {
      str[1] = str[1].match(/^\d{1}|[1-9]\d{1}$/);
    }
  } else {
    str.push('0');
  }
  return str.join('.');
}

export function numberWithComma(num) {
  try {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } catch {
    return num
  }
}