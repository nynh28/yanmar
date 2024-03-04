export function setSchema(
  cardTypeList, countryList, provinceList, districtList, subdistrictList, countryList_current,
  provinceList_current, districtList_current, subdistrictList_current,
  driverProfileCards, drivers, customerList, lisenceCardList, employeeCardList, defaultLanguageList
) {
  return {
    properties: {
      DriverDetail: {
        type: "object",
        title: "Driver Information",
        properties: {
          basicData: {
            // type: "object",
            // required: [],
            required: ['intCustId', 'personalId', 'firstname', 'lastname', 'houseNo',
              'subDistrict', 'district', 'province', 'houseNo_current', 'subDistrict_current',
              'district_current', 'province_current', 'displayName', 'username', 'password', 'confirmPassword',
              'employeeCode', 'displayName_emp'],
            label: {
              intCustId: 'driver_30',
              personalId: 'driver_32',
              prefix: 'driver_33',
              firstname: 'driver_34',
              lastname: 'driver_35',
              personalCard: 'driver_37',
              nickname: 'driver_36',
              lastUpdate: 'driver_31',

              houseNo: 'driver_39',
              villageNo: 'driver_40',
              building: 'driver_41',
              roomNo: 'driver_42',
              soi: 'driver_43',
              road: 'driver_44',
              villageName: 'driver_45',
              subDistrict: 'driver_46',
              district: 'driver_47',
              province: 'driver_48',
              country: 'driver_49',
              postalCode: 'driver_50',
              phone1: 'driver_51',
              ext1: 'driver_52',
              phone2: 'driver_51',
              ext2: 'driver_52',

              isCurrentSameOfficial: 'driver_56',
              houseNo_current: 'driver_39',
              villageNo_current: 'driver_40',
              building_current: 'driver_41',
              roomNo_current: 'driver_42',
              soi_current: 'driver_43',
              road_current: 'driver_44',
              villageName_current: 'driver_45',
              subDistrict_current: 'driver_46',
              district_current: 'driver_47',
              province_current: 'driver_48',
              country_current: 'driver_49',
              postalCode_current: 'driver_50',
              phone1_current: 'driver_51',
              ext1_current: 'driver_52',
              phone2_current: 'driver_51',
              ext2_current: 'driver_52',

              displayName: 'driver_57',
              username: 'driver_58',
              password: 'driver_59',
              confirmPassword: 'driver_60',
              mobile: 'driver_61',
              email: 'driver_62',
              lineId: 'driver_63',
              avartar: 'driver_65',
              defaultLanguage: 'driver_66',
              expiredDate: 'driver_64',

              employeeCode: 'driver_67',
              displayName_emp: 'driver_68',
              department: 'driver_69',
              position: 'driver_70',
              startDate: 'driver_71',
              endDate: 'driver_72',
              isActive: 'driver_73',

              cardType: 'card_type',
              cardNo: 'card_no',
              expiredDate2: 'expired_date',
              note: 'note'
            },
            list: {
              lisenceCardList: [
                ...lisenceCardList
              ],
              employeeCardList: [
                ...employeeCardList
              ],
              country: [
                ...countryList
              ],
              province: [
                ...provinceList
              ],
              district: [
                ...districtList
              ],
              subDistrict: [
                ...subdistrictList
              ],
              country_current: [
                ...countryList_current
              ],
              province_current: [
                ...provinceList_current
              ],
              district_current: [
                ...districtList_current
              ],
              subDistrict_current: [
                ...subdistrictList_current
              ],
              cardType: [
                ...cardTypeList
              ],
              driverProfileCards: [
                ...driverProfileCards
              ],
              intCustId: [
                ...customerList
              ],
              drivers: [
                ...drivers
              ],
              defaultLanguage: [
                ...defaultLanguageList
              ],
              employeeCardDeleteList: [
              ]
            }
          },
        }
      }
    }
  }
}
