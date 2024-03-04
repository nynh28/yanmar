import React, { Suspense } from "react";
import { connect } from "react-redux";
import CommonActions from "../../Redux/CommonRedux";
import "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Selection,
  Export,
  ColumnChooser,
  SearchPanel,
  Editing,
  Paging,
  StateStoring,
  Pager,
  Grouping,
  GroupPanel,
  Summary,
  GroupItem,
  FilterRow,
  HeaderFilter,
  TotalItem,
  ColumnFixing,
  Texts,
  MasterDetail,
} from "devextreme-react/data-grid";
import "./Table.css";
import CustomStore from "devextreme/data/custom_store";
import { Template } from "devextreme-react/core/template";
import "whatwg-fetch";
import Swal from "sweetalert2";
import { get, isEmpty } from "lodash";
import { ENDPOINT_SETTING_BASE_URL } from "../../Config/app-config";
import { useTranslation } from "react-i18next";
import { t } from "../Translation";
import { momentDate, isDate } from "../../Functions/DateMoment";
import moment from "moment";
import Alert from "../Alert";
import { renderToString } from "react-dom/server";
import ExcelJS from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import saveAs from "file-saver";
import { type } from "jquery";
import BoxColumnChooser from "./ColumnChooser";

const mySuspense = (<Suspense />).type;

function isNotEmpty(value) {
  return !!value;
}

let zoomTableLevel = 1;
var sort = {};

const DataGridTrans = (arg) => {
  const { t } = useTranslation();

  let customButton = [],
    selectionVisible = true,
    ExportEnable = true,
    GroupPanelVisible = true,
    zoomVisible = true,
    selectItemVisible = true;
  if (arg.customButton) customButton = [...arg.customButton];
  if (arg.selectionVisible != undefined)
    selectionVisible = arg.selectionVisible;
  if (arg.ExportEnable != undefined) ExportEnable = arg.ExportEnable;
  if (arg.GroupPanelVisible != undefined)
    GroupPanelVisible = arg.GroupPanelVisible;
  if (arg.zoomVisible != undefined) zoomVisible = arg.zoomVisible;
  if (arg.selectItemVisible != undefined)
    selectItemVisible = arg.selectItemVisible;

  return (
    <DataGrid
      id={"gridtable"}
      ref={arg.datagrids}
      dataSource={arg.store}
      showBorders={true}
      remoteOperations={true}
      // onToolbarPreparing={arg.onToolbarPreparing}
      onExporting={arg.onExporting}
      onToolbarPreparing={(e) => {
        // selectItemVisible && e.toolbarOptions.items.unshift(
        //   {
        //     location: 'after',
        //     widget: 'dxButton',
        //     showText: 'always',
        //     options: {
        //       fontsize: 11,
        //       height: 37,
        //       text: t("dg_select_item"),
        //       onClick: function () {
        //         e.component.showColumnChooser();
        //       }
        //     }
        //   }
        // )

        selectItemVisible &&
          e.toolbarOptions.items.unshift({
            location: "after",
            widget: "dxButton",
            options: {
              // icon: 'fontsize',
              text: t("dg_select_item"),
              onClick: arg.onShowColumnChooser,
            },
          });

        zoomVisible &&
          e.toolbarOptions.items.unshift({
            location: "after",
            widget: "dxButton",
            options: {
              icon: "fontsize",
              onClick: arg.zoomDataGrid,
            },
          });
      }}
      columnAutoWidth={true}
      columnMinWidth={100}
      columnResizingMode={"widget"}
      height={arg.height}
      allowColumnReordering={true}
      onSelectionChanged={
        typeof arg.selectedCallback !== "undefined"
          ? arg.selectedCallback
          : null
      }
      onOptionChanged={arg.onOptionChanged}
      // onContextMenuPreparing={arg.onContextMenuPreparing}
      onContextMenuPreparing={(e) => {
        if (e.target == "header") {
          if (e.items) {
            try {
              e.items[0].text = t("grid_1");
              e.items[1].text = t("grid_2");
              e.items[2].text = t("grid_3");
              e.items[3].text = t("grid_4");
              e.items[3].items[0].text = t("grid_5");
              e.items[3].items[1].text = t("grid_6");
              e.items[4].text = t("grid_7");
            } catch {}
          }
        }
      }}
      onRowRemoving={arg.onRowDelete}
      onEditingStart={arg.onEditingStart}
      onInitialized={arg.onInitialized}
    >
      {get(arg.editing, "enabled", false) && (
        <Column
          fixed={true}
          type="buttons"
          width={110}
          buttons={[...customButton, "edit", "delete"]}
        />
      )}

      {arg.column &&
        arg.column.map((element, index) => {
          return (
            <Column
              key={index}
              dataField={element.column_name}
              caption={t(element.column_caption)}
              cellRender={element.column_render}
              groupCellTemplate={
                element.column_render
                  ? (elem, data) =>
                      arg.groupCellTemplate(elem, data, element.column_render)
                  : false
              }
              fixed={element.fixed}
              fixedPosition={"right"}
              sortOrder={arg.sorting(index + 1)}
              calculateCellValue={element.calculateCellValue}
              // visible={false}>
              visible={arg.setVisibleColumn(element, index)}
            ></Column>
          );
        })}
      <StateStoring
        enabled={arg.loadStore}
        type="custom"
        customLoad={() => arg.loadState}
      />
      <Export
        enabled={ExportEnable}
        fileName={arg.exportName || "Export"}
        allowExportSelectedData={true}
      />
      {selectionVisible && (
        <Selection
          mode="multiple"
          selectAllMode={"allPages"}
          showCheckBoxesMode={"always"}
          allowSelectAll={true}
        />
      )}
      <HeaderFilter visible={true} />
      {/* <ColumnChooser enabled={true} mode="select" title={t("dg_column_chooser")} > */}
      <ColumnFixing enabled={true}></ColumnFixing>
      <ColumnChooser enabled={false} mode="select" title={t("dg_select_item")}>
        {arg.column &&
          arg.column.map((element, index) => {
            return (
              <Column
                key={index}
                dataField={element.column_name}
                caption={t(element.column_caption)}
              />
            );
          })}
      </ColumnChooser>
      <SearchPanel
        visible={arg.searchPanel}
        searchVisibleColumnsOnly={true}
        placeholder={t("dg_search")}
      />
      <FilterRow visible={false} />
      <Grouping autoExpandAll={arg.autoExpandAll || false}>
        <Texts
          groupContinuesMessage={t("grid_8")}
          groupContinuedMessage={t("grid_9")}
        />
      </Grouping>
      <GroupPanel
        emptyPanelText={t("dg_drang_coumn")}
        visible={GroupPanelVisible}
      />
      <Paging defaultPageSize={arg.defaultPageSize || 10} />
      <Pager
        showPageSizeSelector={true}
        allowedPageSizes={[10, 25, 50]}
        showInfo={true}
      />
      {get(arg.editing, "enabled", false) && (
        <Editing
          mode={arg.editing.mode || "window"}
          useIcons={arg.editing.useIcons || "plus"}
          allowUpdating={arg.editing.allowUpdating && arg.allowUpdating}
          allowDeleting={arg.editing.allowDeleting && arg.allowDeleting}
        >
          <Texts confirmDeleteMessage="" />
        </Editing>
      )}
      <MasterDetail
        enabled={arg.MasterDetailEnabled || false}
        component={arg.DetailTemplate}
        render={arg.renderDetail}
      />
      <Summary>
        <TotalItem
          column={arg.columnCount || "id"}
          summaryType="count"
          displayFormat={t("dg_count") + ": {0}"}
        />
        <GroupItem
          column={arg.columnCount || "id"}
          summaryType="count"
          displayFormat={t("dg_count") + ": {0}"}
        />
      </Summary>
      <Template name="totalGroupCount" render={arg.toolbarItemRender} />
    </DataGrid>
  );
};

