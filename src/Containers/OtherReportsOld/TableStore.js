import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import OtherReportActions from '../../Redux/OtherReportRedux'
import './Table.css'
import Table from '../../Components/DataGridView/Table.js'

class TableStore extends React.Component {

  render() {
    let { column, exportName, dataLogin, DataSummary, language, cookiesOptions,
      headerCustom, footerCustom, footerSummary, reportSelected } = this.props
    let dataSource = JSON.parse(JSON.stringify(DataSummary))
    // let columnConfig = JSON.parse(JSON.stringify(column))
    let columnConfig = column

    // if (reportSelected === '402') {
    //   columnConfig = JSON.parse(JSON.stringify(column))
    // }

    return (
      <div>
        {reportSelected === '402' ? <Table
          mode={"offline"}
          dataSource={dataSource}
          table_id={6}
          cookiesOptions={cookiesOptions}
          user_id={dataLogin.userId}
          exportName={exportName}
          headerCustom={headerCustom}
          footerCustom={footerCustom}
          footerSummary={footerSummary}
          showSetting={false}
          searchPanel={true}
          autoExpandAll={false}
          remoteOperations={false}
          columnCount="vin_no"
          // column={column}
          column={columnConfig}
        /> :
          <Table
            mode={"offline"}
            dataSource={dataSource}
            // dataSource={[]}
            table_id={6}
            cookiesOptions={cookiesOptions}
            user_id={dataLogin.userId}
            exportName={exportName}
            headerCustom={headerCustom}
            footerCustom={footerCustom}
            footerSummary={footerSummary}
            showSetting={false}
            searchPanel={true}
            autoExpandAll={false}
            remoteOperations={false}
            columnCount="fleet_name"
            editing={{
              enabled: true,
              allowUpdating: false,
              allowDeleting: false
            }}
            customButton={[
              {
                hint: language == "th" ? "รายละเอียด" : "Detail",
                icon: "file",
                visible: true,
                onClick: (e) => {
                  this.props.onClickButton(e)
                }
              },
              reportSelected === "101" && {
                hint: "Group",
                // icon: groupfile,
                icon: "far fa-copy",
                // icon: "groupfile",
                visible: true,
                onClick: (e) => {
                  this.props.onClickButtonGroup(e)
                }
              }
            ]}
            // column={column}
            column={columnConfig}
          />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  DataSummary: state.otherReport.DataSummary,
  language: state.versatile.language,
});

const mapDispatchToProps = (dispatch) => ({
  setDetailSelected: (vid) => dispatch(OtherReportActions.setDetailSelected(vid)),
  setMasterDataTemp: (data) => dispatch(OtherReportActions.setMasterDataTemp(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableStore)
