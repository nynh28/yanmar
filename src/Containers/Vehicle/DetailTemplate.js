// import React from 'react';
// import DataGrid, { Column, Selection, GroupPanel, Export, StateStoring, Editing } from 'devextreme-react/data-grid';
// import ArrayStore from 'devextreme/data/array_store';
// import DataSource from 'devextreme/data/data_source';
// import service from './data.js';

// const tasks = service.getTasks();

// const getTasks = (key) => {
//   return new DataSource({
//     store: new ArrayStore({
//       data: tasks,
//       key: 'ID'
//     }),
//     filter: ['EmployeeID', '=', key]
//   });
// };

// class DetailTemplate extends React.Component {
//   constructor(props) {
//     super(props);
//     this.dataSource = getTasks(props.data.key);
//   }

//   render() {
//     console.log(this.props);
//     let { Employee } = this.props.data.data;
//     return (
//       <React.Fragment>
//         <div className={'master-detail-caption'}>
//           {`${Employee}'s Tasks`}
//         </div>
//         <DataGrid
//           id={'gridContainer'}
//           dataSource={this.dataSource}
//           allowColumnReordering={true}
//           showBorders={true}
//           columnAutoWidth={true}
//         >
//           <Export enabled={true} fileName={'Employees'} allowExportSelectedData={true} />
//           <Selection mode={'multiple'} />
//           <GroupPanel visible={true} />
//           <StateStoring enabled={true} type={'localStorage'} storageKey={'storage'} />
//           <Column dataField={'Subject'} />
//           <Column dataField={'StartDate'} dataType={'date'} />
//           <Column dataField={'DueDate'} dataType={'date'} />
//           <Column dataField={'Priority'} />
//           <Column
//             caption={'Completed'}
//             dataType={'boolean'}
//             calculateCellValue={this.completedValue}
//           />
//         </DataGrid>
//       </React.Fragment>
//     );
//   }
//   completedValue(rowData) {
//     return rowData.Status === 'Completed';
//   }
//   onAutoExpandAllChanged() {
//     this.setState({
//       autoExpandAll: !this.state.autoExpandAll
//     });
//   }
// }

// export default DetailTemplate;
