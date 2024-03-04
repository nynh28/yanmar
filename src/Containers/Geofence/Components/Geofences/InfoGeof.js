import React, { Component } from 'react';
import { connect } from 'react-redux'
import { InfoWindow } from '@react-google-maps/api'
import { t } from '../../../../Components/Translation'

import { get, isEqual } from 'lodash'

const tdStyle1 = {
  border: 'none',
  width: '180px',
  verticalAlign: 'top'
}

const tdStyle2 = {
  border: 'none',
  width: '130px',
  verticalAlign: 'top'
}

class InfoGeof extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infoWin: null,
      anchor: null

    }
  }

  componentDidUpdate(prevProps, nextState) {

    if (!isEqual(prevProps.infoWin, this.props.infoWin)) {
      if (prevProps.infoWin !== null) {
        this.setState({ infoWin: null })
      } else {

        this.setState({ infoWin: this.props.infoWin })
      }
    }
    if (!isEqual(nextState.infoWin, this.state.infoWin) && this.props.infoWin !== null) {
      this.setState({ infoWin: this.props.infoWin })
    }

    if (!isEqual(prevProps.anchor, this.props.anchor)) {
      if (prevProps.anchor !== null) {
        this.setState({ anchor: null })
      } else {

        this.setState({ anchor: this.props.anchor })
      }
    }
    if (!isEqual(nextState.anchor, this.state.anchor) && this.props.anchor !== null) {
      this.setState({ anchor: this.props.anchor })
    }

    // if (!isEqual(prevProps.geofenceDetail, this.props.geofenceDetail)) {
    //   if (prevProps.geofenceDetail !== null) {
    //     this.setState({ geofenceDetail: null })
    //   } else {

    //     this.setState({ geofenceDetail: this.props.geofenceDetail })
    //   }
    // }
    // if (!isEqual(nextState.geofenceDetail, this.state.geofenceDetail) && this.props.geofenceDetail !== null) {
    //   this.setState({ geofenceDetail: this.props.geofenceDetail })
    // }

  }


  render() {
    let { infoWin, anchor } = this.state
    let { geofenceDetail } = this.props
    // console.log(infoWin)
    // console.log(anchor)
    // console.log(geofenceDetail)

    // get(geofenceDetail, '')

    let data = {
      geofenceType: get(geofenceDetail, 'geofenceTypeNav.value'),
      geofenceName: get(geofenceDetail, 'name'),
      geofenceDescription: get(geofenceDetail, 'description'),
      subdistrict: get(geofenceDetail, 'locationSimpleInfo.subdistrict'),
      district: get(geofenceDetail, 'locationSimpleInfo.district'),
      province: get(geofenceDetail, 'locationSimpleInfo.province'),
      hazard: get(geofenceDetail, 'isHazard') ? 'Yes' : 'No',
      share: get(geofenceDetail, 'isShare') ? 'Yes' : 'No',
      geometryType: get(geofenceDetail, 'geomTypeNav.value')
    }

    return (
      geofenceDetail && anchor && <InfoWindow
        anchor={anchor}
        position={{}}
        onCloseClick={() => this.props.markerLoadHandler(null)}
      >
        <div>
          <table className="table-info-window">
            <tbody>
              <tr>
                <td style={tdStyle1}>
                  <small>{t('geofence_type')} :</small>
                </td>
                <td style={tdStyle2}>
                  <small>{data.geofenceType}</small>
                </td>
              </tr>



              <tr>
                <td style={tdStyle1}>
                  <small>{t('geofence_name')} :</small>
                </td>
                <td style={tdStyle2}>
                  <small>{data.geofenceName}</small>
                </td>
              </tr>

              <tr>
                <td style={tdStyle1}>
                  <small>{t('geofence_description')} :</small>
                </td>
                <td style={tdStyle2}>
                  <small>{data.geofenceDescription}</small>
                </td>
              </tr>

              <tr>
                <td style={tdStyle1}>
                  <small>{t('sub_district')} :</small>
                </td>
                <td style={tdStyle2}>
                  <small>{data.subdistrict}</small>
                </td>
              </tr>

              <tr>
                <td style={tdStyle1}>
                  <small>{t('district')} :</small>
                </td>
                <td style={tdStyle2}>
                  <small>{data.district}</small>
                </td>
              </tr>

              <tr>
                <td style={tdStyle1}>
                  <small>{t('province')} :</small>
                </td>
                <td style={tdStyle2}>
                  <small>{data.province}</small>
                </td>
              </tr>

              <tr>
                <td style={tdStyle1}>
                  <small>{t('hazard')} :</small>
                </td>
                <td style={tdStyle2}>
                  <small>{data.hazard}</small>
                </td>
              </tr>

              <tr>
                <td style={tdStyle1}>
                  <small>{t('share')} :</small>
                </td>
                <td style={tdStyle2}>
                  <small>{data.share}</small>
                </td>
              </tr>

              <tr>
                <td style={tdStyle1}>
                  <small>{t('geometry_type')} :</small>
                </td>
                <td style={tdStyle2}>
                  <small>{data.geometryType}</small>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </InfoWindow>
    )

    // return <div></div>

  }
}

const mapStateToProps = (state) => ({
  geofenceDetail: state.realtime.geofenceDetail,
  // infoOpen: state.history.infoOpen
});
const mapDispatchToProps = (dispatch) => ({
  // setInfoOpen: (infoOpen) => dispatch(HistoryActions.setInfoOpen(infoOpen))
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoGeof)
