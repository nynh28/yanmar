import React from 'react'
import { useTranslation } from 'react-i18next'

const FormTextArea = (arg) => {
  const { t } = useTranslation()
  return (
    <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {t(arg.label)}
        {arg.schema.required && arg.schema.required.includes(arg.fieldForm) && [
          <span className="text-danger">*</span>]} :
      </label>
      <textarea
        className="form-control"
        value={arg.value}
        required={arg.schema.required && arg.schema.required.includes(arg.fieldForm)}
        placeholder={t(arg.placeholder)}
        disabled={arg.disabled}
        onChange={(e) => {
          arg.onChange(e)
          if (e.target.value !== "") {
            e.target.setCustomValidity("");
          }
        }}
        onInvalid={(e) => {
          if (e.target.value === "") {
            e.target.setCustomValidity(t("invalid_field_required"));
          }
          else {
            e.target.setCustomValidity("");
          }
        }}
      />
    </div>
  )
}

export default FormTextArea
