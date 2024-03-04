
import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import DataGridView from '../../Components/DataGridView'
import Data from "./Form/Fields/Data"
import LicenseData from "./Form/Fields/LicenseData"
import { ArrayFieldTemplateNoSeperator } from "../.../../../Components/FormComponent/ArrayFieldTemplateNoSeperator"
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

class ModelInstall extends Component {

    constructor(props) {
        super(props)
        this.state = {

            alertSetting: {
                show: false,
                type: 3,
                content: "",
                ErrorSubcode: 0
            },
            formDataSubmit: {},
            formData: {
                DriverDetail: {
                    basicData: {


                    },
                }
            },


            statusSubmit: {
                submitSuccess: false,
                status: true,
                ErrorSubcode: ""
            }

        }

    }


    componentWillMount() {





    }



    componentDidUpdate(prevProps, nextState) {



    }




    componentWillUnmount() {
        // this.props.setSubGuidSuccess(11)
        console.log("ออกจากหน้า")
    }













    render() {
        let { header } = this.props


        let dataSource
        dataSource = DataGridView.connect.dataSource('/v1.0.1/grid-view/vehicles', 'id', header)



        let {

        } = this.state
        const log = (type) => console.log.bind(console, type);
        let { statusSubmit, infoGuid, dataLogin } = this.props


        return (
            <Suspense fallback={null}>
                <h1>xxxxxxxxxxxxxxxx</h1>
            </Suspense >
        )
    }
}


const mapStateToProps = (state) => ({

    dataLogin: state.signin.dataLogin,
    header: state.signin.header,
    CustomerData: state.dropdown.CustomerData,
    infoDropdown: state.subscription.infoDropdown,





});

const mapDispatchToProps = (dispatch) => ({


});

export default connect(mapStateToProps, mapDispatchToProps)(ModelInstall)


// return [data.Title, data.FirstName, data.LastName].join(' ');