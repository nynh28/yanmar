import React, { Component } from 'react';

import ReactFlot from './Charts/ReactFlot/ReactFlot.jsx'
import { Row, Col, Form, Button } from 'reactstrap'


var optionsTests = {
  series: {
    bars: {
      show: true,
      barWidth: 0.3,
      align: 'center',
      lineWidth: 0,
      fill: 0.75,
    },
  },
  xaxis: {
    // mode: "time",
    mode: 'categories',
    // ticks: [
    //   [0, 'First'],
    //   [1, 'Second'],
    //   [2, 'Third'],
    //   [3, 'Fourth'],
    // ],
    tickLength: 0,
  },
  yaxis: {
    max: 100,
  },
  grid: {
    hoverable: true,
  },
  tooltip: {
    show: true,
    content: 'This is a tooltip',
  },

}

const options = {
  series: {
    bars: {
      show: true,
      barWidth: 0.3,
      align: 'center',
      lineWidth: 0,
      fill: 0.75,
    },
  },
  xaxis: {
    ticks: [
      [0, 'First'],
      [1, 'Second'],
      [2, 'Third'],
      [3, 'Fourth'],
    ],
    mode: 'categories',
    tickLength: 0,
  },
  yaxis: {
    max: 10,
  },
  grid: {
    hoverable: true,
  },
  tooltip: {
    show: true,
    content: 'This is a tooltip',
  },
};

const data = [[
  [0, 4],
  [1, 6],
  [2, 3],
  [3, 8],
]];

const pieData = [
  { label: 'data1', data: 10 },
  { label: 'data2', data: 20 },
  { label: 'data3', data: 30 },
  { label: 'data4', data: 40 },
  { label: 'data5', data: 50 },
  { label: 'data6', data: 60 },
  { label: 'data7', data: 70 },
];

const pieOptions = {
  series: {
    pie: { show: true },
  },
};

const horizontalData = [
  {
    data: [
      [70, 0],
    ],
    color: '#0C4BBB',
    bars: {
      align: 'center',
      show: true,
      barWidth: 0.4,
      fill: 1,
      lineWidth: 0,
      horizontal: true,
    },
  },
  {
    data: [
      [63.37, 1],
    ],
    color: '#BB250C',
    bars: {
      align: 'center',
      fill: 0.4,
      lineWidth: 0,
      show: true,
      barWidth: 0.4,
      horizontal: true,
    },
  },
  {
    data: [
      [66.65, 2],
    ],
    color: '#BB250C',
    bars: {
      align: 'center',
      fill: 0.8,
      lineWidth: 0,
      show: true,
      barWidth: 0.4,
      horizontal: true,
    },
  },
  {
    data: [
      [99, 3],
    ],
    color: '#A2BB0C',
    bars: {
      align: 'center',
      fill: 1,
      lineWidth: 0,
      show: true,
      barWidth: 0.4,
      horizontal: true,
    },
  },
];

const horizontalOptions = {
  xaxis: {
    min: 0,
    max: 100,
    tickLength: 0,
    show: false,
  },
  yaxis: {
    ticks: [
      [0, 'Target: 70%'],
      [1, '2013: 63.4%'],
      [2, '2014: 66.7%'],
      [3, '2014: 83.3%'],
    ],
    show: false,
    toRight: true,
    labelPadding: 9,
    font: { // Used when toRight is true
      color: 'black',
      family: 'Arial',
      size: '150%',
      style: 'italic', // ['normal', 'italic', 'oblique']
      variant: 'small-caps', // ['normal', 'small-caps']
      weight: 'bold', // ['normal', 'bold', 'bolder', 'lighter', '100' ... '900']
    },
  },
};

class TestFlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [[
        [0, 4],
        [1, 6],
        [2, 3],
        [3, 8],
      ]],
    };
  }

  onButtonClick = () => {
    this.setState({
      data: [[
        [0, 10],
        [1, 5],
        [2, 2],
        [3, 1],
      ]],
    });
  }

  render() {

    // var optionsTests = {
    //         xaxis: {
    //             mode: "time"
    //         }
    //     }
    //      

    var rawData = [
      [1325347200000, 60], [1328025600000, 100], [1330531200000, 15], [1333209600000, 50]
    ];

    return (
      <Row>
        <Col lg={6} style={{ backgroundColor: 'red', height: 600 }}>
          AAAAAAAAAA
        </Col>
        <Col lg={6} style={{ backgroundColor: 'green', height: 600 }}>
          <Row style={{ backgroundColor: 'yellow', height: 200 }} ></Row>
          <Row style={{ backgroundColor: 'blue', height: 200 }} ></Row>


        </Col>
      </Row>
      // <div>
      //   <button onClick={this.onButtonClick}>
      //     Update Data
      //   </button>


      // </div>
    );
  }
}

export default TestFlot;
