import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Button } from 'reactstrap'
import Table from '../../Components/DataGridView/Table.js'
import UserActions from '../../Redux/UserRedux'

class Users extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }


  onClickAdd() {
    this.props.setPersonalIdSelect(null, "add")
    this.props.history.push("/users/usersForm")
  }

  editCallback(e) {
    // console.log(e.data.id)
    this.props.setPersonalIdSelect(e.data.id, 'edit')
    this.props.history.push("/users/usersForm")

  }

  render() {

    let { header } = this.props

    return (
      <div className="form-horizontal" >
        <Row>
          <Col lg="12">
            <div className="ibox float-e-margins">
              <div className="ibox-content" style={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>

                <Row style={{ textAlign: "right", marginTop: 5, marginBottom: 5 }}>
                  <Button className="btn btn-primary btn-sm" onClick={() => this.onClickAdd()}><i className="fa fa-plus"></i>{' '}Add</Button>
                </Row>
                <Row>
                  <Table
                    mode={"api"}
                    serversideSource={'https://api-center.onelink-iot.com/v1.0.1/UserManage/User/GridView'}
                    author={header.idToken}
                    xAPIKey={header.redisKey}
                    tableId={1}
                    user_id={1}
                    // table_id={4}
                    // user_id={9999}
                    editing={{
                      enabled: true,
                      allowUpdating: true,
                      allowDeleting: true
                    }}
                    selectedCallback={this.selectedCallback}
                    initialCallback={this.tableInitial}
                    deleteCallback={(e) => this.deleteCallback(e)}
                    editCallback={(e) => this.editCallback(e)}
                    autoExpandAll={false}
                    remoteOperations={false}
                  >
                  </Table>
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
  // data: state.login.data
  header: state.signin.header,
});

const mapDispatchToProps = (dispatch) => ({
  setPersonalIdSelect: (personalId, action) => dispatch(UserActions.setPersonalIdSelect(personalId, action))
});

export default connect(mapStateToProps, mapDispatchToProps)(Users)
