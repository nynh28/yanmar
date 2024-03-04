import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux'
import { Switch, withRouter } from 'react-router'
import { Route } from 'react-router-dom'
import SigninActions from './Redux/SigninRedux'
import RealtimeActions from './Redux/RealtimeRedux'

import Images from './Containers/Realtime/icons/Images'

//#region Layout
import MainLayout from './Layouts/MainLayout'
import NonpaddingMainLayout from './Layouts/NonpaddingMainLayout'
import NonMainLayout from './Layouts/NonMainLayout'
//#endregion

//#region TestScreen
import TestScreen from './Containers/TestScreen/TestScreen'
import TestScreen2 from './Containers/TestScreen/TestScreen2'
import TestScreen3 from './Containers/TestScreen/TestScreen3'
//#endregion

//#region Singin Screen
import SigninScreen from './Containers/Signin/SigninScreen'
import ForgetPassword from './Containers/ForgetPassword/ForgetPassword'
import ChangePassword from './Containers/ChangePassword/ChangePassword'
import UpdateProfile from './Containers/UpdateProfile/UpdateProfile'
import ForceChange from './Containers/ForceChange/ForceChange'
import PrivacyAndPolicy from './Containers/PrivacyAndPolicy/PrivacyAndPolicy'
//#endregion

//#region HMST View
import HMST_Dashboard from './Containers/HMST_View/Utilization/Utilization'
import HMST_Statistics from './Containers/HMST_View/Utilization/Statistics'
import Monitor_Dashboard from './Containers/DashboardMonitor/Dashboard'
import ControlRoom from './Containers/HMST_View/ControlRoom/ControlRoom/ControlRoom'
import SellingVehicle from './Containers/HMST_View/ControlRoom/SellingVehicle/SellingVehicle'

//#endregion

//#region Top Menu
import HomePage from './Containers/HomePage/HomePage'
import Dashboard from './Containers/Dashboard/Dashboard'
import Realtime from './Containers/Realtime/Realtime'
import DashboardJob from './Containers/DashboardJob/DashboardJob'
import History from './Containers/History/History'
import ReportMyvehicle from './Containers/MyVehicles/MyVehicles';
import Reportmydriver from './Containers/MyDrivers/MyDrivers';
import CargoLink from './Containers/CargoLink/CargoLink';
import RoutePlaning from './Containers/RoutePlaning/RoutePlaning';
import Maintenance from './Containers/Maintenance/Maintenance';
//#endregion

//#region Accessories Menu

//#endregion

//#region Report [DoDoop] Menu
import UserAuthentication from './Containers/Report/UserAuthentication';
import ScatterGraph from './Containers/Report/ScatterGraph';
import Speedhistogram from './Containers/Report/Speedhistogram';
import RPMhistogram from './Containers/Report/RPMhistogram';
import Radarchart from './Containers/Report/Radarchart';
import Throttlehistogram from './Containers/Report/Throttlehistogram';

import ServReport from './Containers/Report/ServReport'
import Reportpromotion from './Containers/Report/Reportpromotion';
import ReportUtilization from './Containers/Report/ReportUtilization';
import ReportVehiclelastengine from './Containers/Report/ReportVehiclelastengine';

import ReportApplicationusage from './Containers/Report/ReportApplicationusage';
import Reportvehicleallocationstockaging from './Containers/Report/Reportvehicleallocationstockaging';
import ReportInput8 from './Containers/Report/ReportInput8';
import Reportvehiclehasenteredandleft from './Containers/Report/Reportvehiclehasenteredandleft';
import Reportinventoryvehiclemovementhistory from './Containers/Report/Reportinventoryvehiclemovementhistory';
import ReportDealerhistory from './Containers/Report/ReportDealerhistory';
import Reportvehiclepartlifetime from './Containers/Report/Reportvehiclepartlifetime';
// import ReportMyvehicle from './Containers/Report/Reportmyvehicle';
import Reportmyvehicletrip from './Containers/Report/Reportmyvehicletrip';
// import Reportmydriver from './Containers/Report/Reportmydriver';
import Reportmydriversummary from './Containers/Report/Reportmydriversummary';
import Reportmydrivertripdetail from './Containers/Report/Reportmydrivertripdetail';
import LayoutReport from './Containers/Report/LayoutReport';
import dashboardreport from './Containers/Report/dashboardreport';
import Reportecotree from './Containers/Report/reportecotree';
import EcoComponentdriver from './Containers/EcoTree/EcoComponentdriver';
import EcoComponentfleet from './Containers/EcoTree/EcoComponentFleet';
import realtimedashboard from './Containers/Report/Realtime Dashboard/realtimedashboard';
import DrivingBehavior from "./Containers/Report/Realtime Dashboard/DrivingBehavior"

