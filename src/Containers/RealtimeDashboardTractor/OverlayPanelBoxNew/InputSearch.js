import React, { Suspense } from "react";
import { connect } from 'react-redux'
import { get, isEmpty, isEqual } from 'lodash'
import { t } from '../../../Components/Translation'
import RealtimeNewActions from '../../../Redux/RealtimeNewRedux'
import { Input } from 'antd';

class InputSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {


  }


  // shouldComponentUpdate(nextProps, nextState) {
  //   let { displayVehicle, activeTabOverlay, information, isFocus, initialVehiclesData } = this.props
  //   let { switchTab } = this.state

  //   if (!isEqual(nextProps.information, information)) {
  //     this.selectR = undefined
  //   }
  //   if (!isEqual(nextProps.initialVehiclesData, initialVehiclesData)) {
  //     this.initialVehiclesData = JSON.parse(JSON.stringify(nextProps.initialVehiclesData)).map((items, i) => {
  //       items.info.vehicleName = get(items, 'info.licenseplate') ? get(items, 'info.licenseplate') : get(items, 'info.vin_no')
  //       return items
  //     })
  //     if (displayVehicle === null) {
  //       let defaultDisplayVehicle
  //       if (TOTALDATA > nextProps.initialVehiclesData.length) defaultDisplayVehicle = this.initialVehiclesData.map((item) => get(item, 'info.vid'))
  //       else defaultDisplayVehicle = []
  //       this.props.setStateReduxRealtime({ displayVehicle: defaultDisplayVehicle })
  //     }

  //     this.setState({ listVehicles: this.initialVehiclesData })

  //     return false
  //   }
  //   if (!isEqual(nextProps.displayVehicle, displayVehicle)) {
  //     this.displayVehicle = JSON.parse(JSON.stringify(nextProps.displayVehicle))
  //     return true
  //   }
  //   return true
  // }

  doSearch(text) {
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      // Do the ajax stuff
      // console.log('text', text)
      this.props.doSearch(text)
    }, 500); // Will do the ajax stuff after 1000 ms, or 1 s
  }


  render() {
    let { vehiclesLoading, displayVehicle } = this.props
    let { listVehicles, pageSize } = this.state
    // console.log(' ------ VehicleList ------', listVehicles)
    return <Input
      onChange={(event) => this.doSearch(event.target.value)}
      // onChange={(event) => console.log('text', event.target.value)}
      allowClear={true}
      size="large"
      placeholder="Search..."
      prefix={<i class="fas fa-search" style={{ color: '#999' }}></i>}
      style={{ marginBottom: 5 }} />
  }

}

const mapStateToProps = (state) => ({
  // information: state.realtimeNew.information,
});
const mapDispatchToProps = (dispatch) => ({
  // setActiveTab: (activeTab) => dispatch(RealtimeNewActions.setActiveTab(activeTab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputSearch);
