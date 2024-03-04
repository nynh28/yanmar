import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Legend,
  Tooltip,
  Label,
  ValueAxis,
  Point,
  Title,
  Font
} from 'devextreme-react/chart';
import { get } from 'lodash'

const ChartPanel = (props) => {
  let { mapDetail } = props
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    let evidence_detail = get(mapDetail, 'evidence_video_detail', [])
    let data = []
    evidence_detail.forEach(item => {
      data.push({
        "speed": item.speed,
        "rpm": 0,
        "gpsdate": item.time
      })

    });
    setDataSource(data)
  }, [])

  const customizeTooltip = (pointInfo) => {
    const handlers = {
      rpm: (arg) => ({
        text: `RPM : ${arg.value} rpm`
      }),
      speed: (arg) => ({
        text: `Speed : ${arg.value}  km/h`
      }),
    };

    return handlers[pointInfo.seriesName](pointInfo);
  }

  return (<Chart
    id="evidence-chart"
    dataSource={dataSource}
    style={{ width: '100%' }}>
    <CommonSeriesSettings argumentField="gpsdate" />
    <Series
      axis="speed"
      color="rgb(92, 230, 72)"
      type="spline"
      valueField="speed"
      name="speed">
      <Point size={1} />
    </Series>

    <Series
      axis="rpm"
      color="rgb(0, 0, 255)"
      valueField="rpm"
      type="spline"
      name="rpm" >
      <Point size={1} />
    </Series>

    <ArgumentAxis
      argumentType={'time'}
      label={{ format: "HH:mm:ss" }}
    >
      <Label overlappingBehavior="stagger" />
    </ArgumentAxis>

    <ValueAxis name="speed">
      <Title text="Speed">
        <Font color="#008000" weight={500} />
      </Title>
      <Label>
        <Font color="#008000" />
      </Label>
    </ValueAxis>
    <ValueAxis
      name="rpm"
      position="right"
    >
      <Title text="RPM">
        <Font color="rgb(0, 0, 255)" weight={500} />
      </Title>
      <Label>
        <Font color="rgb(0, 0, 255)" />
      </Label>
    </ValueAxis>
    <Legend visible={false} />
    <Tooltip
      enabled={true}
      customizeTooltip={customizeTooltip}
    />
  </Chart>)
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  mapDetail: state.evidence.mapDetail
});

export default connect(mapStateToProps)(ChartPanel)