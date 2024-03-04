import React from 'react'
import { useTranslation } from 'react-i18next'
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from 'moment';

const FormDatepickerTest = (arg) => {
  const { t } = useTranslation()
  return (
    <div className="form-group field field-string" style={{ padding: '0 10px', flex: arg.flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {t(arg.label)}
      </label>
      <DateRangePicker
        id={arg.value}
        autoUpdateInput={false}
        locale={{ format: "DD/MM/YYYY" }}
        onApply={arg.onChange}
        // autoApply={true}
        disabled={arg.disabled}
        minDate={arg.minDate && moment(arg.minDate, "DD/MM/YYYY")}
        // singleDatePicker
        // showDropdowns

        ranges={{
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }}
      >
        <input
          className="form-control"
          id={arg.fieldForm}
          disabled={arg.disabled}
          value={arg.value}
          placeholder={t(arg.placeholder)}
        />
      </DateRangePicker>
    </div >
  )
}

export default FormDatepickerTest
