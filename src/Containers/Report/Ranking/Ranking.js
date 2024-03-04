import React, { Component, Suspense } from 'react'

// import RankingTable from '../../../Components/RankingTable';
import Table from '../../../Components/DataGridView/Table.js'
import { ButtonGroup, Button } from 'reactstrap'

import './Ranking.css';
import { connect } from 'react-redux'

import FormSelect from '../../../Components/FormControls/Basic/FormSelect'

import { ENDPOINT_BASE_URL, ENDPOINT_SETTING_REPORT_BASE_URL } from '../../../Config/app-config';
import { t } from '../../../Components/Translation'

// class Ranking extends PureComponent {
class Ranking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected_fleet: 'please select fleet',
      selected_date: 'please select date',
      ranking_mode: 'fleet',
      date_range: 'daily',
      date: [],
      fleet: [],
      ranking: [],
    }

    this.get_owner_fleet = this.get_owner_fleet.bind(this)
    this.get_ranking_date = this.get_ranking_date.bind(this)
    this.onFleetChange = this.onFleetChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.set_rank_mode = this.set_rank_mode.bind(this)
    this.set_date_range = this.set_date_range.bind(this)
    this.get_ranking_date_without_fleet = this.get_ranking_date_without_fleet.bind(this)

    // this.get_owner_fleet();
    // this.get_ranking_date();
  }

  async set_rank_mode(mode) {
    this.setState({
      ranking_mode: mode,
      date_range: 'daily',
      fleet: [],
      ranking: [],
      date: []
    }, () => {
      if (mode == 'fleet') {
        this.get_owner_fleet()
      } else {
        this.get_ranking_date_without_fleet()
      }
    })
  }

  async set_date_range(range) {
    this.setState({
      date_range: range,
      ranking: []
    }, () => {
      if (this.state.anking_mode == 'fleet') {
        this.get_owner_fleet()
      } else {
        this.get_ranking_date_without_fleet()
      }
    })
  }

  async get_owner_fleet() {
    var object = {
      userId: this.props.dataLogin.userId,
    }
    var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_fleet_without_customer"
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    var responseJson = await response.json();
    //console.log(responseJson);
    this.setState({
      fleet: responseJson
    })
  }

  async get_ranking_date_without_fleet() {
    var object = {
      date_range: this.state.date_range
    }
    //console.log(object);
    var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_ranking_date_without_fleet"
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    var responseJson = await response.json();
    //console.log(responseJson);
    this.setState({
      date: responseJson
    })
  }

  async get_ranking_date() {
    if (this.state.selected_fleet == 'please select fleet') {
      this.setState({
        date: []
      })
      // Swal.fire('Warning', 'Please select fleet to view ranking', 'error')
      return;
    }
    var object = {
      // fleet: this.state.selected_fleet,
      fleet: 43,
      date_range: this.state.date_range
    }
    var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_ranking_date_by_fleet"
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    var responseJson = await response.json();
    //console.log(responseJson);
    this.setState({
      date: responseJson
    })
  }



  onFleetChange(e) {
    this.setState({
      selected_fleet: e
    }, () => {
      this.get_ranking_date()
    })
  }

  onDateChange(e) {
    //console.log(e);
    var element_index = e.split('|')[1];
    //console.log(element_index);
    this.setState({
      selected_date: e,
      ranking: this.state.date[element_index].ranking
    })
  }


  render() {
    let { header, dataLogin } = this.props
    return (
      <Suspense fallback={null}>
        <div className="form-group row">

          <div className="col-lg-12" >
            <div className="ibox">
              <div className="ibox-title">
                <h3 style={{ fontSize: 18 }}>{t('driver_ranking_13')}</h3>
                <div className="ibox-tools"></div>
              </div>
              <div className="ibox-content">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group form-inline">
                      <label style={{ fontSize: 16 }}>{t('driver_ranking_2')} : </label>
                      <ButtonGroup style={{ marginLeft: 18 }} >
                        <Button onClick={() => this.set_rank_mode('fleet')} className={'button-radio-checkbox btn-sm ' + (this.state.ranking_mode == 'fleet' ? 'btn-success' : '')}>{t('driver_ranking_3')}</Button>
                        <Button onClick={() => this.set_rank_mode('country')} className={'button-radio-checkbox btn-sm ' + (this.state.ranking_mode == 'country' ? 'btn-success' : '')} >{t('driver_ranking_7')}</Button>
                      </ButtonGroup>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group form-inline">
                      <label style={{ fontSize: 16 }}>{t('driver_ranking_8')} : </label>
                      <ButtonGroup style={{ marginLeft: 35 }} >
                        <Button onClick={() => this.set_date_range('daily')} className={'button-radio-checkbox btn-sm ' + (this.state.date_range == 'daily' ? 'btn-success' : '')}>{t('driver_ranking_9')}</Button>
                        <Button onClick={() => this.set_date_range('monthy')} className={'button-radio-checkbox btn-sm ' + (this.state.date_range == 'monthy' ? 'btn-success' : '')} >{t('driver_ranking_10')}</Button>
                        <Button onClick={() => this.set_date_range('yearly')} className={'button-radio-checkbox btn-sm ' + (this.state.date_range == 'yearly' ? 'btn-success' : '')} >{t('driver_ranking_11')}</Button>
                      </ButtonGroup>
                    </div>
                  </div>
                </div>
                {this.state.ranking_mode == 'fleet' && (
                  <div className="row">
                    <div className="col-md-6">
                      <FormSelect mode={"single"}   //mode : (single/multiple)
                        // value={this.state.selected_fleet}  //single = "key" , multiple = [key]
                        value={""}
                        label={"driver_ranking_3"}
                        list={this.state.fleet.map((element, i) => {
                          //console.log(element)
                          return { key: i, value: element.id, text: element.fleet_name }
                        })}
                        placeholder={"driver_ranking_4"}
                        flex={1}
                        onChange={(selected) => {
                          //console.log(selected)
                          this.setState({
                            selected_fleet: selected
                          })
                          this.onFleetChanged(selected)
                        }}>
                      </FormSelect>
                    </div>

                  </div>
                )}
                {this.state.ranking_mode == 'fleet' && (
                  <div className="row">
                    <div className="col-md-6">
                      <FormSelect mode={"single"}   //mode : (single/multiple)
                        // value={this.state.selected_date}  //single = "key" , multiple = [key]
                        value=""
                        label={"export_4"}
                        list={this.state.date.map((element, i) => {
                          //console.log(element)
                          return { key: i, value: element.datetime + "|" + i, text: element.datetime + "|" + i }
                        })}
                        placeholder={"export_4"}
                        flex={1}
                        onChange={(selected) => {
                          //console.log(selected)
                          this.setState({
                            selected_date: selected
                          })
                          this.onDateChange(selected)
                        }}>
                      </FormSelect>
                    </div>
                  </div>
                )}

                {this.state.ranking_mode == 'country' && (
                  <div className="row">

                    <div className="col-md-6">
                      <FormSelect mode={"single"}   //mode : (single/multiple)
                        // value={this.state.selected_date}  //single = "key" , multiple = [key]
                        value={""}
                        label={"export_4"}
                        list={this.state.date.map((element, i) => {
                          //console.log(element)
                          return { key: i, value: element.datetime + "|" + i, text: new Date(element.date).toDateString('dd-mm-yyyy') }
                        })}
                        placeholder={"export_4"}
                        flex={1}
                        onChange={(selected) => {
                          //console.log(selected)
                          this.setState({
                            selected_date: selected
                          })
                          this.onDateChange(selected)
                        }}>
                      </FormSelect>
                    </div>
                  </div>
                )}

              </div>
              <div style={{ marginTop: 5 }} className="panel">
                <div className="panel-body">

                  <div className="row">
                    <div className="col-md-12">
                      {/* <RankingTable
                      dataSource={this.state.ranking}
                      mode={"offline"}
                      tableId={0}
                      user_id={0}
                    >
                    </RankingTable> */}
                      <Table
                        mode={"offline"}
                        dataSource={[]}
                        table_id={0}
                        user_id={dataLogin.userId} //9999 20
                        editing={{
                          enabled: true,
                          allowUpdating: false,
                          allowDeleting: false
                        }}
                        showSetting={false}
                        searchPanel={true}
                        autoExpandAll={false}
                        remoteOperations={true}
                        selectAll={true}
                        author={header.idToken}
                        xAPIKey={header.redisKey}
                        column={[

                          {
                            column_name: 'rank',
                            column_caption: "driver_ranking_13",
                          },
                          {
                            column_name: 'driver',
                            column_caption: "driver_ranking_16",
                          },
                          {
                            column_name: 'mileage',
                            column_caption: "driver_ranking_17",
                          },
                          {
                            column_name: 'driving_time',
                            column_caption: "driver_ranking_18",
                          },
                          {
                            column_name: 'behavior_score',
                            column_caption: "driver_ranking_19",
                          }
                        ]}
                      >
                      </Table>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Suspense>);
  }
}
const mapStateToProps = (state) => {
  return {
    // request_signin: state.auth.request_signin,
    dataLogin: state.signin.dataLogin,
    header: state.signin.header,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // signin: (email, password) => dispatch(AuthActions.signin(email, password)),
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Ranking))
