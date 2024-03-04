import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import { Modal } from 'antd';
import Table from '../../Components/DataGridView/Table.js'
import { t } from '../../Components/Translation'

class GridSubscriberAllowcate extends Component {


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
            param: "",
            statusSubmit: {
                submitSuccess: false,
                status: true,
                ErrorSubcode: ""
            }

        }

    }

    // shouldComponentUpdate(prevState, nextState) {

    // let { customerCodeSuggestion } = this.state
    // if (prevState.customerCodeSuggestion !== customerCodeSuggestion) {

    //     // render
    //     return false

    // } else {

    //     // don't  render
    //     return true
    // }

    // }


    setHeaderSection(title, showLine = true) {
        return <div>
            {showLine && <div className="hr-line-dashed" />}
            <h3>{title}</h3>
            <div style={{ minHeight: '2rem' }}></div>
        </div>
    }


    editCallback = (e) => {


        let str = ''

        if (e.selectedRowKeys.length > 0) str = '?NewSubscriberIds=' + e.selectedRowKeys.join('&NewSubscriberIds=')
        this.setState({ param: str })
        console.log('str', str)

    }

    openModal = (e) => {


        this.setState(state => ({

            showFormPopup: !state.showFormPopup,

        }))


    }

    componentDidUpdate(prevState, prevProps, nextState) {

        let { showFormPopup } = this.props
        if (prevProps.showFormPopup !== showFormPopup) {

            this.setState(state => ({

                showFormPopup: !state.showFormPopup,

            }))

        }

    }




    render() {
        let { header, dataLogin, formAction, DealerNav } = this.props
        let { canAdd, param, showFormPopup } = this.state
        // console.log("param:", param)
        return (
            <div>
                <Modal
                    title={t("subscription_63")}
                    width={1000}
                    visible={showFormPopup}
                    okText={t("add")}
                    cancelText={t("cancel")}
                    // onOk={this.onRowInserting}
                    okButtonProps={{ disabled: canAdd }}
                    onCancel={this.openModal}
                // footer={''}
                >

                    <Table
                        mode={"api"}
                        showSetting={false}
                        serversideSource={ENDPOINT_BASE_URL + 'Subscription/V2/GridView/Dealer/' + DealerNav + '/SubscriberAllowcate' + param}
                        author={header.idToken}
                        xAPIKey={header.redisKey}
                        table_id={8}
                        user_id={this.props.dataLogin.userId}
                        editing={{
                            enabled: true,
                            allowUpdating: false,
                            allowDeleting: false
                        }}
                        key={"id"}
                        selectedCallback={(e) => {
                            this.editCallback(e)
                            this.props.callModel(e.selectedRowKeys)


                        }}
                        // initialCallback={this.tableInitial}
                        // editCallback={(e) => this.editCallback(e)}
                        autoExpandAll={false}
                        remoteOperations={false}
                        columnCount="subscriberNo"

                        column={[
                            // {
                            //     column_name: 'id',
                            //     column_caption: "id",
                            // },
                            // {
                            //     column_name: 'subscriptionID',
                            //     column_caption: "subscriptionID",
                            // },

                            {
                                column_name: 'subscriberNo',
                                column_caption: "subscriberNo",
                            },
                            {
                                column_name: 'vehicleID',
                                column_caption: "vehicleID",
                            },
                            {
                                column_name: 'vehicleBrand',
                                column_caption: "vehicleBrand",
                            },
                            {
                                column_name: 'chassisNo',
                                column_caption: "chassisNo",
                            },
                            {
                                column_name: 'licensePlate',
                                column_caption: "licensePlate",
                            },
                            {
                                column_name: 'gpsModel',
                                column_caption: "gpsModel",
                            },
                            {
                                column_name: 'midNo',
                                column_caption: "mid",
                            },
                            {
                                column_name: 'imei',
                                column_caption: "imei",
                            },
                            {
                                column_name: 'simNo',
                                column_caption: "sim",
                            },
                            {
                                column_name: 'simVendor',
                                column_caption: "simVendor",
                            }
                        ]}
                    >
                    </Table>
                </Modal>


            </div >
        )
    }



}

const mapStateToProps = (state) => ({
    dataLogin: state.signin.dataLogin,
    header: state.signin.header,
    formAction: state.subscription.formAction,
    // infoDDSignatures: state.subscription.infoDDSignatures,
    statusSubmit: state.subscription.statusSubmit,
});

const mapDispatchToProps = (dispatch) => ({
    // getSubGuid: (id) => dispatch(SubscriptionActions.getSubGuid(id)),

});

export default connect(mapStateToProps, mapDispatchToProps)(GridSubscriberAllowcate)