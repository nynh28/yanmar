import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import '../../../../i18n'

import 'react-dropdown/style.css';
import '../styles.css'
import FormInput from '../../../../Components/FormControls/FormInput'
import FormSelectSearch from '../../../../Components/FormControls/FormSelectSearch'
import FormRadio from '../../../../Components/FormControls/FormRadio'
import i18n from '../../../../i18n'
import DrivingSettingsActions, { DrivingSettingsTypes } from '../../../../Redux/DrivingSettingsRedux'

import LaddaButton, { S, SLIDE_LEFT } from 'react-ladda';
import Modal from 'react-awesome-modal';

import { t } from '../../../../Components/Translation'
// Define a custom component for handling the root position object ?
class DrivingBehaviorData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData
    };
    this.onCheckedButton = this.onCheckedButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.formData
    })
  }

  componentDidUpdate(prevProps, prevState) {
    let { language } = this.props
    if (prevProps.language !== language) {
    }
  }

  onChange(name, nativeElement = true) {
    return (event) => {
      let value = nativeElement ? event.target.value : event.label
      !nativeElement && this.setState({ [name + "_value"]: event.value }, () => this.props.onChange(this.state));
      this.setState({
        [name]: value
      }, () => this.props.onChange(this.state));
    };
  }

  onCheckedButton(isActive, fieldForm) {
    this.setState({
      [fieldForm]: isActive
    }, () => this.props.onChange(this.state));
  }

  _onUpdateViewer = () => {
    let oldValue = this.props.data_getBehaviorDrivingViewerId
    let behaviorId = this.state.drivingBehavior
    let { nameEN, nameTH, nameJA, drivingViewer } = this.state
    let newViewerId = drivingViewer == "Safety Driving" ? 1 : 2

    if (Number(oldValue.drivingViewerId) == Number(newViewerId) &&
      nameEN == oldValue.behaviorNameDict.en &&
      nameTH == oldValue.behaviorNameDict.th && nameJA == oldValue.behaviorNameDict.ja) {
      this.props.setVisible3(true)
    }
    else {
      this.props.updateBehaviorName(behaviorId, Number(newViewerId), nameEN, nameTH, nameJA)
    }

  }
  _resetViewer = () => {
    let oldValue = this.props.data_getBehaviorDrivingViewerId
    let viewer = oldValue.drivingViewerId == 1 ? "Safety Driving" : "Eco Driving"
    this.setState({
      nameEn: oldValue.behaviorNameDict.en,
      nameTH: oldValue.behaviorNameDict.th,
      nameJA: oldValue.behaviorNameDict.ja,
      drivingViewer: viewer
    })
  }

  _updateCriteria = () => {
    let newCriteria = this.props.schema.list.criteriaCategory
    let oldPropsCriteria = this.props.data_getBehaviorCriteria.behaviorCriterias
    let count = 0
    let behaviorCriteriaSettings = {
      behaviorCriteriaSettings: []
    }
    let groupNewCriteria = Object.keys(this.state).filter(e => e.includes("criteria"))
    // ["criteriaText0", "criteriaText1"]
    oldPropsCriteria.forEach(oldItem => {
      let tmp
      if (oldItem.criteriaId != 4) {
        tmp = JSON.parse(JSON.stringify(oldItem.behaviorCriteriaSettings[0]))
      } else tmp = false
      // Step 1: update only Text Field Criteria !!
      newCriteria.forEach((newItem, newIndex) => {
        // fieldMap
        if (oldItem.criteriaId == 4) {    //Step 2: check "Category Type"

        } else {
          if (tmp && newItem.behaviorCriteriaSettingId &&
            oldItem.behaviorCriteriaSettings[0] &&
            newItem.behaviorCriteriaSettingId ==
            oldItem.behaviorCriteriaSettings[0]
              .behaviorCriteriaSettingId) {

            if (this.state[groupNewCriteria[newIndex]] != Number(oldItem.behaviorCriteriaSettings[0].criteriaValue)) {
              tmp.criteriaValue = this.state[groupNewCriteria[newIndex]]
              count = 10
            }
          }
        }
      })
      if (tmp)
        behaviorCriteriaSettings.behaviorCriteriaSettings.push(tmp)
    })

    if (count == 10) {
      this.props.updateCriteriaSetting(behaviorCriteriaSettings)
    } else {
      this.props.setVisible3(true)
    }
  }

  _resetCriteria = () => {
    let oldPropsCriteria = this.props.data_getBehaviorCriteria.behaviorCriterias
    let groupNewCriteria = Object.keys(this.state).filter(e => e.includes("criteria"))
    console.log(oldPropsCriteria)
    groupNewCriteria.forEach((newValue, newIndex) => {
      let tmpValue = this.state[newValue]
      tmpValue = oldPropsCriteria[newIndex].behaviorCriteriaSettings[0].criteriaValue
      this.setState({ [newValue]: tmpValue })
    })
  }

  render() {
    const {
      drivingBehavior,
      nameEN,
      nameTH,
      nameJA,
      drivingViewer,
    } = this.state      // BasicData 
    const { schema, dataLogin, data_getBehaviorCriteria, behaviorId, mock_data_subkey,
      updateViewer, updateCriteria, updateScore } = this.props
    console.log(this.state)  // ...basicData => all variable
    console.log(schema)   // props  => all list in FILE: schema.js
    console.log('----------------------- Driving Data Screen Schema --------------------------')

    return (<div>
      <Suspense fallback={null}>
        <div>
          <div style={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

            <div style={{ display: 'flex', flexDirection: 'row', flex: 2, width: "75%", justifyContent: 'center' }}>
              <FormSelectSearch
                // mode={"multiple"}
                // mode={"single"}    //  1. If select 1 value don't use "mode"
                schema={schema}
                value={drivingBehavior}
                label={schema.label.drivingBehavior}
                list={schema.list.drivingBehavior}
                fieldForm={"drivingBehavior"}
                placeholder={"driving behavior"}
                flex={1}
                onChange={(selected) => {
                  this.setState({
                    ["drivingBehavior"]: selected
                  }, () => this.props.onChange(this.state));
                }}
              />


            </div>

            {((nameTH || nameEN) || nameJA) && <div style={{ paddingLeft: 25, paddingRight: 15, display: 'flex', flexDirection: 'column', flex: 1, width: "100%", justifyContent: 'center' }}>
              <h3 style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>{i18n.t("name")}</h3>
              <div style={{ display: 'flex', flex: 1, width: '99%', marginTop: -2.5 }} className="hr-line-dashed"></div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: "100%", justifyContent: 'center' }}>

                <div className="col-lg-12" style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', flex: 1, width: '50%' }}>
                    <FormInput
                      schema={schema}
                      value={nameEN}
                      label={schema.label.nameEN}
                      fieldForm={"nameEN"}
                      placeholder={schema.list.nameEN}
                      flex={1}
                      onChange={this.onChange("nameEN")}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', flex: 1, width: '50%' }}>
                    <FormInput
                      schema={schema}
                      value={nameTH}
                      label={schema.label.nameTH}
                      fieldForm={"nameTH"}
                      placeholder={schema.list.nameTH}
                      flex={1}
                      onChange={this.onChange("nameTH")}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'row', flex: 1, width: '50%' }}>
                    <FormInput
                      schema={schema}
                      value={nameJA}
                      label={schema.label.nameJA}
                      fieldForm={"nameJA"}
                      placeholder={schema.list.nameJA}
                      flex={1}
                      onChange={this.onChange("nameJA")}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', flex: 1, width: '50%' }}>
                    <FormRadio
                      name={["Safety Driving", "Eco Driving"]}
                      schema={schema}
                      value={drivingViewer}
                      label={schema.label.drivingViewer}
                      fieldForm={"drivingViewer"}
                      flex={1}
                      onClick={(isActive, fieldForm) => {
                        this.onCheckedButton(isActive, fieldForm)
                      }}
                    />
                  </div>



                </div>


                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', textAlign: 'right', marginRight: 15 }}>
                  <LaddaButton
                    id="saveViewer"
                    type="button"
                    loading={this.props.request_updateBehaviorName}
                    onClick={() => this._onUpdateViewer()}
                    data-color="#eee"
                    data-size={S}
                    data-style={SLIDE_LEFT}
                    data-spinner-size={30}
                    data-spinner-color="#ddd"
                    data-spinner-lines={12}
                    style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                  >
                    <div id="saveViewerDiv" style={{ paddingLeft: 10, paddingRight: 10 }}>{i18n.t("save")}</div>
                  </LaddaButton>
                  <LaddaButton
                    id="resetViewer"
                    type="button"
                    loading={false}
                    onClick={() => this._resetViewer()}
                    data-color="#eee"
                    data-size={S}
                    data-style={SLIDE_LEFT}
                    data-spinner-size={30}
                    data-spinner-color="#ddd"
                    data-spinner-lines={12}
                    style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                  >
                    <div id="resetViewerDiv" style={{ paddingLeft: 10, paddingRight: 10 }}>{i18n.t("reset")}</div>
                  </LaddaButton>
                </div>



              </div>




              {data_getBehaviorCriteria && schema.list.criteriaCategory && schema.list.criteriaCategory.length > 0 && <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>{i18n.t("criteria")}</h3>
                <div style={{ display: 'flex', flex: 1, width: '99%', marginTop: -2.5 }} className="hr-line-dashed"></div>
                <div className="col-lg-12" style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  {data_getBehaviorCriteria && schema.list.criteriaCategory && schema.list.criteriaCategory.map((e, i) => {
                    if (e.type == "dropdown") {
                      return <div style={{ display: 'flex', flexDirection: 'row', flex: 1, width: '50%' }}>
                        <FormSelectSearch
                          schema={schema}
                          value={this.state["criteriaDropdown" + i]}
                          label={e.name}
                          list={e.subitem}
                          fieldForm={("criteriaDropdown" + i).toString()}
                          placeholder={"category"}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              [("criteriaDropdown" + i).toString()]: selected
                            }, () => this.props.onChange(this.state));
                          }}
                        />
                      </div>
                    } else if (e.type == "text") {
                      return <div style={{ display: 'flex', flexDirection: 'row', flex: 1, width: '50%' }}>
                        <FormInput
                          schema={schema}
                          value={this.state["criteriaText" + i]}
                          label={e.prefix}
                          fieldForm={("criteriaText" + i).toString()}
                          placeholder={e.value}
                          flex={1}
                          onChange={this.onChange(("criteriaText" + i).toString())}
                        /><span style={{ marginTop: 15, marginLeft: 10, alignSelf: "center" }}>{e.suffix ? e.suffix : ""}</span>
                      </div>
                    }
                  })}

                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', textAlign: 'right', marginRight: 15 }}>
                  {schema.list.criteriaCategory.find(e => e.subitem && e.subitem.length > 0) &&
                    <LaddaButton
                      id="previewCriteria"
                      type="button"
                      loading={false}
                      onClick={() => this.props.setVisible1(true)}
                      data-color="#eee"
                      data-size={S}
                      data-style={SLIDE_LEFT}
                      data-spinner-size={30}
                      data-spinner-color="#ddd"
                      data-spinner-lines={12}
                      style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                    >
                      <div id="previewCriteriaDiv" style={{ paddingLeft: 10, paddingRight: 10 }}>{i18n.t("preview")}</div>
                    </LaddaButton>}
                  {schema.list.criteriaCategory.find(e => e.subitem && e.subitem.length > 0) && <LaddaButton
                    id="deleteCriteria"
                    type="button"
                    loading={false}
                    onClick={() => { console.log('------------------ Delete Button ------------------') }}
                    data-color="#eee"
                    data-size={S}
                    data-style={SLIDE_LEFT}
                    data-spinner-size={30}
                    data-spinner-color="#ddd"
                    data-spinner-lines={12}
                    style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                  >
                    <div id="deleteCriteriaDiv" style={{ paddingLeft: 10, paddingRight: 10 }}>{i18n.t("delete")}</div>
                  </LaddaButton>}

                  <LaddaButton
                    id="saveCriteria"
                    type="button"
                    loading={this.props.request_updateCriteriaSetting}
                    onClick={() => this._updateCriteria()}
                    data-color="#eee"
                    data-size={S}
                    data-style={SLIDE_LEFT}
                    data-spinner-size={30}
                    data-spinner-color="#ddd"
                    data-spinner-lines={12}
                    style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                  >
                    <div id="saveCriteriaDiv" style={{ paddingLeft: 10, paddingRight: 10 }}>{i18n.t("save")}</div>
                  </LaddaButton>,
                  <LaddaButton
                    id="reset"
                    type="button"
                    loading={false}
                    onClick={() => this._resetCriteria()}
                    data-color="#eee"
                    data-size={S}
                    data-style={SLIDE_LEFT}
                    data-spinner-size={30}
                    data-spinner-color="#ddd"
                    data-spinner-lines={12}
                    style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                  >
                    <div id="resetCriteriaDiv" style={{ paddingLeft: 10, paddingRight: 10 }}>{i18n.t("reset")}</div>
                  </LaddaButton>

                </div>
              </div>}




              {mock_data_subkey && schema.list.subkeyScore && <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, width: '100%' }}>
                <h3 style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>{i18n.t("score") + " & " + i18n.t('comment')}</h3>
                <div style={{ display: 'flex', flex: 1, width: '99%', marginTop: -2.5 }} className="hr-line-dashed"></div>
                <div className="col-lg-12" style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                  {mock_data_subkey && schema.list.subkeyScore && schema.list.subkeyScore.length > 0 &&
                    schema.list.subkeyScore.map((e, i) => {
                      return <div style={{ display: 'flex', flexDirection: 'row', flex: 1, width: '50%' }}>
                        <FormSelectSearch
                          schema={schema}
                          value={this.state[("subkey" + (i + 1)).toString()]}
                          label={e.en}
                          list={e.subitem}
                          fieldForm={("subkey" + (i + 1)).toString()}
                          placeholder={e.en}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              [("subkey" + (i + 1)).toString()]: selected
                            }, () => this.props.onChange(this.state));
                          }}
                        /></div>
                    })}

                </div>
              </div>}




            </div>}



          </div>
        </div>
      </Suspense>

    </div >)
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header,
  dataLogin: state.signin.dataLogin,
  language: state.versatile.language,
  data_getBehaviorCriteria: state.drivingsettings.data_getBehaviorCriteria,
  mock_data_subkey: state.drivingsettings.mock_data_subkey,
  behaviorId: state.drivingsettings.behaviorId,
  data_getBehaviorDrivingViewerId: state.drivingsettings.data_getBehaviorDrivingViewerId,

  request_updateCriteriaSetting: state.drivingsettings.request_updateCriteriaSetting,
  request_updateBehaviorName: state.drivingsettings.request_updateBehaviorName,
});
const mapDispatchToProps = (dispatch) => ({
  updateBehaviorName: (behaviorId, drivingViewerId, behaviorNameEn, behaviorNameTh, behaviorNameJa) => dispatch(DrivingSettingsActions.updateBehaviorName(behaviorId, drivingViewerId, behaviorNameEn, behaviorNameTh, behaviorNameJa)),
  setVisible1: (data) => dispatch(DrivingSettingsActions.setVisible1(data)),
  setVisible2: (data) => dispatch(DrivingSettingsActions.setVisible2(data)),
  setVisible3: (data) => dispatch(DrivingSettingsActions.setVisible3(data)),
  updateCriteriaSetting: (data) => dispatch(DrivingSettingsActions.updateCriteriaSetting(data)),
  // ************** MAP DATA CRITERIA for check renderer **************
});
export default connect(mapStateToProps, mapDispatchToProps)(DrivingBehaviorData)
