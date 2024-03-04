/* eslint-disable default-case */
/* eslint-disable no-duplicate-case */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Information from "./Components/GeofenceForm/Infomation";

import PannelBox from "../../Components/PannelBox";
import Alert from "../../Components/Alert";
import { t } from "../../Components/Translation";
import GeofenceActions from "../../Redux/GeofenceRedux";
import { get } from "lodash";

const GeofenceForm = (props) => {
  const dispatch = useDispatch()

  const addGeofence = (geofence) => dispatch(GeofenceActions.addGeofence(geofence))
  const editGeofence = (geofence) => dispatch(GeofenceActions.editGeofence(geofence))
  const submitStatus = (status, ErrorSubcode, show) => dispatch(GeofenceActions.submitStatus(status, ErrorSubcode, show))

  const getGeofence = (id) => dispatch(GeofenceActions.getGeofence(id))
  const getDropdownPartnerName = () => dispatch(GeofenceActions.getDropdownPartnerName())
  const getDropdownGeofenceType = (id) => dispatch(GeofenceActions.getDropdownGeofenceType(id))
  const getPresentIcon = () => dispatch(GeofenceActions.getPresentIcon())
  const getIconByGeofenceType = (id) => dispatch(GeofenceActions.getIconByGeofenceType(id))

  const { language } = useSelector(state => state.versatile);
  const { profileUser } = useSelector(state => state.signin)
  const { typeForm, idSelected, geofence, statusSubmit, loading } = useSelector(state => state.geofence)

  const [type, setType] = useState(null);
  const [formData, setFormData] = useState(null);
  const [coordinate, setCoordinate] = useState(null);
  const [alert, setAlert] = useState({
    confirm: null,
    show: false,
    type: 3,
    content: "",
    ErrorSubcode: 0,
    validateCode: true
  })

  const onAlert = (isShow, type, content = "", ErrorSubcode, validateCode) => {
    alert.show = isShow;
    alert.type = type;
    alert.content = content;
    alert.ErrorSubcode = ErrorSubcode;
    alert.validateCode = validateCode
    setAlert(prevState => {
      return { ...prevState }
    })
  }

  const onSubmit = (formData, coordinate) => {
    console.log('onSubmit')
    if (formData.GeofenceDetail.geofenceData.geofenceTypeNav) {
      if (type == 'Add') {
        onAlert(true, 3, "geofence_10")
        setFormData(formData.GeofenceDetail.geofenceData)
        setCoordinate(coordinate)
      }
      else if (type == 'Edit') {
        onAlert(true, 3, "geofence_35")
        setFormData(formData.GeofenceDetail.geofenceData)
        setCoordinate(coordinate)
      }
    }
    else {
      let msg = language == 'th' ? 'โปรดเลือกประเภทจีโอเฟนช์' : 'Please select Group Type'
      onAlert(true, 2, msg, 400, false)
      window.scrollTo(0, 200)
    }
  }

  const submitConfirm = () => {
    if (type === "Edit") {
      let data = mappingFieldsUpdate(formData);
      editGeofence(data);
      onAlert(true, 6)
    }
    else {
      let data = mappingFieldsInsert(formData);
      addGeofence(data);
      onAlert(true, 6)
    }
  }

  const mappingFieldsUpdate = (formData) => {
    let dt = formData;
    if (dt.iconSource == 1) {
      let data = [
        {
          partnerTypeNav: {
            key: parseInt(profileUser.intPartnerType),
          },
          partnerNav: {
            key: parseInt(dt.partnerName),
          },
          name: dt.name,
          description: dt.description,
          nameEn: dt.nameEn,
          descriptionEn: dt.descriptionEn,
          nameJa: dt.nameJa,
          descriptionJa: dt.descriptionJa,
          geofenceTypeNav: {
            key: parseInt(dt.geofenceTypeNav),
          },
          isHazard: dt.isHazard,
          isShare: dt.isShare,
          isActive: dt.isActive,
          geomTypeNav: {
            key: parseInt(dt.geomTypeNav),
          },
          coordinates: coordinate,
          // coordinates: dt.geomTypeNav == 1 ? center : dt.geomTypeNav == 2
          //   ? polyline : dt.geomTypeNav == 3 && polygon,
          radius: parseInt(dt.radius),
          iconSourceNav: {
            key: dt.iconSource
          },
          iconPoint: dt.iconPoint,

        },
        {
          id: idSelected,
        },
      ];
      return data;
    }
    else if (dt.iconSource == 2 || dt.iconSource == 3) {
      let data = [
        {
          partnerTypeNav: {
            key: parseInt(profileUser.intPartnerType),
          },
          partnerNav: {
            key: parseInt(dt.partnerName),
          },
          name: dt.name,
          description: dt.description,
          nameEn: dt.nameEn,
          descriptionEn: dt.descriptionEn,
          nameJa: dt.nameJa,
          descriptionJa: dt.descriptionJa,
          geofenceTypeNav: {
            key: parseInt(dt.geofenceTypeNav),
          },
          isHazard: dt.isHazard,
          isShare: dt.isShare,
          isActive: dt.isActive,
          geomTypeNav: {
            key: parseInt(dt.geomTypeNav),
          },
          coordinates: coordinate,
          // coordinates: dt.geomTypeNav == 1 ? center : dt.geomTypeNav == 2
          //   ? polyline : dt.geomTypeNav == 3 && polygon,
          radius: parseInt(dt.radius),
          iconSourceNav: {
            key: dt.iconSource
          },
          iconPoint: dt.iconPoint,
          attachCode: dt.iconSource == 1 ? "" : dt.iconSource == 2 ? dt.chooseAttachIcon.attachCode : dt.attachCode,
        },
        {
          id: idSelected,
        },
      ];
      return data;
    }
  }

  const mappingFieldsInsert = (formData) => {
    let dt = formData
    if (dt.iconSource == 1) {
      let data = {
        partnerTypeNav: {
          key: parseInt(profileUser.intPartnerType),
        },
        partnerNav: {
          key: parseInt(dt.partnerName),
        },
        name: dt.name,
        description: dt.description,
        nameEn: dt.nameEn,
        descriptionEn: dt.descriptionEn,
        nameJa: dt.nameJa,
        descriptionJa: dt.descriptionJa,
        geofenceTypeNav: {
          key: parseInt(dt.geofenceTypeNav)
        },
        isHazard: dt.isHazard,
        isShare: dt.isShare,
        isActive: dt.isActive,
        geomTypeNav: {
          key: parseInt(dt.geomTypeNav),
        },
        coordinates: coordinate,
        // coordinates:
        //   dt.geomTypeNav == 1 ? center : dt.geomTypeNav == 2
        //     ? polyline : dt.geomTypeNav == 3 && polygon,
        radius: parseInt(dt.radius),
        iconSourceNav: {
          key: dt.iconSource
        },
      }
      return data;
    }
    else if (dt.iconSource == 2 || dt.iconSource == 3) {
      let data = {
        partnerTypeNav: {
          key: parseInt(profileUser.intPartnerType),
        },
        partnerNav: {
          key: parseInt(dt.partnerName),
        },
        name: dt.name,
        description: dt.description,
        nameEn: dt.nameEn,
        descriptionEn: dt.descriptionEn,
        nameJa: dt.nameJa,
        descriptionJa: dt.descriptionJa,
        geofenceTypeNav: {
          key: parseInt(dt.geofenceTypeNav)
        },
        isHazard: dt.isHazard,
        isShare: dt.isShare,
        isActive: dt.isActive,
        geomTypeNav: {
          key: parseInt(dt.geomTypeNav),
        },
        // coordinates:
        //   dt.geomTypeNav == 1 ? center : dt.geomTypeNav == 2
        //     ? polyline : dt.geomTypeNav == 3 && polygon,
        coordinates: coordinate,
        radius: parseInt(dt.radius),
        iconSourceNav: {
          key: dt.iconSource
        },
        attachCode: dt.iconSource == 1 ? "" : dt.iconSource == 2 ? dt.chooseAttachIcon.attachCode : dt.attachCode,
      }
      return data;
    }
  }

  const onCancel = () => props.history.push("/geofence");

  useEffect(() => {
    console.log(statusSubmit)
    if (statusSubmit.show) {
      alert.show = true
      alert.type = statusSubmit.status ? 1 : 2
      alert.content = statusSubmit.status ? type == 'Add' ? "geofence_33" : type == 'Edit' && "geofence_34" : type + " Geofence Failed"
      alert.ErrorSubcode = statusSubmit.ErrorSubcode
      setAlert(prevState => {
        return { ...prevState }
      })
    }
    // else {
    //   alert.show = false
    //   alert.type = statusSubmit.status ? 1 : 2
    //   alert.content = statusSubmit.status ? type == 'Add' ? "geofence_33" : type == 'Edit' && "geofence_34" : type + " Geofence Failed"
    //   alert.ErrorSubcode = statusSubmit.ErrorSubcode
    //   setAlert(prevState => {
    //     return {...prevState}
    //   })
    // }
  }, [statusSubmit])

  useEffect(() => {
    console.log(idSelected)
    if (idSelected) {
      setType('Edit')
      getGeofence(idSelected)

    } else {
      setType('Add')
    }
    getPresentIcon()
    getDropdownPartnerName()
    getDropdownGeofenceType(profileUser.partnerId)
    getIconByGeofenceType()
  }, [])

  return (
    <div>
      <Alert
        setting={alert}
        onConfirm={() => {
          if (alert.type === 4) {
            alert.show = false
          }
          else if (alert.type === 3) {
            alert.show = false
            submitConfirm(alert.content)
          }
          else if (statusSubmit.status) {
            alert.show = true
            // submitStatus(false)
            submitStatus(true, {}, false)
            onCancel()
          }
          else {
            alert.show = false
          }
          setAlert(prevState => {
            return { ...prevState }
          })
        }}
        onCancel={() => {
          alert.show = false
          setAlert(prevState => {
            return { ...prevState }
          })
        }}
      />

      <PannelBox title={typeForm == 'Add' ? t("geofence_10") : t("geofence_35")}>
        <Information onAlert={onAlert} onSubmit={onSubmit} onCancel={onCancel} location={get(props, 'location.search')} />
      </PannelBox>
    </div>
  )
}

export default GeofenceForm;
