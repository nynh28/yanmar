/* eslint-disable react-hooks/rules-of-hooks */
import React, { Suspense } from 'react';
import { connect } from 'react-redux'

import Chart, {
  CommonSeriesSettings,
  ValueAxis,
  Label,
  Legend,
  Series,
  Tooltip,
  Grid,
  Margin,
  Font,
  Point,
  SelectionStyle,
} from 'devextreme-react/chart';

import { dataSource } from './data1.js';
import { ArgumentAxis } from 'devextreme-react/polar-chart';
import { Border } from 'devextreme-react/bar-gauge';
import { t } from '../../../../Components/Translation';
import { useTranslation } from 'react-i18next'
import '../../../../i18n'
import { refresh } from '../../../../Redux/SigninRedux.js';
import { get, isEqual, isEmpty } from 'lodash'


const Charts = (arg) => {
  const { t } = useTranslation()
  return <Chart
    ref={arg.onLoad}
    onPointClick={arg.onPointClick}
    dataSource={arg.dataSource}
    // dataSource={dataTest}
    id={'chart'}
    pointSelectionMode={'single'}
    customizePoint={arg.customizePoint}
    size={arg.size}
  // size={{
  //   height: arg.props.chartHeight,
  //   width: arg.props.chartwidth
  // }}

  >
    {console.log(arg.dataSource)}
    <CommonSeriesSettings
      type="fullstackedbar"
      argumentField={'datetime'}
    >
      <Point hoverMode={'allArgumentPoints'} selectionMode={'allArgumentPoints'} visible={true}>

        <SelectionStyle>
          <Border color={'blue'} visible={true}>
          </Border>
        </SelectionStyle>
      </Point>
    </CommonSeriesSettings>

    <Series
      valueField={'driv'}
      name={t("summary_8")}
      color={'#57df4e'}
    />

    <Series
      valueField={'park'}
      name={t("summary_9")}
      color={'#ff3b30'}
    />
    <Series
      valueField={'idle'}
      name={t("summary_10")}
      color={'#ffcc00'}
    />
    <Series
      valueField={'offline'}
      name={t("summary_11")}
      color={'#adadb2  '}
    />
    {/* <Series
              valueField={'overspd'}
              name={'Overspeed'}
              color={'#6600ff  '}
            /> */}

    {/* <Series
      valueField={'valueTest'}
      name={t("summary_11")}
      color={'#FFF'}
    /> */}

    <Tooltip
      enabled={true}
      customizeTooltip={(e) => {
        return {
          text: '<br>' + t("summary_8") + ' ' + (arg.menuUser.vehicleCount * (e.point.data.driv * (24 / 100))).toFixed(0) + ' ' + t("summary_37") + ' :' + e.point.data.driv + ' %' + '<br>'
            + t("summary_9") + ' ' + (arg.menuUser.vehicleCount * (e.point.data.park * (24 / 100))).toFixed(0) + ' ' + t("summary_37") + ' :' + e.point.data.park + ' %' + '<br>'
            + t("summary_10") + ' ' + (arg.menuUser.vehicleCount * (e.point.data.idle * (24 / 100))).toFixed(0) + ' ' + t("summary_37") + ' :' + e.point.data.idle + ' %' + '<br>'
            + t("summary_11") + ' ' + (arg.menuUser.vehicleCount * (e.point.data.offline * (24 / 100))).toFixed(0) + ' ' + t("summary_37") + ' :' + e.point.data.offline + ' %'
        }
      }}
    />
    <ValueAxis>
      <Label customizeText={(e) => t(arg.customizeLabel(e))}><Font size={'16'} family={'Prompt'}></Font></Label>
      <Grid visible={true}></Grid>

    </ValueAxis>

    <Legend
      horizontalAlignment={'center'}
      verticalAlignment={'bottom'}
      orientation={'horizontal'}
      position={'Outside'}
    >
      <Font size={'16'} family={'Prompt'}></Font>
      <Margin bottom={55} top={40}></Margin>
    </Legend>

    <ArgumentAxis>
      <Label
        customizeText={arg.customizeText}
        overlappingBehavior={'none'}
      >
        <Font size={'9'} family={'Prompt'} weight={500}></Font>
      </Label>

    </ArgumentAxis>
  </Chart>
}

