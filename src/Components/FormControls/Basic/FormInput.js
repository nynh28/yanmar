import React from 'react'
import { useTranslation } from 'react-i18next'

const FormInput = (arg) => {
  const { t } = useTranslation()
  return (
    <div className="form-group field field-string" style={{ padding: '0 10px', flex: arg.flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {t(arg.label)} :
      </label>
      <input
        type={arg.type}
        className="form-control"
        value={arg.value}
        placeholder={t(arg.placeholder)}
        disabled={arg.disabled}
        onChange={arg.onChange}
      />
    </div>
  )
}

export default FormInput

{/* 
  <FormInput
      value={"XXXXX"}
      label={"first_name"}
      placeholder={"ph_first_name"}
      flex={1}
      onChange={this.onChange("username")}
 />
*/}