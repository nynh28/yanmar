import { BasicData } from "./Fields/DealerData"
import { ArrayFieldTemplateNoSeperator } from "../../../Components/FormComponent/ArrayFieldTemplateNoSeperator"
import { LicenseData } from "./Fields/LicenseData"

// import { ArrayFieldTemplate, ArrayFieldTemplateNoSeperator } from "../../../Components/Form"

export const fields = {
  basicData: BasicData,
  licenseData: LicenseData
}

export const uiSchema = {
  DriverDetail: {
    basicData: {
      "ui:field": "basicData",
    },
  }
  // , LicenseDetail: {
  //   licenseData: {
  //     "ui:ArrayFieldTemplate": ArrayFieldTemplateNoSeperator,
  //     items: {
  //       "ui:field": "licenseData",
  //     }
  //   }
  // }
}
