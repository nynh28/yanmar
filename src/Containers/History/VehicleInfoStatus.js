import React, { Component } from 'react'
import { connect } from 'react-redux'
import HistoryActions from '../../Redux/HistoryRedux'
import Images from './icons/Images'
import { t } from '../../Components/Translation'

class VehicleInfoStatus extends React.Component {

  componentWillUnmount() {
    this.props.setShowVehicleInfoStatus(true)
  }

  actionIcon(code) {
    let iconSize = { width: 15, height: 15 }
    return (
      <img src={code == 2 ? Images.iconParking :
        code == 3 ? Images.iconIdling :
          code == 4 ? Images.iconMoving :
            code == 5 && Images.iconOverSpeed} style={iconSize} />
    )
  }

  // setInfo(label, code, color) {
  //   return <div className="form-group field field-string" style={{ padding: '2px 5px', marginBottom: 0, fontSize: 12 }}>
  //     {code != 5 ? this.actionIcon(code) : <i className="fa fa-circle" style={{ color }} />}
  //     <span style={{ marginLeft: 5 }}>{t(label)}</span>
  //   </div>
  // }

  setInfo(label, color, icon) {
    return <div className="form-group field field-string" style={{ padding: '2px 5px', marginBottom: 0, fontSize: 12 }}>
      {<i className="fa fa-circle" style={{ color }} />}
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
      visibility: this.props.showVehicleInfoStatus ? '' : 'hidden'
    }}>
      <table>
        <thead>
          <tr>
            <td>{this.setInfo("realtime_1", 'rgb(93, 230, 72)')}</td>
            <td>{this.setInfo("realtime_2", 'rgb(248, 108, 139)')}</td>
            {/* <td> {this.setInfo("realtime_2", 2)}</td>
            <td> {this.setInfo("realtime_3", 3)}</td> */}
          </tr>
          <tr>
            <td>{this.setInfo("realtime_3", 'rgb(255, 230, 0)')}</td>
            <td>{this.setInfo("realtime_5", 'rgb(88, 86, 214)')}</td>
            {/* <td>{this.setInfo("realtime_1", 4)}</td>
            <td>{this.setInfo("realtime_5", 5, '#5856d6')}</td> */}
          </tr>
        </thead>
      </table>
    </div>
  }
}

const mapStateToProps = (state) => ({
  showVehicleInfoStatus: state.history.showVehicleInfoStatus
})

const mapDispatchToProps = (dispatch) => ({
  setShowVehicleInfoStatus: (isShow) => dispatch(HistoryActions.setShowVehicleInfoStatus(isShow))
})

export default connect(mapStateToProps, mapDispatchToProps)(VehicleInfoStatus)