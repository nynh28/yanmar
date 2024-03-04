import React from 'react'
import './styles.css'
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const { Option } = Select;
export default (props) => {
  const { t } = useTranslation();
  let {
    mode = "", // multiple, tag
    placeholder = "",
    value = "",
    width = "100%",
    style = {},
    list = [],
    showArrow = true,
    showSearch = true,
    allowClear = true,
    disabled = false,
    onChange,
    onSearch
  } = props


  return (<Select
    mode={mode}
    showArrow={showArrow}
    showSearch={showSearch}
    allowClear={allowClear}
    placeholder={t(placeholder)}
    optionFilterProp="children"
    style={{ ...style, width }}
    maxTagCount="responsive"
    value={value}
    onChange={onChange}
    onSearch={onSearch}
    disabled={disabled}
  >
    {list?.map((item) => (
      <Option key={item.key} value={item.key}>
        {item.value}
      </Option>
    ))}
  </Select>
  )
}