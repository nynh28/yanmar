import React from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import { get, isEmpty } from "lodash";

const { Option } = Select;
const FormSelectSearch = (arg) => {
  const { t } = useTranslation();

  return (
    <div
      className="form-group field field-string"
      style={{ padding: arg.padding || "0 10px", flex: arg.flex || 1 }}
      ref={arg.ref}
    >
      {!arg.showLabel && (
        <label className="control-label" style={{ fontWeight: 500 }}>
          {t(arg.label)}
          {arg.schema.required &&
            arg.schema.required.includes(arg.fieldForm) && [
              <span className="text-danger">*</span>,
            ]}{" "}
          :
        </label>
      )}

      <Select
        allowClear={get(arg, "allowClear", true)}
        id={arg.id}
        mode={arg.mode}
        showSearch={arg.showSearch !== undefined ? arg.showSearch : true}
        style={{ width: arg.width || "100%" }}
        placeholder={t(arg.placeholder)}
        // defaultValue={arg.text}
        value={arg.value === "" ? [] : arg.value}
        disabled={arg.disabled}
        onChange={arg.onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        // labelInValue={arg.labelInValue}
      >
        {!isEmpty(arg.list) &&
          arg.list !== null &&
          arg.list.map((item) => {
            return <Option key={item.key}>{t(item.value)}</Option>;
          })}
      </Select>
    </div>
  );
};

export default FormSelectSearch;

{
  /*
 <FormSelectSearch
   mode={"multiple"}
   schema={schema}
   value={ownerPartnerType}
   label={schema.label.ownerPartnerType}
   list={schema.list.ownerPartnerType}
   fieldForm={"ownerPartnerType"}
   placeholder={"ph_owner_partner_name"}
   flex={1}
   onChange={(selected) => {
     this.setState({
       ["ownerPartnerType"]: selected
     }, () => this.props.onChange(this.state));
   }}
 />
*/
}
