import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactExport from "react-export-excel";
import { get } from 'lodash'
import { t } from '../../../Components/Translation'
import { momentDate } from '../../../Functions/DateMoment'
import { numberWithComma } from '../../../Functions/Calculation'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class DetailExport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columnNameEN: {
        'vinNo': 'VIN',
        'vehicleName': 'Vehicle Name',
        'licensePlate': 'License Plate',
        'gpsdate': 'Date/Time',
        'status': 'Status',
        'admin_level3_name': 'Sub District',
        'admin_level2_name': 'District',
        'admin_level1_name': 'Province',
        'latlng': 'Latitude, Longitude',
        'speed': 'Speed (km/h)',
        'rpm': 'RPM',
        'canbus_foot_brake': 'Brake',
        'canbus_exhaust_brake': 'Exhaust Brake',
        'canbus_dtc_engine': 'E/G Check Lamp',
        'canbus_clutch_switch': 'Clutch',
        'fuel': 'Fuel (%)',
        'fuelUsage': 'Fuel usage',
        'mileage': 'Mileage (km)',
        'canbus_cooltemp': 'Coolant temperature (°C)',
        'temperatures': 'Temp. Sensor',
        'pedal': 'Pedal (%)',
        'harshStart': 'Harsh Start',
        'harshAcceleration': 'Harsh Acceleration',
        'sharpTurn': 'Sharp Turn',
        'harshBrake': 'Harsh Brake',
        'gpsSignal': 'GPS Signal',
        'geofenceName': 'Geofence Name'
      },
      columnNameTH: {
        'vinNo': 'เลขตัวถัง',
        'vehicleName': 'ชื่อรถ',
        'licensePlate': 'เลขทะเบียนรถ',
        'gpsdate': 'วัน/เวลา',
        'status': 'สถานะ',
        'admin_level3_name': 'ตำบล',
        'admin_level2_name': 'อำเภอ',
        'admin_level1_name': 'จังหวัด',
        'latlng': 'ละติจูด, ลองติจูด',
        'speed': 'ความเร็ว (กม./ชม.)',
        'rpm': 'รอบ/นาที',
        'canbus_foot_brake': 'เบรค',
        'canbus_exhaust_brake': 'เบรคไอเสีย',
        'canbus_dtc_engine': 'ไฟสถานะเครื่องยนต์',
        'canbus_clutch_switch': 'คลัชต์',
        'fuel': 'น้ำมัน (%)',
        'fuelUsage': 'ปริมาณการใช้น้ำมันรวม',
        'mileage': 'ระยะทาง (กม.)',
        'canbus_cooltemp': 'อุณภูมิน้ำหล่อเย็น (°C)',
        'temperatures': 'อุณหภูมิห้องเย็น',
        'pedal': 'องศาคันเร่ง (%)',
        'harshStart': 'ออกตัวกระทันหัน',
        'harshAcceleration': 'เร่งความเร็วกระทันหัน',
        'sharpTurn': 'หักเลี้ยวกระทันหัน',
        'harshBrake': 'เบรคกระทันหัน',
        'gpsSignal': 'สัญญาณจีพีเอส',
        'geofenceName': 'ชื่อจีโอเฟนซ์'
      }
    }
  }

  statusName(speed) {
    let { language } = this.props

    let name = ''
    let speed_limit = 60

    if (speed_limit > 0 && speed > speed_limit) name = language == "en" ? 'Over Speed' : 'ความเร็วเกิน 60 กม./ชม.'
    else if (speed <= 2) name = language == "en" ? 'Idling' : 'จอดไม่ดับเครื่อง'
    else name = language == "en" ? 'Driving' : 'วิ่ง'

    return name
  }

  exportData(dataTrip) {
    let data = []
    for (let index in dataTrip) {
      if (dataTrip[index][6] == 't') {
        for (let locateIndex in dataTrip[index][29]) {
          let location = dataTrip[index][29][locateIndex]
          data.push({
            vinNo: this.props.vinNo,
            vehicleName: this.props.vehicleName,
            licensePlate: this.props.licensePlate,
            gpsdate: momentDate(location[0]),
            status: this.statusName(location[4]),
            admin_level1_name: location[19],
            admin_level2_name: location[20],
            admin_level3_name: location[21],
            latlng: location[2] + "," + location[3],
            speed: location[4] || 0,
            fuel: location[42],
            fuelUsage: location[63],
            rpm: location[38] || 0,
            canbus_cooltemp: location[39],
            temperatures: location[67],
            canbus_foot_brake: parseInt(location[45]),
            canbus_exhaust_brake: parseInt(location[46]),
            canbus_dtc_engine: parseInt(location[49]),
            canbus_clutch_switch: parseInt(location[48]),
            mileage: parseInt(location[62]),
            pedal: parseInt(location[43]),
            harshStart: parseInt(location[64]),
            harshAcceleration: parseInt(location[35]),
            sharpTurn: parseInt(location[37]),
            harshBrake: parseInt(location[36]),
            gpsSignal: parseInt(location[65]),
            geofenceName: location[66]
          })
        }
      }
      else {
        data.push({
          vinNo: this.props.vinNo,
          vehicleName: this.props.vehicleName,
          licensePlate: this.props.licensePlate,
          gpsdate: momentDate(dataTrip[index][0]),
          status: this.props.language == "en" ? "Ign.OFF" : "จอด",
          latlng: dataTrip[index][17],
          admin_level1_name: dataTrip[index][32][2],
          admin_level2_name: dataTrip[index][32][1],
          admin_level3_name: dataTrip[index][32][0],
          speed: dataTrip[index][2],
          fuel: 0,
          fuelUsage: 0,
          rpm: 0,
          canbus_cooltemp: 0,
          temperatures: 0,
          canbus_foot_brake: 0,
          canbus_exhaust_brake: 0,
          canbus_dtc_engine: 0,
          canbus_clutch_switch: 0,
          mileage: dataTrip[index][7],
          pedal: 0,
          harshStart: 0,
          harshAcceleration: 0,
          sharpTurn: 0,
          harshBrake: 0,
          gpsSignal: 0,
          geofenceName: ""
        })
      }
    }
    return data
  }


  render() {
    let { dataHistory, language, date, vehicleName, licensePlate, vinNo } = this.props
    let data = this.exportData(get(dataHistory, 'trips', []))

    let cn = language == "en" ? this.state.columnNameEN : this.state.columnNameTH
    //Detail_of_ชื่อรถ_ทะเบียน_vin 07-09-2020 00_00 to 07-09-2020 23_59
    let _vehicleName = vehicleName != null ? vehicleName : ""
    let _licensePlate = licensePlate != null ? licensePlate : ""
    let _vinNo = vinNo != null ? vinNo : ""
    let fileName = "Detail_of_" + _vehicleName + "_" + _licensePlate + "_" + _vinNo + "_" + date

    return (<ExcelFile filename={fileName} element={<span><i class="icon-excel-01" style={{ paddingRight: 5 }} />{t("history_8")}</span>}>
      <ExcelSheet data={data} name="Detail">
        <ExcelColumn label={cn.vinNo} value="vinNo" />
        <ExcelColumn label={cn.vehicleName} value="vehicleName" />
        <ExcelColumn label={cn.licensePlate} value="licensePlate" />
        <ExcelColumn label={cn.gpsdate} value="gpsdate" />
        <ExcelColumn label={cn.status} value="status" />
        <ExcelColumn label={cn.admin_level3_name} value="admin_level3_name" />
        <ExcelColumn label={cn.admin_level2_name} value="admin_level2_name" />
        <ExcelColumn label={cn.admin_level1_name} value="admin_level1_name" />
        <ExcelColumn label={cn.latlng} value="latlng" />
        <ExcelColumn label={cn.speed} value="speed" />
        <ExcelColumn label={cn.rpm} value="rpm" />
        <ExcelColumn label={cn.canbus_foot_brake} value="canbus_foot_brake" />
        <ExcelColumn label={cn.canbus_exhaust_brake} value="canbus_exhaust_brake" />
        <ExcelColumn label={cn.canbus_dtc_engine} value="canbus_dtc_engine" />
        <ExcelColumn label={cn.canbus_clutch_switch} value="canbus_clutch_switch" />
        <ExcelColumn label={cn.fuel} value="fuel" />
        <ExcelColumn label={cn.fuelUsage} value="fuelUsage" />
        <ExcelColumn label={cn.mileage} value="mileage" />
        <ExcelColumn label={cn.canbus_cooltemp} value="canbus_cooltemp" />
        {
          (this.props.dataLogin.userId == 117 || this.props.dataLogin.userId == 2656 || this.props.dataLogin.userId == 2657) ?
            [
              <ExcelColumn label={cn.temperatures} value="temperatures" />,
              <ExcelColumn label={cn.pedal} value="pedal" />
            ] :
            <ExcelColumn label={cn.pedal} value="pedal" />
        }
        <ExcelColumn label={cn.harshStart} value="harshStart" />
        <ExcelColumn label={cn.harshAcceleration} value="harshAcceleration" />
        <ExcelColumn label={cn.sharpTurn} value="sharpTurn" />
        <ExcelColumn label={cn.harshBrake} value="harshBrake" />
        <ExcelColumn label={cn.gpsSignal} value="gpsSignal" />
        <ExcelColumn label={cn.geofenceName} value="geofenceName" />
      </ExcelSheet>
    </ExcelFile>
    )
  }
}

const mapStateToProps = (state) => ({
  dataHistory: state.history.dataHistory,
  language: state.versatile.language,
  dataLogin: state.signin.dataLogin
});

export default connect(mapStateToProps)(DetailExport);