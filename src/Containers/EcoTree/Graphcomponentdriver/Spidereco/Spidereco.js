import React from 'react';
import {
  PolarChart,
  CommonSeriesSettings,
  Series,
  Tooltip,
  Legend,
  Point,
  ArgumentAxis
} from 'devextreme-react/polar-chart';
import { ValueAxis, Font } from 'devextreme-react/chart';
import { Label } from 'devextreme-react/data-grid';
import { useTranslation } from 'react-i18next'
import '../../../../i18n'

const Spiderecos = (arg) => {
  const { t } = useTranslation()
  return <PolarChart
    id={'chart'}
    dataSource={arg.dataSource}
    useSpiderWeb={true}
    palette={'The Trees'}
    size={arg.size}
    // customizeText={arg.customizeText}
    commonAxisSettings={{
      label: {
        customizeText: (e) => {
          switch (e.valueText) {
            case 'Long Idling':
              return t('summary_22')
              break;
            case 'Exhaust <br></br> Brake/Retarder':
              return t('summary_23')
              break;
            case 'RPM High Speed':
              return t('summary_24')
              break;
            case 'RPM Low Speed':
              return t('summary_25')
              break;
            case 'Shift Up & <br></br> Exceeding RPM':
              return t('summary_26')
              break;
            case 'Shift Down & <br></br> Exceeding RPM':
              return t('summary_27')
              break;
            default:
              return e.valueText
          }
        }
      }
    }}
  >
    <ArgumentAxis>
      <Label indentFromAxis={'10'}><Font size={'10'} weight={'500'} family={"Prompt"} ></Font></Label>
    </ArgumentAxis>
    <ValueAxis
      visualRangeUpdateMode={"keep"}
      maxValueMargin={0.01}
      min={0}
      max={5} >
      <Label><Font size={'10'} family={"Prompt"}></Font></Label>
    </ValueAxis>
    <CommonSeriesSettings type={'area'}>
    </CommonSeriesSettings>

    <Series
      type="area"
      key='point'
      valueField='point'
      name={t('summary_28')}
      color="green" >
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
    <Legend visible={false}
      position="outside"
      horizontalAlignment="center"
      verticalAlignment="bottom">
      <Font size={'16'} family={'Prompt'}></Font>
    </Legend>


  </PolarChart>

}

class Spidereco extends React.Component {
  constructor(props) {
    super(props);
    this.customizeText = this.customizeText.bind(this);

  }

  render() {
    return (
      <Spiderecos
        id={'chart'}
        dataSource={this.props.data}
        useSpiderWeb={true}
        palette={'The Trees'}
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth,
        }}
        customizeText={this.customizeText}
      >

      </Spiderecos>
      // <PolarChart
      //   id={'chart'}
      //   dataSource={this.props.data}
      //   useSpiderWeb={true}
      //   palette={'The Trees'}
      //   size={{
      //     height: this.props.chartHeight,
      //     width: this.props.chartwidth,

      //   }}
      //   customizeText={this.customizeText}
      // >
      //   <ArgumentAxis>
      //     <Label customizeText={this.customizeText} indentFromAxis={'10'}><Font size={'10'} weight={'500'} family={"Prompt"} ></Font></Label>
      //   </ArgumentAxis>
      //   <ValueAxis
      //     visualRangeUpdateMode={"keep"}
      //     maxValueMargin={0.01}
      //     min={0}
      //     max={5} >
      //     <Label><Font size={'10'} family={"Prompt"}></Font></Label>
      //   </ValueAxis>
      //   <CommonSeriesSettings type={'area'}>
      //   </CommonSeriesSettings>

      //   <Series
      //     type="area"
      //     key='point'
      //     valueField='point'
      //     name='Score'
      //     color="green" >

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
      //     <Font size={'16'} family={'Prompt'}></Font>
      //   </Legend>


      // </Spiderecos>
    );
  }
  customizeText(data) {
    if (data.value == " Exhaust Brake/Retarder") {
      return `Exhaust Brake/\nRetarder`;
    }
    if (data.value == "RPM High Speed") {
      return `RPM High\nSpeed`;
    }
    if (data.value == "Shift+Up RPM") {
      return `Shift+Up\nRPM`;
    }
    if (data.value == "Shift+Down RPM") {
      return `Shift+Down\nRPM`;
    }
    else
      // //console.log(data)
      return `${data.value}`;
  }
}

export default Spidereco;
