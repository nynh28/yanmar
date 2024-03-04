export function setSchema(MyDealersList, PackageList, CustomerBYList) {

  let schema = {
    // title: "1.ข้อมูลทั่วไป",
    definitions: {
      prefix: {
        "type": "string",
        "enum": [
          "นาย", "นาง", "นางสาว"
        ]
      }
    },
    type: "object",
    required: [],
    properties: {
      DriverDetail: {
        type: "object",
        title: "",
        properties: {
          basicData: {
            type: "object",
            // required: [""],
            label: {
              packgeNav: "packge_nav",
              attachCode: "",
              attachInfo: {},
              CustomerNav: "customer",
              DealerNav: "dealer",
              id: "",
              customerCode: "",
              customerNameTh: "",
              customerNameEn: "",
              registerDate: "",
              payCustId: "",
              isIndividual: "",
              taxId: "tax_no",
              taxBranchId: "",
              groupTaxId: "",
              groupCorporateName: "",
              corporateType: "",
              corporateTypeName: "partner_type",
              vendorBusinessType: "",
              vendorBusinessTypeName: "",
              phoneNo: "phone",
              email: "email",
              prefix: "customer_6",
              firstname: "",
              lastname: "",
              suffix: "",
              prefixEn: "",
              firstnameEn: "",
              lastnameEn: "",
              suffixEn: "",
              fullnameBilling: "",
              fullnameMailing: "",
              officialAddressId: 0,
              officialAddress: "official_address",
              currentAddress: "current_address",
              billingAddress: "billing_address",
              mailingAddress: "mailing_address",
              lineId: "line_id",
              endoserName: "",
              endoserPosition: "",
              isApprove: "",
              airtimePackageName: "",
              airtimePackageDescription: "airtimepackage_description",
              guid: "",
              subscriberNo: "subscriber_no",
              subscriptionDate: "subscription_date",
              itemStatus: "item_status",
              DocumentTypeNav: ""

            },
            list: {

              DealerNav: [
                ...MyDealersList
              ],
              airtimePackageName: [
                ...PackageList
              ],
              CustomerNav: [
                ...CustomerBYList
              ],



            }
          }
        }
      }
    }
  }

  return schema
}


