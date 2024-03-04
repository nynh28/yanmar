import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from 'antd';

const { Option } = Select;
const FormSelect = (arg) => {
  const { t } = useTranslation()
  return (
    <div className="form-group field field-string" style={{ padding: arg.padding || '0 10px', flex: arg.flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {t(arg.label)} :
      </label>
      <Select
        allowClear={arg.allowClear !== undefined ? arg.allowClear : true}
        mode={arg.mode}
        showSearch
        style={{ width: '100%' }}
        placeholder={t(arg.placeholder)}
        value={arg.value}
        disabled={arg.disabled}
        onChange={arg.onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {
          arg.list.map((item) => {
            return <Option key={item.key} value={item.value}>{t(item.text)}</Option>
          })
        }
      </Select>
    </div>
  )
}

export default FormSelect
