import React from 'react'
import { useTranslation } from 'react-i18next'

const FormInputNumber = (arg) => {
  const { t } = useTranslation()

  return (
    <div className="form-group field field-string" style={{ padding: '0 10px', flex: arg.flex || 1 }}>
      {arg.hideLabel ? "" : <label className="control-label" style={{ fontWeight: 500 }}>
        {t(arg.label)}
        {
          arg.schema.required && arg.schema.required.includes(arg.fieldForm) && [
            <span className="text-danger">*</span>
          ]
        }{arg.label && " :"}
      </label>
      }
      <input
        // type={number}
        className="form-control"
        value={arg.value}
        required={arg.schema.required && arg.schema.required.includes(arg.fieldForm)}
        placeholder={t(arg.placeholder)}
        disabled={arg.disabled}
        maxLength={arg.maxLength}
        minLength={arg.minLength}
        onKeyDown={arg.onKeyDown}
        onChange={(e) => {
          let v = e.target.value.replace(/[^0-9]/g, '')
          arg.onChange(v)
          if (v !== '') {
            e.target.setCustomValidity("");
          }
        }}
        onInvalid={(e) => {
          let v = e.target.value.replace(/[^0-9]/g, '')
          if (v === '') {
            e.target.setCustomValidity(t('invalid_field_required'));
          } else {
            e.target.setCustomValidity("");
          }
        }}
      />
    </div>
  )
}

export default FormInputNumber

{/*
   <FormInput
            schema={schema}
            value={username}
            label={schema.label.username}
            fieldForm={"username"}
            placeholder={"ph_owner_partner_name"}
            flex={1}
            onChange={this.onChange("username")}
 />
*/}
