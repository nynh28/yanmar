/* ____________________ Format Menu ____________________
  ------------------ LIST_MENU_ALL ------------------
  [
    { id: 999, name: "", url: "maintenance", icon: "fas fa-tools", display: true },
    { id: 999, name: "", icon: "", subMenu: [
      {id: 999, name: "", url: ""},
      {id: 999, name: "", url: "", icon: "", subMenu: []},
    ] }
  ]
    => id (type: number) *Required
            - สามารถใส่ไอดี 999 เพื่อให้ขึ้นแสดงเป็นการ test เมนูก่อนได้
    => name (type: string)
    => url (type: string)
           - กรณีมี subMenu ไม่ต้องใส่
    => icon (type: string, array)
           - string: รูปที่เป็น svg ใส่ file SVGIcon.js
           - array: รูปที่เป็น class font <i></i>
           - กรณีที่เป็น subMenu lv.2 ขึ้นไป ไม่ต้องใส่
    => subMenu (type: array)
    => disable (type: boolean)
  ----------------------------------------------------
  ----------- MENU ONLY USER AND USERLEVEL -----------
  ONLY_USER_ID      => { userId: [ menuId, menuId ] }
  ONLY_USER_LEVEL_ID => { userLevelId: [ menuId, menuId ] }
  ----------------------------------------------------
  ---------- CLOES MENU USER AND USERLEVEL -----------
  CLOES_USER_ID      => { userId: [ menuId, menuId ] }
  CLOES_USER_LEVEL_ID => { userLevelId: [ menuId, menuId ] }
  ----------------------------------------------------
  ----------------- CHANGE_NAME_ULID -----------------
  EX. format
  {
    userLevelId: { menuId: name, menuId: name }
  }
  ----------------------------------------------------
____________________________________________________________ */
import { get } from "lodash";

const ONLY_USER_ID = {
  956: [178],
  957: [178],
};
const ONLY_USER_LEVEL_ID = {
  // 32: [167],
};
const CLOES_USER_ID = {
  // 1129: [112],
};
const CLOES_USER_LEVEL_ID = {
  // 32: [167],
};
const CHANGE_NAME_ULID = {
  // 21: { 105: 'side_menu_74', 106: 'side_menu_75', 136: 'side_menu_74', 134: 'side_menu_75' },
  // 31: { 105: 'side_menu_74', 106: 'side_menu_75' },
  // 32: { 105: 'side_menu_74', 106: 'side_menu_75' },
};

