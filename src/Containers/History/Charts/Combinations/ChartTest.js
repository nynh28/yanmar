import React, { Component } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../../../Redux/HistoryRedux'
import { momentDate } from '../../../../Functions/DateMoment'
import Chart, {
    CommonSeriesSettings,
    Series,
    Pane,
    ValueAxis,
    Legend,
    Title,
    Grid,
    ZoomAndPan,
    Crosshair,
    HorizontalLine,
    ScrollBar,
    CommonAxisSettings,
    Tooltip,
    Border,
    ArgumentAxis,
    Point

} from 'devextreme-react/chart';


class ChartTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plotData: []
        }
        this.customizeTooltip = this.customizeTooltip.bind(this);
    }


    componentWillMount() {
        let { dataAllPoint } = this.props

        let plotData = []
        dataAllPoint && dataAllPoint.map((trip) => {
            plotData.push(...trip)
        })
        this.setState({ plotData })

        console.log("plotData >>> : ", plotData)

    }

    componentDidUpdate(prevProps, nextState) {
        // let { dataAllPoint } = this.props
        // if (prevProps.dataAllPoint !== dataAllPoint) {
        //     let plotData = []
        //     dataAllPoint && dataAllPoint.map((trip) => {
        //         plotData.push(...trip)
        //     })
        //     this.setState({ plotData })

        //     console.log("plotData >>> : ", plotData)
        // }
    }

    customizeTooltip(arg) {
        let gpsdate = momentDate(arg.argument)
        this.props.setPointValue({ date: gpsdate })
    }

    render() {
        let { plotData } = this.state

        return (
            <Chart
                dataSource={plotData}
                id={'chart-history'}
                style={{ height: "400px" }}
                defaultPane="bottomPane"
            >
                <CommonAxisSettings>
                    <Grid visible={true} />
                </CommonAxisSettings>

                <CommonSeriesSettings
                    argumentField={'gpsdate'}
                    type={'area'}>
                    <Border visible={false} />
                    <Point hoverMode="allArgumentPoints" />
                </CommonSeriesSettings>


                <ArgumentAxis
                    argumentType={'datetime'}
                    label={{
                        format: "HH:mm"
                    }}
                // defaultVisualRange={{
                //     startValue: '2020-05-02 00:00:00',
                //     endValue: '2020-05-02 23:59:59'
                // }}
                >
                </ArgumentAxis>

                <Pane name="speedPane" height={80} />
                <Pane name="rpmPane" height={80} />
                <Pane name="fuelPane" height={80} />

                <Series
                    pane="speedPane"
                    valueField={'speed'}
                    name={'Speed'}
                    color={'#b7bbbb'} />

                <Series
                    pane="rpmPane"
                    valueField={'rpm'}
                    name={'RPM'}
                    color={'#b7bbbb'} />

                <Series
                    pane="fuelPane"
                    valueField={'fuel'}
                    name={'Fuel'}
                    color={'#b7bbbb'} />


                {/* <ValueAxis
                    autoBreaksEnabled={true}
                    max={150}
                >
                    <Grid visible={true} />
                    <Label customizeText={this.customizeText} />
                </ValueAxis> */}

                <ValueAxis pane="speedPane">
                    <Grid visible={true} />
                    <Title text="Speed" />
                </ValueAxis>

                <ValueAxis pane="rpmPane">
                    <Grid visible={true} />
                    <Title text="RPM" />
                </ValueAxis>

                <ValueAxis pane="fuelPane">
                    <Grid visible={true} />
                    <Title text="Fuel Tank Level" />
                </ValueAxis>


                <Crosshair
                    horizontalLine={false}
                    enabled={true}
                    width={1}
                    color='red'
                >
                    <HorizontalLine visible={false} />
                </Crosshair>

                {/*
                <Crosshair enabled={true}
                    visibility={'visible'}
                >
                    <Label visible={true} />
                    <HorizontalLine visible={false} />
                </Crosshair> */}


                <ZoomAndPan argumentAxis={'both'} />
                <ScrollBar
                    visible={true}
                    color='#8f9ba6'
                    width={2}
                />
                <Legend
                    visible={false} />

                {/* <Tooltip
                    enabled={true}
                    customizeTooltip={this.customizeTooltip}
                /> */}
                <Tooltip
                    enabled={true}
                    customizeTooltip={this.customizeTooltip}
                    shared={true}
                />

            </Chart>
        );
    }
}

const mapStateToProps = (state) => ({
    dataAllPoint: state.history.dataAllPoint,
});
const mapDispatchToProps = (dispatch) => ({
    setPointValue: (pointValue) => dispatch(HistoryActions.setPointValue(pointValue))

});

export default connect(mapStateToProps, mapDispatchToProps)(ChartTest)
