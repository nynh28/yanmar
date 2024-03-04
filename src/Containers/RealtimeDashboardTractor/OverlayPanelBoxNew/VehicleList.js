import React, { Suspense } from "react";
import images from "../../../Themes/Images";
import DataGrid, {
    Column,
    Selection,
    Paging,
    Summary,
    GroupItem,
    Scrolling,
    Grouping,
    Pager,
} from "devextreme-react/data-grid";
import { connect } from "react-redux";
import GroupTemplate from "../GroupTemplate.js";
import InputSearch from "./InputSearch.js";
import { get, isEmpty, isEqual } from "lodash";
import { t, rTT } from "../../../Components/Translation";
import RealtimeNewActions from "../../../Redux/RealtimeNewRedux";
import "../Styles/style-overlay-panel-realtime-new.css";
import {
    getStatusVehicle,
    getStatusCard,
    getIconStatusPath,
    getStatusName,
    getIconStatusPathTractor,
} from "../../../Functions/StatusColor";
import { calculateToDuration } from "../../../Functions/DateMoment";
import { numberWithComma } from "../../../Functions/Calculation";
import { FormLoading } from "../../../components_new";
import { UpOutlined } from "@ant-design/icons";
import { FilterNoneRounded } from "@material-ui/icons";
import { YM_BASE_URL, adminRoleId } from "../../../Config/app-config";
import { CheckBox } from "devextreme-react";
import { Input } from "antd";
import AutocompleteSearch from "../../../components_new/Async/AutocompleteSearch";

const TOTALDATA = 500;
const PAGE_SIZE_HIGH = 11;
const PAGE_SIZE_SHORT = 8;
// const TOTALDATA = 50000