export const LIST_MENU_ALL = [
  // Home Page
  { id: 101, name: "side_menu_1", url: "homePage", icon: ["fa fa-home"] },
  //Tractor HomePage
  {
    id: 214,
    name: "side_menu_1",
    url: "Tractor/homePage",
    icon: ["fa fa-home"],
  },
  // Real Time Dashboard
  // { id: 167, name: "side_menu_3", url: "realtime", icon: "Realtime" },
  //realtime tractor
  { id: 213, name: "side_menu_3", url: "Tractor/realtime", icon: "Realtime" },
  // Summary
  // { id: 102, name: "side_menu_2", url: "dashboard", icon: "Dashboard" },
  // My Vehicles
  // {
  //   id: 105,
  //   name: "side_menu_74",
  //   url: "ReportMyvehicle",
  //   icon: "My Vehicles",
  //   iconUrl: "/icons/Excavator-black.svg",
  // },
  // // Maintenance
  // {
  //   id: 112,
  //   name: "side_menu_10",
  //   url: "maintenance",
  //   icon: ["fas fa-tools"],
  //   urlChildren: ["maintenance/information"],
  //   icon: ["fas fa-tools"],
  // },
  // Maintenance History
  // {
  //   id: 183,
  //   name: "side_menu_84",
  //   url: "MaintenanceHistory",
  //   icon: "MaintenanceHistory",
  // },
  // {
  //   id: 212,
  //   name: "side_menu_89", //รายงานการใช้งานรถขุด
  //   url: "working-report",
  //   icon: "Report",
  // },
  // // Tracking History
  // {
  //   id: 104,
  //   name: "side_menu_4",
  //   url: "TrackingHistory",
  //   icon: "History",
  //   urlChildren: ["TrackingHistory-Route"],
  // },
  // {
  //   id: 221,
  //   name: "side_menu_4",
  //   url: "Tracktor/TrackingHistory",
  //   icon: "History",
  //   urlChildren: ["/Tracktor/TrackingHistory-Route"],
  // },
  // Control room Dashboard : Dealer
  // {
  //   id: 177,
  //   name: "side_menu_71",
  //   url: "controlRoomDashboard",
  //   icon: "Dashboard",
  // },
  {
    id: 219,
    name: "side_menu_71",
    url: "Tractor/StockInventory",
    icon: "Dashboard",
  },
  // Download
  // {
  //   id: 113,
  //   name: "side_menu_11",
  //   icon: "Report",
  //   subMenu: [
  //     { id: 114, name: "side_menu_12", url: "reportTable" }, // Analysis Reports
  //     {
  //       id: 115,
  //       name: "side_menu_13",
  //       url: "OtherReportNew",
  //       urlChildren: ["OtherReportNew/Summary", "OtherReportNew/Detail"],
  //     }, // Other Reports
  //     { id: 188, name: "Geofence Report", url: "GeofenceReport" }, // Geofence Report
  //     { id: 179, name: "side_menu_80", url: "DrivingReport" }, // Daily Reports
  //     {
  //       id: 116,
  //       name: "side_menu_14",
  //       subMenu: [
  //         // Monitoring
  //         { id: 117, name: "side_menu_15", url: "EmptyPage" }, // Log Usage
  //       ],
  //     },
  //   ],
  // },
  // Subscription
  {
    id: 211,
    name: "side_menu_24",
    icon: ["fa fa-file-text"],
    url: "subscription",
    urlChildren: ["subscription/subscriptionForm"],
  },

   //// New Menu Tractor
   {
    id: 229,
    name: "Maintenance",
    icon: 'Maintenance',
    subMenu: [
      {
        id: 230,
        "parent_menu_id": 229,
        "url": "Tractor/dashboard",
        "name": "Dashboard",
        "icon_attach_id": "1"
      },
      {
        id: 231,
        "parent_menu_id": 229,
        "url": "Tractor/Machine",
        "name": "Machine",
        "icon_attach_id": "1"
      },
      {
        id: 232,
        "parent_menu_id": 229,
        "url": "Tractor/maintenance",
        "name": "Maintenance",
        "icon_attach_id": "1"
      },
      {
        id: 233,
        "parent_menu_id": 229,
        "url": "Tractor/maintenance-setting",
        "name": "Setting",
        "icon_attach_id": "1"
      }
    ]
  },
  {
    id: 218,
    name: "side_menu_24",
    icon: ["fa fa-file-text"],
    url: "Tractor/subscription",
    urlChildren: ["Tractor/subscription/subscriptionForm"],
  },
  // Setting
  {
    id: 129,
    name: "side_menu_28",
    icon: "Management",
    subMenu: [
      {
        id: 215,
        name: "side_menu_33",
        url: "Tractor/dealer",
        urlChildren: ["Tractor/dealer/dealerForm"],
      },
      {
        id: 216,
        name: "side_menu_90",
        url: "Tractor/vehicle",
        urlChildren: ["Tractor/vehicle/vehicleForm"],
      },
      { id: 144, name: "side_menu_29", url: "General" }, // General
      { id: 169, name: "side_menu_30", url: "updateProfile" },
      { id: 220, name: "side_menu_30", url: "Tractor/updateProfile" }, // User Profile
      {
        id: 130,
        name: "side_menu_31",
        url: "UserSetting",
        urlChildren: ["userSetting/userSettingForm"],
      }, // User
      { id: 131, name: "side_menu_32", url: "roleSetting" }, // Role
      { id: 132, name: "side_menu_33", url: "dealer" }, // Dealer
      {
        id: 133,
        name: "side_menu_34",
        url: "customer",
        urlChildren: ["customer/customerForm", "customer/addCustomerAdmin"],
      }, // Customer
      {
        id: 217,
        name: "side_menu_34",
        url: "Tractor/customer",
        urlChildren: ["Tractor/customer/customerForm"],
      }, // Customer
      {
        id: 136,
        name: "side_menu_35",
        url: "vehicle",
        urlChildren: ["vehicle/vehicleForm"],
      }, // Vehicle
      // {
      //   id: 186,
      //   name: "side_menu_87",
      //   url: "Devices",
      //   urlChildren: ["Devices/AddDeviceForm"],
      // }, // Devices
      // {
      //   id: 134,
      //   name: "side_menu_36",
      //   url: "driver",
      //   urlChildren: ["driver/driverForm"],
      // }, // Driver
      // { id: 135, name: "side_menu_37", url: "Fleet" }, // Fleet
      // { id: 137, name: "side_menu_38", url: "vehicle-allocation" }, // Vehicle Allocation
      // {
      //   id: 138,
      //   name: "side_menu_39",
      //   url: "geofenceType",
      //   urlChildren: ["geofenceTypeForm"],
      // }, // Geofence Type
      // {
      //   id: 139,
      //   name: "side_menu_40",
      //   url: "Geofences",
      //   // urlChildren: ["geofenceForm"],
      // }, // Geofence
      { id: 140, name: "side_menu_41", url: "geofenceSharing" }, // Geofence Sharing
      { id: 141, name: "side_menu_42", url: "EmptyPage" }, // Customer Trip
      { id: 142, name: "side_menu_43", url: "EmptyPage" }, // Group User
      { id: 227, name: "User", url: "Tractor/user" }, // Maintenance Setting
    ],
  },
  // Control Room : Hino
  // {
  //   id: 173,
  //   name: "side_menu_70",
  //   icon: "Dashboard",
  //   subMenu: [
  //     { id: 174, name: "side_menu_78", url: "ControlRoom" }, // Control Room Dashboard
  //     { id: 175, name: "side_menu_72", url: "SellingVehicle" }, // Sold Vehicle
  //     { id: 176, name: "side_menu_73", url: "HMST_Dashboard" }, // HMST Dashboard
  //   ],
  // },
  // Playback History
  // { id: 180, name: "side_menu_83", url: "Playback", icon: "Playback" },

  // // My Drivers
  // { id: 106, name: "side_menu_6", url: "Reportmydriver", icon: "My Drivers" },
  // // Job
  // { id: 107, name: "side_menu_7", url: "dashboardJob", icon: "Job" },
  // // Accessories
  // {
  //   id: 110,
  //   name: "side_menu_8",
  //   icon: "Accessories",
  //   subMenu: [{ id: 111, name: "side_menu_9", url: "EmptyPage" }],
  // },

  // Competition
  // {
  //   id: 118,
  //   name: "side_menu_16",
  //   icon: "Ranking",
  //   subMenu: [
  //     { id: 119, name: "side_menu_17", url: "Ranking" }, // Driver Ranking in My Company
  //     { id: 120, name: "side_menu_18", url: "DrivingCompetition" }, // HINO Driving Competition
  //   ],
  // },
  // {
  //   id: 121,
  //   name: "side_menu_19",
  //   icon: "MessageNotification",
  //   subMenu: [
  //     { id: 122, name: "side_menu_20", url: "EmptyPage" }, // Broadcast Message
  //     { id: 123, name: "side_menu_21", url: "EmptyPage" }, // Broadcast History
  //     { id: 124, name: "side_menu_22", url: "EmptyPage" }, // Message History
  //   ],
  // },
  // Setting2
  // {
  //   id: 143,
  //   name: "side_menu_44",
  //   icon: "Settings",
  //   subMenu: [
  //     { id: 145, name: "side_menu_45", url: "EmptyPage" }, // Language
  //     { id: 146, name: "side_menu_46", url: "EmptyPage" }, // Wording
  //     { id: 147, name: "side_menu_47", url: "EmptyPage" }, // Agreement
  //     { id: 148, name: "side_menu_48", url: "EmptyPage" }, // Application Version
  //     { id: 149, name: "side_menu_49", url: "EmptyPage" }, // Favourite Menu
  //     { id: 150, name: "side_menu_50", url: "alertSetting" }, // Alert
  //     {
  //       id: 151,
  //       name: "side_menu_51",
  //       subMenu: [
  //         // Promotion
  //         { id: 164, name: "side_menu_52", url: "promotion" }, // Promotion
  //         { id: 165, name: "side_menu_53", url: "promotionSetting" }, // Promotion Setting
  //       ],
  //     },
  //     { id: 152, name: "side_menu_54", url: "drivingBehaviors" }, // Driving Behavior
  //     { id: 153, name: "side_menu_55", url: "EmptyPage" }, // Driving Compettition
  //     { id: 154, name: "side_menu_56", url: "EmptyPage" }, // Home Content
  //     { id: 166, name: "GPS Unit", url: "GPSUnit" }, // Home Content
  //   ],
  // },
  // Cargo Link
  // { id: 108, name: "side_menu_58", url: "CargoLink", icon: "carGoLink" },
  // Route Planing (VRP)
  // { id: 109, name: "side_menu_59", url: "routePlaning", icon: "Route Planing" },
  // Master Data
  // {
  //   id: 155,
  //   name: "side_menu_60",
  //   icon: "Master Data",
  //   subMenu: [
  //     {
  //       id: 156,
  //       name: "side_menu_61",
  //       subMenu: [
  //         // HMST
  //         { id: 157, name: "side_menu_62", url: "EmptyPage" }, // Model
  //         {
  //           id: 158,
  //           name: "side_menu_63",
  //           url: "MasterData/HMST/CategoryType",
  //         }, // Category Type
  //         { id: 159, name: "side_menu_64", url: "MasterData/HMST/ClassType" }, // Class Type
  //         {
  //           id: 160,
  //           name: "side_menu_65",
  //           url: "MasterData/HMST/EngineSeries",
  //         }, // Engine Series
  //         { id: 161, name: "side_menu_66", url: "EmptyPage" }, // Model Part
  //       ],
  //     },
  //     {
  //       id: 162,
  //       name: "side_menu_67",
  //       subMenu: [
  //         // Cargo Link
  //         { id: 163, name: "side_menu_68", url: "EmptyPage" }, // Category Type
  //       ],
  //     },
  //   ],
  // },
  // Help
  // { id: 168, name: "side_menu_69", url: "Help", icon: "Help" },

  // { id: 999, name: "side_menu_3", url: "Tractor/realtime", icon: "Realtime" },
  // //
  // { id: 100, name: "", icon: "", subMenu: [
  //   {id: 200, name: "", url: ""},
  //   {id: 201, name: "", url: "", subMenu: []},
  // ] }
  // {id :300 ,name: "Notification" ,url: "notification" , subMenu:[
  //   {id: 301 ,name:"Notification_info" ,url:"Notification/information" }
  // ]}


];

