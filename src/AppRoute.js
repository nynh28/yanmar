import React, { Component, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
//#region Redux connect
import { connect } from "react-redux";
import SigninActions from "./Redux/SigninRedux";
import RealtimeActions from "./Redux/RealtimeRedux";
//#endregion

// import './assets/dependencies';
//#region >>>>>>>>>>>>>>>>>>>>> Main Layouts <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

import NotFound from "./Layouts_New/Common/notFound";
import MainLayout from "./Layouts_New/MainLayout";
// import NotFound from "./Layouts_New/Common/notFound";
import AccessDenied from "./Layouts_New/Common/AccessDenied";
// import MainLayout from "./Layouts_New/MainLayout";
// import WaitingComponent from './Themes/waiting';
import NonpaddingMainLayout from "./Layouts/NonpaddingMainLayout";
import NonMainLayout from "./Layouts/NonMainLayout";

//#endregion

import Images from "./Containers/Realtime/icons/Images";

// #region >>>>>>>>>>>>>>>>>>>>> Page Rounting <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//#region TestScreen
import TestScreen from "./Containers/TestScreen/TestScreen";
import TestScreen2 from "./Containers/TestScreen/TestScreen2";
import TestScreen3 from "./Containers/TestScreen/TestScreen3";
//#endregion

//#region Singin Screen
import SigninScreen from "./Containers/Signin/index";
import ForgetPassword from "./Containers/ForgetPassword/ForgetPassword";
import ChangePassword from "./Containers/ChangePassword/ChangePassword";
import UpdateProfile from "./Containers/UpdateProfile/UpdateProfile";
import UpdateProfileTractor from "./Containers/UpdateProfileTractor/UpdateProfile";
import ForceChange from "./Containers/ForceChange/ForceChange";
import PrivacyAndPolicy from "./Containers/PrivacyAndPolicy/PrivacyAndPolicy";
import MachineTractor from "./Containers/MachineTractor/MachineTractor"
import UserTractor from "./Containers/UserTractor/UserTractor"
import MaintenanceTractor from "./Containers/MaintenanceTractor/MaintenanceTractor"
import MaintenanceSettingTractor from "./Containers/MaintenanceTractor/MaintenanceSettingTractor"

//#endregion

//#region HMST View
// import HMST_Dashboard from './Containers/HMST_View/Utilization/Utilization'
// import HMST_Statistics from './Containers/HMST_View/Utilization/Statistics'
import Monitor_Dashboard from "./Containers/DashboardMonitor/Dashboard";
// import ControlRoom from "./Containers/HMST_View/ControlRoom/ControlRoom/ControlRoom";
// import SellingVehicle from "./Containers/HMST_View/ControlRoom/SellingVehicle/SellingVehicle";
//#endregion

//#region Top Menu
import HomePage from "./Containers/HomePage/HomePage";
import HomePageTractor from "./Containers/HomePageTractor/HomePage";
// import Dashboard from './Containers/Dashboard/Dashboard'
// import Realtime from './Containers/Realtime/Realtime'
// import Dashboard from './Containers/Dashboard/Dashboard'
import Dashboard from "./Containers/SummaryDashboard";
// import Dashboard from './Containers/SummaryDashboard'
// import Realtime from './Containers/Realtime/Realtime'
import DashBoardNew from "./Containers/Dashboard_new/DashBoardNew"
import DashboardJob from "./Containers/DashboardJob/DashboardJob";
import History from "./Containers/History/History";
import TrackingHistory from "./Containers/TrackingHistory/TrackingHistory";
import TrackingHistoryMap from "./Containers/TrackingHistory/Map";
import TrackingHistoryTracktor from "./Containers/TrackingHistoryTracktor/TrackingHistory";
import TrackingHistoryMapTracktor from "./Containers/TrackingHistoryTracktor/Map";
import Playback from "./Containers/Playback/Playback";
import ReportMyvehicle from "./Containers/MyVehicles/MyVehicles";
import Reportmydriver from "./Containers/MyDrivers/MyDrivers";
import CargoLink from "./Containers/CargoLink/CargoLink";
import RoutePlaning from "./Containers/RoutePlaning/RoutePlaning";
import Maintenance from "./Containers/Maintenance/Maintenance";
import workingReport from "./Containers/WorkingReport";

import Realtime from "./Containers/RealtimeDashboard/Realtime";
import MaintenanceDetail from "./Containers/Maintenance/LocationInfo";
import ControlRoomDashboard from "./Containers/ControlRoomDashboard/ControlRoomDashboard";
//#endregion

//#region Accessories Menu

//#endregion

//#region Report [DoDoop] Menu
import UserAuthentication from "./Containers/Report/UserAuthentication";
import ScatterGraph from "./Containers/Report/ScatterGraph";
import Speedhistogram from "./Containers/Report/Speedhistogram";
import RPMhistogram from "./Containers/Report/RPMhistogram";
import Radarchart from "./Containers/Report/Radarchart";
import Throttlehistogram from "./Containers/Report/Throttlehistogram";

import ServReport from "./Containers/Report/ServReport";
import Reportpromotion from "./Containers/Report/Reportpromotion";
import ReportUtilization from "./Containers/Report/ReportUtilization";
import ReportVehiclelastengine from "./Containers/Report/ReportVehiclelastengine";

import ReportApplicationusage from "./Containers/Report/ReportApplicationusage";
import Reportvehicleallocationstockaging from "./Containers/Report/Reportvehicleallocationstockaging";
import ReportInput8 from "./Containers/Report/ReportInput8";
import Reportvehiclehasenteredandleft from "./Containers/Report/Reportvehiclehasenteredandleft";
import Reportinventoryvehiclemovementhistory from "./Containers/Report/Reportinventoryvehiclemovementhistory";
import ReportDealerhistory from "./Containers/Report/ReportDealerhistory";
import Reportvehiclepartlifetime from "./Containers/Report/Reportvehiclepartlifetime";
// import ReportMyvehicle from './Containers/Report/Reportmyvehicle';
import Reportmyvehicletrip from "./Containers/Report/Reportmyvehicletrip";
// import Reportmydriver from './Containers/Report/Reportmydriver';
import Reportmydriversummary from "./Containers/Report/Reportmydriversummary";
import Reportmydrivertripdetail from "./Containers/Report/Reportmydrivertripdetail";
import LayoutReport from "./Containers/Report/LayoutReport";
import dashboardreport from "./Containers/Report/dashboardreport";
// import Reportecotree from './Containers/Report/reportecotree';
import Reportecotree from "./Containers/AnalysisReport/AnalysisReport";
import EcoComponentdriver from "./Containers/EcoTree/EcoComponentdriver";
import EcoComponentfleet from "./Containers/EcoTree/EcoComponentFleet";
import realtimedashboard from "./Containers/Report/Realtime Dashboard/realtimedashboard";
import DrivingBehavior from "./Containers/Report/Realtime Dashboard/DrivingBehavior";

import OverSpeedLimitOnelink from "./Containers/Report/Activity/OverSpeedLimitOnelink";
//#endregion

//#region Ranking Menu
import Ranking from "./Containers/Report/Ranking/Ranking";
//#endregion

//#region Message & Notification Menu
import Notification from "./Containers/Notification/Notification";
// import NotificationDetail from './Containers/Notification/NotificationDetail';
import NotificationDetail from "./Containers/Notification/LocationInfo";
//#endregion

//#region Working Menu
import Subscription from "./Containers/Subscription";
import SubscriptionForm from "./Containers/Subscription/SubscriptionForm";
import SubscriptionTractor from "./Containers/SubscriptionTractor";
import PreviewImportRegistration from "./Containers/SubscriptionTractor/PreviewImportRegistration";
import SubscriptionFormTractor from "./Containers/SubscriptionTractor/SubscriptionForm";
import InstallationReport from "./Containers/InstallationReport/InstallationReport";
//#endregion

//#region Download
import MaintenanceHistory from "./Containers/MaintenanceHistory/MaintenanceHistory";
import OtherReportNew from "./Containers/OtherReports/OtherReports";
import ReportSummary from "./Containers/OtherReports/ReportSummary";
import ReportDetail from "./Containers/OtherReports/ReportDetail";
import GeofenceReport from "./Containers/GeofenceReport/GeofenceReport";

import AnalysisReport from "./Containers/AnalysisReport/AnalysisReport";

//#endregion

//#region  Competition
import DrivingCompetition from "./Containers/DrivingCompetition/DrivingCompetition";
//#endregion

//#region Management Menu
import RoleManagement from "./Containers/RoleSetting/RoleManagement";
import RoleSetting from "./Containers//RoleSetting/RoleSetting";
import Users from "./Containers/Users/Users";
import UsersForm from "./Containers/Users/UsersForm";
import UserSetting from "./Containers/UserSetting/UserSetting";
import UserSettingForm from "./Containers/UserSetting/UserSettingForm";
import UserSettingFormnew from "./Containers/UserSetting/UserSettingFormnew";
import Dealer from "./Containers/Dealer/Dealer";
import DealerForm from "./Containers/Dealer/DealerForm";
import AddDealerAdmin from "./Containers/Dealer/AddDealerAdmin";
import Customer from "./Containers/Customer";
import CustomerForm from "./Containers/Customer/CustomerForm";

//Tractor Customer
import CustomerTractor from "./Containers/CustomerTractor";
import CustomerFormTractor from "./Containers/CustomerTractor/CustomerForm";
import CustomerImport from "./Containers/CustomerTractor/Import";
import PreviewImportCustomer from "./Containers/CustomerTractor/PreviewImportCustomer";
import PreviewImportVehicle from "./Containers/VehicleTractor/PreviewImportVehicle";

import Driver from "./Containers/Driver/Driver";
import DriverForm from "./Containers/Driver/DriverForm";
import DriverFormEdit from "./Containers/Driver/DriverFormEdit";
import Fleet from "./Containers/Fleet/Fleet";
import FleetForm from "./Containers/Fleet/FleetForm";
import Vehicle from "./Containers/Vehicle/Vehicle";
import VehicleView from "./Containers/Vehicle/VehicleView";
import VehicleForm from "./Containers/Vehicle/VehicleForm";
//Tractor
import VehicleTractor from "./Containers/VehicleTractor/Vehicle";
import VehicleFormTractor from "./Containers/VehicleTractor/VehicleForm";
//
import VehicleAllocation from "./Containers/VehicleAllocation/VehicleAllocationNew";
import Devices from "./Containers/AddDevice/AddDevice";
import AddDeviceForm from "./Containers/AddDevice/AddDeviceForm";
import Geofence from "./Containers/Geofence/Geofence";
import GeofenceSharing from "./Containers/GeofenceSharing/GeofenceSharing";
import GeofenceForm from "./Containers/Geofence/GeofenceForm";
// import GeofenceRoute from './Containers/Geofence/GeofenceRoute';
import GeofenceType from "./Containers/GeofenceType/GeofenceType";
import GeofenceTypeForm from "./Containers/GeofenceType/GeofenceTypeForm";
import GPSUnit from "./Containers/GPSUnit/GPSUnit";
//#endregion

//#region Setting Menu
import General from "./Containers/General/General";
import Promotion from "./Containers/Promotion/Promotion";
import PromotionSetting from "./Containers/Promotion/PromotionSetting";
import PromotionForm from "./Containers/Promotion/PromotionForm";
import DrivingSettings from "./Containers/DrivingSettings/DrivingSettings";
import AlertSetting from "./Containers/AlertSetting/AlertSetting";
import AlertSettingForm from "./Containers/AlertSetting/AlertSettingForm";
//#endregion

//#region Top Menu
import Help from "./Containers/Help/Help";
import UserManual from "./Containers/Help/UserManual";
import UserManualMobileFleet from "./Containers/Help/UserManualMobileFleet";
//#endregion

//#region Unknown Group
import GroupSetting from "./Containers/GroupSetting/GroupSetting";
import ChartComponent from "./Containers/Graph/ChartComponent";
import Map from "./Containers/Map/Map";
import ImportCSV from "./Containers/Vehicle/ImportCSV";
import Job from "./Containers/Job/Job";
import JobForm from "./Containers/Job/JobForm";
import PlanForm from "./Containers/Job/PlanForm";
import FormGenerator from "./Containers/FormGenerator/FormGenerator";
import MessageSetting from "./Containers/MessageSetting/MessageSetting";
import Message from "./Containers/MessageSetting/Message";
import ModelCategory from "./Containers/ModelCategory/ModelCategory";
import NewRoleSetting from "./Containers/RoleSetting/NewRoleSettings";
import RoleInformationCreate from "./Containers/RoleSetting/RoleInformationCreate";
import RoleInformationUpdate from "./Containers/RoleSetting/RoleInformationUpdate";
import RoleSettingsPermission from "./Containers/RoleSettingPermission/RoleSettingsPermission";
//#endregion
import EmptyPage from "./Containers/EmptyPage/EmptyPage";
// import HMST_Driving_Competition from "./Containers/HMST_Driving_Competition/EmptyPage";
import i18n from "./i18n";
import CategoryType from "./Containers/MasterData/CategoryType";
import ClassType from "./Containers/MasterData/ClassType";
import EngineSeries from "./Containers/MasterData/EngineSeries";
import NewDrivingSettings from "./Containers/DrivingSettings/NewDrivingSettings";
import InstallingApproval from "./Containers/Management/InstallingApproval";
import InstallingApprovalForm from "./Containers/Management/InstallingApprovalForm";
import PdfGenerate from "./Containers/DrivingReports/PdfViewer/PdfGenerate";
import ForwardScreen from "./Containers/DrivingReports/ForwardScreen";
import DrivingReports from "./Containers/DrivingReports/DrivingReports";
import Geofences from "./Containers/Geofences";
import TractorRealtime from "./Containers/RealtimeDashboardTractor/Realtime";
import DealerTractor from "./Containers/DealerSettingTractor/index";
import DelaerFormTractor from "./Containers/DealerSettingTractor/DealerForm";

import StockInventoryTractor from "./Containers/StockInventoryTractor/ControlRoomDashboard";
import EchartsBoardMain from "./Containers/Dashboard_new/EchartsBoardMain";

//Machine

class AppRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconByClassTypeActive: [],
      iconByClassTypeInactived: [],
      iconmarker: false,
    };
  }

  //#region Functions

  componentDidMount() {
    i18n.changeLanguage(this.props.language);
  }

  componentWillMount() {
    if (this.props.stateSignin) {
      if (this.props.dataLogin.platform_id === 3) {
        this.props.refreshTractor();
        this.refreshToken();
      } else {
        this.props.refresh();
        this.refreshToken();
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { stateSignin } = this.props;

    if (prevProps.stateSignin !== stateSignin) {
      if (stateSignin) {
        this.refreshToken();
      } else {
        clearInterval(this.interval);
      }
    }
    if (
      prevState.iconmarker !== this.state.iconmarker &&
      this.state.iconmarker
    ) {
      this.props.setDefaultIconMarker(
        this.state.iconByClassTypeActive,
        this.state.iconByClassTypeInactived
      );
    }
  }

  refreshToken() {
    this.interval = setInterval(() => {
      if (this.props.dataLogin.platform_id === 3) {
        this.props.refreshTractor();
      } else {
        this.props.refresh();
      }
    }, 1200000);
  }

  //#endregion

  render() {
    // console.log(">> routes.js")
    return (
      <div>
        <Switch>
          {/* Singin Screen  */}
          <Route exact path="/" component={SigninScreen} />
          <Route exact path="/signin" component={SigninScreen} />
          <Route exact path="/forgetPassword" component={ForgetPassword} />
          <Route exact path="/forceChange" component={ForceChange} />
          <MainLayout exact path="/changePassword" component={ChangePassword} />
          <MainLayout exact path="/updateProfile" component={UpdateProfile} />
          <MainLayout
            exact
            path="/Tractor/updateProfile"
            component={UpdateProfileTractor}
          />
          <NonMainLayout
            path="/privacyAndPolicy"
            component={PrivacyAndPolicy}
          />

          {/* HMST Screen  */}
          <MainLayout
            exact
            path="/Monitor_Dashboard"
            component={Monitor_Dashboard}
          />

          {/* Top Menu  */}
          <MainLayout exact path="/homePage" component={HomePage} />
          <MainLayout
            exact
            path="/Tractor/homePage"
            component={HomePageTractor}
          />
          <MainLayout
            exact
            path="/Tractor/machine"
            component={MachineTractor}
          />
          <MainLayout
            exact
            path="/Tractor/maintenance"
            component={MaintenanceTractor}
          />
          <MainLayout
            exact
            path="/Tractor/user"
            component={UserTractor}
          />
          <MainLayout
            exact
            path="/Tractor/maintenance-setting"
            component={MaintenanceSettingTractor}
          />
          <MainLayout
            exact
            path="/dashboard"
            component={Dashboard}
            contentStyles={{ padding: "0px 8px 55px 8px" }}
          />
          <MainLayout exact path="/Tractor/dashboard-control" component={EchartsBoardMain} />
          <MainLayout exact path="/Tractor/dashboard" component={DashBoardNew} />
          <MainLayout exact path="/dashboardJob" component={DashboardJob} />
          <MainLayout
            exact
            path="/realtime"
            component={Realtime}
            showFooter={false}
            contentStyles={{ padding: "0px 10px 10px" }}
          />
          <MainLayout
            exact
            path="/History"
            component={History}
            showFooter={false}
            contentStyles={{ padding: "8px 8px 0px 8px" }}
          />
          <MainLayout
            exact
            path="/TrackingHistory"
            component={TrackingHistory}
          />
          <MainLayout
            exact
            path="/TrackingHistory-Route"
            component={TrackingHistoryMap}
            showFooter={false}
            contentStyles={{ padding: "8px 0px 0px 0px" }}
          />
          <MainLayout
            exact
            path="/Tracktor/TrackingHistory"
            component={TrackingHistoryTracktor}
          />
          <MainLayout
            exact
            path="/Tracktor/TrackingHistory-Route"
            component={TrackingHistoryMapTracktor}
            showFooter={false}
            contentStyles={{ padding: "8px 0px 0px 0px" }}
          />
          <MainLayout
            exact
            path="/Playback"
            component={Playback}
            showFooter={false}
            contentStyles={{ padding: "8px 8px 0px 8px" }}
          />
          <MainLayout exact path="/CargoLink" component={CargoLink} />
          <MainLayout exact path="/RoutePlaning" component={RoutePlaning} />
          <MainLayout exact path="/working-report" component={workingReport} />
          <MainLayout exact path="/maintenance" component={Maintenance} />
          <MainLayout
            exact
            path="/maintenance/information"
            component={MaintenanceDetail}
          />
          <MainLayout
            exact
            path="/controlRoomDashboard"
            component={ControlRoomDashboard}
          />
          <MainLayout
            exact
            path="/Tractor/StockInventory"
            component={StockInventoryTractor}
          />
          <MainLayout exact path="/testScreen" component={TestScreen} />

          {/*  Accessories Menu  */}

          {/*  Report [DoDoop] Menu*/}
          {/* <MainLayout exact path="/reportTable" component={Reportecotree} /> */}
          <MainLayout
            exact
            path="/reportTable/reportEcotree"
            component={EcoComponentdriver}
          />
          <MainLayout
            exact
            path="/reportTable/reportEcotreefleet"
            component={EcoComponentfleet}
          />

          <MainLayout
            exact
            path="/reportTable/reportGraph"
            component={ChartComponent}
          />
          <MainLayout exact path="/Map" component={Map} />
          <MainLayout
            exact
            path="/UserAuthentication"
            component={UserAuthentication}
          />
          <MainLayout exact path="/ScatterGraph" component={ScatterGraph} />
          <MainLayout exact path="/Speedhistogram" component={Speedhistogram} />
          <MainLayout
            exact
            path="/Throttlehistogram"
            component={Throttlehistogram}
          />
          <MainLayout exact path="/Radarchart" component={Radarchart} />

          <MainLayout
            exact
            path="/ServReport"
            component={ServReport}
          ></MainLayout>
          <MainLayout
            exact
            path="/Reportpromotion"
            component={Reportpromotion}
          />
          <MainLayout
            exact
            path="/ReportUtilization"
            component={ReportUtilization}
          />
          <MainLayout
            exact
            path="/ReportVehiclelastengine"
            component={ReportVehiclelastengine}
          />

          <MainLayout exact path="/ReportInput8" component={ReportInput8} />
          <MainLayout
            exact
            path="/ReportApplicationusage"
            component={ReportApplicationusage}
          />
          <MainLayout
            exact
            path="/Reportvehicleallocationstockaging"
            component={Reportvehicleallocationstockaging}
          />
          <MainLayout
            exact
            path="/Reportvehiclehasenteredandleft"
            component={Reportvehiclehasenteredandleft}
          />
          <MainLayout
            exact
            path="/Reportinventoryvehiclemovementhistory"
            component={Reportinventoryvehiclemovementhistory}
          />
          <MainLayout
            exact
            path="/ReportDealerhistory"
            component={ReportDealerhistory}
          />
          <MainLayout
            exact
            path="/Reportvehiclepartlifetime"
            component={Reportvehiclepartlifetime}
          />

          <MainLayout
            exact
            path="/ReportMyvehicle"
            component={ReportMyvehicle}
          />
          <MainLayout
            exact
            path="/Reportmyvehicletrip"
            component={Reportmyvehicletrip}
          />
          <MainLayout exact path="/Reportmydriver" component={Reportmydriver} />
          <MainLayout
            exact
            path="/Reportmydriversummary"
            component={Reportmydriversummary}
          />
          <MainLayout
            exact
            path="/Reportmydrivertripdetail"
            component={Reportmydrivertripdetail}
          />
          <MainLayout
            exact
            path="/Dashboardreport"
            component={dashboardreport}
          />
          <MainLayout exact path="/LayoutReport" component={LayoutReport} />
          <MainLayout
            exact
            path="/realtimedashboard"
            component={realtimedashboard}
          />
          <MainLayout
            exact
            path="/DrivingBehavior"
            component={DrivingBehavior}
          />
          <MainLayout
            exact
            path="/OverSpeedLimitOnelink"
            component={OverSpeedLimitOnelink}
          />

          {/* Ranking Menu  */}
          <MainLayout exact path="/Ranking" component={Ranking} />
          {/* <MainLayout
            exact
            path="/HMST_Driving_Competition"
            component={HMST_Driving_Competition}
          /> */}

          {/* Message & Notification Menu  */}
          <MainLayout exact path="/notification" component={Notification} />
          <MainLayout
            exact
            path="/notification/information"
            component={NotificationDetail}
          />

          {/* Working Menu  */}
          <MainLayout exact path="/subscription" component={Subscription} />
          <MainLayout
            exact
            path="/subscription/subscriptionForm"
            component={SubscriptionForm}
          />
          <MainLayout
            exact
            path="/Tractor/subscription"
            component={SubscriptionTractor}
          />
          <MainLayout
            exact
            path="/Tractor/subscription/import"
            component={PreviewImportRegistration}
          />
          <MainLayout
            exact
            path="/Tractor/subscription/subscriptionForm"
            component={SubscriptionFormTractor}
          />
          <MainLayout
            exact
            path="/InstallationReport"
            component={InstallationReport}
          />

          {/* Download Menu  */}
          <MainLayout
            exact
            path="/MaintenanceHistory"
            component={MaintenanceHistory}
          />
          <MainLayout exact path="/OtherReportNew" component={OtherReportNew} />
          <MainLayout
            exact
            path="/OtherReportNew/Summary"
            component={ReportSummary}
          />
          <MainLayout
            exact
            path="/OtherReportNew/Detail"
            component={ReportDetail}
          />
          <MainLayout exact path="/reportTable" component={AnalysisReport} />

          {/* Competition Menu  */}
          <MainLayout
            exact
            path="/DrivingCompetition"
            component={DrivingCompetition}
          />

          <MainLayout exact path="/GeofenceReport" component={GeofenceReport} />
          <MainLayout exact path="/reportTable" component={AnalysisReport} />

          {/* Management Menu  */}
          {/* <MainLayout  exact path="/roleManagement" component={RoleManagement} /> */}
          <MainLayout exact path="/userSetting" component={UserSetting} />
          <MainLayout
            exact
            path="/userSetting/userSettingFormold"
            component={UserSettingForm}
          />
          <MainLayout
            exact
            path="/userSetting/userSettingForm"
            component={UserSettingFormnew}
          />
          <MainLayout exact path="/Rolesetting" component={RoleManagement} />
          {/* <MainLayout exact path="/roleManagement" component={NewRoleSetting} /> */}
          <MainLayout
            exact
            path="/newRoleSetting/roleInformationCreate"
            component={RoleInformationCreate}
          />
          <MainLayout
            exact
            path="/newRoleSetting/roleInformationUpdate"
            component={RoleInformationUpdate}
          />
          <MainLayout
            exact
            path="/roleSettingPermission"
            component={RoleSettingsPermission}
          />
          <MainLayout exact path="/TableCheckbox" component={RoleSetting} />

          <MainLayout exact path="/users" component={Users} />
          <MainLayout exact path="/users/usersForm" component={UsersForm} />

          <MainLayout exact path="/dealer" component={Dealer} />
          <MainLayout exact path="/dealer/dealerForm" component={DealerForm} />
          <MainLayout
            exact
            path="/dealer/addDealerAdmin"
            component={AddDealerAdmin}
          />

          <MainLayout exact path="/customer" component={Customer} />
          <MainLayout
            exact
            path="/customer/customerForm"
            component={CustomerForm}
          />

          <MainLayout exact path="/Tractor/dealer" component={DealerTractor} />
          <MainLayout
            exact
            path="/Tractor/dealer/dealerForm"
            component={DelaerFormTractor}
          />
          {/* Customer */}
          <MainLayout
            exact
            path="/Tractor/customer"
            component={CustomerTractor}
          />
          <MainLayout
            exact
            path="/Tractor/customer/test"
            component={CustomerImport}
          />

          <MainLayout
            exact
            path="/Tractor/customer/customerForm"
            component={CustomerFormTractor}
          />
          <MainLayout
            exact
            path="/Tractor/customer/import"
            component={ PreviewImportCustomer }
          />

          <MainLayout exact path="/driver" component={Driver} />
          <MainLayout exact path="/driver/driverForm" component={DriverForm} />
          <MainLayout
            exact
            path="/driver/driverFormEdit"
            component={DriverFormEdit}
          />

          <MainLayout exact path="/fleet" component={Fleet} />
          <MainLayout exact path="/fleet/fleetForm" component={FleetForm} />

          <MainLayout exact path="/vehicle" component={Vehicle} />
          <MainLayout
            exact
            path="/vehicle-allocation"
            component={VehicleAllocation}
          />
          <MainLayout
            exact
            path="/vehicle/VehicleView"
            component={VehicleView}
          />
          <MainLayout
            exact
            path="/vehicle/vehicleForm"
            component={VehicleForm}
          />
          <MainLayout exact path="/vehicle/ImportCSV" component={ImportCSV} />

          {/* //Tractor */}
          <MainLayout
            exact
            path="/Tractor/vehicle"
            component={VehicleTractor}
          />
          <MainLayout
            exact
            path="/Tractor/vehicle/import"
            component={PreviewImportVehicle}
          />
          <MainLayout
            exact
            path="/Tractor/vehicle/vehicleForm"
            component={VehicleFormTractor}
          />

          <MainLayout exact path="/Devices" component={Devices} />
          <MainLayout
            exact
            path="/Devices/AddDeviceForm"
            component={AddDeviceForm}
          />

          <MainLayout exact path="/geofence" component={Geofence} />
          <MainLayout
            exact
            path="/geofenceSharing"
            component={GeofenceSharing}
          />
          <MainLayout exact path="/geofenceForm" component={GeofenceForm} />
          {/* <MainLayout  exact path="/geofenceRoute" component={GeofenceRoute} /> */}
          <MainLayout exact path="/geofenceType" component={GeofenceType} />
          <MainLayout
            exact
            path="/geofenceTypeForm"
            component={GeofenceTypeForm}
          />
          <MainLayout
            exact
            path="/Geofences"
            component={Geofences}
            showFooter={false}
            contentStyles={{ padding: 0 }}
            isFullScreen={true}
          />

          {/* Setting Menu  */}
          <MainLayout exact path="/General" component={General} />
          <MainLayout exact path="/promotion" component={Promotion} />
          <MainLayout exact path="/promotionAdd" component={PromotionForm} />
          <MainLayout
            exact
            path="/promotionSetting"
            component={PromotionSetting}
          />
          {/* <MainLayout  exact path="/drivingBehaviors" component={DrivingSettings} /> */}
          <MainLayout
            exact
            path="/drivingBehaviors"
            component={NewDrivingSettings}
          />
          <MainLayout exact path="/AlertSetting" component={AlertSetting} />
          <MainLayout
            exact
            path="/AlertSettingForm"
            component={AlertSettingForm}
          />

          {/* Help Menu  */}
          <MainLayout exact path="/Help" component={Help} />
          <Route exact path="/UserManual" component={UserManual} />
          <Route
            exact
            path="/UserManualMobileFleet"
            component={UserManualMobileFleet}
          />

          {/* Unknown Group  */}
          <MainLayout exact path="/job" component={Job} />
          <MainLayout exact path="/job/jobForm" component={JobForm} />
          <MainLayout exact path="/job/planForm" component={PlanForm} />
          <MainLayout exact path="/formGenerator" component={FormGenerator} />
          <MainLayout exact path="/GroupSetting" component={GroupSetting} />
          <MainLayout exact path="/GPSUnit" component={GPSUnit} />
          <MainLayout exact path="/MessageSetting" component={MessageSetting} />
          <MainLayout exact path="/Message" component={Message} />
          <MainLayout exact path="/modelCategory" component={ModelCategory} />
          <MainLayout
            exact
            path="/MasterData/HMST/CategoryType"
            component={CategoryType}
          />
          <MainLayout
            exact
            path="/MasterData/HMST/ClassType"
            component={ClassType}
          />
          <MainLayout
            exact
            path="/MasterData/HMST/EngineSeries"
            component={EngineSeries}
          />

          <MainLayout
            exact
            path="/Management/installingApproval"
            component={InstallingApproval}
          />
          <MainLayout
            exact
            path="/Management/installingApprovalForm"
            component={InstallingApprovalForm}
          />
          <MainLayout
            exact
            path="/DrivingReport/PdfViewer"
            component={PdfGenerate}
          />
          <MainLayout
            exact
            path="/DrivingReport/FillInformation"
            component={ForwardScreen}
          />
          <MainLayout exact path="/DrivingReport" component={DrivingReports} />

          {/* Tractor */}

          <MainLayout
            exact
            path="/Tractor/realtime"
            component={TractorRealtime}
          />
          {/* ___________________________________________________ */}
          <Route exact path="/AccessDenied" component={AccessDenied} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

// export default withRouter(AppRoute);
const mapStateToProps = (state) => ({
  stateSignin: state.signin.stateSignin,
  language: state.versatile.language,
  iconActive: state.realtime.iconActive,
  iconInactived: state.realtime.iconInactived,
  dataLogin: state.signin.dataLogin,
});

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  refresh: () => dispatch(SigninActions.refresh()),
  refreshTractor: () => dispatch(SigninActions.refreshTractor()),
  setDefaultIconMarker: (iconActive, iconInactived) =>
    dispatch(RealtimeActions.setDefaultIconMarker(iconActive, iconInactived)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppRoute)
);
