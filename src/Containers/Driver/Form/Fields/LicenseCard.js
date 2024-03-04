import React, { Component } from 'react'
import { connect } from 'react-redux'
import DataGrid, { Column, Paging, Editing, Lookup } from 'devextreme-react/data-grid';
// import '../Form/styles.css'
import { get } from 'lodash'
import UserActions from '../../../../Redux/UserRedux'
import Table from './Table'
import { Modal } from 'antd';
import FormSelectSearch from '../../../../Components/FormControls/FormSelectSearch'
import { t } from '../../../../Components/Translation'

class LicenseCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lstDropdownGroup: [],
            dataGroup: [],
            showFormPopup: false,
            groupId: [],
            canAdd: false,
            dupData: false
        }
        this.openModal = this.openModal.bind(this)
        this.onRowInserting = this.onRowInserting.bind(this)
    }

    componentWillMount() {
        // this.props.getUserCreateAndUpdate('OwnerGroup', '', '')
    }

    componentDidUpdate(prevProps, prevState) {
        //  let { lstOwnerGroup } = this.props
        //  if (prevProps.lstOwnerGroup !== lstOwnerGroup) {
        //      this.setState({ lstDropdownGroup: lstOwnerGroup })
        //  }
        //
        //  if (prevState.groupId !== this.state.groupId) {
        //      this.validateSave()
        //  }
    }

    openModal() {
        this.setState(state => ({ showFormPopup: !state.showFormPopup, groupId: [], dupData: false }))
    }

    getGroupName() {
        let { lstDropdownGroup, groupId } = this.state
        let obj = lstDropdownGroup.find(x => x.key === parseInt(groupId));
        return obj.value
    }


    checkDuplicateData() {
        let index = this.props.data.findIndex(x => x.groupNav.key === parseInt(this.state.groupId))
        if (index > -1) {
            this.setState({ dupData: true })
            return true
        }
        else {
            return false
        }
    }

    onRowInserting() {
        if (!this.checkDuplicateData()) {
            this.props.onChange("INSERT", {
                "id": "INSERT_" + Math.floor(Math.random() * 1000),
                "action": "INSERT",
                "groupNav": {
                    "key": parseInt(this.state.groupId),
                    "value": this.getGroupName()
                }
            })
            this.openModal()
            this.setState({ dupData: false })
        }
    }

    onRowRemoving(e) {
        this.props.onChange("DELETE", {
            "id": e.data.id,
            "action": "DELETE",
            "groupNav": {
                "key": e.data.groupNav.key
            }
        })
    }

    validateSave() {
        let { groupId } = this.state
        groupId.length > 0 ? this.setState({ canAdd: true }) : this.setState({ canAdd: false })
    }

    render() {
        let { data } = this.props
        let { lstDropdownGroup, canAdd, dupData, showFormPopup, groupId } = this.state

        // data = [
        //     {
        //         "action": "GET",
        //         "id": 34799,
        //         "cardExpiredDate": "2022-04-19T00:00:00Z",
        //         "dltCardTypeNav": {
        //             "key": "24",
        //             "value": "ผู้ขับรถทุกประเภทชนิดที่ 4"
        //         },
        //         "cardId": "0034962",
        //         "dltProvinceNav": {
        //             "key": "102",
        //             "value": "ลพบุรี"
        //         },
        //         "isLifetime": false
        //     }
        // ]

        return <div>
            <Table
                btnForm={false}
                btnFormClick={() => this.openModal()}
                btnPermissionClick={() => this.openModal()}
                onRowRemoving={(e) => this.onRowRemoving(e)}
                dataSource={data}
                column={[
                    {
                        column_name: 'dltCardTypeNav.value',
                        column_caption: "driver_114",
                    },
                    {
                        column_name: 'cardId',
                        column_caption: "driver_115",
                    },
                    {
                        column_name: 'dltProvinceNav.value',
                        column_caption: "driver_116",
                    },
                    {
                        column_name: 'cardExpiredDate',
                        column_caption: "driver_117",
                    },
                    {
                        column_name: 'isLifetime',
                        column_caption: "driver_118",
                    }
                ]}
            >
            </Table>
            {/*
            <Modal
                title="Add Group User"
                visible={showFormPopup}
                okText={t("add")}
                cancelText={t("cancel")}
                onOk={this.onRowInserting}
                okButtonProps={{ disabled: !canAdd }}
                onCancel={this.openModal}
            >
                <FormSelectSearch
                    mode={"single"}
                    schema={{ "required": ["Group"] }}
                    fieldForm="Group"
                    value={groupId}
                    label={"Group"}
                    list={lstDropdownGroup}
                    placeholder={"ph_owner_partner_type"}
                    flex={1}
                    onChange={(selected) => {
                        this.setState({ groupId: selected })
                    }}
                />

                {dupData && <div className="form-group field field-string" style={{ padding: '0 10px', marginBottom: -10, flex: 1, textAlign: 'center' }}>
                    <span className="text-danger">ไม่สามารถเพิ่มข้อมูล เนื่องจากรายการนี้มีอยู่แล้ว</span>
                </div>}
            </Modal> */}
        </div>
    }
}

const mapStateToProps = (state) => ({
    //   userData: state.user.userData,
    //   lstOwnerGroup: state.user.lstOwnerGroup,
});

const mapDispatchToProps = (dispatch) => ({
    //   getDropdownTable: (name, id) => dispatch(UserActions.getDropdownTable(name, id)),
    //   getUserCreateAndUpdate: (name, id, query) => dispatch(UserActions.getUserCreateAndUpdate(name, id, query)),

});


export default connect(mapStateToProps, mapDispatchToProps)(LicenseCard)
