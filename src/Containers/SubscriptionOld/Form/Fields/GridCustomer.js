
import VehicleActions from '../../../../Redux/VehicleRedux'
import FormValidateActions from '../../../../Redux/FormValidateRedux'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PannelBox from '../../../../Components/PannelBox'
import { Row, Col, Button } from 'reactstrap'
import Form from "react-jsonschema-form"
import { ENDPOINT_BASE_URL } from '../../../../Config/app-config';
import { Modal } from 'antd';
import Table from '../../../../Components/DataGridView/Table.js'
import SubscriptionActions from '../../../../Redux/SubscriptionRedux'
import DataGridView from '../../../../Components/DataGridView'
import { setSchema } from './Schema'
import SaveButton from '../../../../Components/SaveButton'
import CancelButton from '../../../../Components/CancelButton'
import { diffString, diff } from 'json-diff';
import DropdownActions from '../../../../Redux/DropdownRedux'
import { isEmpty } from 'ramda'
import { get } from 'lodash'
import moment from 'moment'
import Data from "./Data"
import LicenseData from "./LicenseData"
import Alert from '../../../../Components/Alert'
import { ArrayFieldTemplateNoSeperator } from "../../../../Components/FormComponent/ArrayFieldTemplateNoSeperator"
import { t, v, v_em } from '../../../../Components/Translation'
import FormUpload from '../../../../Components/FormControls/FormUpload'
import { SubscriptionTypes } from '../../../../Redux/SubscriptionRedux'
import FormSelectSearch from '../../../../Components/FormControls/FormSelectSearch'

class GridCustomer extends Component {


    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            alertSetting: {
                show: false,
                type: 3,
                content: "",
                ErrorSubcode: 0
            },
            formData: {
                DriverDetail: {
                    basicData: {

                    }
                }
            },
            formDataSubmit: {},
            showFormPopup: false,
            SignatureName: "",
            SignatureName_value: "",
            SignaturesList: [],
            subscriptionID: "",
            subscriberID: "",
            canAdd: true,
            statusSubmit: {
                submitSuccess: false,
                status: true,
                ErrorSubcode: ""
            }

        }

    }

    shouldComponentUpdate(prevState, nextState) {

        let { customerCodeSuggestion } = this.state
        if (prevState.customerCodeSuggestion !== customerCodeSuggestion) {

            // render
            return false

        } else {

            // don't  render
            return true
        }

    }


    setHeaderSection(title, showLine = true) {
        return <div>
            {showLine && <div className="hr-line-dashed" />}
            <h3>{title}</h3>
            <div style={{ minHeight: '2rem' }}></div>
        </div>
    }


    render() {
        let { header, dataLogin, formAction } = this.props
        let { customerCodeSuggestion, Suggestion, CustomerNav } = this.state
        return (
            <div>



                {this.setHeaderSection(t("subscription_69"))}
                < div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>


                    {(isVerifyCust === true && (lstUserLavel.includes(dataLogin.userLevelId)) && formAction.action === "Edit" && CustomerCode === "") &&
                        <Row>
                            <Col mb="12" style={{ textAlign: "right", marginBottom: 0, paddingRight: 18 }}>
                                <div className="form-inline form-group">
                                    <FormInput
                                        schema={schema}
                                        placeholder={"subscription_68"}
                                        label={""}
                                        value={customerCodeSuggestion}
                                        onChange={(e) => {

                                            this.setState({ customerCodeSuggestion: e.target.value })

                                        }}
                                    />{' '}
                                    <Button className="btn btn-primary btn-sm" type="button" style={{ marginTop: 5 }} onClick={() => this.searchCus()}><i class="fa fa-search" style={{ marginRight: 5 }}></i>{t('search')}</Button>{' '}
                                    {/* <Button className="btn btn-primary btn-sm" type="button" style={{ marginTop: 5 }} onClick={() => this.getCreateCusF()}><i className="fa fa-plus" style={{ marginRight: 5 }}></i>{t('subscription_70')}</Button> */}
                                </div>
                            </Col>
                        </Row>
                    }


                    <Table

                        mode={"api"}
                        serversideSource={Suggestion != "" ? ENDPOINT_BASE_URL + 'Subscription/GridView/CustomerDTM?CustomerCode=' + Suggestion : ENDPOINT_BASE_URL + 'Subscription/GridView/CustomerDTM?CustID=' + CustomerNav}
                        author={header.idToken}
                        xAPIKey={header.redisKey}
                        table_id={14}
                        // settingTemplate={false}
                        // showSetting={true}
                        searchPanel={false}
                        user_id={this.props.dataLogin.userId}
                        editing={{
                            enabled: true,
                            allowUpdating: false,
                            allowDeleting: false
                        }}
                        // selectedCallback={}
                        initialCallback={this.tableInitial}
                        // deleteCallback={(e) => this.deleteCallback(e)}
                        // editCallback={(e) => this.MapCustomer(e)}
                        autoExpandAll={false}
                        remoteOperations={false}
                        customButton={[
                            {
                                hint: "Matching",
                                icon: "copy",
                                visible: true,
                                onClick: (e) => {
                                    // do something ...
                                    // this.MapCustomer(e)
                                }
                            },

                        ]}

                        column={[
                            {
                                column_name: 'code',
                                column_caption: "subscription_74",
                            },
                            {
                                column_name: 'fullName',
                                column_caption: "customer_67",
                            },
                            {
                                column_name: 'contactPhone',
                                column_caption: "customer_68",
                            },
                            {
                                column_name: 'taxNo',
                                column_caption: "customer_81",
                            },
                        ]}
                    >
                    </Table>


                </div>

            </div>
        )
    }



}

const mapStateToProps = (state) => ({
    dataLogin: state.signin.dataLogin,
    header: state.signin.header,

    // infoDDSignatures: state.subscription.infoDDSignatures,
    statusSubmit: state.subscription.statusSubmit,
});

const mapDispatchToProps = (dispatch) => ({
    // getSubGuid: (id) => dispatch(SubscriptionActions.getSubGuid(id)),

});

export default connect(mapStateToProps, mapDispatchToProps)(GridCustomer)