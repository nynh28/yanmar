import React from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from 'antd';
const { Option, OptGroup } = Select;

const FormSelectGroup = (arg) => {
  const { t } = useTranslation()
  const strForSearch = str => {
    return str
      ? str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
      : str;
  };
  // console.log(" arg.fieldForm  >>> ", arg.fieldForm)
  // console.log(" arg.list  >>> ", arg.list)

  return (
    <div className="form-group field field-string" style={{ padding: '0 10px', flex: arg.flex || 1 }}>

      <label className="control-label" style={{ fontWeight: 500, }}>
        {t(arg.label)}
        {
          arg.schema.required && arg.schema.required.includes(arg.fieldForm) && [
            <span className="text-danger">*</span>
          ]
        } :
      </label>
      <Select
        allowClear={true}
        mode={arg.mode}
        showSearch
        style={{ width: '100%' }}
        placeholder={t(arg.placeholder)}
        // defaultValue={arg.value}
        value={arg.value}
        disabled={arg.disabled}
        onChange={arg.onChange}

        // labelInValue={arg.labelInValue}
        filterOption={(input, option) => {
          if (option.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0) {
            return option
          }
        }}
      >
        {
          arg.list.map((group) => {
            return (
              <OptGroup label={group.groupName} style={{ fontWeight: 500 }}>
                {
                  group.items.map((item) => {
                    return <Option value={item.key} key={item.key}>{item.value}</Option>
                  })
                }
              </OptGroup>
            )
          })
        }
      </Select>
    </div>
  )
}

export default FormSelectGroup


{/* <FormSelectGroup
mode={"multiple"}
schema={schema}
value={userLevel}
label={schema.label.userLevel}
list={schema.list.userLevel}
fieldForm={"userLevel"}
placeholder={"ph_owner_partner_name"}
flex={1}
onChange={(selected) => {
  this.setState({
    ["userLevel"]: selected
  }, () => this.props.onChange(this.state));
}}
/> */}