import OverSpeedLimitOnelink from "./Containers/Report/Activity/OverSpeedLimitOnelink";
//#endregion

//#region Ranking Menu
import Ranking from './Containers/Report/Ranking/Ranking';
//#endregion

//#region Message & Notification Menu
import Notification from './Containers/Notification/Notification';
// import NotificationDetail from './Containers/Notification/NotificationDetail';
import NotificationDetail from './Containers/Notification/LocationInfo';
//#endregion

//#region Working Menu
import Subscription from './Containers/Subscription/Subscription'
import SubscriptionForm from './Containers/Subscription/SubscriptionForm'
import InstallationReport from './Containers/InstallationReport/InstallationReport'
//#endregion

//#region Download
import OtherReportNew from './Containers/OtherReports/OtherReports';
import ReportSummary from './Containers/OtherReports/ReportSummary';
import ReportDetail from './Containers/OtherReports/ReportDetail';
//#endregion

//#region Management Menu
import RoleManagement from './Containers/RoleSetting/RoleManagement'
import RoleSetting from './Containers//RoleSetting/RoleSetting';
import Users from './Containers/Users/Users'
import UsersForm from './Containers/Users/UsersForm'
import UserSetting from './Containers/UserSetting/UserSetting';
import UserSettingForm from './Containers/UserSetting/UserSettingForm';
import Dealer from './Containers/Dealer/Dealer';
import DealerForm from './Containers/Dealer/DealerForm'
import AddDealerAdmin from './Containers/Dealer/AddDealerAdmin'
import Customer from './Containers/Customer/Customer';
import CustomerForm from './Containers/Customer/CustomerForm';
import AddCustomerAdmin from './Containers/Customer/AddCustomerAdmin'
import Driver from './Containers/Driver/Driver';
import DriverForm from './Containers/Driver/DriverForm';
import DriverFormEdit from './Containers/Driver/DriverFormEdit'
import Fleet from './Containers/Fleet/Fleet';
import FleetForm from './Containers/Fleet/FleetForm';
import Vehicle from './Containers/Vehicle/Vehicle';
import VehicleView from './Containers/Vehicle/VehicleView';
import VehicleForm from './Containers/Vehicle/VehicleForm';
import VehicleAllocation from './Containers/VehicleAllocation/VehicleAllocationNew';
import Geofence from './Containers/Geofence/Geofence';
import GeofenceSharing from './Containers/GeofenceSharing/GeofenceSharing';
import GeofenceForm from './Containers/Geofence/GeofenceForm';
// import GeofenceRoute from './Containers/Geofence/GeofenceRoute';
import GeofenceType from './Containers/GeofenceType/GeofenceType';
import GeofenceTypeForm from './Containers/GeofenceType/GeofenceTypeForm';
import GPSUnit from "./Containers/GPSUnit/GPSUnit";
//#endregion

//#region Setting Menu
import General from './Containers/General/General';
import Promotion from './Containers/Promotion/Promotion';
import PromotionSetting from './Containers/Promotion/PromotionSetting';
import PromotionForm from './Containers/Promotion/PromotionForm';
import DrivingSettings from './Containers/DrivingSettings/DrivingSettings';
import AlertSetting from './Containers/AlertSetting/AlertSetting';
import AlertSettingForm from './Containers/AlertSetting/AlertSettingForm';
//#endregion

//#region Top Menu
import Help from './Containers/Help/Help'
import UserManual from './Containers/Help/UserManual'
import UserManualMobileFleet from './Containers/Help/UserManualMobileFleet'
//#endregion