export function setMenuTractor(
  userMenus,
  userId,
  userLevelId,
  subMenu = LIST_MENU_ALL
) {
  let newListMenu = [];
  for (let i in subMenu) {
    let newM = JSON.parse(JSON.stringify(subMenu[i]));
    let menu = userMenus.find((x) => x.menu_id === newM.id);
    let only_user_id = get(ONLY_USER_ID, "[" + userId + "]", []).includes(
      newM.id
    );
    let only_user_level_id = get(
      ONLY_USER_LEVEL_ID,
      "[" + userLevelId + "]",
      []
    ).includes(newM.id);
    let close_user_id = get(CLOES_USER_ID, "[" + userId + "]", []).includes(
      newM.id
    );
    let close_user_level_id = get(
      CLOES_USER_LEVEL_ID,
      "[" + userLevelId + "]",
      []
    ).includes(newM.id);
    let test = newM.id >= 999;
    if (
      (menu || only_user_id || test || only_user_level_id) &&
      !(close_user_level_id || close_user_id)
    ) {
      if (newM.subMenu) {
        let subMenu = setMenuTractor(
          userMenus,
          userId,
          userLevelId,
          newM.subMenu
        );
        newM.subMenu = subMenu;
      }
      let _name = get(
        CHANGE_NAME_ULID,
        "[" + userLevelId + "][" + newM.id + "]"
      );
      if (_name) newM.name = _name;
      newListMenu.push(newM);
    }
  }
  return newListMenu;
}