class Dngraph1 extends React.Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef()
    this.onPointClick = this.onPointClick.bind(this)
    this.customizePoint = this.customizePoint(this)
    // //console.log(props)
    this.state = {
      data: this.props.data.result,
      Point: null
    }
    this.firstLoad = true
    this.firstClick = true
  }
  componentDidMount() {
    let { keepArgument } = this.props
    // if (get(this, 'chart.current.instance') && this.firstLoad) {
    //   console.log('chart', this.chart)
    //   if (keepArgument !== undefined) {
    //     this.chart.current.instance._getStackPoints()[keepArgument].axis_default_stack_default[0].select()
    //     this.chart.current.instance._getStackPoints()[keepArgument].axis_default_stack_default[1].select()
    //     this.chart.current.instance._getStackPoints()[keepArgument].axis_default_stack_default[2].select()
    //     this.chart.current.instance._getStackPoints()[keepArgument].axis_default_stack_default[3].select()
    //     this.props.selectedCallback(keepArgument)
    //   }
    //   this.firstLoad = false
    // }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { data, keepArgument, language } = this.props
    let { chart } = this.state
    // console.log(nextProps, this.props)
    if (!isEqual(nextProps.data, data)) { this.setState({ data: nextProps.data.result }) }
    if (!isEqual(nextState.data, this.state.data)) return true
    if (nextProps.language !== language) return true
    if (chart === undefined) {
      if (get(this, 'chart.instance') && this.firstLoad) {
        if (keepArgument !== undefined) {
          setTimeout(() => {
            this.chart.instance._getStackPoints()[keepArgument].axis_default_stack_default[0].select()
            this.chart.instance._getStackPoints()[keepArgument].axis_default_stack_default[1].select()
            this.chart.instance._getStackPoints()[keepArgument].axis_default_stack_default[2].select()
            this.chart.instance._getStackPoints()[keepArgument].axis_default_stack_default[3].select()
            // this.props.selectedCallback(keepArgument)
          }, 100)
        }
        this.firstLoad = false
      }
    }
    return false
  }

  componentDidUpdate(prevProps) {
    let { language, keepArgument } = this.props
    if (prevProps.language !== language) {
      setTimeout(() => {
        // console.log(' ____________ language ___________', this.chart)
        if (get(this, 'chart.instance')) {
          if (keepArgument !== undefined) {
            this.chart.instance._getStackPoints()[keepArgument].axis_default_stack_default[0].select()
            this.chart.instance._getStackPoints()[keepArgument].axis_default_stack_default[1].select()
            this.chart.instance._getStackPoints()[keepArgument].axis_default_stack_default[2].select()
            this.chart.instance._getStackPoints()[keepArgument].axis_default_stack_default[3].select()
          }
        }
      }, 100)

    }
  }

  render() {
    // console.log('render ---------------> Charts')
    return (
      <Suspense fallback={null}>
        <div>
          <label style={{ position: 'absolute', top: 198, fontSize: 10, left: 31 }}>{t("summary_7")}</label>
          <Charts
            onLoad={(chart) => {
              this.chart = chart
              this.setState({ chart })
            }}
            onPointClick={this.onPointClick}
            dataSource={this.state.data}
            target={this.target}
            id={'chart'}
            pointSelectionMode={'single'}
            customizePoint={this.customizePoint}
            menuUser={this.props.menuUser}
            size={{
              height: this.props.chartHeight,
              width: this.props.chartwidth
            }}
            customizeLabel={this.customizeLabel}
            customizeText={this.customizeText}
            customizeTooltip={this.customizeTooltip}
          >
          </Charts>
        </div>
      </Suspense >
    );
  }


  onPointClick(e) {
    let { target } = e
    let { keepArgument } = this.props
    // console.log('keepArgument', keepArgument, target.argument, target.isSelected())
    if (this.firstClick && keepArgument === target.argument) {
      this.chart.instance._getStackPoints()[keepArgument].axis_default_stack_default[0].clearSelection()
      this.chart.instance._getStackPoints()[keepArgument].axis_default_stack_default[1].clearSelection()
      this.chart.instance._getStackPoints()[keepArgument].axis_default_stack_default[2].clearSelection()
      this.chart.instance._getStackPoints()[keepArgument].axis_default_stack_default[3].clearSelection()
      this.props.selectedCallback("unselect")
      this.firstClick = false
    } else {
      if (target.isSelected()) {
        target.clearSelection();
        this.props.selectedCallback("unselect")
      } else {
        target.select()
        this.props.selectedCallback(target.argument)
        // this.setState({ Point })
      }
    }

  }

  customizePoint(arg) {
    // //console.log(arg)
  }

  customizeTooltip(e) {
    return { text: '<br>Driving :' + e.point.data.driv + ' %' + '<br>Parking :' + e.point.data.park + ' %' + '<br>Idling :' + e.point.data.idle + ' %' + '<br>Offline :' + e.point.data.offline + ' %' };
  }

  customizeLabel(e) {
    // const { t } = useTranslation()
    // //console.log(e)
    if (e.value == 0) {
      // //console.log("summary_6")
      return "summary_6"
    }
    if (e.value == 0.25) {
      // //console.log("summary_5")
      return "summary_5"
    }
    if (e.value == 0.5) {
      // //console.log("summary_4")
      return "summary_4"
    }
    if (e.value == 0.75) {
      // //console.log("summary_3")
      return "summary_3"
    }
    else
      // //console.log("summary_2")
      return "summary_2"
  }

  customizeText(e) {
    // //console.log(e)
    var date = e.value.split('-')[2]
    for (var i = 0; i <= date.length; i++) {
      if (date[0] == 0) {
        var date = date.slice(1, 2);
      }
      else {
        var date
      }
    }
    return `${date}`;
  }
}

const mapStateToProps = (state) => {
  return {
    menuUser: state.signin.menuUser,
    keepArgument: state.summary.keepArgument,
    language: state.versatile.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Dngraph1))
