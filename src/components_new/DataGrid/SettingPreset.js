import React, { useState } from "react";
import { Select, Row, Modal } from 'antd';
import { Button } from '../../components_new'
import FormInput from '../../Components/FormControls/FormInput'
import { t } from '../../helpers/Translation'
import Alert from '../../Components/Alert'
import { ENDPOINT_SETTING_BASE_URL } from '../../Config/app-config';


const SettingPreset = (props) => {
  let {
    settingLists,
    settingSelected,
    userId,
    refDataGrid,
    tableId
  } = props
  const [show, setShow] = useState(false)
  const [settingName, setSettingName] = useState("")
  const [settingAlert, setSettingAlert] = useState({
    show: false,
    type: 3,
    content: "",
  })

  const openModal = () => {
    if (show) setSettingName("")
    setShow(!show)
  }

  const setAlertSetting = (isShow, type, content = "", validateCode = false) => {
    let setting = {}
    setting.show = isShow
    setting.type = type
    setting.content = content
    setting.validateCode = validateCode
    setSettingAlert(setting)
  }

  const deleteProfileSetting = async () => {
    var array_value = settingSelected.split("|");
    var object = {
      table_id: parseInt(array_value[0]),
      user_id: parseInt(userId),
      profile_name: array_value[2]
    }

    try {

      var response = await fetch(ENDPOINT_SETTING_BASE_URL + 'fleet/setting/delete/setting', {
        method: 'POST',
        headers: {
          "Accept": "text/html",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
      });
      var responseJson = await response.json();
      if (responseJson.result == true) {
        setAlertSetting(true, 1, 'grid_15')
        props.onReload(false)
        return;
      }
      setAlertSetting(true, 2, 'grid_16')
      return;
    } catch {

    }
  }

  const saveProfileSetting = async () => {
    openModal()
    var object = {
      table_id: parseInt(tableId),
      user_id: parseInt(userId),
      table_config: JSON.stringify(refDataGrid.instance.state()),
      profile_name: settingName
    }
    try {
      var response = await fetch(ENDPOINT_SETTING_BASE_URL + 'fleet/setting/save/setting', {
        method: 'POST',
        headers: {
          "Accept": "text/html",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(object) // body data type must match "Content-Type" header
      });
      var responseJson = await response.json();
      if (responseJson.result == true) {
        setAlertSetting(true, 1, 'grid_12', '', false)
        props.onReload(true)
        return;
      }
      setAlertSetting(true, 2, 'grid_13', '', false)

    } catch { }
  }

  return (
    <>
      <Alert
        setting={settingAlert}
        onConfirm={() => {
          console.log("alertSetting : ", settingAlert)
          if (settingAlert.type === 3) {
            deleteProfileSetting()
          }
          else {
            setAlertSetting(false)
          }
        }}
        onCancel={() => {
          setAlertSetting(false, 3)
        }}
      />

      <Row>
        <Select
          mode={"single"}
          style={{ width: 220, margin: '3px 3px' }}
          value={settingSelected}
          onChange={(value) => props.onSettingChange(value)}
        >
          {
            settingLists.map((item, index) => {
              return (<option key={index} value={item.value}>{item.text}</option>)
            })}
        </Select>

        <Button
          text="dg_add_setting"
          backgroundColor="#1c84c6"
          borderColor="#1c84c6"
          color="#FFF"
          onClick={() => {
            openModal()
          }} />

        <Button
          text="dg_delete_setting"
          isDangerButton={true}
          onClick={() => {
            var array_value = settingSelected.split("|");
            if (array_value[3] == 1) { // Check is default present
              setAlertSetting(true, 2, 'grid_14')
            }
            else {
              setAlertSetting(true, 3, "delete")
            }
          }} />
      </Row>

      <Modal
        title={t("dg_add_setting")}
        visible={show}
        onCancel={openModal}
        footer={[
          <Button
            isSaveButton={true}
            disabled={settingName === "" ? true : false}
            onClick={() => saveProfileSetting()} />
        ]}
      >
        <FormInput
          schema={""}
          value={settingName}
          label="grid_10"
          fieldForm={"grid_10"}
          placeholder={"grid_10"}
          flex={1}
          onChange={(e) => setSettingName(e.target.value)}
        />
      </Modal>
    </>
  )
}

export default SettingPreset