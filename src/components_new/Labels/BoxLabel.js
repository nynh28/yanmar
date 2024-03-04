import React from 'react'
import './styles.css'
import { useTranslation } from "react-i18next";

export default ({
  text = "",
  placeholder = "",
  disabled = false
}) => {
  const { t } = useTranslation();
  return <label
    className="box-label"
    style={{
      backgroundColor: disabled ? "#f5f5f5" : "",
      color: disabled && text !== "" ? "rgb(48 48 48)" : disabled ? "rgb(197, 197, 197)" : ""
    }}
  >
    {text !== "" ? t(text) : t(placeholder)}
  </label>
}