import React from 'react'
import './styles.css'
import { Input } from "antd";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;
export default (props) => {
  const { t } = useTranslation();
  let {
    rows = 4,
    placeholder = "",
    value = "",
    maxLength = 500,
    disabled = false,
    onChange
  } = props


  return (<TextArea
    style={{ fontSize: 16, color: disabled && value !== "" ? "rgb(48 48 48)" : disabled ? "rgb(197, 197, 197)" : "" }}
    rows={rows}
    placeholder={t(placeholder)}
    value={value}
    maxLength={maxLength}
    disabled={disabled}
    onChange={(e) => onChange(e.target.value)}
  />
  )
}