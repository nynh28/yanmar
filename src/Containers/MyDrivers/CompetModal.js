import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import MyDriverActions from '../../Redux/MyDriversRedux'
import { Modal } from 'antd';
import { t } from '../../Components/Translation'
import { get } from 'lodash'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import { Select } from 'antd';

const { Option } = Select;

class CompetModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: "",
            vehicles: [],
            selectVehicle: ""
        }
    }


    shouldComponentUpdate(nextProps) {
        if (nextProps.ShowPopCompet !== this.props.ShowPopCompet) {
            nextProps.ShowPopCompet.id !== null && this.getVehicleDriver(nextProps.ShowPopCompet.id)
        }
        return true
    }


    async getVehicleDriver(id, ts = "") {
        try {
            let response = await fetch(ENDPOINT_BASE_URL + "fleet/dropdown?user_id=" + this.props.dataLogin.userId
                + "&options=VEHICLE-DRIVER&driver_profile_id=" + id + "&ts=" + ts, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Accept-Language': this.props.language,
                }
            })

            var data = await response.json();
            if (data?.code == 200 && data.result.length > 0) {
                this.setState({ vehicles: data.result })
            }
        } catch (error) {
            this.setState({ vehicles: [] })
        }
    }

    closeModal() {
        this.props.setValue("ShowPopCompet", { id: null, show: false })
    }

    render() {
        let { ShowPopCompet } = this.props
        let { selectVehicle } = this.state

        return (
            <Suspense fallback={null}>
                <Modal
                    title={t("my_drivers_50")}
                    visible={ShowPopCompet.show}
                    okText={t("submit")}
                    cancelText={t("cancel")}
                    okButtonProps={{ disabled: selectVehicle == "" ? true : false }}
                    onOk={() => {
                        this.props.onSubmit(ShowPopCompet.id, selectVehicle)
                        this.closeModal()
                    }}
                    onCancel={() => {
                        this.closeModal()
                        this.props.onCancle(ShowPopCompet.id)
                    }}
                >
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder={t('other_reports_60')}
                        optionFilterProp="children"
                        onChange={(value) => this.setState({ selectVehicle: value })}
                        onSearch={(value) => {
                            if (value.length >= 3) this.getVehicleDriver(ShowPopCompet.id, value)
                        }}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            this.state.vehicles.map((dt) => {
                                return <Option key={dt.id} value={dt.id}>{dt.license + ", " + dt.vin_no}</Option>
                            })
                        }
                    </Select>
                </Modal>

            </Suspense >
        )
    }
}

const mapStateToProps = (state) => ({
    dataLogin: state.signin.dataLogin,
    language: state.versatile.language,
    ShowPopCompet: state.myDrivers.ShowPopCompet,
    messageData: state.myDrivers.messageData
});

const mapDispatchToProps = (dispatch) => ({
    setValue: (name, value) => dispatch(MyDriverActions.setValue(name, value)),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompetModal))