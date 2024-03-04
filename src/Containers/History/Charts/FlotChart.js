import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Row } from 'reactstrap';
// import ReactFlot from 'react-flot';
// import ReactFlot from './src/ReactFlot.jsx';
import ReactFlot from './ReactFlot/ReactFlot.jsx'

class FlotChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
      loading: false
    }

    this.setData = this.setData.bind(this);
  }

  //------------CHART REALTIME-------
  componentWillMount() {
    setInterval(this.setData, 1000);
  }

  setData() {
    let dataRandom = this.getRandomData()
    this.setState({ dataSet: dataRandom })
  }


  getRandomData() {
    var data = [], totalPoints = 300;

    if (data.length > 0)
      data = data.slice(1);

    // Do a random walk
    while (data.length < totalPoints) {

      var prev = data.length > 0 ? data[data.length - 1] : 50,
        y = prev + Math.random() * 10 - 5;

      if (y < 0) {
        y = 0;
      } else if (y > 100) {
        y = 100;
      }

      data.push(y);
    }

    // Zip the generated y values with the x values
    var res = [];
    for (var i = 0; i < data.length; ++i) {
      res.push([i + 1, data[i]])
    }

    return res;
  }


  update() {


    // plot.setData([getRandomData()]);
    //  plot.draw();
    // setTimeout(update, updateInterval);
  }


  // -------------------------------
  //  plot = $.plot("#placeholder", [ getRandomData() ], {
  // 	series: {
  // 		shadowSize: 0	 
  // 	},
  // 	yaxis: {
  // 		min: 0,
  // 		max: 100
  // 	},
  // 	xaxis: {
  // 		show: false
  // 	}
  // });

  render() {

    const options = {
      series: {
        shadowSize: 0
      },
      yaxis: {
        min: 0,
        max: 100
      },
      xaxis: {
        show: false
      },
      zoom: {
        interactive: true
      },
      crosshair: { mode: "x" },
      pan: {
        interactive: true,
        enableTouch: true
      }
    };

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




    //	var plot = $.plot("#placeholder", [ d ], {
    var plotOptions = {
      series: {
        shadowSize: 0
      },
      yaxis: {
        min: 0,
        max: 100
      },
      xaxis: {
        show: true,
        xaxis: { mode: "time", timeBase: "milliseconds" }
      },
      crosshair: {
        mode: "x"
      },
      pan: {
        interactive: true,
        enableTouch: false
      }

    };


    return (
      <div>
        <ReactFlot id="first-chart" data={this.state.dataSet} options={plotOptions} />
      </div>


      // <ReactFlot id="product-chart" options={options} data={data} width="50%" height="100px" />
      // <ReactFlot id="horizontal-bar-chart" data={horizontalData} options={horizontalOptions} />
      // <ReactFlot id="first-chart" data={this.state.data} options={options} />
    );
  }
}

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(FlotChart)
