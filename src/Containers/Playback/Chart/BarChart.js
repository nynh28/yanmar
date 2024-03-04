import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import dataSource from './data.js';
import moment from 'moment';
import { registerPlugin } from 'filepond';



const ChartRenders = (arg) => {

    let countChannel = 3

    return <Chart
        // ref={arg.chartRef}
        // onDone={(e) => arg.onDone(e)}
        palette="Violet"
        dataSource={arg.dataSource}
        style={{ height: 190 }}
    // onPointHoverChanged={(e) => arg.onPointHoverChanged(e)}
    // onSeriesClick={(e) => arg.onSeriesClick(e)}
    // onOptionChanged={(e) => {
    //     if (e.fullName === 'argumentAxis.visualRange') {
    //         const range = e.value;
    //         let newRange = [moment(range[0]).format('YYYY-MM-DD HH:mm:ss'), moment(range[1]).format('YYYY-MM-DD HH:mm:ss')]
    //         arg.visualRangeChange(newRange)
    //     }
    // }}
    >
        <Animation
            enabled={false}
        />
        <CommonAxisSettings>
            <Grid visible={true} />
        </CommonAxisSettings>

        <CommonSeriesSettings
            argumentField={'starttime'}
        >
            <Border visible={false} />
            <Point hoverMode="allArgumentPoints" />
        </CommonSeriesSettings>

        {/* <Series
            type={"scatter"}
            valueField={"chn"}
            color={"#000"}
            border={{
                color: "#595959",
                width: 1,
                visible: true
            }}
            barWidth={200}
            width={2}
        >
            <Point symbol="square" />
        </Series> */}

        {
            arg.series.map((item, i) => {
                return (<Series
                    type={item.type}
                    valueField={item.valueField}
                    color={"#000"}
                    border={{
                        color: "#595959",
                        width: 1,
                        visible: true
                    }}
                    barWidth={200}
                    width={2}
                >
                    <Point
                        visible={true}
                        size={item.point.size}>
                    </Point>
                </Series>)
            })
        }



        <ValueAxis
            min={2}
            max={5}
            title={{
                margin: 10
            }}
        >
            <Grid visible={true} />
            <Label customizeText={arg.customizeTextSensor} />
        </ValueAxis>

        <Margin bottom={20} />

        <ArgumentAxis
            minVisualRangeLength={{ minutes: 10 }}
            // defaultVisualRange={[moment('2021-03-17 00:00:00'), moment('2021-03-17 23:59:59')]}
            // defaultVisualRange={arg.defaultVisualRange}
            visualRange={arg.defaultVisualRange}
            position={"top"}
            argumentType={'datetime'}
            label={{
                format: "HH:mm"
            }}
        />

        <Crosshair
            horizontalLine={false}
            enabled={true}
            width={2}
            color='#000'
        >
            <HorizontalLine visible={false} />
        </Crosshair>

        <Legend visible={false} />
        <Export enabled={false} />
        <Tooltip enabled={false} />
        {/* <ZoomAndPan visible={false} argumentAxis={'both'} dragToZoom={true} allowMouseWheel={false} /> */}
        <ScrollBar visible={false} />
    </Chart >
}


