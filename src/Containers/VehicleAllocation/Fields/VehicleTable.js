import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DataGrid, {
  Texts, Column, FilterRow,
  HeaderFilter, SearchPanel,
  Grouping, GroupPanel, Paging,
  Export, Selection, MasterDetail,
  Editing
} from 'devextreme-react/data-grid';
import { connect } from 'react-redux'
import Table from '../../../Components/DataGridView/Table.js'
import { ENDPOINT_BASE_URL } from '../../../Config/app-config';
import VehicleAllocationActions from '../../../Redux/VehicleAllocationRedux'

// Define a custom component for handling the root position object
class VehicleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData
    };
    // debugger;
    // console.log(props.formData);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ ...nextProps.formData })
  // }


  // onChange(name, nativeElement = true) {
  //   return (event) => {
  //     debugger;
  //     // console.log(event)
  //     let value = event.selectedRowKeys
  //     this.setState({
  //       [name]: value
  //     }, () => this.props.onChange(this.state));
  //   };
  // }

  handleInitFilePond() {

  }

  selectedCallback(e) {
    let selectedData = e.selectedRowsData.map(e => {
      return {
        vehicle_id: e.vehicle_id
      }
    })

    // return (event) => {
    //   // debugger;

    //   // let value = event[0].value;
    //   this.setState({
    //     vehicleTable: selectedData
    //   }, () => this.props.onChange(this.state));
    // };
    this.props.setAllocated(selectedData)
    // console.log(selectedData)
  }

  // onChangeSelect(name) {
  //   return (event) => {
  //     // debugger;

  //     let value = event[0].value;
  //     this.setState({
  //       [name]: event[0].value
  //     }, () => this.props.onChange(this.state));
  //   };
  // }

  render() {
    // console.log(this.state)
    const { vehicleTable } = this.state
    // console.log("Vehicle Table", vehicleTable)
    const { schema, header } = this.props
    // console.log(schema)
    let comment = false
    console.table(schema)
    console.log("schema.OwnerPartnerId", schema.OwnerPartnerId)


    return (

      <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
        <label className="control-label">
          {schema.label && schema.label.vehicleTable}
          {
            schema.required && schema.required.includes('vehicleTable') &&
            <span className="required">*</span>
          }
        </label>

        {comment && <DataGrid id={'gridContainer'}
          // selection={[{ id: "a38288d4-36d2-44de-93d7-1dccc14ba4ce" }]}
          // defaultSelectionFilter={['id', '=', 'a38288d4-36d2-44de-93d7-1dccc14ba4ce || 53639dd7-914e-4b29-8d78-e2e99dccd023']}
          ref={this.dataGrid}
          dataSource={schema.list.vehicleTable}
          keyExpr={'id'}
          showBorders={true}
          allowColumnReordering={true}
          selectedRowKeys={vehicleTable}
          // sele
          // onContentReady={this.detectContentReady}
          onSelectionChanged={this.onChange("vehicleTable", false)}
        >
          <GroupPanel visible={true} />
          <Paging defaultPageSize={15} />

          <FilterRow visible={false} />
          <HeaderFilter visible={false} />
          <SearchPanel visible={true}
            width={240}
            placeholder={'Search...'} />

          <Selection mode={'multiple'}
          // showCheckBoxesMode={'onClick'}
          // deferred={true}
          />
          {/* <Selection mode={'single'} /> */}

          <Column dataField={'model'} minWidth={120} />
          <Column dataField={'orderingModel'} minWidth={80} />
          <Column dataField={'specCode'} minWidth={120} />
          <Column dataField={'vinNo'} minWidth={80} />

        </DataGrid>
        }



        <Table
          // mode={"api"}
          // serversideSource={`${ENDPOINT_BASE_URL}fleet/vehicle/vehicle_allocation/list_vehicle?user_id=` + schema.OwnerPartnerId}
          // serversideSource={'https://api-center.onelink-iot.com/v1.0.1/grid-view/allocable-vehicles/' + schema.OwnerPartnerId}
          table_id={1}
          user_id={1}
          dataSource={schema.list.vehicleTable}
          author={header.idToken}
          xAPIKey={header.redisKey}
          selectedCallback={(e) => this.selectedCallback(e)}
          // initialCallback={this.tableInitial}
          autoExpandAll={false}
          remoteOperations={false}
        >
          {/* <GroupPanel visible={true} />
                    <Grouping autoExpandAll={this.state.autoExpandAll} /> */}
        </Table>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header,
});

const mapDispatchToProps = (dispatch) => ({
  setAllocated: (vehicles) => dispatch(VehicleAllocationActions.setAllocated(vehicles))
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleTable)
