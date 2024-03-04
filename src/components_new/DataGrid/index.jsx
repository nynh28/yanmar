import React, { Suspense, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import CommonActions from '../../Redux/CommonRedux'
import 'devextreme/data/odata/store';
import DataGrid, {
  Column, Selection, Editing, Paging, Pager, GroupPanel, Summary, GroupItem, FilterRow, HeaderFilter, TotalItem, ColumnFixing, Toolbar, Item
} from 'devextreme-react/data-grid';
import './Table.css'
import CustomStore from 'devextreme/data/custom_store';
import 'whatwg-fetch';
import { get, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { renderToString } from 'react-dom/server'
import ExcelJS from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import saveAs from 'file-saver';
import jsPDF from "jspdf";
import "jspdf-autotable";
import vfs from './font/vfs_base64_file'
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";


function isNotEmpty(value) {
  return !!value;
}

const mySuspense = (<Suspense />).type;
const base64_encoded = vfs.getBase64Encoded()
let initial = 0, defaultSetting = "", currentSetting = "", zoomTableLevel = 1

const GridView = ({
  tableId = "",
  tableKey = "id",
  dataSource = [],
  defaultColumns = [],
  serversideSource,
  columns = [],
  columnCount = "id",
  headerFilter = false,
  columnChooser = false,
  filterRow = false,
  exportExcel = true,
  exportPDF = false,
  editing = {},
  showColumnLines = false,
  rowAlternationEnabled = false,
  showRowLines = false,
  showBorders = true,
  showHeaderPanel = true,
  groupPanel = false,
  selectionVisible = false,
  exportName = "Export",
  footerSummary,
  headerCustom,
  topLeftSpace,
  footerCustom,
  zoomGrid = true,
  tabelTemplate = false,
  searchPanel = true,
  onRowRemoved,
  onRowRemoving,
  onSelectionChanged,
  onEditingStart
}) => {

  const { t } = useTranslation()
  //#region STATE
  const [gridRef, setGridRef] = useState(null)
  //#endregion

  // let { serversideSource } = props
  let store = new CustomStore({
    key: 'id',
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
      if (initial == 0) {
        defaultSetting = params
        initial = 1;
      }
      currentSetting = params;

      //#region CASE : HAVE PARAMETER
      let parm = serversideSource.split('?').pop();
      let targetHost = serversideSource.split('?')[0]
      let queryUrl = `${serversideSource}${params}`

      if (parm !== targetHost) {
        queryUrl = targetHost + params + "?" + parm
      }
      //#endregion

      // return fetch(`${serversideSource}${params}`, {
      return fetch(queryUrl, {
        headers: {
          'Authorization': "",
          'X-API-Key': ""
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


  useEffect(() => {

  }, [])


  //#region Print PDF
  const onEportPDF = () => {
    let col = 595.28, row = 841.89
    let expand = columns.length - 10 // 8
    if (expand > 0) {
      col += 59.528 * expand // 74.41
      row += 84.189 * expand // 105.23625
    }
    const doc = new jsPDF({ orientation: "l", format: [row, col] });

    doc.addFileToVFS("Prompt-Regular.ttf", base64_encoded['Prompt-Regular.ttf']);
    doc.addFont('Prompt-Regular.ttf', 'Prompt', 'normal');
    doc.setFont("Prompt");
    const dataGrid = gridRef.instance
    doc.setFontSize(6)
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: dataGrid,
      customizeCell: (options) => {
        const { gridCell, pdfCell } = options;
        let _gridCell = gridCell
        if (pdfCell.styles) pdfCell.styles.font = 'Prompt'
        else pdfCell.styles = { font: 'Prompt' }
        let data = columns.find((item) => item.column_name === _gridCell.column.dataField)

        if (_gridCell.rowType === 'data') {
          if (_gridCell.column.dataField === "iconUrl") {
          } else if (data && data.column_render) {
            let value = data.column_render(gridCell)
            let _value = ""
            if (typeof value === 'object') {
              _value = replaceTranslationText(value)
            }
            else _value = value
            pdfCell.content = _value
          }
        }
      }
    }).then(() => {
      let name = "Export"

      if (Array.isArray(exportName)) {
        name = exportName.map((data) => {
          if (typeof data === 'object') return replaceTranslationText(data)
          else return data
        }).join('')
      } else name = exportName


      doc.autoPrint({ variant: 'non-conform' })
      window.open(doc.output('bloburl'))
    });
  }

  const replaceTranslationText = (reactSymbol) => {
    try {
      if (reactSymbol.type === mySuspense) reactSymbol = reactSymbol.props.children
      let str = renderToString(reactSymbol)
      str = str.replace('<div data-reactroot="">', '').replace(/<\/div>/g, '')
        .replace('<span data-reactroot="">', '').replace(/<\/span>/g, '').replace(/<!-- -->/g, '')
      return str
    } catch {
      return ""
    }
  }

  //#endregion

  //#region Export Excel
  const onExportExcel = (type) => {
    let e = gridRef.instance
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    let topSpace = 1
    let leftSpace = 1
    if (headerCustom) topSpace = get(headerCustom, 'list', []).length + 1
    if (topLeftSpace) {
      let { top, left } = topLeftSpace
      if (top) topSpace = top + 1
      if (left) leftSpace = left + 1
    }

    exportDataGrid({
      component: e,
      worksheet: worksheet,
      topLeftCell: { row: topSpace, column: leftSpace },
      customizeCell: ({ gridCell, excelCell }) => {
        if (!gridCell) return;

        let data = columns.find((item) => item.column_name === get(gridCell.column, 'dataField'))
        // --------------------- Data ---------------------
        if (gridCell.rowType === 'data') {
          if (data && data.column_render) {
            let value, _value = ""
            if (data.column_export) value = data.column_export(gridCell)
            else value = data.column_render(gridCell)

            if (typeof value === 'object') {
              _value = replaceTranslationText(value)
            }
            else {
              let isDateOK = moment(value, "DD/MM/YYYY HH:mm:ss", true).format("DD/MM/YYYY HH:mm:ss")
              if (isDateOK == "Invalid date") {
                let tReplace = "" + value
                tReplace = tReplace.replace(",", "")
                let pF = parseFloat(tReplace), nb = Number(tReplace)
                if (isNaN(pF) || isNaN(nb)) _value = value
                else _value = pF
              }
              else {
                _value = value
              }
            }
            excelCell.value = _value
          }
        }

        // --------------------- Group ---------------------
        if (gridCell.rowType === 'group') {
          if (get(gridCell, 'groupIndex', 0) % 2 === 0) {
            excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ECECEC' } };
          }
          if (get(gridCell, 'groupIndex', 0) % 2 === 1) {
            excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F3F3F3' } };
          }
          if (data && data.column_render && gridCell.value !== undefined) {
            let value
            if (data.column_export) value = data.column_export(gridCell)
            else value = data.column_render(gridCell)

            if (typeof value === 'object') value = replaceTranslationText(value)
            let text = replaceTranslationText(t("dg_count"))
            let count = get(gridCell, 'groupSummaryItems[0].value')
            excelCell.value = get(gridCell.column, 'caption') + ": " + value + " (" + text + ': ' + count + ')'
          }
        }

        // --------------------- Group ---------------------
        if (gridCell.rowType === 'totalFooter') {
          if (footerSummary !== undefined) {
            let { hideCount, deleteRow, objSum } = footerSummary
            if ((hideCount || deleteRow) && gridCell.value !== undefined) excelCell.value = undefined
            if (objSum !== undefined) {
              let key = get(gridCell, 'column.dataField')
              if (typeof objSum[key] === 'object') {
                let { text, font, alignment, fill, border } = objSum[key]
                if (text !== undefined) {
                  let _text
                  if (Array.isArray(text)) {
                    _text = text.map((data) => {
                      if (typeof data === 'object') return replaceTranslationText(data)
                      else return data
                    }).join('')
                  } else _text = text
                  excelCell.value = _text;
                }
                if (font !== undefined) excelCell.font = font;
                if (alignment !== undefined) excelCell.alignment = alignment;
                if (fill !== undefined) excelCell.fill = fill;
                if (border !== undefined) excelCell.border = border;
              } else if (objSum[key] !== undefined) {
                excelCell.value = objSum[key]
              }
            }
          }
        }
      }
    }).then((cellRange) => {
      let lstColumnVisible = e.getVisibleColumns().filter((item) => item.type !== "groupExpand")

      if (headerCustom !== undefined) {
        // Add: Header
        let { list } = headerCustom
        for (let i in list) {
          if (!isEmpty(list[i])) {
            let { text, index_cell, merge_cell, height, font, alignment, fill, border, index_row } = list[i]

            if (typeof index_cell === 'string') {
              let dataRow = lstColumnVisible.findIndex((item) => item.dataField === index_cell)
              if (dataRow >= 0) index_cell = dataRow + get(topLeftSpace, 'left', 1)
              else continue
            }

            let row = index_row || (Number(i) + 1)
            let headerRow = worksheet.getRow(row);
            if (height !== undefined) headerRow.height = height;
            if (merge_cell !== undefined) {
              if (typeof merge_cell === 'number') worksheet.mergeCells(row, 1, row, merge_cell);
              else if (Array.isArray(merge_cell)) worksheet.mergeCells(row, merge_cell[0], row, merge_cell[1]);
              else worksheet.mergeCells(row, 1, row, get(cellRange, 'to.column', 1));
            }
            if (text !== undefined) {
              let _text
              if (Array.isArray(text)) {
                _text = text.map((data) => {
                  if (typeof data === 'object') return replaceTranslationText(data)
                  else return data
                }).join('')
              }
              else _text = text
              headerRow.getCell(index_cell || 1).value = _text;
            }
            if (font !== undefined) headerRow.getCell(index_cell || 1).font = font;
            if (alignment !== undefined) headerRow.getCell(index_cell || 1).alignment = alignment;
            if (fill !== undefined) headerRow.getCell(index_cell || 1).fill = fill;
            if (border !== undefined) headerRow.getCell(index_cell || 1).border = border;
          }
        }
      }
      if (footerCustom !== undefined) {
        // Add: Footer
        let footerRowIndex = get(cellRange, 'to.row', 1);
        if (get(footerSummary, 'deleteRow')) footerRowIndex -= 1

        let { list } = footerCustom
        for (let i in list) {
          if (!isEmpty(list[i])) {
            let { text, index_cell, merge_cell, height, font, alignment, fill, border, index_row } = list[i]

            if (typeof index_cell === 'string') {
              let dataRow = lstColumnVisible.findIndex((item) => item.dataField === index_cell)
              if (dataRow >= 0) index_cell = dataRow + get(topLeftSpace, 'left', 1)
              else continue
            }

            let row = (index_row || (Number(i) + 1)) + footerRowIndex
            let footerRow = worksheet.getRow(row);
            if (height !== undefined) footerRow.height = height;
            if (merge_cell !== undefined) {
              if (typeof merge_cell === 'number') worksheet.mergeCells(row, 1, row, merge_cell);
              else if (Array.isArray(merge_cell)) worksheet.mergeCells(row, merge_cell[0], row, merge_cell[1]);
              else worksheet.mergeCells(row, 1, row, get(cellRange, 'to.column', 1));
            }
            if (text !== undefined) {
              let _text
              if (Array.isArray(text)) {
                _text = text.map((data) => {
                  if (typeof data === 'object') return replaceTranslationText(data)
                  else return data
                }).join('')
              }
              else _text = text
              footerRow.getCell(index_cell || 1).value = _text;
            }
            if (font !== undefined) footerRow.getCell(index_cell || 1).font = font;
            if (alignment !== undefined) footerRow.getCell(index_cell || 1).alignment = alignment;
            if (fill !== undefined) footerRow.getCell(index_cell || 1).fill = fill;
            if (border !== undefined) footerRow.getCell(index_cell || 1).border = border;
          }
        }
      }

    }).then(() => {
      // https://github.com/exceljs/exceljs#writing-xlsx
      workbook.xlsx.writeBuffer().then((buffer) => {
        let name = "Export"
        if (exportName !== undefined) {
          if (Array.isArray(exportName)) {
            name = exportName.map((data) => {
              if (typeof data === 'object') return replaceTranslationText(data)
              else return data
            }).join('')
          } else name = exportName
        }
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), (name) + '.xlsx');
      });
    });

    e.cancel = true;
  }
  //#endregion


  const sorting = (e) => {
    let sort = {}
    return sort['' + e]
  }


  //#region 
  const groupCellTemplate = (elem, data, func, funcGroup = false) => {
    // ---- Set Formatted Value => Name: value (Count: 0) ----
    // console.log('elem', elem, data, this.numCol)
    let { displayValue, groupContinuedMessage, groupContinuesMessage } = data
    if (funcGroup) { }//displayValue = funcGroup({value: displayValue })
    else if (func) displayValue = func({ value: displayValue })
    if (typeof displayValue === 'object') displayValue = replaceTranslationText(displayValue)
    let count = get(data, 'data.aggregates[0]')
    let text = replaceTranslationText(t("dg_count"))
    let formattedValue = data.column.caption + ": " + displayValue + " (" + text + ': ' + count + ')';
    elem.append(formattedValue)
    // elem.colSpan = this.numCol - (get(data, 'columnIndex') + 2)

    // ---- Set Group Continued Message ----
    if (groupContinuedMessage || groupContinuesMessage) {
      let textCinti = ' ('
      if (groupContinuedMessage) textCinti += replaceTranslationText(t("grid_9"))
      if (groupContinuesMessage) {
        if (textCinti !== ' (') textCinti += '. '
        textCinti += replaceTranslationText(t("grid_8"))
      }
      textCinti += ')'
      elem.append(textCinti)
    }
  }
  //#endregion


  //#region Zoom Grid
  const zoomDataGrid = () => {
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
  }
  //#endregion

  console.log(">>RENDER TABLE")

  let defaultColumnsOption = {}
  if (columns.length === 0) defaultColumnsOption = { defaultColumns: defaultColumns }

  return (
    <>
      {/* {
        gridRef !== null && <>
          {columnChooser && <ColumnChooser tableId={tableId} columns={columns} gridRef={gridRef} />}
          {tabelTemplate && <TemplateChooser tableId={tableId} columns={columns} gridRef={gridRef} />}
        </>
      } */}

      <DataGrid
        id={tableId}
        className="dx-grid"
        ref={(ref) => setGridRef(ref)}
        keyExpr={tableKey}
        dataSource={dataSource}
        remoteOperations={false}
        showColumnLines={showColumnLines}
        showRowLines={showRowLines}
        showBorders={showBorders}
        rowAlternationEnabled={rowAlternationEnabled}
        {...defaultColumnsOption}
        // onExporting={(e) => { }}
        // onRowPrepared={arg.onRowPrepared}
        // defaultSelectedRowKeys={arg.defaultSelectedRowKeys}
        columnAutoWidth={true}
        columnMinWidth={100}
        allowColumnResizing={true}
        columnResizingMode={"widget"}
        allowColumnReordering={true}
        onSelectionChanged={onSelectionChanged}
        // onOptionChanged={arg.onOptionChanged}
        // onContextMenuPreparing={arg.onContextMenuPreparing}
        onContextMenuPreparing={(e) => {
          if (e.target == 'header') {
            if (e.items) {
              try {
                e.items[0].text = t('grid_1')
                e.items[1].text = t('grid_2')
                e.items[2].text = t('grid_3')
                e.items[3].text = t('grid_4')
                e.items[3].items[0].text = t('grid_5')
                e.items[3].items[1].text = t('grid_6')
                e.items[4].text = t('grid_7')
              } catch { }
            }
          }
        }}
        // onRowRemoving={onRowRemovingTest}
        onRowRemoving={editing.enabled && editing.allowDeleting && onRowRemoving}
        onEditingStart={editing.allowUpdating && editing.allowUpdating && onEditingStart}
      // onEditingStart={onEditingStart}
      // onInitialized={onInitialized}
      >
        {/* <ColumnChooser enabled={true} mode="select" >    </ColumnChooser> */}

        {
          columns.map((column, index) => {
            return <Column
              key={index}
              cssClass={column.sub_column && 'header-column-center'}
              dataField={column.column_name}
              caption={t(column.column_caption)}
              cellRender={column.column_render}
              alignment={column.alignment}
              allowGrouping={column.allowGrouping}
              allowFiltering={column.allowFiltering}
              groupCellTemplate={column.column_render ? (elem, data) => groupCellTemplate(elem, data, column.column_render, column.column_group) : false}
              fixed={column.fixed}
              fixedPosition={column.fixedPosition || "right"}
              sortOrder={sorting(index + 1)}
              calculateCellValue={column.calculateCellValue}
              visible={column.visible}
              // visible={false}
              width={column.width}
            >
              {/* {
                column.sub_column && column.sub_column.map((sub, idx) => {
                  return <Column
                    dataField={sub.dataField}
                    caption={t(sub.caption)}
                    cellRender={sub.column_render}
                    calculateCellValue={sub.calculateCellValue}
                  >
                  </Column>
                })} */}

              {column.sub_column && column.sub_column.map((sub, idx) => {
                return <Column
                  dataField={sub.column_name}
                  caption={t(sub.column_caption)}
                  cellRender={sub.column_render}
                  groupCellTemplate={sub.column_render ? (elem, data) => groupCellTemplate(elem, data, sub.column_render) : false}
                  sortOrder={sorting(idx + 1)}
                  calculateCellValue={sub.calculateCellValue}
                  visible={true}
                // visible={sub.setVisibleColumn(sub, idx)}
                >
                </Column>
              })}

            </Column>
          })}

        {/* 
        {
          get(arg.editing, 'enabled', false) && <Column fixed={true} type="buttons" width={110}
            buttons={[...customButton, 'edit', 'delete']} />
        }
     
        {
          arg.customButtonOnly && <Column fixed={true} type="buttons" width={110}
            buttons={[...arg.customButtonOnly]} />
        } */}


        {/* <StateStoring enabled={arg.loadStore} type="custom" customLoad={() => arg.loadState} ignoreColumnOptionNames={[]} />
        <Export enabled={ExportEnable} fileName={arg.exportName || "Export"} allowExportSelectedData={true} />
       
        */}

        {
          selectionVisible && <Selection
            mode="multiple"
            selectAllMode={'allPages'}
            showCheckBoxesMode={'always'}
            allowSelectAll={true}
          />
        }
        <HeaderFilter visible={headerFilter} />
        <ColumnFixing enabled={true}></ColumnFixing>
        {/* <ColumnChooser enabled={false} mode="select" title={t("dg_select_item")} >
          {arg.column && arg.column.map((element, index) => {
            return (
              <Column key={index} dataField={element.dataField} caption={t(element.caption)} />
            )
          })}
        </ColumnChooser> */}

        <FilterRow visible={filterRow} />
        {/* <Grouping autoExpandAll={arg.autoExpandAll || false} >
          <Texts
            groupContinuesMessage={t("grid_8")}
            groupContinuedMessage={t("grid_9")}
          />
        </Grouping> */}
        <GroupPanel emptyPanelText={t("key_14")} visible={groupPanel} />
        <Paging defaultPageSize={10} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={[10, 25, 50]}
        />

        {get(editing, 'enabled', false) &&
          <Editing
            mode={editing.mode || "window"}
            useIcons={editing.useIcons || "plus"}
            allowUpdating={editing.allowUpdating}
            allowDeleting={editing.allowDeleting}
          >
          </Editing>
        }

        {/* <MasterDetail
          enabled={arg.MasterDetailEnabled || false}
          component={arg.DetailTemplate}
          render={arg.renderDetail}
        /> */}

        {
          showHeaderPanel && <Toolbar>
            {
              groupPanel && <Item
                location="before"
                name="groupPanel"
              />
            }

            {
              zoomGrid && <Item location="after">
                <button
                  type="button"
                  className="inline-flex items-center px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  title="Print PDF"
                  onClick={() => zoomDataGrid()}
                >
                  <i className="dx-icon dx-icon-fontsize p-1 h-5 w-5 text-gray-500"></i>
                </button>
              </Item>
            }

            {
              exportPDF && <Item location="after">
                <button
                  type="button"
                  className="inline-flex items-center px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  title="Print PDF"
                  onClick={() => onEportPDF()}
                >
                  {/* <PrinterIcon className="h-5 w-5 text-gray-500" aria-hidden="true" /> */}
                </button>
              </Item>
            }

            {/* {
              exportExcel && <Item location="after">
                <Popover
                  popverAction={<button
                    type="button"
                    className="inline-flex items-center px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    title="Export Excel"
                  >
                    <DocumentTextIcon className="h-5 w-5 text-primary-500" aria-hidden="true" />
                  </button>}
                >
                  <div className="bg-white rounded-md shadow arrow-left w-44 cursor-pointer">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <div className="flex items-center block px-4 py-1 hover:bg-gray-100" onClick={() => onExportExcel("all")}>
                        <label className="block text-sm font-medium text-gray-700 cursor-pointer">
                          Export all data
                        </label>
                      </div>

                      <div className="hidden sm:block" aria-hidden="true">
                        <div className="border-b border-gray-200" />
                      </div>
                    </div>

                    <div className="flex items-center px-4 py-1 hover:bg-gray-100" onClick={() => onExportExcel("selected")}>
                      <label className="block text-sm font-medium text-gray-700 cursor-pointer">
                        Export selected rows
                      </label>
                    </div>
                  </div>
                </Popover>
              </Item>
            } */}

            {
              tabelTemplate && <Item location="after">
                <button
                  type="button"
                  className="inline-flex items-center px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  // onClick={() => gridStore.setValues({ showTemplateConfig: true, showColumnChooser: false })}
                  title={t("Template")}
                >
                  {/* <FontAwesomeIcon icon="table-cells" size={"lg"} className="" /> */}
                </button>
              </Item>
            }

            {
              columnChooser && <Item location="after">
                <button
                  type="button"
                  className="inline-flex items-center px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  // onClick={() => gridStore.setValues({ showColumnChooser: true, showTemplateConfig: false })}
                  title={t("key_13")}
                >
                  {/* <FontAwesomeIcon icon="list-check" size={"lg"} /> */}
                </button>
              </Item>
            }

            {/* {
              searchPanel && <Item location="after">
                <Input
                  className="w-32"
                  placeholder="key_11"
                  onChange={(e) => gridRef.instance.searchByText(e.target.value)}
                />
              </Item>
            } */}
          </Toolbar>
        }


        <Summary>
          <TotalItem
            column={columnCount}
            summaryType="count"
            displayFormat={t("key_12") + ': {0}'}
          />
          <GroupItem
            column={columnCount}
            summaryType="count"
            displayFormat={t("key_12") + ': {0}'}
          />
        </Summary>
        {/* <Template name="totalGroupCount" render={arg.toolbarItemRender} /> */}

      </DataGrid>
    </ >
  )
}


const mapStateToProps = (state) => ({
  tableConfig: state.common.tableConfig,
  TbCookies_MyDrivers: state.common.TbCookies_MyDrivers,
  TbCookies: state.common.TbCookies,
  TbSettings: state.common.TbSettings,

});

const mapDispatchToProps = (dispatch) => ({
  setCookiesTableConfig: (tableName, config, setting) => dispatch(CommonActions.setCookiesTableConfig(tableName, config, setting)),
  setValue: (name, value) => dispatch(CommonActions.setValue(name, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(GridView) 