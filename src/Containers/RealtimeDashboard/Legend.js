import React, { Component } from 'react'
import { connect } from 'react-redux'
import RealtimeNewActions from '../../Redux/RealtimeNewRedux'
import { t } from '../../Components/Translation'

class Legend extends React.Component {

  setInfo(label, color, icon) {
    return <div className="form-group field field-string" style={{ padding: '2px 5px', marginBottom: 0, fontSize: 12 }}>
      {label === "control_room_23" ? <img
        src={'/icons/ic_sleep_mode.png'}
        style={{ width: 12 }}
      />
        : icon ? <i className="demo-icon icon-credit-card" style={{ color, margin: 0 }}></i> : <i className="fa fa-circle" style={{ color }} />
      }
      <span style={{ marginLeft: icon ? 2 : 7 }}>{t(label)}</span>
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
      display: this.props.stateMapControl.legendEnabled ? '' : 'none'
      // visibility: this.props.stateMapControl.legendEnabled ? '' : 'hidden'
    }}>
      <table>
        <thead>
          <tr>
            <td>{this.setInfo("realtime_1", 'rgb(93, 230, 72)')}</td>
            <td>{this.setInfo("realtime_2", '#ff3b30')}</td>
            <td>{this.setInfo("realtime_3", 'rgb(255, 230, 0)')}</td>
          </tr>
          <tr>
            <td>{this.setInfo("realtime_4", '#ADADB2')}</td>
            <td>{this.setInfo("realtime_5", '#5856d6')}</td>
            <td>{this.setInfo("realtime_6", '#0272b7')}</td>
          </tr>
          <tr>
            <td>{this.setInfo("realtime_62", 'rgb(93, 230, 72)', true)}</td>
            <td>{this.setInfo("realtime_63", '#f86c8b', true)}</td>
            <td>{this.setInfo("realtime_64", '#cacaca', true)}</td>
          </tr>
          <tr>
            <td>{this.setInfo("realtime_106", '#4F8F00')}</td>
            <td>{this.setInfo("realtime_107", '#733635')}</td>
            <td>{this.setInfo("control_room_23", "")}</td>
          </tr>
        </thead>
      </table>
    </div>
  }
}

const mapStateToProps = (state) => ({
  stateMapControl: state.realtimeNew.stateMapControl
})

const mapDispatchToProps = (dispatch) => ({
  setTempMapControl: (stateMapControl) => dispatch(RealtimeNewActions.setTempMapControl(stateMapControl))
})

export default connect(mapStateToProps, mapDispatchToProps)(Legend)
