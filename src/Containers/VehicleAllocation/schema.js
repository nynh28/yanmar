export function setSchema(VehicleAllocationOwner, VehicleAllocationPartner, VehicleTableData, OwnerPartnerId, newOwnerPartnerId) {

  return {
    type: "object",
    // required: ["UserDetail : ", "CompanyDetail"],
    properties: {
      section1: {
        type: "object",
        title: "",
        properties: {
          ownerPartner: {
            type: "object",
            // required: ['prefix', 'name', 'lastName'],
            label: {
              ownerPartner: 'Owner Partner',
            },
            list: {
              ownerPartner: [
                ...VehicleAllocationOwner
              ]
            }
          },
          newOwnerPartner: {
            type: 'object',
            label: {
              newOwnerPartner: 'New Owner Partner',
            },
            list: {
              newOwnerPartner: [
                ...VehicleAllocationPartner
              ]
            }
          },
          vehicleTable: {
            type: 'object',
            OwnerPartnerId: OwnerPartnerId,
            newOwnerPartnerId: newOwnerPartnerId,
            label: {
              vehicleTable: 'Vehicles',
            },
            list: {
              vehicleTable: [
                ...VehicleTableData
                // {
                //   "id": "a38288d4-36d2-44de-93d7-1dccc14ba4ce",
                //   "model": "Bianca Henry",
                //   "orderingModel": "Cathleen Castillo",
                //   "specCode": "Lisa Velez",
                //   "vinNo": "David Albert"
                // },
                // {
                //   "id": "e038d41c-b8e6-4b65-87e7-4c75b4a73755",
                //   "model": "Moody Mcclure",
                //   "orderingModel": "Meyers Arnold",
                //   "specCode": "Harper Norton",
                //   "vinNo": "Petty Garrison"
                // },
                // {
                //   "id": "559ebc61-cc93-486e-a3f8-d3d0f9b471b9",
                //   "model": "Gaines Oneal",
                //   "orderingModel": "Kerri Webb",
                //   "specCode": "English Flores",
                //   "vinNo": "Mitchell Campbell"
                // },
                // {
                //   "id": "53639dd7-914e-4b29-8d78-e2e99dccd023",
                //   "model": "May Little",
                //   "orderingModel": "Morales Carroll",
                //   "specCode": "Ewing Levy",
                //   "vinNo": "Henrietta Foreman"
                // },
                // {
                //   "id": "f1691fe3-01a7-46da-8193-3b80aa39984c",
                //   "model": "Mccall Short",
                //   "orderingModel": "Watkins Griffith",
                //   "specCode": "Koch Irwin",
                //   "vinNo": "Lawrence Sloan"
                // }
              ]
            }
          }
        },
      },
    }
  }
}