//#region Unknown Group
import GroupSetting from "./Containers/GroupSetting/GroupSetting";
import ChartComponent from './Containers/Graph/ChartComponent';
import Map from './Containers/Map/Map';
import ImportCSV from './Containers/Vehicle/ImportCSV';
import Job from './Containers/Job/Job';
import JobForm from './Containers/Job/JobForm';
import PlanForm from './Containers/Job/PlanForm';
import FormGenerator from './Containers/FormGenerator/FormGenerator'
import MessageSetting from './Containers/MessageSetting/MessageSetting'
import Message from './Containers/MessageSetting/Message'
import ModelCategory from './Containers/ModelCategory/ModelCategory'
import NewRoleSetting from './Containers/RoleSetting/NewRoleSettings'
import RoleInformationCreate from './Containers/RoleSetting/RoleInformationCreate'
import RoleInformationUpdate from './Containers/RoleSetting/RoleInformationUpdate'
import RoleSettingsPermission from './Containers/RoleSettingPermission/RoleSettingsPermission'
//#endregion
import EmptyPage from './Containers/EmptyPage/EmptyPage';
import HMST_Driving_Competition from './Containers/HMST_Driving_Competition/EmptyPage';
import i18n from './i18n'
import CategoryType from './Containers/MasterData/CategoryType';
import ClassType from './Containers/MasterData/ClassType';
import EngineSeries from './Containers/MasterData/EngineSeries';
import NewDrivingSettings from './Containers/DrivingSettings/NewDrivingSettings';
import { get } from 'lodash'
import InstallingApproval from './Containers/Management/InstallingApproval';
import InstallingApprovalForm from './Containers/Management/InstallingApprovalForm';

class AppRoute extends Component {

  constructor(props) {
    super(props)
    this.state = {
      iconByClassTypeActive: [],
      iconByClassTypeInactived: [],
      iconmarker: false,
    }
  }

  componentDidMount() {
    i18n.changeLanguage(this.props.language)
    if (this.props.iconActive.length === 0
      || this.props.iconActive.length < 42
      || this.props.iconInactived.length === 0
      || this.props.iconInactived.length < 42
    ) this.setIconObjectType()
  }

  componentWillMount() {
    if (this.props.stateSignin) {
      this.props.refresh()
      this.refreshToken()
      // if (this.props.iconActive.length === 0 || this.props.iconInactived.length === 0) this.setIconObjectType()
    }
    // if (this.props.iconActive.length === 0 || this.props.iconInactived.length === 0) this.setIconObjectType()

  }

  componentDidUpdate(prevProps, prevState) {
    let { stateSignin } = this.props

    if (prevProps.stateSignin !== stateSignin) {
      if (stateSignin) {
        this.refreshToken()
        if (this.props.iconActive.length === 0 || this.props.iconInactived.length === 0) this.setIconObjectType()
      } else {
        clearInterval(this.interval)
      }
    }
    if (prevState.iconmarker !== this.state.iconmarker && this.state.iconmarker) {
      this.props.setDefaultIconMarker(this.state.iconByClassTypeActive, this.state.iconByClassTypeInactived)
    }
  }

  refreshToken() {
    this.interval = setInterval(() => {
      this.props.refresh()
    }, 1200000);
  }

