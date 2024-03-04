export function setSchema(
  geofenceTypeList, geomTypeList, partnerNameList, iconSourceRadio, iconPresentRadio, attachInfoByGeofenceType
) {
  return {
    properties: {
      GeofenceDetail: {
        type: "object",
        title: "",
        properties: {
          geofenceData: {
            // type: "object",
            required: ['partnerType', 'partnerName', 'name', 'geofenceTypeNav', 'isShare', 'isActive', 'geomTypeNav', 'coordinates',],
            label: {
              partnerType: "geofence_11",
              partnerName: "geofence_12",
              // geofenceName: 'Geofence Name',
              // geofenceDescription: 'Geofence Detail',
              name: 'geofence_13',
              description: 'geofence_14',
              geofenceTypeNavTH: "Geofence Group TH",
              nameEn: 'geofence_15',
              descriptionEn: 'geofence_16',
              geofenceTypeNavEN: "Geofence Group EN",
              nameJa: 'geofence_17',
              descriptionJa: 'geofence_18',
              geofenceTypeNavJa: "Geofence Group JA",
              geofenceTypeNav: 'geofence_19',
              isShare: "geofence_36",
              isHazard: "is_hazard",
              isActive: "is_active",
              geomTypeNav: "geofence_26",
              coordinates: "geofence_28",
              // iconPoint: "Icon Point",
              radius: "geofence_27",
              iconFile: "geofence_23",
              // attachCode: "icon_attach_file",

            },
            list: {
              geofenceTypeNav: [
                ...geofenceTypeList
              ],
              geomTypeNav: [
                ...geomTypeList
              ],
              partnerName: [
                ...partnerNameList
              ],
            },
            radio: {
              iconSource: [
                ...iconSourceRadio
              ],
              iconPresent: [
                ...iconPresentRadio
              ]
            },
            icon: attachInfoByGeofenceType
          },
        }
      }
    }
  }
}
