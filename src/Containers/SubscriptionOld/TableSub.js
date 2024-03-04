
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd';
import Table from '../../Components/DataGridView/Table.js'
import SubscriptionActions from '../../Redux/SubscriptionRedux'
import DataGridView from '../../Components/DataGridView'
import { get } from 'lodash'
import Data from "./Form/Fields/Data"
import LicenseData from "./Form/Fields/LicenseData"
import { ArrayFieldTemplateNoSeperator } from "../../Components/FormComponent/ArrayFieldTemplateNoSeperator"
import { t } from '../../Components/Translation'
import FormSelectSearch from '../../Components/FormControls/FormSelectSearch'




const CustomTitleField = () => { return '' }

export const fields = {
    TitleField: CustomTitleField,
    basicData: Data,
    licenseData: LicenseData
}

export const uiSchema = {
    DriverDetail: {
        basicData: {
            "ui:field": "basicData",
        },
    },
    LicenseDetail: {
        licenseData: {
            "ui:ArrayFieldTemplate": ArrayFieldTemplateNoSeperator,
            items: {
                "ui:field": "licenseData",
            }
        }
    }
}

class TableSub extends Component {

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
            id: "",
            subscriberID: "",
            canAdd: true,
            statusSubmit: {
                submitSuccess: false,
                status: true,
                ErrorSubcode: ""
            }

        }

    }



    setAlertSetting(isShow, type, content = "", ErrorSubcode) {
        let { alertSetting } = this.state
        alertSetting.show = isShow
        alertSetting.type = type
        alertSetting.content = content
        alertSetting.ErrorSubcode = ErrorSubcode
        this.setState({ alertSetting })
    }

    componentWillMount() {
        this.props.TableSub()


    }

    componentDidUpdate(prevProps, nextState) {

        let { statusSubmit } = this.props
        let { getProfile, infoProfile, infoItemCerticate } = this.props
        let { basicData } = this.state.formData.DriverDetail


        let { alertSetting } = this.state

        if (prevProps.infoItemCerticate !== infoItemCerticate) {
            this.setAlertSetting(false, 6)
        }


        if (prevProps.statusSubmit !== statusSubmit) {
            alertSetting.show = true
            alertSetting.type = statusSubmit.status ? 1 : 2
            alertSetting.content = statusSubmit.status ? "Success" : "Fail"
            alertSetting.ErrorSubcode = statusSubmit.ErrorSubcode
            this.setState({ alertSetting })
        }

    }
    checkVisible(e) {
        let visible = false
        const lstUserLavel = [1, 2, 11, 12]



        let itemStatusID = get(e, 'row.data.itemStatusID', '')
        if (itemStatusID !== 0 && itemStatusID !== 3) {


            visible = true
        }
        return visible
    }


    shouldComponentUpdate(nextProps, nextState) {


        const { showFormPopup } = this.state

        if (nextState.showFormPopup !== showFormPopup) {

            // return false
        }

        return true

    }

    checkVisiblePrint(e) {
        let visible = false


        let itemStatusID = get(e, 'row.data.itemStatusID', '')

        if (itemStatusID === 5) {


            visible = true
        }
        return visible
    }

    print = (e) => {
        let id = get(e, "row.data.id", "")
        let subscriptionID = get(e, "row.data.subscriptionID", "")


        this.setState({
            id: id,
            subscriptionID: subscriptionID
        })
        let { infoSignatures } = this.props


        this.props.Signatures(subscriptionID)

        this.openModal()
    }


    editCallback(e) {

        let data = get(e, 'row.data')
        let subscriptionID = get(e, 'row.data.subscriptionID')

        // console.log("subscriptionID", subscriptionID)

        this.props.setPersonalIdSelect(data, "Edit")
        // this.props.getProfileSub(subscriptionID)
        this.props.history.push("TableSub/subscription/subscriptionForm")

    }

    openModal = (e) => {
        this.setState(state => ({

            showFormPopup: !state.showFormPopup,

        }))

    }

    onRowInserting = () => {

        let { subscriptionID, SignatureName, id } = this.state

        this.setAlertSetting(true, 6)



        if (SignatureName == '--ตัวแทนจากบริษัทวันลิ้งค์--' || SignatureName == undefined) {
            this.props.ItemCerticate(subscriptionID, id, '')
        } else {
            this.props.ItemCerticate(subscriptionID, id, SignatureName)
        }

        this.openModal()


    }




    render() {
        let { header, infoSignatures, infoTableSub } = this.props

        console.log("infoTableSub:", infoTableSub)

        let dataSource
        dataSource = DataGridView.connect.dataSource('/v1.0.1/Subscription/GridView/Subscription', 'id', header)


        let { alertSetting, showFormPopup, canAdd, SignatureName } = this.state
        const log = (type) => console.log.bind(console, type);
        let { statusSubmit, dataLogin } = this.props
        // console.log("formData :: ", this.state.formData)
        return (

            <div>

                <Table
                    mode={"offline"}
                    // serversideSource={ENDPOINT_BASE_URL + 'Subscription/GridView/SubscriberStatus'}
                    dataSource={[...infoTableSub]}
                    author={header.idToken}
                    xAPIKey={header.redisKey}
                    table_id={4}
                    user_id={dataLogin.userId}
                    editing={{
                        enabled: true,
                        allowUpdating: false,
                        allowDeleting: false
                    }}
                    selectedCallback={this.selectedCallback}
                    // editing={{ enabled: true }}
                    initialCallback={this.tableInitial}
                    // deleteCallback={(e) => this.deleteCallback(e)}
                    // editCallback={(e) => this.editCallback(e)}
                    autoExpandAll={false}
                    remoteOperations={false}
                    key={"id"}
                    columnCount="subscriberNo"
                    customButton={[

                        {
                            hint: "Print",
                            icon: "print",
                            visible: this.checkVisiblePrint,
                            onClick: (e) => {
                                // do something ...
                                this.print(e)
                            }
                        },
                        {
                            hint: "Management",
                            icon: "edit",
                            visible: this.checkVisible,
                            onClick: (e) => {
                                // do something ...
                                this.editCallback(e)
                            }
                        },
                    ]
                    }
                    column={[
                        // {
                        //   column_name: 'id',
                        //   column_caption: "id",
                        // },
                        // {
                        //   column_name: 'itemStatusID',
                        //   column_caption: "itemStatusID",
                        // },
                        // {
                        //   column_name: 'subscriberNo',
                        //   column_caption: "subscription_10",
                        // },
                        {
                            column_name: 'itemStatus',
                            column_caption: "subscription_24",
                        },
                        {
                            column_name: 'dealerFullName',
                            column_caption: "subscription_1",
                        },
                        {
                            column_name: 'customerFullName',
                            column_caption: "subscription_11",
                        },
                        // {
                        //   column_name: 'vehicleID',
                        //   column_caption: "subscription_12",
                        // },
                        {
                            column_name: 'vinNo',
                            column_caption: "subscription_13",
                        },
                        {
                            column_name: 'chassisNo',
                            column_caption: "subscription_16",
                        },
                        {
                            column_name: 'vehicleBrand',
                            column_caption: "subscription_14",
                        },
                        {
                            column_name: 'vehicleModel',
                            column_caption: "subscription_15",
                        },

                        {
                            column_name: 'licensePlate',
                            column_caption: "subscription_17",
                        },
                        {
                            column_name: 'licensePlace',
                            column_caption: "subscription_18",
                        },
                        {
                            column_name: 'midNo',
                            column_caption: "subscription_19",
                        },
                        {
                            column_name: 'imei',
                            column_caption: "subscription_20",
                        },
                        {
                            column_name: 'simNo',
                            column_caption: "subscription_21",
                        },
                        {
                            column_name: 'simVendor',
                            column_caption: "subscription_22",
                        },
                        // {
                        //   column_name: 'subscriptionStatus',
                        //   column_caption: "subscriptionStatus",
                        // },
                        {
                            column_name: 'requireCertificate',
                            column_caption: "subscription_23",
                        },

                        // {
                        //   column_name: 'itemStatusID',
                        //   column_caption: "itemStatusID",
                        // },

                        // {
                        //   column_name: 'isApprove',
                        //   column_caption: "subscription_25",
                        // },
                        // {
                        //   column_name: 'isSendDltComplete',
                        //   column_caption: "subscription_26",
                        // },
                    ]}
                >
                </Table>
                <Modal
                    title={t("subscription_94")}
                    width={1000}
                    visible={showFormPopup}
                    okText={t("print")}
                    cancelText={t("cancel")}
                    onOk={this.onRowInserting}
                    okButtonProps={{ disabled: canAdd }}
                    onCancel={this.openModal}
                // footer={''}
                >
                    <FormSelectSearch
                        mode={"single"}
                        schema={{ "required": ["SignatureName"] }}
                        value={SignatureName}
                        label={"subscription_84"}
                        list={infoSignatures}
                        fieldForm={"SignatureName"}
                        placeholder={"subscription_67"}
                        flex={1}
                        onChange={(selected) => {

                            this.setState({
                                SignatureName: selected,
                                canAdd: false


                            })

                        }}
                    />
                </Modal>

            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    dataLogin: state.signin.dataLogin,
    header: state.signin.header,
    infoSignatures: state.subscription.infoSignatures,
    infoTableSub: state.subscription.infoTableSub,
    infoItemCerticate: state.subscription.infoItemCerticate,
    statusSubmit: state.subscription.statusSubmit,
});

const mapDispatchToProps = (dispatch) => ({
    setPersonalIdSelect: (data, action) => dispatch(SubscriptionActions.setPersonalIdSelect(data, action)),
    getProfileSub: (id) => dispatch(SubscriptionActions.getProfileSub(id)),
    TableSub: () => dispatch(SubscriptionActions.TableSub()),
    Signatures: (id) => dispatch(SubscriptionActions.Signatures(id)),
    ItemCerticate: (id, subscriberId, dealerSignature) => dispatch(SubscriptionActions.ItemCerticate(id, subscriberId, dealerSignature)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableSub)