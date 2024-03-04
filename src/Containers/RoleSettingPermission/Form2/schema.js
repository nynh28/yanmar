export function setSchemaSearch2(
  // ownerPartnerTypeList, ownerPartnerNameList, roleNameList, actionList
  ) {
  return {
    properties: {
      UserDetail: {
        type: "object",
        title: "Permission",
        properties: {
          basicData: {    // 1 section
            required: [
              // 'ownerPartnerType', 'ownerPartnerName', 'roleName', 'master', 'active'
            ],
            label: {
              // ownerPartnerType: "Partner Type",
              // ownerPartnerName: "Partner",
              // roleName: "Role Name",
              // master: "Master",
              // active: "Active",
              
              passwordPolicy: "Password Policy",
              applicationCurrentPolicy: "Application Current Policy",
              manageRole: "Manage Role",
              manageUser: "Manage User",
              blockUnblockUser: "Block/Unblock User",
              unlockUser: "Unlock User",
              resetPassword: "Reset Password",
            },
            list: {
              // ownerPartnerType: [
              //   ...ownerPartnerTypeList
              // ],
              // ownerPartnerName: [
              //   ...ownerPartnerNameList
              // ],
              // roleName: [
              //   ...roleNameList
              // ],
              // action: [
              //   ...actionList
              // ],
            }
          },
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
              'username',
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
