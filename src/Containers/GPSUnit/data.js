// ---- array สำหรับเสร็จ หัวตาราง มีทั้งหมดสามรูปแบบ ----
//#region
/*
_______________________ หัวตารางแบบธรรมดา _______________________
{
  caption: 'IMEI',
  dataField: 'body.Device.IMEI'
}
______________________ หัวตารางแบบมีแยกย่อย ______________________
{
  caption: 'GPS',
  subTable: [
    {
      dataField: 'body.GPS.RSSI',
      caption: 'RSSI',
      dataType: 'number'
    },
    {
      dataField: 'body.GPS.Speed',
      caption: 'Speed',
      dataType: 'number'
    },
  ]
}
________ หัวตารางแบบมีแยกย่อย แต่ข้อมูลแยกย่อยข้างในเป็น array ________
_____ (ถ้าไม่ใส่ id ใน subTable จะ default id เป็น index + 1) ______
{
  caption: 'Analog',
  dataField: 'Analog',
  calculateCellValue: true,
  subTable: [
    { caption: 'Analog 1', key: 'PortNo', value: 'PortValue' },
    { caption: 'Analog 2', key: 'PortNo', value: 'PortValue' }
  ]
},
{
  caption: 'Temperatures Sensor',
  dataField: 'Sensor.Temperatures',
  calculateCellValue: true,
  subTable: [
    { caption: 'Value 1', id: '1', key: 'ID', value: 'value' },
    { caption: 'Status 1', id: '2', key: 'ID', value: 'Sts' }
  ]
},
_______________________________________________________________
*/
// #endregion

