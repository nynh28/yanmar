// import React from 'react';
import React, { Suspense } from 'react'
import 'devextreme/data/odata/store';
import DataGrid, {
  Column, Selection, Export, ColumnChooser, SearchPanel, Editing, Paging, StateStoring,
  Pager, Grouping, GroupPanel, Summary, GroupItem, FilterRow, HeaderFilter, TotalItem, ColumnFixing
} from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import { Template } from 'devextreme-react/core/template';
import 'whatwg-fetch';
import Swal from 'sweetalert2'
import { get } from 'lodash'
// var { get } = require('lodash');
// import './Table.css'
import { ENDPOINT_SETTING_BASE_URL } from '../../Config/app-config';
import { useTranslation } from 'react-i18next'
import { t } from '../Translation'
import { Button } from 'devextreme-react/autocomplete';
function isNotEmpty(value) {
  return !!value;
}

let zoomTableLevel = 1

const DataGridTrans = (arg) => {
  const { t } = useTranslation()

  return (

    <DataGrid
      id={'gridtable'}
      ref={arg.datagrids}
      dataSource={arg.mode == 'api' ? arg.store : arg.dataSource}
      showBorders={true}
      remoteOperations={arg.mode == 'api' ? "true" : false}
      onSelectionChanged={typeof arg.selectedCallback !== 'undefined' ? arg.selectedCallback : null}
      onToolbarPreparing={arg.onToolbarPreparing}
      columnAutoWidth={true}
      columnMinWidth={100}
      columnResizingMode={"widget"}
      allowColumnReordering={true}

      // stateStoring={{
      //   enabled: true,
      //   type: "custom",
      //   customLoad: () => {
      //     return arg.loadState;
      //   }
      // }}
      onRowRemoving={arg.onRowDelete}
      onEditingStart={arg.onEditingStart}
      ColumnFixing={true}
      calculateCellValue={arg.column_name}
    >
      {
        get(arg.editing, 'enabled', false) &&
        <Column fixed={true} type="buttons" caption="Detail" >
          <Button
            icon="file"
            text={'Deatail'}
            onClick={arg.onEditingStart}>
          </Button>
        </Column>
      }


      {arg.column && arg.column.map((element, index) => {
        if (element.column_name == "total_time") {

          return (
            <Column key={index} dataField={element.column_name} caption={t(element.column_caption)}
              cellRender={element.column_render} fixed={element.fixed} fixedPosition={"right"} alignment={"right"} calculateCellValue={arg.calculateCellValue} />
          )
        }
        if (element.column_name == "total_distance") {
          return (
            <Column key={index} dataField={element.column_name} caption={t(element.column_caption)}
              cellRender={element.column_render} fixed={element.fixed} fixedPosition={"right"} alignment={"right"} calculateCellValue={element.calculateCellValue} />
          )
        }
        return (
          <Column key={index} dataField={element.column_name} caption={t(element.column_caption)}
            cellRender={element.column_render} fixed={element.fixed} fixedPosition={"right"} alignment={"right"} calculateCellValue={element.calculateCellValue} />
        )

      })}

      <StateStoring enabled={arg.loadStore} type="custom" customLoad={() => arg.loadState} />
      <Export enabled={true} fileName="Employees" allowExportSelectedData={true} />
      <Selection
        mode="multiple"
        selectAllMode={'allPages'}
        showCheckBoxesMode={'onClick'}
      />
      <HeaderFilter visible={true} />
      {/* <ColumnChooser enabled={true} mode="select" title={t("dg_column_chooser")} > */}
      <ColumnFixing enabled={true}></ColumnFixing>
      {/* <ColumnChooser enabled={false} mode="select" title={t("dg_select_item")} >
        {arg.column && arg.column.map((element, index) => {
          return (
            <Column key={index} dataField={element.column_name} caption={t(element.column_caption)} />
          )
        })}
      </ColumnChooser> */}
      <SearchPanel
        visible={arg.searchPanel}
        searchVisibleColumnsOnly={true}
        placeholder={t("dg_search")}
      />
      <FilterRow visible={false} />
      <Grouping autoExpandAll={arg.autoExpandAll || false} />
      <GroupPanel emptyPanelText={t("dg_drang_coumn")} visible={true} />
      <Paging defaultPageSize={10} />
      <Pager
        showPageSizeSelector={true}
        allowedPageSizes={[10, 25, 50]}
      />
      {get(arg.editing, 'enabled', false) &&
        <Editing
          mode={arg.editing.mode || "window"}
          useIcons={arg.editing.useIcons || "plus"}
          // allowDeleting={arg.editing.allowDeleting}
          // allowUpdating={arg.editing.allowUpdating}
          allowUpdating={arg.editing.allowUpdating}
          allowDeleting={arg.editing.allowDeleting}
        />
      }
      {
        arg.customButton && <Column fixed={true} caption={arg.captionCustomButton} type="buttons" width={110}
          buttons={[arg.customButton]} />
      }

      <Summary>
        <TotalItem
          column="id"
          summaryType="count"
          displayFormat={t("dg_count") + ': {0}'}
        />
        <GroupItem
          column="id"
          summaryType="count"
          displayFormat={t("dg_count") + ': {0}'}
        />
      </Summary>
      <Template name="totalGroupCount" render={arg.toolbarItemRender} />
    </DataGrid>
  )
}

