import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import { connect } from 'react-redux'
import PannelBox from '../../Components/PannelBox'
import './table-checkbox.css'
import SaveButton from '../../Components/SaveButton'
import { Row } from 'devextreme-react/responsive-box'
import { Button, Col, FormGroup, Label, Input } from 'reactstrap';

import RoleSettingActions from '../../Redux/RoleSettingRedux'
import { thisExpression } from '@babel/types'
import { copyFileSync } from 'fs'


let tb_header = []
let tb_rowPerm = []
let tb_row = []
let dataUpdatePermission = []
let dataRolePermissOld = []

class RoleSetting extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      btnLoading: false,
      suffixRoleName: "",
      table: {
        "header": [
          {
            "hrID": "1",
            "hrTitle": "Create"
          },
          {
            "hrID": "2",
            "hrTitle": "Read"
          },
          {
            "hrID": "3",
            "hrTitle": "Update"
          },
          {
            "hrID": "4",
            "hrTitle": "Delete"
          }
        ],
        "row": [
          {
            "rowID": 1,
            "rowTitle": "Dealer",
            "column": [
              {
                "colID": "1-1",
                "checked": false
              },
              {
                "colID": "1-2",
                "checked": false
              },
              {
                "colID": "1-3",
                "checked": false
              },
              {
                "colID": "1-4",
                "checked": false
              }
            ]
          },
          {
            "rowID": 2,
            "rowTitle": "Customer",
            "column": [
              {
                "colID": "2-1",
                "checked": false
              },
              {
                "colID": "2-2",
                "checked": false
              },
              {
                "colID": "2-3",
                "checked": false
              },
              {
                "colID": "2-4",
                "checked": false
              }
            ]
          },
          {
            "rowID": 3,
            "rowTitle": "Driver",
            "column": [
              {
                "colID": "3-1",
                "checked": false
              },
              {
                "colID": "3-2",
                "checked": false
              },
              {
                "colID": "3-3",
                "checked": false
              },
              {
                "colID": "3-4",
                "checked": false
              }
            ]
          }
        ]

      }

    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.state.suffixRoleName = event.target.value
    this.setState(prevState => prevState)
  }
  componentDidMount() {
    // tb_header.length = 0
    // tb_row.length = 0
    // this.props.listPermission(this.props.groupType)
    // this.props.listGroupPermission(this.props.groupType, this.props.businessPartnerId)
    // this.setState(prevState => prevState)
  }
  componentDidUpdate(prevProps, nextState) {

    // เมื่อข้อมูลมีการเปลี่ยนแปลง ให้อัพเดทข้อมูลในตารางใหม่
    if (prevProps.listPers != this.props.listPers) {
      this.setState({ loading: false })
      this.setState({ btnLoading: false })
      tb_header.length = 0

      for (let items in this.props.listPers) {
        let policyId = this.props.listPers[items]["policyId"]
        // let policyName = this.props.listPers[items]["policyName"]
        let policyName = this.splitNamePers(this.props.listPers[items]["policyName"])
        let arn = this.props.listPers[items]["arn"]
        // เพิ่มชื่อแสดงบนหัวตาราง
        tb_header.push({
          hrID: policyId
          , hrTitle: policyName
          , arn: arn
        })
        tb_rowPerm.push(arn)
      }
      this.setState(prevState => prevState)
    }

    if (prevProps.listGroupPers != this.props.listGroupPers) {
      this.setState({ loading: false })
      this.setState({ btnLoading: false })

      tb_row.length = 0

      dataRolePermissOld.length = 0

      for (let group in this.props.listGroupPers) {
        let columns = []
        for (let items in this.props.listPers) {
          // tick => true (tick), false (untick)
          let tick = false
          let policyName = this.props.listPers[items]["policyName"]
          // มีสิทธิ์ใช้งาน ให้ tick
          for (let _policyName in this.props.listGroupPers[group]) {
            if (_policyName == policyName) tick = true
          }

          columns.push({
            checked: tick
          })
        }

        let groupName = this.splitNamePers(group)
        tb_row.push({
          rowTitle: groupName,
          column: columns
        })


        dataRolePermissOld.push({
          rowTitle: groupName,
          column: columns
        })
      }
    }
  }

  splitNamePers(policyName) {
    // Split PolicyName
    let spName = policyName.split("_");
    let _policyName = ""

    for (let item = 0; item < spName.length; item++) {
      if (item != 0) {
        if (_policyName == "")
          _policyName += spName[item]
        else
          _policyName += " " + spName[item]
      }
    }
    return _policyName
  }


  UpdatePermissions() {
    // เอาข้อมูลที่มีการเปลี่ยนแปลงไปอัพเดทเท่านั้น
    console.log("_________________________________")

    dataUpdatePermission.length = 0
    let oTable = document.getElementById('tb_test');

    let rowLength = oTable.rows.length;
    var RowList = [];

    let isChangePermission = false
    let updatePermiss = []
    for (let row = 1; row < rowLength; row++) {
      let oCells = oTable.rows.item(row).cells;
      let cellLength = oCells.length;

      let objRow = {}

      let groupPermissionDetail = []


      var dataColumn = [];
      let isSomeFieldChange = false
      for (var col = 1; col < cellLength; col++) {

        let checkBox = oCells.item(col).getElementsByTagName("input")[0];

        // action => 1 (tick) , 2 (untick)
        let action = "2";
        if (checkBox.checked) action = "1"

        console.log("row : " + row + " / col : " + col + " >> " + checkBox.checked)

        // let policyArn = this.props.listPers[col - 1].arn;

        // let checkedNew = false
        // if (checkBox.checked) checkedNew = true

        // let checkedOld = dataRolePermissOld[row - 1].column[col - 1].checked

        // ถ้า Permission เมื่อการเปลี่ยนแปลง ให้สร้าง Data สำหรับส่งไปอัพเดท
        // if (checkedNew != checkedOld) {
        //   isSomeFieldChange = true
        //   groupPermissionDetail.push({
        //     action: action
        //     , policyArn: policyArn

        //   })
        // }
      }

      objRow["rowNo"] = row;
      objRow["column"] = dataColumn;

      RowList.push(objRow);

      // let roleName = this.props.listGroupPers[row - 1]["roleName"]
      let roleName = ""
      let st = 0
      for (let _roleName in this.props.listGroupPers) {
        if (st == (row - 1)) {
          roleName = _roleName
        }
        st++
      }
      // ถ้าใน Group มีบางรายการเปลี่ยนแปลงให้สร้าง Object Data สำหรับอัพเดท
      if (isSomeFieldChange) {
        isChangePermission = true
        updatePermiss.push({
          roleName: roleName
          , groupPermissionDetail: groupPermissionDetail

        })
      }
    }

    var dataResult = {};
    var dataRow = {};
    dataRow["row"] = RowList;
    dataResult["data"] = dataRow;

    // if (isChangePermission)
    //   this.props.updatePermissionForGroup(this.props.groupType, updatePermiss, this.props.businessPartnerId)
    // else
    //   this.setState({ loading: false })
  }


  onClickNewGroup() {
    if (this.state.suffixRoleName != "") {
      this.props.createGroup(this.props.groupType, this.state.suffixRoleName, this.props.businessPartnerId)
      this.state.suffixRoleName = ""
      this.setState(prevState => prevState)
    }
    else {
      this.setState({ btnLoading: false })
    }
  }

  render() {

    const { component: Component, ...rest } = this.props
    return (
      <div>
        <PannelBox title={'Role Setting'} {...rest}>
          <div>
            <h3>Craete New Group</h3>
            <div className="hr-line-dashed"></div>
            <div className="form-horizontal">
              <div className="row" style={{ paddingTop: 25 }}>
                <Col lg="6">
                  <FormGroup>
                    <Label lg="4" className="control-label">Suffix Role Name :</Label>
                    <Col lg="8">
                      <Input
                        id="suffixRoleName"
                        name="suffixRoleName"
                        value={this.state.suffixRoleName}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <SaveButton name='Create New Group' loading={this.state.btnLoading} onClick={() => {
                    this.setState({ btnLoading: true })
                    this.onClickNewGroup()
                  }} />
                </Col>
              </div>
            </div>
            <div className="hr-line-dashed"></div>

            <div className="row">
              <div className="table-responsive" style={{ paddingLeft: 10, paddingRight: 10 }}>
                <table className="table table-checkbox" id="tb_test">
                  <thead>
                    <tr>
                      <th>Groups / Permissions</th>
                      {/* {tb_header.map((item) => <th>{item.hrTitle}</th>)} */}
                      {this.state.table.header.map((item, index) => <th key={index}>{item.hrTitle}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {/* {tb_row.map((item) => */}
                    {this.state.table.row.map((item, index) =>
                      <tr key={index}>
                        <td><span>{item.rowTitle}</span></td>
                        {item.column.map((cols, index) =>
                          <td key={index}><label className="container-checkbox">
                            <input type="checkbox" defaultChecked={cols.checked} />
                            <span className="checkmark"></span>
                          </label>
                          </td>)}
                      </tr>
                    )
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row" style={{ textAlign: "right" }}>
              <SaveButton loading={this.state.loading} onClick={() => {
                // this.setState({ loading: true })
                this.UpdatePermissions()
              }} />
            </div>
          </div>
        </PannelBox>
      </div>

    )
  }
}



const mapStateToProps = (state) => ({
  listPers: state.roleSetting.listPers,
  listGroupPers: state.roleSetting.listGroupPers,
  businessPartnerId: state.signin.businessPartnerId,
  groupType: state.signin.groupType,
  userGroup: state.signin.userGroup
});
const mapDispatchToProps = (dispatch) => ({
  listPermission: (roleUser) => dispatch(RoleSettingActions.listPermission(roleUser)),
  listGroupPermission: (roleUser, id) => dispatch(RoleSettingActions.listGroupPermission(roleUser, id)),
  updatePermissionForGroup: (roleUser, data, id) => dispatch(RoleSettingActions.updatePermissionForGroup(roleUser, data, id)),
  createGroup: (roleUser, suffixRoleName, id) => dispatch(RoleSettingActions.createGroup(roleUser, suffixRoleName, id))

});

export default connect(mapStateToProps, mapDispatchToProps)(RoleSetting)
