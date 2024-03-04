export function setSchema(
  inputTypeChange,
  countryList, provinceList, districtList, subdistrictList,
  countryList_current, provinceList_current, districtList_current, subdistrictList_current,
  countryList_billing, provinceList_billing, districtList_billing, subdistrictList_billing,
  countryList_mailing, provinceList_mailing, districtList_mailing, subdistrictList_mailing,
  peopleNameList
) {
  return {
    properties: {
      DealerDetail: {
        type: "object",
        title: "Dealer Information",
        properties: {
          basicData: {
            // type: "object",
            inputTypeChange: {
              ...inputTypeChange
            },
            required: [
              'dealerFirstNameTh'
            ],
            label: {
              individual: "individual",
              taxId: "tax_id",
              taxBranchId: "tax_branch_id",
              dealerCode: "code",
              areaCode: "area_code",
              dealerPrefixTh: "prefix_th",
              dealerFirstNameTh: "first_name_th",
              dealerLastNameTh: "last_name_th",
              dealerSuffixTh: "suffix_th",
              dealerPrefixEn: "prefix_en",
              dealerFirstNameEn: "first_name_en",
              dealerLastNameEn: "last_name_en",
              dealerSuffixEn: "suffix_en",
              email: "email",
              lineId1: "line_id",
              personalCard: "personal_card",
              pw20: "pw_20",

              groupTaxId: "group_tax_id",
              groupTaxBranchId: "group_tax_branch_id",
              lineId2: "line_id",

              houseNo: 'house_no',
              villageNo: 'village_no',
              building: 'building',
              roomNo: 'room_no',
              soi: 'soi',
              road: 'road',
              villageName: 'village_name',
              subDistrict: 'sub_district',
              district: 'district',
              province: 'province',
              country: 'country',
              postalCode: 'postal_code',
              phone1: 'phone',
              ext1: 'ext',
              phone2: 'phone',
              ext2: 'ext',
              fax: 'fax',

              isCurrentSameOfficial1: 'same_as_official_address',
              houseNo_current: 'house_no',
              villageNo_current: 'village_no',
              building_current: 'building',
              roomNo_current: 'room_no',
              soi_current: 'soi',
              road_current: 'road',
              villageName_current: 'village_name',
              subDistrict_current: 'sub_district',
              district_current: 'district',
              province_current: 'province',
              country_current: 'country',
              postalCode_current: 'postal_code',
              phone1_current: 'phone',
              ext1_current: 'ext',
              phone2_current: 'phone',
              ext2_current: 'ext',
              fax_current: 'fax',

              isCurrentSameOfficial2: 'same_as_official_address',
              houseNo_billing: 'house_no',
              villageNo_billing: 'village_no',
              building_billing: 'building',
              roomNo_billing: 'room_no',
              soi_billing: 'soi',
              road_billing: 'road',
              villageName_billing: 'village_name',
              subDistrict_billing: 'sub_district',
              district_billing: 'district',
              province_billing: 'province',
              country_billing: 'country',
              postalCode_billing: 'postal_code',
              phone1_billing: 'phone',
              ext1_billing: 'ext',
              phone2_billing: 'phone',
              ext2_billing: 'ext',
              fax_billing: 'fax',

              isCurrentSameOfficial3: 'same_as_official_address',
              houseNo_mailing: 'house_no',
              villageNo_mailing: 'village_no',
              building_mailing: 'building',
              roomNo_mailing: 'room_no',
              soi_mailing: 'soi',
              road_mailing: 'road',
              villageName_mailing: 'village_name',
              subDistrict_mailing: 'sub_district',
              district_mailing: 'district',
              province_mailing: 'province',
              country_mailing: 'country',
              postalCode_mailing: 'postal_code',
              phone1_mailing: 'phone',
              ext1_mailing: 'ext',
              phone2_mailing: 'phone',
              ext2_mailing: 'ext',
              fax_mailing: 'fax',

              signatory1: "signatory",
              signatory2: "signatory",
              // endoserName: "",
              // endoserPosition: "",

              businessType: "business_type",
              vendorBusinessType: "vendor_business_type",
              corporateType: "corporate_type",
              lock: "lock",
              active: "active",
              lastUpdated: "last_updated",

              userName: 'username',
              avartar: 'avartar',
              mobile: 'mobile',
              email2: 'email',
              lineId3: 'line_id',

              registerDate: "register_date",
              userQuota: "user_quota",

              peopleName: "name",
              peoplePhone: "phone",
              peopleExt: "ext",
              peopleEmail: "email",
              peopleLine: "line_id",
              peopleDescription: "description"
            },
            list: {
              businessType: [],
              vendorBusinessType: [],
              corporateType: [],
              contactPeople: [],
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
              country_billing: [
                ...countryList_billing
              ],
              province_billing: [
                ...provinceList_billing
              ],
              district_billing: [
                ...districtList_billing
              ],
              subDistrict_billing: [
                ...subdistrictList_billing
              ],
              country_mailing: [
                ...countryList_mailing
              ],
              province_mailing: [
                ...provinceList_mailing
              ],
              district_mailing: [
                ...districtList_mailing
              ],
              subDistrict_mailing: [
                ...subdistrictList_mailing
              ],
              peopleName: [
                ...peopleNameList
              ]
            },
            redio: {
              isCurrentSameOfficial: [
                {
                  name: 'No',
                  value: true,
                  checked: true
                },
                {
                  name: 'Yes',
                  value: false,
                  checked: false
                }
              ]
            }
          }
        }
      }
    }
  }
}
