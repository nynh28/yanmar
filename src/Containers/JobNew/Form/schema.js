export function setSchemaJob(licenseList, typeWorkList, typeTripList, deliveryDayList, typeVehicleList, pathList, stationList) {
  // export function setSchemaJob(userLevelNavList, ownerPartnerNavList) {
  return {
    properties: {
      UserDetail: {
        type: "object",
        title: "User Information",
        properties: {
          basicData: {
            // required: ['name'],
            label: {
              jobId: 'Job ID',
              license: 'License',
              nameTrip: 'Topic',
              typeWork: 'Select Job Type',
              typeTrip: 'Topic Type',
              deliveryDay: 'Total Date',
              typeVehicle: 'Vehicle Type',
              path: 'Route',
              station: 'Station',
              timeToStation: 'Est Time',
              timeStay: 'Time in Station',
            },
            list: {
              license: [
                ...licenseList
              ],
              typeWork: [
                ...typeWorkList
              ],
              typeTrip: [
                ...typeTripList
              ],
              deliveryDay: [
                ...deliveryDayList
              ],
              typeVehicle: [
                ...typeVehicleList
              ],
              path: [
                ...pathList
              ],
              station: [
                ...stationList
              ],
            }
          }
        }
      }
    }
  }
}

export function setSchemaPlan(typeWorkList, typeTripList, deliveryDayList, typeVehicleList, pathList, stationList) {
  return {
    properties: {
      UserDetail: {
        type: "object",
        title: "User Information",
        properties: {
          basicData: {
            // required: ['name'],
            label: {
              nameTrip: 'Topic',
              typeWork: 'Job Type',
              typeTrip: 'Topic Type',
              deliveryDay: 'Total Date',
              typeVehicle: 'Vehicle Type',
              path: 'Route',
              station: 'Station',
              timeToStation: 'Est Time',
              timeStay: 'Time in Station',
            },
            list: {
              typeWork: [
                ...typeWorkList
              ],
              typeTrip: [
                ...typeTripList
              ],
              deliveryDay: [
                ...deliveryDayList
              ],
              typeVehicle: [
                ...typeVehicleList
              ],
              path: [
                ...pathList
              ],
              station: [
                ...stationList
              ],
            }
          }
        }
      }
    }
  }
}
