
import React, { Component } from 'react'
import InstallingActions from '../../Redux/InstallingRedux'
import { connect } from 'react-redux'
import {
  Col, Row, ListGroup, ListGroupItem, Input, Button, FormGroup, Label
} from 'reactstrap'
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import 'moment/locale/th'
import Table from '../../Components/DataGridView/Table.js'
import { ENDPOINT_BASE_URL } from '../../Config/app-config'
import { ENDPOINT_INSTALL_BASE_URL } from '../../Config/app-config';

class InstallingApproval extends Component {
  constructor(props) {
    super(props)
    this.state = {
      autoExpandAll: true,
      currentDataGridState: [],
      listfilter: [],
      params: "",
    };
    this.viewRender = this.viewRender.bind(this)
  }

  componentDidMount() {
    // this.props.getServiceItems()
  }

  componentWillMount() {

  }

  componentWillUnmount() {


  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillReceiveProps(newProps, prevState) {

  }

  cellRender({ data }) {
    console.log(data)
    if (data.serviceStatus != 2) {
      return <div style={{ textAlign: 'center' }}>
        <Button className="btn-xs" color="info" onClick={(e) => {
          if (window.confirm('Are you sure you wish to update this item?')) {
            console.log('click ok')
            this.props.updateServiceStatus(data.id, 2)
          }
        }}>
          {/* <i class="fa fa-check"></i>{` `} Approve */}
        Approve
      </Button></div>
    }
  }

  viewRender = (e) => {
    this.props.idSelected("edit", e.data.id, e.data)
    this.props.history.push('/Management/installingApprovalForm')
  }

  render() {
    let { header } = this.props
    // this.props.fetching
    return (
      <div className="ibox">
        <div class="ibox-title">
          <h2>GPS Installing Approval</h2>
        </div>
        <div class="ibox-content" style={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 1px 0px 0px ', borderColor: '#e7eaec' }}>
          <Row>
            <Col lg="12">
              <div className="ibox float-e-margins">
                {/* <div className="ibox-content" style={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}> */}
                {this.props.fetching} {/* auto refresh after update status success */}
                <Row style={{ textAlign: "right", marginTop: 5, marginBottom: 0 }}>
                </Row>
                <Row>
                  <Table
                    mode={"api"}
                    serversideSource={ENDPOINT_INSTALL_BASE_URL + 'grid-view/services'}
                    author={header.idToken}
                    xAPIKey={header.redisKey}
                    table_id={6}
                    user_id={this.props.dataLogin.userId}
                    editing={{
                      enabled: true,
                      allowUpdating: true,
                      // allowDeleting: true
                    }}
                    searchPanel={true}
                    selectedCallback={this.selectedCallback}
                    initialCallback={this.tableInitial}
                    // deleteCallback={(e) => this.deleteCallback(e)}
                    editCallback={(e) => this.viewRender(e)}
                    autoExpandAll={false}
                    remoteOperations={false}
                    column={[
                      {
                        column_name: 'vinNo',
                        column_caption: "Vihicle No.",
                      },
                      {
                        column_name: 'chassisNo',
                        column_caption: "Chassis No.",
                      },
                      {
                        column_name: 'engineNo',
                        column_caption: "Engine No.",
                      },
                      {
                        column_name: 'imei',
                        column_caption: "Imei",
                      },
                      {
                        column_name: 'displayName',
                        column_caption: "Display Name",
                      },
                      {
                        column_name: 'serviceStatus',
                        column_caption: "Service Status",
                        column_render: ({ value }) => {
                          return <div style={{ textAlign: 'center' }}>{value == 1 ? <div style={{ color: 'orange' }}>รอตรวจสอบ</div> :
                            (value == 2 ?
                              <div style={{ color: 'green' }}>ผ่าน</div> :
                              <div style={{ color: 'red' }}>ไม่ผ่าน</div>)}
                          </div>
                        }
                      },

                    ]}
                  >
                  </Table>
                </Row>
              </div>
              {/* </div> */}
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  loadingSearch: state.user.loadingSearch,
  lstUserData: state.user.lstUserData,
  serviceItems: state.installing.serviceDetail,
  fetching: state.installing.fetching,
  loading: state.installing.loading,
});
const mapDispatchToProps = (dispatch) => ({
  getServiceItems: () => dispatch(InstallingActions.getServiceRequest()),
  updateServiceStatus: (id, serviceStatus) => dispatch(InstallingActions.updateServiceStatusRequest(id, serviceStatus)),
  idSelected: (typeForm, id, detail) => dispatch(InstallingActions.idSelected(typeForm, id, detail)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InstallingApproval)
