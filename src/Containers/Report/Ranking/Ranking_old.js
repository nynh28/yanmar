import React, { PureComponent } from 'react'

import RankingTable from '../../../Components/RankingTable';
import { ButtonGroup, Button } from 'reactstrap'

import './Ranking.css';





export default class Ranking extends PureComponent {
    static propTypes = {

    }
    constructor(props) {
        super(props)
        this.DayForm = React.createRef();
        this.monthForm = React.createRef();
        this.Year = React.createRef();
        this.DateForm = React.createRef();
        this.selectedFleet = React.createRef();
        this.selectedDaily = React.createRef();
        this.selectedMonthly = React.createRef();
        this.selectedYearly = React.createRef();
        this.selected_daily_period = React.createRef();





        this.state = {
            country: true,
            fleet: false,
            loading: false,
            type: 'Daily',
            fetchresult: [],
            dailyfleet: [],
            selected_Fleet: 0,
            selected_Daily: 0,
            selected_Monthly: 0,
            selected_Yearly: 0,
            selected_daily_period: 0,
            selected_Formdate: [],
            fleetdata: [],
            Table: false,

        }
        this.selectedFormDay = ""
        this.selectedFormdate = ""
        this.selectedDaily = ""
        this.selectedMonthly = ""
        this.selectedYearly = ""


        this.FormDay = this.FormDay.bind(this)
        this.Formdate = this.Formdate.bind(this)
        this.fetchTable = this.fetchTable.bind(this)
        this.getContainer = this.getContainer.bind(this)

        this.fetchTable();
        this.fetchFleet();
        this.fetchDaily();
        this.onFleetChanged = this.onFleetChanged.bind(this);
        this.onDailyChanged = this.onDailyChanged.bind(this);
        this.onMonthlyChanged = this.onMonthlyChanged.bind(this);
        this.onYearlyChanged = this.onYearlyChanged.bind(this);
        this.onDailyPeriodChanged = this.onDailyPeriodChanged.bind(this);

    }

    async fetchDaily() {
        var object = {
            fleet: this.state.selected_Fleet
        }
        //console.log(this.state.selected_Fleet);
        var response = await fetch('https://hino-dev-api.natapol.work/dodeepapi/getRankingPeriod', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Accept": "text/html",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object) // body data type must match "Content-Type" header
        });

