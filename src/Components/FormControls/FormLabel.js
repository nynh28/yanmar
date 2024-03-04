import React from 'react'
import { useTranslation } from 'react-i18next'

const FormLabel = (arg) => {
  const { t } = useTranslation()
  return (
    <div className="form-group field field-string" style={{ padding: '0 10px', flex: arg.flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {t(arg.label)} :
      </label>
      <label className="form-control" style={{ color: arg.color, fontWeight: 500, border: '#FFF', boxShadow: 'inset 0 1px 1px rgb(255, 255, 255)', backgroundColor: '#EEE', paddingTop: 8 }}>
        {arg.value}
      </label>
    </div>
  )
}

export default FormLabel