function cellRender(cellData) {

  if (cellData.value != undefined) {
    return <img src={cellData.text} height="42" width="42" />
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.datagrids = React.createRef();
    this.selectedRowsData = [];
    this.store = new CustomStore({
      key: this.props.tableKey && this.props.tableKey !== undefined ? this.props.tableKey : 'id',
      // key: "id",
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



        //#region CASE : HAVE PARAMETER
        let parm = this.props.serversideSource.split('?').pop();
        let targetHost = this.props.serversideSource.split('?')[0]
        let queryUrl = `${this.props.serversideSource}${params}`

        if (parm !== targetHost) {
          queryUrl = targetHost + params + "?" + parm
        }
        //#endregion

        // return fetch(`${this.props.serversideSource}${params}`, {
        return fetch(queryUrl, {
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
      error: "",
      setting_profile: [],
      setting_selected: "",
      update: 0

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
    this.allowDeleting = this.allowDeleting.bind(this);
    this.allowUpdating = this.allowUpdating.bind(this);
    this.calculateCellValue = this.calculateCellValue.bind(this);
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.value) {
        var array_value = this.select_profile.current.value.split("|");
        var table_id = array_value[0]
        var user_id = this.state.user_id
        var owner_user_id = array_value[1]
        var profile_name = array_value[2]
        var is_default = array_value[3]
        if (is_default == 1) {
          Swal.fire('Fail', 'Fail to delete. Default profile can\'t delete from system', 'error')
          return;
        }
        var object = {
          table_id: table_id,
          user_id: user_id,
          profile_name: profile_name
        }
        var response = await fetch(ENDPOINT_SETTING_BASE_URL + 'delete/setting', {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Accept": "text/html",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(object) // body data type must match "Content-Type" header
        });
        var responseJson = await response.json();
        if (responseJson.result == true) {
          Swal.fire('Success', 'Success to Delete Preset', 'success')
          this.load_setting_profile()
          return;
        }
        Swal.fire('Fail', 'Fail to Delete Preset please contact administrator', 'error')
        return;
      }
    })

  }

  async saveProfileSetting() {
    var profile_name = this.modal_profile_name.current.value;
    if (profile_name == "") {
      Swal.fire('Fail', 'Setting name is require', 'error')
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
    var response = await fetch(ENDPOINT_SETTING_BASE_URL + 'save/setting', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Accept": "text/html",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object) // body data type must match "Content-Type" header
    });
    var responseJson = await response.json();
    if (responseJson.result == true) {
      Swal.fire('Success', 'Success to save setting', 'success')
      this.load_setting_profile(true)
      return;
    }
    Swal.fire('Fail', 'Fail to save setting', 'error')
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
    //var response = await fetch(ENDPOINT_SETTING_BASE_URL+'load/setting', {
    var response = await fetch(ENDPOINT_SETTING_BASE_URL + 'load/setting', {
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
        if (forceselected == true) {
          this.setState({
            setting_selected: setting[setting.length - 1].value
          }, () => {

            this.changeProfile()
          })
        }
      })
    } else {
      this.setState({
        setting_profile: [],
        ready: 1
      })
    }
  }

  async changeProfile() {

    this.setState({
      setting_selected: this.select_profile.current.value,
    }, () => {

      setTimeout((() => {
        this.setState({
          update: this.state.update + 1
        })
      }), 1000);

    })
  }

  async loadState() {
    if (this.state.table_id == 0 || this.state.user_id == 0 || this.state.setting_selected.split("|")[0] == "") {
      return {}
    }
    var array_value = this.state.setting_selected.split("|");
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

    var response = await fetch(ENDPOINT_SETTING_BASE_URL + 'load/state', {
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
        showText: 'always',
        options: {
          fontsize: 11,
          height: 37,
          text: 'Select Items',
          onClick: function () {
            e.component.showColumnChooser();
          }
        }
      },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'fontsize',
          onClick: this.zoomDataGrid.bind(this)
        }
      }
    );

    //e.toolbarOptions.items.find(i=>i.name="columnChooserButton").options.icon = "find"
    // e.toolbarOptions.items.find(i=>i.name="columnChooserButton").showText = 'always'
  }

  allowDeleting(e) {
    return get(e, 'row.data.canDelete', true)
  }

  allowUpdating(e) {
    return get(e, 'row.data.canEdit', true)
  }

  zoomDataGrid() {
    // let level = this.state.zoomTableLevel
    // if (level === undefined) level = 1
    switch (zoomTableLevel) {
      case 1:
        zoomTableLevel = 2
        document.getElementById('gridtable').style.zoom = 1.3
        break;
      case 2:
        zoomTableLevel = 3
        document.getElementById('gridtable').style.zoom = 1.6
        break;
      default:
        zoomTableLevel = 1
        document.getElementById('gridtable').style.zoom = 1
        break;
    }
    // this.setState({ zoomTableLevel: level })
  }


  onEditingStart(e) {
    e.cancel = "true"
    this.props.editCallback(e)
  }

  calculateCellValue(e) {
    var num = e.total_time;
    var hours = (num / 60) / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return [rhours + " h " + rminutes + " m"];
  }

  onRowDelete(e) {
    e.cancel = "true";
    this.props.deleteCallback(e)
  }

  render() {
    if (this.state.ready == 0) {
      return (<div>{this.state.error}</div>)
    }
    let searchPanel = true
    if (this.props.searchPanel !== undefined) { searchPanel = this.props.searchPanel }

    return (
      <Suspense fallback={null}>
        <div className="row">
          <div className="col-md-12">
            <div style={this.state.setting_profile.length == 0 ? { display: 'none' } : {}} className="row">


              <div className="col-lg-12 text-left">
                {/* {!this.props.showHeaderLing && this.props.showHeaderLing != undefined ? "" : <hr></hr>} */}

                {
                  (this.props.showSetting || this.props.showSetting === undefined) &&
                  <div className="form-inline float-right" style={{ marginBottom: 15 }}>
                    <div className="form-group">
                      <select onChange={this.changeProfile} value={this.state.setting_selected} ref={this.select_profile} style={{ width: 250 }} className="form-control ">
                        {this.state.setting_profile.length > 0 && this.state.setting_profile.map((element, i) => {
                          return (<option key={i} value={element.value}>{element.text}</option>)
                        })}
                      </select>
                    </div>

                    <div className="form-group">
                      <button style={{ marginLeft: 15, width: 150 }} onClick={() => window.jQuery('#setting-modal').modal('show')} className="btn btn-success">{t("dg_add_setting")} </button>
                    </div>

                    <div className="form-group">
                      <button style={{ marginLeft: 15, width: 150 }} onClick={this.deleteProfileSetting} className="btn btn-danger">{t("dg_delete_setting")}</button>
                    </div>
                  </div>
                }
              </div>

            </div>

            <DataGridTrans
              dataSource={this.props.dataSource}
              datagrids={this.datagrids}
              mode={this.props.mode}
              store={this.store}
              loadStore={this.props.loadStore != undefined || this.props.loadStore != null ? this.props.loadStore : true}
              customButton={this.props.customButton}
              captionCustomButton={this.props.captionCustomButton}
              onToolbarPreparing={this.onToolbarPreparing}
              selectedCallback={this.props.selectedCallback}
              loadState={this.loadState()}
              onRowDelete={this.onRowDelete}
              onEditingStart={this.onEditingStart}
              column={this.props.column}
              searchPanel={searchPanel}
              autoExpandAll={this.props.autoExpandAll}
              editing={this.props.editing}
              toolbarItemRender={this.toolbarItemRender}
              allowUpdating={this.allowUpdating}
              allowDeleting={this.allowDeleting}
              calculateCellValue={this.calculateCellValue}
            />


            {/* <DataGrid
            id={'gridtable'}
            ref={this.datagrids}
            dataSource={this.props.mode == 'api' ? this.store : this.props.dataSource}
            showBorders={true}
            remoteOperations={this.props.mode == 'api' ? "true" : false}
            onToolbarPreparing={this.onToolbarPreparing}
            columnAutoWidth={true}
            columnMinWidth={100}
            columnResizingMode={"widget"}
            allowColumnReordering={true}
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

            {this.props.column && this.props.column.map((element, index) => {
              return (
                <Column key={index} dataField={element.column_name} caption={element.column_caption} cellRender={element.column_render === true && cellRender} />
              )
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
              visible={searchPanel}
              searchVisibleColumnsOnly={true}
            />
            <FilterRow visible={false} />
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
              <TotalItem
                column="id"
                summaryType="count" />
              <GroupItem
                column="id"
                summaryType="count" />
            </Summary>
            <Template name="totalGroupCount" render={this.toolbarItemRender} />
          </DataGrid> */}
            {/* <button onClick={() => { console.log(JSON.stringify(this.datagrids.current.instance.state())) }}>state</button> */}

            <div id="setting-modal" className="modal fade" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Add Preset</h4>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Setting Name</label>
                      <input type="text" className="form-control" ref={this.modal_profile_name} id="settingName" placeholder="Setting Name" />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={this.saveProfileSetting} >Submit</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Suspense>
    );
  }
}

export default Table;
