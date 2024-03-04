import React from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonGroup, Button } from 'reactstrap'

const FormRadio = (arg) => {
  const { t } = useTranslation()
  return (
    <div className="form-group field field-string" style={{ padding: '0 10px', flex: arg.flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {t(arg.label)}
        {
          arg.schema.required && arg.schema.required.includes(arg.fieldForm) && [
            <span className="text-danger">*</span>
          ]
        } :
      </label>

      <div>
        <ButtonGroup style={{ zIndex: 1 }}>
          <Button
            disabled={arg.disabled}
            className='button-radio-checkbox'
            onClick={() => arg.onClick(arg.name != undefined ? arg.name[0] : false, arg.fieldForm)}
            active={arg.name != undefined ? arg.name[0] == arg.value : arg.value === false}
          >{t(arg.name != undefined ? arg.name[0] : arg.word !== undefined ? arg.word[0] : "no")}</Button>
          <Button
            disabled={arg.disabled}
            className='button-radio-checkbox'
            onClick={() => arg.onClick(arg.name != undefined ? arg.name[1] : true, arg.fieldForm)}
            active={arg.name != undefined ? arg.name[1] == arg.value : arg.value === true}
          >{t(arg.name != undefined ? arg.name[1] : arg.word !== undefined ? arg.word[1] : "yes")}</Button>
        </ButtonGroup>
      </div>

    </div>
  )
}

export default FormRadio
