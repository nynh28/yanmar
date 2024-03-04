export function getStatusVehicle(status = 0) {
  const arr = [
    { code: '#ADADB2', name: 'realtime_4', nameTH: 'ไม่ส่งข้อมูล', nameEN: 'Offline', nameJA: 'オフライン' },
    { code: '#5DE648', name: 'realtime_1', nameTH: 'วิ่ง', nameEN: 'Driving', nameJA: '走行中' },
    { code: '#5856d6', name: 'realtime_2', nameTH: 'ดับเครื่อง', nameEN: 'Ign. OFF', nameJA: 'Ign. OFF' },
    { code: '#FFE600', name: 'realtime_3', nameTH: 'จอดไม่ดับเครื่อง', nameEN: 'Idling', nameJA: 'アイドリング' },
    { code: '#ADADB2', name: 'realtime_4', nameTH: 'ไม่ส่งข้อมูล', nameEN: 'Offline', nameJA: 'オフライン' },
    { code: '#ff3b30', name: 'realtime_5', nameTH: 'ความเร็วเกิน 60 กม./ชม.', nameEN: 'Over Speed 60 km/h', nameJA: '60km/h以上の速度超過' }
  ]
  return arr[status]
}

export function getStatusCard(status = 0) {
  const arr = [
    { code: '#cacaca', name: 'realtime_64' },
    { code: '#5de648', name: 'realtime_62' },
    { code: '#f86c8b', name: 'realtime_63' }
  ]
  return arr[status]
}
