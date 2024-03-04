import React, { Component } from 'react'
import PannelBox from '../../Components/PannelBox'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import DrivingSettingsActions from '../../Redux/DrivingSettingsRedux'

import SaveButton from '../../Components/SaveButton'
import { diff } from 'json-diff';
import { get } from 'lodash'
import Form from "react-jsonschema-form"
import { setSchemaSearch } from './Form/schema.js'
import DrivingBehaviorData from "./Form/Fields/DrivingBehaviorData"
import { t } from '../../Components/Translation'

import { SubkeyField } from './SubkeyField'
import LaddaButton, { S, SLIDE_LEFT } from 'react-ladda';
import Modal from 'react-awesome-modal';
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import DataGrid, { Texts, Column, FilterRow, HeaderFilter, SearchPanel, Grouping, GroupPanel, Paging, Export, Selection, MasterDetail, Editing, Field } from 'devextreme-react/data-grid';
import { CheckBox } from 'devextreme-react/check-box';
import i18n from '../../i18n'

const DrivingBehaviorField = () => { return '' }

export const fields = {
    TitleField: DrivingBehaviorField,
    basicData: DrivingBehaviorData
}

export const uiSchema = {
    DrivingDetail: {
        basicData: {
            "ui:field": "basicData"
        },
    },
}

const lstMutilSelect = [
    // 'drivingBehavior'
    , 'userLevel',
    'partnerType', 'roleName', 'functions', 'action'
]

class NewDrivingSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            language: this.props.language,
            subTitle4: {
                en: 'Score & Comment',
                th: 'คะแนนและความคิดเห็น',
            },
            subTitleScoreSummary: {
                en: 'Score Summary',
                th: 'ผลรวมคะแนน',
            },
            subTitleCriteriaSummary: {
                en: "Criteria Summary",
                th: 'ผลรวมของเกณฑ์'
            },
            alertNoneChange: {
                en: `don't have any change`,
                th: 'ไม่มีข้อมูลเปลี่ยนแปลง',
            },
            title: {
                en: 'Driving Behavior',
                th: 'พฤติกรรมผู้ขับขี่'
            },
            great: {
                en: 'great',
                ja: 'great',
                th: 'ดีมาก'
            },
            good: {
                en: 'good',
                ja: 'good',
                th: 'ดี'
            },
            middle: {
                en: 'middle',
                ja: 'middle',
                th: 'ปานกลาง'
            },
            notbad: {
                en: 'not bad',
                ja: 'not bad',
                th: 'พอใช้'
            },
            notok: {
                en: "try again",
                ja: "try again",
                th: 'ควรปรับปรุง'
            },
            alertText: {
                en: `Don't have any change`,
                th: 'ไม่มีการเปลี่ยนแปลง',
            },

            subkeyScoreField: [],
            firstKey: null,
            secondKey: null,
            state_behavior_id: null,

            criteriaField: [],
            data_preview_criteria: [],

            grid_data_getBehaviorScore: [],
            grid_preview_data_getBehaviorScore: [],
            grid_preview_data_getBehaviorScoreSummary: [],

            tmp_data_getDrivingBehaviorList: null,
            tmp_data_getBehaviorCriteria: null,
            tmp_data_getBehaviorScore: null,
            tmp_data_getBehaviorScoreSummary: null,
            tmp_data_getBehaviorDrivingViewerId: null,

            tmp_firstList: null,
            formData: {
                DrivingDetail: {
                    basicData: {
                        drivingBehavior: "",        // Dropdown เลือกค่าเดียว
                        nameEN: "",
                        nameTH: "",
                        nameJA: "",
                        drivingViewer: null,
                        // subkey1: "",
                        // subkey2: "",
                        // criteriaDropdown: "",       // Dropdown เลือกค่าเดียว
                        // drivingBehavior: [],
                    }
                }
            },

        }
    }
    openModal = () => {
        this.props.setVisible1(true)
    }

    openModal2 = () => {
        this.props.getBehaviorScoreSummary(this.props.behaviorId ? this.props.behaviorId : 4)
        this.props.setVisible2(true)
        // this.setState({ visible2: true });
    }

    static getDerivedStateFromProps = (newProps, prevState) => {

        if (newProps.language != prevState.language) {
            newProps.getDrivingBehaviorList(newProps.language)
        }

        if (newProps.data_getDrivingBehaviorList && newProps.data_getDrivingBehaviorList != null) {
            if (newProps.data_getDrivingBehaviorList != prevState.tmp_data_getDrivingBehaviorList) {
                return {
                    tmp_data_getDrivingBehaviorList: newProps.data_getDrivingBehaviorList,
                }
            }
        }

        if (newProps.data_getBehaviorDrivingViewerId && newProps.data_getBehaviorDrivingViewerId != null) {
            if (newProps.data_getBehaviorDrivingViewerId != prevState.tmp_data_getBehaviorDrivingViewerId) {
                let { formData } = prevState
                formData.DrivingDetail.basicData.nameTH = newProps.data_getBehaviorDrivingViewerId.behaviorNameDict.th ? newProps.data_getBehaviorDrivingViewerId.behaviorNameDict.th : ""
                formData.DrivingDetail.basicData.nameJA = newProps.data_getBehaviorDrivingViewerId.behaviorNameDict.ja ? newProps.data_getBehaviorDrivingViewerId.behaviorNameDict.ja : ""
                formData.DrivingDetail.basicData.nameEN = newProps.data_getBehaviorDrivingViewerId.behaviorNameDict.en ? newProps.data_getBehaviorDrivingViewerId.behaviorNameDict.en : ""
                formData.DrivingDetail.basicData.drivingViewer = newProps.data_getBehaviorDrivingViewerId.drivingViewerId == 1 ? "Safety Driving" : "Eco Driving"

                let tmp_subkeyScoreField = []
                if (newProps.mock_data_subkey) {
                    let allSubKey = newProps.mock_data_subkey
                    allSubKey.map((e, i) => {
                        if (e.behavior_id == newProps.behaviorId) {
                            e.subkey.map((el, ind) => {
                                tmp_subkeyScoreField.push({
                                    en: el.name,
                                    th: el.name,
                                    id: el.name,
                                    // id: el.name + newProps.behaviorId,
                                    subId: 'subkey-score',
                                    type: "dropdown",
                                    behavior_id: newProps.behaviorId,
                                    subitem: el.classType.map((ele, inde) => {
                                        return {
                                            en: ele.value,
                                            th: ele.value,
                                            id: ele.value,
                                            // value: ele.key
                                            value: ele.value,
                                            key: ele.key
                                        }
                                    })

                                })
                            })
                        }

                    })
                    tmp_subkeyScoreField = JSON.parse(JSON.stringify(tmp_subkeyScoreField))
                    tmp_subkeyScoreField.map((e, i) => {
                        formData.DrivingDetail.basicData["subkey" + (i + 1)] = null
                    })

                    console.log("Form Data After build SubkeyScoreField :: ", formData)
                }

                return {
                    tmp_data_getBehaviorDrivingViewerId: newProps.data_getBehaviorDrivingViewerId,
                    subkeyScoreField: tmp_subkeyScoreField,
                    formData
                }
            }
        }


        let tmp_data_getBehaviorCriteria
        let criteriaField = prevState.criteriaField
        let data_preview_criteria = prevState.data_preview_criteria
        if (newProps.data_getBehaviorCriteria && newProps.data_getBehaviorCriteria != null) {
            if (newProps.data_getBehaviorCriteria != prevState.tmp_data_getBehaviorCriteria) {
                newProps.getBehaviorScore(prevState.formData.DrivingDetail.basicData.subkey1 ? prevState.formData.DrivingDetail.basicData.subkey1 : "", prevState.formData.DrivingDetail.basicData.subkey2 ? prevState.formData.DrivingDetail.basicData.subkey2 : "", newProps.behaviorId)
                let { formData } = prevState
                if (newProps.data_getBehaviorCriteria.behaviorCriterias.length > 0) {
                    newProps.data_getBehaviorCriteria.behaviorCriterias.map((e, i) => {
                        let tmp_subitem = []

                        if (e.subkeyGroupName1 && e.subkeyGroupName1 == "Category Type" && e.criteriaId != 20) {
                            if (e.behaviorCriteriaSettings && e.behaviorCriteriaSettings.length > 1) {   // drop down of category

                                e.behaviorCriteriaSettings.map((element, index) => {
                                    data_preview_criteria.push({
                                        categoryType: element.subKey1,
                                        rpm: element.criteriaValue,
                                        id: index + 1,
                                        behavior_id: element.behaviorCriteriaSettingId
                                    })

                                    // ********** Category Dropdown ************
                                    tmp_subitem.push({
                                        key: element.behaviorCriteriaSettingId,
                                        value: element.subKey1,
                                        id: 'criteria-info-subkey' + (index + 1),
                                        criteriaValue: element.criteriaValue,
                                        behavior_id: element.behaviorCriteriaSettingId
                                    })
                                    // ********** Category Dropdown ************
                                })

                                // ****** dropdown (FG/FM) (criteria) EDIT FIELD FORM COMPONENT HERE *******
                                criteriaField.push({
                                    name: e.subkeyGroupName1,
                                    type: 'dropdown',
                                    id: 'criteriaDropdown' + (i + 1),
                                    criteriaId: e.criteriaId,
                                    criteriaName: e.criteriaName,
                                    criteriaPrefix: e.criteriaPrefix,
                                    criteriaSuffix: e.criteriaSuffix,
                                    subitem: tmp_subitem,
                                })
                                formData.DrivingDetail.basicData["criteriaDropdown" + i] = ""
                                // ****** dropdown (FG/FM) (criteria) EDIT FIELD FORM COMPONENT HERE *******

                            }
                        } else {
                            // ****** Text Field FIELD FORM COMPONENT HERE *******
                            criteriaField.push({
                                type: 'text',
                                id: 'criteriaText' + (i + 1),
                                criteriaName: e.criteriaName,
                                prefix: e.criteriaName + " " + (e.criteriaPrefix ? e.criteriaPrefix : "") + " ",
                                suffix: e.criteriaSuffix,
                                criteriaId: e.criteriaId,
                                value: e.behaviorCriteriaSettings && e.behaviorCriteriaSettings[0].criteriaValue ? e.behaviorCriteriaSettings[0].criteriaValue : '',
                                behaviorCriteriaSettingId: e.behaviorCriteriaSettings[0].behaviorCriteriaSettingId ? e.behaviorCriteriaSettings[0].behaviorCriteriaSettingId : null
                            })
                            formData.DrivingDetail.basicData["criteriaText" + i] = e.behaviorCriteriaSettings && e.behaviorCriteriaSettings[0].criteriaValue ? e.behaviorCriteriaSettings[0].criteriaValue : ''
                            // ****** EDIT FIELD FORM COMPONENT HERE *******
                        }

                    })
                }

                tmp_data_getBehaviorCriteria = newProps.data_getBehaviorCriteria
                return {
                    tmp_data_getBehaviorCriteria,
                    criteriaField,
                    data_preview_criteria,
                    formData,
                }

            }
        }

        if (newProps.data_getBehaviorScoreSummary && newProps.data_getBehaviorScoreSummary != null) {
            if (newProps.data_getBehaviorScoreSummary != prevState.tmp_data_getBehaviorScoreSummary) {
                let grid_preview_data_getBehaviorScoreSummary = []
                console.log("Before Map Score :: ", newProps.data_getBehaviorScoreSummary)
                newProps.data_getBehaviorScoreSummary.behaviorScoreSummaryInfos.map((e, i) => {
                    grid_preview_data_getBehaviorScoreSummary.push({
                        id: i + 1,
                        engineSeries: e.subKey2Value ? e.subKey2Value : '',
                        classType: e.subKey1Value ? e.subKey1Value : '',
                        min: e.isIncMinValue == true ? ">= " + e.minValue : e.isIncMinValue == false ? "> " + e.minValue : " ",
                        max: e.isIncMaxValue == true ? "<= " + e.maxValue : e.isIncMaxValue == false ? "< " + e.maxValue : " ",
                        score: e.score ? e.score : " ",
                        comment: e.comment && e.comment != "" ? e.comment : (e.score && e.score >= 5 ? prevState.great[prevState.language] : e.score && e.score == 4 ?
                            prevState.good[prevState.language] : e.score && e.score == 3 ? prevState.middle[prevState.language] : e.score && e.score == 2 ?
                                prevState.notbad[prevState.language] : prevState.notok[prevState.language]),
                    })
                })
                return {
                    tmp_data_getBehaviorScoreSummary: newProps.tmp_data_getBehaviorScoreSummary,
                    grid_preview_data_getBehaviorScoreSummary
                }
            }
        }

        let grid_data_getBehaviorScore = []
        if (newProps.data_getBehaviorScore && newProps.data_getBehaviorScore != null) {
            if (newProps.data_getBehaviorScore != prevState.tmp_data_getBehaviorScore) {
                newProps.data_getBehaviorScore.behaviorScoreInfos.map((e, i) => {
                    grid_data_getBehaviorScore.push({
                        // no: i + 1,
                        no: e.seq ? e.seq : i + 1,
                        includeMin: e.isIncMinValue,
                        min: e.minValue,
                        includeMax: e.isIncMaxValue,
                        max: e.maxValue,
                        score: e.score,
                        comment: e.comment,
                    })
                })
                return {
                    tmp_data_getBehaviorScore: newProps.tmp_data_getBehaviorScore,
                    grid_data_getBehaviorScore
                }
            }
        }

        return {
            language: newProps.language,
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        let {
            data_getDrivingBehaviorList,
            lstOptGroupAction,
            // , lstOptActionByRoles, lstOptOwnerPartnerType, lstOptOwnerUserLevel, lstOptRole 
        } = this.props

        let { formData, subkeyScoreField } = this.state
        // if (prevProps.lstOptGroupAction !== lstOptGroupAction) {
        //   this.setState({ functionsList: lstOptGroupAction })
        // }

        console.log('Old state :: ', prevState.formData)
        console.log('New state :: ', this.state.formData)
        console.log("------------- Did Updated --------------")
        if ((prevState.formData.DrivingDetail.basicData.subkey1 != this.state.formData.DrivingDetail.basicData.subkey1)
            || (prevState.formData.DrivingDetail.basicData.subkey2 != this.state.formData.DrivingDetail.basicData.subkey2)) {
            this.props.getBehaviorScore(this.state.formData.DrivingDetail.basicData.subkey1 ? this.state.formData.DrivingDetail.basicData.subkey1 : null, this.state.formData.DrivingDetail.basicData.subkey2 ? this.state.formData.DrivingDetail.basicData.subkey2 : null, this.props.behaviorId)
        }

        // if (prevProps.data_getDrivingBehaviorList !== data_getDrivingBehaviorList) {
        //     this.setState({ tmp_data_getDrivingBehaviorList2: data_getDrivingBehaviorList })
        // }
        // if (prevProps.lstOptOwnerPartnerType !== lstOptOwnerPartnerType) {
        //   this.setState({ ownerPartnerTypeList: lstOptOwnerPartnerType })
        // }
        // if (prevProps.lstOptOwnerUserLevel !== lstOptOwnerUserLevel) {
        //   this.setState({ userLevelList: lstOptOwnerUserLevel })
        // }
        // if (prevProps.lstOptRole !== lstOptRole) {
        //   this.setState({ roleNameList: lstOptRole })
        // }

    }

    componentWillUnmount() {
        this.props.clearDataCriteria()
    }

    componentDidMount = () => {
        let tmp_subkey = SubkeyField
        this.setState({ subkeyScoreField: tmp_subkey })
        this.props.setVisible1(false)
        this.props.setVisible2(false)
        this.props.setVisible3(false)
        this.props.setMockSubKey(tmp_subkey)
        this.props.getDrivingBehaviorList(this.props.language)
    }


    onFormChange = (v) => {
        console.log(v)      // Have Value Correct
        let diffValue = get(diff(this.state.formData, v.formData), 'DrivingDetail.basicData', undefined)

        console.log("DIFF_VALUE (onFormChange) :: ", diffValue)

        if (diffValue === undefined) return

        let objects = Object.getOwnPropertyNames(diffValue)
        console.log("OBJECT_DIFF_VALUE :: ", objects)
        for (let index in objects) {
            console.log("EACH_IN_OBJECT_DIFF :: ", objects[index], diffValue["" + objects[index]])
            // if ("" + objects[index] === "ownerPartnerType") {
            if (lstMutilSelect.includes("" + objects[index])) { // 1. เช็คว่าเป็น Json schema ของ dropdown อันไหนที่ user กดเลือกค่า (use with dropDown multi only)
                console.log('CHANGE_ON :: ', objects[index])
                this.setValueMultiSelectChange("" + objects[index], diffValue["" + objects[index]])
            }
            else {      // 2. ฟิลดิ์เดี่ยว ที่เลือก dropdown ได้แค่ตัวเดียว
                console.log('FIELD_NAME_NOT_INCLUDE_BASIC_DATA :: ', objects[index], " & ", diffValue["" + objects[index]]["__new"])
                this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"])
            }
        }
    }

    setValueMultiSelectChange(fieldName, value) {   // 1. สำหรับกรณีที่ Dropdown นั้นสามารถเลือกค่าได้หลายค่าน่ะ
        let { formData } = this.state
        let values = []
        console.log("VALUE PARAMS :: ", value)
        for (let index in value) {
            // Old 
            value[index][0] !== "-" && values.push(value[index][1])
        }
        console.log('CHANGE_FIELD', fieldName, values)
        formData.DrivingDetail.basicData[fieldName] = values
        if (fieldName === 'roleName') { // 2. ถ้าเป็น field XXX ให้ getData / Up to you
            // this.props.getUserOption('ActionByRoles', values)
            this.functionsChange()
        } else if (fieldName === 'drivingBehavior') {   // ถ้าเป็น field name DrivingBehavior ให้ทำ XXX
            // this.props.getUserSearch('PartnerByType', values) 
            console.log("FIELDS_NAME_AND_VALUE (get data here!!) :: ", fieldName)
        }

        console.log('FORM_DATA_CHANGE :: ', formData)
        this.setState({ formData })
    }

    functionsChange = () => {
        // 1. XXX get data XXX 
    }

    bindingData(fieldName, value) {
        let { formData } = this.state
        // formData.DrivingDetail.basicData[fieldName] = value
        console.log("IN_BINDING_DATA FIELD && VALUE :: ", fieldName, " == ", value)
        // 1. ถ้าเป็น Dropdown อันอื่นที่ไม่ใช่ DrivingBehaviorList
        if (fieldName === 'drivingBehavior') { // 1. ถ้าเป็น Dropdown DrivingBehaviorList
            this.props.setBehaviorId(value)
            this.props.getBehaviorDrivingViewerId(value)


            formData.DrivingDetail.basicData[fieldName] = value
            this.setState({
                criteriaField: [], state_behavior_id: value,
                subkey1: null, subkey2: null, subkeyScoreField: null,
                data_preview_criteria: [],
                grid_data_getBehaviorScore: [],
                grid_preview_data_getBehaviorScore: [],
                grid_preview_data_getBehaviorScoreSummary: [],
                formData
            })
            console.log("SELECTED_FIELD (get data here!!) :: ", fieldName, " && ", value)
        }
        else if (fieldName == "subkey1" || fieldName == "subkey2") {
            formData.DrivingDetail.basicData[fieldName] = value
            if (formData.DrivingDetail.basicData.subkey1 && fieldName == "subkey2") {
                this.props.getBehaviorScore(formData.DrivingDetail.basicData.subkey1, value, this.props.behaviorId)
            }
            else if (formData.DrivingDetail.basicData.subkey2 && fieldName == "subkey1") {
                this.props.getBehaviorScore(value, formData.DrivingDetail.basicData.subkey2, this.props.behaviorId)
            }
        }
        else {
            formData.DrivingDetail.basicData[fieldName] = value
        }

        console.log("FORM_DATA_AT_CHANGE :: ", formData)
        this.setState({ formData })

    }

    _updateGridBehaviorScore = () => {
        let newScore = this.state.grid_data_getBehaviorScore
        let oldScore = this.props.data_getBehaviorScore
        let count = 0
        let behaviorScoreInfos = {
            behaviorScoreInfos: []
        }

        console.log("OLD SCORE :: ", oldScore)
        console.log("New SCORE :: ", newScore)  // new value
        oldScore.behaviorScoreInfos.forEach((oldItem, oldIndex) => {
            let tmp = JSON.parse(JSON.stringify(oldItem))
            let tmpNewScore = JSON.parse(JSON.stringify(newScore[oldIndex]))
            console.log("TMP :: ", tmp)
            console.log("NEW SCORE :: ", newScore[oldIndex])  // new value
            console.log("Old SCORE :: ", oldItem)

            if (tmpNewScore.includeMin != oldItem.isIncMinValue) {
                tmp.isIncMinValue = tmpNewScore.includeMin
                count = 10
            }
            if (tmpNewScore.min != oldItem.minValue) {
                tmp.minValue = tmpNewScore.min
                count = 10
            }
            if (tmpNewScore.includeMax != oldItem.isIncMaxValue) {
                tmp.isIncMaxValue = tmpNewScore.includeMax
                count = 10
            }
            if (tmpNewScore.max != oldItem.maxValue) {
                tmp.maxValue = tmpNewScore.max
                count = 10
            }
            if (tmpNewScore.score != oldItem.score) {
                tmp.score = tmpNewScore.score
                count = 10
            }
            if (tmpNewScore.comment != oldItem.comment) {
                // wait data
                tmp.comment = tmpNewScore.comment
                count = 10
            }

            behaviorScoreInfos.behaviorScoreInfos.push(tmp)
            // new value
            console.log("behaviorScoreInfos :: ", behaviorScoreInfos)
        })

        if (count == 10) {
            this.props.updateBehaviorScore(behaviorScoreInfos)
            this.props.getBehaviorScore(this.state.formData.DrivingDetail.basicData.subkey1, this.state.formData.DrivingDetail.basicData.subkey2, this.props.behaviorId)
        } else {
            this.props.setVisible3(true)
        }

    }

    _onResetScore = () => {
        this.state.grid_data_getBehaviorScore[0] = null
        this.props.getBehaviorScore(this.state.formData.DrivingDetail.basicData.subkey1, this.state.formData.DrivingDetail.basicData.subkey2, this.props.behaviorId)
    }

    render() {
        const { component: Component, ...rest } = this.props
        const { data_getDrivingBehaviorList, data_getBehaviorDrivingViewerId,
            data_getBehaviorCriteria, behaviorId, mock_data_subkey,
            visible3, request_updateBehaviorScore } = this.props
        let { formData, tmp_data_getDrivingBehaviorList, criteriaField,
            subkeyScoreField, grid_data_getBehaviorScore } = this.state
        const log = (type) => console.log.bind(console, type);
        // console.log(subkeyScoreField)
        console.log(request_updateBehaviorScore)
        console.log('------------------------- New Driving Settings Screen --------------------------')
        return (
            <PannelBox title={t("drivingSettings")}>
                <div className="contrainner">
                    <div className="ibox float-e-margins">
                        <div className="form-horizontal">




                            <section>
                                {/* <h1>React-Modal Examples</h1>
                                <input type="button" value="Open" onClick={() => this.openModal()} /> */}
                                <Modal
                                    visible={this.props.visible1}
                                    width="400"
                                    height="200"
                                    effect="fadeInUp"
                                    onClickAway={() => this.props.setVisible1(false)}
                                >

                                    <div className="ibox-content">
                                        <h3>{i18n.t("criteria") + "  & " + i18n.t("summary")}</h3>
                                        <div className="hr-line-dashed"></div>
                                        <Row>
                                            <DataGrid id={'data-grid-criteria'}
                                                ref={this.dataGrid}
                                                dataSource={this.state.data_preview_criteria && this.state.data_preview_criteria.length > 0 ? this.state.data_preview_criteria : []}
                                                keyExpr={'id'}
                                                showBorders={true}
                                                allowColumnReordering={true}
                                            // onContentReady={this.detectContentReady}
                                            // onEditingStart={this.onEditingStart}
                                            // onRowRemoving={this.delete}
                                            // onSelectionChanged={this.selectDriver}
                                            >
                                                <GroupPanel visible={false} />
                                                <Grouping autoExpandAll={this.state.autoExpandAll} />
                                                <Paging defaultPageSize={10} />
                                                <Column dataField={'categoryType'} minWidth={150} />
                                                <Column dataField={'rpm'} minWidth={150} />
                                                {/* <Column dataField={'drivingCardNo'} minWidth={150} />
                                                <Column dataField={'email'} minWidth={150} />
                                                <Column dataField={'phone'} minWidth={150} />
                                                <Column dataField={'lineID'} minWidth={150} /> */}
                                            </DataGrid>
                                        </Row>
                                    </div>
                                </Modal>
                            </section>

                            <section>
                                {/* <h1>React-Modal Examples</h1>
                                <input type="button" value="Open" onClick={() => this.openModal()} /> */}
                                <Modal
                                    visible={this.props.visible2}
                                    width="50%"
                                    height="60%"
                                    effect="fadeInUp"
                                    onClickAway={() => this.props.setVisible2(false)}
                                >

                                    <div className="ibox-content">
                                        <h3>{i18n.t("score") + " & " + i18n.t("summary")}</h3>
                                        <div className="hr-line-dashed"></div>
                                        <Row>
                                            <DataGrid id={'data-grid-criteria'}
                                                ref={this.dataGrid}
                                                dataSource={this.state.grid_preview_data_getBehaviorScoreSummary && this.state.grid_preview_data_getBehaviorScoreSummary.length > 0 ? this.state.grid_preview_data_getBehaviorScoreSummary : []}
                                                keyExpr={'id'}
                                                showBorders={true}
                                                allowColumnReordering={true}
                                            // onContentReady={this.detectContentReady}
                                            // onEditingStart={this.onEditingStart}
                                            // onRowRemoving={this.delete}
                                            // onSelectionChanged={this.selectDriver}
                                            >
                                                <GroupPanel visible={false} />
                                                <Grouping autoExpandAll={this.state.autoExpandAll} />
                                                <Paging defaultPageSize={10} />
                                                <Column dataField={'engineSeries'} minWidth={150} />
                                                <Column dataField={'classType'} minWidth={150} />
                                                <Column dataField={'min'} minWidth={150} />
                                                <Column dataField={'max'} minWidth={150} />
                                                <Column dataField={'score'} minWidth={150} />
                                                <Column dataField={'comment'} minWidth={150} />
                                                {/* <Column dataField={'drivingCardNo'} minWidth={150} />
                                                <Column dataField={'email'} minWidth={150} />
                                                <Column dataField={'phone'} minWidth={150} />
                                                <Column dataField={'lineID'} minWidth={150} /> */}
                                            </DataGrid>
                                        </Row>
                                    </div>
                                </Modal>
                            </section>

                            <section>
                                {/* <h1>React-Modal Examples</h1>
                                <input type="button" value="Open" onClick={() => this.openModal()} /> */}
                                <Modal
                                    visible={this.props.visible3}
                                    width="30%"
                                    height="35%"
                                    effect="fadeInUp"
                                    onClickAway={() => this.props.setVisible3(false)}
                                >

                                    <div className="ibox-content">
                                        <div>
                                            <h1>Alert</h1>
                                        </div>
                                        <h3>{i18n.t("noneChange")}</h3>
                                        <LaddaButton
                                            id="closeAlert"
                                            loading={false}
                                            onClick={() => { this.props.setVisible3(false) }}
                                            data-color="#eee"
                                            data-size={S}
                                            data-style={SLIDE_LEFT}
                                            data-spinner-size={30}
                                            data-spinner-color="#ddd"
                                            data-spinner-lines={12}
                                            style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10, position: 'absolute', bottom: 5, right: 2.5 }}
                                        >
                                            <div id="closeDiv" style={{ paddingLeft: 10, paddingRight: 10 }}>{i18n.t("close")}</div>
                                        </LaddaButton>
                                    </div>
                                </Modal>
                            </section>



                            {tmp_data_getDrivingBehaviorList && tmp_data_getDrivingBehaviorList.behaviors && tmp_data_getDrivingBehaviorList.behaviors.length > 0 && <Row>
                                <div className="row">
                                    <div style={{ paddingLeft: 15, paddingRight: 15 }}>
                                        <div className="col-lg-12">

                                            <Form
                                                className="title-form"
                                                schema={
                                                    setSchemaSearch(
                                                        data_getDrivingBehaviorList.behaviors || [],
                                                        (data_getBehaviorDrivingViewerId && data_getBehaviorDrivingViewerId.behaviorNameDict ? data_getBehaviorDrivingViewerId.behaviorNameDict.en : "") || "",
                                                        (data_getBehaviorDrivingViewerId && data_getBehaviorDrivingViewerId.behaviorNameDict ? data_getBehaviorDrivingViewerId.behaviorNameDict.th : "") || "",
                                                        (data_getBehaviorDrivingViewerId && data_getBehaviorDrivingViewerId.behaviorNameDict ? data_getBehaviorDrivingViewerId.behaviorNameDict.ja : "") || "",
                                                        (data_getBehaviorDrivingViewerId && data_getBehaviorDrivingViewerId.drivingViewerId ? data_getBehaviorDrivingViewerId.drivingViewerId : "") || "",
                                                        (criteriaField ? criteriaField : []) || [],
                                                        (subkeyScoreField && subkeyScoreField.length > 0 ? subkeyScoreField : []) || [],
                                                    )
                                                }
                                                uiSchema={uiSchema} // 
                                                fields={fields}     // 2. fields (Component field form)
                                                formData={formData} // 3. value in all field is use to ...
                                                onChange={v => this.onFormChange(v)}
                                                // onSubmit={v => this.submit(v)}
                                                onError={log("errors")}
                                            >

                                                {this.props.behaviorId && <Row>
                                                    <div className="ibox-content" style={{ borderTopWidth: 0, marginTop: -40 }}>
                                                        <DataGrid id={'data-grid-criteria'}
                                                            ref={this.dataGrid}
                                                            // dataSource={this.props.data_getBehaviorScore ? this.props.data_getBehaviorScore.behaviorScoreInfos : []}
                                                            dataSource={this.state.grid_data_getBehaviorScore ? this.state.grid_data_getBehaviorScore : []}
                                                            keyExpr={'no'}
                                                            showBorders={true}
                                                            allowColumnReordering={true}
                                                        >
                                                            {/* <GroupPanel visible={false} />
                                                                    <Grouping autoExpandAll={this.state.autoExpandAll} /> */}
                                                            <Paging defaultPageSize={10} />
                                                            <Column dataField={'no'} caption={"No."} minWidth={150} />
                                                            <Column dataField={'includeMin'} caption={"Include Min"} minWidth={150} cellRender={(item, index) => {
                                                                if (item.data.includeMin) {
                                                                    return <CheckBox type={'checkbox'}
                                                                        id={"checkbox-score-incMin" + index}
                                                                        value={item.data.includeMin}
                                                                    />
                                                                } else if (!item.data.includeMin || item.data.includeMin == undefined) {
                                                                    return <CheckBox type={'checkbox'}
                                                                        id={"checkbox-score-incMin" + index}
                                                                        value={item.data.includeMin}
                                                                    />
                                                                }
                                                            }} />
                                                            <Column dataField={'min'} caption={"Min"} minWidth={150} />
                                                            <Column dataField={'includeMax'} caption={"Include Max"} minWidth={150} cellRender={(item, index) => {
                                                                if (item.data.includeMax) {
                                                                    return <CheckBox type={'checkbox'}
                                                                        id={"checkbox-score-incMax" + index}
                                                                        value={item.data.includeMax}
                                                                    />
                                                                } else if (!item.data.includeMax || item.data.includeMax == undefined) {
                                                                    return <CheckBox type={'checkbox'}
                                                                        id={"checkbox-score-incMax" + index}
                                                                        value={item.data.includeMax}
                                                                    />
                                                                }
                                                            }} />
                                                            <Column dataField={'max'} caption={"Max"} minWidth={150} />
                                                            <Column dataField={'score'} caption={"Score"} minWidth={150} />
                                                            <Column dataField={'comment'} caption={"Comment"} minWidth={150} />

                                                            <Editing
                                                                mode="cell"
                                                                allowUpdating={true}
                                                            />
                                                        </DataGrid>
                                                    </div>

                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                        {this.state.subkeyScoreField && this.state.subkeyScoreField != null && this.state.subkeyScoreField.length > 0 &&
                                                            <LaddaButton
                                                                id="previewScore"
                                                                type="button"
                                                                loading={false}
                                                                onClick={() => this.openModal2()}
                                                                data-color="#eee"
                                                                data-size={S}
                                                                data-style={SLIDE_LEFT}
                                                                data-spinner-size={30}
                                                                data-spinner-color="#ddd"
                                                                data-spinner-lines={12}
                                                                style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                                                            >
                                                                <div id="previewScoreDiv" style={{ paddingLeft: 10, paddingRight: 10 }}>{i18n.t("preview")}</div>
                                                            </LaddaButton>}
                                                        {this.state.subkeyScoreField && this.state.subkeyScoreField != null && this.state.subkeyScoreField.length > 0 && <LaddaButton
                                                            id="deleteScore"
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
                                                            <div id="deleteScoreDiv" style={{ paddingLeft: 10, paddingRight: 10 }}>{i18n.t("delete")}</div>
                                                        </LaddaButton>}
                                                        <LaddaButton
                                                            id="saveScore"
                                                            type="button"
                                                            loading={this.props.request_getBehaviorScore == true}
                                                            onClick={() => this._updateGridBehaviorScore()}
                                                            data-color="#eee"
                                                            data-size={S}
                                                            data-style={SLIDE_LEFT}
                                                            data-spinner-size={30}
                                                            data-spinner-color="#ddd"
                                                            data-spinner-lines={12}
                                                            style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                                                        >
                                                            <div id="saveScoreDiv" style={{ paddingLeft: 10, paddingRight: 10 }}>{i18n.t('save')}</div>
                                                        </LaddaButton>
                                                        <LaddaButton
                                                            id="resetScore"
                                                            type="button"
                                                            loading={false}
                                                            onClick={() => this._onResetScore()}
                                                            data-color="#eee"
                                                            data-size={S}
                                                            data-style={SLIDE_LEFT}
                                                            data-spinner-size={30}
                                                            data-spinner-color="#ddd"
                                                            data-spinner-lines={12}
                                                            style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                                                        >
                                                            <div id="resetScoreDiv" style={{ paddingLeft: 10, paddingRight: 10 }}>{i18n.t("reset")}</div>
                                                        </LaddaButton>
                                                    </div>
                                                    {/* 
                                                        </div>
                                                    </div>
                                                </div> */}

                                                </Row>}


                                                {/* <div className="row" style={{ textAlign: "right", width: "1%", height: "1%" }}>
                                                    <SaveButton
                                                        styel={{ width: 0, height: 0 }}
                                                        name={t("save")}
                                                    // loading={this.props.loadingSearch}
                                                    />
                                                </div> */}
                                            </Form>







                                        </div>
                                    </div>
                                </div>
                            </Row>}

                        </div>
                    </div>
                </div>
            </PannelBox >
        )
    }
}