        var responseJson = await response.json();
        //console.log(responseJson);
        this.setState({
            dailyfleet: responseJson,
            selected_daily_period: responseJson[0].datetime
        }, () => {
            //console.log(this.state.fleetdata)
        })
    }

    async fetchFleet() {
        var response = await fetch('https://hino-dev-api.natapol.work/dodeepapi/getfleet', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Accept": "text/html",
                "Content-Type": "application/json"
            },
            body: JSON.stringify() // body data type must match "Content-Type" header
        });

        var responseJson = await response.json();
        //console.log(responseJson);
        this.setState({
            fleetdata: responseJson
        }, () => {
            //console.log(this.state.fleetdata)
        })
    }
    async fetchTable() {

        //console.log(this.state.selected_daily_period)
        //console.log(this.state.type)
        var object = {
            fleet: this.state.selected_Fleet,
            viewmode: this.state.country == true ? 'country' : 'fleet',
            timestamp: this.state.type == 'Daily' ? this.state.selected_daily_period : 0
        }
        var response = await fetch('https://hino-dev-api.natapol.work/dodeepapi/getRanking', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Accept": "text/html",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object) // body data type must match "Content-Type" header
        });

        var responseJson = await response.json();
        //console.log(responseJson);
        this.setState({
            fetchresult: responseJson.data
        })

    }

    getContainer() {
        //console.log(this.selectedFormDay)
        //console.log(this.selectedFormdate)

        var params = {
            selectedFormDay: this.selectedFormDay,
            selectedFormdate: this.selectedFormdate,
        }
    }



    defaultview() {
        this.setState({
            country: true,
            fleet: false
        })
    }
    viewcountry() {
        this.setState({
            country: true,
            fleet: false,
        }, () => {
            this.fetchTable()
        })
    }
    viewfleet() {
        this.setState({
            country: false,
            fleet: true,
            Table: false
        }, () => {
            this.fetchTable()
        })
    }
    viewTable() {
        this.setState({
            Table: true,
        })
    }

    month() {
        this.setState({
            country: false,
            fleet: true
        })
    }

    FormDay() {
        this.selectedFormDay = this.DayForm.current.value
    }


    setType(type) {
        this.setState({
            type: type
        });
    }

    Formdate(e) {
        this.selectedFormdate = this.DateForm.current.value
        this.setState({
            selected_Formdate: e.target.value,
        },
        );
        //console.log(this.Formdate)
    }

    onFleetChanged(e) {
        //console.log(e.target.value);
        this.setState({
            selected_Fleet: e.target.value,
        }, () => {
            this.fetchTable()
        });
    }

    onDailyChanged(e) {
        //console.log(e.target.value);
        this.setState({
            selected_Daily: e.target.value,
        },
        );
    }
    onMonthlyChanged(e) {
        //console.log(e.target.value);
        this.setState({
            selected_Monthly: e.target.value,
        },
        );
    } y
    onYearlyChanged(e) {
        //console.log(e.target.value);
        this.setState({
            selected_Yearly: e.target.value,
        },
        );
    }

    onDailyPeriodChanged(e) {
        //console.log(e.target.value);
        this.setState({
            selected_daily_period: e.target.value,
        }, () => {
            this.fetchTable()
        });
    }




    render() {
        if (this.state.loading == true) {
            return (<div></div>)
        }
    }

    render() {
        //console.log(this.state.type)
        if (this.state.fleet == true) {
            return (<div>
                <div className="form-group row">
                    <div className="col-lg-12" >
                        <div className="ibox">
                            <div className="ibox-title">
                                <h5>Driver Ranking</h5>
                                <div className="ibox-tools"></div>
                            </div>
                            <div className="ibox-content">

                                <div className="form-group row">
                                    <div className="col-lg-12" >
                                        <div className="col-lg-1"></div>
                                        <label className="col-lg-1 col-form-label">View :</label>
                                        <div className="col-lg-2">
                                            <ButtonGroup >
                                                <Button onClick={this.viewcountry.bind(this)} className='button-radio-checkbox' >Country</Button>
                                                <Button onClick={this.viewfleet.bind(this)} className='btn-primary'>Fleet</Button>
                                            </ButtonGroup>
                                        </div>
                                        <div className="col-lg-2"></div>
                                        <label className="col-lg-1 col-form-label">Data range :</label>
                                        <div className="col-lg-2">
                                            <ButtonGroup >
                                                <Button ref={this.selectedDaily} onClick={this.setType.bind(this, 'Daily')} className='button-radio-checkbox' autoFocus="autofocus">Daily</Button>
                                                <Button ref={this.selectedMonthly} onClick={this.setType.bind(this, 'Monthly')} className='button-radio-checkbox'>Monthly</Button>
                                                <Button ref={this.selectedYearly} onClick={this.setType.bind(this, 'Yearly')} className='button-radio-checkbox'>Yearly</Button>
                                            </ButtonGroup>
                                        </div>
                                        <div className="col-lg-3"></div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12" >
                                        <div className="col-lg-1"></div>
                                        <label className="col-lg-1 col-form-label" >Fleet :</label>
                                        <div className="col-lg-2">
                                            <select ref={this.selectedFleet} className="form-control" onChange={this.onFleetChanged} value={this.state.selected_Fleet} >
                                                <option value={0}>All Fleet</option>
                                                {this.state.fleetdata.map((element, i) => {
                                                    return (<option key={i} value={element.id}>{element.fleet_name}</option>)
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-lg-2"></div>

                                        <label className="col-lg-1 col-form-label" >{this.state.type} :  </label>
                                        <div className="col-lg-2">
                                            <select ref={this.selected_daily_period} className="form-control" onChange={this.onDailyPeriodChanged} value={this.state.selected_daily_period} >
                                                {this.state.dailyfleet.map((element, i) => {
                                                    return (<option key={i} value={element.datetime}>{new Date(element.date).toString('yyyy-MM-dd')}</option>)
                                                })}
                                            </select>


                                        </div>
                                        <div className="col-lg-3"></div>
                                    </div>
                                </div>



                                <div className="form-group row">
                                    <div className="col-lg-12" >
                                        <div className="col-lg-7"></div>
                                        <div className="col-lg-2" style={{ textAlign: 'right' }}>
                                            <a style={{ margin: 0, backgroundColor: '#1ab394', color: 'white', marginLeft: 10 }} className="btn btn-default" ><i className="fa fa-filter" style={{ marginRight: 10 }}></i>Export Ranking</a>
                                        </div>
                                        <div className="col-lg-3"></div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div style={{ marginTop: 15 }} className="panel panel-default">
                                        <div className="panel-body">
                                            <RankingTable
                                                dataSource={this.state.fetchresult}
                                                mode={"offline"}
                                                tableId={0}
                                                user_id={0}
                                            >
                                            </RankingTable>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>

                </div>

            </div>)


        }





        return (

            <div className="row">
                <div className="col-md-12">
                    <div className="ibox">
                        <div className="ibox-title">
                            <h5>Driver Ranking</h5>
                            <div className="ibox-tools"></div>
                        </div>
                        <div className="ibox-content">

                            <div className="form-group row">
                                <div className="col-lg-12" >
                                    <div className="col-lg-1"></div>
                                    <label className="col-lg-1 col-form-label">View :</label>
                                    <div className="col-lg-2">
                                        <ButtonGroup >
                                            <Button onClick={this.viewcountry.bind(this)} className='btn-primary' >Country</Button>
                                            <Button onClick={this.viewfleet.bind(this)} className='button-radio-checkbox'>Fleet</Button>
                                        </ButtonGroup>
                                    </div>
                                    <div className="col-lg-2"></div>
                                    <label className="col-lg-1 col-form-label">Data range :</label>
                                    <div className="col-lg-2">
                                        <ButtonGroup >
                                            <Button ref={this.selectedDaily} onClick={this.setType.bind(this, 'Daily')} className='button-radio-checkbox' autoFocus="autofocus">Daily</Button>
                                            <Button ref={this.selectedMonthly} onClick={this.setType.bind(this, 'Monthly')} className='button-radio-checkbox'>Monthly</Button>
                                            <Button ref={this.selectedYearly} onClick={this.setType.bind(this, 'Yearly')} className='button-radio-checkbox'>Yearly</Button>
                                        </ButtonGroup>
                                    </div>
                                    <div className="col-lg-3"></div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-12" >
                                    <div className="col-lg-6"></div>


                                    <label className="col-lg-1 col-form-label" >{this.state.type} :  </label>
                                    <div className="col-lg-2">
                                        <input ref={this.DateForm} onChange={this.Formdate} value={this.state.selected_Formdate} className="form-control" ></input>
                                    </div>
                                    <div className="col-lg-3"></div>
                                </div>
                            </div>



                            <div className="form-group row">
                                <div className="col-lg-12" >
                                    <div className="col-lg-7"></div>
                                    <div className="col-lg-2" style={{ textAlign: 'right' }}>
                                        <a style={{ margin: 0, backgroundColor: '#1ab394', color: 'white', marginLeft: 10 }} className="btn btn-default" ><i className="fa fa-filter" style={{ marginRight: 10 }}></i>Export Ranking</a>
                                    </div>
                                    <div className="col-lg-3"></div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div style={{ marginTop: 15 }} className="panel panel-default">
                                    <div className="panel-body">
                                        <RankingTable
                                            dataSource={this.state.fetchresult}
                                            mode={"offline"}
                                            tableId={0}
                                            user_id={0}
                                        >
                                        </RankingTable>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>

        )
    }
}
