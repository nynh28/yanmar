import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import GPSUnitActions from '../../Redux/GPSUnitRedux'
import { withRouter } from 'react-router'
import PannelBox from '../../Components/PannelBox'
import SearchData from './SearchData.js'
import DataTable from './DataTable.js'
import queryString from 'query-string';

class GPSUnit extends Component {

  constructor(props) {
    super(props)
    this.state = {};
  }

  componentWillMount() {
    this.props.getDataUnitSuccess([])
  }

  render() {
    let _imei, params = queryString.parse(this.props.location.search)
    if (params.imei) _imei = params.imei

    return (
      <Suspense fallback={null}>
        <SearchData imei={_imei} />
        <PannelBox
          style={{ marginTop: -20 }}
          contentStyle={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>
          <DataTable />
        </PannelBox>
      </Suspense>
    )
  }
}



const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  getDataUnitSuccess: dataSource => dispatch(GPSUnitActions.getDataUnitSuccess(dataSource))


});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GPSUnit))
