import React from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from 'antd';
const { Option, OptGroup } = Select;

const FormSelectGroup = (arg) => {
  const { t } = useTranslation()
  return (
    <div className="form-group field field-string" style={{ padding: '0 10px', flex: arg.flex || 1 }}>
      {
        !arg.showLabel && <label className="control-label" style={{ fontWeight: 500 }}>
          {t(arg.label)} :
        </label>
      }
      <Select
        allowClear={true}
        mode={arg.mode}
        showSearch
        style={{ width: '100%' }}
        placeholder={t(arg.placeholder)}
        value={arg.value}
        disabled={arg.disabled}
        onChange={arg.onChange}
      >
        {
          arg.list.map((group) => {
            return (
              <OptGroup label={t(group.groupName)}>
                {
                  group.items.map((item) => {
                    return <Option value={item.key}>{t(item.value)}</Option>
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
        mode={"multiple"}  //mode : (single/multiple)
        value={[]}  //single = "key" , multiple = [key]
        label={"user_level"}
        list={[
            {
              "groupName": "Group A",
              "items": [
                {
                  "key": 0,
                  "value": "11111"
                },
                {
                  "key": 1,
                  "value": "2222"
                }
              ]
            },
            {
              "groupName": "Group B",
              "items": [
                {
                  "key": 3,
                  "value": "3333"
                },
                {
                  "key": 4,
                  "value": "444"
                }
              ]
            }
          ]
        }}
        placeholder={"ph_user_level"}
        flex={1}
        onChange={(selected) => {
          }}
    /> */}
