import React from 'react'
import { useTranslation } from 'react-i18next'
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from 'moment';

const Datepicker = (arg) => {
  const { t } = useTranslation()
  return (<DateRangePicker
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
      value={arg.value || ''}
      placeholder={t(arg.placeholder)}
    />

  </DateRangePicker>
  )
}

export default Datepicker
