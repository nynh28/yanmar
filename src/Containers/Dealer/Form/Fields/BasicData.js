import React, { Component, Suspense } from 'react'
import { Upload } from './Upload';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../styles.css'
import { Row, ButtonGroup, Button, Col, Table } from 'reactstrap'
import DropdownBinding from '../../../../Components/FormGenerator/DropdownBinding/DropdownBinding';
import picProfile0 from './profile0.jpg'
import DataGrid, { Column, Paging, Selection, Editing } from 'devextreme-react/data-grid';
import Tabbed from '../../../../Components/Tabbed'
import BoxCollaps from '../../../../Components/BoxCollaps'
import FormInput from '../../../../Components/FormControls/FormInput'
import FormLabel from '../../../../Components/FormControls/FormLabel'
import FormSelectSearch from '../../../../Components/FormControls/FormSelectSearch'
import FormDatepicker from '../../../../Components/FormControls/FormDatepicker'
import FormRadio from '../../../../Components/FormControls/FormRadio'
import FormUpload from '../../../../Components/FormControls/FormUpload'
import { useTranslation } from 'react-i18next'
import { t } from '../../../../Components/Translation'

const FormInputCus = (arg) => {
  const { t } = useTranslation()

  return (
    <input
      className="form-control"
      type={arg.type}
      value={arg.value}
      required={arg.required}
      placeholder={t(arg.placeholder)}
      onChange={(e) => {
        arg.onChange(e)
        if (e.target.value !== '') {
          e.target.setCustomValidity("");
        }
      }}
      onInvalid={(e) => {
        // console.log("onInvalid : ", e)
        if (e.target.value === '') {
          e.target.setCustomValidity(t('invalid_field_required'));
        } else {
          e.target.setCustomValidity("");
        }
      }}
    />

  )
}


