import React from 'react';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column, Selection, Export, ColumnChooser, SearchPanel, Editing, Paging,
  Pager, Grouping, GroupPanel, Summary, GroupItem, FilterRow, HeaderFilter
} from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import { Template } from 'devextreme-react/core/template';
import 'whatwg-fetch';
import Swal from 'sweetalert2'
import { get } from 'lodash'
// import './Table.css'
function isNotEmpty(value) {
  return !!value;
}

class TableOld extends React.Component {
  constructor(props) {
    super(props);
    this.datagrids = React.createRef();
    this.selectedRowsData = [];
    this.store = new CustomStore({
      key: this.props.key || 'id',
      load: (loadOptions) => {
        let params = '?';
        [
          'skip',
          'take',
          'requireTotalCount',
          'requireGroupCount',
          'sort',
          'filter',
          'totalSummary',
          'group',
          'groupSummary'
        ].forEach(function (i) {
          if (i in loadOptions && isNotEmpty(loadOptions[i])) {
            params += `${i}=${encodeURIComponent(JSON.stringify(loadOptions[i]))}&`;
          }
        });
        params = params.slice(0, -1);
        if (this.initial == 0) {
          this.defaultSetting = params
          this.initial = 1;
        }
        this.currentSetting = params;

        return fetch(`${this.props.serversideSource}${params}`, {
          headers: {
            'Authorization': this.props.author,
            'X-API-Key': this.props.xAPIKey,
          }
        })
          .then(response => response.json())
          .then((data) => {
            return {
              data: data.data,
              totalCount: data.totalCount,
              summary: data.summary,
              groupCount: data.groupCount
            };
          })
          .catch(() => { throw 'Data Loading Error'; });
      }
    });
    this.state = {
      ready: 0,
      table_id: this.props.table_id,
      user_id: this.props.user_id,
      current_profile: "",
      error: "",
      setting_profile: []

    }
    this.load_setting_profile = this.load_setting_profile.bind(this);
    this.loadState = this.loadState.bind(this);
    this.changeProfile = this.changeProfile.bind(this);
    this.saveProfileSetting = this.saveProfileSetting.bind(this);
    this.deleteProfileSetting = this.deleteProfileSetting.bind(this);
    this.onToolbarPreparing = this.onToolbarPreparing.bind(this);
    this.zoomDataGrid = this.zoomDataGrid.bind(this);
    this.toolbarItemRender = this.toolbarItemRender.bind(this);
    this.datagrids = React.createRef();
    this.select_profile = React.createRef();
    this.modal_profile_name = React.createRef();
    this.onEditingStart = this.onEditingStart.bind(this);
    this.onRowDelete = this.onRowDelete.bind(this);
  }

  componentDidMount() {
    this.load_setting_profile();
    if (typeof this.props.initialCallback !== 'undefined')
      this.props.initialCallback(this.datagrids);
  }

  toolbarItemRender() {
    return (
      <div>

      </div>
    );
  }

