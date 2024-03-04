import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import DrivingCompetitionActions from '../../Redux/DrivingCompetitionRedux'
import { Row, Col } from 'reactstrap'
import PannelBox from '../../Components/PannelBox'
import DataTable from './DataTable'
import moment from 'moment';
import { get, isEmpty } from 'lodash'
import { t } from "../../Components/Translation";
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import { useTranslation } from 'react-i18next'
import FormSelectSearch from '../../Components/FormControls/FormSelectSearch'
import FormDateTimePicker from "../../Components/FormControls/FormDateTimePicker";
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

export const dataStore = new ArrayStore({ data: [] });

var dataSource

class DrivingCompetition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // start_date: moment().startOf('month').format("DD/MM/YYYY 00:00:00"),
      // end_date: moment().format("DD/MM/YYYY 23:59:59")
    }
    this.startDate = moment().startOf('month').format("DD/MM/YYYY 00:00:00")
    this.stopDate = moment().format("DD/MM/YYYY 23:59:59")
    this.onApplyEvent = this.onApplyEvent.bind(this);
    dataSource = new DataSource({
      store: dataStore,
      reshapeOnPush: true
    });
  }


  componentWillMount() {
    this.props.setValue("isLoadingCompetition", false)
    this.props.classTypeLists.length == 0 && this.loadClassType()

    let { startDateTime, endDateTime } = this.props
    if (startDateTime) {
      this.startDate = moment(startDateTime, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss")
      this.stopDate = moment(endDateTime, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss")
    }
  }

  async loadClassType() {
    let result = [], defaultSelected = []
    try {
      var response = await fetch(ENDPOINT_BASE_URL + "fleet/master/classtypevehicle?user_id=" + this.props.dataLogin.userId, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      var data = await response.json();
      if (data.length > 0) {
        data.forEach(item => {
          result.push({ key: item.code, value: item.name, })
          defaultSelected.push(item.code)
        });

        result.unshift(
          {
            key: "0",
            value: "my_vehicles_92",
          }
        )
      }
    } catch { }

    this.props.setValue("classTypeLists", result)
    this.props.setValue("classTypeSelected", ["0"])
  }

  //#region LAST EVALUATE KEY
  async loadDrivingCompetition() {
    this.props.setValue("isLoadingCompetition", true)
    let data = [], response = "", isLastKey = false, dict = {}, class_type = []

    this.props.classTypeSelected.forEach(item => {
      if (item == 0) class_type = ""
      else class_type.push(parseInt(item))
    });

    let body = {
      "user_id": this.props.dataLogin.userId,
      "start": this.startDate,
      "end": this.stopDate,
      "class_type": class_type
    }

    let isFirstLoad = true
    do {
      response = await this.getData(isLastKey, get(response, 'page', []), body)

      try {
        if (isFirstLoad) {
          dataStore.clear()
          dataSource.reload()
        }
        isFirstLoad = false

        get(response, 'dict') && (dict = response.dict)
        if (response.list.length > 0) {
          data.push(...response.list)
          let result = this.mappingData(response.list, dict)
          result.forEach(item => {
            dataStore.push([{
              type: 'insert',
              data: item
            }]);
          });
        }

        if (get(response, 'LastEvaluatedKey'))
          isLastKey = true
        else
          isLastKey = false

      } catch {
        isLastKey = false
      }

    } while (isLastKey);

    let result = this.mappingData(data, dict)
    this.props.setValue("dataDrivingCompet", result)
    this.props.setValue("isLoadingCompetition", false)
  }

  async getData(isLastKey = false, page = [], body) {
    if (isLastKey) body.page = page

    try {
      var response = await fetch(ENDPOINT_BASE_URL + "fleet/driver/competition", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': this.props.language
        },
        body: JSON.stringify(body)
      });

      var resp = await response.json();
      let data = []
      if (resp.code === 200) data = resp.result

      if (get(data, 'list')) return data
    } catch { }
  }

  mappingData(data, dict) {
    let result = []

    data.forEach(dt => {
      result.push({
        "id": dt[dict.id],
        "personal_id": dt[dict.personal_id],
        "driver_name": dt[dict.prefix] + dt[dict.firstname] + " " + dt[dict.lastname],
        "cust_name": dt[dict.cust_name],
        "licenseplate": dt[dict.licenseplate],
        "vin_no": dt[dict.vin_no],
        "model_code": dt[dict.model_code],
        "class_type_name": dt[dict.class_type_name],
        "dealer_name": dt[dict.dealer_name],
        "distance": dt[dict.distance],
        "fuel_usage": dt[dict.fuel_usage],
        "safety_score": dt[dict.safety_score],
        "eco_score": dt[dict.eco_score],
        "score_exceed_speed": dt[dict.score_exceed_speed],
        "score_exceed_rpm": dt[dict.score_exceed_rpm],
        "score_harsh_start": dt[dict.score_harsh_start],
        "score_harsh_acc": dt[dict.score_harsh_acc],
        "score_harsh_brake": dt[dict.score_harsh_brake],
        "score_sharp_turn": dt[dict.score_sharp_turn],
        "score_long_idling": dt[dict.score_long_idling],
        "score_shift_down": dt[dict.score_shift_down],
        "score_shift_up": dt[dict.score_shift_up],
        "score_rpm_low": dt[dict.score_rpm_low],
        "score_rpm_high": dt[dict.score_rpm_high],
        "score_exhaust": dt[dict.score_exhaust],
        "total_score": (dt[dict.safety_score] + dt[dict.eco_score])
      })
    });

    return result
  }
  //#endregion

  onApplyEvent(dataObject) {
    this.startDate = dataObject.startDate.format("YYYY-MM-DD HH:mm:ss");
    this.stopDate = dataObject.endDate.format("YYYY-MM-DD HH:mm:ss");

    this.props.setValue("startDateTime", this.startDate)
    this.props.setValue("endDateTime", this.stopDate)
  }

  render() {
    let { classTypeLists, classTypeSelected } = this.props

    return (
      <Suspense fallback={null}>
        <PannelBox
          title={t("driving_compet_28")}
          showFooter={true}
          footerchildren={
            <div style={{ textAlign: 'Right' }}>
              <button onClick={() => this.loadDrivingCompetition()} className="btn" style={{ marginRight: 10, backgroundColor: '#1AB394', color: 'white' }}>{t("search")} </button>
            </div>
          }
        >
          <Row>
            <Col lg={6}>
              <FormSelectSearch
                mode={"multiple"}
                schema={{ "required": [""] }}
                value={classTypeSelected}
                label={"driving_compet_29"}
                list={[...classTypeLists]}
                placeholder={""}
                flex={1}
                onChange={(selected) => {
                  var lastItem = selected[selected.length - 1];
                  let select = selected

                  if (lastItem == 0) {
                    select = [lastItem]
                  }
                  else {
                    let idx = select.findIndex((id) => id == 0)
                    if (idx > -1) {
                      const index = select.indexOf(select[idx]);
                      if (index > -1) {
                        select.splice(index, 1);
                      }
                    }
                  }

                  if (!isEmpty(selected)) {
                    this.props.setValue("classTypeSelected", select)
                  }
                }}
              />
            </Col>

            <Col lg={6}>
              <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                <label className="control-label" style={{ fontWeight: 500 }}>
                  {t('date_Range')} :
                </label>
                <FormDateTimePicker
                  startDate={this.startDate}
                  endDate={this.stopDate}
                  maxDate={moment().endOf("day")}
                  select_change={this.onApplyEvent.bind(this)}
                  timePicker={true}
                  disabledDateLimit={true}
                ></FormDateTimePicker>
              </div>
            </Col>
          </Row >

        </PannelBox >

        <PannelBox
          style={{ marginTop: -20 }}
          contentStyle={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>
          <DataTable dataSource={dataSource} />
        </PannelBox>
      </Suspense >
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  classTypeLists: state.drivingCompetition.classTypeLists,
  classTypeSelected: state.drivingCompetition.classTypeSelected,
  startDateTime: state.drivingCompetition.startDateTime,
  endDateTime: state.drivingCompetition.endDateTime,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(DrivingCompetitionActions.setValue(name, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(DrivingCompetition)
