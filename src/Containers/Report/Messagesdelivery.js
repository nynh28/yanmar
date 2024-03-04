import React from 'react';

import { employee, positions, states } from './dataMD';
import notify from 'devextreme/ui/notify';
import Form, {
  SimpleItem,
  Label,
  GroupItem,
  CompareRule
} from 'devextreme-react/form';
import 'devextreme-react/text-area';
import { Button } from 'devextreme-react';
import DataGrid from 'devextreme-react/data-grid';
import { customers } from './dataMD';

const columns = ['CompanyName', 'City', 'State', 'Phone', 'Fax','BirthDate'];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.birthDateOptions = { width: '100%' };
    this.positionOptions = {
      items: positions,
      value: ''
    };
    
    this.stateOptions = {
      items: states
    };
    this.phoneOptions = { mask: '+1 (000) 000-0000' };
    this.notesOptions = { height: 140 };
    
  }
  onClick(e) {
    const buttonText = e.component.option('text');
    notify(`The Successfully delivered message`,);
    
  }
  onRowPrepared(e) {  
    if (e.rowType == 'data' && e.data.Phone > '(800) 555-2797') {  
         e.rowElement.style.backgroundColor = 'yellow';  
         e.rowElement.className = e.rowElement.className.replace("dx-row-alt", "");
         
     }  
  }
  render() {
    var config = {
        language : 'TH',
        showDropdowns : true,
        format: "MM/DD/YYYY" // รองรับแต่ format นี้ เท่านั้น !!!!!!!!
    };
    return (
    <div >
        <Form formData={employee}>
        <GroupItem cssClass="second-group" colCount={2}>
          <GroupItem>
            <SimpleItem dataField="Address" />
            <SimpleItem dataField="City" />
            <SimpleItem dataField="Position"
              editorType="dxSelectBox"
              editorOptions={this.positionOptions} />
          </GroupItem>
          <GroupItem>
            <SimpleItem
              dataField="State"
              editorType="dxSelectBox"
              editorOptions={this.stateOptions} />
            <SimpleItem dataField="ZipCode" />
            <SimpleItem
              dataField="Mobile"
              editorOptions={this.phoneOptions}>
              <Label text="Phone" />
            </SimpleItem>
          </GroupItem>
          <SimpleItem
            colSpan={2}
            dataField="Notes"
            editorType="dxTextArea"
            editorOptions={this.notesOptions}
          />
        </GroupItem> 
       
           
    </Form>
    <br></br>
    <div className="buttons">
    <Button 
                  width={200}
                  text="Send message"
                  type="success"
                  stylingMode="contained"
                  onClick={this.onClick}
    />
    </div>
    <br></br>
    <div className="row">
    <div className="col-md-12">
                        <div className="ibox float-e-margins">
                        <div className="ibox-title">
                        <h5>Message Delivery</h5>
                        <div className="ibox-tools">            
                        </div>
                            </div>
                            <div className="ibox-content">
            <DataGrid
        dataSource={customers}
        defaultColumns={columns}
        showBorders={true}
        onRowPrepared={this.onRowPrepared.bind(this)}
      />
            </div>
        </div>
    </div>
    </div>



    </div>
    );
  }

  
}
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  
function avatarRender() {
  return (
    <div className="form-avatar"></div>
  );
}



export default App;