export function setMenu(
  userMenus,
  userId,
  userLevelId,
  subMenu = LIST_MENU_ALL
) {
  let newListMenu = [];
  for (let i in subMenu) {
    let newM = JSON.parse(JSON.stringify(subMenu[i]));
    let menu = userMenus.find((x) => x.menuId === newM.id);
    let only_user_id = get(ONLY_USER_ID, "[" + userId + "]", []).includes(
      newM.id
    );
    let only_user_level_id = get(
      ONLY_USER_LEVEL_ID,
      "[" + userLevelId + "]",
      []
    ).includes(newM.id);
    let close_user_id = get(CLOES_USER_ID, "[" + userId + "]", []).includes(
      newM.id
    );
    let close_user_level_id = get(
      CLOES_USER_LEVEL_ID,
      "[" + userLevelId + "]",
      []
    ).includes(newM.id);
    let test = newM.id >= 999;
    if (
      (menu || only_user_id || test || only_user_level_id) &&
      !(close_user_level_id || close_user_id)
    ) {
      if (newM.subMenu) {
        let subMenu = setMenu(userMenus, userId, userLevelId, newM.subMenu);
        newM.subMenu = subMenu;
      }
      let _name = get(
        CHANGE_NAME_ULID,
        "[" + userLevelId + "][" + newM.id + "]"
      );
      if (_name) newM.name = _name;
      newListMenu.push(newM);
    }
  }
  return newListMenu;
}
