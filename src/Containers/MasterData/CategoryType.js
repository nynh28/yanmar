import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModelActions from '../../Redux/ModelRedux'
import { withRouter } from 'react-router'
import { Row, Col } from 'reactstrap'
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import 'moment/locale/th'
import TableRole from '../../Components/DataGridView/TableRole.js'
import { ENDPOINT_BASE_URL } from '../../Config/app-config'

class CategoryType extends Component {

  constructor(props) {
    super(props)
    this.state = {
      autoExpandAll: true,
      currentDataGridState: [],
      listfilter: [],
      params: "",
    };
    this.dataGrid = React.createRef();
  }

  handleChange(event) {
    this.setState({
      img: URL.createObjectURL(event.target.files[0])
    })
  }

  componentWillMount = () => {
    this.props.getCategoryType()
    // this.props.getClassType()
    // this.props.getEngineSeries()
  }

  componentDidMount = () => {

  }

  isCloneIconVisible(data) {
    if (data.Title === undefined) {
      return true
    }
    return false
  }


  render() {
    let { header } = this.props
    let { params } = this.state

    return (
      <div>
        <Row>
          <Col lg="12">
            <div className="ibox float-e-margins">
              <div className="ibox-content" style={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>

                <Row style={{ textAlign: "right", marginTop: 5, marginBottom: 0 }}>
                </Row>
                <Row>
                  <TableRole
                    mode={"api"}
                    serversideSource={ENDPOINT_BASE_URL.concat('/grid-view/model-category-type?' + params)}
                    author={header.idToken}
                    xAPIKey={header.redisKey}
                    table_id={6}
                    user_id={this.props.dataLogin.userId}
                    editing={{
                      enabled: false,
                      allowUpdating: true,
                      // allowDeleting: true
                    }}
                    searchPanel={false}
                    selectedCallback={this.selectedCallback}
                    initialCallback={this.tableInitial}
                    // deleteCallback={(e) => this.deleteCallback(e)}
                    editCallback={(e) => this.editCallback(e)}
                    autoExpandAll={false}
                    remoteOperations={false}
                    column={[
                      {
                        column_name: 'id',
                        column_caption: "ID",
                      },
                      {
                        column_name: 'type',
                        column_caption: "Type",
                      },
                      {
                        column_name: 'name',
                        column_caption: "Name",
                      },
                      {
                        column_name: 'isActive',
                        column_caption: "isActive",
                      }

                    ]}
                  >
                  </TableRole>
                </Row>

              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}



const mapStateToProps = (state) => ({
  language: state.versatile.language,

  data_getCategoryType: state.model.data_getCategoryType,
  request_getCategoryType: state.model.request_getCategoryType,

  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  loadingSearch: state.user.loadingSearch,
  lstUserData: state.user.lstUserData,

  // data_getClassType: state.model.data_getClassType,
  // request_getClassType: state.model.request_getClassType,

  // data_getEngineSeries: state.model.data_getEngineSeries,
  // request_getEngineSeries: state.model.request_getEngineSeries,
});

const mapDispatchToProps = (dispatch) => ({
  getCategoryType: () => dispatch(ModelActions.getCategoryType()),
  // getClassType: () => dispatch(ModelActions.getClassType()),
  // getEngineSeries: () => dispatch(ModelActions.getEngineSeries()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryType))