  async setIconObjectType() {
    //#region  ICON ACTIVE
    await this.setIconSvg(Images.Green_Actived_1, 1, "Driving", true)
    await this.setIconSvg(Images.Grey_Actived_1, 1, "Offline", true)
    await this.setIconSvg(Images.Red_Actived_1, 1, "Parking", true)
    await this.setIconSvg(Images.Yellow_Actived_1, 1, "Idling", true)
    await this.setIconSvg(Images.Purple_Actived_1, 1, "Overspeed", true)
    await this.setIconSvg(Images.Orange_Actived_1, 1, "OverRPM", true)

    await this.setIconSvg(Images.Green_Actived_2, 2, "Driving", true)
    await this.setIconSvg(Images.Grey_Actived_2, 2, "Offline", true)
    await this.setIconSvg(Images.Red_Actived_2, 2, "Parking", true)
    await this.setIconSvg(Images.Yellow_Actived_2, 2, "Idling", true)
    await this.setIconSvg(Images.Purple_Actived_2, 2, "Overspeed", true)
    await this.setIconSvg(Images.Orange_Actived_2, 2, "OverRPM", true)

    await this.setIconSvg(Images.Green_Actived_3, 3, "Driving", true)
    await this.setIconSvg(Images.Grey_Actived_3, 3, "Offline", true)
    await this.setIconSvg(Images.Red_Actived_3, 3, "Parking", true)
    await this.setIconSvg(Images.Yellow_Actived_3, 3, "Idling", true)
    await this.setIconSvg(Images.Purple_Actived_3, 3, "Overspeed", true)
    await this.setIconSvg(Images.Orange_Actived_3, 3, "OverRPM", true)

    await this.setIconSvg(Images.Green_Actived_4, 4, "Driving", true)
    await this.setIconSvg(Images.Grey_Actived_4, 4, "Offline", true)
    await this.setIconSvg(Images.Red_Actived_4, 4, "Parking", true)
    await this.setIconSvg(Images.Yellow_Actived_4, 4, "Idling", true)
    await this.setIconSvg(Images.Purple_Actived_4, 4, "Overspeed", true)
    await this.setIconSvg(Images.Orange_Actived_4, 4, "OverRPM", true)

    await this.setIconSvg(Images.Green_Actived_5, 5, "Driving", true)
    await this.setIconSvg(Images.Grey_Actived_5, 5, "Offline", true)
    await this.setIconSvg(Images.Red_Actived_5, 5, "Parking", true)
    await this.setIconSvg(Images.Yellow_Actived_5, 5, "Idling", true)
    await this.setIconSvg(Images.Purple_Actived_5, 5, "Overspeed", true)
    await this.setIconSvg(Images.Orange_Actived_5, 5, "OverRPM", true)

    await this.setIconSvg(Images.Green_Actived_6, 6, "Driving", true)
    await this.setIconSvg(Images.Grey_Actived_6, 6, "Offline", true)
    await this.setIconSvg(Images.Red_Actived_6, 6, "Parking", true)
    await this.setIconSvg(Images.Yellow_Actived_6, 6, "Idling", true)
    await this.setIconSvg(Images.Purple_Actived_6, 6, "Overspeed", true)
    await this.setIconSvg(Images.Orange_Actived_6, 6, "OverRPM", true)

    await this.setIconSvg(Images.Green_Actived_0, 0, "Driving", true)
    await this.setIconSvg(Images.Grey_Actived_0, 0, "Offline", true)
    await this.setIconSvg(Images.Red_Actived_0, 0, "Parking", true)
    await this.setIconSvg(Images.Yellow_Actived_0, 0, "Idling", true)
    await this.setIconSvg(Images.Purple_Actived_0, 0, "Overspeed", true)
    await this.setIconSvg(Images.Orange_Actived_0, 0, "OverRPM", true)

    //#endregion

    //#region  ICON ACTIVE
    await this.setIconSvg(Images.Green_1, 1, "Driving", false)
    await this.setIconSvg(Images.Grey_1, 1, "Offline", false)
    await this.setIconSvg(Images.Red_1, 1, "Parking", false)
    await this.setIconSvg(Images.Yellow_1, 1, "Idling", false)
    await this.setIconSvg(Images.Purple_1, 1, "Overspeed", false)
    await this.setIconSvg(Images.Orange_1, 1, "OverRPM", false)

    await this.setIconSvg(Images.Green_2, 2, "Driving", false)
    await this.setIconSvg(Images.Grey_2, 2, "Offline", false)
    await this.setIconSvg(Images.Red_2, 2, "Parking", false)
    await this.setIconSvg(Images.Yellow_2, 2, "Idling", false)
    await this.setIconSvg(Images.Purple_2, 2, "Overspeed", false)
    await this.setIconSvg(Images.Orange_2, 2, "OverRPM", false)

    await this.setIconSvg(Images.Green_3, 3, "Driving", false)
    await this.setIconSvg(Images.Grey_3, 3, "Offline", false)
    await this.setIconSvg(Images.Red_3, 3, "Parking", false)
    await this.setIconSvg(Images.Yellow_3, 3, "Idling", false)
    await this.setIconSvg(Images.Purple_3, 3, "Overspeed", false)
    await this.setIconSvg(Images.Orange_3, 3, "OverRPM", false)

    await this.setIconSvg(Images.Green_4, 4, "Driving", false)
    await this.setIconSvg(Images.Grey_4, 4, "Offline", false)
    await this.setIconSvg(Images.Red_4, 4, "Parking", false)
    await this.setIconSvg(Images.Yellow_4, 4, "Idling", false)
    await this.setIconSvg(Images.Purple_4, 4, "Overspeed", false)
    await this.setIconSvg(Images.Orange_4, 4, "OverRPM", false)

    await this.setIconSvg(Images.Green_5, 5, "Driving", false)
    await this.setIconSvg(Images.Grey_5, 5, "Offline", false)
    await this.setIconSvg(Images.Red_5, 5, "Parking", false)
    await this.setIconSvg(Images.Yellow_5, 5, "Idling", false)
    await this.setIconSvg(Images.Purple_5, 5, "Overspeed", false)
    await this.setIconSvg(Images.Orange_5, 5, "OverRPM", false)

    await this.setIconSvg(Images.Green_6, 6, "Driving", false)
    await this.setIconSvg(Images.Grey_6, 6, "Offline", false)
    await this.setIconSvg(Images.Red_6, 6, "Parking", false)
    await this.setIconSvg(Images.Yellow_6, 6, "Idling", false)
    await this.setIconSvg(Images.Purple_6, 6, "Overspeed", false)
    await this.setIconSvg(Images.Orange_6, 6, "OverRPM", false)

    await this.setIconSvg(Images.Green_0, 0, "Driving", false)
    await this.setIconSvg(Images.Grey_0, 0, "Offline", false)
    await this.setIconSvg(Images.Red_0, 0, "Parking", false)
    await this.setIconSvg(Images.Yellow_0, 0, "Idling", false)
    await this.setIconSvg(Images.Purple_0, 0, "Overspeed", false)
    await this.setIconSvg(Images.Orange_0, 0, "OverRPM", false, true)
    //#endregion

  }

