import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import DataGrid, {
  Column, LoadPanel, FilterRow, HeaderFilter,
  SearchPanel, Grouping, GroupPanel, Paging,
  Export, Selection, Format, Pager
} from 'devextreme-react/data-grid';
import DataGridView from '../../Components/DataGridView'
import { headerTable, dataFormatDecimal } from './data.js'
import { momentDate } from '../../Functions/DateMoment'
import { get } from 'lodash'

class DataTable extends Component {

  constructor(props) {
    super(props)
    this.state = {};
    this.dataGrid = React.createRef();
    this.onToolbarPreparing = this.onToolbarPreparing.bind(this);
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'dx-icon icon-font-size-increase-2-512-01',
          onClick: DataGridView.zoom.zoomChange.bind(this, "gridGPSUnit"),
          onload: DataGridView.zoom.setDefaultZoom()
        }
      });
  }

  // _________________ set เมื่อข้อมูลใน sub column เป็น array _________________
  calculateCellValue(rowData, data, number) {
    let { dataField, id, key: _key = 'PortNo', value: _value = 'PortValue' } = data
    let _id = id !== undefined ? id : number
    let obj = get(rowData, 'body.' + dataField, []).find((item) => item[_key] == _id)
    if (obj !== undefined) return obj[_value]
  }
  // ----------------------------------------------------------------
  setColumnSubTableCalculate(dataSubTable, dataField, index) {
    let { caption, id, key, value } = dataSubTable
    return <Column
      dataField={caption}
      caption={caption}
      calculateCellValue={(rowData) => this.calculateCellValue(rowData, { dataField, id, key, value }, index)}
    />
  }
  // ________________________________________________________________________

  calculateCellTime(rowData, time) {
    let str = get(rowData, time, undefined)
    return momentDate(str)
  }

  // ____________________________ set column ปกติ ____________________________
  setColumn(item) {
    if (item.caption === 'GPS Date Time' || item.caption === 'Server Date Time') {
      return <Column
        dataField={item.dataField}
        caption={item.caption}
        dataType={item.dataType}
        calculateCellValue={(rowData) => this.calculateCellTime(rowData, item.dataField)}
        fixed={item.fixed}
      />
    } else {
      return <Column
        dataField={item.dataField}
        caption={item.caption}
        dataType={item.dataType}
        fixed={item.fixed}
      >
        {dataFormatDecimal.arrName.includes(item.caption) &&
          <Format
            type="fixedPoint"
            precision={get(dataFormatDecimal, 'numDecimal.' + item.caption, 2)}
          />
        }
      </Column>
    }
  }
  // ________________________________________________________________________

  // ____________________________ set sub column ____________________________
  setColumnSubTable(item) {
    let { caption, dataField, subTable, calculateCellValue } = item
    return (
      <Column caption={caption}>
        {calculateCellValue ?
          subTable.map((subTable, index) => this.setColumnSubTableCalculate(subTable, dataField, index + 1))
          : subTable.map((subTable) => this.setColumn(subTable))}
      </Column>
    )
  }
  // ________________________________________________________________________


  render() {
    // --------- for api Services ---------
    const { dataSource } = this.props
    // ------------------------------------

    return (
      <DataGrid
        id={'gridGPSUnit'}
        // --------------- for api Services ---------------
        dataSource={dataSource}
        // ------------------------------------------------
        showBorders={true}
        remoteOperations={true}
        keyExpr={'body.Info.RawUnix'}
        // keyExpr={'unix'}
        allowColumnReordering={true}
        onToolbarPreparing={this.onToolbarPreparing}
        columnAutoWidth={true}
      >
        {/* <FilterRow visible={true} /> */}
        <HeaderFilter visible={true} />
        <SearchPanel visible={true}
          width={240}
          placeholder={'Search...'} />
        <Export enabled={true} fileName={'GPS Unit'} allowExportSelectedData={true} />
        {/* <GroupPanel visible={true} /> */}
        {/* <Grouping autoExpandAll={true} /> */}
        <Paging defaultPageSize={10} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={[5, 10, 20]}
          showInfo={true} />
        <Selection mode={'single'} />

        {/* ___________ set Column: headerTable can be set in data.js file ___________ */}
        {headerTable.map((item) => {
          return (
            item.subTable === undefined ? this.setColumn(item)
              : this.setColumnSubTable(item)
          )
        })}
        {/* __________________________________ */}

      </DataGrid>
    )
  }
}



const mapStateToProps = (state) => ({
  dataSource: state.gpsUnit.dataSource,
});

const mapDispatchToProps = (dispatch) => ({
  // getDataUnitSuccess: dataSource => dispatch(GPSUnitActions.getDataUnitSuccess(dataSource))

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataTable))
