import React, { Component } from 'react'
import { connect } from 'react-redux'
import PlaybackActions from '../../../Redux/PlaybackRedux'
import {
    Chart,
    CommonSeriesSettings,
    Legend,
    SeriesTemplate,
    Animation,
    ArgumentAxis,
    Tick,
    Title,
    Crosshair,
    HorizontalLine,
    Export,
    Tooltip,
    ZoomAndPan,
    ScrollBar,
    Font,
    Label,
    ValueAxis,
    CommonAxisSettings,
    Grid,
    Border,
    Point,
    Series,
    Margin

} from 'devextreme-react/chart';
import moment from 'moment';
import { dataChartTest } from './data.js';
import $ from 'jquery'

let indexTest = 0

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataChart: [],
            chartDefault: true
        }
        this.lineCurrent = 0
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { dataChart, defaultVisualRange, videoTime } = this.props

        if (nextProps.dataChart !== dataChart) {
            return true
        }

        if (nextProps.defaultVisualRange !== defaultVisualRange) {
            return false
        }

        if (nextProps.videoTime !== videoTime) {
            // this.crosshairCustom(nextProps.videoTime, indexTest)
            // indexTest++
            return false
        }

        return true
    }

    crosshairCustom(videoTime, index) {
        console.log("_______crosshairCustom_____")

        console.log(">> time playing ", videoTime)
        console.log("index : ", index)
        try {
            let points = this.chartRef.target.series[0]._points

            console.log("points : ", points)
            if (index < points.length) {
                $("#barchart_time .dxc-crosshair-cursor").attr("visibility", "visible")
                $("#barchart_time .dxc-crosshair-cursor circle").attr("cx", "869")
                $("#barchart_time .dxc-crosshair-cursor circle").attr("r", "7.5")
                $("#barchart_time .dxc-crosshair-cursor g").attr("transform", "translate(" + (points[index].x - 21) + ", 0)")
                $("#barchart_time .dxc-crosshair-cursor g path").attr("d", "M 19 0 L 19 150 " + 20)
                $("#barchart_time .dxc-crosshair-cursor g path").attr("stroke-width", "1")
                $("#barchart_time .dxc-crosshair-cursor g path").attr("stroke", "#000")
                $("#barchart_time .dxc-crosshair-cursor circle").remove();

                // this.createCrosshair((points[index].x - 21))

                this.lineCurrent = (points[index].x - 21)
            }
        } catch {
        }
    }


    test() {
        $("#barchart_time .dxc-crosshair-cursor").attr("visibility", "visible")
        $("#barchart_time .dxc-crosshair-cursor circle").attr("cx", "869")
        $("#barchart_time .dxc-crosshair-cursor circle").attr("r", "7.5")
        $("#barchart_time .dxc-crosshair-cursor g").attr("transform", "translate(" + this.lineCurrent + ", 0)")
        $("#barchart_time .dxc-crosshair-cursor g path").attr("d", "M 19 0 L 19 150 " + 20)
        $("#barchart_time .dxc-crosshair-cursor g path").attr("stroke-width", "1")
        $("#barchart_time .dxc-crosshair-cursor g path").attr("stroke", "#000")
        $("#barchart_time .dxc-crosshair-cursor circle").remove();
    }

    createCrosshair(translate) {
        $("#barchart_time .dxc-annotations").prepend(`<g transform="translate(` + translate + `,0)">
            <path d="M 19 0 L 19 44" 
                transform="translate(0,0)" 
                stroke="red" 
                stroke-width="1" 
                stroke-linecap="butt">
            </path>
            <path d="M 19 44 L 19 150 20" 
                transform="translate(0,0)" 
                stroke="red" 
                stroke-width="1" 
                stroke-linecap="butt">
            </path>
        </g>`)
    }

    addCrosshair() {

        // $("#barchart_time .dxc-crosshair-cursor").append(`<circle cx="19" cy="0" r="0" stroke="#FFF" stroke-width="0">
        // </circle> <g> </g>
        // <g>
        //     <path d="M 19 0 L 19 0" transform="translate(0,0)" stroke="#FFF" stroke-width="0" stroke-linecap="butt">
        //     </path><path d="M 19 0 L 19 0" transform="translate(0,0)" stroke="#FFF" stroke-width="0" stroke-linecap="butt">
        //     </path>
        // </g> `)

        $("#barchart_time .dxc-crosshair-cursor").prepend(`<g id="SvgjsG1118" class="apexcharts-xaxis-annotations"><line id="SvgjsLine1119" x1="300.0179621186052" y1="100" x2="300.0179621186052" y2="288.2" stroke="red" stroke-dasharray="0" stroke-width="1"></line></g>`)
        $("#barchart_time svg").prepend(`<g id="SvgjsG1118" class="apexcharts-xaxis-annotations"><line id="SvgjsLine1119" x1="300.0179621186052" y1="100" x2="300.0179621186052" y2="288.2" stroke="red" stroke-dasharray="0" stroke-width="1"></line></g>`)
    }




    componentDidMount() {
        // this.addCrosshair()
    }

    render() {
        // let { dataChart } = this.state
        let { dataChart, defaultVisualRange, channelChecked } = this.props
        // console.log(">> REDNDER BAR CHART << ", dataChart.length)
        // console.log(">> REDNDER BAR CHART << ", JSON.stringify(dataChart))
        console.log("CHART RENDER")


        return (
            <div id="barchart_time" onClick={() => { }}>
                <Chart
                    onDone={(chartRef) => {
                        this.chartRef = chartRef
                        // this.addCrosshair()
                    }}
                    // dataSource={datatChartTest}
                    dataSource={dataChart}
                    rotated={true}
                    size={{ height: 180 }}
                    // customizePoint={(arg) => this.customizePoint(arg)}
                    onPointClick={(e) => {
                        console.log("onPointClick e : ", e)
                        console.log("onPointClick : ", moment(e.target.data.starttime).format("YYYY-MM-DD HH:mm:ss"))
                        console.log("index : ", e.target.index)
                        this.crosshairCustom("", e.target.index)
                        // this.props.setValue("skipTimeChart", moment(e.target.data.starttime).format("YYYY-MM-DD HH:mm:ss"))
                    }}
                    onPointHoverChanged={() => this.test()}
                >
                    <ArgumentAxis
                        // categories={[...channelChecked]}
                        categories={[1, 2, 3, 4]}
                    >
                    </ArgumentAxis>

                    <ValueAxis
                        valueMarginsEnabled={false}
                        minVisualRangeLength={{ minutes: 10 }}
                        position={"bottom"}
                        // visualRange={defaultVisualRange}
                        defaultVisualRange={defaultVisualRange}
                        valueType={'datetime'}
                        label={{
                            format: "HH:mm"
                        }}
                    >
                        <Label>
                            <Font size={"9"} family={"Prompt"} weight={500} />
                        </Label>
                    </ValueAxis>

                    <CommonSeriesSettings
                        color={"#36d7b7"}
                        type="rangeBar"
                        argumentField="chn"
                        // rangeValue1Field="starttime"
                        // rangeValue2Field="endtime"
                        rangeValue1Field="timeStartForRange"
                        rangeValue2Field="timeStartForRange"
                        barOverlapGroup="chn"
                    ></CommonSeriesSettings>

                    <Crosshair
                        enabled={true}
                        horizontalLine={false}
                        width={0}
                        color='#FFF'
                    >
                        <HorizontalLine visible={false} />
                    </Crosshair>
                    <SeriesTemplate nameField="chn" />
                    <Animation enabled={false} />
                    <Tooltip enabled={false} />
                    <Legend visible={false} />
                </Chart >
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