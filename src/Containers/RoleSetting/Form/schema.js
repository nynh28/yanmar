export function setSchemaSearch(ownerPartnerTypeList, ownerPartnerNameList, roleNameList, actionList) {
  console.log(actionList)
  return {
    properties: {
      UserDetail: {
        type: "object",
        title: "User Information",
        properties: {
          basicData: {
            required: ['ownerPartnerName'],
            label: {
              ownerPartnerType: "Partner Type",
              ownerPartnerName: "Partner Name",
              userLevel: "User Level",
              // username: "username",
              // mobile: "mobile",
              // email: "email",
              // expired: "expired",
              // locked: "locked",
              // partnerType: "partner_type",
              // partnerName: "partner_name",
              roleName: "Role Name",
              // functions: "function",

              action: "Action",
              master: "Master",

              permission: "Have permission",
              // active: "active",


            },
            list: {
              ownerPartnerType: [
                ...ownerPartnerTypeList
              ],
              ownerPartnerName: [
                ...ownerPartnerNameList
              ],
              roleName: [
                ...roleNameList
              ],
              // functions: [
              //   ...functionsList
              // ],
              action: [
                ...actionList
              ],
              // partnerName: [
              //   ...partnerNameList
              // ]
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
              // 'ownerPartnerType',
              // 'ownerPartner',
              // 'userLevel',
              // 'displayName',
              'username',
              // 'password',
              // 'confirmPassword',
              // 'mobile',
              // 'email',
              // 'isActive',
              // 'avartar',
            ],
            label: {
              ownerPartnerType: "owner_partner_type",
              ownerPartner: "owner_partner",
              userLevel: "user_level",
              userToken: "user_token",
              displayName: "display_name",
              username: "username",
              password: "password",
              confirmPassword: "confirm_password",
              resetPassword: "reset_password",
              mobile: "mobile",
              email: "email",
              lineId: "line_Id",
              expiredDate: "expired_date",
              loginFailedCount: "login_failed_count",
              locked: "locked",
              isActive: "is_active",
              avartar: "avartar",
              defaultLanguage: "default_language"
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
