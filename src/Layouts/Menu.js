export let listMenuAll = [
  {
    id: 101, name: 'Home Page', th: 'หน้าแรก', en: 'Home', ja: 'ホーム', liActive: "active", ulCollapse: null, linkTo: "homePage", subMenu: null
  },
  {
    id: 102, name: 'Dashboard', th: 'ภาพรวม', en: 'Summary', ja: 'サマリー', liActive: null, ulCollapse: null, linkTo: "dashboard", subMenu: null
  },
  // {
  //   id: 101, name: 'Dashboard', th: 'HMST Dashboard', en: 'HMST Dashboard', ja: 'HMST Dashboard', liActive: null, ulCollapse: null, linkTo: "HMST_Dashboard", subMenu: null
  // },
  {
    id: 101, name: 'Dashboard', th: 'Logistics Dashboard', en: 'Logistics Dashboard', ja: 'Logistics Dashboard', liActive: null, ulCollapse: null, linkTo: "Monitor_Dashboard", subMenu: null
  },
  {
    id: 129, name: 'Dashboard', th: 'Control Room', en: 'Control Room', ja: 'Control Room', liActive: null, ulCollapse: "nav nav-second-level collapse", linkTo: "report", subMenu: null,
    subMenu: [
      { parentId: 144, name: 'Control Room Dashboard', th: 'Control Room Dashboard', en: 'Control Room Dashboard', ja: 'Control Room Dashboard', liActive: null, display: 'none', linkTo: "ControlRoom" },
      { parentId: 144, name: 'Sold Vehicle', th: 'รถที่ขายแล้ว', en: 'Sold Vehicle', ja: 'Sold Vehicle', liActive: null, display: 'none', linkTo: "SellingVehicle" },
    ]
  },

  // {
  //   id: 167, name: 'Realtime', th: 'ภาพรวมข้อมูลล่าสุด', en: 'Real Time Dashboard', ja: 'Real Time Dashboard', liActive: null, ulCollapse: null, linkTo: "realtimedashboard", subMenu: null
  // },
  {
    id: 167, name: 'Realtime', th: 'ภาพรวมข้อมูลล่าสุด', en: 'Real Time Dashboard', ja: 'リアルタイムダッシュボード', liActive: null, ulCollapse: null, linkTo: "realtime", subMenu: null
  },
  // {
  //   id: 103, name: 'Realtime', th: 'ข้อมูลล่าสุด', en: 'Realtime', ja: 'Realtime', liActive: null, ulCollapse: null, linkTo: "realtime", subMenu: null
  // },
  {
    id: 104, name: 'History', th: 'ข้อมูลย้อนหลัง', en: 'Tracking History', ja: '車両軌跡', liActive: null, ulCollapse: null, linkTo: "history", subMenu: null
  },
  {
    id: 105, name: 'My Vehicles', th: 'ข้อมูลรถขุด', en: 'My Vehicles', ja: '車両管理', liActive: null, ulCollapse: null, linkTo: "ReportMyvehicle", subMenu: null
  },
  {
    id: 106, name: 'My Drivers', th: 'คนขับของฉัน', en: 'My Drivers', ja: 'ドライバー', liActive: null, ulCollapse: null, linkTo: "Reportmydriver", subMenu: null
  },
  {
    id: 107, name: 'Job', th: 'งาน', en: 'Job', ja: '最適ルート検索', liActive: null, ulCollapse: null, linkTo: "dashboardJob", subMenu: null
  },
  {
    id: 110, name: 'Accessories', th: 'อุปกรณ์', en: 'Accessories', ja: 'Accessories', liActive: null, ulCollapse: "nav nav-second-level collapse", linkTo: "EmptyPage", subMenu: null,
    subMenu: [
      { parentId: 111, name: 'MDVR Monitoring', th: 'ดูภาพจาก MDVR', en: 'MDVR Monitoring', ja: 'MDVR Monitoring', liActive: null, display: 'none', linkTo: "EmptyPage" }
    ]
  },
  {
    id: 112, name: 'Maintenance', th: 'บำรุงรักษา', en: 'Maintenance', ja: 'Maintenance', liActive: null, ulCollapse: null, linkTo: "maintenance", subMenu: null
  },
  {
    id: 113, name: 'Report', th: 'รายงาน', en: 'Download', ja: 'ダウンロード', liActive: null, ulCollapse: "nav nav-second-level collapse", linkTo: "report", subMenu: null,
    subMenu: [
      { parentId: 114, name: 'Analysis Reports', th: 'รายงานวิเคราะห์', en: 'Analysis Reports', ja: '簡易レポート', liActive: null, display: 'none', linkTo: "reportTable" },
      // { parentId: 115, name: 'Other Reports', th: 'รายงานทั่วไป', en: 'Other Reports', ja: 'Other Reports', liActive: null, display: 'none', linkTo: "LayoutReport" },
      { parentId: 115, name: 'Other Reports', th: 'รายงานทั่วไป', en: 'Other Reports', ja: 'その他詳細レポート', liActive: null, display: 'none', linkTo: "OtherReportNew" },
      { parentId: 115, name: 'Dashboard', th: 'HMST Dashboard', en: 'HMST Dashboard', ja: 'HMST Dashboard', liActive: null, display: 'none', linkTo: "HMST_Dashboard" },
      {
        parentId: 116, name: 'Monitoring', th: 'ตรวจสอบ', en: 'Monitoring', ja: 'Monitoring', liActive: null, ulCollapse: null, linkTo: "EmptyPage",
        subMenu: [
          {
            parentId: 117, name: "Log Usage", th: "การใช้งานระบบ", en: "Log Usage", ja: "Log Usage", liActive: null, ulCollapse: null, linkTo: "EmptyPage"
          }
        ]
      },
    ]
  },
  {
    id: 118, name: 'Ranking', th: 'การแข่งขัน', en: 'Competition', ja: 'ランキング', liActive: null, ulCollapse: "nav nav-second-level collapse", linkTo: "report", subMenu: null,
    subMenu: [
      { parentId: 119, name: 'Driver Ranking', th: 'อันดับคนขับในบริษัท', en: 'Driver Ranking in My Company', ja: '社内ランキング', liActive: null, display: 'none', linkTo: "Ranking" },
      { parentId: 120, name: 'Competition', th: 'การแข่งขัน', en: 'HINO Driving Competition', ja: 'HINO Driving Competition', liActive: null, display: 'none', linkTo: "HMST_Driving_Competition" }
    ]
  },
  {
    id: 121, name: 'MessageNotification', th: 'ข้อความ และแจ้งเตือน', en: 'Message Notification', ja: 'Message Notification', liActive: null, ulCollapse: "nav nav-second-level collapse", linkTo: "report", subMenu: null,
    subMenu: [
      { parentId: 122, name: 'Broadcast Message', th: 'ส่งข้อความ', en: 'Broadcast Message', ja: 'Broadcast Message', liActive: null, display: 'none', linkTo: "EmptyPage" },
      { parentId: 123, name: 'Broadcast History', th: 'ข้อความที่ส่ง', en: 'Broadcast History', ja: 'Broadcast History', liActive: null, display: 'none', linkTo: "EmptyPage" },
      { parentId: 124, name: 'Message History', th: 'ข้อความที่ได้รับ', en: 'Message History', ja: 'Message History', liActive: null, display: 'none', linkTo: "EmptyPage" }
    ]
  },
  {
    id: 125, name: 'Working', th: 'Working', en: 'Working', ja: 'Working', liActive: null, ulCollapse: "nav nav-second-level collapse", linkTo: "report", subMenu: null,
    subMenu: [
      { parentId: 126, name: 'Subscription', th: 'งานลงทะเบียน', en: 'Subscription', ja: 'Subscription', liActive: null, display: 'none', linkTo: "subscription" },
      { parentId: 127, name: 'GPSInstallation', th: 'งานติดตั้ง GPS', en: 'GPS Installation', ja: 'GPS Installation', liActive: null, display: 'none', linkTo: "Management/InstallingApproval" },
      { parentId: 128, name: 'GPSChanging', th: 'งานเปลี่ยน GPS', en: 'Compettition', ja: 'ランキング', liActive: null, display: 'none', linkTo: "EmptyPage" },
      { parentId: 172, name: 'Installation Report', th: 'Installation Report', en: 'Installation Report', ja: 'Installation Report', liActive: null, display: 'none', linkTo: "InstallationReport" }
    ]
  },
  {
    id: 129, name: 'Management', th: 'การตั้งค่า', en: 'Setting', ja: '設定', liActive: null, ulCollapse: "nav nav-second-level collapse", linkTo: null,
    subMenu: [
      { parentId: 144, name: 'General', th: 'ทั่วไป', en: 'General', ja: '一般', liActive: null, display: 'none', linkTo: "General" },
      { parentId: 169, name: 'User Profile', th: 'ข้อมูลส่วนตัว', en: 'User Profile', ja: 'アカウント管理', liActive: null, display: 'none', linkTo: "updateProfile" },
      // { parentId: 170, name: 'Change Password', th: 'เปลี่ยนรหัสผ่าน', en: 'Change Password', ja: 'Change Password', liActive: null, display: 'none', linkTo: "changePassword" },
      { parentId: 130, name: 'User', th: 'ผู้ใช้งาน', en: 'User', ja: 'ユーザー', liActive: null, display: 'none', linkTo: "UserSetting" },
      { parentId: 131, name: 'Role', th: 'สิทธิ์การใช้งาน', en: 'Role', ja: '役職', liActive: null, display: 'none', linkTo: "roleSetting" },
      { parentId: 132, name: 'Dealer', th: 'ตัวแทน', en: 'Dealer', ja: 'Dealer', liActive: null, display: 'none', linkTo: "dealer" },
      { parentId: 133, name: 'Customer', th: 'ลูกค้า', en: 'Customer', ja: 'お客様', liActive: null, display: 'none', linkTo: "customer" },
      { parentId: 136, name: 'Vehicle', th: 'ข้อมูลรถขุด', en: 'Vehicles', ja: '車両', liActive: null, ulCollapse: null, linkTo: "vehicle" },
      { parentId: 134, name: 'Driver', th: 'คนขับของฉัน', en: 'Drivers', ja: 'ドライバー', liActive: null, ulCollapse: null, linkTo: "driver" },
      { parentId: 135, name: 'Fleet', th: 'ฟลีท', en: 'Fleet', ja: 'Fleet', liActive: null, ulCollapse: null, linkTo: "Fleet" },
      { parentId: 137, name: 'Vehicle Allocation', th: 'จัดสรรรถ', en: 'Vehicle Allocation', ja: '車両割り当て', liActive: null, display: 'none', linkTo: 'vehicle-allocation' },
      { parentId: 138, name: 'Geofence Type', th: 'ประเภทสถานที่สำคัญ', en: 'Geofences Type', ja: 'ジオフェンスタイプ', liActive: null, display: 'none', linkTo: "geofenceType" },
      { parentId: 139, name: 'Geofence', th: 'สถานที่สำคัญ (จีโอเฟนซ์)', en: 'Geofences', ja: 'ジオフェンス', liActive: null, display: 'none', linkTo: "geofence" },
      { parentId: 140, name: 'Geofence Sharing', th: 'แบ่งปันสถานที่สำคัญ', en: 'Geofences Sharing', ja: 'ジオフェンス共有', liActive: null, display: 'none', linkTo: "geofenceSharing" },
      { parentId: 141, name: 'Customer Trip', th: 'กำหนด Trip', en: 'Customer Trip', ja: 'Customer Trip', liActive: null, display: 'none', linkTo: "EmptyPage" },
      { parentId: 142, name: 'GroupUser', th: 'กลุ่มผู้ใช้งาน', en: 'Group User', ja: 'Group User', liActive: null, display: 'none', linkTo: "EmptyPage" },
      // { parentId: 26, name: 'Subscription', th: 'สมาชิก', en: 'Subscription', ja: 'Subscription', liActive: null, display: 'none', linkTo: "subscription" },
      // { parentId: 15, name: 'Notification', th: 'การแจ้งเตือน', en: 'Notification', ja: 'Notification', liActive: null, display: 'none', linkTo: "notification" },
      // // { parentId: 101, name: 'Promotion', th: 'โปรโมชั่น', en: 'Promotion', liActive: null, display: 'none', linkTo: "promotion" },
      // { parentId: 17, name: 'Maintenance', th: 'การดูแลระบบ', en: 'Maintenance', ja: 'Maintenance', liActive: null, display: 'none', linkTo: "maintenance" },
      // { parentId: 13, name: 'Job', th: 'งาน', en: 'Job', ja: 'Job', liActive: null, display: 'none', linkTo: "job" },
    ]
  },
  {
    id: 143, name: 'Settings', th: 'การตั้งค่า', en: 'Setting2', ja: 'Setting', liActive: null, ulCollapse: "nav nav-second-level collapse", linkTo: null,
    subMenu: [
      { parentId: 145, name: 'Language', th: 'ภาษา', en: 'Language', ja: 'Language', liActive: null, display: 'none', linkTo: "EmptyPage" },
      { parentId: 146, name: 'Wording', th: 'การแสดงข้อความ', en: 'Wording', ja: 'Wording', liActive: null, display: 'none', linkTo: "EmptyPage" },
      { parentId: 147, name: 'Agreement', th: 'ข้อตกลงการใช้บริการ', en: 'Agreement', ja: 'Agreement', liActive: null, display: 'none', linkTo: "EmptyPage" },
      { parentId: 148, name: 'Application Version', th: 'เวอร์ชันของ Application', en: 'Application Version', ja: 'Application Version', liActive: null, display: 'none', linkTo: "EmptyPage" },
      { parentId: 149, name: 'Favourite Menu', th: 'เมนูที่ใช้บ่อย', en: 'Favourite Menu', ja: 'Favourite Menu', liActive: null, display: 'none', linkTo: "EmptyPage" },
      { parentId: 150, name: 'Alert', th: 'การแจ้งเตือน', en: 'Alert', ja: 'Alert', liActive: null, display: 'none', linkTo: "alertSetting" },
      {
        parentId: 151, name: 'Promotion', th: 'โปรโมชั่น', en: 'Promotion', liActive: null, display: 'none', linkTo: "promotion",
        subMenu: [
          { parentId: 164, name: 'Promotion', th: 'โปรโมชั่น', en: 'Promotion', ja: 'Promotion', liActive: null, display: 'none', linkTo: "promotion" },
          { parentId: 165, name: 'Promotion Setting', th: 'การตั้งค่าโปรโมชั่น', en: 'Promotion Setting', ja: 'Promotion Setting', liActive: null, display: 'none', linkTo: "promotionSetting" },
        ]
      },
      { parentId: 152, name: 'Driving Behavior', th: 'พฤติกรรมผู้ขับขี่', en: 'Driving Behavior', ja: 'Driving Behavior', liActive: null, display: 'none', linkTo: "drivingBehaviors" },
      { parentId: 153, name: 'Driving Compettition', th: 'การแข่งขัน', en: 'Driving Compettition', ja: 'Driving Compettition', liActive: null, display: 'none', linkTo: "EmptyPage" },
      { parentId: 154, name: 'Home Conten', th: 'ข่าวสารหน้าหลัก', en: 'Home Content', ja: 'Home Content', liActive: null, display: 'none', linkTo: "EmptyPage" },
      { parentId: 166, name: 'GPS Unit', th: 'กล่อง GPS', en: 'GPS Unit', ja: 'GPS Unit', liActive: null, display: 'none', linkTo: 'GPSUnit' },
      // { parentId: 18, name: 'Main Setting', th: 'การตั้งค่าหลัก', en: 'Main Setting', ja: 'Main Setting', liActive: null, display: 'none', linkTo: "MainSetting" },
      // { parentId: 21, name: 'User Setting', th: 'การตั้งค่าผู้ใช้งาน', en: 'User Setting', ja: 'User Setting', liActive: null, display: 'none', linkTo: "UserSetting" },
      // { parentId: 24, name: 'Category Model', th: 'ลักษณะหมวดหมู่', en: 'Model Category', ja: 'Model Category', liActive: null, display: 'none', linkTo: 'modelCategory' },
      // { parentId: 19, name: 'Role Management', th: 'การควบคุมบทบาท', en: 'Role Management', ja: 'Role Management', liActive: null, display: 'none', linkTo: 'roleManagement' },
    ]
  },
  {
    id: 108, name: 'carGoLink', th: 'Cargo Link', en: 'Cargo Link', ja: 'カーゴリンク', liActive: null, ulCollapse: null, linkTo: "CargoLink", subMenu: null
  },
  {
    id: 109, name: 'Route Planing', th: 'วางแผนเส้นทาง', en: 'Route Planing (VRP)', ja: '最適ルート検索 (VRP)', liActive: null, ulCollapse: null, linkTo: "routePlaning", subMenu: null
  },
  {
    id: 155, name: 'Master Data', th: 'ข้อมูลทั่วไป', en: 'Master Data', ja: 'Master Data', liActive: null, ulCollapse: "nav nav-second-level collapse", linkTo: "EmptyPage", subMenu: null,
    subMenu: [
      {
        parentId: 156, name: 'HMST', th: 'HMST', en: 'HMST', ja: 'HMST', liActive: null, ulCollapse: null, linkTo: "EmptyPage",
        subMenu: [
          { parentId: 157, name: "Model", th: "รุ่นรถ", en: "Model", ja: "Model", liActive: null, ulCollapse: null, linkTo: "EmptyPage" },
          { parentId: 158, name: "Category Type", th: "ประเภทรถ", en: "Category Type", ja: "Category Type", liActive: null, ulCollapse: null, linkTo: "MasterData/HMST/CategoryType" },
          { parentId: 159, name: "Class Type", th: "หมวดหมู่รถ", en: "Class Type", ja: "Class Type", liActive: null, ulCollapse: null, linkTo: "MasterData/HMST/ClassType" },
          { parentId: 160, name: "Engine Series", th: "เครื่องยนต์", en: "Engine Series", ja: "Engine Series", liActive: null, ulCollapse: null, linkTo: "MasterData/HMST/EngineSeries" },
          { parentId: 161, name: "Model Part", th: "อะไหล่", en: "Model Part", ja: "Model Part", liActive: null, ulCollapse: null, linkTo: "EmptyPage" }
        ]
      },
      {
        parentId: 162, name: 'Cargo Link', th: 'Cargo Link', en: 'Cargo Link', ja: 'Cargo Link', liActive: null, ulCollapse: null, linkTo: "EmptyPage",
        subMenu: [
          {
            parentId: 163, name: "Category Type", th: "ประเภทรถ", en: "Category Type", ja: "Category Type", liActive: null, ulCollapse: null, linkTo: "EmptyPage"
          }
        ]
      }
    ]
  },
  // {
  //   id: 170, name: 'Management', th: 'การจัดการ', en: 'Management', ja: 'Management', liActive: null, ulCollapse: "nav nav-second-level collapse", linkTo: null, subMenu: null,
  //   subMenu: [
  //     { parentId: 172, name: 'Installing Approval', th: 'Installing Approval', en: 'Installing Approval', ja: 'Installing Approval', liActive: null, display: 'none', linkTo: "Management/InstallingApproval" },
  //   ]
  // },
  {
    id: 168, name: 'Help', th: 'ช่วยเหลือ', en: 'Help', ja: 'ヘルプ', liActive: "", ulCollapse: null, linkTo: "Help", subMenu: null
  }



  // {
  //   id: 34, name: 'Promotion', th: 'โปรโมชั่น', en: 'Promotion', ja: 'Promotion', liActive: null, ulCollapse: "nav nav-second-level collapse", linkTo: "null",
  //   subMenu: [
  //     { parentId: 35, name: 'Promotion', th: 'งาน', en: 'Promotion', ja: 'Promotion', liActive: null, display: 'none', linkTo: "promotion" },
  //     { parentId: 36, name: 'Promotion Setting', th: 'งาน', en: 'Promotion Setting', ja: 'Promotion Setting', liActive: null, display: 'none', linkTo: "promotionSetting" },
  //   ]
  // } ,
  // {
  //   id: 8, name: 'Message', th: 'ข้อความ', en: 'Message', ja: 'Message', liActive: null, ulCollapse: null, linkTo: "message", subMenu: null
  // },
  // {
  //   id: 42, name: 'Ranking', th: 'การจัดอันดับ', en: 'Ranking', liActive: null, ulCollapse: null, linkTo: "Ranking", subMenu: null
  // }
]

// ------------------------ set Role ------------------------
// let listRole = {
//   0: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5, sub: [1, 2, 3, 4, 5, 6, 9] }, { id: 6 }, { id: 8 }, { id: 9 }],
//   Dealer: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5, sub: [1, 2, 4] }, { id: 6 }, { id: 8 }, { id: 9 }],
//   Customer: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5, sub: [1, 2, 5] }, { id: 6 }, { id: 8 }, { id: 9 }],
// }


function setSubMenu() {

}

export function setMenu(userMenus) {
  let newListMenu = []

  for (let i in listMenuAll) {
    let menu = userMenus.find(x => x.menuId === listMenuAll[i].id)
    if (menu || listMenuAll[i].id === 0) {
      let newM = { ...listMenuAll[i] }
      let lstSubM = listMenuAll[i].subMenu
      if (lstSubM) {
        let newSubListMenu = []
        for (let j in lstSubM) {
          let subM = userMenus.find(x => x.menuId === lstSubM[j].parentId)
          if (subM && subM.parentMenuId === menu.menuId) {
            newSubListMenu.push({ ...lstSubM[j] })
          }
        }
        newM.subMenu = newSubListMenu
      }
      newListMenu.push(newM)
    }
  }


  return newListMenu
}
