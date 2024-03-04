import React from 'react'
import { useTranslation } from 'react-i18next'

const FormMultiSelect = (arg) => {
  const { t } = useTranslation()
  return (
    <div className="form-group field field-string" style={{ padding: '0 10px', flex: arg.flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {t(arg.label)}
        {
          arg.schema.required && arg.schema.required.includes(arg.fieldForm) && [
            <span className="text-danger">*</span>, " :"
          ]
        }
      </label>
      <input
        className="form-control"
        value={arg.value}
        required={arg.schema.required && arg.schema.required.includes(arg.fieldForm)}
        placeholder={t(arg.label)}
        disabled={arg.disabled}
        onChange={arg.onChange}
      />
    </div>
  )
}

export default FormMultiSelect

{/* <FormSelectSearch
mode={"multiple"}
schema={schema}
value={partnerType}
label={schema.label.partnerType}
list={schema.list.ownerPartnerType}
fieldForm={"partnerType"}
placeholder={"ph_owner_partner_name"}
flex={1}
onChange={(selected) => {
  this.setState({
    ["partnerType"]: selected
  }, () => this.props.onChange(this.state));
}}
/> */}