import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import UserActions from "../../Redux/UserRedux";
import { Row, Col } from "reactstrap";
import Table from "../../Components/DataGridView/TableVehicles";
import { get, isEmpty } from "lodash";
import moment from "moment";
import { ENDPOINT_BASE_URL } from "../../Config/app-config";
import SearchBar from "./SearchBar";
import { BoxContrainer, Button } from "../../components_new";
import FormSelectSearch from "../../Components/FormControls/FormSelectSearch";
import FormInput from "../../Components/FormControls/Basic/FormInput";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSearch: "",
      params: "",
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { params, userData } = this.props;
    if (nextProps.userData !== userData) {
      return true;
    }
    if (nextState.params !== params) {
      return true;
    }
    return false;
  }

  onClickAdd() {
    this.props.setIdSelect(null, "Add");
    this.props.history.push("/userSetting/userSettingForm");
  }

  editCallback(e) {
    this.props.setIdSelect(e.data.id, "Edit");
    this.props.history.push("/userSetting/userSettingForm");
  }

  deleteCallback(e) {
    this.props.deleteUser(e.data.id);
  }

  _vehicle = (value) => {
    this.setState({ dataSearch: value });
  };

  render() {
    let { header, dataLogin, userData } = this.props;
    let { dataSearch, params } = this.state;
    let dataSource = userData;

    return (
      <Suspense fallback={null}>
        <SearchBar
          data={(value) => this._vehicle(value)}
          onSearch={(value) => {
            this.setState({ params: value });
          }}
        />
        <BoxContrainer>
          <Row>
            <Col lg="12">
              <Row style={{ textAlign: "right", margin: "5px -3px 0px 0px" }}>
                {/* <Button className="btn btn-primary btn-sm" onClick={() => this.onClickEdit()}>Edit</Button> */}
                {/* <Button className="btn btn-primary btn-sm" onClick={() => this.onClickAdd()}><i className="fa fa-plus"></i>{' '}{t("add")}</Button> */}
                <Button
                  size="small"
                  className="ant-btn-primary-outline"
                  icon={
                    <i
                      className="fa fa-plus"
                      style={{ width: 15, marginRight: 4 }}
                    />
                  }
                  text="add"
                  onClick={() => this.onClickAdd()}
                />
              </Row>
              <Row
                style={{
                  height: `calc(100vh - 230px)`,
                }}
              >
                <Table
                  mode={"api"}
                  serversideSource={
                    `${ENDPOINT_BASE_URL}user/Yanmar?${params}`

                    // username=" +
                    // get(dataSearch, "username", "") +
                    // "&PhoneNo=" +
                    // get(dataSearch, "moblie", "") +
                    // "&email=" +
                    // get(dataSearch, "email", "") +
                    // "&Roleid=" +
                    // get(dataSearch, "role", "") +
                    // "&Partner=" +
                    // get(dataSearch, "ownerpartnername", "")
                  }
                  table_id={6}
                  user_id={dataLogin.userId}
                  editing={{
                    enabled: true,
                    allowUpdating: true,
                    allowDeleting: true,
                  }}
                  searchPanel={false}
                  author={header.idToken}
                  xAPIKey={header.redisKey}
                  selectedCallback={this.selectedCallback}
                  deleteCallback={(e) => this.deleteCallback(e)}
                  editCallback={(e) => this.editCallback(e)}
                  autoExpandAll={false}
                  remoteOperations={false}
                  allowDeleting={{
                    column_name: "deletable",
                    condition: true,
                  }}
                  allowUpdating={{
                    column_name: "editable",
                    condition: true,
                  }}
                  columnCount={"role"}
                  column={[
                    {
                      column_name: "role",
                      column_caption: "user_101",
                    },
                    {
                      column_name: "partner",
                      column_caption: "user_102",
                    },
                    // {
                    //   column_name: 'userLevelName',
                    //   column_caption: "user_103",
                    // },
                    {
                      column_name: "displayName",
                      column_caption: "user_104",
                    },
                    {
                      column_name: "username",
                      column_caption: "user_105",
                    },
                    {
                      column_name: "phoneNo",
                      column_caption: "user_106",
                    },
                    {
                      column_name: "email",
                      column_caption: "user_107",
                    },
                    {
                      column_name: "lineId",
                      column_caption: "user_108",
                    },
                    // {
                    //   column_name: 'isExpired',
                    //   column_caption: "user_109",
                    // },
                    // {
                    //   column_name: 'expiredDate',
                    //   column_caption: "user_110",
                    // },
                    // {
                    //   column_name: 'loginFailedCount',
                    //   column_caption: "user_111",
                    // },
                    // {
                    //   column_name: 'isLocked',
                    //   column_caption: "user_112",
                    // },
                    {
                      column_name: "status",
                      column_caption: "user_113",
                    },
                    {
                      column_name: "lastPasswordChange",
                      column_caption: "user_114",
                      column_render: (e) =>
                        !isEmpty(e.value)
                          ? moment(e.value).format("DD/MM/YYYY HH:mm:ss")
                          : "",
                    },
                  ]}
                />
              </Row>
            </Col>
          </Row>
        </BoxContrainer>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  params: state.userSetting.params,
  userData: state.userSetting.userData,
});

const mapDispatchToProps = (dispatch) => ({
  setIdSelect: (personalId, action) =>
    dispatch(UserActions.setIdSelect(personalId, action)),
  deleteUser: (id) => dispatch(UserActions.deleteUser(id)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DataTable)
);
