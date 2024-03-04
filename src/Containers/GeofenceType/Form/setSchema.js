export function setSchema(
  sourceTypeList, partnerNameList, iconSourceRadio, iconPresentRadio
) {
  return {
    properties: {
      GeofenceTypeDetail: {
        type: "object",
        title: "",
        properties: {
          geofenceTypeData: {
            // type: "object",
            // inputTypeChange: {
            //   ...inputTypeChange
            // },
            required: ['name','description','nameEn','descriptionEn','nameJa','descriptionJa','sourceTypeNav','isHazard','isActive'],
            label: {
              // geofenceTypeNameTH: 'geofence_type_name_th',
              // geofenceTypeDescriptionTH: 'geofence_type_description_th',
              // geofenceTypeNameEN: 'geofence_type_name_en',
              // geofenceTypeDescriptionEN: 'geofence_type_description_en',
              // geofenceTypeNameJP: 'geofence_type_name_jp',
              // geofenceTypeDescriptionJP: 'geofence_type_description_jp',
              name: 'geofence_type_12',
              description: 'geofence_type_13',
              nameEn: 'geofence_type_14',
              descriptionEn: 'geofence_type_15',
              nameJa: 'geofence_type_16',
              descriptionJa: 'geofence_type_17',
              sourceTypeNav: "geofence_type_20",
              // isShare: "is Share",
              iconSource: "icon_source",
              isHazard: "geofence_type_18",
              isActive: "geofence_type_19",
              partnerType: "geofence_type_10",
              partnerName: "geofence_type_11"
            },
            list: {
              sourceTypeNav: [
                ...sourceTypeList
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
            }
          },
        }
      }
    }
  }
}
