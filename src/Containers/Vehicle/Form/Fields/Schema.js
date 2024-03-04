export function setSchema(FleetList, VehicleBrandList, VehicleModelDataList, alertSetting, VehicleProvinceDataList, CustomerDataList, SellerDataList, VehicleTypeByLawDataList, VehicleTypeDataList,
  DriverList, VehicleBodyTypeByLawList, VehicleBodyTypeList, VehicleFuelTypeList, CargoLinkVehicleTypeList) {

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
    // required: ["DriverDetail"],
    properties: {
      DriverDetail: {
        type: "object",
        title: "",
        properties: {
          basicData: {
            type: "object",
            required: ["vehicleBrandNav", "sellerPartnerNav", "vinNo"],
            label: {
              vehicleBrandNav: "vehicle_brand",
              cargoLinkVehicleTypeNav: "cargolink",
              modelNav: "model",
              orderingModel: "ordering_model",
              specCode: "spec_code",
              vehicleName: "vehicle_name",
              vinNo: "vinno",
              chassisNo: "chassis",
              engineNo: "engineno",
              tire: "tire",
              axle: "axle",
              bodyColor: "body_color",

              licensePlateNo: "license_plate",
              dltProvinceNav: "dlt_province", //
              licenseDate: "license_date",
              isRequireCertificated: "isrequirecertificated",
              isActive: "active_vehicle",
              customerNav: "customer",
              fleetNav: "fleet",

              sellerPartnerNav: "seller_partner",
              purchaseDate: "purchase_date",
              purchasePrice: "purchase_price",

              warrantyStartDate: "warranty_start_date",
              warrantyEndDate: "warranty_end_date",

              actStartDate: "act_start_date",
              actEndDate: "act_end_date",

              taxStartDate: "tax_start_date",
              taxEndDate: "tax_end_date",

              insuranceStartDate: "insurance_start_date",
              insuranceEndDate: "insurance_end_date",
              insuranceCompany: "insurance_company",
              insuranceType: "insurance_type",
              insuranceNo: "insurance",
              insuranceCost: "insurance_cost",

              driverNav: "driver_name",

              files: "files",

              dltVehicleTypeNav: "dlt_vehicle_type",
              dltBodyTypeNav: "dltbody_type",
              vehicleTypeNav: "vehicle_type",
              vendorBodyTypeNav: "vendor_body_type",
              vehicleStatusNav: "vehicle_status",
              activeStatusNav: "active_Status",

              speedLimit: "speed_limit",
              thermalLimited: "thermal_limited",
              standardTypeNav: "standard_type",
              fuelTank: "fuel_tank",
              minFuelVoltage: "min_fuel_voltage",
              maxFuelVoltage: "max_fuel_voltage",
              fuelConsumption: "fuel_consumption",

              airtimePackageName: "airtime_package_name",
              purchaseTypeName: "purchase_type_name",
              airtimePackageDescription: "airtime_package_description",
              rentalPeriod: "rental_period",
              rentalUnitPrice: "rental_unit_price",
              paymentPeriodName: "payment_period_name",
              airtimeUnitPrice: "airtime_unit_price",
              nextPaymentDate: "next_payment_date",

              productCode: "product_code",
              productName: "product_name",
              productModel: "product_model",
              firstInstallationDate: "first_installation_date",
              warrantyInstallationStartDateVendor: "warranty_installation_start_date_vendor",
              warrantyInstallationEndDateVendor: "warranty_installation_end_date_vendor",
              warrantyStartDateCust: "warranty_start_date_cust",
              warrantyEndDateCust: "warranty_end_date_cust",
              currentImei: "current_imei",
              currentMid: "current_mid",
              currentImsi: "current_imsi",
              currentPhoneNo: "current_phone",
            },
            list: {

              vehicleBrandNav: [
                ...VehicleBrandList
              ],
              fleetNav: [
                ...FleetList
              ],
              modelNav: [
                ...VehicleModelDataList
              ],
              dltProvinceNav: [
                ...VehicleProvinceDataList
              ],
              customerNav: [
                ...CustomerDataList
              ],
              sellerPartnerNav: [
                ...SellerDataList
              ],
              vehicleTypeNav: [
                ...VehicleTypeDataList
              ],
              dltVehicleTypeNav: [
                ...VehicleTypeByLawDataList
              ],
              dltBodyTypeNav: [
                ...VehicleBodyTypeByLawList
              ],
              vendorBodyTypeNav: [
                ...VehicleBodyTypeList
              ],
              standardTypeNav: [
                ...VehicleFuelTypeList
              ],
              driverNav: [
                ...DriverList
              ],
              cargoLinkVehicleTypeNav: [
                ...CargoLinkVehicleTypeList
              ]


            }
          }
        }
      }
    }
  }

  return schema
}


