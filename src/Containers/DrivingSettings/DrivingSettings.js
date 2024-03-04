import React, { Component } from 'react'
import PannelBox from '../../Components/PannelBox'
import { connect } from 'react-redux'
import {
    Container, Row, Card, Col, Form,
    Input, Button, CardImg,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    ButtonGroup,
} from 'reactstrap'
import DrivingSettingsActions, { DrivingSettingsTypes } from '../../Redux/DrivingSettingsRedux'
import LaddaButton, { S, SLIDE_LEFT } from 'react-ladda';
import Modal from 'react-awesome-modal';
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import DataGrid, { Texts, Column, FilterRow, HeaderFilter, SearchPanel, Grouping, GroupPanel, Paging, Export, Selection, MasterDetail, Editing, Field } from 'devextreme-react/data-grid';
import { CheckBox } from 'devextreme-react/check-box';
let INITIAL_STATE = {
    drivingBehavior: null,
}


class DrivingSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            language: this.props.language,
            title: {
                en: 'Driving Behavior',
                th: 'พฤติกรรมผู้ขับขี่'
            },
            preview: {
                th: 'ตัวอย่าง',
                en: 'preview',
                jp: 'preview',
            },
            delete: {
                th: 'ลบ',
                en: 'delete',
                jp: 'delete',
            },
            save: {
                th: 'บันทึก',
                en: 'save',
                jp: 'save',
            },
            reset: {
                th: 'รีเซ็ท',
                en: 'reset',
                jp: 'reset',
            },
            close: {
                th: 'ปิด', en: 'close', jp: 'close',
            },
            subTitle1: {
                en: 'Name',
                th: 'ชื่อ',
            },
            subTitle2: {
                en: 'Name',
                th: 'ชื่อ'
            },
            subTitle3: {
                en: 'Criteria',
                th: 'เกณฑ์'
            },
            subTitleCriteriaSummary: {
                en: "Criteria Summary",
                th: 'ผลรวมของเกณฑ์'
            },
            subTitle4: {
                en: 'Score & Comment',
                th: 'คะแนนและความคิดเห็น',
            },
            subTitleScoreSummary: {
                en: 'Score Summary',
                th: 'ผลรวมคะแนน',
            },

            defaultDropdown: {
                en: 'Please select list',
                th: 'กรุณาเลือกรายการ',
            },
            alertNoneChange: {
                en: `don't have any change`,
                th: 'ไม่มีข้อมูลเปลี่ยนแปลง',
            },
            firstField: [
                {
                    en: "Driving Behavior",
                    th: "พฤติกรรมการขับขี่",
                    id: "drivingBehavior",
                    type: "dropdown",
                    subitem: [
                        // {
                        //     en: 'Bussiness Type 1',
                        //     th: 'ประเภทธุรกิจที่ 1',
                        //     id: "bussinessType1",
                        // },
                        // {
                        //     en: 'Bussiness Type 2',
                        //     th: 'ประเภทธุรกิจที่ 2',
                        //     id: "bussinessType2",
                        // },
                    ],
                },
            ],
            secondField: [
                {
                    en: 'Display Name (EN)',
                    th: 'ชื่อภาษาอังกฤษ',
                    id: 'displayNameEN',
                    type: 'text'
                },
                {
                    en: 'TH',
                    th: 'ชื่อภาษาไทย',
                    id: 'displayNameTH',
                    type: 'text'
                },
                {
                    en: 'JP',
                    th: 'ชื่อภาษาญี่ปุ่น',
                    id: 'displayNameJP',
                    type: 'text'
                },
                {
                    en: 'Driving Viewer',
                    th: '',
                    id: 'drivingViewer',
                    type: 'radio',
                    subitem: [
                        {
                            en: 'Safety Driving',
                            th: 'Safety Driving',
                            id: 1,
                        },
                        {
                            en: 'Eco Driving',
                            th: 'Eco Driving',
                            id: 2,
                        },
                    ],
                }
            ],
            criteria1Field: [

            ],
            subkeyScoreField: [

            ],
            great: {
                en: 'great',
                th: 'ดีมาก'
            },
            good: {
                en: 'good',
                th: 'ดี'
            },
            middle: {
                en: 'middle',
                th: 'ปานกลาง'
            },
            notbad: {
                en: 'not bad',
                th: 'พอใช้'
            },
            notok: {
                en: "try again",
                th: 'ควรปรับปรุง'
            },
            alertText: {
                en: `Don't have any change`,
                th: 'ไม่มีการเปลี่ยนแปลง',
            },
            firstKey: null,
            secondKey: null,
            state_behavior_id: null,
            data_preview_criteria: [],

            grid_data_getBehaviorScore: [],
            grid_preview_data_getBehaviorScore: [],
            grid_preview_data_getBehaviorScoreSummary: [],

            tmp_data_getDrivingBehaviorList: null,
            tmp_data_getBehaviorCriteria: null,
            tmp_data_getBehaviorScore: null,
            tmp_data_getBehaviorScoreSummary: null,
            tmp_data_getBehaviorDrivingViewerId: null,
            // dataDefault: INITIAL_STATE,
            currentDataGridState: [],


            dataDefault: {
                drivingBehavior: null,

                displayNameEN: null,
                displayNameTH: null,
                displayNameJP: null,
                drivingViewer: null,

                criteriaHaveSubkey: null,
                criteria2: null,
                criteria3: null,
                criteria4: null,
                criteria5: null,
            },
            visible: false,
            visible2: false,
            visible3: false,
        }
        this.dataGrid = React.createRef();
        // this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
        // this.setButton = this.setButton.bind(this);
        // this.detectContentReady = this.detectContentReady.bind(this);
        // this.delete = this.delete.bind(this);
    }

    setButton() {
        var currentSetting = this.dataGrid.current.instance.state();
        currentSetting.pageIndex = 7;
        this.dataGrid.current.instance.state(currentSetting);
        this.dataGrid.current.instance.refresh();
    }

    detectContentReady(event) {
        if (this.props.listdriver !== null) {
            var currentSetting = this.dataGrid.current.instance.state();
            this.setState((state, props) => {
                return { currentDataGridState: currentSetting };
            }, () => {
                // console.log(this.state.currentDataGridState);
            });
        }
    }

    openModal2 = () => {
        this.props.getBehaviorScoreSummary(this.props.behaviorId ? this.props.behaviorId : 4)
        this.setState({
            visible2: true
        });
    }

    closeModal2 = () => {
        this.setState({
            visible2: false
        });
    }

    openModal = () => {
        this.setState({
            visible: true
        });
    }

    closeModal = () => {
        this.setState({
            visible: false
        });
    }

    static getDerivedStateFromProps = (newProps, prevState) => {
        // console.log(newProps)
        // console.log(prevState)
        // console.log('----------------- props Form Driving Settings -----------------')

        if(newProps.language != prevState.language){
            newProps.getDrivingBehaviorList(newProps.language)
        }

        if (newProps.data_getBehaviorDrivingViewerId && newProps.data_getBehaviorDrivingViewerId != null) {
            if (newProps.data_getBehaviorDrivingViewerId != prevState.tmp_data_getBehaviorDrivingViewerId) {
                let tmp = prevState.secondField
                let dataDefault = prevState.dataDefault
                tmp.forEach((e, i) => {
                    if (e.id == "displayNameEN") {
                        // e.value = newProps.data_getBehaviorDrivingViewerId.nameEn
                        dataDefault[e.id] = newProps.data_getBehaviorDrivingViewerId.behaviorNameDict.en
                    }
                    else if (e.id == "displayNameTH") {
                        // e.value = newProps.data_getBehaviorDrivingViewerId.nameTh
                        dataDefault[e.id] = newProps.data_getBehaviorDrivingViewerId.behaviorNameDict.th
                    } else if (e.id == "displayNameJP") {
                        // e.value = newProps.data_getBehaviorDrivingViewerId.nameJa
                        dataDefault[e.id] = newProps.data_getBehaviorDrivingViewerId.behaviorNameDict.ja
                    } else if (e.id == "drivingViewer") {
                        dataDefault.drivingViewer = newProps.data_getBehaviorDrivingViewerId.drivingViewerId
                        // e.active = newProps.data_getBehaviorDrivingViewerId.drivingViewerid
                    }
                })

                // *************** Mock Subkey of Behavior Zone ********************** //
                let tmp_subkeyScoreField = []
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
                                        value: ele.key
                                    }
                                })

                            })
                        })
                    }

                })
                tmp_subkeyScoreField = JSON.parse(JSON.stringify(tmp_subkeyScoreField))
                tmp_subkeyScoreField.map((e, i) => {
                    e.subitem.splice(0, 0, {
                        en: "---- Please Select ----",
                        th: "---- กรุณาเลือกรายการ ----",
                        id: "select",
                        value: "none"
                    })
                })

                // *************** Mock Subkey of Behavior Zone ********************** //

                return {
                    dataDefault,
                    subkeyScoreField: tmp_subkeyScoreField,
                    tmp_data_getBehaviorDrivingViewerId: newProps.data_getBehaviorDrivingViewerId
                }
            }
        }

        let tmp_data_getBehaviorScoreSummary = prevState.tmp_data_getBehaviorScoreSummary
        let grid_preview_data_getBehaviorScoreSummary = []
        if (newProps.data_getBehaviorScoreSummary && newProps.data_getBehaviorScoreSummary != null) {
            if (newProps.data_getBehaviorScoreSummary != prevState.tmp_data_getBehaviorScoreSummary) {
                newProps.data_getBehaviorScoreSummary.behaviorScoreInfos.map((e, i) => {
                    grid_preview_data_getBehaviorScoreSummary.push({
                        id: i + 1,
                        engineSeries: e.subKey2 ? e.subKey2 : '',
                        classType: e.subKey1 ? e.subKey1 : '',
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
        // let tmp_data_getDrivingBehaviorList
        // let tmp_field = prevState.firstField
        if (newProps.data_getDrivingBehaviorList && newProps.data_getDrivingBehaviorList != null) {
            if (newProps.data_getDrivingBehaviorList != prevState.tmp_data_getDrivingBehaviorList) {
                let tmp_data_getDrivingBehaviorList
                let tmp_field = [
                    {
                        en: "Driving Behavior",
                        th: "พฤติกรรมการขับขี่",
                        id: "drivingBehavior",
                        type: "dropdown",
                        subitem: [],
                    },
                ]
                tmp_data_getDrivingBehaviorList = newProps.data_getDrivingBehaviorList
                newProps.data_getDrivingBehaviorList.behaviors.map((e, i) => {
                    if (e.value) {
                        tmp_field[0].subitem.push({
                            en: e.value,
                            th: e.value,
                            id: e.value,
                            key: e.key
                        })
                    }
                })

                return {
                    tmp_data_getDrivingBehaviorList,
                    firstField: tmp_field,
                }
            }
        }

        // ** 07-Jan-2020 Finish Criteria Field ** 19:39 pm
        let tmp_data_getBehaviorCriteria
        let criteria1Field = prevState.criteria1Field
        let data_preview_criteria = prevState.data_preview_criteria
        if (newProps.data_getBehaviorCriteria && newProps.data_getBehaviorCriteria != null) {
            if (newProps.data_getBehaviorCriteria != prevState.tmp_data_getBehaviorCriteria) {
                newProps.getBehaviorScore(prevState.firstKey ? prevState.firstKey : "", prevState.secondKey ? prevState.secondKey : "", newProps.behaviorId)
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
                                        behavior_id: element.behaviorCriteriaId
                                    })
                                    tmp_subitem.push({
                                        en: element.subKey1,
                                        th: element.subKey1,
                                        id: 'criteria-info-subkey' + (index + 1),
                                        value: element.criteriaValue,
                                        behavior_id: element.behaviorCriteriaId
                                    })
                                })

                                criteria1Field.push({
                                    en: e.subkeyGroupName1,
                                    th: e.subkeyGroupName1,
                                    type: 'dropdown',
                                    id: 'criteriaHaveSubkey' + (i + 1),
                                    unit: e.behaviorCriteriaSettings.criteriaSuffix,
                                    value: e.behaviorCriteriaSettings.criteriaValue ? e.behaviorCriteriaSettings.criteriaValue : '',
                                    subitem: tmp_subitem,
                                    criteriaId: e.criteriaId,
                                    behaviorCriteriaSettingId: e.behaviorCriteriaSettings && e.behaviorCriteriaSettings.behaviorCriteriaSettingId ? e.behaviorCriteriaSettings.behaviorCriteriaSettingId : null
                                })


                            }
                        } else {
                            criteria1Field.push({
                                en: e.criteriaName + " " + (e.criteriaPrefix ? e.criteriaPrefix : "") + " ",
                                th: e.criteriaName + " " + (e.criteriaPrefix ? e.criteriaPrefix : "") + " ",
                                type: 'text',
                                id: 'criteria' + (i + 1),
                                unit: e.criteriaSuffix,
                                value: e.behaviorCriteriaSettings && e.behaviorCriteriaSettings[0].criteriaValue ? e.behaviorCriteriaSettings[0].criteriaValue : '',
                                behaviorCriteriaSettingId: e.behaviorCriteriaSettings[0].behaviorCriteriaSettingId ? e.behaviorCriteriaSettings[0].behaviorCriteriaSettingId : null
                            })
                        }

                    })
                }
                tmp_data_getBehaviorCriteria = newProps.data_getBehaviorCriteria

                return {
                    tmp_data_getBehaviorCriteria,
                    criteria1Field,
                    data_preview_criteria
                }

            }
        }
        // ** 07-Jan-2020 Finish Criteria Field ** 19:39 pm

        let tmp_data_getBehaviorScore = prevState.tmp_data_getBehaviorScore
        // let grid_data_getBehaviorScore = prevState.grid_data_getBehaviorScore
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
            // tmp_data_getDrivingBehaviorList,
            // firstField: tmp_field,
            // tmp_data_getBehaviorCriteria,
            // criteria1Field
            // tmp_data_getBehaviorDrivingViewerId: newProps.data_getBehaviorDrivingViewerId ? newProps.data_getBehaviorDrivingViewerId : null
        }
    }

    componentDidUpdate = (newProps, prevState) => {
        console.log(newProps)
        console.log(prevState)
        console.log('------------- Did Update Driving Setting -------------------------')
        if (prevState.firstKey != this.state.firstKey || prevState.secondKey != this.state.secondKey) {
            this.props.getBehaviorScore(this.state.firstKey ? this.state.firstKey : null, this.state.secondKey ? this.state.secondKey : null, this.props.behaviorId)
        }

        if (prevState.tmp_data_getBehaviorCriteria != this.state.tmp_data_getBehaviorCriteria) {
            let dataDefault = this.state.dataDefault
            let tmp = this.state.criteria1Field
            tmp.forEach((e, i) => {
                if (e.value && e.value != "") {
                    dataDefault[e.id] = e.value
                }
            })
            this.setState({ dataDefault })
        }

        if(prevState.firstField != this.state.firstField){

            this.setState({ firstField: this.state.firstField })
        }
    }

    componentWillUnmount() {
        this.props.clearDataCriteria()
    }

    componentDidMount = () => {
        // *************** Mock Subkey of Behavior Zone ********************** //
        let mainArrSubKey = [
            {
                behavior_id: 2,
                subkey: [
                    {
                        name: "ClassType",
                        classType: [{ key: "4W", value: "4-Wheel" }, { key: "6W", value: "6-Wheel" }, { key: "10W", value: "10-Wheel" }, { key: "12W", value: "12-Wheel" }, { key: "T/T", value: "Truck Tractor" }]
                    }
                ],
            },
            {
                behavior_id: 17,
                subkey: [
                    {
                        name: "ClassType",
                        classType: [{ key: "4W", value: "4-Wheel" }, { key: "6W", value: "6-Wheel" }, { key: "10W", value: "10-Wheel" }, { key: "12W", value: "12-Wheel" }, { key: "T/T", value: "Truck Tractor" }]
                    }
                ],
            },
            {
                behavior_id: 18,
                subkey: [
                    {
                        name: "ClassType",
                        classType: [{ key: "4W", value: "4-Wheel" }, { key: "6W", value: "6-Wheel" }, { key: "10W", value: "10-Wheel" }, { key: "12W", value: "12-Wheel" }, { key: "T/T", value: "Truck Tractor" }]
                    }
                ],
            },
            {
                behavior_id: 19,
                subkey: [
                    {
                        name: "ClassType",
                        classType: [{ key: "4W", value: "4-Wheel" }, { key: "6W", value: "6-Wheel" }, { key: "10W", value: "10-Wheel" }, { key: "12W", value: "12-Wheel" }, { key: "T/T", value: "Truck Tractor" }]
                    },
                    {
                        name: "EngineSeries",
                        classType: [{ key: "A", value: "Engine Type A" }, { key: "P", value: "Engine Type P" }, { key: "E", value: "Engine Type E" }, { key: "J", value: "Engine Type J" }],
                    }
                ],

            },
            {
                behavior_id: 20,
                subkey: [
                    {
                        name: "ClassType",
                        classType: [{ key: "4W", value: "4-Wheel" }, { key: "6W", value: "6-Wheel" }, { key: "10W", value: "10-Wheel" }, { key: "12W", value: "12-Wheel" }, { key: "T/T", value: "Truck Tractor" }]
                    },
                    {
                        name: "EngineSeries",
                        classType: [{ key: "A", value: "Engine Type A" }, { key: "P", value: "Engine Type P" }, { key: "E", value: "Engine Type E" }, { key: "J", value: "Engine Type J" }],
                    }
                ],
            }
        ]
        this.props.setMockSubKey(mainArrSubKey)
        // *************** Mock Subkey of Behavior Zone ********************** //

        let behaviorCriteriaSettings = []
        behaviorCriteriaSettings.push({
            behaviorCriteriaSettingId: 6,
            subKey1: "FC",
            subKey2: "",
            criteriaValue: 1234,
            behaviorCriteriaId: 4
        })
        // this.props.createBehaviorCriteriaSubkey(behaviorCriteriaSettings)
        this.props.getDrivingBehaviorList(this.props.language)
    }

    setDropdownInfo = (item, index) => {
        return (
            <div key={'sub-input-div-form' + index}>
                <Input key={'dropdown-form'} type="select" name={item.id} id={item.id} onChange={(e) => {
                    if (item.id == "drivingBehavior") {
                        console.log(item)
                        console.log(e.target.value)
                        console.log('----------------- ON Select/Build Drop Down ------------')
                        let tmp = item.subitem.find(el => el.id == e.target.value)
                        if (tmp && tmp.key && tmp.key != null) {
                            this.props.setBehaviorId(tmp.key)
                            this.props.getBehaviorDrivingViewerId(tmp.key)

                            // this.props.getBehaviorCriteria(tmp.key)
                            // this.props.getBehaviorScore(1, 1, tmp.key)
                            this.setState({
                                criteria1Field: [], state_behavior_id: tmp.key,
                                firstKey: null, secondKey: null, subkeyScoreField: null,
                                data_preview_criteria: [],
                                grid_data_getBehaviorScore: [],
                                grid_preview_data_getBehaviorScore: [],
                                grid_preview_data_getBehaviorScoreSummary: [],
                            })
                            this.setValue(item.id, e.target.value)
                        }
                    }
                    else if (item.subId && item.subId == "subkey-score") {
                        if (item.id == "ClassType") {
                            let tmp = item.subitem.find(el => el.id == e.target.value)
                            let firstKey
                            if (tmp && tmp != null && item.id == "ClassType") {
                                firstKey = tmp.value
                            }
                            this.setState({ firstKey })
                        } else if (item.id == "EngineSeries") {
                            let tmp = item.subitem.find(el => el.id == e.target.value)

                            let secondKey
                            if (tmp && tmp != null && item.id == "EngineSeries") {
                                secondKey = tmp.value
                            }
                            this.setState({ secondKey })
                        }
                    }
                    else {
                        this.setValue(item.id, e.target.value)
                        this.setState({ firstKey: null, secondKey: null, subkeyScoreField: null, })
                    }

                }}
                // disabled={this.state.setDisabled}
                >
                    {item.id == "drivingBehavior" && <option value=''>
                        {this.state.defaultDropdown[this.props.language]}
                    </option>}
                    {item.subitem.map((subitem) => <option value={subitem.id}>{subitem[this.props.language]}</option>)}
                </Input>

            </div>)
    }

    setRadioInfo = (item, index) => {
        // console.log(this.state.dataDefault[item.id])

        return (
            <ButtonGroup key={'radio-button-form' + index} disabled={this.state.setDisabled}>
                {item.subitem.map((subitem) => <Button className='button-radio' id={item.id + index} onClick={() => this.setValue(item.id, subitem.id)} disabled={this.state.setDisabled}
                    active={this.state.dataDefault[item.id] == subitem.id}
                >{subitem[this.props.language]}</Button>)}
            </ButtonGroup>
        )
    }


    setPhotoInfo = (item, index) => {
        return (
            <div key={'sub-input-div-form' + index}>
                <CardImg key={'card-img-form'} src={this.state.img} width="65%" height="200" />
                <br /><br />
                {this.props.typeForm === 'show' ? null :
                    <Input key={"photo_upload"} name="fileToUpload" id={item.id} onChange={this.handleChange} />}
            </div>
        )
    }

    setValue = (id, value) => {
        // console.log(id, value)
        // console.log('-------------------- Set Value Driving Behavior -----------------------')
        // let tmp = this.state.dataDefault
        // tmp[id] = value
        // // this.setState({ dataDefault: tmp })
        // this.setState((state, props) => {
        //     console.log(state) // all value in this state
        //     console.log(props) // redux props / other props
        //     console.log('-------------- State & Props --------------')
        //     return {
        //         dataDefault: tmp
        //     }
        // })

        this.state.dataDefault[id] = value
        this.setState(prevState => prevState)
    }

    setCheckbox = (item, index) => {
        return (
            <div key={'sub-input-div-form' + index}>
                <Input key={"checkbox-form"} type="checkbox" onClick={(e) => {
                    this.setValue(item.id, e.target.checked)
                }} />
            </div>)
    }

    setDatePicker = (item, index) => {
        return (
            <div key={'sub-input-div-form' + index}>
                <Input key={"date-form"} type="date" value={this.state.dataDefault[item.id]} onChange={(e) => this.setValue(item.id, e.target.value)}></Input>
            </div>
        )
    }

    setInfo = (item, index) => {
        // console.log(this.state.dataDefault)
        // console.log(item, index, '----------- Here Item ------------')
        return (
            <div key={'main-div-form' + index} className="form-group">
                <label className="col-sm-4 control-label" >{item[this.props.language]}:</label >
                <div className="col-sm-8" key={'second-div-form' + index}>
                    {item.type === "radio" ? this.setRadioInfo(item, index) :
                        item.type === "dropdown" ? this.setDropdownInfo(item, index) :
                            item.type === "file" ? this.setPhotoInfo(item, index) :
                                item.type === "checkbox" ? this.setCheckbox(item, index) :
                                    item.type === "date" ? this.setDatePicker(item, index) : (item.unit && item.id.includes("criteria") ? <div key={'third-div-form' + index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Input type={item.type}
                                            value={this.state.dataDefault[item.id]}  // Criteria
                                            id={item.id} onChange={(e) => {
                                                this.setValue(item.id, e.target.value)
                                                let tmp = this.state.criteria1Field
                                                tmp[index].value = e.target.value
                                                this.setState({ criteria1Field: tmp })
                                            }}
                                            disabled={this.state.setDisabled}></Input>
                                        {/* <span> Error 1</span> */}
                                        <span style={{ paddingLeft: 5 }}>{" " + item.unit}</span>
                                    </div> : item.value ? <div key={'third-div-form' + index}>
                                        <Input type={item.type}
                                            value={this.state.dataDefault[item.id]}  // Name Behavior EN / TH / JP
                                            id={item.id} onChange={(e) => this.setValue(item.id, e.target.value)}
                                            disabled={this.state.setDisabled}></Input>
                                        {/* <span> Error 1</span> */}
                                    </div> : <div key={'third-div-form' + index}>
                                                <Input type={item.type}
                                                    value={this.state.dataDefault[item.id]}
                                                    id={item.id} onChange={(e) => this.setValue(item.id, e.target.value)}
                                                    disabled={this.state.setDisabled}></Input>
                                                {/* <span> Error 1</span> */}
                                            </div>)}
                </div>
            </div>
        )
    }

    _renameBehavior = () => {
        let oldValue = this.props.data_getBehaviorDrivingViewerId
        let behaviorId = this.state.state_behavior_id
        let { displayNameEN, displayNameTH, displayNameJP, drivingViewer } = this.state.dataDefault
        // if (Number(oldValue.drivingViewerId) == Number(drivingViewer.slice(drivingViewer.length - 1, drivingViewer.length)) &&
        //     displayNameEN == oldValue.nameEn && displayNameTH == oldValue.nameTh && displayNameJP == oldValue.nameJa) {
        //     // alert(this.state.alertText[this.props.language])
        //     this.setState({ visible3: true })
        // }
        if (Number(oldValue.drivingViewerId) == Number(drivingViewer) &&
            displayNameEN == oldValue.nameEn && displayNameTH == oldValue.nameTh && displayNameJP == oldValue.nameJa) {
            // alert(this.state.alertText[this.props.language])
            this.setState({ visible3: true })
        }
        else {
            this.props.updateBehaviorName(behaviorId, Number(drivingViewer.slice(drivingViewer.length - 1, drivingViewer.length)), displayNameEN, displayNameTH, displayNameJP)
        }

    }

    _updateGridBehaviorScore = () => {
        let newScore = this.state.grid_data_getBehaviorScore
        let oldScore = this.props.data_getBehaviorScore
        let count = 0
        let behaviorScoreInfos = {
            behaviorScoreInfos: []
        }

        oldScore.behaviorScoreInfos.forEach((oldItem, oldIndex) => {
            let tmp = JSON.parse(JSON.stringify(oldItem))
            newScore.forEach((newItem, newIndex) => {
                // console.log(tmp.maxValue)
                if (oldItem != newItem) {
                    if (newItem.no != oldItem.seq) {
                        // tmp.seq = newItem.no
                    }
                    if (newItem.includeMin != '' && newItem.no == oldItem.seq) {
                        // wait data
                        tmp.isIncMinValue = newItem.includeMin
                        count = 10
                    }
                    if (newItem.min != oldItem.minValue && newItem.no == oldItem.seq) {
                        tmp.minValue = newItem.min
                        count = 10
                    }
                    if (newItem.includeMax != '' && newItem.no == oldItem.seq) {
                        // wait data
                        tmp.isIncMaxValue = newItem.includeMax
                        count = 10
                    }
                    if (newItem.max != oldItem.maxValue && newItem.no == oldItem.seq) {
                        tmp.maxValue = newItem.max
                        count = 10
                    }
                    if (newItem.score != oldItem.score && newItem.no == oldItem.seq) {
                        tmp.score = newItem.score
                        count = 10
                    }
                    if (newItem.comment != '' && newItem.no == oldItem.seq) {
                        // wait data
                    }

                }
                // else {
                //     behaviorScoreInfos.behaviorScoreInfos.push(oldItem)
                //     count++
                // }
            })
            behaviorScoreInfos.behaviorScoreInfos.push(tmp)
        })

        if (count == 10) {
            // console.log(count)
            // console.log(behaviorScoreInfos)
            // console.log('------------ Call Api Update Score -------------------')
            this.props.updateBehaviorScore(behaviorScoreInfos)
        } else {
            this.setState({ visible3: true })
        }

    }

    _updateCriteria = () => {
        let newCriteria = this.state.criteria1Field
        let oldPropsCriteria = this.props.data_getBehaviorCriteria.behaviorCriterias
        let count = 0
        let behaviorCriteriaSettings = {
            behaviorCriteriaSettings: []
        }

        oldPropsCriteria.forEach((oldItem, oldIndex) => {
            let tmp
            // if (!oldItem.subkeyGroupName1 && oldItem.criteriaId != 20) {
            if (oldItem.criteriaId != 4) {
                tmp = JSON.parse(JSON.stringify(oldItem.behaviorCriteriaSettings[0]))
            } else tmp = false

            newCriteria.forEach((newItem, newIndex) => {

                if (oldItem.criteriaId == 4) {    // 1. check "Category Type"

                } else {
                    if (tmp && newItem.behaviorCriteriaSettingId && oldItem.behaviorCriteriaSettings[0] && newItem.behaviorCriteriaSettingId == oldItem.behaviorCriteriaSettings[0].behaviorCriteriaSettingId) {
                        // 2. check ID Criteria
                        // console.log(oldItem)
                        // console.log(tmp)
                        // console.log(Number(newItem.value))
                        // console.log(Number(oldItem.behaviorCriteriaSettings[0].criteriaValue))
                        // console.log('>>>>>>>> TMP, New Value != Old Value <<<<<<<<')
                        // 3. check value
                        if (Number(newItem.value) != Number(oldItem.behaviorCriteriaSettings[0].criteriaValue)) {
                            // console.log('>>>>>>>>>>>>> FUCK SUCCESSFULLY !! <<<<<<<<<')
                            tmp.criteriaValue = Number(newItem.value)
                            count = 10
                        }
                    }
                }
            })
            if (tmp)
                behaviorCriteriaSettings.behaviorCriteriaSettings.push(tmp)
        })

        if (count == 10) {
            // console.log(behaviorCriteriaSettings)
            // console.log('==================== CALL A P I ====================================')
            this.props.updateCriteriaSetting(behaviorCriteriaSettings)
        } else {
            this.setState({ visible3: true })
        }
    }

    render() {
        const { component: Component, ...rest } = this.props
        // console.log(this.props.language)
        console.log(this.state.dataDefault)
        // console.log(this.props.data_getBehaviorDrivingViewerId)
        // console.log(this.state.tmp_data_getBehaviorDrivingViewerId)
        // console.log(this.props.mock_data_subkey)
        console.log(this.state.firstField)
        console.log('------------------- Driving Settings Screen --------------------------')
        return (
            <PannelBox title={this.state.title[this.props.language]}>
                <div className="contrainner">
                    <div className="ibox float-e-margins">
                        <div className="form-horizontal">

                            <section>
                                {/* <h1>React-Modal Examples</h1>
                                <input type="button" value="Open" onClick={() => this.openModal()} /> */}
                                <Modal
                                    visible={this.state.visible}
                                    width="400"
                                    height="200"
                                    effect="fadeInUp"
                                    onClickAway={() => this.closeModal()}
                                >

                                    <div className="ibox-content">
                                        <h3>{this.state.subTitleCriteriaSummary[this.props.language]}</h3>
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
                                    visible={this.state.visible2}
                                    width="50%"
                                    height="60%"
                                    effect="fadeInUp"
                                    onClickAway={() => this.closeModal2()}
                                >

                                    <div className="ibox-content">
                                        <h3>{this.state.subTitleScoreSummary[this.props.language]}</h3>
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
                                    visible={this.state.visible3}
                                    width="30%"
                                    height="35%"
                                    effect="fadeInUp"
                                    onClickAway={() => this.setState({ visible3: false })}
                                >

                                    <div className="ibox-content">
                                        <div>
                                            <h1>Alert</h1>
                                        </div>
                                        <h3>{this.state.alertNoneChange[this.props.language]}</h3>
                                        <LaddaButton
                                            id="save"
                                            loading={false}
                                            onClick={() => { this.setState({ visible3: false }) }}
                                            data-color="#eee"
                                            data-size={S}
                                            data-style={SLIDE_LEFT}
                                            data-spinner-size={30}
                                            data-spinner-color="#ddd"
                                            data-spinner-lines={12}
                                            style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10, position: 'absolute', bottom: 5, right: 2.5 }}
                                        >
                                            <div id="save" style={{ paddingLeft: 10, paddingRight: 10 }}>{this.state.close[this.props.language]}</div>
                                        </LaddaButton>
                                    </div>
                                </Modal>
                            </section>

                            {this.state.firstField && this.state.firstField != null && this.state.firstField[0].subitem && this.state.firstField[0].subitem.length > 0 && <Row>
                                <div className="row">
                                    <div style={{ paddingLeft: 15, paddingRight: 15 }}>
                                        {/* <h3>{this.state.dealerInfo[this.state.lang]}</h3> */}
                                        {/* <div className="hr-line-dashed"></div> */}
                                        <div className="col-lg-12">


                                            <Form id={'form1.1'}>
                                                {this.state.firstField.map((item, index) => {
                                                    return this.setInfo(item, index)
                                                })}
                                                <br />
                                            </Form>


                                        </div>
                                    </div>
                                </div>
                            </Row>}

                            {this.state.dataDefault.drivingBehavior != null && <Row>
                                <div className="row">
                                    <div style={{ paddingLeft: 15, paddingRight: 15 }}>
                                        <h3>{this.state.subTitle2[this.props.language]}</h3>
                                        <div className="hr-line-dashed"></div>
                                        <div className="col-lg-12">

                                            <Form id={'form1.1'}>
                                                {this.state.secondField.map((item, index) => {
                                                    // console.log(item)
                                                    return this.setInfo(item, index)
                                                })}
                                                <br />
                                            </Form>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                <LaddaButton
                                                    id="save"
                                                    loading={this.props.request_updateBehaviorName}
                                                    onClick={() => this._renameBehavior()}
                                                    data-color="#eee"
                                                    data-size={S}
                                                    data-style={SLIDE_LEFT}
                                                    data-spinner-size={30}
                                                    data-spinner-color="#ddd"
                                                    data-spinner-lines={12}
                                                    style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                                                >
                                                    <div id="save" style={{ paddingLeft: 10, paddingRight: 10 }}>{this.state.save[this.props.language]}</div>
                                                </LaddaButton>
                                                <LaddaButton
                                                    id="save"
                                                    loading={false}
                                                    onClick={() => { console.log('------------------ Reset Button ------------------') }}
                                                    data-color="#eee"
                                                    data-size={S}
                                                    data-style={SLIDE_LEFT}
                                                    data-spinner-size={30}
                                                    data-spinner-color="#ddd"
                                                    data-spinner-lines={12}
                                                    style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                                                >
                                                    <div id="save" style={{ paddingLeft: 10, paddingRight: 10 }}>{this.state.reset[this.props.language]}</div>
                                                </LaddaButton>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </Row>}

                            {this.state.criteria1Field && this.state.criteria1Field.length > 0 && <Row>
                                <div className="row">
                                    <div style={{ paddingLeft: 15, paddingRight: 15 }}>
                                        <h3>{this.state.subTitle3[this.props.language]}</h3>
                                        <div className="hr-line-dashed"></div>
                                        <div className="col-lg-12">

                                            <Form id={'form1.1'}>
                                                {this.state.criteria1Field.map((item, index) => {
                                                    // console.log(item)
                                                    return this.setInfo(item, index)
                                                })}
                                                <br />
                                            </Form>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>

                                                {this.state.criteria1Field.find(e => e.subitem && e.subitem.length > 0) &&
                                                    <LaddaButton
                                                        id="save"
                                                        loading={false}
                                                        onClick={() => this.openModal()}
                                                        data-color="#eee"
                                                        data-size={S}
                                                        data-style={SLIDE_LEFT}
                                                        data-spinner-size={30}
                                                        data-spinner-color="#ddd"
                                                        data-spinner-lines={12}
                                                        style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                                                    >
                                                        <div id="save" style={{ paddingLeft: 10, paddingRight: 10 }}>{this.state.preview[this.props.language]}</div>
                                                    </LaddaButton>}
                                                {this.state.criteria1Field.find(e => e.subitem && e.subitem.length > 0) && <LaddaButton
                                                    id="save"
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
                                                    <div id="save" style={{ paddingLeft: 10, paddingRight: 10 }}>{this.state.delete[this.props.language]}</div>
                                                </LaddaButton>}

                                                <LaddaButton
                                                    id="save"
                                                    loading={this.props.request_updateCriteriaSetting}
                                                    onClick={this._updateCriteria}
                                                    data-color="#eee"
                                                    data-size={S}
                                                    data-style={SLIDE_LEFT}
                                                    data-spinner-size={30}
                                                    data-spinner-color="#ddd"
                                                    data-spinner-lines={12}
                                                    style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                                                >
                                                    <div id="save" style={{ paddingLeft: 10, paddingRight: 10 }}>{this.state.save[this.props.language]}</div>
                                                </LaddaButton>
                                                <LaddaButton
                                                    id="save"
                                                    loading={false}
                                                    onClick={() => { console.log('------------------ Reset Button ------------------') }}
                                                    data-color="#eee"
                                                    data-size={S}
                                                    data-style={SLIDE_LEFT}
                                                    data-spinner-size={30}
                                                    data-spinner-color="#ddd"
                                                    data-spinner-lines={12}
                                                    style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                                                >
                                                    <div id="save" style={{ paddingLeft: 10, paddingRight: 10 }}>{this.state.reset[this.props.language]}</div>
                                                </LaddaButton>


                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </Row>}

                            {this.props.behaviorId && <Row>
                                <div className="row">
                                    <div style={{ paddingLeft: 15, paddingRight: 15 }}>
                                        <h3>{this.state.subTitle4[this.props.language]}</h3>
                                        <div className="hr-line-dashed"></div>
                                        <div className="col-lg-12">
                                            {/* // *********** Drop Down Subkey Zone *********** // */}
                                            {this.state.subkeyScoreField && this.state.subkeyScoreField.length > 0 &&
                                                this.state.subkeyScoreField.map((item, index) => {
                                                    return this.setInfo(item, index)
                                                })}
                                            {/* // *********** Drop Down Subkey Zone *********** // */}

                                            <div className="ibox-content" style={{ borderTopWidth: 0, }}>
                                                <DataGrid id={'data-grid-criteria'}
                                                    ref={this.dataGrid}
                                                    dataSource={this.state.grid_data_getBehaviorScore}
                                                    keyExpr={'no'}
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
                                                    {/* <Column dataField={'drivingCardNo'} minWidth={150} />
                                                <Column dataField={'email'} minWidth={150} />
                                                <Column dataField={'phone'} minWidth={150} />
                                                <Column dataField={'lineID'} minWidth={150} /> */}
                                                    {/* <Editing
                                                        // onEditingStart={this.onEditingStart}

                                                        mode="batch"
                                                        allowUpdating={true}
                                                        selectTextOnEditStart={this.state.selectTextOnEditStart}
                                                        startEditAction={this.state.startEditAction} /> */}
                                                    <Editing
                                                        mode="cell"
                                                        allowUpdating={true}
                                                    />
                                                </DataGrid>
                                            </div>

                                            {/* LAST TABLE ZONE  */}
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                {this.state.subkeyScoreField && this.state.subkeyScoreField != null && this.state.subkeyScoreField.length > 0 &&
                                                    <LaddaButton
                                                        id="save"
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
                                                        <div id="save" style={{ paddingLeft: 10, paddingRight: 10 }}>{this.state.preview[this.props.language]}</div>
                                                    </LaddaButton>}
                                                {this.state.subkeyScoreField && this.state.subkeyScoreField != null && this.state.subkeyScoreField.length > 0 && <LaddaButton
                                                    id="save"
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
                                                    <div id="save" style={{ paddingLeft: 10, paddingRight: 10 }}>{this.state.delete[this.props.language]}</div>
                                                </LaddaButton>}
                                                <LaddaButton
                                                    id="save"
                                                    loading={this.props.request_updateBehaviorScore}
                                                    onClick={() => this._updateGridBehaviorScore()}
                                                    data-color="#eee"
                                                    data-size={S}
                                                    data-style={SLIDE_LEFT}
                                                    data-spinner-size={30}
                                                    data-spinner-color="#ddd"
                                                    data-spinner-lines={12}
                                                    style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                                                >
                                                    <div id="save" style={{ paddingLeft: 10, paddingRight: 10 }}>{this.state.save[this.props.language]}</div>
                                                </LaddaButton>
                                                <LaddaButton
                                                    id="save"
                                                    loading={false}
                                                    onClick={() => { console.log('------------------ Reset Button ------------------') }}
                                                    data-color="#eee"
                                                    data-size={S}
                                                    data-style={SLIDE_LEFT}
                                                    data-spinner-size={30}
                                                    data-spinner-color="#ddd"
                                                    data-spinner-lines={12}
                                                    style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                                                >
                                                    <div id="save" style={{ paddingLeft: 10, paddingRight: 10 }}>{this.state.reset[this.props.language]}</div>
                                                </LaddaButton>
                                            </div>

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
    // messageError: state.login.messageError,
    // data: state.login.data
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
});

const mapDispatchToProps = (dispatch) => ({
    // setTest: test => dispatch(PopupActions.setTest(test))
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
});

export default connect(mapStateToProps, mapDispatchToProps)(DrivingSettings)

// Flow การ map กล่อง gps 
// 1. 