  async deleteProfileSetting() {
    var array_value = this.select_profile.current.value.split("|");
    var table_id = array_value[0]
    var user_id = this.state.user_id
    var owner_user_id = array_value[1]
    var profile_name = array_value[2]
    var is_default = array_value[3]
    if (is_default == 1) {
      Swal.fire('ล้มเหลว', 'ไม่สามารถลบได้ เพราะเป็นโปรไฟล์พื้นฐานของตารางที่สร้างโดยระบบ', 'error')
      return;
    }
    var object = {
      table_id: table_id,
      user_id: user_id,
      profile_name: profile_name
    }
    var response = await fetch('http://18.140.184.161:5000/delete/setting', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Accept": "text/html",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object) // body data type must match "Content-Type" header
    });
    var responseJson = await response.json();
    if (responseJson.result == true) {
      this.load_setting_profile()
      return;
    }
    Swal.fire('ล้มเหลว', 'ไม่สามารถลบได้ กรุณาติดต่อผู้ดูแลระบบ', 'error')
    return;
  }

  async saveProfileSetting() {
    var profile_name = this.modal_profile_name.current.value;
    if (profile_name == "") {
      Swal.fire('ล้มเหลว', 'กรุณาระบุชื่อโปรไฟล์ที่ต้องการ', 'error')
      return
    }
    window.jQuery('#setting-modal').modal('hide')
    var table_id = this.state.table_id
    var user_id = this.state.user_id
    var table_config = this.datagrids.current.instance.state()

    var object = {
      table_id: table_id,
      user_id: user_id,
      table_config: JSON.stringify(table_config),
      profile_name: profile_name
    }
    var response = await fetch('http://18.140.184.161:5000/save/setting', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Accept": "text/html",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object) // body data type must match "Content-Type" header
    });
    var responseJson = await response.json();
    if (responseJson.result == true) {
      this.load_setting_profile()
      return;
    }
    Swal.fire('ล้มเหลว', 'เกิดข้อผิดพลาดไม่สามารถบันทึกได้', 'error')
    window.jQuery('#setting-modal').modal('hide')

  }

  async load_setting_profile(forceselected = false) {
    var table_id = this.state.table_id
    var user_id = this.state.user_id

    if (user_id == 0 || table_id == 0) {
      this.setState({
        setting_profile: [],
        ready: 1
      })
      return;
    }

    var object = {
      table_id: table_id,
      user_id: user_id
    }
    var response = await fetch('http://18.140.184.161:5000/load/setting', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Accept": "text/html",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object) // body data type must match "Content-Type" header
    });
    var responseJson = await response.json();
    if (responseJson.result == true) {
      var setting = responseJson.setting.map((element, i) => {
        return {
          value: element.table_id + "|" + element.owner_user_id + "|" + element.profile_name + "|" + element.is_default,
          text: element.profile_name
        }
      })
      this.setState({
        setting_profile: setting,
        ready: 1
      }, () => {
      })
    } else {
      this.setState({
        setting_profile: [],
        ready: 1
      })
    }
  }

  async changeProfile() {
    var array_value = this.select_profile.current.value.split("|");
    this.setState({
      current_profile: array_value
    })
  }

  async loadState() {
    if (this.state.table_id == 0 || this.state.user_id == 0) {
      return {}
    }
    var array_value = this.select_profile.current.value.split("|");
    var table_id = array_value[0]
    var owner_user_id = array_value[1]
    var profile_name = array_value[2]
    var is_default = array_value[3]
    var object = {
      table_id: table_id,
      owner_user_id: owner_user_id,
      profile_name: profile_name,
      is_default: is_default,
      user_id: this.state.user_id
    }
    var response = await fetch('http://18.140.184.161:5000/load/state', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Accept": "text/html",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object) // body data type must match "Content-Type" header
    });
    var responseJson = await response.json();
    if (responseJson.result == true) {
      return JSON.parse(responseJson.state)
    } else {
      return {}
    }
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'fontsize',
          onClick: this.zoomDataGrid.bind(this)
        }
      }
    );
  }

  zoomDataGrid() {
    let level = this.state.zoomTableLevel
    if (level === undefined) level = 1
    switch (level) {
      case 1:
        level = 2
        document.getElementById('gridtable').style.zoom = 1.3
        break;
      case 2:
        level = 3
        document.getElementById('gridtable').style.zoom = 1.6
        break;
      default:
        level = 1
        document.getElementById('gridtable').style.zoom = 1
        break;
    }
    this.setState({ zoomTableLevel: level })
  }


  onEditingStart(e) {
    e.cancel = "true"
    this.props.editCallback(e)
  }


  onRowDelete(e) {
    e.cancel = "true";
    this.props.deleteCallback(e)
  }

  render() {
    if (this.state.ready == 0) {
      return (<div>{this.state.error}</div>)
    }
    return (
      <div className="row">
        <div className="col-md-12">
          <div style={this.state.setting_profile.length == 0 ? { display: 'none' } : {}} className="row">
            <div className="col-lg-12 text-left">
              <div className="form-inline float-right" style={{ marginBottom: 15 }}>
                <div className="form-group">
                  <select onChange={this.changeProfile} ref={this.select_profile} style={{ width: 250 }} className="form-control ">
                    {this.state.setting_profile.length > 0 && this.state.setting_profile.map((element, i) => {
                      return (<option key={i} value={element.value}>{element.text}</option>)
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <button style={{ marginLeft: 15, borderColor: '#1ab394' }} onClick={() => window.jQuery('#setting-modal').modal('show')} className="btn btn-default">เพิ่มบันทึกการตั้งค่า</button>
                </div>
                <div className="form-group">
                  <button style={{ marginLeft: 15, borderColor: 'red' }} onClick={this.deleteProfileSetting} className="btn btn-default">ลบการตั้งค่า</button>
                </div>
              </div>
            </div>
            <hr></hr>
          </div>
          <DataGrid
            id={'gridtable'}
            ref={this.datagrids}
            dataSource={this.props.mode == 'api' ? this.store : this.props.dataSource}
            showBorders={true}
            // remoteOperations={this.props.mode == 'api' ? 'true' : 'false'}
            remoteOperations={this.props.mode == 'api' ? this.props.remoteOperations ?? true : false}
            onToolbarPreparing={this.onToolbarPreparing}
            onSelectionChanged={typeof this.props.selectedCallback !== 'undefined' ? this.props.selectedCallback : null}
            stateStoring={{
              enabled: true,
              type: "custom",
              customLoad: () => {
                return this.loadState();
              }
            }}
            onRowRemoving={this.onRowDelete}
            onEditingStart={this.onEditingStart}
          >

            {this.props.column && this.props.column.map((element, i) => {
              return (<Column key={i} dataField={element.column_name} caption={element.column_caption} />)

            })}

            <Export enabled={true} fileName="Employees" allowExportSelectedData={true} />
            <Selection
              mode="multiple"
              selectAllMode={'allPages'}
              showCheckBoxesMode={'onClick'}
            />
            <HeaderFilter visible={true} />
            <ColumnChooser enabled={true} mode="select" />
            <SearchPanel
              visible={true}
              searchVisibleColumnsOnly={true}
            />
            <FilterRow visible={false} />
            {/* <Grouping autoExpandAll={false} /> */}
            <Grouping autoExpandAll={this.props.autoExpandAll || false} />
            <GroupPanel visible={true} />
            <Paging defaultPageSize={10} />
            <Pager
              showPageSizeSelector={true}
              allowedPageSizes={[10, 25, 50]}
            />
            {get(this.props.editing, 'enabled', false) &&
              <Editing
                mode={this.props.editing.mode || "window"}
                useIcons={this.props.editing.useIcons || "plus"}
                allowDeleting={this.props.editing.allowDeleting}
                allowUpdating={this.props.editing.allowUpdating}
              />
            }

            <Summary>
              <GroupItem
                column="Id"
                summaryType="count" />
            </Summary>
            <Template name="totalGroupCount" render={this.toolbarItemRender} />
          </DataGrid>
          <div id="setting-modal" className="modal fade" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">บันทึกการตั้งค่าตาราง</h4>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>ชื่อการตั้งค่า</label>
                    <input type="text" className="form-control" ref={this.modal_profile_name} id="settingName" placeholder="ชื่อการตั้งค่า" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={this.saveProfileSetting} >บันทึก</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TableOld;
