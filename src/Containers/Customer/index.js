import React, { Suspense, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import CustomerActions from '../../Redux/CustomerRedux'
import { Row, Col } from 'reactstrap'
import PannelBox from '../../Components/PannelBox'
import Table from '../../Components/DataGridView/TableVehicles'
import FormSelectGroup from '../../Components/FormControls/FormSelectGroup'
import FormInput from '../../Components/FormControls/FormInput'
import SaveButton from '../../Components/SaveButton'
import { t, Alert, FormLoading } from '../../Components'
import { ENDPOINT_BASE_URL_YNM, ENDPOINT_BASE_URL } from '../../Config/app-config';
import { BoxContrainer, Button } from "../../components_new";

const Customer = (props) => {
  const [loading, setLoading] = useState(false)
  const [sellerList, setSellerList] = useState([])
  const [customerName, setCustomerName] = useState("")
  const [sellerNav, setSellerNav] = useState("")
  const [param, setParam] = useState("")
  const [alertSetting, setAlertSetting] = useState({
    show: false,
    type: 4,
    content: "",
    messageList: [],
    ErrorSubcode: 0,
    validateCode: false,
    title: ""
  })

  useEffect(() => {
    props.setIdSelectCustomer(null, '')
    getSeller()
  }, [])

  const getSeller = async () => {
    try {
      var response = await fetch(`${ENDPOINT_BASE_URL}ServiceContract/Yanmar/DropdownGroup?name=Seller`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': props.header.redisKey,
          'Accept-Language': props.language == 'ja' ? 'jp' : props.language
        }
      });

      var data = await response.json();
      let list = data.map(e => ({
        groupName: e.groupName,
        items: e.items,
        key: e.key, value: e.value
      }))
      setSellerList(list)
    } catch (error) {
      setSellerList([])
    }
  }

  const deleteCustomer = async (id) => {
    try {
      setLoading(true)
      var response = await fetch(`${ENDPOINT_BASE_URL}ServiceContract/Yanmar/Customer/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': props.header.redisKey,
        }
      });

      if (response.status === 204) {
        setAlert(true, 1, "ลบข้อมูลสำเร็จ")
        setLoading(false)
      }
    } catch (error) {
      setAlert(true, 2, error)
      setLoading(false)
    }
  }

  const deleteData = (id) => { }
  const checkVisible = (e) => {
    let visible = true
    if (e.row.data.editable == true) visible = false
    return visible
  }

  const setAlert = (show = false, type = 4, content = "", messageList = [], title = "") => {
    let alert = { ...alertSetting }
    alert.show = show
    alert.type = type
    alert.content = content
    alert.messageList = messageList
    alert.title = title
    setAlertSetting(alert)
  }
  return <Suspense fallback={null}>
    <Alert
      setting={alertSetting}
      onConfirm={() => {
        if (alertSetting.type === 1) setAlert(false)
      }}
      onCancel={() => setAlert(false)}
    />

    <BoxContrainer>
      <div className="flex flex-row space-x-3">
        <div className="flex-1">
          <FormSelectGroup
            mode={'single'}
            schema={""}
            value={sellerNav}
            list={sellerList}
            label={"dealer"}
            placeholder={"dealer"}
            fieldForm={"dealer"}
            flex={1}
            onChange={(value) => setSellerNav(value !== undefined ? value : "")}
          >
          </FormSelectGroup>
        </div>

        <div className="flex-1">
          <FormInput
            schema={""}
            value={customerName}
            label={"customer_80"}
            fieldForm={"customerName"}
            placeholder={"customer_80"}
            flex={1}
            onChange={(e) => setCustomerName(e.target.value)}>
          </FormInput>
        </div>

        <div className="text-end">
          <Button
            isSearchButton={true}
            margin={"26px 0px 0px 0px"}
            onClick={() => {
              let lst = [], param = ""
              if (sellerNav !== "") lst.push('SellerId=' + sellerNav)
              if (customerName !== "") lst.push('Buyer=' + customerName)
              if (lst.join('&') !== '') param += ('?' + lst.join('&'))
              setParam(param)
            }} />
        </div>
      </div>
    </BoxContrainer>

    <BoxContrainer
      title="side_menu_34"
      toolbarRight={<>
        <Button
          size="small"
          isAddButton={true}
          onClick={() => {
            props.setIdSelectCustomer(null, 'add')
            props.history.push("customer/customerForm")
          }}
        />
      </>}
    >
      <div style={{ height: `calc(100vh - 361px)` }}>
        <FormLoading loading={loading}>
          <Table
            mode={"api"}
            serversideSource={`${ENDPOINT_BASE_URL}ServiceContract/Yanmar/Customer?RequireTotalCount=true${param}`}
            xAPIKey={props.header.redisKey}
            deleteCallback={(e) => deleteCustomer(e.key)}
            editCallback={(e) => {
              props.setIdSelectCustomer(e.key, 'edit')
              props.history.push("customer/customerForm")
            }}
            height={`calc(100vh - 350px)`}
            editing={{
              enabled: true,
              allowUpdating: true,
              allowDeleting: true
            }}
            column={[
              {
                column_name: "seller",
                column_caption: "Seller",
              },
              {
                column_name: "buyer",
                column_caption: "Buyer",
              },
              {
                column_name: "businessType",
                column_caption: "Business Type",
              },
              {
                column_name: "status",
                column_caption: "Status",
              },
              {
                column_name: "taxNo",
                column_caption: "Tax No.",
              },
              {
                column_name: "phoneNo",
                column_caption: "Phone No",
              },
              {
                column_name: "lineId",
                column_caption: "Lind ID",
              },
              // {
              //   column_name: "email",
              //   column_caption: "Email",
              // }
            ]}
            customButton={[
              {
                hint: "View",
                icon: "search",
                visible: checkVisible,
                onClick: (e) => { console.log("EDIT : ", e) }
              }
            ]
            }
            allowDeleting={{
              column_name: "deletable",
              icon: "trash",
              condition: true,
              onClick: (e) => deleteData(e)
            }}
            allowUpdating={{
              column_name: "editable",
              icon: '',
              condition: true
            }}
          >
          </Table>
        </FormLoading>
      </div>
    </BoxContrainer>
  </Suspense>
}
const mapStateToProps = (state) => ({
  header: state.signin.header,
  language: state.versatile.language
})

const mapDispatchToProps = (dispatch) => ({
  setIdSelectCustomer: (id, action) => dispatch(CustomerActions.setIdSelectCustomer(id, action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Customer)
