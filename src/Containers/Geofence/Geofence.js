/* eslint-disable default-case */
/* eslint-disable no-dupe-class-members */
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import 'moment/locale/th'

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button } from 'reactstrap'
import moment from 'moment'

// import MapDraw from './MapDraw'
import Map from './Map'
import GeofenceActions from "../../Redux/GeofenceRedux"
import Table from '../../Components/DataGridView/Table.js'
import TableVehicles from '../../Components/DataGridView/TableVehicles'
import { t } from '../../Components/Translation'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';


// let isHino = false

const Geofence = (props) => {
  // const {  } = useSelector((state) => state.geofence);
  const { header, dataLogin } = useSelector((state) => state.signin);
  const { language } = useSelector((state) => state.versatile);

  const dispatch = useDispatch();
  const setData = (typeForm) => dispatch(GeofenceActions.setData(typeForm));
  const selectId = (typeForm, id) => dispatch(GeofenceActions.selectId(typeForm, id));
  const selectRow = (data, zoomSelected, centerSelected) => dispatch(GeofenceActions.selectRow(data, zoomSelected, centerSelected));
  // const getGeofence = (id) => dispatch(GeofenceActions.getGeofence(id));
  const deleteGeofence = (id) => dispatch(GeofenceActions.deleteGeofence(id));
  // const getDropdown = (id) => dispatch(GeofenceActions.getDropdown(id));
  const resetSelectRow = () => dispatch(GeofenceActions.resetSelectRow());

  const onRefreshClick = () => {
    window.location.reload();
  }

  let isHino = ([1, 2, 11, 12, 21, 22].includes(dataLogin.userLevelId)) ? true : false

  const addForm = () => {
    setData('Add', {})
    props.history.push("geofenceForm")
  }

  const selectedCallback = (e) => {
    if (e.selectedRowsData.length == 1) {
      selectRow(e.selectedRowsData, 13, JSON.parse(e.selectedRowsData[0].iconPoint.toLowerCase()))
    }
    else if (e.selectedRowsData.length == 0) {
      selectRow(e.selectedRowsData)
    }
    else if (e.selectedRowsData.length > 1) {
      selectRow(e.selectedRowsData, 6, { lat: 13.786377, lng: 100.608755 })
    }
  }

  const deleteCallback = (e) => {
    deleteGeofence(e.data.id)
    // setLoading( true )
  }

  const editCallback = (e) => {
    selectId("Edit", e.data.id)
    props.history.push('/geofenceForm')
  }

  // useEffect(() => {
  //   console.log('userLevelId', dataLogin.userLevelId)
  //   if ([1, 2, 11, 12, 21, 22].includes(dataLogin.userLevelId)) { isHino = true }

  // }, [])

  // useEffect(() => {
  //   if (typeForm !== null) {
  //     this.props.history.push("geofenceForm")
  //   }

  // }, [typeForm])

  // useEffect(() => {
  //   if (loading == false) {
  //     this.setState({ loadStore: false })
  //     // console.log('delete complete')
  //   }

  // }, [loading])

  useEffect(() => {
    // console.log('didMount')
    resetSelectRow()
    // window.onbeforeunload = (event) => {
    //   const e = event || window.event;
    //   // Cancel the event
    //   console.log('true:', e)
    //   e.preventDefault();
    //   if (e) {
    //     e.returnValue = ''; // Legacy method for cross browser support
    //     console.log('true');
    //   }
    //   else {
    //     console.log('false');
    //   }
    //   return ''; // Legacy method for cross browser support
    // };
    // return
    return () => {
      // console.log('unmount')
      resetSelectRow()
    }
  }, [])

  // console.log('isHino', isHino)

  return (
    <div>
      <Row>
        <Col lg="6">
          <div className="ibox">
            <div className="ibox-title" style={{ padding: '15px 20px 10px 15px' }}>
              <Row style={{ marginBottom: 0 }}>
                <Col lg="6">
                  <h4>{t('geofence_1')}</h4>
                </Col>
                <Col lg="6">
                  <div style={{ textAlign: "right", }} >

                    <Button className="btn btn-primary btn-sm" onClick={() => addForm()}><i className="fa fa-plus"></i>{' '}{t('geofence_2')}</Button>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="ibox-content" style={{ paddingLeft: 35, paddingRight: 35 }}>
              <Row>
                {
                  isHino ? <TableVehicles
                    mode={"api"}
                    serversideSource={ENDPOINT_BASE_URL + 'Geofence/Geofence/GridView?lang=' + language}
                    cookiesOptions={{
                      enable: true,
                      name: "Geofences"
                    }}
                    author={header.idToken}
                    xAPIKey={header.redisKey}
                    language={language}
                    table_id={7}
                    user_id={dataLogin.userId}
                    editing={{
                      enabled: true,
                      allowUpdating: true,
                      allowDeleting: true
                    }}
                    selectedCallback={selectedCallback}
                    deleteCallback={deleteCallback}
                    editCallback={editCallback}
                    autoExpandAll={false}
                    remoteOperations={true}
                    searchPanel={false}
                    columnCount="name"
                    column={[
                      {
                        column_name: 'name',
                        column_caption: 'geofence_3'
                      },
                      {
                        column_name: 'geofenceTypeName',
                        column_caption: 'geofence_4'
                      },
                      {
                        column_name: 'province',
                        column_caption: 'geofence_5'
                      },
                      {
                        column_name: 'createdBy',
                        column_caption: 'geofence_6'
                      },
                      {
                        column_name: 'createdDateTime',
                        column_caption: 'geofence_7',
                        column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
                      },
                      {
                        column_name: 'updatedBy',
                        column_caption: 'geofence_8'
                      },
                      {
                        column_name: 'updatedDateTime',
                        column_caption: 'geofence_9',
                        column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
                      },
                    ]}
                  >
                  </TableVehicles> :
                    <Table
                      mode={"api"}
                      serversideSource={ENDPOINT_BASE_URL + 'Geofence/Geofence/GridView?lang=' + language}
                      cookiesOptions={{
                        enable: true,
                        name: "Geofences"
                      }}
                      author={header.idToken}
                      xAPIKey={header.redisKey}
                      language={language}
                      table_id={7}
                      user_id={dataLogin.userId}
                      editing={{
                        enabled: true,
                        allowUpdating: true,
                        allowDeleting: true
                      }}
                      selectedCallback={selectedCallback}
                      deleteCallback={deleteCallback}
                      editCallback={editCallback}
                      autoExpandAll={false}
                      remoteOperations={true}
                      columnCount="name"
                      column={[
                        {
                          column_name: 'name',
                          column_caption: 'geofence_3'
                        },
                        {
                          column_name: 'geofenceTypeName',
                          column_caption: 'geofence_4'
                        },
                        {
                          column_name: 'province',
                          column_caption: 'geofence_5'
                        },
                        {
                          column_name: 'createdBy',
                          column_caption: 'geofence_6'
                        },
                        {
                          column_name: 'createdDateTime',
                          column_caption: 'geofence_7',
                          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
                        },
                        {
                          column_name: 'updatedBy',
                          column_caption: 'geofence_8'
                        },
                        {
                          column_name: 'updatedDateTime',
                          column_caption: 'geofence_9',
                          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
                        },
                      ]}
                    >
                    </Table>
                }

              </Row>
            </div>
          </div>

        </Col>
        <Col lg="6" style={{ position: 'relative', }}>
          <Row>
            <Map />
          </Row>
        </Col>
      </Row>
    </div>
  );

}

export default Geofence;
