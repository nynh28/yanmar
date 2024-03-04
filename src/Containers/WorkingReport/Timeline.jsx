
import React, { useEffect, useRef } from "react";
import './style.css'
import ReactApexCharts from 'react-apexcharts'
import moment from "moment";
import { rTT, t } from "../../helpers";

let defaultData = [
  {
    x: '  ',
    y: [0, 0]
  }
]
let defaultVisualRange = ['2023-01-01 00:00:00', '2023-01-01 23:59:59']
let defaultDate = "2023-01-01"
const Timeline = (props) => {
  let { dataSource } = props
  const chartRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setDataChart(), 1000);
  }, [dataSource])

  //#region SET TIMELINE
  const setDataChart = () => {
    let timelines = []
    dataSource.map((item) => {
      item.working.map((work) => {
        timelines.push({
          "x": item.date,
          "y": [
            new Date(`${defaultDate} ${work.start.split(' ')[1]}`).getTime(),
            new Date(`${defaultDate} ${work.stop.split(' ')[1]}`).getTime()
          ]
        })
      })
    })
    updateBarRange(defaultVisualRange)
    if (timelines.length > 0) updateSeries(timelines)
  }

  const updateSeries = (dataChart) => {
    let data = [{
      data: [...dataChart]
    }]
    chartRef.current !== null && chartRef.current.updateSeries(data)
  }

  const updateBarRange = (defaultVisualRange) => {
    try {
      chartRef.current !== null && chartRef.current.updateOptions({
        xaxis: {
          type: 'datetime',
          labels: {
            datetimeUTC: false,
            datetimeFormatter: {
              year: 'yyyy',
              month: 'MMM \'yy',
              day: 'dd MMM',
              hour: 'HH:mm'
            },
          },
          min: new Date(defaultVisualRange[0]).getTime(),
          max: new Date(defaultVisualRange[1]).getTime(),
          tickPlacement: 'between'
        },
      })
    } catch (err) {
      console.log(err)
    }
  }
  //#endregion

  return (
    <div id="barchart_time" style={{ marginLeft: 8 }}>
      <ReactApexCharts
        options={{
          chart: {
            animations: { enabled: false },
            type: 'rangeBar',
            events: {
              beforeMount: function (chartContext, config) {
                chartRef.current = chartContext
              }
            },
            toolbar: {
              show: false,
              tools: {
                zoomin: false,
                zoomout: false,
                download: false,
                selection: false,
                zoom: false,
                pan: false,
                reset: false
              }
            },
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: '70%'
            }
          },
          xaxis: {
            type: 'datetime',
            position: 'top',
            labels: {
              datetimeUTC: false,
              datetimeFormatter: {
                year: 'yyyy',
                month: 'MMM \'yy',
                day: 'dd MMM',
                hour: 'HH:mm'
              }
            },
            min: new Date('2021-05-01 00:00:00').getTime(),
            max: new Date('2021-05-01 23:59:59').getTime(),
            tickPlacement: 'between',

          },
          yaxis: {
            show: true,
            labels: {
              show: true,
              align: 'left',
              maxWidth: 250,
              style: {
                fontSize: '14px'
              },
              formatter: (value) => {
                let findDataOfDate = dataSource.find((item) => item.date === value)
                if (findDataOfDate) {
                  let hour = `${findDataOfDate.total_working_in_hour}`
                  let textLength = hour.length
                  return `${moment(value).format("DD/MM/YYYY")} :${textLength === 1 ? '      ' : textLength === 2 ? '   ' : textLength === 3 ? '   ' : ' '}${findDataOfDate.total_working_in_hour}${rTT(t('ecotree_22'))}`
                }
                else {
                  return value
                }
              },
            }
          },
          stroke: {
            enabled: true
          },
          fill: {
            type: 'solid',
            opacity: 1,
            colors: '#008b14'
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left'
          },

          tooltip: {
            enabled: false,
            autoSelected: 'pan'
          }
        }}
        series={[
          {
            data: defaultData
          }
        ]}
        type="rangeBar"
        height={100 + ((dataSource.length - 1) * 30)}
      />
    </div >
  )
}

export default Timeline