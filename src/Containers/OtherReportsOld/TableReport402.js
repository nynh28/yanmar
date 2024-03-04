import React from 'react'
import { connect } from 'react-redux'
import './Table.css'
import Table from '../../Components/DataGridView/Table.js'

class TableReport402 extends React.Component {
  render() {
    let { dataSource, exportName, dataLogin, reportSelected, column, textHeader } = this.props
    return (<Table
      mode={"offline"}
      dataSource={dataSource}
      exportName={exportName}
      table_id={6}
      user_id={dataLogin.userId}
      exportToPDFVisible={true}
      editing={{
        enabled: false
      }}
      cookiesOptions={{
        enable: true,
        name: "ReportSummary_" + reportSelected
      }}
      headerCustom={{
        list: [
          { text: textHeader, merge_cell: true, font: { size: 12 }, alignment: { vertical: 'middle' }, height: 30 },
        ]
      }}
      columnCount="fleet_name"
      footerSummary={{
        hideCount: true
      }}
      column={column}
    />)
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
});

export default connect(mapStateToProps)(TableReport402)