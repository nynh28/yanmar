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
            onToolbarPreparing={arg.onToolbarPreparing}
            columnAutoWidth={true}
            columnMinWidth={100}
            columnResizingMode={"widget"}
            allowColumnReordering={true}
            onRowRemoving={arg.onRowRemoving}
        >

            {arg.column && arg.column.map((element, index) => {
                return (
                    <Column key={index} dataField={element.column_name} caption={t(element.column_caption)} />
                )
            })}

            <HeaderFilter visible={true} />
            <FilterRow visible={false} />
            <Grouping autoExpandAll={arg.autoExpandAll || false} />
            <GroupPanel emptyPanelText={t("dg_drang_coumn")} visible={true} />
            <Paging defaultPageSize={10} />
            <Pager
                showPageSizeSelector={true}
                allowedPageSizes={[10, 25, 50]}
            />

            <Editing
                mode="row"
                useIcons={true}
                allowDeleting={true}
            />
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
        this.onToolbarPreparing = this.onToolbarPreparing.bind(this)
        this.onRowRemoving = this.onRowRemoving.bind(this);
    }
    onToolbarPreparing(e) {

        let btnCustm = []
        let btnPerm = {
            location: 'after',
            widget: 'dxButton',
            options: {
                text: 'Permisison',
                onClick: this.props.btnPermissionClick.bind(this)
                // disabled: this.state.disabled
            },
        }

        let btnForm = {
            location: 'after',
            widget: 'dxButton',
            options: {
                icon: 'plus',
                onClick: this.props.btnFormClick.bind(this)
            },
        }

        this.props.btnPerm && btnCustm.push(btnPerm)
        this.props.btnForm && btnCustm.push(btnForm)

        e.toolbarOptions.items.unshift(...btnCustm);
    }

    onRowRemoving(e) {
        e.cancel = "true";
        this.props.onRowRemoving(e)
    }


    render() {
        let { dataSource, column } = this.props

        return <Suspense fallback={"loading"}>
            <DataGridTrans
                dataSource={dataSource}
                column={column}
                onRowRemoving={this.onRowRemoving}
                onToolbarPreparing={this.onToolbarPreparing}
            />
        </Suspense>
    }
}

export default Table