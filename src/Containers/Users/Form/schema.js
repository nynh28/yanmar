export function setSchema(userLevelNavList, ownerPartnerNavList) {
  return {
    properties: {
      UserDetail: {
        type: "object",
        title: "User Information",
        properties: {
          basicData: {
            // required: ['name'],
            label: {
              userLevelNav: 'User Level',
              ownerPartnerNav: 'Partner',
              username: 'Username',
              password: 'Password',
              displayName: 'Display Name',
              email: 'E-mail',
              mobile: 'Phone No.',
              lineId: 'Line ID',
              expiredDate: 'Expired Date'
            },
            list: {
              userLevelNav: [
                ...userLevelNavList
              ],
              ownerPartnerNav: [
                ...ownerPartnerNavList
              ]
            }
          }
        }
      }
    }
  }
}
