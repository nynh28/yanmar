import React, { Suspense } from "react";
import images from '../../../Themes/Images'
import DataGrid, {
  Column,
  Selection,
  Paging,
  Summary,
  GroupItem,
  SearchPanel,
  Grouping
} from "devextreme-react/data-grid";
import { connect } from 'react-redux'
import GroupTemplate from "../GroupTemplate.js";
import InputSearch from "./InputSearch.js";
import { get, isEmpty, isEqual } from 'lodash'
import { t } from '../../../Components/Translation'
import RealtimeNewActions from '../../../Redux/RealtimeNewRedux'
import "../Styles/style-overlay-panel-realtime-new.css";
import { getStatusVehicle, getStatusCard } from '../../../Functions/StatusColor'

const TOTALDATA = 500
const PAGE_SIZE_HIGH = 13
const PAGE_SIZE_SHORT = 8
// const TOTALDATA = 50000

const getKeys = function (data, keys, groupedColumnName, groupKey, keyFieldName) {
  let groupRow = data.find(i => { return i.key === groupKey; })
  if (groupRow) keys = groupRow.items.map(i => i['info']['vid'])
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

class DriverList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupedData: [],
      keyExpr: "info.vid",
      listVehicles: [],
      pageSize: PAGE_SIZE_SHORT
    }
    this.displayVehicle = []
    this.loadFirst = false
    this.canClick = true
    this.handleResize = this.handleResize.bind(this);
  }

  componentWillMount() {
    let { displayVehicle, initialVehiclesData } = this.props
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    if (initialVehiclesData.length > 0) {
      this.initialVehiclesData = JSON.parse(JSON.stringify(initialVehiclesData))
        .filter((items) => items.driver_cards.status_swipe_card !== 0)
        .map((items) => {
          items.driver_cards.driverName = get(items, 'driver_cards.name') ?
            get(items, 'driver_cards.name') : get(items, 'driver_cards.card_id')
          return items
        })

      if (displayVehicle && displayVehicle.length > 0) {
        this.loadFirst = true
        this.displayVehicle = JSON.parse(JSON.stringify(displayVehicle))
      }
      if (displayVehicle === null) {
        let displayVehicle
        if (TOTALDATA > initialVehiclesData.length) displayVehicle = initialVehiclesData.map((item) => get(item, 'info.vid'))
        else displayVehicle = []
        this.props.setStateReduxRealtime({ displayVehicle: displayVehicle })
      }
      this.setState({ listVehicles: this.initialVehiclesData })
    }

  }

  handleResize() {
    if (window.innerHeight > 750 && this.state.pageSize !== PAGE_SIZE_HIGH) this.setState({ pageSize: PAGE_SIZE_HIGH })
    else if (window.innerHeight < 750 && this.state.pageSize !== PAGE_SIZE_SHORT) this.setState({ pageSize: PAGE_SIZE_SHORT })
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { displayVehicle, activeTabOverlay, information, isFocus, initialVehiclesData } = this.props
    let { switchTab } = this.state

    if (!isEqual(nextProps.information, information)) {
      this.selectR = undefined
    }
    if (!isEqual(nextProps.initialVehiclesData, initialVehiclesData)) {
      let oldLength = this.initialVehiclesData ? this.initialVehiclesData.length : null
      this.initialVehiclesData = JSON.parse(JSON.stringify(nextProps.initialVehiclesData))
        .filter((items) => items.driver_cards.status_swipe_card !== 0)
        .map((items) => {
          items.driver_cards.driverName = get(items, 'driver_cards.name') ?
            get(items, 'driver_cards.name') : get(items, 'driver_cards.card_id')
          return items
        })
      if (oldLength > this.initialVehiclesData.length) {
        this.loadFirst = true
      }
      // console.log('displayVehicle', displayVehicle)
      if (displayVehicle === null) {
        let displayVehicle
        if (TOTALDATA > nextProps.initialVehiclesData.length) displayVehicle = nextProps.initialVehiclesData.map((item) => get(item, 'info.vid'))
        else displayVehicle = []
        this.displayVehicle = JSON.parse(JSON.stringify(displayVehicle))
        this.loadFirst = true
        this.props.setStateReduxRealtime({ displayVehicle: displayVehicle })
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
      // this.selectR = true
      this.selectR = e.key
      // this.props.getInformationMarker(e.key, 'List')

      this.props.setValue("isLoadInfo", true)
      setTimeout(() => {
        this.props.getInformationMarker(e.key, 'List')
      }, 200);
      // this.props.setZoomPan(true)
    }
  }

  onRowPrepared = props => {
    let { key, rowElement } = props
    let { information } = this.props
    // console.log('onRowPrepared', this.selectR)
    if (rowElement.className) this.onTest(rowElement)
    // if (this.selectR) {
    //   this.selectR = false
    // } else if (!isEmpty(information) && (key === get(information, 'info.vid'))) {
    //   // console.log(' ---------- onRowPrepared ---------- ')
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

    if (ele.className.includes('dx-group-row')) {
      let td = ele.querySelectorAll('td')
      if (td[0]) td[0].remove()
      if (td[1]) {
        td[1].setAttribute('colspan', 2)
        td[1].setAttribute('style', 'width:36px !important');
      }
    }
    else if (table.length === 0) {
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
    // console.log('onSelectionChanged', this.loadFirst, this.displayVehicle)
    if (this.loadFirst) {
      this.loadFirst = false
    } else {
      let keys = this.state.groupedData.slice();
      if (this.canClick) {
        if (args.currentSelectedRowKeys.length > 0) {
          this.displayVehicle.push(...args.currentSelectedRowKeys)
        }
        if (args.currentDeselectedRowKeys.length > 0) {
          this.displayVehicle = this.displayVehicle.filter((item) => !args.currentDeselectedRowKeys.includes(item))
        }
        // console.log('displayVehicle', this.displayVehicle)
        this.props.setStateReduxRealtime({ displayVehicle: this.displayVehicle })
        this.canClick = false
        setTimeout(() => this.canClick = true, 200)
      }
      this.setState({
        groupedData: keys
      })
    }

  }

  render() {
    let { vehiclesLoading, initialVehiclesData } = this.props
    let { listVehicles, pageSize } = this.state
    // console.log('pageSize', pageSize)
    return (vehiclesLoading ?
      <div style={{ padding: '170px 5px' }}>
        <center><img src={images.loading} style={{ width: 50, height: 50 }}></img></center>
      </div>
      : <div className="table-realtime" style={{ backgroundColor: '#fff', padding: 5 }}>
        <InputSearch doSearch={(text) => { if (this.dataGrid) this.dataGrid.instance.searchByText(text) }} />
        <DataGrid
          ref={(ref) => this.dataGrid = ref}
          dataSource={listVehicles || []}
          showBorders={true}
          keyExpr={this.state.keyExpr}
          onSelectionChanged={this.onSelectionChanged}
          showColumnHeaders={false}
          onRowClick={this.onRowClick}
          onContentReady={this.onContentReady}
          selectedRowKeys={this.displayVehicle}
          onRowPrepared={(p) => this.onRowPrepared(p)}
        >
          {/* <SearchPanel
            visible={true}
            searchVisibleColumnsOnly={true}
            width={440}
            // highlightSearchText={false}
            placeholder={'Search...'} /> */}
          <Grouping autoExpandAll={(initialVehiclesData.length < TOTALDATA)} />
          <Selection
            mode="multiple"
            selectAllMode={"allPages"}
            showCheckBoxesMode={'always'}
            allowSelectAll={true}
          />
          <Paging pageSize={pageSize} />

          <Column
            dataField="fleet.fleet_id"
            width={0}
            groupIndex={0}
            allowSearch={false}
            groupCellRender={this.renderer}
          />
          <Column
            dataField="driver_cards.driverName"
            width={220}
          />
          <Column
            dataField="driver_cards.status_swipe_card"
            width={60}
            allowSearch={false}
            cellRender={(e) => {
              let colorStatus = getStatusCard(get(e, 'value')).code
              let colorVideo = getStatusCard(Math.round(Math.random())).code
              // e.data
              return [
                <i key={2} className="demo-icon icon-credit-card" style={{
                  fontSize: 16,
                  float: 'right',
                  color: colorStatus
                }}></i>,
                false && <i className="fas fa-video" style={{
                  // e.rowIndex % 4 == 0 && <i className="fas fa-video" style={{
                  fontSize: 14,
                  float: 'right',
                  color: colorVideo,
                  paddingTop: 1,
                  paddingRight: 2
                }}></i>
              ]
            }}
          />
          <Column
            dataField="gps.speed"
            allowSearch={false}
            cellRender={(e) => {
              let colorStatus = getStatusVehicle(get(e, 'data.gps.image.status')).code
              return (
                <div style={{ float: 'right' }}>
                  <span>{get(e, 'value')}</span>{' '}{t('realtime_41')}
                  <i className="fa fa-circle" style={{ color: colorStatus, marginLeft: 5 }} />
                </div>
              )
            }}
          />
          <Summary>
            <GroupItem
              column={"fleet.fleet_id"}
              summaryType="count"
              displayFormat={t("dg_count") + ': {0}'}
            />
          </Summary>
        </DataGrid>
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
    let keys = getKeys(this.state.groupedData, [], column.dataField, value, "info.vid");
    let checked = checkIfKeysAreSelected(keys, component.getSelectedRowKeys());
    let vl = this.props.initialVehiclesData.find((item) => get(item, 'fleet.fleet_id') === value)
    let groupText = get(vl, 'fleet.fleet_name')

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
  information: state.realtimeNew.information,
  isFocus: state.realtimeNew.isFocus,
  displayVehicle: state.realtimeNew.displayVehicle,
  vehiclesLoading: state.realtimeNew.vehiclesLoading,
  initialVehiclesData: state.realtimeNew.initialVehiclesData,
});
const mapDispatchToProps = (dispatch) => ({
  setActiveTab: (activeTab) => dispatch(RealtimeNewActions.setActiveTab(activeTab)),
  getInformationMarker: (vid, callFrom) => dispatch(RealtimeNewActions.getInformationMarker(vid, callFrom)),
  setZoomPan: (isZoomPan) => dispatch(RealtimeNewActions.setZoomPan(isZoomPan)),
  setStateReduxRealtime: (objStateRudux) => dispatch(RealtimeNewActions.setStateReduxRealtime(objStateRudux)),

});

export default connect(mapStateToProps, mapDispatchToProps)(DriverList);
