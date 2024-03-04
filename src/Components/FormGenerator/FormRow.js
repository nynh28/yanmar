import React, { Component } from 'react';
import {
  Col, Row, FormGroup, Label
} from 'reactstrap'

import TextWidget from "./widgetsFullfill/TextWidget";
import NumericWidget from "./widgetsFullfill/NumericWidget";
import TextAreaWidget from "./widgetsFullfill/TextAreaWidget";
import EmailWidget from "./widgetsFullfill/EmailWidget";
import DateWidget from "./widgetsFullfill/DateWidget";
import PasswordWidget from "./widgetsFullfill/PasswordWidget";
import SelectWidget from "./widgetsFullfill/SelectWidget";
import RadioWidget from "./widgetsFullfill/RadioWidget";
import CheckboxWidget from "./widgetsFullfill/CheckboxWidget";
// import ImageUploadWidget from "./widgetsFullfill/ImageUploadWidget";
import LocationAddress from "./Autocomplete/LocationAddress";
import './Styles/custom.css'

class FormRow extends Component {
  constructor(props) {
    super(props)

  }
  setSection(item, girdFormColumn) {
    let sectionForm = []
    item.fieldRow.map((itemRow) => {
      let ress = this.setFieldRow(itemRow, girdFormColumn)
      sectionForm.push(ress)
    })
    return sectionForm
  }

  setFieldRow(item, girdFormColumn = 1) {

    let fieldCount = Object.keys(item.properties).length
    let gridColumnSize = 12 / fieldCount
    if (gridColumnSize == 12 && girdFormColumn > 1) gridColumnSize /= girdFormColumn

    let fieldRowGroup = []

    for (let propsName in item.properties) {
      let fieldType = item.properties[propsName].type
      let title = item.properties[propsName].title

      // Set Disabled Field
      let disabledField = false
      if (this.props.schema.setDisabledField !== undefined && this.props.schema.disabledField !== undefined && this.props.schema.setDisabledField) {
        var found = this.props.schema.disabledField.find(function (element) {
          return element === propsName;
        });
        if (found == propsName) disabledField = true
      }

      let fieldGroup = (
        <Col lg={gridColumnSize} className="form-column">
          {/* className="has-error */}

          <FormGroup style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Label className="control-label" style={{ fontWeight: 500, marginRight: 5 }}>{title}{item.properties[propsName].required && <span style={{ color: 'red', marginRight: 5 }}>*</span>} : </Label>
            {/* <Col lg={8}  > */}
            {/* <i class="fa fa-info-circle" /> */}
            {fieldType == "text" || fieldType == "string" ? <TextWidget
              id={propsName}
              name={item.properties[propsName].name}
              type={item.properties[propsName].type}
              value={item.properties[propsName].value}
              minLength={item.properties[propsName].minLength}
              maxLength={item.properties[propsName].maxLength}
              required={item.properties[propsName].required}
              placeholder={item.properties[propsName].placeholder}
              disabled={disabledField}
            /> :
              fieldType == "number" ? <NumericWidget
                id={propsName}
                name={item.properties[propsName].name}
                type={item.properties[propsName].type}
                value={item.properties[propsName].value}
                min={item.properties[propsName].min}
                max={item.properties[propsName].max}
                required={item.properties[propsName].required}
                placeholder={item.properties[propsName].placeholder}
                disabled={disabledField}
              /> :
                fieldType == "textare" ? <TextAreaWidget
                  id={propsName}
                  name={item.properties[propsName].name}
                  type={item.properties[propsName].type}
                  value={item.properties[propsName].value}
                  minLength={item.properties[propsName].minLength}
                  maxLength={item.properties[propsName].maxLength}
                  required={item.properties[propsName].required}
                  placeholder={item.properties[propsName].placeholder}
                  disabled={disabledField}
                /> : fieldType == "email" ? <EmailWidget
                  id={propsName}
                  name={item.properties[propsName].name}
                  type={item.properties[propsName].type}
                  value={item.properties[propsName].value}
                  required={item.properties[propsName].required}
                  placeholder={item.properties[propsName].placeholder}
                  disabled={disabledField}
                /> : fieldType == "password" ? <PasswordWidget
                  id={propsName}
                  name={item.properties[propsName].name}
                  type={item.properties[propsName].type}
                  value={item.properties[propsName].value}
                  required={item.properties[propsName].required}
                  placeholder={item.properties[propsName].placeholder}
                  disabled={disabledField}
                /> : fieldType == "date" ? <DateWidget
                  id={propsName}
                  name={item.properties[propsName].name}
                  type={item.properties[propsName].type}
                  value={item.properties[propsName].value}
                  required={item.properties[propsName].required}
                  disabled={disabledField}
                /> :
                        fieldType == "select" ? <SelectWidget
                          marginRight={0}
                          id={propsName}
                          type={item.properties[propsName].type}
                          name={item.properties[propsName].name}
                          required={item.properties[propsName].required}
                          value={item.properties[propsName].value}
                          selectOption={item.properties[propsName].selectOption}
                          disabled={disabledField}
                        /> :
                          fieldType == "radio" ? <RadioWidget
                            id={propsName}
                            name={item.properties[propsName].name}
                            type={item.properties[propsName].type}
                            value={item.properties[propsName].value}
                            radioButton={item.properties[propsName].radioButton}
                            required={item.properties[propsName].required}
                            disabled={disabledField}
                          /> :
                            fieldType == "checkbox" ? <CheckboxWidget
                              id={propsName}
                              name={item.properties[propsName].name}
                              type={item.properties[propsName].type}
                              value={item.properties[propsName].value}
                              checkboxButton={item.properties[propsName].checkboxButton}
                              required={item.properties[propsName].required}
                              disabled={disabledField}
                            /> :
                              // fieldType == "image" ? <ImageUploadWidget
                              //   id={propsName}
                              //   name={item.properties[propsName].name}
                              //   type={item.properties[propsName].type}
                              //   value={item.properties[propsName].value}
                              //   disabled={disabledField}
                              // /> :
                              fieldType == "autocomplete" ? <LocationAddress
                                id={propsName}
                                value={item.properties[propsName].value}
                                level={item.properties[propsName].level}
                                mapValues={item.properties[propsName].mapValues}
                              /> : ""
            }
            {/* <div>
                <span className="text-danger">ERROR</span>
              </div> */}
            {/* </Col> */}
          </FormGroup>
        </Col>
      )
      fieldRowGroup.push(fieldGroup)
    }

    return (
      <Row>
        {fieldRowGroup.map((item) => item)}
      </Row>
    )
  }

