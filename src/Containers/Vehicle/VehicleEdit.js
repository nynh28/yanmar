import React from 'react';

import 'devextreme/data/odata/store';
import DataGrid, { Column, Paging, Pager, Grouping, GroupPanel } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import 'whatwg-fetch';
import { connect } from 'react-redux'

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== '';
}

const store = new CustomStore({
  key: 'OrderNumber',
  load: function (loadOptions) {
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
      if (i in loadOptions && isNotEmpty(loadOptions[i])) { params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
    });
    params = params.slice(0, -1);
    return fetch(`https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders${params}`)
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

class VehicleEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoExpandAll: true
    };
  }


  render() {

    console.log(this.props.header)
    return (
      <DataGrid
        dataSource={store}
        showBorders={true}
        remoteOperations={true}
      >

        <Column
          dataField="OrderNumber"
          dataType="number"
        />
        <Column
          dataField="OrderDate"
          dataType="date"
        />
        <Column
          dataField="StoreCity"
          dataType="string"
        />
        <Column
          dataField="StoreState"
          dataType="string"
        />
        <Column
          dataField="Employee"
          dataType="string"
        />
        <Column
          dataField="SaleAmount"
          dataType="number"
          format="currency"
        />
        <GroupPanel visible={true} />

        <Grouping autoExpandAll={this.state.autoExpandAll} />


        <Paging defaultPageSize={12} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={[8, 12, 20]}
        />
      </DataGrid>
    );
  }
}


const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,

  header: state.signin.header,

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleEdit)