const mapStateToProps = (state) => ({
    language: state.versatile.language,
    data_getDrivingBehaviorList: state.drivingsettings.data_getDrivingBehaviorList,
    data_getBehaviorCriteria: state.drivingsettings.data_getBehaviorCriteria,
    data_getBehaviorScore: state.drivingsettings.data_getBehaviorScore,
    data_getBehaviorScoreSummary: state.drivingsettings.data_getBehaviorScoreSummary,

    data_getBehaviorDrivingViewerId: state.drivingsettings.data_getBehaviorDrivingViewerId,
    behaviorId: state.drivingsettings.behaviorId,
    mock_data_subkey: state.drivingsettings.mock_data_subkey,
    request_updateBehaviorName: state.drivingsettings.request_updateBehaviorName,
    request_updateCriteriaSetting: state.drivingsettings.request_updateCriteriaSetting,
    request_updateBehaviorScore: state.drivingsettings.request_updateBehaviorScore,
    request_getBehaviorScore: state.drivingsettings.request_getBehaviorScore,

    visible1: state.drivingsettings.visible1,
    visible2: state.drivingsettings.visible2,
    visible3: state.drivingsettings.visible3,
});

const mapDispatchToProps = (dispatch) => ({
    getDrivingBehaviorList: (language) => dispatch(DrivingSettingsActions.getDrivingBehaviorList(language)),
    getBehaviorDrivingViewerId: (behavior_id) => dispatch(DrivingSettingsActions.getBehaviorDrivingViewerId(behavior_id)),
    getBehaviorCriteria: (id) => dispatch(DrivingSettingsActions.getBehaviorCriteria(id)),
    clearDataCriteria: () => dispatch(DrivingSettingsActions.clearDataCriteria()),
    getBehaviorScore: (sub1, sub2, behaviorId) => dispatch(DrivingSettingsActions.getBehaviorScore(sub1, sub2, behaviorId)),
    getBehaviorScoreSummary: (behavior_id) => dispatch(DrivingSettingsActions.getBehaviorScoreSummary(behavior_id)),
    setBehaviorId: (data) => dispatch(DrivingSettingsActions.setBehaviorId(data)),
    updateBehaviorName: (behaviorId, drivingViewerId, behaviorNameEn, behaviorNameTh, behaviorNameJa) => dispatch(DrivingSettingsActions.updateBehaviorName(behaviorId, drivingViewerId, behaviorNameEn, behaviorNameTh, behaviorNameJa)),
    createBehaviorCriteriaSubkey: (behaviorCriteriaSettings) => dispatch(DrivingSettingsActions.createBehaviorCriteriaSubkey(behaviorCriteriaSettings)),
    updateBehaviorScore: (data) => dispatch(DrivingSettingsActions.updateBehaviorScore(data)),
    setMockSubKey: (data) => dispatch(DrivingSettingsActions.setMockSubKey(data)),
    updateCriteriaSetting: (data) => dispatch(DrivingSettingsActions.updateCriteriaSetting(data)),

    setVisible1: (data) => dispatch(DrivingSettingsActions.setVisible1(data)),
    setVisible2: (data) => dispatch(DrivingSettingsActions.setVisible2(data)),
    setVisible3: (data) => dispatch(DrivingSettingsActions.setVisible3(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDrivingSettings)