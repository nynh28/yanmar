import React, { Component } from 'react'
import { connect } from 'react-redux'
import PlaybackActions from '../../../Redux/PlaybackRedux'
import ReactApexCharts from 'react-apexcharts'
import moment from 'moment';
import $ from 'jquery'

let chartRef = null, updateInterval = null, dataTemp = [], cursorTime = "", isCursorChange = false
let defaultData = [
    {
        x: ' ',
        y: [
            new Date('2021-01-01 00:00:00').getTime(),
            new Date('2021-01-01 00:00:00').getTime()
        ],
        fillColor: '#FFF'
    },
    {
        x: '  ',
        y: []
    },
    {
        x: '   ',
        y: []
    },
    {
        x: '    ',
        y: []
    }
]


class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkCursorInterval: '',
            dataChart: [],
            chartDefault: true,
            series: [
                {
                    data: defaultData
                }
            ],
            options: {
                chart: {
                    animations: { enabled: false },
                    type: 'rangeBar',
                    events: {
                        beforeMount: function (chartContext, config) {
                            // console.log("beforeMount : ", chartContext)
                            chartRef = chartContext
                        },
                        dataPointSelection: function (event, chartContext, config) {
                            let point = dataTemp[0].data[config.dataPointIndex]

                            chartRef.updateOptions({
                                annotations: {
                                    xaxis: [{
                                        x: point.y[0],
                                        strokeDashArray: 0,
                                        borderColor: 'red',
                                        yAxisIndex: 0,
                                        label: {
                                            show: true,
                                            style: {
                                                color: "#fff",
                                                background: '#775DD0',
                                                position: 'top',
                                            },
                                        }
                                    }]
                                }
                            })

                            // cursorTime = point.y[1]
                            cursorTime = point.y[0]
                            isCursorChange = true
                        }
                    },
                    toolbar: {
                        show: false,
                        tools: {
                            zoomin: true,
                            zoomout: true,
                            download: false,
                            selection: true,
                            zoom: true,
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
                    labels: {
                        datetimeUTC: false,
                        datetimeFormatter: {
                            year: 'yyyy',
                            month: 'MMM \'yy',
                            day: 'dd MMM',
                            hour: 'HH:mm'
                        },
                    },
                    min: new Date('2021-05-01 00:00:00').getTime(),
                    max: new Date('2021-05-01 23:59:59').getTime(),
                    tickPlacement: 'between',

                },
                stroke: {
                    enabled: false,
                    // width: 1,
                    // colors: ['red']
                },
                fill: {
                    type: 'solid',
                    opacity: 0.6
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left'
                },
                annotations: {
                    xaxis: [{
                        x: '',
                        strokeDashArray: 0,
                        borderColor: 'red',
                        yAxisIndex: 0,
                        label: {
                            show: true,
                            style: {
                                color: "#fff",
                                background: '#775DD0',
                                position: 'top',
                            },
                        }
                    }]
                },
                tooltip: {
                    enabled: false,
                    autoSelected: 'pan'
                }
            },
        }
        this.lineCurrent = 0
        this.checkCursorInterval = this.checkCursorInterval.bind(this);
    }

    checkCursorInterval() {
        if (isCursorChange) {
            this.props.setValue("skipTimeChart", moment(cursorTime, 'x').format('YYYY-MM-DD HH:mm:ss'))
            isCursorChange = false
        }
        this.props.refBarChart(chartRef)
    }

    componentWillMount() {
        updateInterval = setInterval(() => this.checkCursorInterval(), 1000);
    }

    componentWillUnmount() {
        clearInterval(updateInterval)
    }


    shouldComponentUpdate(nextProps, nextState) {
        let { dataChart, defaultVisualRange, videoTime, channelChecked } = this.props

        if (nextProps.dataChart !== dataChart) {
            // console.log("defaultVisualRange : ", defaultVisualRange)
            this.updateCursorBar('')
            this.updateBarRange(defaultVisualRange)
            if (nextProps.dataChart.length > 0) {
                let data = JSON.parse(JSON.stringify(nextProps.dataChart))
                // console.log("data : ", data)
                // console.log("channelChecked : ", channelChecked)

                for (let idx in channelChecked) {
                    let index = data.findIndex(x => x.x == channelChecked[idx])
                    if (index < 0) {
                        data.push({ x: channelChecked[idx], y: [] })
                    }
                }

                let channelCount = channelChecked.length, space = " "
                if (channelCount < 4) {
                    while (channelCount < 4) {
                        data.push({ x: space, y: [] })
                        channelCount++
                        space += " "
                    }
                }

                this.updateSeries(data)
            }
            else {

                let channelCount = channelChecked.length, _defaultData = [], space = " "
                // console.log("channelChecked : ", channelChecked)
                for (let idx in channelChecked) {
                    idx < 4 && _defaultData.push({
                        x: channelChecked[idx],
                        y: [new Date('2021-01-01 00:00:00').getTime(),
                        new Date('2021-01-01 00:00:00').getTime()]
                    })
                }

                if (_defaultData.length > 0) {
                    // console.log("channelChecked : ", channelChecked)
                    if (channelCount < 4) {
                        while (channelCount < 4) {
                            _defaultData.push({ x: space, y: [] })
                            channelCount++
                            space += " "
                        }
                    }
                    // console.log("_defaultData : ", _defaultData)
                    this.updateSeries(_defaultData)
                }
                else {
                    this.updateSeries(defaultData)
                }
            }

            return true
        }

        if (nextProps.defaultVisualRange !== defaultVisualRange) { return false }

        if (nextProps.videoTime !== videoTime) {
            console.log(">>> skip videoTime  :", videoTime)
            !isCursorChange && this.updateCursorBar(nextProps.videoTime)
            return false
        }

        return true
    }

    updateSeries(dataChart) {
        let data = [{
            data: [...dataChart]
        }]
        chartRef !== null && chartRef.updateSeries(data)
        dataTemp = data
    }

    updateCursorBar(datetime) {
        chartRef !== null && chartRef.updateOptions({
            annotations: {
                xaxis: [{
                    x: new Date(datetime).getTime(),
                    strokeDashArray: 0,
                    borderColor: 'red',
                    yAxisIndex: 0,
                    label: {
                        show: true,
                        style: {
                            color: "#fff",
                            background: '#775DD0',
                            position: 'top',
                        },
                    }
                }]
            }
        })
    }

    updateBarRange(defaultVisualRange) {
        console.log("chartRef : ", chartRef)
        chartRef !== null && chartRef.updateOptions({
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
    }


    render() {
        let { dataChart, defaultVisualRange, channelChecked } = this.props
        // console.log(">> REDNDER BAR CHART << ", dataChart.length)
        console.log("CHART RENDER")


        return (
            <div id="barchart_time" onClick={() => { }}>
                <ReactApexCharts
                    options={this.state.options}
                    series={this.state.series}
                    type="rangeBar"
                    height={180}
                />
            </div >
        )

    }
}


const mapStateToProps = (state) => ({
    dataChart: state.playback.dataChart,
    defaultVisualRange: state.playback.defaultVisualRange,
    channelChecked: state.playback.channelChecked,
    videoTime: state.playback.videoTime,
})

const mapDispatchToProps = (dispatch) => ({
    setValue: (name, value) => dispatch(PlaybackActions.setValue(name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BarChart)

let datatChartTest = [
    {
        "chn": 1,
        "starttime": "2021-04-01 10:00:00",
        "endtime": "2021-04-01 14:00:00"
    },
    {
        "chn": 2,
        "starttime": "2021-04-01 10:00:00",
        "endtime": "2021-04-01 17:00:00"
    },
    {
        "chn": 3,
        "starttime": "2021-04-01 10:00:00",
        "endtime": "2021-04-01 17:00:00"
    },
    {
        "chn": 4,
        "starttime": "2021-04-01 10:00:00",
        "endtime": "2021-04-01 16:00:00"
    },
    {
        "chn": 4,
        "starttime": "2021-04-01 20:00:00",
        "endtime": "2021-04-01 21:00:00"
    }
]