export const headerTable = [
  {
    caption: 'IMEI',
    dataField: 'body.Device.IMEI',
    fixed: true
  },
  {
    caption: 'GPS Date Time',
    dataField: 'body.Info.GpsDateTime',
    fixed: true
  },
  {
    caption: 'Server Date Time',
    dataField: 'body.Info.ServerDateTime',
    fixed: true
  },
  {
    caption: 'GPS',
    subTable: [
      {
        dataField: 'body.GPS.RSSI',
        caption: 'RSSI',
        dataType: 'number'
      },
      {
        dataField: 'body.GPS.Speed',
        caption: 'Speed',
        dataType: 'number'
      },
      {
        dataField: 'body.GPS.Heading',
        caption: 'Heading',
        dataType: 'number'
      },
      {
        dataField: 'body.GPS.DOP.PDOP',
        caption: 'PDOP',
        dataType: 'number'
      },
      {
        dataField: 'body.GPS.Satellite',
        caption: 'Satellite',
        dataType: 'number'
      },
      {
        dataField: 'body.GPS.GPSStatus',
        caption: 'GPS Status',
        dataType: 'number'
      },
      {
        dataField: 'body.GPS.Altitude',
        caption: 'Altitude',
        dataType: 'number'
      },
    ]
  },
  {
    caption: 'Battery',
    subTable: [
      {
        dataField: 'body.GPS.Battery.IntBattery',
        caption: 'Internal',
        dataType: 'number'
      },
      {
        dataField: 'body.GPS.Battery.ExtBattery',
        caption: 'Battery voltage (V)',
        dataType: 'number'
      }
    ]
  },
  {
    caption: 'Location',
    subTable: [
      {
        dataField: 'body.GPS.Location.Geometry.n_tumbon',
        caption: 'Tumbon'
      },
      {
        dataField: 'body.GPS.Location.Geometry.n_amphur',
        caption: 'Amphur'
      },
      {
        dataField: 'body.GPS.Location.Geometry.n_province',
        caption: 'Province'
      },
      {
        dataField: 'body.GPS.Location.Latitude',
        caption: 'Latitude'
      },
      {
        dataField: 'body.GPS.Location.Longitude',
        caption: 'Longitude'
      },
      {
        dataField: 'body.GPS.Location.Fence[0]',
        caption: 'Fence'
      },
    ]
  },
  {
    caption: 'Status',
    subTable: [
      {
        dataField: 'body.Vehicle.Status.HandBrakeSwtch',
        caption: 'Hand Brake Swtch'
      },
      {
        dataField: 'body.Vehicle.Status.ExhauseBrake',
        caption: 'EXHAUSE barke'
      },
      {
        dataField: 'body.Vehicle.Status.BrakeSwtch',
        caption: 'Foot Brake Switch'
      },
      {
        dataField: 'body.Vehicle.Status.AccStatus',
        caption: 'Acc Status'
      },
      {
        dataField: 'body.Vehicle.Status.ClutchSwitch',
        caption: 'Clutch Switch'
      },
      {
        dataField: 'body.Vehicle.Status.PTO',
        caption: 'PTO State'
      },
    ]
  },
  {
    caption: 'DTC Engine lamp',
    dataField: 'body.Vehicle.ConsoleLamp.EngineLamp'
  },
  {
    caption: 'Cruise control',
    dataField: 'body.Vehicle.StatusCruiseControl'
  },
  {
    caption: 'Alarm',
    subTable: [
      {
        dataField: 'body.Alarm.Gforce',
        caption: 'Gforce'
      },
      {
        dataField: 'body.Alarm.GforceCounter',
        caption: 'Gforce Counter'
      },
      {
        dataField: 'body.Alarm.Jammer',
        caption: 'Jammer'
      },
      {
        dataField: 'body.Alarm.JammerCounter',
        caption: 'Jammer Counter'
      },
      {
        dataField: 'body.Alarm.Collision',
        caption: 'Collision'
      },
      {
        dataField: 'body.Alarm.GSMAntenna',
        caption: 'GSM Antenna'
      },
      {
        dataField: 'body.Alarm.GPSAntenna',
        caption: 'GPS Antenna'
      },
      {
        dataField: 'body.Alarm.OverSpeed',
        caption: 'Over Speed'
      },
      {
        dataField: 'body.Alarm.ReturnNormalSpeed',
        caption: 'Return Normal Speed'
      },
      {
        dataField: 'body.Alarm.OverRPM',
        caption: 'Over RPM'
      },
      {
        dataField: 'body.Alarm.ReturnNormalRPM',
        caption: 'Return Normal RPM'
      },
      {
        dataField: 'body.Alarm.RemoveSIM',
        caption: 'Remove SIM'
      },
      {
        dataField: 'body.Alarm.SuddenStart',
        caption: 'Sudden Start'
      },
      {
        dataField: 'body.Alarm.SuddenAccelerator',
        caption: 'Sudden Accelerator'
      },
      {
        dataField: 'body.Alarm.SuddenBrake',
        caption: 'Sudden Brake'
      },
      {
        dataField: 'body.Alarm.SuddenTurn',
        caption: 'Sudden Turn'
      },
      {
        dataField: 'body.Alarm.Emergency',
        caption: 'Emergency'
      },
      {
        dataField: 'body.Alarm.Over4Hours',
        caption: 'Over 4 Hours'
      },
      {
        dataField: 'body.Alarm.Over8Hours',
        caption: 'Over 8 Hours'
      },
      {
        dataField: 'body.Alarm.Over10Hours',
        caption: 'Over 10 Hours'
      },
      {
        dataField: 'body.Alarm.TirePressure',
        caption: 'Tire Pressure'
      },
      {
        dataField: 'body.Alarm.DriverSleep',
        caption: 'Driver Sleep'
      },
      {
        dataField: 'body.Alarm.DangerousDriving',
        caption: 'Dangerous Driving'
      },
      {
        dataField: 'body.Alarm.PrevTime',
        caption: 'PrevTime'
      },
      {
        dataField: 'body.Alarm.PrevSpeed',
        caption: 'PrevSpeed'
      },
      {
        dataField: 'body.Alarm.PrevHeading',
        caption: 'PrevHeading'
      },
    ]
  },
  {
    caption: 'DTC Code',
    dataField: 'body.DTC[0].Code'
  },
  {
    caption: 'Accelerator Pedal Position (%)',
    dataField: 'body.Vehicle.AcceleratorPedalPercent'
  },
  {
    caption: 'Drive Time',
    dataField: 'body.Vehicle.DriveTime'
  },
  {
    caption: 'Coolant Temperature (*C)',
    dataField: 'body.Vehicle.Coolant.CoolantTemperature'
  },
  {
    caption: 'IdleTime',
    dataField: 'body.Vehicle.IdleTime'
  },
  {
    caption: 'Mileage (ODO : (m))',
    dataField: 'body.Vehicle.Mileage'
  },
  {
    caption: 'total  Engine Hours',
    dataField: 'body.Vehicle.EngineHour'
  },
  {
    caption: 'Engine speed (RPM)',
    dataField: 'body.Vehicle.RPM'
  },
  {
    caption: 'Gear',
    subTable: [
      {
        dataField: 'body.Vehicle.Gear.GearValue',
        caption: 'Grear number'
      },
      {
        dataField: 'body.Vehicle.Gear.ClustSwitch',
        caption: 'Clust Switch'
      },
    ]
  },
  {
    caption: 'Battery Voltage',
    dataField: 'body.Vehicle.BatteryVoltage'
  },
  {
    caption: 'Brake Pedal Percent',
    dataField: 'body.Vehicle.BrakePedalPercent'
  },
  {
    caption: 'Fuel',
    subTable: [
      {
        dataField: 'body.Vehicle.Fuel.FuelConsumption',
        caption: 'Fuel consumption (mL)'
      },
      {
        dataField: 'body.Vehicle.Fuel.FuelUsage',
        caption: 'Total idle fuel used'
      },
      {
        dataField: 'body.Vehicle.Fuel.FuelPercent',
        caption: 'Fuel Level'
      },
      {
        dataField: 'body.Vehicle.Fuel.FuelLiter',
        caption: 'Fuel Liter'
      },
      {
        dataField: 'body.Vehicle.Fuel.FuelInject',
        caption: 'Fuel Inject'
      },
    ]
  },
  {
    caption: 'Vehicle Model ID',
    dataField: 'body.Vehicle.VehicleModelID'
  },
  {
    caption: 'Parking Time',
    dataField: 'body.Vehicle.ParkingTime'
  },
  {
    caption: 'Vehicle speed (km/hr.)',
    dataField: 'body.Vehicle.VehicleSpeed'
  },
  {
    caption: 'CCID',
    dataField: 'body.Device.CCID'
  },
  {
    caption: 'Firmware Version',
    dataField: 'body.Device.FirmwareVersion'
  },
  {
    caption: 'MDVR',
    subTable: [
      {
        dataField: 'body.MDVR.Comu',
        caption: 'Com'
      },
      {
        dataField: 'body.MDVR.Cameras.1.Sts',
        caption: 'Cam1'
      },
      {
        dataField: 'body.MDVR.Cameras.2.Sts',
        caption: 'Cam2'
      },
      {
        dataField: 'body.MDVR.Cameras.3.Sts',
        caption: 'Cam3'
      },
      {
        dataField: 'body.MDVR.Cameras.4.Sts',
        caption: 'Cam4'
      },
      {
        dataField: 'body.MDVR.HDDs.1.Sts',
        caption: 'HDD_1'
      },
      {
        dataField: 'body.MDVR.SDs.2.Sts',
        caption: 'SD_2'
      },
      {
        dataField: 'body.MDVR.IN.1',
        caption: 'Acc'
      },
      {
        dataField: 'body.MDVR.IN.3',
        caption: 'CutCamera'
      },
    ]
  },
  {
    caption: 'Message Type',
    dataField: 'body.Info.MessageType'
  },
  {
    caption: 'IN',
    dataField: 'IN',
    calculateCellValue: true,
    subTable: [
      { caption: '1', key: 'PortNo', value: 'PortValue' },
      { caption: '2', key: 'PortNo', value: 'PortValue' },
      { caption: '3', key: 'PortNo', value: 'PortValue' },
      { caption: '4', key: 'PortNo', value: 'PortValue' },
      { caption: '5', key: 'PortNo', value: 'PortValue' },
      { caption: '6', key: 'PortNo', value: 'PortValue' },
      { caption: '7', key: 'PortNo', value: 'PortValue' },
      { caption: '8', key: 'PortNo', value: 'PortValue' }
    ]
  },
  {
    caption: 'OUT',
    dataField: 'OUT',
    calculateCellValue: true,
    subTable: [
      { caption: '1', key: 'PortNo', value: 'PortValue' },
      { caption: '2', key: 'PortNo', value: 'PortValue' },
      { caption: '3', key: 'PortNo', value: 'PortValue' },
      { caption: '4', key: 'PortNo', value: 'PortValue' },
      { caption: '5', key: 'PortNo', value: 'PortValue' },
      { caption: '6', key: 'PortNo', value: 'PortValue' },
      { caption: '7', key: 'PortNo', value: 'PortValue' },
      { caption: '8', key: 'PortNo', value: 'PortValue' },
      { caption: '9', key: 'PortNo', value: 'PortValue' },
      { caption: '10', key: 'PortNo', value: 'PortValue' }
    ]
  },
  {
    caption: 'G-Sensor',
    subTable: [
      {
        dataField: 'body.Sensor.Gforces[0].X',
        caption: 'X'
      },
      {
        dataField: 'body.Sensor.Gforces[0].Y',
        caption: 'Y'
      },
      {
        dataField: 'body.Sensor.Gforces[0].Z',
        caption: 'Z'
      },
      {
        dataField: 'body.Sensor.Gforces[0].total',
        caption: 'Total'
      },
    ]
  },
  {
    caption: 'Analog',
    dataField: 'Analog',
    calculateCellValue: true,
    subTable: [
      { caption: 'Analog 1', key: 'PortNo', value: 'PortValue' },
      { caption: 'Analog 2', key: 'PortNo', value: 'PortValue' }
    ]
  },
  {
    caption: 'Cement Sensor',
    subTable: [
      {
        dataField: 'body.Sensor.Cement.rpm',
        caption: 'rpm'
      },
      {
        dataField: 'body.Sensor.Cement.dir',
        caption: 'Direction'
      },
      {
        dataField: 'body.Sensor.Cement.counter',
        caption: 'counter'
      },
      {
        dataField: 'body.Sensor.Cement.countR',
        caption: 'Counter R'
      },
      {
        dataField: 'body.Sensor.Cement.countL',
        caption: 'Counter L'
      }
    ]
  },
  {
    caption: 'Driver',
    subTable: [
      {
        dataField: 'body.Driver.LicenseCardNo',
        caption: 'CardNo',
      },
      {
        dataField: 'body.Driver.LicenseCardType',
        caption: 'CardType',
      },
      {
        dataField: 'body.Driver.LicenseCardCountry',
        caption: 'CardCountry',
      },
      {
        dataField: 'body.Driver.LicenseCardValid',
        caption: 'CardValid',
      }
    ]
  },
  {
    caption: 'Temperatures Sensor',
    dataField: 'Sensor.Temperatures',
    calculateCellValue: true,
    subTable: [
      { caption: 'Value 1', id: '1', key: 'ID', value: 'value' },
      { caption: 'Status 1', id: '1', key: 'ID', value: 'Sts' }
    ]
  },
]

// ---- data สำหรับ เลือกให้ format ของ number เป็น ทศนิยม n ตำแหน่ง (default: 2 ตำแหน่ง) ----
export const dataFormatDecimal = {
  arrName: ['PDOP', 'Altitude'],
  numDecimal: {
    // 'PDOP': 3,
    // 'Altitude':2
  }
}



// export default { headerTable, dataFormatDecimal }
