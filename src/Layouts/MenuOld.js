export let listMenuAll = [
  // { id: 0, name: 'Landings Page', th: 'หน้าปก', en: 'Landings Page', icon: 'fa fa-th-large', liActive: null, ulCollapse: null, linkTo: "http://122.155.5.123/htdocs/wordpress/", subMenu: null },
  {
    id: 0, name: 'Home Page', th: 'หน้าแรก', en: 'Home Page', ja: 'Home Page', liActive: "active", ulCollapse: null, linkTo: "homePage", subMenu: null
  },
  {
    id: 1, name: 'Dashboard', th: 'ภาพรวม', en: 'Dashboard', ja: 'Dashboard', liActive: null, ulCollapse: null, linkTo: "dashboard", subMenu: null
  },
  {
    id: 2, name: 'Realtime', th: 'แผนงานล่าสุด', en: 'Realtime', ja: 'Realtime', liActive: null, ulCollapse: null, linkTo: "realtime", subMenu: null
  },
  {
    id: 7, name: 'History', th: 'ประวัติ', en: 'History', ja: 'History', liActive: null, ulCollapse: null, linkTo: "history", subMenu: null
  },
  {
    // id: 3, name: 'My Vehicles', th: 'รถบรรทุกของฉัน', en: 'My Vehicles',  liActive: null, ulCollapse: null, linkTo: "vehicle", subMenu: null
    id: 3, name: 'My Vehicles', th: 'รถบรรทุกของฉัน', en: 'My Vehicles', ja: 'My Vehicles', liActive: null, ulCollapse: null, linkTo: "ReportMyvehicle", subMenu: null
  },
  {
    id: 16, name: 'My Drivers', th: 'ผู้ขับขี่ของฉัน', en: 'My Drivers', ja: 'My Drivers', liActive: null, ulCollapse: null, linkTo: "Reportmydriver", subMenu: null
  },
  {
    id: 4, name: 'Management', th: 'งานของฉัน', en: 'Management', ja: 'Management', liActive: null, ulCollapse: "nav nav-second-level collapse", linkTo: null,
    subMenu: [
      {
        parentId: 9, name: 'Vehicle', th: 'รถบรรทุก', en: 'Vehicle', ja: 'Vehicle', liActive: null, ulCollapse: null, linkTo: "vehicle"
      },
      // {
      //   parentId: 9, name: 'Vehicle', th: 'รถบรรทุก', en: 'Vehicle', ja: 'Vehicle', liActive: null, ulCollapse: null, linkTo: "vehicle",
      //   subMenu: [
      //     {
      //       parentId: 100,
      //       name: "Vehicleeeee",
      //       th: "รถบรรทุก",
      //       en: "Vehicleeeee",
      //       ja: "Vehicleeeee",
      //       liActive: null,
      //       ulCollapse: null,
      //       linkTo: "vehicle"
      //     }
      //   ]
      // },
      { parentId: 10, name: 'Driver', th: 'ผู้ขับขี่', en: 'Driver', ja: 'Driver', liActive: null, ulCollapse: null, linkTo: "driver" },
      { parentId: 11, name: 'Customer', th: 'ลูกค้า', en: 'Customer', ja: 'Customer', liActive: null, display: 'none', linkTo: "customer" },
      { parentId: 12, name: 'Dealer', th: 'ตัวแทน', en: 'Dealer', ja: 'Dealer', liActive: null, display: 'none', linkTo: "dealer" },
      { parentId: 13, name: 'Job', th: 'งาน', en: 'Job', ja: 'Job', liActive: null, display: 'none', linkTo: "job" },
      { parentId: 26, name: 'Subscription', th: 'สมาชิก', en: 'Subscription', ja: 'Subscription', liActive: null, display: 'none', linkTo: "subscription" },
      { parentId: 33, name: 'Geofence Type', th: 'ประเภทขอบเขต', en: 'Geofence Type', ja: 'Geofence Type', liActive: null, display: 'none', linkTo: "geofenceType" },
      { parentId: 14, name: 'Geofence', th: 'ขอบเขต', en: 'Geofence', ja: 'Geofence', liActive: null, display: 'none', linkTo: "geofence" },
      { parentId: 37, name: 'Geofence Sharing', th: 'แชร์ขอบเขต', en: 'Geofence Sharing', ja: 'Geofence Sharing', liActive: null, display: 'none', linkTo: "geofenceSharing" },
      // { parentId: 101, name: 'Promotion', th: 'โปรโมชั่น', en: 'Promotion', liActive: null, display: 'none', linkTo: "promotion" },
      { parentId: 17, name: 'Maintenance', th: 'การดูแลระบบ', en: 'Maintenance', ja: 'Maintenance', liActive: null, display: 'none', linkTo: "maintenance" },
      { parentId: 15, name: 'Notification', th: 'การแจ้งเตือน', en: 'Notification', ja: 'Notification', liActive: null, display: 'none', linkTo: "notification" },
      // { parentId: 29, name: 'FormGenerator', th: 'FormGenerator ', en: 'FormGenerator', liActive: null, display: 'none', linkTo: 'formGenerator' },
      { parentId: 30, name: 'Vehicle Allocation', th: 'Vehicle Allocation', en: 'Vehicle Allocation', ja: 'Vehicle Allocation', liActive: null, display: 'none', linkTo: 'vehicle-allocation' },
      { parentId: 38, name: 'Users', th: 'ผู้ใช้งาน', en: 'Users', ja: 'Users', liActive: null, display: 'none', linkTo: 'users' }
    ]
  },
  {
    id: 5, name: 'Report', th: 'รายงาน', en: 'Report', ja: 'Report', liActive: null, ulCollapse: "nav nav-second-level collapse", linkTo: "report", subMenu: null,
    subMenu: [
      { parentId: 27, name: 'Ecotree', th: 'งาน', en: 'Ecotree', ja: 'Ecotree', liActive: null, display: 'none', linkTo: "reportTable" },
      // { parentId: 2, name: 'Realtime-Graph', th: 'งาน', en: 'Realtime-Graph', icon: 'fa fa-user-circle', liActive: null, display: 'none', linkTo: "reportGraph" },
      // { parentId: 3, name: 'Map',th: 'งาน', en: 'Map', icon: 'fa fa-user-circle', liActive: null, display: 'none', linkTo: "Map" },
      //{ parentId: 4, name: 'User Authentication', th: 'งาน', en: 'User Authentication', icon: 'fa fa-user-circle', liActive: null, display: 'none', linkTo: "Userauthentication" },
      //{ parentId: 5, name: 'Dashboard Report', th: 'งาน', en: 'Dashboard Report', icon: 'fa fa-user-circle', liActive: null, display: 'none', linkTo: "dashboardreport" },
      { parentId: 28, name: 'Report', th: 'งาน', en: 'Report', ja: 'Report', liActive: null, display: 'none', linkTo: "LayoutReport" },
      { parentId: 29, name: 'ServReport', th: 'งาน', en: 'ServReport', ja: 'ServReport', liActive: null, display: 'none', linkTo: "ServReport" }
    ]
  },
  {
    id: 6, name: 'Setting', th: 'การตั้งค่า', en: 'Setting', ja: 'Setting', liActive: null, ulCollapse: "nav nav-second-level collapse", linkTo: null,
    subMenu: [
      { parentId: 18, name: 'Main Setting', th: 'การตั้งค่าหลัก', en: 'Main Setting', ja: 'Main Setting', liActive: null, display: 'none', linkTo: "MainSetting" },
      { parentId: 20, name: 'Role Setting', th: 'การตั้งค่าบทบาท', en: 'Role Setting', ja: 'Role Setting', liActive: null, display: 'none', linkTo: "roleSetting" },
      { parentId: 21, name: 'User Setting', th: 'การตั้งค่าผู้ใช้งาน', en: 'User Setting', ja: 'User Setting', liActive: null, display: 'none', linkTo: "UserSetting" },
      { parentId: 22, name: 'Group Setting', th: 'การตั้งค่ากลุ่มผู้ใช้', en: 'Group Setting', ja: 'Group Setting', liActive: null, display: 'none', linkTo: "GroupSetting" },
      { parentId: 23, name: 'Driving Behavior', th: 'พฤติกรรมผู้ขับขี่', en: 'Driving Behavior', ja: 'Driving Behavior', liActive: null, display: 'none', linkTo: "drivingBehaviors" },
      { parentId: 24, name: 'Category Model', th: 'ลักษณะหมวดหมู่', en: 'Model Category', ja: 'Model Category', liActive: null, display: 'none', linkTo: 'modelCategory' },
      { parentId: 25, name: 'GPS Unit', th: 'กล่อง GPS', en: 'GPS Unit', ja: 'GPS Unit', liActive: null, display: 'none', linkTo: 'GPSUnit' },
      { parentId: 19, name: 'Role Management', th: 'การควบคุมบทบาท', en: 'Role Management', ja: 'Role Management', liActive: null, display: 'none', linkTo: 'roleManagement' }
    ]
  },
  {
    id: 34, name: 'Promotion', th: 'โปรโมชั่น', en: 'Promotion', ja: 'Promotion', liActive: null, ulCollapse: "nav nav-second-level collapse", linkTo: "null",
    subMenu: [
      { parentId: 35, name: 'Promotion', th: 'งาน', en: 'Promotion', ja: 'Promotion', liActive: null, display: 'none', linkTo: "promotion" },
      { parentId: 36, name: 'Promotion Setting', th: 'งาน', en: 'Promotion Setting', ja: 'Promotion Setting', liActive: null, display: 'none', linkTo: "promotionSetting" },
    ]
  }
  ,
  {
    id: 8, name: 'Message', th: 'ข้อความ', en: 'Message', ja: 'Message', liActive: null, ulCollapse: null, linkTo: "message", subMenu: null
  },
  {
    id: 42, name: 'Ranking', th: 'การจัดอันดับ', en: 'Ranking', liActive: null, ulCollapse: null, linkTo: "Ranking", subMenu: null
  },
  {
    id: 41, name: 'carGoLink', th: 'ข้อความ', en: 'Cargo Link', liActive: null, ulCollapse: null, linkTo: "CargoLink", subMenu: null
  },
  {
    id: 43, name: 'Route Planing', th: 'วางแผนเส้นทาง', en: 'Route Planing (VRP)', liActive: null, ulCollapse: null, linkTo: "routePlaning", subMenu: null
  }
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
  console.log("USER MENU : ", userMenus)

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