  render() {
    const { component: Component, ...rest } = this.props

    return <form name={this.props.schema.formName}>
      {/* <div className="form-horizontal"> */}
      <div className="form">
        {
          this.props.schema.showHeaderTitle && this.props.schema.fieldRow !== undefined &&
          <div>
            {/* <div className="hr-line-dashed" /> */}
            <h3>{this.props.schema.title}</h3>
            <div style={{ minHeight: '2rem' }}></div>
          </div>
        }
        {/* {
          this.props.schema.fieldRow !== undefined ?
            this.props.schema.fieldRow.map((item) =>
              this.setFieldRow(item, this.props.schema.girdFormColumn) :
              ''
        } */}

        {
          this.props.schema.fieldRow !== undefined ? this.props.schema.fieldRow.map((item) =>
            this.setFieldRow(item, this.props.schema.girdFormColumn)) :
            this.props.schema.sections.map((item, index) =>
              <div>
                {
                  index !== 0 &&
                  <div className="hr-line-dashed" />
                }

                <h3>{item.sectionTitle}</h3>
                <div style={{ minHeight: '2rem' }}></div>

                {
                  this.setSection(item, this.props.schema.girdFormColumn).map((element) =>
                    element
                  )}
              </div>
            )
        }

        {/* {
          this.props.schema.fieldRow.map((item) =>
            this.setFieldRow(item, this.props.schema.girdFormColumn))
        } */}
      </div>
    </form>
  }
}

export default FormRow