class BarChart extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        let { dataChart, defaultVisualRange } = this.props

        if (nextProps.dataChart !== dataChart) {
            console.log("dataChart change :  ", nextProps.dataChart)

            console.log("DATA > ", JSON.stringify(nextProps.dataChart))

            return true
        }


        if (nextProps.defaultVisualRange !== defaultVisualRange) {
            return false
        }

        return true
    }



    //#region  EXAM

    customizeText = (val) => {
        const time = moment(val.value).format("HH:mm");
        console.log("customizeText : ", time)
        return time == "00:00" ? " 00:00 " : time;
    };


    //#endregion

    customizeTextSensor(e) {
        // if (e.value == 0)
        //     return "";
        // else
        //     return e.value
        // if (e.value == 1) return "";
        if (e.value < 2) return "";
        if (e.value === 2) return "1";
        if (e.value === 3) return "2";
        if (e.value === 4) return "3";
        if (e.value === 5) return "4";
    }



    render() {
        let { dataChart, defaultVisualRange } = this.props

        console.log("defaultVisualRange : ", defaultVisualRange)

        let isTrue = true

        const categories_speed_level = [
            "เข้าสถานี",
            "ขับขี่ > 100 กม./ชม.",
            "ขับขี่ 81-100 กม./ชม.",
            "ขับขี่ 61-80 กม./ชม.",
            "ขับขี่ < 60 กม./ชม.",
            "จอดไม่ดับเครื่อง",
            "จอดดับเครื่อง",
        ];

        console.log(JSON.parse(JSON.stringify(dataSource)))


        if (isTrue) {
            // return <ChartRenders dataSource={[]} />
            return <ChartRenders
                dataSource={dataChart}
                defaultVisualRange={defaultVisualRange}
                customizeTextSensor={this.customizeTextSensor}
                series={[
                    {
                        type: 'scatter',
                        valueField: 'chn4',
                        color: 'clutch',
                        point: {
                            symbol: "circle",
                            size: 6
                        }
                    },
                    {
                        type: 'scatter',
                        valueField: 'chn3',
                        color: 'dtc',
                        point: {
                            symbol: "circle",
                            size: 6
                        }
                    },
                    {
                        type: 'scatter',
                        valueField: 'chn2',
                        color: 'exhaust',
                        point: {
                            symbol: "circle",
                            size: 6
                        }
                    },
                    {
                        type: 'scatter',
                        valueField: 'chn1',
                        color: 'brake',
                        point: {
                            symbol: "circle",
                            size: 6
                        }
                    }
                ]}
            />
            // return <Chart
            //     id="timeline-chart-v1"
            //     dataSource={dataTest2}
            //     rotated={true}
            //     size={{ height: 180 }}
            // >
            //     <ArgumentAxis categories={categories_speed_level}>
            //         <Label
            //             customizeText={(val) => {
            //                 return;
            //             }}
            //         >
            //             <Font size={"9"} family={"Prompt"} weight={500} />
            //         </Label>
            //     </ArgumentAxis>
            //     <ValueAxis valueMarginsEnabled={false} axisDivisionFactor={30}>
            //         <Label customizeText={(val) => this.customizeText(val)}>
            //             <Font size={"9"} family={"Prompt"} weight={500} />
            //         </Label>
            //     </ValueAxis>
            //     <CommonSeriesSettings
            //         type="rangeBar"
            //         argumentField="speed_level"
            //         rangeValue1Field="start"
            //         rangeValue2Field="end"
            //         barOverlapGroup="speed_level"
            //     />
            //     <SeriesTemplate nameField="speed" />
            //     <Animation enabled={false} />
            //     <Tooltip enabled={false} />
            //     <Legend visible={false} />
            // </Chart>
        }
        else {
            return (
                <Chart
                    id="timeline-chart-v2"
                    dataSource={dataChart}
                    // customizePoint={(arg) => this.customizePoint(arg)}
                    rotated={true}
                    size={{ height: 180 }}
                >
                    <ArgumentAxis
                        categories={[1, 2, 3, 4]}
                        // minVisualRangeLength={{ minutes: 10 }}
                        // defaultVisualRange={['2021-03-01 00:00:00', '2021-03-01 23:59:59']}
                        // argumentType={'datetime'}
                        // label={{
                        //     format: "HH:mm"
                        // }}
                        position={"top"}
                    >

                    </ArgumentAxis>

                    {/* <ValueAxis valueMarginsEnabled={false} axisDivisionFactor={30}>
                    <Label customizeText={(e) => this.customizeText(e)}>
                        <Font size={"9"} family={"Prompt"} weight={500} />
                    </Label>
                </ValueAxis> */}

                    {/* <ValueAxis
                        // minVisualRangeLength={{ minutes: 10 }}
                        defaultVisualRange={[moment('2021-03-01 00:00:00'), moment('2021-03-01 23:59:59')]}
                        argumentType={'datetime'}
                        label={{
                            format: "HH:mm"
                        }}
                        position={"top"}
                    >
                    </ValueAxis> */}

                    <ValueAxis
                        valueMarginsEnabled={false}
                        axisDivisionFactor={30}
                        position={"top"}
                        defaultVisualRange={['2021-03-01 00:00:00', '2021-03-01 23:59:59']}
                    >
                        {/* <Label
                            argumentType={'datetime'}
                            label={{
                                format: "HH:mm"
                            }}
                        >
                            <Font size={"9"} family={"Prompt"} weight={500} />
                        </Label> */}
                        <Label
                            customizeText={(val) => this.customizeText(val)}>
                            <Font size={"9"} family={"Prompt"} weight={500} />
                        </Label>
                    </ValueAxis>

                    <CommonSeriesSettings
                        type="rangeBar"
                        argumentField="chn"
                        rangeValue1Field="starttime"
                        rangeValue2Field="endtime"
                        barOverlapGroup="chn"
                    ></CommonSeriesSettings>

                    <Crosshair
                        horizontalLine={false}
                        enabled={true}
                        width={2}
                        color='#000'
                    >
                        <HorizontalLine visible={false} />
                    </Crosshair>
                    <SeriesTemplate nameField="chn" />
                    <Animation enabled={false} />
                    <Tooltip enabled={false} />
                    <Legend visible={false} />
                </Chart >
            );
        }
    }
}

const mapStateToProps = (state) => ({
    dataChart: state.playback.dataChart,
    defaultVisualRange: state.playback.defaultVisualRange
})

const mapDispatchToProps = (dispatch) => ({
    // getHistoryData: (data) => dispatch(TrackingHistoryActions.getHistoryData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(BarChart)


const dataTest2 = [
    {
        "speed_level": "จอดไม่ดับเครื่อง",
        "start": "2021-03-16T17:00:12.000Z",
        "end": "2021-03-16T17:01:14.000Z",
        "speed": "speed",
        "event": null
    },
    {
        "speed_level": "จอดไม่ดับเครื่อง",
        "start": "2021-03-16T17:06:12.000Z",
        "end": "2021-03-16T17:07:14.000Z",
        "speed": "speed",
        "event": null
    },
    {
        "speed_level": "จอดไม่ดับเครื่อง",
        "start": "2021-03-16T17:10:14.000Z",
        "end": "2021-03-16T17:12:01.000Z",
        "speed": "speed",
        "event": null
    },
    {
        "speed_level": "จอดไม่ดับเครื่อง",
        "start": "2021-03-16T17:15:01.000Z",
        "end": "2021-03-16T17:18:04.000Z",
        "speed": "speed",
        "event": null
    },
    {
        "speed_level": "จอดไม่ดับเครื่อง",
        "start": "2021-03-16T17:18:04.000Z",
        "end": "2021-03-16T17:20:06.000Z",
        "speed": "speed",
        "event": null
    },
    {
        "speed_level": "จอดไม่ดับเครื่อง",
        "start": "2021-03-16T17:20:06.000Z",
        "end": "2021-03-16T17:20:30.000Z",
        "speed": "speed",
        "event": null
    },
    {
        "speed_level": "เข้าสถานี",
        "start": "2021-03-16T21:14:54.000Z",
        "end": "2021-03-16T22:15:41.000Z",
        "speed": "speed",
        "event": null
    }
]