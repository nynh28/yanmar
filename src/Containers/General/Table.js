import React, { Component, Suspense } from 'react'
import DataGrid, {
  Column, Editing, Paging, Pager, Grouping, GroupPanel, Summary, GroupItem, FilterRow, HeaderFilter, TotalItem
} from 'devextreme-react/data-grid';
import { useTranslation } from 'react-i18next'

const DataGridTrans = (arg) => {
  const { t } = useTranslation()
  return (
    <DataGrid
      dataSource={arg.dataSource || []}
      showBorders={true}
      columnAutoWidth={true}
      columnMinWidth={100}
      columnResizingMode={"widget"}
      allowColumnReordering={true}
    // onEditingStart={arg.onEditingStart}
    // onRowRemoving={arg.onRowRemoving}
    >

      {arg.column && arg.column.map((element, index) => {
        return (
          <Column
            key={index}
            dataField={element.column_name}
            caption={t(element.column_caption)}
            cellRender={element.column_render} />
        )
      })}

      <HeaderFilter visible={true} />
      <FilterRow visible={false} />
      {/* <Grouping autoExpandAll={arg.autoExpandAll || false} />
      <GroupPanel emptyPanelText={t("dg_drang_coumn")} visible={true} /> */}
      <Paging defaultPageSize={5} />
      <Pager
        showPageSizeSelector={true}
        allowedPageSizes={[5, 10, 25]}
      />

      {/* <Editing
        mode="row"
        useIcons={true}
        // allowDeleting={true}
        allowUpdating={true}
      /> */}
      <Summary>
        <TotalItem
          column="id"
          summaryType="count"
          displayFormat={t("dg_count") + ': {0}'}
        />
        <GroupItem
          column="id"
          summaryType="count"
          displayFormat={t("dg_count") + ': {0}'}
        />
      </Summary>

    </DataGrid>
  )
}

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFormPopup: false,
      showPermissionSummary: false
    }
    this.onEditingStart = this.onEditingStart.bind(this);
    this.onRowRemoving = this.onRowRemoving.bind(this);
  }


  onRowRemoving(e) {
    e.cancel = "true";
    this.props.onRowRemoving(e)
  }

  onEditingStart(e) {
    e.cancel = "true";
    this.props.onEditingStart(e)
  }


  render() {
    let { dataSource, column } = this.props

    return <Suspense fallback={"loading"}>
      <DataGridTrans
        dataSource={dataSource}
        column={column}
        onEditingStart={this.onEditingStart}
        onRowRemoving={this.onRowRemoving}
      />
    </Suspense>
  }
}

export default Table
