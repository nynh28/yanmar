export function setSchemaInfo(
  ownerPartnerTypeList, ownerPartnerList, alertTypeList, userLevelList
) {
  return {
    properties: {
      AlertSettingDetail: {
        type: "object",
        title: "Alert Information",
        properties: {
          infoData: {
            // type: "object",
            required: ['ownerPartnerName','alert_type','alert_name','criteria_value'],
            label: {
              ownerPartnerName: "owner_partner_name",
              alert_type: "alert_type",
              alert_name: "alert_name",
              criteria: "criteria",
              // isActive: "is_active",
              // geomTypeNav: "Geom Type",
              // coordinates: "coordinates",
              // iconPoint: "Icon Point",
              // radius: "Radius",
              // iconFile: "icon_attach_file",
              // attachCode: "icon_attach_file",
              
            },
            list: {
              ownerPartnerTypeNav: [
                ...ownerPartnerTypeList
              ],
              ownerPartnerNav: [
                ...ownerPartnerList
              ],
              alertTypeNav: [
                ...alertTypeList
              ],
              userLevelNav: [
                ...userLevelList
              ],
            },
          },
        }
      }
    }
  }
}

export function setSchemaNotifyHMST(
  userHMSTList, userData
) {
  return {
    properties: {
      AlertSettingDetail: {
        type: "object",
        title: "Alert Notification HMST",
        properties: {
          notifyData: {
            // type: "object",
            required: ['notify'],
            label: {
              notifyHMST: 'notify_HMST',
              userHMST: 'user_HMST',

              notifyLevel: 'notify_level',
              subject: 'subject',
              message: 'message',
              specifyUser: 'specify_user',
              
            },
            list: {
              userHMST: [
                ...userHMSTList
              ],
              userData: [
                ...userData
              ]
            }
          },
        }
      }
    }
  }
}

export function setSchemaNotifyDealer(
  dealerList, userDealerList, userData
  // ownerPartnerTypeList, ownerPartnerList, alertTypeList, userLevelList
) {
  return {
    properties: {
      AlertSettingDetail: {
        type: "object",
        title: "Alert Notification Dealer",
        properties: {
          notifyData: {
            // type: "object",
            required: ['notify'],
            label: {
              // ownerPartnerName: "owner_partner_name",
              // alertType: "alert_type",
              // alertName: "alert_name",
              // criteria: "criteria",

              // notifyHMST: 'notify_HMST',
              notifyDealer: 'notify_dealer',
              // notifyCustomer: 'notify_customer',
              // notifyFleet: 'notify_fleet',
              // notifyDriver: 'notify_driver',
              // notifyGroupUser: 'notify_group_user',
              // notifyGPSDevice: 'notify_GPS_device',

              notifyLevel: 'notify_level',
              subject: 'subject',
              message: 'message',
              specifyUser: 'specify_user',
              dealer: 'dealer',
              userDealer: 'user_dealer',
              // voiceFile: 'voice_file',
              // notifyGPSDevice: false,
              // notifyLevelGPSDevice: null,
              
              // isActive: "is_active",
              // geomTypeNav: "Geom Type",
              // coordinates: "coordinates",
              // iconPoint: "Icon Point",
              // radius: "Radius",
              // iconFile: "icon_attach_file",
              // attachCode: "icon_attach_file",
              
            },
            list: {
              dealerNav: [
                ...dealerList
              ],
              userDealerNav: [
                ...userDealerList
              ],
              userData: [
                ...userData
              ]
            //   ownerPartnerTypeNav: [
            //     ...ownerPartnerTypeList
            //   ],
            //   ownerPartnerNav: [
            //     ...ownerPartnerList
            //   ],
            //   alertTypeNav: [
            //     ...alertTypeList
            //   ],
            //   userLevelNav: [
            //     ...userLevelList
            //   ],
            },
          },
        }
      }
    }
  }
}

