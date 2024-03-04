import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import TrackingHistoryActions from "../../Redux/TrackingHistoryRedux";
import DataGrid, {
  Column,
  Selection,
  FilterRow,
  Paging,
  HeaderFilter,
  Pager,
  SearchPanel,
  Summary,
  Sorting,
  TotalItem,
} from "devextreme-react/data-grid";
import { get, isEmpty } from "lodash";
import { t } from "../../Components/Translation";
import image from "./icons/Images";
import { calculateToDuration } from "../../Functions/DateMoment";
import Loading from "./Loading";
import { TrackingHistoryTypes } from "../../Redux/TrackingHistoryRedux";
import moment from "moment";
import { getEventIcon, getEventName, getEventIconTracktor } from "./Functions";
import { useTranslation } from "react-i18next";
import { ar } from "date-fns/locale";
import { ArrayFieldForm } from "../../Components/FormComponent/ArrayFieldForm";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const DataGridTrans = (arg) => {
  const { t } = useTranslation();
  return (
    <DataGrid
      dataSource={arg.data}
      showBorders={true}
      keyExpr="14"
      defaultSelectedRowKeys={arg.defaultSK}
      selectedRowKeys={arg.defaultSelectKey}
      allowColumnReordering={true}
      columnAutoWidth={true}
      columnMinWidth={100}
      columnResizingMode={"widget"}
      onSelectionChanged={(e) => {
        let selectKey = [],
          defaultKey = [...arg.defaultSelectKey],
          currentSelectedRowKeys = e.currentSelectedRowKeys,
          currentDeselectedRowKeys = e.currentDeselectedRowKeys,
          unix_time_list = [];

        if (arg.data.length == e.selectedRowKeys.length) {
          selectKey.push(...e.selectedRowKeys);
        } else if (arg.data.length == e.currentDeselectedRowKeys.length) {
          selectKey = [];
        } else {
          let key = currentSelectedRowKeys[0];

          if (currentSelectedRowKeys.length == 1 && defaultKey.length == 0) {
            if (defaultKey.includes(key)) selectKey = [];
            else selectKey.push(key);
          } else {
            let deselectKey = "";
            if (key == undefined) {
              selectKey.push(currentDeselectedRowKeys[0]);
            } else {
              deselectKey = currentDeselectedRowKeys[0];
              if (defaultKey.includes(key))
                defaultKey.filter((value) => value != key);
              else defaultKey.push(key);

              let minValue = Math.min(...defaultKey);
              let maxValue = Math.max(...defaultKey);
              while (minValue <= maxValue) {
                selectKey.push(minValue);
                minValue++;
              }
            }
          }
        }

        //#region Parameter for call Trip Detail API
        // console.log("data : ", arg.data)
        let dateStart = "",
          dateEnd = "";
        try {
          if (selectKey.length > 1) {
            let minValue = Math.min(...selectKey);
            let maxValue = Math.max(...selectKey);
            let lastRow = arg.data[maxValue];
            dateStart = arg.data[minValue][0];

            if (lastRow[2] === 2) dateEnd = lastRow[0];
            else dateEnd = lastRow[1];
          } else if (selectKey.length > 0) {
            dateStart = arg.data[selectKey][0];
            dateEnd = arg.data[selectKey][1];
          }
        } catch {}
        //#endregion
        // console.log('selectKey', selectKey)

        arg.defaultSelectKeyChange(selectKey);
        arg.paramSelect("indexTripSelected", selectKey);
        arg.paramSelect("tripRange", {
          deteStartTrip: dateStart,
          deteEndTrip: dateEnd,
        });
      }}
    >
      <Sorting mode="none" />
      <Selection
        mode="multiple"
        selectAllMode={"allPages"}
        showCheckBoxesMode={"always"}
      />
      <Pager showPageSizeSelector={true} allowedPageSizes={[10, 25, 50]} />
      <HeaderFilter visible={false} />
      <SearchPanel visible={false} />
      <Paging defaultPageSize={10} />
      <Summary>
        <TotalItem
          column={"21"}
          summaryType="count"
          displayFormat={t("dg_count") + ": {0}"}
        />
      </Summary>
      <Column
        dataField=""
        caption={t("history_45")}
        cellRender={(e) => arg.cellRender(e)}
      />
      <Column
        dataField="0"
        caption={t("history_46")}
        cellRender={(e) => {
          return moment(e.value).format("DD/MM/YYYY HH:mm:ss");
        }}
      />
      <Column dataField="3" caption={t("history_106")} />
      <Column
        dataField="1"
        caption={t("history_48")}
        cellRender={(e) => {
          if (arg.event_id_list.includes(e.data[2])) return "-";
          else return moment(e.value).format("DD/MM/YYYY HH:mm:ss");
        }}
      />
      <Column dataField="3" caption={t("history_107")} />
      <Column
        dataField="8"
        caption={t("history_108")}
        cellRender={(e) => {
          if (e.data[2] === 1) return calculateToDuration(e.data[8]);
          else return "";
        }}
      />
      <Column
        dataField="8"
        caption={t("history_109")}
        cellRender={(e) => {
          if (e.data[2] === 2000 || e.data[2] === 3)
            return calculateToDuration(e.value, "");
          else return "";
        }}
      />
      <Column dataField="23" caption={t("history_117")} dataType="number" />{" "}
      {/* ชั่วโมงการทำงาน */}
      <Column
        dataField="24"
        caption={t("history_118")}
        dataType="number"
      />{" "}
      {/* ชั่วโมงการทำงานเริ่ม */}
      <Column
        dataField="25"
        caption={t("history_119")}
        dataType="number"
      />{" "}
      {/* ชั่วโมงการทำงานสิ้น */}
      <Column
        dataField="10"
        caption={t("history_50")}
        cellRender={(e) => {
          if (arg.event_id_list.includes(e.data[2])) return "";
          else return e.value;
        }}
      />
      <Column dataField="21" caption={t("Model_Code")} />
      <Column dataField="13" caption={t("history_52")} />
      <Column dataField="22" caption={t("my_vehicles_67")} />
    </DataGrid>
  );
};

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTrips: [],
      defaultSelectKey: [],
    };
  }

  setEventName(event_id, language) {
    return this.props.eventName[language][event_id];
  }

  componentDidMount() {
    this.props.indexTripSelected.length > 0 &&
      this.setState({ defaultSelectKey: this.props.indexTripSelected });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { dataTrips, indexTripSelected } = this.props;
    if (nextProps.dataTrips !== dataTrips) {
      this.setDataForDetail(nextProps.dataTrips);
      return false;
    }

    return true;
  }

  setDataForDetail(data) {
    let selectKey = data.map((d, ind) => ind);
    this.setState({ defaultSelectKey: selectKey });
    let dateStart = "",
      dateEnd = "";
    if (selectKey.length === 1) {
      dateStart = data[selectKey][0];
      dateEnd = data[selectKey][1];
      this.props.setValue("indexTripSelected", selectKey);
      this.props.setValue("tripRange", {
        deteStartTrip: dateStart,
        deteEndTrip: dateEnd,
      });
    }
  }

  cellRender(e) {
    let icon = "";
    let word = "";
    if (this.props.dataLogin.platform_id === 3) {
      icon = getEventIconTracktor(e.data[2]);
      word = getEventName(e.data[2]);
    } else {
      icon = getEventIcon(e.data[2]);
      word = getEventName(e.data[2]);
    }

    let iconSize = [2000, 3].includes(e.data[2]) ? 25 : 20;
    return icon == "unknow" ? (
      <div></div>
    ) : (
      <div
        style={{
          paddingLeft: this.props.subRootTrip.includes(e.data[2]) ? 30 : 0,
        }}
      >
        <img src={icon} height={iconSize} width={iconSize} />
        <span style={{ marginLeft: 10 }}>{t(word)}</span>
      </div>
    );
  }

  render() {
    let { dataTrips } = this.props;
    let { defaultSelectKey, defaultSK } = this.state;
    // console.log(">> RENDER TABLE << ")

    return (
      <Suspense fallback={null}>
        <Loading />
        <DataGridTrans
          data={[...dataTrips]}
          defaultSK={defaultSK}
          defaultSelectKey={defaultSelectKey}
          defaultSelectKeyChange={(key) =>
            this.setState({ defaultSelectKey: key })
          }
          paramSelect={(name, value) => this.props.setValue(name, value)}
          cellRender={(e) => this.cellRender(e)}
          event_id_list={this.props.event_id_list}
          eventName={this.props.eventName}
        />
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  dataLogin: state.signin.dataLogin,
  dataTrips: state.trackingHistory.dataTrips,
  indexTripSelected: state.trackingHistory.indexTripSelected,
  event_id_list: state.trackingHistory.event_id_list,
  eventName: state.trackingHistory.eventName,
  subRootTrip: state.trackingHistory.subRootTrip,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) =>
    dispatch(TrackingHistoryActions.setValue(name, value)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DataTable)
);