  async setIconSvg(iconByClassType, classType, status, isActive, icon) {
    let { iconByClassTypeActive, iconByClassTypeInactived } = this.state
    await fetch(iconByClassType)
      .then(response => response.text())
      .then(text => {
        let svg_ = text;
        svg_ = svg_
          .replace(/^<\?(.+)\?>$/gm, '') // unsupported unnecessary line
          // You can replace anything you want, but first of all check your svg code
          .replace(/width.+\Wheight\S+/,
            'width="{{width}}" height="{{height}}" transform="{{transform}}"')

        // Load Map

        if (isActive) {
          iconByClassTypeActive.push({ "classType": classType, "status": status, "icon": svg_ })
        } else {
          iconByClassTypeInactived.push({ "classType": classType, "status": status, "icon": svg_ })
        }
        if (icon) {
          this.setState({ iconmarker: true, iconByClassTypeInactived, iconByClassTypeActive })
        }
      })
  }


  render() {
    return (
      <div>
        <Switch>
          {/* TestScreen  */}
          <MainLayout path="/testscreen" component={TestScreen} />
          <MainLayout path="/testscreen2" component={TestScreen2} />
          <MainLayout path="/testscreen3" component={TestScreen3} />

          {/* Singin Screen  */}
          <Route exact path="/" component={SigninScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/forgetPassword" component={ForgetPassword} />
          <Route path="/forceChange" component={ForceChange} />
          <MainLayout path="/changePassword" component={ChangePassword} />
          <MainLayout path="/updateProfile" component={UpdateProfile} />
          <NonMainLayout path="/privacyAndPolicy" component={PrivacyAndPolicy} />

          {/* HMST Screen  */}
          <MainLayout exact path="/HMST_Dashboard" component={HMST_Dashboard} />
          <MainLayout path="/HMST_Dashboard/HMST_Statistics" component={HMST_Statistics} />
          <MainLayout exact path="/Monitor_Dashboard" component={Monitor_Dashboard} />
          <MainLayout exact path="/ControlRoom" component={ControlRoom} showFooter={false} />
          <MainLayout exact path="/SellingVehicle" component={SellingVehicle} showFooter={false} />

          {/* Top Menu  */}
          <MainLayout path="/homePage" component={HomePage} />
          <MainLayout path="/dashboard" component={Dashboard} />
          <MainLayout path="/dashboardJob" component={DashboardJob} />
          <MainLayout path="/realtime" component={Realtime} showFooter={false} />
          <NonpaddingMainLayout path="/History" component={History} />
          <MainLayout path="/CargoLink" component={CargoLink} />
          <MainLayout path="/RoutePlaning" component={RoutePlaning} />
          <MainLayout path="/maintenance" component={Maintenance} />

          {/*  Accessories Menu  */}

          {/*  Report [DoDoop] Menu*/}
          <MainLayout exact path="/reportTable" component={Reportecotree} />
          <MainLayout path="/reportTable/reportEcotree" component={EcoComponentdriver} />
          <MainLayout path="/reportTable/reportEcotreefleet" component={EcoComponentfleet} />

          <MainLayout path="/reportTable/reportGraph" component={ChartComponent} />
          <MainLayout path="/Map" component={Map} />
          <MainLayout path="/UserAuthentication" component={UserAuthentication} />
          <MainLayout path="/ScatterGraph" component={ScatterGraph} />
          <MainLayout path="/Speedhistogram" component={Speedhistogram} />
          <MainLayout path="/Throttlehistogram" component={Throttlehistogram} />
          <MainLayout path="/Radarchart" component={Radarchart} />

          <MainLayout path="/ServReport" component={ServReport}></MainLayout>
          <MainLayout path="/Reportpromotion" component={Reportpromotion} />
          <MainLayout path="/ReportUtilization" component={ReportUtilization} />
          <MainLayout path="/ReportVehiclelastengine" component={ReportVehiclelastengine} />

          <MainLayout path="/ReportInput8" component={ReportInput8} />
          <MainLayout path="/ReportApplicationusage" component={ReportApplicationusage} />
          <MainLayout path="/Reportvehicleallocationstockaging" component={Reportvehicleallocationstockaging} />
          <MainLayout path="/Reportvehiclehasenteredandleft" component={Reportvehiclehasenteredandleft} />
          <MainLayout path="/Reportinventoryvehiclemovementhistory" component={Reportinventoryvehiclemovementhistory} />
          <MainLayout path="/ReportDealerhistory" component={ReportDealerhistory} />
          <MainLayout path="/Reportvehiclepartlifetime" component={Reportvehiclepartlifetime} />

          <MainLayout path="/ReportMyvehicle" component={ReportMyvehicle} />
          <MainLayout path="/Reportmyvehicletrip" component={Reportmyvehicletrip} />
          <MainLayout path="/Reportmydriver" component={Reportmydriver} />
          <MainLayout path="/Reportmydriversummary" component={Reportmydriversummary} />
          <MainLayout path="/Reportmydrivertripdetail" component={Reportmydrivertripdetail} />
          <MainLayout path="/Dashboardreport" component={dashboardreport} />
          <MainLayout path="/LayoutReport" component={LayoutReport} />
          <MainLayout path="/realtimedashboard" component={realtimedashboard} />
          <MainLayout path="/DrivingBehavior" component={DrivingBehavior} />
          <MainLayout path="/OverSpeedLimitOnelink" component={OverSpeedLimitOnelink} />

          {/* Ranking Menu  */}
          <MainLayout path="/Ranking" component={Ranking} />
          <MainLayout path="/HMST_Driving_Competition" component={HMST_Driving_Competition} />

          {/* Message & Notification Menu  */}
          <MainLayout exact path="/notification" component={Notification} />
          <MainLayout path="/notification/information" component={NotificationDetail} />

          {/* Working Menu  */}
          <MainLayout exact path="/subscription" component={Subscription} />
          <MainLayout path="/subscription/subscriptionForm" component={SubscriptionForm} />
          <MainLayout exact path="/InstallationReport" component={InstallationReport} />

          {/* Download Menu  */}
          <MainLayout exact path="/OtherReportNew" component={OtherReportNew} />
          <MainLayout exact path="/OtherReportNew/Summary" component={ReportSummary} />
          <MainLayout exact path="/OtherReportNew/Detail" component={ReportDetail} />

          {/* Management Menu  */}
          {/* <MainLayout path="/roleManagement" component={RoleManagement} /> */}
          <MainLayout exact path="/userSetting" component={UserSetting} />
          <MainLayout path="/userSetting/userSettingForm" component={UserSettingForm} />
          <MainLayout path="/Rolesetting" component={RoleManagement} />
          {/* <MainLayout exact path="/roleManagement" component={NewRoleSetting} /> */}
          <MainLayout path="/newRoleSetting/roleInformationCreate" component={RoleInformationCreate} />
          <MainLayout path="/newRoleSetting/roleInformationUpdate" component={RoleInformationUpdate} />
          <MainLayout path="/roleSettingPermission" component={RoleSettingsPermission} />
          <MainLayout path="/TableCheckbox" component={RoleSetting} />

          <MainLayout exact path="/users" component={Users} />
          <MainLayout exact path="/users/usersForm" component={UsersForm} />

          <MainLayout exact path="/dealer" component={Dealer} />
          <MainLayout path="/dealer/dealerForm" component={DealerForm} />
          <MainLayout path="/dealer/addDealerAdmin" component={AddDealerAdmin} />

          <MainLayout exact path="/customer" component={Customer} />
          <MainLayout path="/customer/addCustomerAdmin" component={AddCustomerAdmin} />
          <MainLayout path="/customer/customerForm" component={CustomerForm} />

          <MainLayout exact path="/driver" component={Driver} />
          <MainLayout path="/driver/driverForm" component={DriverForm} />
          <MainLayout path="/driver/driverFormEdit" component={DriverFormEdit} />

          <MainLayout exact path="/fleet" component={Fleet} />
          <MainLayout path="/fleet/fleetForm" component={FleetForm} />

          <MainLayout exact path="/vehicle" component={Vehicle} />
          <MainLayout exact path="/vehicle-allocation" component={VehicleAllocation} />
          <MainLayout path="/vehicle/VehicleView" component={VehicleView} />
          <MainLayout path="/vehicle/vehicleForm" component={VehicleForm} />
          <MainLayout path="/vehicle/ImportCSV" component={ImportCSV} />

          <MainLayout path="/geofence" component={Geofence} />
          <MainLayout path="/geofenceSharing" component={GeofenceSharing} />
          <MainLayout path="/geofenceForm" component={GeofenceForm} />
          {/* <MainLayout path="/geofenceRoute" component={GeofenceRoute} /> */}
          <MainLayout path="/geofenceType" component={GeofenceType} />
          <MainLayout path="/geofenceTypeForm" component={GeofenceTypeForm} />

          {/* Setting Menu  */}
          <MainLayout exact path="/General" component={General} />
          <MainLayout exact path="/promotion" component={Promotion} />
          <MainLayout path="/promotionAdd" component={PromotionForm} />
          <MainLayout path="/promotionSetting" component={PromotionSetting} />
          {/* <MainLayout path="/drivingBehaviors" component={DrivingSettings} /> */}
          <MainLayout path="/drivingBehaviors" component={NewDrivingSettings} />
          <MainLayout exact path="/AlertSetting" component={AlertSetting} />
          <MainLayout exact path="/AlertSettingForm" component={AlertSettingForm} />

          {/* Help Menu  */}
          <MainLayout exact path="/Help" component={Help} />
          <Route exact path="/UserManual" component={UserManual} />
          <Route exact path="/UserManualMobileFleet" component={UserManualMobileFleet} />

          {/* Unknown Group  */}
          <MainLayout exact path="/job" component={Job} />
          <MainLayout path="/job/jobForm" component={JobForm} />
          <MainLayout path="/job/planForm" component={PlanForm} />
          <MainLayout path="/formGenerator" component={FormGenerator} />
          <MainLayout path="/GroupSetting" component={GroupSetting} />
          <MainLayout path="/GPSUnit" component={GPSUnit} />
          <MainLayout path="/MessageSetting" component={MessageSetting} />
          <MainLayout path="/Message" component={Message} />
          <MainLayout path="/modelCategory" component={ModelCategory} />
          <MainLayout path="/MasterData/HMST/CategoryType" component={CategoryType} />
          <MainLayout path="/MasterData/HMST/ClassType" component={ClassType} />
          <MainLayout path="/MasterData/HMST/EngineSeries" component={EngineSeries} />

          <MainLayout path="/Management/installingApproval" component={InstallingApproval} />
          <MainLayout path="/Management/installingApprovalForm" component={InstallingApprovalForm} />
        </Switch>
      </div >
    );
  }
}

// export default withRouter(AppRoute);
const mapStateToProps = (state) => ({
  stateSignin: state.signin.stateSignin,
  language: state.versatile.language,
  iconActive: state.realtime.iconActive,
  iconInactived: state.realtime.iconInactived,
})

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  refresh: () => dispatch(SigninActions.refresh()),
  setDefaultIconMarker: (iconActive, iconInactived) => dispatch(RealtimeActions.setDefaultIconMarker(iconActive, iconInactived))
})

// export default layout
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRoute))

// 1. ใส่ รูป โลโก้ hino บนซ้าย               //Success
// 2. เปลี่ยนไอคอนเมนูข้าง                    // Success
// 3. Non padding Main Layout แก้ระยะห่าง   // Success
// 4. Basic Wizzard Component แก้ สคริป
// 5. ตอนหุบ เมนูข้าง แก้สคริป
// 6. Breadcrumb แก้เปนบรรทัดเดียว           // Success
// 7. หน้า Driver ทำใหม่นะ
// 8. สลับสีแอคทีฟ                           //Success
// 9. scroll bar ข้างขวา เลื่อนได้ทุกหน้าเรย