export function setSchemaNotifyCustomer(
  customerList, userCustomerList, userData
  // ownerPartnerTypeList, ownerPartnerList, alertTypeList, userLevelList
) {
  return {
    properties: {
      AlertSettingDetail: {
        type: "object",
        title: "Alert Notification Customer",
        properties: {
          notifyData: {
            // type: "object",
            required: ['notify'],
            label: {
              // ownerPartnerName: "owner_partner_name",
              // alertType: "alert_type",
              // alertName: "alert_name",
              // criteria: "criteria",

              // notifyHMST: 'notify_HMST',
              // notifyDealer: 'notify_dealer',
              notifyCustomer: 'notify_customer',
              // notifyFleet: 'notify_fleet',
              // notifyDriver: 'notify_driver',
              // notifyGroupUser: 'notify_group_user',
              // notifyGPSDevice: 'notify_GPS_device',

              notifyLevel: 'notify_level',
              subject: 'subject',
              message: 'message',
              specifyUser: 'specify_user',
              // voiceFile: 'voice_file',
              // notifyGPSDevice: false,
              // notifyLevelGPSDevice: null,
              
              // isActive: "is_active",
              // geomTypeNav: "Geom Type",
              // coordinates: "coordinates",
              // iconPoint: "Icon Point",
              // radius: "Radius",
              // iconFile: "icon_attach_file",
              // attachCode: "icon_attach_file",
              
            },
            list: {
              customerNav: [
                ...customerList
              ],
              userCustomerNav: [
                ...userCustomerList
              ],
              userData: [
                ...userData
              ]
            //   ownerPartnerTypeNav: [
            //     ...ownerPartnerTypeList
            //   ],
            //   ownerPartnerNav: [
            //     ...ownerPartnerList
            //   ],
            //   alertTypeNav: [
            //     ...alertTypeList
            //   ],
            //   userLevelNav: [
            //     ...userLevelList
            //   ],
            },
          },
        }
      }
    }
  }
}

export function setSchemaNotifyFleet(
  fleetList, userFleetList, userData
  // ownerPartnerTypeList, ownerPartnerList, alertTypeList, userLevelList
) {
  return {
    properties: {
      AlertSettingDetail: {
        type: "object",
        title: "Alert Notification Fleet",
        properties: {
          notifyData: {
            // type: "object",
            required: ['notify'],
            label: {
              // ownerPartnerName: "owner_partner_name",
              // alertType: "alert_type",
              // alertName: "alert_name",
              // criteria: "criteria",

              // notifyHMST: 'notify_HMST',
              // notifyDealer: 'notify_dealer',
              // notifyCustomer: 'notify_customer',
              notifyFleet: 'notify_fleet',
              // notifyDriver: 'notify_driver',
              // notifyGroupUser: 'notify_group_user',
              // notifyGPSDevice: 'notify_GPS_device',

              notifyLevel: 'notify_level',
              subject: 'subject',
              message: 'message',
              specifyUser: 'specify_user',
              // voiceFile: 'voice_file',
              // notifyGPSDevice: false,
              // notifyLevelGPSDevice: null,
              
              // isActive: "is_active",
              // geomTypeNav: "Geom Type",
              // coordinates: "coordinates",
              // iconPoint: "Icon Point",
              // radius: "Radius",
              // iconFile: "icon_attach_file",
              // attachCode: "icon_attach_file",
              
            },
            list: {
              fleetNav: [
                ...fleetList
              ],
              userFleetNav: [
                ...userFleetList
              ],
              userData: [
                ...userData
              ]
              
            //   ownerPartnerTypeNav: [
            //     ...ownerPartnerTypeList
            //   ],
            //   ownerPartnerNav: [
            //     ...ownerPartnerList
            //   ],
            //   alertTypeNav: [
            //     ...alertTypeList
            //   ],
            //   userLevelNav: [
            //     ...userLevelList
            //   ],
            },
          },
        }
      }
    }
  }
}

export function setSchemaNotifyDriver(
  driverList, userDriverList, userData
  // ownerPartnerTypeList, ownerPartnerList, alertTypeList, userLevelList
) {
  return {
    properties: {
      AlertSettingDetail: {
        type: "object",
        title: "Alert Notification Driver",
        properties: {
          notifyData: {
            // type: "object",
            required: ['notify'],
            label: {
              // ownerPartnerName: "owner_partner_name",
              // alertType: "alert_type",
              // alertName: "alert_name",
              // criteria: "criteria",

              // notifyHMST: 'notify_HMST',
              // notifyDealer: 'notify_dealer',
              // notifyCustomer: 'notify_customer',
              // notifyFleet: 'notify_fleet',
              notifyDriver: 'notify_driver',
              // notifyGroupUser: 'notify_group_user',
              // notifyGPSDevice: 'notify_GPS_device',

              notifyLevel: 'notify_level',
              subject: 'subject',
              message: 'message',
              specifyUser: 'specify_user',
              // voiceFile: 'voice_file',
              // notifyGPSDevice: false,
              // notifyLevelGPSDevice: null,
              
              // isActive: "is_active",
              // geomTypeNav: "Geom Type",
              // coordinates: "coordinates",
              // iconPoint: "Icon Point",
              // radius: "Radius",
              // iconFile: "icon_attach_file",
              // attachCode: "icon_attach_file",
              
            },
            list: {
              driverNav: [
                ...driverList
              ],
              userDriverNav: [
                ...userDriverList
              ],
              userData: [
                ...userData
              ]
            //   ownerPartnerTypeNav: [
            //     ...ownerPartnerTypeList
            //   ],
            //   ownerPartnerNav: [
            //     ...ownerPartnerList
            //   ],
            //   alertTypeNav: [
            //     ...alertTypeList
            //   ],
            //   userLevelNav: [
            //     ...userLevelList
            //   ],
            },
          },
        }
      }
    }
  }
}

