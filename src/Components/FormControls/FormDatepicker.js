import React from 'react'
import { useTranslation } from 'react-i18next'
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from 'moment';
import { CalendarOutlined } from '@ant-design/icons';
import './Styles/datepicker.css'
import { get } from 'lodash'

const FormDatepicker = (arg) => {
  const { t } = useTranslation()
  let allowClear = get(arg, 'allowClear', true)

  return (
    <div className="form-group field field-string icon-calendar" style={{ padding: '0 10px', flex: arg.flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {t(arg.label)}
        {
          arg.schema.required && arg.schema.required.includes(arg.fieldForm) && [
            <span className="text-danger">*</span>
          ]
        } :
      </label>

      <div>
        {!arg.value && <CalendarOutlined onClick={() => arg.onChange(arg.fieldForm, null)} />}
        {arg.value && allowClear && <i class="fas fa-times-circle" onClick={() => arg.onChange(arg.fieldForm, null)}></i>}
        <DateRangePicker
          // id={arg.value}
          autoUpdateInput={false}
          locale={{ format: "DD/MM/YYYY" }}
          onApply={(e, p) => { arg.onChange(arg.fieldForm, p.startDate.format(arg.format || "DD/MM/YYYY")) }}
          autoApply={true}
          disabled={arg.disabled}
          minDate={arg.minDate && moment(arg.minDate, "DD/MM/YYYY")}
          maxDate={arg.maxDate && moment(arg.maxDate, "DD/MM/YYYY")}
          singleDatePicker
          showDropdowns
          timePicker={arg.timePicker || false}

        >
          <input
            className="form-control"
            id={arg.fieldForm}
            disabled={arg.disabled}
            style={{ marginTop: 7 }}
            value={arg.value || ''}
            required={arg.schema.required && arg.schema.required.includes(arg.fieldForm)}
            placeholder={t(arg.placeholder)}
          />

        </DateRangePicker>
      </div>
    </div>
  )
}

export default FormDatepicker
