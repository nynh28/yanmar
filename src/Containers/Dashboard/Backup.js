/* eslint-disable react-hooks/rules-of-hooks */
import React, { Suspense } from 'react';

import Chart, {
  CommonSeriesSettings,
  ValueAxis,
  Label,
  Legend,
  Series,
  Tooltip,
  ConstantLine,
  Grid,
  Margin,
  Font,
  AggregationInterval,
  Title,
  VisualRange,
  Tick,
  TickInterval,
  Point,
  SelectionStyle,
  Hatching
} from 'devextreme-react/chart';

import { dataSource } from './data1.js';
import { ArgumentAxis } from 'devextreme-react/polar-chart';
import { Border } from 'devextreme-react/bar-gauge';
import { t } from '../../../../Components/Translation';
import { useTranslation } from 'react-i18next'
import '../../../../i18n'
import { refresh } from '../../../../Redux/SigninRedux.js';

// export function t(KEY_NAME) {
//   const Translation = () => {
//       const { t } = useTranslation()
//       return t(KEY_NAME)
//   }
//   // console.log(Translation())
//   return Translation()
// }

const Charts = (arg) => {
  const { t } = useTranslation()
  console.log(arg)
  return  <Chart
            ref={arg.onLoad}
            onPointClick={arg.onPointClick}
            dataSource={arg.dataSource}
            id={'chart'}
            pointSelectionMode={'single'}
            customizePoint={arg.customizePoint}
            size={arg.size}
            // size={{
            //   height: arg.props.chartHeight,
            //   width: arg.props.chartwidth
            // }}
          >
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



            <Tooltip
              enabled={true}
              customizeTooltip={ (e) => { 
                return {text: '<br>' + t("summary_8") + ' :' + e.point.data.driv + ' %' + '<br>' + t("summary_9") + ' :' + e.point.data.park + ' %' + '<br>' + t("summary_10") + ' :' + e.point.data.idle + ' %' + '<br>' + t("summary_11") + ' :' + e.point.data.offline + ' %'}
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
    console.log(props)
    this.state = {
      data: this.props.data.result,
      Point: null
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.selectData == false && this.state.Point != null && nextProps.data != this.state.data){
      // this.state.Point.clearSelection();
      // this.props.selectedCallback("unselect")
      this.setState({
        data: nextProps.data.result,
        Point: null
      }, () => {
        this.chart.current.instance.render()
      })
    }
    else{
      this.setState({
        data: nextProps.data.result
      }, () => {
        this.chart.current.instance.render()
      })
    }
    

  }



  render() {
    // console.log(t("summary_8"))
    // console.log(t("summary_7"))
    return (
      <Suspense fallback={null}>
        <div>
          <label style={{ position: 'absolute', top: 198, fontSize: 10, left: 31 }}>{t("summary_7")}</label>
          <Charts
            onLoad={this.chart}
            onPointClick={this.onPointClick}
            dataSource={this.state.data}
            target={this.target}
            id={'chart'}
            pointSelectionMode={'single'}
            customizePoint={this.customizePoint}
            size={{
              height: this.props.chartHeight,
              width: this.props.chartwidth
            }}
            customizeLabel={this.customizeLabel}
            customizeText={this.customizeText}
            customizeTooltip={this.customizeTooltip}
          >
          </Charts>
          {/* <Chart
            ref={this.chart}
            onPointClick={this.onPointClick}
            dataSource={this.state.data}
            id={'chart'}
            pointSelectionMode={'single'}
            customizePoint={this.customizePoint}
            size={{
              height: this.props.chartHeight,
              width: this.props.chartwidth
            }}
          >
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



            <Tooltip
              enabled={true}
              customizeTooltip={this.customizeTooltip}
            />
            <ValueAxis>
              <Label customizeText={this.customizeLabel}><Font size={'16'} family={'Prompt'}></Font></Label>
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
                customizeText={this.customizeText}
                overlappingBehavior={'none'}
              >
                <Font size={'9'} family={'Prompt'} weight={500}></Font>
              </Label>

            </ArgumentAxis>
          </Chart> */}
        </div>
      </Suspense>
    );
  }


  onPointClick({ target: Point }) {
    if (Point.isSelected()) {
      Point.clearSelection();
      this.props.selectedCallback("unselect")
    } else {
      Point.select();
      this.props.selectedCallback(Point.argument, Point.index, Point)
      this.setState({ Point })
    }

  }

  customizePoint(arg) {
    console.log(arg)
  }

  customizeTooltip(e) {
    return { text: '<br>Driving :' + e.point.data.driv + ' %' + '<br>Parking :' + e.point.data.park + ' %' + '<br>Idling :' + e.point.data.idle + ' %' + '<br>Offline :' + e.point.data.offline + ' %' };
  }

  customizeLabel(e) {
    // const { t } = useTranslation()
    // console.log(e)
    if (e.value == 0) {
      console.log("summary_6")
      return "summary_6"
    }
    if (e.value == 0.25) {
      console.log("summary_5")
      return "summary_5"
    }
    if (e.value == 0.5) {
      console.log("summary_4")
      return "summary_4"
    }
    if (e.value == 0.75) {
      console.log("summary_3")
      return "summary_3"
    }
    else
    console.log("summary_2")
      return "summary_2"
  }

  customizeText(e) {
    // console.log(e)
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

export default Dngraph1;
