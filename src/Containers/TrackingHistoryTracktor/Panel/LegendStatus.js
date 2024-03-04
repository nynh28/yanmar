import React, { Component } from 'react'
import { connect } from 'react-redux'
import TrackingHistoryActions from '../../../Redux/TrackingHistoryRedux'
import Images from '../icons/Images'
import { getEventIcon, getEventName } from '../Functions'
import { t } from '../../../Components/Translation'

class LegendStatus extends React.Component {

  componentWillUnmount() {
    this.props.setValue("legendVisibled", true)
  }

  setInfo(event_id) {
    return <div className="form-group field field-string" style={{ padding: '2px 5px', marginBottom: 0, fontSize: 12 }}>
      {/* {<i className="fa fa-circle" style={{ color }} />} */}
      {<img src={getEventIcon(event_id)} alt="image" style={{ width: 15, height: 15 }} />}
      {/* <span style={{ marginLeft: icon ? 2 : 7 }}>{t(label)}</span> */}
      <span style={{ marginLeft: 7 }}>{t(getEventName(event_id))}</span>
    </div>
  }

  render() {
    return <div className='table-tan' style={{
      backgroundColor: '#FFF',
      width: 'auto',
      marginTop: 10,
      boxShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 6px',
      borderRadius: 4,
      marginLeft: -26,
      padding: 10,
      display: this.props.legendVisibled ? '' : 'none'
      // visibility: this.props.legendVisibled ? '' : 'hidden'
    }}>
      <table>
        <thead>
          <tr>
            <td>{this.setInfo(1)}</td>
            <td>{this.setInfo(2000)}</td>
            <td>{this.setInfo(3)}</td>
            <td>{this.setInfo(5)}</td>
            <td>{this.setInfo(20000)}</td>
          </tr>
          <tr>
            <td>{this.setInfo(9)}</td>
            <td>{this.setInfo(1001)}</td>
            <td>{this.setInfo(1002)}</td>
            <td>{this.setInfo(7)}</td>
            <td>{this.setInfo(20001)}</td>
          </tr>
          <tr>
            <td>{this.setInfo(21)}</td>
            <td>{this.setInfo(14)}</td>
            <td>{this.setInfo(1010)}</td>
            <td>{this.setInfo(1011)}</td>
          </tr>
        </thead>
      </table>
    </div>
  }
}

const mapStateToProps = (state) => ({
  legendVisibled: state.trackingHistory.legendVisibled
})

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(TrackingHistoryActions.setValue(name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LegendStatus)
