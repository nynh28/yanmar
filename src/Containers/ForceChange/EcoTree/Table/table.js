import React, { Component } from 'react';
import DataGrid from 'devextreme-react/data-grid';
import { customers } from './data.js';

const columns = ['Criteria', 'Score', 'Suggestion'];
class Table extends Component {
    constructor(props){
        super(props)

    }
    render() {
        return (
            <DataGrid
            dataSource={this.props.datasource}
            defaultColumns={columns}
            showBorders={true}
            columnAutoWidth={true}
          />
        );
    }
}

export default Table;