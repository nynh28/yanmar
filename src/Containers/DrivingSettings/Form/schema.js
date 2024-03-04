export function setSchemaSearch(drivingBehaviorList,
  nameEN, nameTH, nameJA, drivingViewer, criteriaField, subkeyScoreField
  // , ownerPartnerNameList, roleNameList, actionList
) {
  return {
    properties: {
      DrivingDetail: {
        type: "object",
        title: "Driving Behavior",
        properties: {
          basicData: {    // 1 section
            required: ['drivingBehavior',
              //  'ownerPartnerName', 'roleName', 'master', 'active'
            ],
            label: {
              drivingBehavior: "Driving Behavior List",
              nameEN: "Display Name (EN)",
              nameTH: "Display Name (TH)",
              nameJA: "Display Name (JA)",
              drivingViewer: "Driving Viewer",
              criteriaCategory: "Category Type",
              subkeyScore: 'Subkey Score',
              // ownerPartnerName: "Owner Partner",
              // // userLevel: "User Level",
              // roleName: "Role Name",
              // // action: "Action",
              // master: "Master",
              // active: "Active",
            },
            list: {
              drivingBehavior: [...drivingBehaviorList],
              nameEN: nameEN,
              nameTH: nameTH,
              nameJA: nameJA,
              drivingViewer: drivingViewer,
              criteriaCategory: criteriaField,
              subkeyScore: subkeyScoreField,
              // ownerPartnerType: [
              //   ...ownerPartnerTypeList
              // ],
            }
          },
        }
      }
    }
  }
}
