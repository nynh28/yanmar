import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  CircularGauge,
  Scale,
  Tick,
  Label,
  RangeContainer,
  Range,
  ValueIndicator,
  SubvalueIndicator
} from 'devextreme-react/circular-gauge';
import '../assets/styles.css'

const GaugePanel = (arg) => {
  let valueLength = ("" + arg.value).length
  return <div id="gauge-container">
    <CircularGauge
      id="gauge"
      value={arg.value}
    >
      <Scale
        startValue={arg.startValue}
        endValue={arg.endValue}
        tickInterval={arg.tickInterval}>
        <Tick color="#536878" />
        <Label indentFromTick={3} />
      </Scale>
      {arg.children}
      <ValueIndicator
        offset={15}
        secondColor={arg.indicatorColor}
        type="twoColorNeedle"
        secondFraction={0.24}
        color="none"
      />
      <SubvalueIndicator offset={-25} />
    </CircularGauge>

    <div className="circle-inside" />
    <div className={`speed-value ${valueLength === 1 ? "speed-span-1 " :
      valueLength === 2 ? "speed-span-2 " :
        valueLength === 3 ? "speed-span-3 " :
          valueLength === 4 ? "speed-span-4 " : ""
      }`}>
      <span>{arg.value}</span>
    </div>
    <div className={`speed-unit ${arg.id === "speed" ? "speed-unit-span-speed-left" : "speed-unit-span-rpm-left"}`} >
      <span>{arg.unit}</span>
    </div>
    <div className={`guage-name ${arg.id === "speed" ? "guage-name-speed" : "guage-name-rpm"}`}>
      <span>{arg.gaugeName}</span>
    </div>
  </div >
}

const Gauge = (props) => {
  let { gaugeCurrentValue } = props

  const speedIndicatorColor = (value) => {
    let color = "green"
    if (value <= 60)
      color = "green"
    else if (value > 60 && value <= 120)
      color = "#ffd04c"
    else if (value > 120)
      color = "red"

    return color
  }

  const rpmIndicatorColor = (value) => {
    let color = "green"
    if (value <= 3000)
      color = "green"
    else if (value > 3000 && value <= 6000)
      color = "#cf9900"
    else if (value > 6000)
      color = "red"

    return color
  }

  // console.log(">> RENDER Gauge <<", gaugeCurrentValue)
  return (
    <>
      <GaugePanel
        id="speed"
        value={gaugeCurrentValue.speed}
        unit="KM/M"
        gaugeName="Speed"
        startValue={0}
        endValue={180}
        tickInterval={20}
        indicatorColor={speedIndicatorColor(gaugeCurrentValue.speed)}
      >
        <RangeContainer offset={10}>
          <Range startValue={0} endValue={60} color="green" />
          <Range startValue={60} endValue={120} color="#ffd04c" />
          <Range startValue={120} endValue={180} color="red" />
        </RangeContainer>
      </GaugePanel>

      <GaugePanel
        id="rpm"
        value={gaugeCurrentValue.rpm}
        unit="RPM"
        gaugeName="RPM"
        startValue={0}
        endValue={8000}
        tickInterval={1000}
        indicatorColor={rpmIndicatorColor(gaugeCurrentValue.rpm)}
      >
        <RangeContainer offset={10}>
          <Range startValue={0} endValue={3000} color="green" />
          <Range startValue={3000} endValue={6000} color="#ffd04c" />
          <Range startValue={6000} endValue={8000} color="red" />
        </RangeContainer>
      </GaugePanel>
    </>
  )
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  gaugeCurrentValue: state.evidence.gaugeCurrentValue,
});

export default connect(mapStateToProps)(Gauge)
