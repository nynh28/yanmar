import React from 'react'
import { Button } from 'antd';
import { useTranslation } from 'react-i18next'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import './styles.css'

export default (props) => {
  let {
    className = "",
    text = "",
    size = "middle",
    width = "",
    margin = 3,
    icon,
    textColor = "white",
    backgroundColor = "rgb(23 111 193)",
    borderColor = "rgb(9 88 161)",
    onClick,
    isSearchButton = false,
    isAddButton = false,
    isSaveButton = false,
    isCancelButton = false,
    isSecondaryButton = false,
    isDangerButton = false,
    isSecondaryButtonOutline = false,
    isCustomButton = false,
    htmlType = 'button',
    form = "",
    loading = false,
    disabled = false
  } = props
  const { t } = useTranslation()
  return (
    isCustomButton ? <Button
      className={"ant-btn-danger-cancel" + (disabled ? ' ant-btn-disabled' : "")}
      size={size}
      loading={loading}
      icon={icon}
      style={{ backgroundColor, color: textColor, margin, width, borderColor }}
      onClick={onClick}
      disabled={disabled}
    >{t(text)}</Button> :
      isSecondaryButton ? <Button
        className={'ant-btn-secondary' + (disabled ? ' ant-btn-disabled' : "")}
        size={size}
        icon={icon}
        loading={loading}
        style={{ backgroundColor: '#FFF', color: "#000", margin, borderColor: '#a1a1a1' }}
        onClick={onClick}
        disabled={disabled}
      >{t(text)}</Button> :
        isSearchButton ? <Button
          className={'ant-btn-primary' + (disabled ? ' ant-btn-disabled' : "")}
          form={form}
          htmlType={htmlType}
          size={size}
          loading={loading}
          icon={<SearchOutlined />}
          style={{ backgroundColor, color: textColor, margin, width, borderColor }}
          // style={{ backgroundColor: '#FFF', color: "#000", margin: '0px 10px 10px 3px', borderColor: '#a1a1a1' }}
          onClick={onClick}
          disabled={disabled}
        >{t("search")}</Button> :
          isSaveButton ? <Button
            className={"ant-btn-primary" + (disabled ? ' ant-btn-disabled' : "")}
            form={form}
            htmlType={htmlType}
            size={size}
            loading={loading}
            icon={icon}
            style={{ backgroundColor, color: textColor, margin, width, borderColor }}
            onClick={onClick}
            disabled={disabled}
          >{text ? t(text) : t("save")}</Button> :
            isCancelButton ? <Button
              className={'ant-btn-danger-cancel' + (disabled ? ' ant-btn-disabled' : "")}
              // className={"ant-btn-danger-cancel" + (disabled ? ' ant-btn-disabled' : "")}
              size={size}
              loading={loading}
              icon={icon}
              style={{ backgroundColor: '#FFF', color: "red", borderColor: 'rgb(9 88 161)', margin, width }}
              // style={{ backgroundColor, color: textColor, margin, width, borderColor }}
              onClick={onClick}
              disabled={disabled}
            >{text ? t(text) : t("cancel")}</Button> :
              isAddButton ? <Button
                className={"ant-btn-primary" + (disabled ? ' ant-btn-disabled' : "")}
                size={size}
                loading={loading}
                icon={icon || <PlusOutlined />}
                style={{ backgroundColor, color: textColor, margin, width, borderColor }}
                onClick={onClick}
                disabled={disabled}
              >{text ? t(text) : t("add")}</Button> :
                isDangerButton ? <Button
                  className={"ant-btn-danger" + (disabled ? ' ant-btn-disabled' : "")}
                  form={form}
                  htmlType={htmlType}
                  size={size}
                  loading={loading}
                  icon={icon}
                  style={{ backgroundColor, color: textColor, margin, width, borderColor }}
                  onClick={onClick}
                  disabled={disabled}
                >{t(text)}</Button> :
                  isSecondaryButtonOutline ? <Button
                    className={'ant-btn-secondary-outline' + (disabled ? ' ant-btn-disabled' : "")}
                    size={size}
                    icon={icon}
                    loading={loading}
                    style={{ backgroundColor: '#FFF', color: "rgb(23 111 193)", margin, borderColor: '#a1a1a1' }}
                    onClick={onClick}
                    disabled={disabled}
                  >{t(text)}</Button> :
                    <Button
                      className={className + (disabled ? ' ant-btn-disabled' : "")}
                      size={size}
                      loading={loading}
                      style={{ backgroundColor, color: textColor, margin, width, borderColor }}
                      onClick={onClick}
                      icon={icon}
                      disabled={disabled}
                    >
                      {t(text)}</Button >
  )
}