export function setSchemaNotifyGroupUser(
  // ownerPartnerTypeList, ownerPartnerList, alertTypeList, userLevelList
) {
  return {
    properties: {
      AlertSettingDetail: {
        type: "object",
        title: "Alert Notification Group User",
        properties: {
          notifyData: {
            // type: "object",
            required: ['notify'],
            label: {
              // ownerPartnerName: "owner_partner_name",
              // alertType: "alert_type",
              // alertName: "alert_name",
              // criteria: "criteria",

              // notifyHMST: 'notify_HMST',
              // notifyDealer: 'notify_dealer',
              // notifyCustomer: 'notify_customer',
              // notifyFleet: 'notify_fleet',
              // notifyDriver: 'notify_driver',
              notifyGroupUser: 'notify_group_user',
              // notifyGPSDevice: 'notify_GPS_device',

              notifyLevel: 'notify_level',
              subject: 'subject',
              message: 'message',
              // specifyUser: 'specify_user',
              // voiceFile: 'voice_file',
              // notifyGPSDevice: false,
              // notifyLevelGPSDevice: null,
              
              // isActive: "is_active",
              // geomTypeNav: "Geom Type",
              // coordinates: "coordinates",
              // iconPoint: "Icon Point",
              // radius: "Radius",
              // iconFile: "icon_attach_file",
              // attachCode: "icon_attach_file",
              
            },
            // list: {
            //   ownerPartnerTypeNav: [
            //     ...ownerPartnerTypeList
            //   ],
            //   ownerPartnerNav: [
            //     ...ownerPartnerList
            //   ],
            //   alertTypeNav: [
            //     ...alertTypeList
            //   ],
            //   userLevelNav: [
            //     ...userLevelList
            //   ],
            // },
          },
        }
      }
    }
  }
}

export function setSchemaNotifyGPSDriver(
  // ownerPartnerTypeList, ownerPartnerList, alertTypeList, userLevelList
) {
  return {
    properties: {
      AlertSettingDetail: {
        type: "object",
        title: "Alert Notification GPS Driver",
        properties: {
          notifyData: {
            // type: "object",
            required: ['notify'],
            label: {
              // ownerPartnerName: "owner_partner_name",
              // alertType: "alert_type",
              // alertName: "alert_name",
              // criteria: "criteria",

              // notifyHMST: 'notify_HMST',
              // notifyDealer: 'notify_dealer',
              // notifyCustomer: 'notify_customer',
              // notifyFleet: 'notify_fleet',
              // notifyDriver: 'notify_driver',
              // notifyGroupUser: 'notify_group_user',
              notifyGPSDevice: 'notify_GPS_device',

              // notifyLevel: 'notify_level',
              // subject: 'subject',
              // message: 'message',
              // specifyUser: 'specify_user',
              voiceFile: 'voice_file',
              // notifyGPSDevice: false,
              // notifyLevelGPSDevice: null,
              
              // isActive: "is_active",
              // geomTypeNav: "Geom Type",
              // coordinates: "coordinates",
              // iconPoint: "Icon Point",
              // radius: "Radius",
              // iconFile: "icon_attach_file",
              // attachCode: "icon_attach_file",
              
            },
            // list: {
            //   ownerPartnerTypeNav: [
            //     ...ownerPartnerTypeList
            //   ],
            //   ownerPartnerNav: [
            //     ...ownerPartnerList
            //   ],
            //   alertTypeNav: [
            //     ...alertTypeList
            //   ],
            //   userLevelNav: [
            //     ...userLevelList
            //   ],
            // },
          },
        }
      }
    }
  }
}

export function setSchemaEffectVehicle(
  // ownerPartnerTypeList, ownerPartnerList, alertTypeList, userLevelList
) {
  return {
    properties: {
      AlertSettingDetail: {
        type: "object",
        title: "Alert Effect Vehicle",
        properties: {
          effectVehicleData: {
            // type: "object",
            required: ['effectAll',],
            label: {
              effectAll: 'effect_all'
            },
            // list: {
            //   ownerPartnerTypeNav: [
            //     ...ownerPartnerTypeList
            //   ],
            //   ownerPartnerNav: [
            //     ...ownerPartnerList
            //   ],
            //   alertTypeNav: [
            //     ...alertTypeList
            //   ],
            //   userLevelNav: [
            //     ...userLevelList
            //   ],
            // },
          },
        }
      }
    }
  }
}