import React, { Component } from "react";
import { connect } from "react-redux";
import DataGrid, {
  Column,
  Selection,
  Paging,
  Summary,
  GroupItem,
  SearchPanel,
} from "devextreme-react/data-grid";
import Searchbar from "../ControlRoomDashboard/Searchbar";
import { t } from "../../Components/Translation";
import "./Styles/style-overlay-panel-control-room.css";
import { get, isEmpty } from "lodash";
import ControlRoomDealerActions from "../../Redux/ControlRoomDealerRedux";
import { ENDPOINT_REALTIME_V2, YM_BASE_URL } from "../../Config/app-config";
// import { getStatusVehicle, getStatusCard } from '../../../../Functions/StatusColor'
import GroupTemplate from "./GroupTemplate.js";
import { Input } from "antd";

const getKeys = function (data, keys, groupKey, keyFieldName) {
  let groupRow = data.find((i) => {
    return i.key === groupKey;
  });
  if (groupRow) keys = groupRow.items.map((i) => i[keyFieldName]);
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
};

const TOTALDATA = 500;

class OverlayPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      alertSetting: {
        show: false,
        type: 2,
        content: "",
        validateCode: false,
      },
      groupedData: [],
      keyExpr: "vid",
      initialVehiclesDatas: [],
      pageSize: 10,
    };
    this.displayVehicle = [];
    this.firstLoad = false;
    this.canClick = true;
    this.handleResize = this.handleResize.bind(this);
  }

  modalOpening = () => {
    // console.log("!!!!!!!!!!")
    this.setState((state) => ({ isShow: !state.isShow }));
  };

  async getInformation(vid) {
    this.props.setVid(vid);
    let { dataLogin } = this.props;
    const response = await fetch(
      `${YM_BASE_URL}fleet/dlt/excavator/Infomation?vid=${vid}`,
      {
        // const response = await fetch(ENDPOINT_REALTIME + "fleet/GunicornInfomation?vid=" + vid + '&user_id=' + dataLogin.userId, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": dataLogin.language,
        },
        // body: JSON.stringify({

        // })
      }
    );
    const data = await response.json();
    this.props.setInformation(data);
  }

  componentWillMount() {
    let {
      displayVehicle,
      activeTabOverlay,
      information,
      isFocus,
      initialVehiclesDataSI,
    } = this.props;
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  handleResize() {
    if (window.innerHeight > 750 && this.state.pageSize !== 15)
      this.setState({ pageSize: 15 });
    else if (window.innerHeight < 750 && this.state.pageSize !== 10)
      this.setState({ pageSize: 10 });
  }

  onRowClick = (e) => {
    if (e.rowType === "data" && e.data) {
      let eleSelectRow = e.element.querySelectorAll(".dx-selection-row");
      if (eleSelectRow.length > 0)
        eleSelectRow[0].classList.remove("dx-selection-row");
      e.rowElement.classList.add("dx-selection-row");
      // this.eleSelect = e
      // console.log('e', e)
      // this.selectR = e.key
      // this.props.getInformationMarker(e.key, 'List')
      this.getInformation(e.key);
    }
  };

  onRowPrepared = (props) => {
    let { key, rowElement } = props;
    let { informationCR } = this.props;

    if (rowElement.className) this.onTest(rowElement);

    if (!isEmpty(informationCR) && key === get(informationCR, "info.vid")) {
      rowElement.classList.add("dx-selection-row");
    }
  };

  onTest = (ele) => {
    let table = document.querySelectorAll(
      "table.dx-datagrid-table.dx-datagrid-table-fixed"
    );
    if (ele.className.includes("dx-group-row")) {
      let td = ele.querySelectorAll("td");
      if (td[0]) td[0].remove();
      if (td[1]) {
        td[1].setAttribute("colspan", 2);
        td[1].setAttribute("style", "width:36px !important");
      }
    } else if (table.length === 0) {
      let td = ele.querySelectorAll("td");
      if (td[0]) {
        td[0].setAttribute("colspan", 2);
        td[0].style.width = "36px";
        td[0].style.paddingRight = "6px";
      }
      if (td[1]) td[1].remove();
    }
  };

  onSelectionChanged = (args) => {
    let keys = this.state.groupedData.slice();

    this.props.setStatesContorlRoomDealerRedux({
      displayVehicle: args.selectedRowKeys,
    });
    this.setState({
      groupedData: keys,
    });
  };
  doSearch(text) {
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      // Do the ajax stuff
      // console.log('text', text)
      this.props.doSearch(text);
    }, 500); // Will do the ajax stuff after 1000 ms, or 1 s
  }

  render() {
    let { isShow, pageSize } = this.state;
    let { initialVehiclesDataSI, displayVehicle } = this.props;

    return (
      <div className="box-overlay-panel-control-room">
        <div style={{ height: "100%", paddingTop: 0 /*165*/ }}>
          <div
            style={{
              height: 70,
              width: 25,
              cursor: "pointer",
              paddingTop: 25,
              boxShadow: "0 2px 6px rgba(0,0,0,.3)",
              backgroundColor: "white",
              borderRadius: "4px 0px 0px 4px",
            }}
            onClick={() => this.modalOpening()}
          >
            <center>
              <i
                className={
                  "fa " + (isShow ? "fa-chevron-left" : "fa-chevron-right")
                }
              ></i>
            </center>
          </div>
        </div>

        <div
          className="tabs-container detail-overlay-control-room"
          id={"overlay-panel-colaps"}
          style={{
            display: isShow ? "none" : "inline-block",
          }}
        >
          {isEmpty(initialVehiclesDataSI) ? (
            <div style={{ padding: "170px 5px" }}>
              <center>{t("control_room_19")}</center>
            </div>
          ) : (
            <div
              className="table-control-room"
              style={{ backgroundColor: "#fff", padding: 5 }}
            >
              <Searchbar
                doSearch={(text) => {
                  if (this.dataGrid) this.dataGrid.instance.searchByText(text);
                }}
              />

              <DataGrid
                ref={(ref) => (this.dataGrid = ref)}
                dataSource={[...initialVehiclesDataSI] || []}
                showBorders={true}
                keyExpr={this.state.keyExpr}
                onSelectionChanged={this.onSelectionChanged}
                showColumnHeaders={false}
                onRowClick={this.onRowClick}
                onContentReady={this.onContentReady}
                selectedRowKeys={displayVehicle}
                // selectedRowKeys={displayVehicle ? displayVehicle : []}
                // selectedRowKeys={displayVehicle ? [...displayVehicle] : []}
                onRowPrepared={(p) => this.onRowPrepared(p)}
              >
                {/* <Grouping autoExpandAll={(initialVehiclesDataSI.length < TOTALDATA)} /> */}
                {/* <SearchPanel
                    visible={true}
                    searchVisibleColumnsOnly={true}
                    width={440}
                    highlightSearchText={false}
                    placeholder={'Search...'} /> */}

                <Selection
                  mode="multiple"
                  selectAllMode={"allPages"}
                  showCheckBoxesMode={"always"}
                  allowSelectAll={true}
                />
                <Paging pageSize={pageSize} />

                <Column dataField="chassis_no" width={220} caption={""} />
                <Column
                  dataField="dealer_id"
                  width={0}
                  groupIndex={0}
                  allowSearch={false}
                  groupCellRender={(props) =>
                    this.renderer(props, "dealer_id", "dealer_name")
                  }
                />
                <Summary>
                  <GroupItem
                    column={"dealer_id"}
                    summaryType="count"
                    displayFormat={t("dg_count") + ": {0}"}
                  />
                </Summary>
              </DataGrid>
            </div>
          )}
        </div>
      </div>
    );
  }

  renderer = (props, id, name) => {
    let { column, value, component, data } = props;

    let groupText;
    let keys = getKeys(this.state.groupedData, column.dataField, value, "vid");
    let checked = checkIfKeysAreSelected(keys, component.getSelectedRowKeys());
    if (id === "dealer_id" && value === null) {
      groupText = "control_room_21";
    } else {
      let vl = this.props.initialVehiclesDataSI.find(
        (item) => get(item, id) === value
      );
      groupText = get(vl, name);
    }

    props = {
      checked: checked,
      groupText: groupText,
      onValueChanged: (args) => {
        this.onValueChanged(args, component, keys);
      },
      total: get(data, "aggregates[0]"),
      textTotal: "summary_95",
    };
    return <GroupTemplate {...props} />;
  };

  onValueChanged = (args, grid, keys) => {
    if (!args.event) return;
    if (args.value) grid.selectRows(keys, true);
    else grid.deselectRows(keys);
  };

  onContentReady = (args) => {
    if (
      args.component.isNotFirstLoad &&
      this.state.initialVehiclesDatas.length === 0
    )
      return;
    args.component.isNotFirstLoad = true;
    let ds = args.component.getDataSource();
    ds.store()
      .load(ds.loadOptions())
      .done((r) => {
        this.setState({
          groupedData: r,
        });
      });
  };
}

const mapStateToProps = (state) => ({
  initialVehiclesDataSI: state.controlroomdealer.initialVehiclesDataSI,
  dataLogin: state.signin.dataLogin,
  searchData: state.controlroomdealer.searchData,
  informationCR: state.controlroomdealer.informationCR,
  displayVehicle: state.controlroomdealer.displayVehicle,
  select: state.controlroomdealer.select,
});

const mapDispatchToProps = (dispatch) => ({
  setInformation: (information) =>
    dispatch(ControlRoomDealerActions.setInformation(information)),
  setinitialVehiclesData: (information) =>
    dispatch(ControlRoomDealerActions.setinitialVehiclesData(information)),
  setStatesContorlRoomDealerRedux: (obj) =>
    dispatch(ControlRoomDealerActions.setStatesContorlRoomDealerRedux(obj)),
  setVid: (vid) => dispatch(ControlRoomDealerActions.setVid(vid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverlayPanel);