// Define a custom component for handling the root position object
export class BasicData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData,
      inputTypeChange: props.schema.inputTypeChange,
    };
    this.onChangeDate = this.onChangeDate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.formData,
      inputTypeChange: nextProps.schema.inputTypeChange,
    })
  }

  onChange(name) {
    return (event) => {
      this.setState({
        [name]: event.target.value
      }, () => this.props.onChange(this.state));
    };
  }

  onCheckedButton(isActive, fieldForm) {
    this.setState({
      [fieldForm]: isActive
    }, () => this.props.onChange(this.state));

  }

  onChangeDate(name, value) {
    let sta = {
      [name]: value
    }
    this.setState(sta, () => this.props.onChange(this.state));
  }

  // ------------------------------------
  setFormInput(schema, field, fieldNameLabel, fieldForm, placeholder, flex) {
    return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {schema.label && fieldNameLabel + " :"}
        {
          schema.required && schema.required.includes(field) &&
          <span className="required">*</span>
        }
      </label>
      <input
        className="form-control" value={field}
        required={schema.required && schema.required.includes(field)}
        placeholder={placeholder}
        onChange={this.onChange(fieldForm)} />
    </div>
  }

  setHeaderSection(title, showLine = true) {
    return <div>
      {showLine && <div className="hr-line-dashed" />}
      <h3>{title}</h3>
      <div style={{ minHeight: '2rem' }}></div>
    </div>
  }

  setFormInputPrefix(schema, value, fieldNameLabel, fieldForm, placeholder, disabled) {
    return <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {schema.label && fieldNameLabel[1] + " :"}
        {
          schema.required && schema.required.includes(fieldForm[1]) &&
          <span className="required">*</span>
        }
      </label>
      <Row>
        <Col lg={4} md={12}>
          <FormInputCus
            value={value[0]}
            required={schema.required && schema.required.includes(fieldForm[0])}
            placeholder={placeholder[0]}
            disabled={disabled[0]}
            onChange={this.onChange(fieldForm[0])}
          />
        </Col>
        <Col lg={8} md={12}>
          <FormInputCus
            value={value[1]}
            required={schema.required && schema.required.includes(fieldForm[1])}
            placeholder={placeholder[1]}
            disabled={disabled[1]}
            onChange={this.onChange(fieldForm[1])}
          />
        </Col>
      </Row>
    </div>

  }

  setFormInputSuffix(schema, value, fieldNameLabel, fieldForm, placeholder, disabled) {
    return <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {schema.label && fieldNameLabel[0] + " :"}
        {
          schema.required && schema.required.includes(fieldForm[1]) &&
          <span className="required">*</span>
        }
      </label>
      <Row>
        <Col lg={8} md={12}>
          <FormInputCus
            value={value[0]}
            required={schema.required && schema.required.includes(fieldForm[0])}
            placeholder={placeholder[0]}
            disabled={disabled[0]}
            onChange={this.onChange(fieldForm[0])}
          />
        </Col>
        <Col lg={4} md={12}>
          <FormInputCus
            value={value[1]}
            required={schema.required && schema.required.includes(fieldForm[1])}
            placeholder={placeholder[1]}
            disabled={disabled[1]}
            onChange={this.onChange(fieldForm[1])}
          />
        </Col>
      </Row>



    </div>


    //     disabled={this.props.disabled}
  }


  render() {
    const {
      inputTypeChange,
      individual, taxId, taxBranchId, dealerCode, areaCode,
      dealerPrefixTh, dealerFirstNameTh, dealerLastNameTh, dealerSuffixTh,
      dealerPrefixEn, dealerFirstNameEn, dealerLastNameEn, dealerSuffixEn,
      email, lineId1,

      groupTaxId, groupTaxBranchId, lineId2,

      country, houseNo, villageNo, building, roomNo, soi, road, villageName, subDistrict, district, province, postalCode, phone1, ext1, phone2, ext2, fax,
      isCurrentSameOfficial, country_current, houseNo_current, villageNo_current, building_current, roomNo_current, soi_current, road_current, villageName_current, subDistrict_current, district_current, province_current, postalCode_current, phone1_current, ext1_current, phone2_current, ext2_current, fax_current,
      isBillingSameOfficail, country_billing, houseNo_billing, villageNo_billing, building_billing, roomNo_billing, soi_billing, road_billing, villageName_billing, subDistrict_billing, district_billing, province_billing, postalCode_billing, phone1_billing, ext1_billing, phone2_billing, ext2_billing, fax_billing,
      isMailingSameOfficail, country_mailing, houseNo_mailing, villageNo_mailing, building_mailing, roomNo_mailing, soi_mailing, road_mailing, villageName_mailing, subDistrict_mailing, district_mailing, province_mailing, postalCode_mailing, phone1_mailing, ext1_mailing, phone2_mailing, ext2_mailing, fax_mailing,

      signatory1, signatory2,
      // endoserName, endoserPosition,
      businessType, vendorBusinessType, corporateType, lock, active, lastUpdated,
      userName, mobile, email2, lineId3, registerDate, userQuota,
      peopleName, peoplePhone, peopleExt, peopleEmail, peopleLine, peopleDescription,


    } = this.state
    const { schema } = this.props
    return (

      <Suspense fallback={null}>
        <Tabbed
          tabName={[t('information'), t('group_company'), t('address'), t('signatory'), t('type_and_business'), t('admin_user'), t('setting'), t('contact_people')]}
          tabPane={[
            // Dealer Information Tab ---------------------
            <div>
              <Row>
                <Col lg={6} md={12}>
                  <FormRadio
                    schema={schema}
                    value={individual}
                    label={schema.label.individual}
                    fieldForm={"individual"}
                    flex={1}
                    onClick={(individual, fieldForm) => {
                      this.onCheckedButton(individual, fieldForm)
                    }}
                  />
                </Col>
                <Col lg={6} md={12}>
                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={taxId}
                        label={schema.label.taxId}
                        fieldForm={"taxid"}
                        placeholder={"ph_tax_id"}
                        flex={2}
                        onChange={this.onChange("taxId")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={taxBranchId}
                        label={schema.label.taxBranchId}
                        fieldForm={"taxBranchId"}
                        placeholder={"ph_tax_branch"}
                        flex={2}
                        onChange={this.onChange("taxBranchId")}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={dealerCode}
                    label={schema.label.dealerCode}
                    fieldForm={"dealerCode"}
                    placeholder={"ph_code"}
                    // flex={2}
                    onChange={this.onChange("dealerCode")}
                  />
                </Col>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={areaCode}
                    label={schema.label.areaCode}
                    fieldForm={"areaCode"}
                    placeholder={"ph_area_code"}
                    // flex={2}
                    onChange={this.onChange("areaCode")}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={12}>
                  <div className="form-group field field-string" style={{ flex: 1 }}>
                    <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                      <FormInput
                        schema={schema}
                        value={dealerPrefixTh}
                        label={schema.label.dealerPrefixTh}
                        fieldForm={"dealerPrefixTh"}
                        placeholder={"ph_prefix_th"}
                        flex={1}
                        onChange={this.onChange("dealerPrefixTh")}
                      />

                      <FormInput
                        schema={schema}
                        value={dealerFirstNameTh}
                        label={schema.label.dealerFirstNameTh}
                        fieldForm={"dealerFirstNameTh"}
                        placeholder={"ph_first_name_th"}
                        flex={3}
                        onChange={this.onChange("dealerFirstNameTh")}
                      />
                    </div>
                  </div>
                  {/* {this.setFormInputPrefix(schema, [dealerPrefixTh, dealerFirstNameTh], [schema.label.dealerPrefixTh, schema.label.dealerFirstNameTh], ["dealerPrefixTh", "dealerFirstNameTh"], ["ph_prefix_th", "ph_first_name_th"], [false, false])} */}
                </Col>
                <Col lg={6} md={12}>
                  <div className="form-group field field-string" style={{ flex: 1 }}>
                    <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                      <FormInput
                        schema={schema}
                        value={dealerLastNameTh}
                        label={schema.label.dealerLastNameTh}
                        fieldForm={"dealerLastNameTh"}
                        placeholder={"ph_last_name_th"}
                        flex={3}
                        onChange={this.onChange("dealerLastNameTh")}
                      />

                      <FormInput
                        schema={schema}
                        value={dealerSuffixTh}
                        label={schema.label.dealerSuffixTh}
                        fieldForm={"dealerSuffixTh"}
                        placeholder={"ph_suffix_th"}
                        flex={1}
                        onChange={this.onChange("dealerSuffixTh")}
                      />
                    </div>
                  </div>
                  {/* {this.setFormInputSuffix(schema, [dealerLastNameTh, dealerSuffixTh], [schema.label.dealerLastNameTh, schema.label.dealerSuffixTh], ["dealerLastNameTh", "dealerSuffixTh"], ["ph_last_name_th", "ph_suffix_th"], [false, false])} */}
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={12}>
                  <div className="form-group field field-string" style={{ flex: 1 }}>
                    <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                      <FormInput
                        schema={schema}
                        value={dealerPrefixEn}
                        label={schema.label.dealerPrefixEn}
                        fieldForm={"dealerPrefixEn"}
                        placeholder={"ph_prefix_en"}
                        flex={1}
                        onChange={this.onChange("dealerPrefixEn")}
                      />

                      <FormInput
                        schema={schema}
                        value={dealerFirstNameEn}
                        label={schema.label.dealerFirstNameEn}
                        fieldForm={"dealerFirstNameEn"}
                        placeholder={"ph_first_name_en"}
                        flex={3}
                        onChange={this.onChange("dealerFirstNameEn")}
                      />
                    </div>
                  </div>
                  {/* {this.setFormInputPrefix(schema, [dealerPrefixEn, dealerFirstNameEn], [schema.label.dealerPrefixEn, schema.label.dealerFirstNameEn], ["dealerPrefixEn", "dealerFirstNameEn"], ["ph_prefix_en", "ph_first_name_en"], [false, false])} */}
                </Col>
                <Col lg={6} md={12}>
                  <div className="form-group field field-string" style={{ flex: 1 }}>
                    <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                      <FormInput
                        schema={schema}
                        value={dealerLastNameEn}
                        label={schema.label.dealerLastNameEn}
                        fieldForm={"dealerLastNameEn"}
                        placeholder={"ph_last_name_en"}
                        flex={3}
                        onChange={this.onChange("dealerLastNameEn")}
                      />

                      <FormInput
                        schema={schema}
                        value={dealerSuffixEn}
                        label={schema.label.dealerSuffixEn}
                        fieldForm={"dealerSuffixEn"}
                        placeholder={"ph_suffix_en"}
                        flex={1}
                        onChange={this.onChange("dealerSuffixEn")}
                      />
                    </div>
                  </div>
                  {/* {this.setFormInputSuffix(schema, [dealerLastNameEn, dealerSuffixEn], [schema.label.dealerLastNameEn, schema.label.dealerSuffixEn], ["dealerLastNameEn", "dealerSuffixEn"], ["ph_last_name_en", "ph_suffix_en"], [false, false])} */}
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={email}
                    label={schema.label.email}
                    fieldForm={"email"}
                    placeholder={"ph_email"}
                    // flex={2}
                    onChange={this.onChange("email")}
                  />
                </Col>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={lineId1}
                    label={schema.label.lineId1}
                    fieldForm={"lineId1"}
                    placeholder={"ph_line_id"}
                    // flex={2}
                    onChange={this.onChange("lineId1")}
                  />
                </Col>
              </Row>


            </div>
            ,
            // Group Company Tab ---------------------
            <div>
              <Row>
                <Col lg={6} md={12}>
                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={groupTaxId}
                        label={schema.label.groupTaxId}
                        fieldForm={"groupTaxId"}
                        placeholder={"ph_group_tax"}
                        // flex={2}
                        onChange={this.onChange("groupTaxId")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={groupTaxBranchId}
                        label={schema.label.groupTaxBranchId}
                        fieldForm={"groupTaxBranchId"}
                        placeholder={"ph_group_tax_branch"}
                        // flex={2}
                        onChange={this.onChange("groupTaxBranchId")}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={lineId2}
                    label={schema.label.lineId2}
                    fieldForm={"lineId2"}
                    placeholder={"ph_line_id"}
                    // flex={2}
                    onChange={this.onChange("lineId2")}
                  />
                </Col>
              </Row>
            </div>
            ,
            // Address Tab ---------------------
            <div>
              <BoxCollaps boxid={1} title={'Official Address'}>
                <div>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={houseNo}
                        label={schema.label.houseNo}
                        fieldForm={"houseNo"}
                        placeholder={"ph_house_no"}
                        // flex={2}
                        onChange={this.onChange("houseNo")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={villageNo}
                        label={schema.label.villageNo}
                        fieldForm={"villageNo"}
                        placeholder={"ph_village_no"}
                        // flex={2}
                        onChange={this.onChange("villageNo")}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={building}
                        label={schema.label.building}
                        fieldForm={"building"}
                        placeholder={"ph_building"}
                        // flex={2}
                        onChange={this.onChange("building")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={roomNo}
                        label={schema.label.roomNo}
                        fieldForm={"roomNo"}
                        placeholder={"ph_room_no"}
                        // flex={2}
                        onChange={this.onChange("roomNo")}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={soi}
                        label={schema.label.soi}
                        fieldForm={"soi"}
                        placeholder={"ph_soi"}
                        // flex={2}
                        onChange={this.onChange("soi")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={road}
                        label={schema.label.road}
                        fieldForm={"road"}
                        placeholder={"ph_road"}
                        // flex={2}
                        onChange={this.onChange("road")}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={villageName}
                        label={schema.label.villageName}
                        fieldForm={"villageName"}
                        placeholder={"ph_village_name"}
                        // flex={2}
                        onChange={this.onChange("villageName")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      {country == '1' ?
                        <FormSelectSearch
                          mode={"single"}
                          schema={schema}
                          value={subDistrict}
                          label={schema.label.subDistrict}
                          list={schema.list.subDistrict}
                          fieldForm={"subDistrict"}
                          placeholder={"ph_sub_district"}
                          disabled={(district.length === 0 || province.length === 0) ? true : false}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              ["subDistrict"]: selected
                            }, () => this.props.onChange(this.state));
                          }}
                        />
                        : <FormInput
                          schema={schema}
                          value={subDistrict}
                          label={schema.label.subDistrict}
                          fieldForm={"subDistrict"}
                          placeholder={"ph_sub_district"}
                          // flex={2}
                          onChange={this.onChange("subDistrict")}
                        />
                      }
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      {country == '1' ?
                        <FormSelectSearch
                          mode={"single"}
                          schema={schema}
                          value={district}
                          label={schema.label.district}
                          list={schema.list.district}
                          fieldForm={"district"}
                          placeholder={"ph_district"}
                          disabled={(province.length === 0) ? true : false}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              ["district"]: selected
                            }, () => this.props.onChange(this.state));
                          }}
                        />
                        : <FormInput
                          schema={schema}
                          value={district}
                          label={schema.label.district}
                          fieldForm={"district"}
                          placeholder={"ph_district"}
                          // flex={2}
                          onChange={this.onChange("district")}
                        />
                      }
                    </Col>
                    <Col lg={6} md={12}>
                      {country == '1' ?
                        <FormSelectSearch
                          mode={"single"}
                          schema={schema}
                          value={province}
                          label={schema.label.province}
                          list={schema.list.province}
                          fieldForm={"province"}
                          placeholder={"ph_province"}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              ["province"]: selected
                            }, () => this.props.onChange(this.state));
                          }}
                        />
                        : <FormInput
                          schema={schema}
                          value={province}
                          label={schema.label.province}
                          fieldForm={"province"}
                          placeholder={"ph_province"}
                          // flex={2}
                          onChange={this.onChange("province")}
                        />
                      }
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormSelectSearch
                        mode={"single"}
                        schema={schema}
                        value={country}
                        label={schema.label.country}
                        list={schema.list.country}
                        fieldForm={"country"}
                        placeholder={"ph_country"}
                        flex={1}
                        onChange={(selected) => {
                          this.setState({
                            ["country"]: selected
                          }, () => this.props.onChange(this.state));
                        }}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={postalCode}
                        label={schema.label.postalCode}
                        fieldForm={"postalCode"}
                        placeholder={"ph_postal_code"}
                        // flex={2}
                        onChange={this.onChange("postalCode")}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>

                      <div className="form-group field field-string" style={{ flex: 1 }}>
                        <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                          <FormInput
                            schema={schema}
                            value={phone1}
                            label={schema.label.phone1}
                            fieldForm={"phone1"}
                            placeholder={"ph_phone"}
                            flex={3}
                            onChange={this.onChange("phone1")}
                          />

                          <FormInput
                            schema={schema}
                            value={ext1}
                            label={schema.label.ext1}
                            fieldForm={"ext1"}
                            placeholder={"ph_ext"}
                            flex={1}
                            onChange={this.onChange("ext1")}
                          />
                        </div>
                      </div>

                    </Col>
                    <Col lg={6} md={12}>
                      <div className="form-group field field-string" style={{ flex: 1 }}>
                        <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                          <FormInput
                            schema={schema}
                            value={phone2}
                            label={schema.label.phone2}
                            fieldForm={"phone2"}
                            placeholder={"ph_phone"}
                            flex={3}
                            onChange={this.onChange("phone2")}
                          />

                          <FormInput
                            schema={schema}
                            value={ext2}
                            label={schema.label.ext2}
                            fieldForm={"ext2"}
                            placeholder={"ph_ext"}
                            flex={1}
                            onChange={this.onChange("ext2")}
                          />
                        </div>
                      </div>

                    </Col>
                  </Row>
                </div>
              </BoxCollaps>

              <BoxCollaps boxid={2} title={'Current Address'}>
                <Row>
                  <Col lg={6} md={12}>
                    <FormRadio
                      schema={schema}
                      value={isCurrentSameOfficial}
                      label={schema.label.isCurrentSameOfficial}
                      fieldForm={"isCurrentSameOfficial"}
                      flex={1}
                      onClick={(isCurrentSameOfficial, fieldForm) => {
                        this.onCheckedButton(isCurrentSameOfficial, fieldForm)
                      }}
                    />
                  </Col>
                  <Col lg={6} md={12} />
                </Row>

                {!isCurrentSameOfficial && <div>
                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={houseNo_current}
                        label={schema.label.houseNo_current}
                        fieldForm={"houseNo_current"}
                        placeholder={"ph_house_no"}
                        // flex={2}
                        onChange={this.onChange("houseNo_current")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={villageNo_current}
                        label={schema.label.villageNo_current}
                        fieldForm={"villageNo_current"}
                        placeholder={"ph_village_no"}
                        // flex={2}
                        onChange={this.onChange("villageNo_current")}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={building_current}
                        label={schema.label.building_current}
                        fieldForm={"building_current"}
                        placeholder={"ph_building"}
                        // flex={2}
                        onChange={this.onChange("building_current")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={roomNo_current}
                        label={schema.label.roomNo_current}
                        fieldForm={"roomNo_current"}
                        placeholder={"ph_room_no"}
                        // flex={2}
                        onChange={this.onChange("roomNo_current")}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={soi_current}
                        label={schema.label.soi_current}
                        fieldForm={"soi_current"}
                        placeholder={"ph_soi"}
                        // flex={2}
                        onChange={this.onChange("soi_current")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={road_current}
                        label={schema.label.road_current}
                        fieldForm={"road_current"}
                        placeholder={"ph_road"}
                        // flex={2}
                        onChange={this.onChange("road_current")}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={villageName_current}
                        label={schema.label.villageName_current}
                        fieldForm={"villageName_current"}
                        placeholder={"ph_village_name"}
                        // flex={2}
                        onChange={this.onChange("villageName_current")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      {country_current == "1" ?
                        <FormSelectSearch
                          mode={"single"}
                          schema={schema}
                          value={subDistrict_current}
                          label={schema.label.subDistrict_current}
                          list={schema.list.subDistrict_current}
                          fieldForm={"subDistrict_current"}
                          placeholder={"ph_sub_district"}
                          disabled={(district_current.length === 0 || province_current.length === 0) ? true : false}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              ["subDistrict_current"]: selected
                            }, () => this.props.onChange(this.state));
                          }}
                        />
                        : <FormInput
                          schema={schema}
                          value={subDistrict_current}
                          label={schema.label.subDistrict_current}
                          fieldForm={"subDistrict_current"}
                          placeholder={"ph_sub_district"}
                          // flex={2}
                          onChange={this.onChange("subDistrict_current")}
                        />
                      }
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      {country_current == "1" ?
                        <FormSelectSearch
                          mode={"single"}
                          schema={schema}
                          value={district_current}
                          label={schema.label.district_current}
                          list={schema.list.district_current}
                          fieldForm={"district_current"}
                          placeholder={"ph_district"}
                          disabled={(province_current.length === 0) ? true : false}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              ["district_current"]: selected
                            }, () => this.props.onChange(this.state));
                          }}
                        />
                        : <FormInput
                          schema={schema}
                          value={district_current}
                          label={schema.label.district_current}
                          fieldForm={"district_current"}
                          placeholder={"ph_district"}
                          // flex={2}
                          onChange={this.onChange("district_current")}
                        />
                      }
                    </Col>
                    <Col lg={6} md={12}>
                      {country_current == "1" ?
                        <FormSelectSearch
                          mode={"single"}
                          schema={schema}
                          value={province_current}
                          label={schema.label.province_current}
                          list={schema.list.province_current}
                          fieldForm={"province_current"}
                          placeholder={"ph_province"}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              ["province_current"]: selected
                            }, () => this.props.onChange(this.state));
                          }}
                        />
                        : <FormInput
                          schema={schema}
                          value={province_current}
                          label={schema.label.province_current}
                          fieldForm={"province_current"}
                          placeholder={"ph_province"}
                          // flex={2}
                          onChange={this.onChange("province_current")}
                        />
                      }
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormSelectSearch
                        mode={"single"}
                        schema={schema}
                        value={country_current}
                        label={schema.label.country_current}
                        list={schema.list.country_current}
                        fieldForm={"country_current"}
                        placeholder={""}
                        flex={1}
                        onChange={(selected) => {
                          this.setState({
                            ["country_current"]: selected
                          }, () => this.props.onChange(this.state));
                        }}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={postalCode_current}
                        label={schema.label.postalCode_current}
                        fieldForm={"postalCode_current"}
                        placeholder={"ph_postal_code"}
                        // flex={2}
                        onChange={this.onChange("postalCode_current")}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>

                      <div className="form-group field field-string" style={{ flex: 1 }}>
                        <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                          <FormInput
                            schema={schema}
                            value={phone1_current}
                            label={schema.label.phone1_current}
                            fieldForm={"phone1_current"}
                            placeholder={"ph_phone"}
                            flex={3}
                            onChange={this.onChange("phone1_current")}
                          />

                          <FormInput
                            schema={schema}
                            value={ext1_current}
                            label={schema.label.ext1_current}
                            fieldForm={"ext1_current"}
                            placeholder={"ph_ext"}
                            flex={1}
                            onChange={this.onChange("ext1_current")}
                          />
                        </div>
                      </div>

                    </Col>
                    <Col lg={6} md={12}>
                      <div className="form-group field field-string" style={{ flex: 1 }}>
                        <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                          <FormInput
                            schema={schema}
                            value={phone2_current}
                            label={schema.label.phone2_current}
                            fieldForm={"phone2_current"}
                            placeholder={"ph_phone"}
                            flex={3}
                            onChange={this.onChange("phone2_current")}
                          />
                          <FormInput
                            schema={schema}
                            value={ext2_current}
                            label={schema.label.ext2_current}
                            fieldForm={"ext2_current"}
                            placeholder={"ph_ext"}
                            flex={1}
                            onChange={this.onChange("ext2_current")}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                }

              </BoxCollaps>

              <BoxCollaps boxid={3} title={'Billing Address'}>
                <Row>
                  <Col lg={6} md={12}>
                    <FormRadio
                      schema={schema}
                      value={isBillingSameOfficail}
                      label={schema.label.isBillingSameOfficail}
                      fieldForm={"isBillingSameOfficail"}
                      flex={1}
                      onClick={(isBillingSameOfficail, fieldForm) => {
                        this.onCheckedButton(isBillingSameOfficail, fieldForm)
                      }}
                    />
                  </Col>
                  <Col lg={6} md={12} />
                </Row>

                {!isBillingSameOfficail && <div>
                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={houseNo_billing}
                        label={schema.label.houseNo_billing}
                        fieldForm={"houseNo_billing"}
                        placeholder={"ph_house_no"}
                        // flex={2}
                        onChange={this.onChange("houseNo_billing")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={villageNo_billing}
                        label={schema.label.villageNo_billing}
                        fieldForm={"villageNo_billing"}
                        placeholder={"ph_village_no"}
                        // flex={2}
                        onChange={this.onChange("villageNo_billing")}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={building_billing}
                        label={schema.label.building_billing}
                        fieldForm={"building_billing"}
                        placeholder={"ph_building"}
                        // flex={2}
                        onChange={this.onChange("building_billing")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={roomNo_billing}
                        label={schema.label.roomNo_billing}
                        fieldForm={"roomNo_billing"}
                        placeholder={"ph_room_no"}
                        // flex={2}
                        onChange={this.onChange("roomNo_billing")}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={soi_billing}
                        label={schema.label.soi_billing}
                        fieldForm={"soi_billing"}
                        placeholder={"ph_soi"}
                        // flex={2}
                        onChange={this.onChange("soi_billing")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={road_billing}
                        label={schema.label.road_billing}
                        fieldForm={"road_billing"}
                        placeholder={"ph_road"}
                        // flex={2}
                        onChange={this.onChange("road_billing")}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={villageName_billing}
                        label={schema.label.villageName_billing}
                        fieldForm={"villageName_billing"}
                        placeholder={"ph_village_name"}
                        // flex={2}
                        onChange={this.onChange("villageName_billing")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      {country_billing == "1" ?
                        <FormSelectSearch
                          mode={"single"}
                          schema={schema}
                          value={subDistrict_billing}
                          label={schema.label.subDistrict_billing}
                          list={schema.list.subDistrict_billing}
                          fieldForm={"subDistrict_billing"}
                          placeholder={"ph_sub_district"}
                          flex={1}
                          disabled={(district_billing.length === 0 || province_billing.length === 0) ? true : false}
                          onChange={(selected) => {
                            this.setState({
                              ["subDistrict_billing"]: selected
                            }, () => this.props.onChange(this.state));
                          }}
                        />
                        : <FormInput
                          schema={schema}
                          value={subDistrict_billing}
                          label={schema.label.subDistrict_billing}
                          fieldForm={"subDistrict_billing"}
                          placeholder={"ph_sub_district"}
                          // flex={2}
                          onChange={this.onChange("subDistrict_billing")}
                        />
                      }
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      {country_billing == "1" ?
                        <FormSelectSearch
                          mode={"single"}
                          schema={schema}
                          value={district_billing}
                          label={schema.label.district_billing}
                          list={schema.list.district_billing}
                          fieldForm={"district_billing"}
                          placeholder={"ph_district"}
                          disabled={(province_billing.length === 0) ? true : false}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              ["district_billing"]: selected
                            }, () => this.props.onChange(this.state));
                          }}
                        />
                        : <FormInput
                          schema={schema}
                          value={district_billing}
                          label={schema.label.district_billing}
                          fieldForm={"district_billing"}
                          placeholder={"ph_district"}
                          // flex={2}
                          onChange={this.onChange("district_billing")}
                        />
                      }
                    </Col>
                    <Col lg={6} md={12}>
                      {country_billing == "1" ?
                        <FormSelectSearch
                          mode={"single"}
                          schema={schema}
                          value={province_billing}
                          label={schema.label.province_billing}
                          list={schema.list.province_billing}
                          fieldForm={"province_billing"}
                          placeholder={"ph_province"}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              ["province_billing"]: selected
                            }, () => this.props.onChange(this.state));
                          }}
                        />
                        : <FormInput
                          schema={schema}
                          value={province_billing}
                          label={schema.label.province_billing}
                          fieldForm={"province_billing"}
                          placeholder={"ph_province"}
                          // flex={2}
                          onChange={this.onChange("province_billing")}
                        />
                      }
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormSelectSearch
                        mode={"single"}
                        schema={schema}
                        value={country_billing}
                        label={schema.label.country_billing}
                        list={schema.list.country_billing}
                        fieldForm={"country_billing"}
                        placeholder={""}
                        flex={1}
                        onChange={(selected) => {
                          this.setState({
                            ["country_billing"]: selected
                          }, () => this.props.onChange(this.state));
                        }}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={postalCode_billing}
                        label={schema.label.postalCode_billing}
                        fieldForm={"postalCode_billing"}
                        placeholder={"ph_postal_code"}
                        // flex={2}
                        onChange={this.onChange("postalCode_billing")}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <div className="form-group field field-string" style={{ flex: 1 }}>
                        <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                          <FormInput
                            schema={schema}
                            value={phone1_billing}
                            label={schema.label.phone1_billing}
                            fieldForm={"phone1_billing"}
                            placeholder={"ph_phone"}
                            flex={3}
                            onChange={this.onChange("phone1_billing")}
                          />

                          <FormInput
                            schema={schema}
                            value={ext1_billing}
                            label={schema.label.ext1_billing}
                            fieldForm={"ext1_billing"}
                            placeholder={"ph_ext"}
                            flex={1}
                            onChange={this.onChange("ext1_billing")}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col lg={6} md={12}>
                      <div className="form-group field field-string" style={{ flex: 1 }}>
                        <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                          <FormInput
                            schema={schema}
                            value={phone2_billing}
                            label={schema.label.phone2_billing}
                            fieldForm={"phone2_billing"}
                            placeholder={"ph_phone"}
                            flex={3}
                            onChange={this.onChange("phone2_billing")}
                          />

                          <FormInput
                            schema={schema}
                            value={ext2_billing}
                            label={schema.label.ext2_billing}
                            fieldForm={"ext2_billing"}
                            placeholder={"ph_ext"}
                            flex={1}
                            onChange={this.onChange("ext2_billing")}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>}
              </BoxCollaps>

              <BoxCollaps boxid={4} title={'Mailing Address'}>
                <Row>
                  <Col lg={6} md={12}>
                    <FormRadio
                      schema={schema}
                      value={isMailingSameOfficail}
                      label={schema.label.isMailingSameOfficail}
                      fieldForm={"isMailingSameOfficail"}
                      flex={1}
                      onClick={(isMailingSameOfficail, fieldForm) => {
                        this.onCheckedButton(isMailingSameOfficail, fieldForm)
                      }}
                    />
                  </Col>
                  <Col lg={6} md={12} />
                </Row>

                {!isMailingSameOfficail && <div>
                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={houseNo_mailing}
                        label={schema.label.houseNo_mailing}
                        fieldForm={"houseNo_mailing"}
                        placeholder={"ph_house_no"}
                        // flex={2}
                        onChange={this.onChange("houseNo_mailing")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={villageNo_mailing}
                        label={schema.label.villageNo_mailing}
                        fieldForm={"villageNo_mailing"}
                        placeholder={"ph_village_no"}
                        // flex={2}
                        onChange={this.onChange("villageNo_mailing")}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={building_mailing}
                        label={schema.label.building_mailing}
                        fieldForm={"building_mailing"}
                        placeholder={"ph_building"}
                        // flex={2}
                        onChange={this.onChange("building_mailing")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={roomNo_mailing}
                        label={schema.label.roomNo_mailing}
                        fieldForm={"roomNo_mailing"}
                        placeholder={"ph_room_no"}
                        // flex={2}
                        onChange={this.onChange("roomNo_mailing")}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={soi_mailing}
                        label={schema.label.soi_mailing}
                        fieldForm={"soi_mailing"}
                        placeholder={"ph_soi"}
                        // flex={2}
                        onChange={this.onChange("soi_mailing")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={road_mailing}
                        label={schema.label.road_mailing}
                        fieldForm={"road_mailing"}
                        placeholder={"ph_road"}
                        // flex={2}
                        onChange={this.onChange("road_mailing")}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={villageName_mailing}
                        label={schema.label.villageName_mailing}
                        fieldForm={"villageName_mailing"}
                        placeholder={"ph_village_name"}
                        // flex={2}
                        onChange={this.onChange("villageName_mailing")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      {country_mailing == "1" ?
                        <FormSelectSearch
                          mode={"single"}
                          schema={schema}
                          value={subDistrict_mailing}
                          label={schema.label.subDistrict_mailing}
                          list={schema.list.subDistrict_mailing}
                          fieldForm={"subDistrict_mailing"}
                          placeholder={"ph_sub_district"}
                          disabled={(district_mailing.length === 0 || province_mailing.length === 0) ? true : false}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              ["subDistrict_mailing"]: selected
                            }, () => this.props.onChange(this.state));
                          }}
                        />
                        : <FormInput
                          schema={schema}
                          value={subDistrict_mailing}
                          label={schema.label.subDistrict_mailing}
                          fieldForm={"subDistrict_mailing"}
                          placeholder={"ph_sub_district"}
                          // disabled={(district_mailing.length === 0 || province_mailing.length === 0) ? true : false}
                          // flex={2}
                          onChange={this.onChange("subDistrict_mailing")}
                        />
                      }
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      {country_mailing == "1" ?
                        <FormSelectSearch
                          mode={"single"}
                          schema={schema}
                          value={district_mailing}
                          label={schema.label.district_mailing}
                          list={schema.list.district_mailing}
                          fieldForm={"district_mailing"}
                          placeholder={"ph_district"}
                          disabled={(province_mailing.length === 0) ? true : false}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              ["district_mailing"]: selected
                            }, () => this.props.onChange(this.state));
                          }}
                        />
                        : <FormInput
                          schema={schema}
                          value={district_mailing}
                          label={schema.label.district_mailing}
                          fieldForm={"district_mailing"}
                          // disabled={(province_mailing.length === 0) ? true : false}
                          placeholder={"ph_district"}
                          // flex={2}
                          onChange={this.onChange("district_mailing")}
                        />
                      }
                    </Col>
                    <Col lg={6} md={12}>
                      {country_mailing == "1" ?
                        <FormSelectSearch
                          mode={"single"}
                          schema={schema}
                          value={province_mailing}
                          label={schema.label.province_mailing}
                          list={schema.list.province_mailing}
                          fieldForm={"province_mailing"}
                          placeholder={"ph_province"}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              ["province_mailing"]: selected
                            }, () => this.props.onChange(this.state));
                          }}
                        />
                        : <FormInput
                          schema={schema}
                          value={province_mailing}
                          label={schema.label.province_mailing}
                          fieldForm={"province_mailing"}
                          placeholder={"ph_province"}
                          // flex={2}
                          onChange={this.onChange("province_mailing")}
                        />
                      }
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormSelectSearch
                        mode={"single"}
                        schema={schema}
                        value={country_mailing}
                        label={schema.label.country_mailing}
                        list={schema.list.country_mailing}
                        fieldForm={"country_mailing"}
                        placeholder={""}
                        flex={1}
                        onChange={(selected) => {
                          this.setState({
                            ["country_mailing"]: selected
                          }, () => this.props.onChange(this.state));
                        }}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={postalCode_mailing}
                        label={schema.label.postalCode_mailing}
                        fieldForm={"postalCode_mailing"}
                        placeholder={"ph_postal_code"}
                        // flex={2}
                        onChange={this.onChange("postalCode_mailing")}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <div className="form-group field field-string" style={{ flex: 1 }}>
                        <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                          <FormInput
                            schema={schema}
                            value={phone1_mailing}
                            label={schema.label.phone1_mailing}
                            fieldForm={"phone1_mailing"}
                            placeholder={"ph_phone"}
                            flex={3}
                            onChange={this.onChange("phone1_mailing")}
                          />
                          <FormInput
                            schema={schema}
                            value={ext1_mailing}
                            label={schema.label.ext1_mailing}
                            fieldForm={"ext1_mailing"}
                            placeholder={"ph_ext"}
                            flex={1}
                            onChange={this.onChange("ext1_mailing")}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col lg={6} md={12}>
                      <div className="form-group field field-string" style={{ flex: 1 }}>
                        <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                          <FormInput
                            schema={schema}
                            value={phone2_mailing}
                            label={schema.label.phone2_mailing}
                            fieldForm={"phone2_mailing"}
                            placeholder={"ph_phone"}
                            flex={3}
                            onChange={this.onChange("phone2_mailing")}
                          />

                          <FormInput
                            schema={schema}
                            value={ext2_mailing}
                            label={schema.label.ext2_mailing}
                            fieldForm={"ext2_mailing"}
                            placeholder={"ph_ext"}
                            flex={1}
                            onChange={this.onChange("ext2_mailing")}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>}
              </BoxCollaps>
            </div>
            ,
            // ----------------------------------
            <div>

              <Row>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={signatory1}
                    label={schema.label.signatory1}
                    fieldForm={"signatory1"}
                    placeholder={"ph_signatory"}
                    // flex={2}
                    onChange={this.onChange("signatory1")}
                  />
                </Col>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={signatory2}
                    label={schema.label.signatory2}
                    fieldForm={"signatory2"}
                    placeholder={"ph_signatory"}
                    // flex={2}
                    onChange={this.onChange("signatory2")}
                  />
                </Col>
              </Row>

            </div>
            ,
            // ----------------------------------
            <div>

              <Row>
                <Col lg={6} md={12}>
                  <FormSelectSearch
                    mode={"single"}
                    schema={schema}
                    value={businessType}
                    label={schema.label.businessType}
                    list={schema.list.businessType}
                    fieldForm={"businessType"}
                    placeholder={"ph_business_type"}
                    flex={1}
                    onChange={(selected) => {
                      this.setState({
                        ["businessType"]: selected
                      }, () => this.props.onChange(this.state));
                    }}
                  />
                </Col>
                <Col lg={6} md={12}>
                  <FormSelectSearch
                    mode={"single"}
                    schema={schema}
                    value={vendorBusinessType}
                    label={schema.label.vendorBusinessType}
                    list={schema.list.vendorBusinessType}
                    fieldForm={"vendorBusinessType"}
                    placeholder={"ph_vendor_business_type"}
                    flex={1}
                    onChange={(selected) => {
                      this.setState({
                        ["vendorBusinessType"]: selected
                      }, () => this.props.onChange(this.state));
                    }}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={12}>
                  <FormSelectSearch
                    mode={"single"}
                    schema={schema}
                    value={corporateType}
                    label={schema.label.corporateType}
                    list={schema.list.corporateType}
                    fieldForm={"corporateType"}
                    placeholder={"ph_corporate_type"}
                    flex={1}
                    onChange={(selected) => {
                      this.setState({
                        ["corporateType"]: selected
                      }, () => this.props.onChange(this.state));
                    }}
                  />
                </Col>
                <Col lg={6} md={12}>
                  <FormRadio
                    schema={schema}
                    value={lock}
                    label={schema.label.lock}
                    fieldForm={"lock"}
                    flex={1}
                    onClick={(lock, fieldForm) => {
                      this.onCheckedButton(lock, fieldForm)
                    }}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={12}>
                  <FormRadio
                    schema={schema}
                    value={active}
                    label={schema.label.active}
                    fieldForm={"active"}
                    flex={1}
                    onClick={(active, fieldForm) => {
                      this.onCheckedButton(active, fieldForm)
                    }}
                  />
                </Col>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={lastUpdated}
                    label={schema.label.lastUpdated}
                    fieldForm={"lastUpdated"}
                    placeholder={"ph_last_updated"}
                    // flex={2}
                    disabled={true}
                    onChange={this.onChange("lastUpdated")}
                  />
                </Col>
              </Row>


            </div>

            ,
            // ----------------------------------
            <div>
              {
                // this.props.formAction.action === "add" &&
                <Row>
                  <Col lg={12} style={{ marginLeft: 10, marginBottom: 10 }}>

                    <Button type="button" className="btn btn-default" size="sm" >Create User</Button>
                  </Col>
                </Row>
              }

              <Row>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={userName}
                    label={schema.label.userName}
                    fieldForm={"userName"}
                    placeholder={"ph_username"}
                    // flex={2}
                    disabled={true}
                    onChange={this.onChange("userName")}
                  />
                </Col>
                <Col lg={6} md={12}>
                  <img alt="image" className="img-circle" src={picProfile0} style={{ width: 34, height: 34 }} />
                </Col>
              </Row>


              <Row>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={mobile}
                    label={schema.label.mobile}
                    fieldForm={"mobile"}
                    placeholder={"ph_mobile"}
                    // flex={2}
                    disabled={true}
                    onChange={this.onChange("mobile")}
                  />
                </Col>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={email2}
                    label={schema.label.email2}
                    fieldForm={"email2"}
                    placeholder={"ph_email"}
                    // flex={2}
                    disabled={true}
                    onChange={this.onChange("email2")}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={lineId3}
                    label={schema.label.lineId3}
                    fieldForm={"lineId3"}
                    placeholder={"ph_line_id"}
                    // flex={2}
                    disabled={true}
                    onChange={this.onChange("lineId3")}
                  />
                </Col>
                <Col lg={6} md={12} />
              </Row>

            </div>
            ,
            // ----------------------------------
            <div>

              <Row>
                <Col lg={6} md={12}>
                  <FormDatepicker
                    schema={schema}
                    value={registerDate}
                    label={schema.label.registerDate}
                    fieldForm={"registerDate"}
                    placeholder={"ph_register_date"}
                    flex={1}
                    onChange={this.onChangeDate}
                  />
                </Col>
                <Col lg={6} md={12}>
                  <FormDatepicker
                    schema={schema}
                    value={userQuota}
                    label={schema.label.userQuota}
                    fieldForm={"userQuota"}
                    placeholder={"ph_user_quota"}
                    flex={1}
                    onChange={this.onChangeDate}
                  />
                </Col>
              </Row>

            </div>

            ,
            // ----------------------------------
            <div>

              <DataGrid
                id="gridContainer"
                dataSource={schema.list.contactPeople}
                keyExpr="id"
                allowColumnReordering={false}
                showBorders={true}
                onRowUpdating={this.onRowUpdating}
                onRowUpdated={this.onRowUpdated}
                onRowRemoving={this.onRowRemoving}
              >
                <Paging enabled={true} />
                <Editing
                  mode="row"
                  allowUpdating={true}
                  allowDeleting={true}
                  allowAdding={true}
                />
                <Column dataField="name" caption="Name" />
                <Column dataField="phone" caption="Phone" />
                <Column dataField="email" caption="Email" />
                <Column dataField="lineId" caption="Line ID" />
                <Column dataField="describtion" caption="Describtion" />
              </DataGrid>

              <br />

              <Row>
                <Col lg={6} md={12}>
                  <FormSelectSearch
                    mode={"single"}
                    schema={schema}
                    value={peopleName}
                    label={schema.label.peopleName}
                    list={schema.list.peopleName}
                    fieldForm={"peopleName"}
                    placeholder={"ph_name"}
                    flex={1}
                    onChange={(selected) => {
                      this.setState({
                        ["peopleName"]: selected
                      }, () => this.props.onChange(this.state));
                    }}
                  />
                </Col>
                <Col lg={6} md={12}>
                  <Row>
                    <Col lg={8} md={12}>
                      <FormInput
                        schema={schema}
                        value={peoplePhone}
                        label={schema.label.peoplePhone}
                        fieldForm={"peoplePhone"}
                        placeholder={"ph_phone"}
                        // flex={2}
                        onChange={this.onChange("peoplePhone")}
                      />
                    </Col>
                    <Col lg={4} md={12}>
                      <FormInput
                        schema={schema}
                        value={peopleExt}
                        label={schema.label.peopleExt}
                        fieldForm={"peopleExt"}
                        placeholder={"ph_ext"}
                        // flex={2}
                        onChange={this.onChange("peopleExt")}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={peopleEmail}
                    label={schema.label.peopleEmail}
                    fieldForm={"peopleEmail"}
                    placeholder={"ph_email"}
                    // flex={2}
                    onChange={this.onChange("peopleEmail")}
                  />
                </Col>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={peopleLine}
                    label={schema.label.peopleLine}
                    fieldForm={"peopleLine"}
                    placeholder={"ph_line_id"}
                    // flex={2}
                    onChange={this.onChange("peopleLine")}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={peopleDescription}
                    label={schema.label.peopleDescription}
                    fieldForm={"peopleDescription"}
                    placeholder={"ph_description"}
                    // flex={2}
                    onChange={this.onChange("peopleDescription")}
                  />
                </Col>
                <Col lg={6} md={12} />
              </Row>

            </div>


          ]} />
      </Suspense>
    );
  }
}