let testCount = 0;

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.datagrids = React.createRef();
    this.selectedRowsData = [];
    this.store = new CustomStore({
      key:
        this.props.tableKey && this.props.tableKey !== undefined
          ? this.props.tableKey
          : "id",
      canExport: true,
      // key: "id",
      load: (loadOptions) => {
        let params = "?";
        [
          "skip",
          "take",
          "requireTotalCount",
          "requireGroupCount",
          "sort",
          "filter",
          "totalSummary",
          "group",
          "groupSummary",
        ].forEach(function (i) {
          if (i in loadOptions && isNotEmpty(loadOptions[i])) {
            params += `${i}=${encodeURIComponent(
              JSON.stringify(loadOptions[i])
            )}&`;
          }
        });

        params = params.slice(0, -1);
        if (this.initial == 0) {
          this.defaultSetting = params;
          this.initial = 1;
        }
        this.currentSetting = params;

        //#region CASE : HAVE PARAMETER
        let parm = this.props.serversideSource.split("?").pop();
        let targetHost = this.props.serversideSource.split("?")[0];
        let queryUrl = `${this.props.serversideSource}${params}`;

        // console.log(parm)
        // console.log(targetHost)
        // console.log(queryUrl)

        if (parm !== targetHost) {
          queryUrl = targetHost + params + "&" + parm;

          let checkUrl = queryUrl.split("?");
          if (checkUrl.length != 2) {
            queryUrl = targetHost + params + "?" + parm;
          }
        }

        // console.log(queryUrl)

        //#endregion

        // return fetch(`${this.props.serversideSource}${params}`, {
        return fetch(queryUrl, {
          headers: {
            Authorization: this.props.author,
            "X-API-Key": this.props.xAPIKey,
            // 'Accept-Language': this.props.language,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            return {
              data: data.data,
              totalCount: data.totalCount,
              summary: data.summary,
              groupCount: data.groupCount,
            };
          })
          .catch((error) => {
            // console.log(">> gridview : ",error)
            {
              // this.setAlertSetting(true, 4, "vehicle_11")
              throw "Data Loading Error";
            }
          });
      },
    });
    this.state = {
      alertSetting: {
        show: false,
        type: 3,
        content: "",
        e: undefined,
        isRow: true,
        validateCode: false,
      },
      ready: 0,
      table_id: this.props.table_id,
      user_id: this.props.user_id,
      error: "",
      setting_profile: [],
      setting_selected: "",
      update: 0,
    };
    this.firstLoad = true;
    this.firstSetVisible = true;
    this.dataGrid = null;
    this.load_setting_profile = this.load_setting_profile.bind(this);
    this.loadState = this.loadState.bind(this);
    this.sorting = this.sorting.bind(this);
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
    this.onInitialized = this.onInitialized.bind(this);
    this.groupCellTemplate = this.groupCellTemplate.bind(this);
    // this.onExporting = this.onExporting.bind(this);
  }

  groupCellTemplate(elem, data, func) {
    // ---- Set Formatted Value => Name: value (Count: 0) ----
    // console.log('elem', elem, data, this.numCol)
    let { displayValue, groupContinuedMessage, groupContinuesMessage } = data;
    if (func) displayValue = func({ value: displayValue });
    if (typeof displayValue === "object")
      displayValue = this.replaceTranslationText(displayValue);
    let count = get(data, "data.aggregates[0]");
    let text = this.replaceTranslationText(t("dg_count"));
    let formattedValue =
      data.column.caption +
      ": " +
      displayValue +
      " (" +
      text +
      ": " +
      count +
      ")";
    elem.append(formattedValue);
    // elem.colSpan = this.numCol - (get(data, 'columnIndex') + 2)

    // ---- Set Group Continued Message ----
    if (groupContinuedMessage || groupContinuesMessage) {
      let textCinti = " (";
      if (groupContinuedMessage)
        textCinti += this.replaceTranslationText(t("grid_9"));
      if (groupContinuesMessage) {
        if (textCinti !== " (") textCinti += ". ";
        textCinti += this.replaceTranslationText(t("grid_8"));
      }
      textCinti += ")";
      elem.append(textCinti);
    }
  }

  replaceTranslationText(reactSymbol) {
    if (reactSymbol.type === mySuspense)
      reactSymbol = reactSymbol.props.children;
    let str = renderToString(reactSymbol);
    str = str
      .replace('<div data-reactroot="">', "")
      .replace(/<\/div>/g, "")
      .replace('<span data-reactroot="">', "")
      .replace(/<\/span>/g, "")
      .replace(/<!-- -->/g, "");
    return str;
  }

  onExporting = (e) => {
    console.log("onExporting");
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    let { footerSummary, headerCustom } = this.props;
    let rowheader = 1;
    if (headerCustom) {
      let { rowTotal, list } = headerCustom;
      rowheader = rowTotal ? rowTotal + 1 : list ? list.length + 1 : 1;
    }

    exportDataGrid({
      component: e.component,
      worksheet: worksheet,
      topLeftCell: { row: rowheader, column: 1 },
      customizeCell: ({ gridCell, excelCell }) => {
        if (!gridCell) return;

        let { column } = this.props;
        let data = column.find(
          (item) => item.column_name === gridCell.column.dataField
        );

        // --------------------- Data ---------------------
        if (gridCell.rowType === "data") {
          if (data && data.column_render) {
            let value = data.column_render(gridCell);
            let _value = "";
            if (typeof value === "object") {
              _value = this.replaceTranslationText(value);
            } else {
              let isDateOK = moment(value, "DD/MM/YYYY HH:mm:ss", true).format(
                "DD/MM/YYYY HH:mm:ss"
              );
              if (isDateOK == "Invalid date") {
                let tReplace = "" + value;
                tReplace = tReplace.replace(",", "");
                _value = parseFloat(tReplace);
              } else {
                _value = value;
              }
            }
            // options.value = _value
            excelCell.value = _value;
          }
        }

        // --------------------- Group ---------------------
        if (gridCell.rowType === "group") {
          if (gridCell.groupIndex % 2 === 0) {
            // options.backgroundColor = '#ECECEC';
            excelCell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "ECECEC" },
            };
          }
          if (gridCell.groupIndex % 2 === 1) {
            // options.backgroundColor = '#F3F3F3';
            excelCell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "F3F3F3" },
            };
          }
          if (data && data.column_render && gridCell.value !== undefined) {
            let value = data.column_render(gridCell);
            if (typeof value === "object")
              value = this.replaceTranslationText(value);
            let text = this.replaceTranslationText(t("dg_count"));
            let count = get(gridCell, "groupSummaryItems[0].value");
            excelCell.value =
              gridCell.column.caption +
              ": " +
              value +
              " (" +
              text +
              ": " +
              count +
              ")";
          }
        }

        // --------------------- Group ---------------------
        if (gridCell.rowType === "totalFooter") {
          if (footerSummary !== undefined) {
            let { hideCount, objSum } = footerSummary;
            if (hideCount !== undefined && gridCell.value !== undefined)
              excelCell.value = undefined;
            if (objSum !== undefined) {
              let key = get(gridCell, "column.dataField");
              // excelCell.value = objSum[key]
              if (typeof objSum[key] === "object") {
                let { text, font, alignment, fill, border } = objSum[key];
                if (text !== undefined) {
                  let _text;
                  if (Array.isArray(text)) {
                    _text = text
                      .map((data) => {
                        if (typeof data === "object")
                          return this.replaceTranslationText(data);
                        else return data;
                      })
                      .join("");
                  } else _text = text;
                  excelCell.value = _text;
                }
                if (font !== undefined) excelCell.font = font;
                if (alignment !== undefined) excelCell.alignment = alignment;
                if (fill !== undefined) excelCell.fill = fill;
                if (border !== undefined) excelCell.border = border;
              } else if (objSum[key] !== undefined) {
                excelCell.value = objSum[key];
              }
            }
          }
          // if (!gridCell.value) {
          //   excelCell.value = 231
          // }
          // console.log('gridCell', gridCell)
          // console.log('excelCell', excelCell)
        }
      },
    })
      .then((cellRange) => {
        let lstColumnVisible = e.component.getVisibleColumns();
        let { headerCustom, footerCustom } = this.props;
        if (headerCustom !== undefined) {
          // Add: Header
          let { list } = headerCustom;
          for (let i in list) {
            if (!isEmpty(list[i])) {
              let {
                text,
                cellText,
                mergeCells,
                height,
                font,
                alignment,
                fill,
                border,
                rowText,
              } = list[i];

              if (typeof cellText === "string") {
                let dataRow = lstColumnVisible.find(
                  (item) => item.dataField === cellText
                );
                if (dataRow !== undefined) cellText = dataRow.index;
              }

              let row = rowText || Number(i) + 1;
              let headerRow = worksheet.getRow(row);
              if (height !== undefined) headerRow.height = height;
              if (mergeCells !== undefined) {
                if (typeof mergeCells === "number")
                  worksheet.mergeCells(row, 1, row, mergeCells);
                else if (Array.isArray(mergeCells))
                  worksheet.mergeCells(row, mergeCells[0], row, mergeCells[1]);
                else
                  worksheet.mergeCells(
                    row,
                    1,
                    row,
                    get(cellRange, "to.column", 1)
                  );
              }
              if (text !== undefined) {
                let _text;
                if (Array.isArray(text)) {
                  _text = text
                    .map((data) => {
                      if (typeof data === "object")
                        return this.replaceTranslationText(data);
                      else return data;
                    })
                    .join("");
                } else _text = text;
                headerRow.getCell(cellText || 1).value = _text;
              }
              if (font !== undefined)
                headerRow.getCell(cellText || 1).font = font;
              if (alignment !== undefined)
                headerRow.getCell(cellText || 1).alignment = alignment;
              if (fill !== undefined)
                headerRow.getCell(cellText || 1).fill = fill;
              if (border !== undefined)
                headerRow.getCell(cellText || 1).border = border;
            }
          }
        }
        if (footerCustom !== undefined) {
          // Add: Footer
          const footerRowIndex = get(cellRange, "to.row", 1) + 1;

          let { list } = footerCustom;

          for (let i in list) {
            if (!isEmpty(list[i])) {
              let {
                text,
                cellText,
                mergeCells,
                height,
                font,
                alignment,
                fill,
                border,
                rowText,
              } = list[i];

              if (typeof cellText === "string") {
                let dataRow = lstColumnVisible.find(
                  (item) => item.dataField === cellText
                );
                if (dataRow) cellText = dataRow.index;
              }

              let row = rowText || Number(i) + footerRowIndex;
              let footerRow = worksheet.getRow(row);
              if (height !== undefined) footerRow.height = height;
              if (mergeCells !== undefined) {
                if (typeof mergeCells === "number")
                  worksheet.mergeCells(row, 1, row, mergeCells);
                else if (Array.isArray(mergeCells))
                  worksheet.mergeCells(row, mergeCells[0], row, mergeCells[1]);
                else
                  worksheet.mergeCells(
                    row,
                    1,
                    row,
                    get(cellRange, "to.column", 1)
                  );
              }
              if (text !== undefined) {
                let _text;
                if (Array.isArray(text)) {
                  _text = text
                    .map((data) => {
                      if (typeof data === "object")
                        return this.replaceTranslationText(data);
                      else return data;
                    })
                    .join("");
                } else _text = text;
                footerRow.getCell(cellText || 1).value = _text;
              }
              if (font !== undefined)
                footerRow.getCell(cellText || 1).font = font;
              if (alignment !== undefined)
                footerRow.getCell(cellText || 1).alignment = alignment;
              if (fill !== undefined)
                footerRow.getCell(cellText || 1).fill = fill;
              if (border !== undefined)
                footerRow.getCell(cellText || 1).border = border;
            }
          }
        }
      })
      .then(() => {
        // https://github.com/exceljs/exceljs#writing-xlsx
        workbook.xlsx.writeBuffer().then((buffer) => {
          let name = "Export",
            { exportName } = this.props;
          if (exportName !== undefined) {
            if (Array.isArray(exportName)) {
              name = exportName
                .map((data) => {
                  if (typeof data === "object")
                    return this.replaceTranslationText(data);
                  else return data;
                })
                .join("");
            } else name = exportName;
          }
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            name + ".xlsx"
          );
          // saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'CountriesPopulation.xlsx');
        });
      });

    e.cancel = true;
  };

  componentDidMount() {
    this.load_setting_profile();
    if (typeof this.props.initialCallback !== "undefined") {
      this.props.initialCallback(this.datagrids);
    }

    // let { cookiesOptions } = this.props
    // // TbCookies_MyDrivers
    // if (cookiesOptions && cookiesOptions.enable) {
    //   console.log(">>> NAME : ", "TbCookies_" + cookiesOptions.name)
    //   console.log("LOAD SETTING : ", this.props["TbCookies_" + cookiesOptions.name])
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    let { dataSource, cookiesOptions } = this.props;
    if (prevProps.dataSource !== dataSource) {
      // console.log('test')
    }
  }

  componentWillUnmount() {
    // console.log(">>> componentWillUnmount")
    let { cookiesOptions, TbCookies } = this.props;
    // console.log('this.datagrids.current', this.datagrids.current, cookiesOptions && cookiesOptions.enable)
    if (this.datagrids.current && cookiesOptions && cookiesOptions.enable) {
      // console.log("Table config : ", JSON.stringify(this.datagrids.current.instance.state()))

      let config = JSON.stringify(this.datagrids.current.instance.state());
      this.props.setCookiesTableConfig(cookiesOptions.name, config);

      // console.log("TbCookies[cookiesOptions.name] : ", config)
    }
    this.props.setValue("columnChooserVisible", false);
    this.props.setValue("visibleColumnList", []);
  }

  toolbarItemRender() {
    return <div></div>;
  }

  calculateFilterExpression(value, selectedFilterOperations, target) {
    let column = this;
    if (target === "headerFilter" && value === "asc") {
      this.filterValues.push(value);
      this.filterValues.splice(
        this.filterValues.findIndex((e) => e == "desc"),
        1
      );
    }
    if (target === "headerFilter" && value === "desc") {
      this.filterValues.push(value);
      this.filterValues.splice(
        this.filterValues.findIndex((e) => e == "asc"),
        1
      );
    }
    return column.defaultCalculateFilterExpression.apply(this, arguments);
  }

  orderHeaderFilter(data) {
    data.dataSource.postProcess = (results) => {
      results.push(
        {
          text: "Sort Ascending",
          value: "asc",
        },
        {
          text: "Sort Descending",
          value: "desc",
        }
      );
      return results;
    };
  }

  //#region Table configs
  async deleteProfileSetting() {
    var array_value = this.select_profile.current.value.split("|");
    if (array_value[3] == 1) {
      // Check is default present
      this.setAlertSetting(true, 2, "grid_14", "", false);
      return;
    }

    var object = {
      table_id: parseInt(array_value[0]),
      user_id: parseInt(this.state.user_id),
      profile_name: array_value[2],
    };

    var response = await fetch(
      ENDPOINT_SETTING_BASE_URL + "fleet/setting/delete/setting",
      {
        method: "POST",
        headers: {
          Accept: "text/html",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      }
    );
    var responseJson = await response.json();
    if (responseJson.result == true) {
      this.setAlertSetting(true, 1, "grid_15", "", false);
      this.load_setting_profile();
      return;
    }
    this.setAlertSetting(true, 2, "grid_16", "", false);
    return;
  }

  async saveProfileSetting() {
    var profile_name = this.modal_profile_name.current.value;
    if (profile_name == "") {
      this.setAlertSetting(true, 2, "grid_11", "", false);
      return;
    }
    window.jQuery("#setting-modal").modal("hide");
    var table_id = this.state.table_id;
    var user_id = this.state.user_id;
    var table_config = this.datagrids.current.instance.state();

    var object = {
      table_id: parseInt(table_id),
      user_id: parseInt(user_id),
      table_config: JSON.stringify(table_config),
      profile_name: profile_name,
    };
    var response = await fetch(
      ENDPOINT_SETTING_BASE_URL + "fleet/setting/save/setting",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          Accept: "text/html",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object), // body data type must match "Content-Type" header
      }
    );
    var responseJson = await response.json();
    if (responseJson.result == true) {
      this.setAlertSetting(true, 1, "grid_12", "", false);
      this.load_setting_profile(true);
      return;
    }
    this.setAlertSetting(true, 2, "grid_13", "", false);

    window.jQuery("#setting-modal").modal("hide");
  }

  async load_setting_profile(forceselected = false) {
    // console.log(">> load_setting_profile <<")

    var table_id = this.state.table_id;
    var user_id = this.state.user_id;

    if (user_id == 0 || table_id == 0) {
      this.setState({
        setting_profile: [],
        ready: 1,
      });
      return;
    }

    var object = {
      table_id: parseInt(table_id),
      user_id: parseInt(user_id),
    };
    // var response = await fetch(ENDPOINT_SETTING_BASE_URL + 'load/setting', {
    var response = await fetch(
      ENDPOINT_SETTING_BASE_URL + "fleet/setting/load/setting",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          Accept: "text/html",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object), // body data type must match "Content-Type" header
      }
    );
    var responseJson = await response.json();
    if (responseJson.result == true) {
      // var setting = responseJson.setting.map((element, i) => {
      var setting = responseJson.state.map((element, i) => {
        return {
          value:
            element.table_id +
            "|" +
            element.owner_user_id +
            "|" +
            element.profile_name +
            "|" +
            element.is_default,
          text: element.profile_name,
        };
      });
      this.setState(
        {
          setting_profile: setting,
          ready: 1,
        },
        () => {
          if (forceselected == true) {
            this.setState(
              {
                setting_selected: setting[setting.length - 1].value,
              },
              () => {
                this.changeProfile();
              }
            );
          }
        }
      );
    } else {
      this.setState({
        setting_profile: [],
        ready: 1,
      });
    }
  }

  async changeProfile() {
    this.setState(
      {
        setting_selected: this.select_profile.current.value,
      },
      () => {
        setTimeout(() => {
          this.setState({
            update: this.state.update + 1,
          });
        }, 1000);
      }
    );
  }

  async loadState() {
    let { TbCookies, cookiesOptions } = this.props;
    // console.log('TbCookies', TbCookies, cookiesOptions)
    if (cookiesOptions && TbCookies[cookiesOptions.name] && this.firstLoad) {
      // console.log('defaultGroup', TbCookies[cookiesOptions.name])
      this.firstLoad = false;
      return JSON.parse(TbCookies[cookiesOptions.name]);
    } else {
      if (
        this.state.table_id == 0 ||
        this.state.user_id == 0 ||
        this.state.setting_selected.split("|")[0] == ""
      ) {
        return {};
      }
      var array_value = this.state.setting_selected.split("|");
      var table_id = array_value[0];
      var owner_user_id = array_value[1];
      var profile_name = array_value[2];
      var is_default = array_value[3];
      var object = {
        table_id: table_id,
        owner_user_id: owner_user_id,
        profile_name: profile_name,
        is_default: is_default,
        user_id: this.state.user_id,
      };

      var response = await fetch(
        ENDPOINT_SETTING_BASE_URL + "fleet/setting/load/state",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            Accept: "text/html",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(object), // body data type must match "Content-Type" header
        }
      );
      var responseJson = await response.json();
      if (responseJson.result == true) {
        this.setFormDD = responseJson.state;
        return JSON.parse(responseJson.state);
      } else {
        return {};
      }
    }
  }

  setVisibleColumn(element, index) {
    // console.log("________________________________")
    // console.log("element : ", element)
    // console.log("index : ", index)

    let { TbCookies, cookiesOptions, column } = this.props;

    if (column.length - 1 === index) this.firstSetVisible = false;
    if (cookiesOptions && TbCookies[cookiesOptions.name]) {
      let { columns } = JSON.parse(TbCookies[cookiesOptions.name]);
      let data = columns.find((item) => item.dataField === element.column_name);
      // console.log('1', data.dataField, data.visible)
      if (data) return data.visible;
      // console.log('element.visible', element.column_name, element.visible, data.visible)
    } else if (!this.firstSetVisible && this.setFormDD !== undefined) {
      // console.log('2')
      // let { columns } = JSON.parse(this.setFormDD)
      // let data = columns.find((item) => item.dataField === element.column_name)
      // if (column.length - 1 === index) this.setFormDD = undefined
      // if (data) return data.visible
    }

    return element.visible;
  }

  //#endregion

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: "after",
        widget: "dxButton",
        showText: "always",
        options: {
          fontsize: 11,
          height: 37,
          text: "Select Items",
          onClick: function () {
            e.component.showColumnChooser();
          },
        },
      },
      {
        location: "after",
        widget: "dxButton",
        options: {
          icon: "fontsize",
          onClick: this.zoomDataGrid.bind(this),
        },
      }
    );
  }

  onOptionChanged = (e) => {
    if (e.fullName.split(".")[1] == "filterValues") {
      if (e.value != null) {
        if (
          e.value.find((e) => e == "asc") == "asc" &&
          this.state["" + e.fullName.split("[")[1][0]] != "asc"
        ) {
          sort["" + e.fullName.split("[")[1][0]] = "asc";
        } else if (
          e.value.find((e) => e == "desc") == "desc" &&
          this.state["" + e.fullName.split("[")[1][0]] != "desc"
        ) {
          sort["" + e.fullName.split("[")[1][0]] = "desc";
        }
      } else if (e.previousValue) {
        if (
          e.previousValue.find((e) => e == "asc") == "asc" &&
          this.state["" + e.fullName.split("[")[1][0]] != "asc"
        ) {
          sort["" + e.fullName.split("[")[1][0]] = "";
        } else if (
          e.previousValue.find((e) => e == "desc") == "desc" &&
          this.state["" + e.fullName.split("[")[1][0]] != "desc"
        ) {
          sort["" + e.fullName.split("[")[1][0]] = "";
        }
      }
    }
  };

  allowDeleting(e) {
    let { allowDeleting } = this.props;
    let allow = true;
    try {
      if (allowDeleting) {
        let value = get(e.row.data, allowDeleting.column_name, "");
        if (value != allowDeleting.condition) allow = false;
      }
      return allow;
    } catch {
      return allow;
    }
  }

  allowUpdating(e) {
    let { allowUpdating } = this.props;
    let allow = true;
    try {
      if (allowUpdating) {
        let value = get(e.row.data, allowUpdating.column_name, "");
        if (value != allowUpdating.condition) allow = false;
      }
      return allow;
    } catch {
      return allow;
    }
  }

  zoomDataGrid() {
    switch (zoomTableLevel) {
      case 1:
        zoomTableLevel = 2;
        document.getElementById("gridtable").style.zoom = 1.3;
        break;
      case 2:
        zoomTableLevel = 3;
        document.getElementById("gridtable").style.zoom = 1.6;
        break;
      default:
        zoomTableLevel = 1;
        document.getElementById("gridtable").style.zoom = 1;
        break;
    }
  }

  sorting(e) {
    return sort["" + e];
  }

  onEditingStart(e) {
    e.cancel = "true";
    this.props.editCallback(e);
  }

  onRowDelete(e) {
    e.cancel = "true";
    this.setAlertSetting(true, 3, "delete", e, true);
  }

  addMenuItems(e) {
    if (e.target == "header") {
      if (e.items) {
        e.items[0].text = "Sort Smallest to Largest";
        e.items[1].text = "Sort Largest to Smallest";
        e.items[2].text = "Clear Sorting";
        e.items[3].text = "Fix";
        e.items[3].items[0].text = "To the left";
        e.items[3].items[1].text = "To the right";
        e.items[4].text = "Unfix";
      }
    }
  }

  onInitialized(e) {
    // console.log('e', e)
  }

  setAlertSetting(isShow, type, content = "", e, isRow = true) {
    let { alertSetting } = this.state;
    alertSetting.show = isShow;
    alertSetting.type = type;
    alertSetting.content = content;
    alertSetting.e = e;
    alertSetting.isRow = isRow;
    alertSetting.validateCode = false;
    this.setState({ alertSetting });
  }

  onShowColumnChooser(e) {
    if (get(this.datagrids, "current._instance")) {
      this.props.setValue(
        "visibleColumnList",
        this.datagrids.current._instance.getVisibleColumns()
      );
      this.props.setValue("columnChooserVisible", true);
    }
  }

  onChangeColumnOption(value) {
    value.forEach((item) => {
      if (
        this.datagrids.current._instance.columnOption(item.column_name)
          .visible !== item.visible
      ) {
        this.datagrids.current._instance.columnOption(
          item.column_name,
          "visible",
          item.visible
        );
      }
    });
    this.datagrids.current.instance.refresh();
  }

  render() {
    let { alertSetting } = this.state;

    if (this.state.ready == 0) {
      return <div>{this.state.error}</div>;
    }
    let searchPanel = true;
    if (this.props.searchPanel !== undefined) {
      searchPanel = this.props.searchPanel;
    }

    this.numCol = this.props.column ? this.props.column.length : 0;

    // console.log("RENDER DATA GRID")

    return (
      <Suspense fallback={null}>
        <BoxColumnChooser
          column={this.props.column}
          onChangeColumnOption={(value) => this.onChangeColumnOption(value)}
        />
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            if (alertSetting.type === 4) {
              alertSetting.show = false;
            } else if (alertSetting.type === 3) {
              alertSetting.show = false;
              if (alertSetting.isRow) {
                this.props.deleteCallback(alertSetting.e);
              } else {
                // alert("DELETE PRESET")
                this.deleteProfileSetting();
              }
            } else {
              alertSetting.show = false;
            }
            this.setState({ alertSetting });
          }}
          onCancel={() => {
            alertSetting.show = false;
            this.setState({ alertSetting });
          }}
        />
        <div className="row">
          <div className="col-md-12">
            <div
              style={
                this.state.setting_profile.length == 0
                  ? { display: "none" }
                  : {}
              }
              className="row"
            >
              <div className="col-lg-12 text-left">
                {/* {!this.props.showHeaderLing && this.props.showHeaderLing != undefined ? "" : <hr></hr>} */}
                {(this.props.showSetting ||
                  this.props.showSetting === undefined) && (
                  <div
                    className="form-inline float-right"
                    style={{ marginBottom: 15 }}
                  >
                    <div className="form-group">
                      <select
                        onChange={this.changeProfile}
                        value={this.state.setting_selected}
                        ref={this.select_profile}
                        style={{ width: 250 }}
                        className="form-control "
                      >
                        {this.state.setting_profile.length > 0 &&
                          this.state.setting_profile.map((element, i) => {
                            return (
                              <option key={i} value={element.value}>
                                {element.text}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="form-group">
                      <button
                        style={{ marginLeft: 15, marginTop: 5, width: 150 }}
                        onClick={() =>
                          window.jQuery("#setting-modal").modal("show")
                        }
                        className="btn btn-success"
                      >
                        {t("dg_add_setting")}{" "}
                      </button>
                    </div>

                    <div className="form-group">
                      {/* <button style={{ marginLeft: 15, marginTop: 5, width: 150 }} onClick={this.deleteProfileSetting} className="btn btn-danger">{t("dg_delete_setting")}</button> */}
                      <button
                        style={{ marginLeft: 15, marginTop: 5, width: 150 }}
                        onClick={() => {
                          this.setAlertSetting(true, 3, "delete", "", false);
                        }}
                        className="btn btn-danger"
                      >
                        {t("dg_delete_setting")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DataGridTrans
              onOptionChanged={this.onOptionChanged}
              dataSource={this.props.dataSource}
              datagrids={this.datagrids}
              mode={this.props.mode}
              store={this.store}
              sorting={this.sorting}
              loadStore={
                this.props.loadStore != undefined ||
                this.props.loadStore != null
                  ? this.props.loadStore
                  : true
              }
              customButton={this.props.customButton}
              captionCustomButton={this.props.captionCustomButton}
              onToolbarPreparing={this.onToolbarPreparing}
              selectedCallback={this.props.selectedCallback}
              loadState={this.loadState()}
              setVisibleColumn={this.setVisibleColumn.bind(this)}
              onRowDelete={this.onRowDelete}
              onEditingStart={this.onEditingStart}
              column={this.props.column}
              // orderHeaderFilter={this.orderHeaderFilter}
              // calculateFilterExpression={this.calculateFilterExpression}
              searchPanel={searchPanel}
              autoExpandAll={this.props.autoExpandAll}
              editing={this.props.editing}
              toolbarItemRender={this.toolbarItemRender}
              allowUpdating={this.allowUpdating}
              allowDeleting={this.allowDeleting}
              onContextMenuPreparing={this.addMenuItems}
              onInitialized={this.onInitialized}
              columnCount={this.props.columnCount}
              exportName={this.props.exportName}
              zoomDataGrid={this.zoomDataGrid.bind(this)}
              groupCellTemplate={this.groupCellTemplate}
              // changeAlertRemove={this.props.changeAlertRemove}
              MasterDetailEnabled={this.props.MasterDetailEnabled}
              DetailTemplate={this.props.DetailTemplate}
              renderDetail={this.props.renderDetail}
              selectionVisible={this.props.selectionVisible}
              ExportEnable={this.props.ExportEnable}
              GroupPanelVisible={this.props.GroupPanelVisible}
              zoomVisible={this.props.zoomVisible}
              selectItemVisible={this.props.selectItemVisible}
              onExporting={this.onExporting}
              onShowColumnChooser={this.onShowColumnChooser.bind(this)}
              height={this.props.height}
              defaultPageSize={this.props.defaultPageSize}
            />
            {/* <button onClick={() => { console.log(JSON.stringify(this.datagrids.current.instance.state())) }}>state</button> */}
            <div id="setting-modal" className="modal fade" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">{t("dg_add_setting")}</h4>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>{t("grid_10")}</label>
                      <input
                        type="text"
                        className="form-control"
                        ref={this.modal_profile_name}
                        id="settingName"
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={this.saveProfileSetting}
                    >
                      {t("submit")}
                    </button>
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

// export default Table;

const mapStateToProps = (state) => ({
  tableConfig: state.common.tableConfig,
  TbCookies_MyDrivers: state.common.TbCookies_MyDrivers,
  TbCookies: state.common.TbCookies,
});

const mapDispatchToProps = (dispatch) => ({
  setCookiesTableConfig: (tableName, config) =>
    dispatch(CommonActions.setCookiesTableConfig(tableName, config)),
  setValue: (name, value) => dispatch(CommonActions.setValue(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

/* ---------- cookiesOptions Name ----------
1. AnalysisReport
2. OtherReport
3. MyVehicles
4. MyDrivers
5. Driver
6. Geofences
7.
8.
9.
10.
11.

--------------------- */

/* ----------------------- Format headerCustom and footerCustom -----------------------
  1.ส่งค่ามาเป็น object โดยมี key เป็น rowTotal กับ list => { rowTotal: number, list: [{},{}] }
     1.1 rowTotal (type: number)
          => จำนวน row ทั้งหมดที่ต้องการสร้างขึ้น (default: ตามจำนวนใน list)
     1.2 list (type: array)
          => list ข้อมูลที่ต้องการสร้างใน header/footer โดยมี type เป็น object
  2.ใน object ของ list สามารถส่งค่าได้ดังนี้ text, cellText, rowText, mergeCells, height, font, alignment, fill และ border
     2.1 text (type: string, array)
          => set ข้อความที่ต้องการให้โชว์ใน row นั้น
               - ส่งมาเป็น string => ในกรณีทั่วไป Ex. 'วันที่และเวลา: 19/11/2020 15:41'
               - ส่งมาเป็น array  => ในกรณีที่มีคำที่ต้องการเปลี่ยนภาษา Ex. [t('date_time'), ': ', dateTime]
     2.2 cellText (type: number, string)
          => set Column ที่ต้องต้องการให้ข้อความไปแสดง (default: 1)
               - ส่งมาเป็น number => จะไปแสดงใน column ตามตำแหน่งตัวเลข
               - ส่งมาเป็น string => จะไปแสดงใน column ตามตำแหน่ง dataField ที่ส่งมา
     2.3 rowText (type: number)
          => set Row ที่ต้องต้องการให้ข้อความไปแสดง (default: index + 1)
     2.4 mergeCells (type: boolean(true), number, array(2 index only))
          => เป็นการ marge column ใน row นั้นๆ โดยมีทั้งหมด 3 กรณี
               - ส่งมาเป็น true   => merge column ตั้งแต่ 1 ถึง column สุดท้ายที่มีข้อมูล
               - ส่งมาเป็น number => merge column ตั้งแต่ 1 ถึง number ที่ส่งมา
               - ส่งมาเป็น array  => merge column ตั้งแต่ array index ที่ 0 ถึง array index ที่ 1
     2.5 height(type: number)
          => set ความสูงของ row นั้นๆ
     2.6 font (type: object)
          => set รูปแบบของตัวอักษร
          => Ex. { name: 'Segoe UI Light', size: 22, color: { argb: 'BFBFBF' }, bold: true, italic: true, underline: true }
          => link: https://github.com/exceljs/exceljs#fonts
     2.7 alignment (type: object)
          => set ตำแหน่งของข้อความ
          => Ex. { vertical: 'middle', horizontal: 'center' }
          => link: https://github.com/exceljs/exceljs#alignment
     2.8 fill (type: object)
          => set สีพื้นหลัง มีหลังๆ 2 type: pattern, gradient
          => Ex. { type: 'pattern', pattern: 'darkVertical', fgColor:{ argb: 'FFFF0000' } }
          => link: https://github.com/exceljs/exceljs#fills
          => pattern: https://github.com/exceljs/exceljs#pattern-fills
          => gradient: https://github.com/exceljs/exceljs#gradient-fills
     2.9 border (type: object)
          => set เส้นขอบ (top, left, bottom, right)
          => Ex. { left: { style: 'thin' }, bottom: { style: 'double', color: { argb: 'FF00FF00' } } }
          => link: https://github.com/exceljs/exceljs#borders

  ***หากต้องการเว้นบรรทัดโดยไม่ต้องการ set (rowTotal กับ rowText) ให้ส่งเป็น object ว่าง({}) ใน row ที่ต้องการ Ex. [ {text:'Row 1'}, {}, {text:'Row 3'} ]***

  link: https://github.com/exceljs/exceljs#contents

-------------------------------------------------------------------------------------- */

/* ----------------------- Format footerSummary --------------------------------------
  1.ส่งค่ามาเป็น object โดยมี key เป็น hideCount กับ objSum => { hideCount: boolean, objSum: {} }
     1.1 hideCount (type: boolean)
          => set ค่าเมื่อต้องการซ่อนการนับจำนวนของตาราง (default: false)
     1.2 objSum (type: object)
          => ข้อมูลที่เราต้องการแสดงในแต่ละ column โดย set ลงตาม dataField Ex. { key: value }
               - key   => dataField ที่เราต้องการนำข้อมูลไปใส่ (type: string)
               - value => ข้อความที่เราต้องการให้แสดงใน column นั้น (type: string, object)
  2.การใส่ value ใน objSum มี 2 กรณีดังนี้
     2.1 ส่งมาเป็น string => จะนำค่าที่ส่งมาไปแสดงเลย
     2.2 ส่งมาเป็น object => สามารถ set ค่าเพิ่มเติ่มได้ดังนี้ text, font, alignment, fill และ border
          => รูปแบบในการเขียนเป็นรูปแบบเดียวกับ Format headerCustom and footerCustom (2.1, 2.6, 2.7, 2.8 และ 2.9)

-------------------------------------------------------------------------------------- */
