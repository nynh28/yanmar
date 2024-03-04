import React from 'react';
import {
  PolarChart,
  CommonSeriesSettings,
  Series,
  Export,
  Tooltip,
  Legend,
  Font,
  Label,
  Point,
  CommonAxisSettings,
  ArgumentAxis,
  Margin,

} from 'devextreme-react/polar-chart';
import { fruitSources, productionData } from './data1.js';
import { ValueAxis } from 'devextreme-react/chart';
import { useTranslation } from 'react-i18next'
import '../../../../i18n'

const PolarCharts = (arg) => {
  const { t } = useTranslation()
  return <PolarChart
    ref={arg.chart}
    id={'chart'}
    dataSource={arg.dataSource}
    useSpiderWeb={true}
    palette={'The Trees'}
    size={arg.size}
    commonAxisSettings={{
      label: {
        customizeText: (e) => {
          switch (e.valueText) {
            case 'Exceeding Speed':
              return t('summary_13')
              break;
            case 'Exceeding RPM':
              return t('summary_14')
              break;
            case 'Harsh Start':
              return t('summary_15')
              break;
            case 'Harsh Acceleration':
              return t('summary_16')
              break;
            case 'Harsh Brake':
              return t('summary_17')
              break;
            case 'Sharp Turn':
              return t('summary_18')
              break;
            default:
              return e.valueText
          }
        }
      }
    }}
  >


    <ArgumentAxis
    >
      <Label indentFromAxis={'10'}><Font size={'16'} weight={'500'} family={"Prompt"}></Font></Label>
    </ArgumentAxis>
    <ValueAxis
      visualRangeUpdateMode={"keep"}
      maxValueMargin={0.01}
      min={0}
      max={5} >
      <Label><Font size={'10'} family={"Prompt"}></Font></Label>
    </ValueAxis>

    <CommonSeriesSettings type={'area'} />

    <Series
      type="area"
      key='point'
      valueField='point'
      name={t('summary_19')}
      color="#00c6ff" >

      <Point
        visible={true}
        size='3' />
    </Series>
    <Series
      type="line"
      dashStyle={'dash'}
      width={2}
      key='avg'
      valueField='avg'
      name={t('summary_29')}
      color="#f85a5a" >

      <Point
        visible={true}
        size='3' />
    </Series>
    <Tooltip
      enabled={true}
      format={{
        type: 'fixedPoint',
        precision: 1
      }}
    />
    <Legend visible={true}

      position="outside"
      horizontalAlignment="center"
      verticalAlignment="bottom">
      <Margin bottom={-200}></Margin>
      <Font size={'16'} family={'Prompt'}></Font>


    </Legend>

  </PolarChart>
}

class Spidersafety extends React.Component {
  constructor(props) {
    super(props);
    // this.chart = React.createRef()
    // this.state = {
    //   data:this.props.data
    // }


  }
  componentWillReceiveProps(test) {
    // //console.log(test);
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   //console.log(nextProps)
  //   this.setState({
  //     data: nextProps.data
  //   }, () => {
  //     this.chart.current.instance.refresh()
  //     //console.log(this.chart.current.instance)
  //     //console.log(this.state.data)
  //   })

  // }

  render() {
    return (
      <PolarCharts
        ref={this.chart}
        id={'chart'}
        dataSource={this.props.data}
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth
        }}
      >
      </PolarCharts>
      // <PolarChart
      //   ref={this.chart}
      //   id={'chart'}
      //   dataSource={this.props.data}
      //   useSpiderWeb={true}
      //   palette={'The Trees'}
      //   size={{
      //     height: this.props.chartHeight,
      //     width: this.props.chartwidth
      //   }}
      // >


      //   <ArgumentAxis
      //   >
      //     <Label indentFromAxis={'10'}><Font size={'10'} weight={'500'} family={"Prompt"}></Font></Label>
      //   </ArgumentAxis>
      //   <ValueAxis
      //     visualRangeUpdateMode={"keep"}
      //     maxValueMargin={0.01}
      //     min={0}
      //     max={5} >
      //     <Label><Font size={'10'} family={"Prompt"}></Font></Label>
      //   </ValueAxis>

      //   <CommonSeriesSettings type={'area'} />

      //   <Series
      //     type="area"
      //     key='point'
      //     valueField='point'
      //     name='Score'
      //     color="#00c6ff" >

      //     <Point
      //       visible={true}
      //       size='3' />
      //   </Series>
      //   <Series
      //     type="line"
      //     dashStyle={'dash'}
      //     width={2}
      //     key='avg'
      //     valueField='avg'
      //     name='Avg.Score'
      //     color="#f85a5a" >

      //     <Point
      //       visible={true}
      //       size='3' />
      //   </Series>
      //   <Tooltip
      //     enabled={true}
      //     format={{
      //       type: 'fixedPoint',
      //       precision: 1
      //     }}
      //   />
      //   <Legend visible={true}

      //     position="outside"
      //     horizontalAlignment="center"
      //     verticalAlignment="bottom">
      //     <Margin bottom={-200}></Margin>
      //     <Font size={'16'} family={'Prompt'}></Font>


      //   </Legend>

      // </PolarChart>
    );
  }
}

export default Spidersafety;
