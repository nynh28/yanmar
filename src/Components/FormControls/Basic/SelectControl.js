import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from 'antd';

const { Option } = Select;
const SelectControl = (arg) => {
  const { t } = useTranslation()
  return (<Select
    allowClear={true}
    mode={arg.mode}
    showSearch
    style={arg.style || { width: '100%' }}
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
        return <Option key={item.key} value={item.value}>{item.text}</Option>
      })
    }
  </Select>
  )
}

export default SelectControl

{/*
 <SelectControl
   mode={"multiple"}   //mode : (single/multiple)
   value={"XXXXXXXXXX"}  //single = "key" , multiple = [key]
   label={"owner_partner_type"}
   list={[{key:1, value :"AAAA"},{key:2, value :"BBBBB"}]}
   placeholder={"ph_owner_partner_type"}
   flex={1}
   onChange={(selected) => {
     console.log(selected)
   }}
 />
*/}
