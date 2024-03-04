export function setSchema(
    partnerNameList,
  ) {
    return {
      properties: {
        GeofenceSharingDetail: {
          type: "object",
          title: "Geofence Sharing",
          properties: {
            geofenceSharingData: {
              // type: "object",
              // inputTypeChange: {
              //   ...inputTypeChange
              // },
              required: ['partnerName'],
              label: {
                // geofenceTypeName: 'geofence_type_name',
                // geofenceTypeDescription: 'geofence_type_description',
                // sourceTypeNav: "source_type_nav",
                // isShare: "is Share",
                // isHazard: "is_hazard",
                // isActive: "is_active",
                // partnerType: "partner_type",
                partnerName: "partner_name"
              },
              list: {
                partnerName: [
                  ...partnerNameList
                ],
              },
              // redio: {
                // isShare: [
                //   {
                //     name: 'No',
                //     value: true,
                //     checked: false
                //   },
                //   {
                //     name: 'Yes',
                //     value: false,
                //     checked: false
                //   }
                // ],
                // isHazard: [
                //   {
                //     name: 'No',
                //     value: true,
                //     checked: true
                //   },
                //   {
                //     name: 'Yes',
                //     value: false,
                //     checked: false
                //   }
                // ],
                // isActive: [
                //   {
                //     name: 'No',
                //     value: true,
                //     checked: false
                //   },
                //   {
                //     name: 'Yes',
                //     value: false,
                //     checked: false
                //   }
                // ]
              // }
            },
          }
        }
      }
    }
  }
  