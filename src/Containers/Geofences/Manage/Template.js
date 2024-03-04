import React, { useState } from 'react';
import { connect } from 'react-redux'
import XLSX from 'xlsx';
import { exportExcel } from '../../../helpers/Export'
import DataGrid, { Column } from 'devextreme-react/data-grid';
import { Button, Modal } from "antd";
import { UploadOutlined, ContainerOutlined } from "@ant-design/icons";

let column_header = [
  "geofence_name",
  "geofence_description",
  "geofence_type",
  "geom_type",
  "radius",
  "coordinate",
  "icon_attach_id",
  "is_share",
  "is_preset",
  "is_hazard",
  "active_status",
  "alert_status",
  "al_in_geofence",
  "al_out_geofence",
  "al_time_inside_geofence_visible",
  "al_time_inside_geofence",
  "al_range_alert_time_visible",
  "al_start_alert",
  "al_end_alert",
  "al_start_odo_visible",
  "al_start_odo",
  "al_speed_limit_visible",
  "al_speed_limit",
  "geofence_name_en",
  "geofence_name_jp",
  "geofence_description_en",
  "geofence_description_jp"
]

const Template = (props) => {

  const [jsonData, setJsonData] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const importFile = async (file) => {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (event) => {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: "binary" });
      workbook.SheetNames.forEach(sheet => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
        console.log(rowObject);
        setJsonData(rowObject)
        setIsModalVisible(true)
      });
    }
    return false
  }

  const exportFile = () => {
    let json_data = [
      {
        "geofence_name": "",
        "geofence_description": "",
        "geofence_type": "",
        "geom_type": "",
        "radius": 10,
        "coordinate": "13.4124|100.2314",
        "icon_attach_id": 0,
        "is_share": false,
        "is_preset": false,
        "is_hazard": false,
        "active_status": "A",
        "alert_status": false,
        "al_in_geofence": false,
        "al_out_geofence": false,
        "al_time_inside_geofence_visible": false,
        "al_time_inside_geofence": "",
        "al_range_alert_time_visible": false,
        "al_start_alert": "00:00",
        "al_end_alert": "00:00",
        "al_start_odo_visible": false,
        "al_start_odo": "",
        "al_speed_limit_visible": false,
        "al_speed_limit": "",
        "geofence_name_en": "",
        "geofence_name_jp": "",
        "geofence_description_en": "",
        "geofence_description_jp": ""
      },
      {
        "geofence_name": "",
        "geofence_description": "",
        "geofence_type": "",
        "geom_type": "",
        "radius": 10,
        "coordinate": "14.638630672358326|101.12993591101728\n14.638570984088325|101.12932436736189\n14.638449012355684|101.12832926781736",
        "icon_attach_id": 0,
        "is_share": false,
        "is_preset": false,
        "is_hazard": false,
        "active_status": "A",
        "alert_status": false,
        "al_in_geofence": false,
        "al_out_geofence": false,
        "al_time_inside_geofence_visible": false,
        "al_time_inside_geofence": "",
        "al_range_alert_time_visible": false,
        "al_start_alert": "00:00",
        "al_end_alert": "00:00",
        "al_start_odo_visible": false,
        "al_start_odo": "",
        "al_speed_limit_visible": false,
        "al_speed_limit": "",
        "geofence_name_en": "",
        "geofence_name_jp": "",
        "geofence_description_en": "",
        "geofence_description_jp": ""
      }
    ]

    exportExcel({ column_header, json_data, file_name: 'file_name' })
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return (<>
    {isModalVisible &&
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="75%"
      >
        {/* {JSON.stringify(jsonData)} */}
        <DataGrid
          dataSource={jsonData}
          // rowAlternationEnabled={true}
          showBorders={true}
          columnAutoWidth={true}
          columnMinWidth={100}
          columnResizingMode={"widget"}
          allowColumnReordering={true}
        // onContentReady={this.onContentReady}
        >
          {column_header.map((dataField, index) => {
            return <Column key={index} dataField={dataField} />
          })}
        </DataGrid>
      </Modal>

    }
    <Button
      key="button-1"
      icon={<ContainerOutlined />}
      // onClick={() => exportFile()}
      style={{ marginRight: 2 }}>
      ตัวอย่าง
    </Button>
    {/* <Upload
      showUploadList={false}
    beforeUpload={(file) => importFile(file)}
    > */}
    <Button
      key="button-2"
      type="file"
      // onChange={(e) => importFile(e)}
      icon={<UploadOutlined />}
      // onClick={(e) => importFile(e)}
      style={{ marginRight: 2 }}>
      <span >Import</span>
    </Button>
    {/* </Upload> */}
  </>)
}

const mapStateToProps = (state) => ({
  // language: state.versatile.language,
});

export default connect(mapStateToProps)(Template);