const getKeys = function (
    data,
    keys,
    groupedColumnName,
    groupKey,
    keyFieldName
) {
    let groupRow = data.find((i) => {
        return i.key === groupKey;
    });
    if (groupRow) keys = groupRow.items.map((i) => i["vid"]);
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

class VehicleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupedData: [],
            keyExpr: "vid",
            listVehicles: [],
            pageSize: PAGE_SIZE_SHORT,
            showFilter: false,
            filter: {
                vin_no: '',
                model: '',
                dealer_name: '',
            }
        };
        this.displayVehicle = [];
        this.firstLoad = false;
        this.canClick = true;
        this.handleResize = this.handleResize.bind(this);
    }

    componentWillMount() {
        let { displayVehicle, initialVehiclesData, filter } = this.props;
        this.handleResize();
        window.addEventListener("resize", this.handleResize);
        if (initialVehiclesData.length > 0) {
            this.initialVehiclesData = JSON.parse(
                JSON.stringify(initialVehiclesData)
            ).map((items) => {
                let vehicleName = get(items, "vehicle_name");
                if (vehicleName == "") vehicleName = get(items, "vin_no");
                if (vehicleName == "") vehicleName = get(items, "licenseplate");
                items.vehicleName = vehicleName;

                return items;
            });
            if (displayVehicle && displayVehicle.length > 0) {
                this.loadFirst = true;
                this.displayVehicle = JSON.parse(JSON.stringify(displayVehicle));
            }
            if (displayVehicle === null) {
                let defaultDisplayVehicle;
                if (TOTALDATA > initialVehiclesData.length)
                    defaultDisplayVehicle = this.initialVehiclesData.map((item) =>
                        get(item, "vid")
                    );
                else defaultDisplayVehicle = [];
                this.props.setStateReduxRealtime({
                    displayVehicle: defaultDisplayVehicle,
                });
            }

            this.setState({ listVehicles: this.initialVehiclesData });
            this.setState({ filter: filter });
        }
    }

    handleResize() {
        if (window.innerHeight > 750 && this.state.pageSize !== PAGE_SIZE_HIGH)
            this.setState({ pageSize: PAGE_SIZE_HIGH });
        else if (
            window.innerHeight < 750 &&
            this.state.pageSize !== PAGE_SIZE_SHORT
        )
            this.setState({ pageSize: PAGE_SIZE_SHORT });
    }

    shouldComponentUpdate(nextProps) {
        let { displayVehicle, information, initialVehiclesData, dataLogin } =
            this.props;

        if (!isEqual(nextProps.information, information)) {
            this.selectR = undefined;
        }
        if (!isEqual(nextProps.initialVehiclesData, initialVehiclesData)) {
            const listLevelUser = [21, 22, 31, 32];
            let check = false;
            if (listLevelUser.includes(dataLogin.userLevelId)) check = true;
            this.initialVehiclesData = JSON.parse(
                JSON.stringify(nextProps.initialVehiclesData)
            ).map((items, i) => {
                items.vehicleName = get(items, "vehicle_name")
                    ? get(items, "vehicle_name") +
                    (check ? " " + get(items, "vin_no") : "")
                    : get(items, "licenseplate")
                        ? get(items, "licenseplate") +
                        (check ? " " + get(items, "vin_no") : "")
                        : get(items, "vin_no");
                return items;
            });
            if (displayVehicle === null) {
                let defaultDisplayVehicle;
                if (TOTALDATA > nextProps.initialVehiclesData.length)
                    defaultDisplayVehicle = this.initialVehiclesData.map((item) =>
                        get(item, "vid")
                    );
                else defaultDisplayVehicle = [];
                this.props.setStateReduxRealtime({
                    displayVehicle: defaultDisplayVehicle,
                });
            }
            this.setState({ listVehicles: this.initialVehiclesData });

            return false;
        }
        if (!isEqual(nextProps.displayVehicle, displayVehicle)) {
            this.displayVehicle = JSON.parse(
                JSON.stringify(nextProps.displayVehicle)
            );
            return true;
        }
        return true;
    }

    onRowClick = (e) => {
        if (e.rowType === "data" && e.data) {
            let eleSelectRow = e.element.querySelectorAll(".dx-selection-row");
            if (eleSelectRow.length > 0)
                eleSelectRow[0].classList.remove("dx-selection-row");
            e.rowElement.classList.add("dx-selection-row");

            this.selectR = e.key;
            let { lat, lng } = e.data;
            this.props.setValue("isLoadInfo", true);
            setTimeout(() => {
                this.props.getInformationMarker(e.key, "List");
                this.props.setValue("isFocusPanTo", {
                    visible: true,
                    location: { lat, lng },
                });
            }, 200);
        }
    };

    async loadStream(vid) {
        let { dataLogin } = this.props;
        // console.log(">> loadStream", dataLogin)
        var response = await fetch(
            "https://3tirkucu7j.execute-api.ap-southeast-1.amazonaws.com/prod/prod/fleet/mdvr/realtime/" +
            vid +
            "?user_id=" +
            dataLogin.userId +
            "&stream=0&audio=true",
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        var data = await response.json();

        // console.log("data : ", data)

        try {
            let _data = [];
            for (let index in data.result.channel) {
                let dt = data.result.channel[index];
                _data.push({
                    id: dt.channel,
                    name: dt.label_name,
                    url: dt.url,
                });
            }

            this.props.setValue("listSteaming", _data);
        } catch {
            this.props.setValue("listSteaming", []);
        }
    }

    async  fetchDealerList(username, data) {
        if(username){
          return await fetch(
              `${YM_BASE_URL}fleet/setting/Dealer?dealer_name=${username}&limit=20`,
              // `${ENDPOINT_BASE_URL}ServiceContract/Yanmar/DropdownGroup?name=Seller`,
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "x-api-key": data.redis_key,
                  "Accept-Language": 'th',
                },
              }
            ).then((response) => response.json())
            .then((body) => {
              if(body?.code == 200){
                  return (body?.result?.dealer_list || []).map(dealer => ({
                      label: dealer.dealer_name,
                      value: dealer.dealer_name,
                  }))
              }
              return []
            }
            )
        }
        return []
      }


    onRowPrepared = (props) => {
        let { key, rowElement } = props;
        let { information } = this.props;

        // if (rowElement.className.includes('dx-group-row')) this.onTest(rowElement)
        if (rowElement.className) this.onTest(rowElement);
        // if (this.selectR) {
        //   this.selectR = false
        // } else if (!isEmpty(information) && (key === get(information, 'info.vid'))) {
        //   rowElement.classList.add("dx-selection-row")
        // }
        if (
            !this.selectR &&
            !isEmpty(information) &&
            key === get(information, "info.vid")
        ) {
            rowElement.classList.add("dx-selection-row");
        } else if (this.selectR && key === this.selectR) {
            rowElement.classList.add("dx-selection-row");
        }
    };

    onTest = (ele) => {
        let table = document.querySelectorAll(
            "table.dx-datagrid-table.dx-datagrid-table-fixed"
        );
        // console.log('onTest', table)
        if (ele.className.includes("dx-group-row")) {
            let td = ele.querySelectorAll("td");
            if (td[0]) td[0].remove();
            if (td[1]) {
                td[1].setAttribute("colspan", 2);
                td[1].setAttribute("style", "width:36px !important");
            }
        } else if (
            table.length === 0 &&
            TOTALDATA > this.props.initialVehiclesData.length
        ) {
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
        if (this.canClick) {
            this.props.setStateReduxRealtime({
                displayVehicle: args.selectedRowKeys,
            });
            this.canClick = false;
            setTimeout(() => (this.canClick = true), 200);
        }
        this.setState({
            groupedData: keys,
        });
    };

    render() {
        let { vehiclesLoading, displayVehicle, initialVehiclesData, isLoadInfo, dataLogin } =
            this.props;
        let { listVehicles, pageSize, showFilter, filter } = this.state;
        // console.log("listVehicles : ", listVehicles)
        return vehiclesLoading ? (
            <div style={{ padding: "170px 5px" }}>
                <center>
                    <img src={images.loading} style={{ width: 50, height: 50 }}></img>
                </center>
            </div>
        ) : (
            <div
                className="table-realtime w-[450px]"
                style={{ backgroundColor: "#fff", padding: 5 }}
            >
                <div className={" px-4 pb-2"}>
                    <div className={!showFilter ? 'h-0 overflow-hidden' : ''}>
                        <div className="mb-3">
                            <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000] ">
                                VIN
                            </label>

                            {/* <Form.Item name="username" className='mb-0'
                    rules={[
                        {
                            required: true,
                            message: 'Field must not null'
                        },
                    ]}> */}

                            <Input value={filter?.vin_no} placeholder="Type VIN" onChange={e => {
                                const target = e.target
                                this.setState(prevState => ({
                                    filter: {
                                        ...prevState.filter,
                                        vin_no: target.value
                                    }
                                }))

                            }} />
                            {/* </Form.Item> */}
                        </div>
                        {dataLogin?.role_id == adminRoleId ? (
                            <>
                                <div className="mb-3">
                                    <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000] ">
                                        Dealer
                                    </label>

                                    {/* <Form.Item name="username" className='mb-0'
                    rules={[
                        {
                            required: true,
                            message: 'Field must not null'
                        },
                    ]}> */}
                                    <AutocompleteSearch
                                    value={filter.dealer_name}
                                    placeholder="Type dealer"
                                    className="text-[13px] font-pop select-custom normal-size"
                                    fetchOptions={e => this.fetchDealerList(e, dataLogin)}
                                    onChange={(newValue) => {
                                        this.setState(prevState => ({
                                            filter: {
                                                ...prevState.filter,
                                                dealer_name: newValue?.value
                                            }
                                        }))

                                    }}
                                    style={{
                                      width: '100%',
                                    }}
                                />
                                    {/* <Input value={filter?.dealer_name} onChange={e => {
                                        const target = e.target
                                        this.setState(prevState => ({
                                            filter: {
                                                ...prevState.filter,
                                                dealer_name: target.value
                                            }
                                        }))

                                    }} /> */}
                                    {/* </Form.Item> */}
                                </div>
                                <div className="mb-3">
                                    <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000] ">
                                        Model
                                    </label>

                                    <Input value={filter?.model_code} placeholder="Type Model" onChange={e => {
                                        const target = e.target
                                        this.setState(prevState => ({
                                            filter: {
                                                ...prevState.filter,
                                                model_code: target.value
                                            }
                                        }))

                                    }} />
                                    {/* </Form.Item> */}
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                        <div className="mt-2">
                            <button onClick={e => {
                                this.props.setFilterMapTractor(this.state.filter)
                                // if (this.dataGrid) {
                                //   this.dataGrid.instance.filter([
                                //     [ "vin_no", "contains", this.state.filter.vin_no ], 'and', [ "model_code", "contains", this.state.filter.model_code ]
                                // ]);

                                //   // this.dataGrid.instance.searchByText(this.state.filter.vin_no);
                                // }
                            }} className="disabled:opacity-50 ant-btn text-white bg-[#CB353E] font-medium text-[14px] p-2 rounded-[11px] w-full border-[#CB353E]">Search</button>
                        </div>
                    </div>
                    <div className="py-[10px] text-right">
                        <button onClick={() => this.setState(prevState => ({ showFilter: !showFilter }))} className="w-[30px] h-[30px] bg-[#DEE2EA] rounded-full text-[#8d8d8d]">
                            <i class={(!showFilter ? 'fa-angle-down' : 'fa-angle-up') + " fa "} aria-hidden="true"></i>
                            {/* <UpOutlined /> */}
                        </button>
                    </div>
                </div>
                {/* <InputSearch
          doSearch={(text) => {
            if (this.dataGrid) this.dataGrid.instance.searchByText(text);
          }}
        /> */}
                <div className="bg-[#f7f7f7] px-3 py-2 flex justify-between border-[#e6e6e6] border-b-0 font-pop font-semibold text-[#959595]" style={{ border: '1px solid' }}>
                    <div>
                        <CheckBox
                            onValueChanged={e => {
                                if (e.value == false) {
                                    this.props.setStateReduxRealtime({
                                        displayVehicle: [],
                                    });
                                } else {
                                    let allId = listVehicles.map(i => i.vid)
                                    let displayVehicle1 = JSON.parse(JSON.stringify(allId))
                                    this.props.setStateReduxRealtime({
                                        displayVehicle: displayVehicle1,
                                    });
                                }
                            }}
                            value={this.displayVehicle.length == listVehicles.length}
                            text="Select All"
                        />
                    </div>
                    <div>
                        <span>{numberWithComma(this.displayVehicle.length)}</span>{' '}
                        <span >{t('realtime_8')}</span>{' '}
                    </div>

                    {/* <button onClick={() => {
            if(this.displayVehicle.length != listVehicles.length){
              let allId = listVehicles.map(i => i.vid)
              let displayVehicle1 = JSON.parse(JSON.stringify(allId))
              this.props.setStateReduxRealtime({
                displayVehicle: displayVehicle1,
              });
            }
          }}  className="disabled:opacity-50 ant-btn text-white bg-[#4d79ff] font-medium text-[12px] p-2 rounded-[11px] w-full border-[#4d79ff]">Select All</button> */}

                </div>
                <FormLoading loading={isLoadInfo} tip="">
                    <DataGrid
                        ref={(ref) => (this.dataGrid = ref)}
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
                        <Grouping autoExpandAll={initialVehiclesData.length < TOTALDATA} />
                        <Selection
                            mode="multiple"
                            selectAllMode={"allPages"}
                            showCheckBoxesMode={"always"}
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
                        <Column dataField="vehicleName" width={220} caption={""} />
                        <Column
                            dataField="customer_name"
                            width={0}
                            caption={""}
                            visible={false}
                        />
                        <Column
                            dataField="vin_no"
                            width={100}
                            caption={"vin_no"}
                            visible={false}
                            allowSearch={true}
                        />
                        <Column
                            dataField="model_code"
                            width={100}
                            caption={"model_code"}
                            visible={false}
                            allowSearch={true}
                        />
                        <Column
                            dataField="speed"
                            allowSearch={false}
                            cellRender={(e) => {
                                let engine_hour = parseInt(get(e.data, "engine_hour", 0));
                                let hour = numberWithComma((engine_hour / 60).toFixed(1));
                                let icon = getIconStatusPathTractor(
                                    parseInt(get(e, "data.status", 0))
                                );
                                return (
                                    <div style={{ float: "right" }}>
                                        <span
                                            title={`ชั่วโมงการทำงาน ${hour} ${rTT(t("ecotree_22"))}`}
                                        >
                                            {hour} {t("ecotree_22")}{" "}
                                        </span>
                                        <img
                                            style={{ height: "25px" }}
                                            src={icon}
                                            title={getStatusName(parseInt(get(e, "data.status", 0)))}
                                        />
                                    </div>
                                );
                            }}
                        />
                        <Summary>
                            <GroupItem
                                column={"customer_name"}
                                summaryType="count"
                                displayFormat={t("dg_count") + ": {0}"}
                            />
                        </Summary>
                    </DataGrid>
                </FormLoading>
            </div>
        );
    }

    renderer = (props) => {
        let { column, value, component, data } = props;

        let keys = getKeys(
            this.state.groupedData,
            [],
            column.dataField,
            value,
            "vid"
        );
        let checked = checkIfKeysAreSelected(keys, component.getSelectedRowKeys());
        let vl = this.props.initialVehiclesData.find(
            (item) => get(item, "customer_name") === value
        );
        let groupText = get(vl, "customer_name");

        props = {
            checked: checked,
            groupText: groupText,
            onValueChanged: (args) => {
                this.onValueChanged(args, component, keys);
            },
            total: get(data, "aggregates[0]"),
            textTotal: "realtime_8",
        };
        return <GroupTemplate {...props} />;
    };

    onValueChanged = (args, grid, keys) => {
        if (!args.event) return;
        if (args.value) grid.selectRows(keys, true);
        else grid.deselectRows(keys);
    };

    onContentReady = (args) => {
        if (args.component.isNotFirstLoad && this.state.listVehicles.length === 0)
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
    dataLogin: state.signin.dataLogin,
    information: state.realtimeNew.information,
    displayVehicle: state.realtimeNew.displayVehicle,
    vehiclesLoading: state.realtimeNew.vehiclesLoading,
    initialVehiclesData: state.realtimeNew.initialVehiclesData,
    filter: state.realtimeNew.filterMapTractor,
    isLoadInfo: state.realtimeNew.isLoadInfo,
});
const mapDispatchToProps = (dispatch) => ({
    setActiveTab: (activeTab) =>
        dispatch(RealtimeNewActions.setActiveTab(activeTab)),
    setFilterMapTractor: (filter) =>
        dispatch(RealtimeNewActions.setFilterMapTractor(filter)),
    getInformationMarker: (vid, callFrom) =>
        dispatch(RealtimeNewActions.getInformationMarker(vid, callFrom)),
    setZoomPan: (isZoomPan) => dispatch(RealtimeNewActions.setZoomPan(isZoomPan)),
    setStateReduxRealtime: (objStateRudux) =>
        dispatch(RealtimeNewActions.setStateReduxRealtime(objStateRudux)),
    setValue: (name, value) => dispatch(RealtimeNewActions.setValue(name, value)),
    setFocus: (isFocus) => dispatch(RealtimeNewActions.setFocus(isFocus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleList);
