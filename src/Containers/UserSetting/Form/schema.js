export function setSchemaSearch(ownerPartnerTypeList, userLevelList, OwnerPartnerByTypeList, roleNameList, functionsList, actionList) {
  return {
    properties: {
      UserDetail: {
        type: "object",
        title: "User Information",
        properties: {
          basicData: {
            // required: ['ownerPartnerName'],
            label: {
              ownerPartnerType: "user_75",
              ownerPartnerName: "user_76",
              userLevel: "user_77",
              username: "user_78",
              mobile: "user_79",
              email: "user_80",
              expired: "user_81",
              locked: "user_82",
              partnerType: "user_84",
              partnerName: "user_85",
              roleName: "user_86",
              functions: "user_87",
              action: "user_88",
              permission: "user_89",
              active: "user_83",
            },
            list: {
              ownerPartnerType: [
                ...ownerPartnerTypeList
              ],
              ownerPartnerName: [
                // ...ownerPartnerNameList
              ],
              userLevel: [
                ...userLevelList
              ],
              OwnerPartnerByType: [
                ...OwnerPartnerByTypeList
              ],
              roleName: [
                ...roleNameList
              ],
              functions: [
                ...functionsList
              ],
              action: [
                ...actionList
              ],
              partnerName: [
                //     ...partnerNameList
              ]
            }
          }
        }
      }
    }
  }
}

export function setSchema(ownerPartnerTypeList, ownerPartnerList, userLevelList, defaultLanguageList) {
  return {
    properties: {
      UserDetail: {
        type: "object",
        title: "User Information",
        properties: {
          basicData: {
            required: [
              'ownerPartnerType',
              'ownerPartner',
              'userLevel',
              'displayName',
              'username',
              'password',
              'confirmPassword',
              // 'mobile',
              // 'email'
            ],
            label: {
              ownerPartnerType: "user_14",
              ownerPartner: "user_15",
              userLevel: "user_16",
              userToken: "user_17",
              displayName: "user_18",
              username: "user_19",
              password: "user_20",
              confirmPassword: "user_21",
              resetPassword: "reset_password",
              mobile: "user_22",
              email: "user_23",
              lineId: "user_24",
              expiredDate: "user_25",
              loginFailedCount: "login_failed_count",
              isLocked: "locked",
              isActive: "user_26",
              avartar: "user_28",
              defaultLanguage: "user_27"
            },
            list: {
              ownerPartnerType: [
                ...ownerPartnerTypeList
              ],
              ownerPartner: [
                ...ownerPartnerList
              ],
              userLevel: [
                ...userLevelList
              ],
              defaultLanguage: [
                ...defaultLanguageList
              ],
              test: [
                {
                  key: 1,
                  value: 'teset1'
                },
                {
                  key: 2,
                  value: 'teset2'
                },
                {
                  key: 3,
                  value: 'teset3'
                }
              ]
            }
          }
        }
      }
    }
  }
}
