import React, { Component } from 'react'
import Chart from 'react-apexcharts'

export default class Redar extends Component {
  render() {
    let { options } = this.props
    return (
      <Chart
        options={options}
        series={options.series}
        type="radar"
        width={"100%"}
        height={200}
      />
    )
  }
}