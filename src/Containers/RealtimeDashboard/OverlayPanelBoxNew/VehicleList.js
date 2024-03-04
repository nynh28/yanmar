import React, { Suspense } from "react";
import images from '../../../Themes/Images'
import DataGrid, {
  Column,
  Selection,
  Paging,
  Summary,
  GroupItem,
  Scrolling,
  Grouping,
  Pager
} from "devextreme-react/data-grid";
import { connect } from 'react-redux'
import GroupTemplate from "../GroupTemplate.js";
import InputSearch from "./InputSearch.js";
import { get, isEmpty, isEqual } from 'lodash'
import { t, rTT } from '../../../Components/Translation'
import RealtimeNewActions from '../../../Redux/RealtimeNewRedux'
import "../Styles/style-overlay-panel-realtime-new.css";
import { getStatusVehicle, getStatusCard, getIconStatusPath, getStatusName } from '../../../Functions/StatusColor'
import { calculateToDuration } from '../../../Functions/DateMoment'
import { numberWithComma } from '../../../Functions/Calculation'
import { FormLoading } from "../../../components_new";

const TOTALDATA = 500
const PAGE_SIZE_HIGH = 13
const PAGE_SIZE_SHORT = 8
// const TOTALDATA = 50000

const getKeys = function (data, keys, groupedColumnName, groupKey, keyFieldName) {
  let groupRow = data.find(i => { return i.key === groupKey; })
  if (groupRow) keys = groupRow.items.map(i => i['vid'])
  return keys;
};

const checkIfKeysAreSelected = function (currentKeys, selectedKeys) {
  let count = 0;

  if (selectedKeys.length === 0) return false;
  for (var i = 0; i < currentKeys.length; i++) {
    var keyValue = currentKeys[i];
    if (selectedKeys.indexOf(keyValue) > -1)
      // key is not selected
      count++;
  }
  if (count === 0) return false;
  if (currentKeys.length === count) return true;
  else return undefined;
}

class VehicleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupedData: [],
      keyExpr: "vid",
      listVehicles: [],
      pageSize: PAGE_SIZE_SHORT
    };
    this.displayVehicle = []
    this.firstLoad = false
    this.canClick = true
    this.handleResize = this.handleResize.bind(this);
  }

  componentWillMount() {
    let { displayVehicle, initialVehiclesData } = this.props
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    if (initialVehiclesData.length > 0) {
      this.initialVehiclesData = JSON.parse(JSON.stringify(initialVehiclesData)).map((items) => {
        let vehicleName = get(items, 'vehicle_name')
        if (vehicleName == "") vehicleName = get(items, 'licenseplate')
        if (vehicleName == "") vehicleName = get(items, 'vin_no')
        items.vehicleName = vehicleName

        return items
      })
      if (displayVehicle && displayVehicle.length > 0) {
        this.loadFirst = true
        this.displayVehicle = JSON.parse(JSON.stringify(displayVehicle))
      }
      if (displayVehicle === null) {
        let defaultDisplayVehicle
        if (TOTALDATA > initialVehiclesData.length) defaultDisplayVehicle = this.initialVehiclesData.map((item) => get(item, 'vid'))
        else defaultDisplayVehicle = []
        this.props.setStateReduxRealtime({ displayVehicle: defaultDisplayVehicle })
      }
      this.setState({ listVehicles: this.initialVehiclesData })
    }

  }

  handleResize() {
    if (window.innerHeight > 750 && this.state.pageSize !== PAGE_SIZE_HIGH) this.setState({ pageSize: PAGE_SIZE_HIGH })
    else if (window.innerHeight < 750 && this.state.pageSize !== PAGE_SIZE_SHORT) this.setState({ pageSize: PAGE_SIZE_SHORT })
  }

  shouldComponentUpdate(nextProps) {
    let { displayVehicle, information, initialVehiclesData, dataLogin } = this.props

    if (!isEqual(nextProps.information, information)) {
      this.selectR = undefined
    }
    if (!isEqual(nextProps.initialVehiclesData, initialVehiclesData)) {
      const listLevelUser = [21, 22, 31, 32]
      let check = false
      if (listLevelUser.includes(dataLogin.userLevelId)) check = true
      this.initialVehiclesData = JSON.parse(JSON.stringify(nextProps.initialVehiclesData)).map((items, i) => {
        items.vehicleName = get(items, 'vehicle_name') ? get(items, 'vehicle_name') + (check ? ' ' + get(items, 'vin_no') : '')
          : get(items, 'licenseplate') ? get(items, 'licenseplate') + (check ? ' ' + get(items, 'vin_no') : '')
            : get(items, 'vin_no')
        return items
      })
      if (displayVehicle === null) {
        let defaultDisplayVehicle
        if (TOTALDATA > nextProps.initialVehiclesData.length) defaultDisplayVehicle = this.initialVehiclesData.map((item) => get(item, 'vid'))
        else defaultDisplayVehicle = []
        this.props.setStateReduxRealtime({ displayVehicle: defaultDisplayVehicle })
      }
      this.setState({ listVehicles: this.initialVehiclesData })

      return false
    }
    if (!isEqual(nextProps.displayVehicle, displayVehicle)) {
      this.displayVehicle = JSON.parse(JSON.stringify(nextProps.displayVehicle))
      return true
    }
    return true
  }

  onRowClick = (e) => {
    if (e.rowType === "data" && e.data) {
      let eleSelectRow = e.element.querySelectorAll('.dx-selection-row')
      if (eleSelectRow.length > 0) eleSelectRow[0].classList.remove("dx-selection-row")
      e.rowElement.classList.add("dx-selection-row")

      this.selectR = e.key
      let { lat, lng } = e.data
      this.props.setValue("isLoadInfo", true)
      setTimeout(() => {
        this.props.getInformationMarker(e.key, 'List')
        this.props.setValue("isFocusPanTo", {
          visible: true,
          location: { lat, lng }
        })
      }, 200);
    }
  }

  async loadStream(vid) {
    let { dataLogin } = this.props
    // console.log(">> loadStream", dataLogin)
    var response = await fetch("https://3tirkucu7j.execute-api.ap-southeast-1.amazonaws.com/prod/prod/fleet/mdvr/realtime/" + vid + "?user_id=" + dataLogin.userId + "&stream=0&audio=true",
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

    var data = await response.json();

    // console.log("data : ", data)

    try {
      let _data = []
      for (let index in data.result.channel) {
        let dt = data.result.channel[index]
        _data.push({
          id: dt.channel,
          name: dt.label_name,
          url: dt.url
        })
      }

      this.props.setValue("listSteaming", _data)

    } catch {
      this.props.setValue("listSteaming", [])
    }

  }


  onRowPrepared = props => {
    let { key, rowElement } = props
    let { information } = this.props

    // if (rowElement.className.includes('dx-group-row')) this.onTest(rowElement)
    if (rowElement.className) this.onTest(rowElement)
    // if (this.selectR) {
    //   this.selectR = false
    // } else if (!isEmpty(information) && (key === get(information, 'info.vid'))) {
    //   rowElement.classList.add("dx-selection-row")
    // }
    if (!this.selectR && !isEmpty(information) && (key === get(information, 'info.vid'))) {
      rowElement.classList.add("dx-selection-row")
    } else if (this.selectR && key === this.selectR) {
      rowElement.classList.add("dx-selection-row")
    }
  }

  onTest = (ele) => {
    let table = document.querySelectorAll('table.dx-datagrid-table.dx-datagrid-table-fixed')
    // console.log('onTest', table)
    if (ele.className.includes('dx-group-row')) {
      let td = ele.querySelectorAll('td')
      if (td[0]) td[0].remove()
      if (td[1]) {
        td[1].setAttribute('colspan', 2)
        td[1].setAttribute('style', 'width:36px !important');
      }
    }
    else if (table.length === 0 && TOTALDATA > this.props.initialVehiclesData.length) {
      let td = ele.querySelectorAll('td')
      if (td[0]) {
        td[0].setAttribute('colspan', 2)
        td[0].style.width = "36px";
        td[0].style.paddingRight = "6px";
      }
      if (td[1]) td[1].remove()
    }
  }

  onSelectionChanged = args => {
    let keys = this.state.groupedData.slice()
    if (this.canClick) {
      this.props.setStateReduxRealtime({ displayVehicle: args.selectedRowKeys })
      this.canClick = false
      setTimeout(() => this.canClick = true, 200)
    }
    this.setState({
      groupedData: keys
    })

  }

  render() {
    let { vehiclesLoading, displayVehicle, initialVehiclesData, isLoadInfo } = this.props
    let { listVehicles, pageSize } = this.state
    // console.log("listVehicles : ", listVehicles)
    return (vehiclesLoading ?
      <div style={{ padding: '170px 5px' }}>
        <center><img src={images.loading} style={{ width: 50, height: 50 }}></img></center>
      </div>
      : <div className="table-realtime" style={{ backgroundColor: '#fff', padding: 5 }}>
        <InputSearch doSearch={(text) => { if (this.dataGrid) this.dataGrid.instance.searchByText(text) }} />
        <FormLoading loading={isLoadInfo} tip="">
          <DataGrid
            ref={(ref) => this.dataGrid = ref}
            dataSource={listVehicles || []}
            showBorders={true}
            // height={"calc(100vh - 144px)"}
            // allowColumnReordering={true}
            keyExpr={this.state.keyExpr}
            onSelectionChanged={this.onSelectionChanged}
            showColumnHeaders={false}
            hoverStateEnabled={true}
            onRowClick={this.onRowClick}
            onContentReady={this.onContentReady}
            selectedRowKeys={this.displayVehicle}
            onRowPrepared={(p) => this.onRowPrepared(p)}
          >
            {/* <Scrolling mode="virtual" /> */}
            <Grouping autoExpandAll={(initialVehiclesData.length < TOTALDATA)} />
            <Selection
              mode="multiple"
              selectAllMode={"allPages"}
              showCheckBoxesMode={'always'}
              allowSelectAll={true}
            />
            <Paging pageSize={pageSize} />
            {/* <Paging defaultPageSize={25} />
          <Pager
            showPageSizeSelector={true}
            allowedPageSizes={[10, 25, 50]}
            showInfo={true}
          /> */}
            <Column
              dataField="customer_name"
              width={0}
              groupIndex={0}
              allowSearch={false}
              groupCellRender={this.renderer}
            />
            <Column
              dataField="vehicleName"
              width={220}
              caption={""}
            />
            <Column
              dataField="customer_name"
              width={0}
              caption={""}
              visible={false}
            />
            <Column
              dataField="speed"
              allowSearch={false}
              cellRender={(e) => {
                let engine_hour = parseInt(get(e.data, 'engine_hour', 0))
                let hour = numberWithComma((engine_hour / 60).toFixed(1))
                let icon = getIconStatusPath(parseInt(get(e, 'data.status', 0)))
                return (
                  <div style={{ float: 'right' }}>
                    <span title={`ชั่วโมงการทำงาน ${hour} ${rTT(t("ecotree_22"))}`}>{hour} {t("ecotree_22")} </span>
                    <img style={{ height: '25px' }} src={icon} title={getStatusName(parseInt(get(e, 'data.status', 0)))} />
                  </div>
                )
              }}
            />
            <Summary>
              <GroupItem
                column={"customer_name"}
                summaryType="count"
                displayFormat={t("dg_count") + ': {0}'}
              />
            </Summary>
          </DataGrid>
        </FormLoading>
      </div>
    );
  }

  renderer = props => {
    let {
      column,
      value,
      component,
      data
    } = props;

    let keys = getKeys(this.state.groupedData, [], column.dataField, value, "vid")
    let checked = checkIfKeysAreSelected(keys, component.getSelectedRowKeys())
    let vl = this.props.initialVehiclesData.find((item) => get(item, 'customer_name') === value)
    let groupText = get(vl, 'customer_name')

    props = {
      checked: checked,
      groupText: groupText,
      onValueChanged: (args) => {
        this.onValueChanged(args, component, keys);
      },
      total: get(data, 'aggregates[0]'),
      textTotal: "realtime_8"
    }
    return <GroupTemplate {...props} />
  }

  onValueChanged = (args, grid, keys) => {
    if (!args.event) return;
    if (args.value) grid.selectRows(keys, true);
    else grid.deselectRows(keys);
  }

  onContentReady = args => {
    if (args.component.isNotFirstLoad && this.state.listVehicles.length === 0) return;
    args.component.isNotFirstLoad = true;
    let ds = args.component.getDataSource();
    ds.store()
      .load(ds.loadOptions())
      .done(r => {
        this.setState({
          groupedData: r
        })
      })
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  information: state.realtimeNew.information,
  displayVehicle: state.realtimeNew.displayVehicle,
  vehiclesLoading: state.realtimeNew.vehiclesLoading,
  initialVehiclesData: state.realtimeNew.initialVehiclesData,
  isLoadInfo: state.realtimeNew.isLoadInfo,
});
const mapDispatchToProps = (dispatch) => ({
  setActiveTab: (activeTab) => dispatch(RealtimeNewActions.setActiveTab(activeTab)),
  getInformationMarker: (vid, callFrom) => dispatch(RealtimeNewActions.getInformationMarker(vid, callFrom)),
  setZoomPan: (isZoomPan) => dispatch(RealtimeNewActions.setZoomPan(isZoomPan)),
  setStateReduxRealtime: (objStateRudux) => dispatch(RealtimeNewActions.setStateReduxRealtime(objStateRudux)),
  setValue: (name, value) => dispatch(RealtimeNewActions.setValue(name, value)),
  setFocus: (isFocus) => dispatch(RealtimeNewActions.setFocus(isFocus))

});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleList);
