import { from } from "seamless-immutable";
import { calculateToDuration } from "../../Functions/DateMoment";
import { getColumnDetail } from "./ColumnConfig";
import { t } from "../../Components/Translation";

export function sum(arr, decimal = 1) {
  // console.log('sum', arr)
  let result;
  if (arr.length > 0)
    result = arr.reduce((total, num) => total + num).toFixed(decimal);
  else result = 0;
  // console.log('sum', parseFloat(result))
  return parseFloat(result);
}

export function max(arr) {
  let result;
  if (arr.length > 0) result = Math.max(...arr);
  else result = 0;
  //  console.log('max', result)
  return result;
}

export function avg(arr, decimal = 0) {
  let result;
  if (arr.length > 0)
    result = (arr.reduce((total, num) => total + num, 0) / arr.length).toFixed(
      decimal
    );
  else result = 0;
  // console.log('avg', parseFloat(result))
  return parseFloat(result);
}

export function calFuelCons(sumDis = 0, sumFuel = 0, decimal = 2) {
  let result = sumDis / sumFuel;
  if (isNaN(result)) result = 0;
  result = result.toFixed(decimal);
  // console.log('calFuelCons', parseFloat(result))
  return parseFloat(result);
}

export function nameColReport(reportSelected, detailData) {
  let col = getColumnDetail(reportSelected).map((item) => item.column_name);
  let lst = [
    "total_time",
    "fuel_used",
    "co2",
    "over_speed_count",
    "speed_avg",
    "over_speed_time",
    "travel_time",
    "fuel_used",
    "fuel_cons",
    "distance",
    "over_speed_60_count",
    "over_speed_80_count",
    "over_speed_100_count",
    "over_speed_120_count",
    "total_distance",
    "fuel_cons",
  ];
  let footerCustom = [
    {
      index_row: 1,
      index_cell: 1,
      font: { bold: true },
      text: [t("other_reports_120")],
    },
    {
      index_row: 2,
      index_cell: 1,
      font: { bold: true },
      text: [t("other_reports_121")],
    },
  ];
  // console.log('col', col)
  for (let i in col) {
    if (lst.includes(col[i])) {
      // console.log('col[i]', col[i])
      if (col[i] === "fuel_cons") {
        let sumDis = sum(
          detailData.map((item) => item.total_distance || item.distance || 0)
        );
        let sumFuel = sum(
          detailData.map((item) => item.fuel_used),
          2
        );
        footerCustom.push(
          {
            text: "-",
            index_row: 1,
            index_cell: col[i],
            font: { bold: true },
            alignment: { horizontal: "center" },
          },
          {
            text: calFuelCons(sumDis, sumFuel),
            index_row: 2,
            index_cell: col[i],
            font: { bold: true },
            alignment: { horizontal: "right" },
          }
        );
      } else if (col[i] === "speed_avg") {
        let avgA = avg(detailData.map((item) => item[col[i]]));
        footerCustom.push(
          {
            text: "-",
            index_row: 1,
            index_cell: col[i],
            font: { bold: true },
            alignment: { horizontal: "center" },
          },
          {
            text: avgA,
            index_row: 2,
            index_cell: col[i],
            font: { bold: true },
            alignment: { horizontal: "right" },
          }
        );
      } else {
        let decimal;
        if (col[i] === "fuel_used") decimal = 2;
        let sumA = sum(
          detailData.map((item) => item[col[i]]),
          decimal
        );
        let avgA = avg(
          detailData.map((item) => item[col[i]]),
          decimal
        );
        if (
          col[i] === "total_time" ||
          col[i] === "over_speed_time" ||
          col[i] === "travel_time"
        ) {
          sumA = [calculateToDuration(sumA, "hideSec")];
          avgA = [calculateToDuration(avgA, "hideSec")];
        }

        footerCustom.push(
          {
            text: sumA,
            index_row: 1,
            index_cell: col[i],
            font: { bold: true },
            alignment: { horizontal: "right" },
          },
          {
            text: avgA,
            index_row: 2,
            index_cell: col[i],
            font: { bold: true },
            alignment: { horizontal: "right" },
          }
        );
      }
    } else {
      footerCustom.push(
        {
          text: "-",
          index_row: 1,
          index_cell: col[i],
          font: { bold: true },
          alignment: { horizontal: "center" },
        },
        {
          text: "-",
          index_row: 2,
          index_cell: col[i],
          font: { bold: true },
          alignment: { horizontal: "center" },
        }
      );
    }
  }

  // console.log('footerCustom', footerCustom)

  return footerCustom;
}
