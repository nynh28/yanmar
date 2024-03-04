import React, { Component } from 'react'


export class DrivingBehavior extends Component {
    constructor(props) {
        super(props)
        this.state = {
            add: false,

        }
    }



    goadd(e) {
        //console.log(e)
        this.setState({
            add: true,
        })
    }
    gomain() {
        this.setState({
            add: false,
        })
    }


    render() {
        if (this.state.add == true) {
            return (

                <div className="col-md-5">
                    <div className="row" style={{ marginRight: 15, }}>
                        <ul class="nav nav-tabs">
                            <li><a onClick={this.gomain.bind(this)} style={{ padding: 14, backgroundColor: '#EAEDED', fontSize: 18 }}>Driving Behavior</a></li>
                            <li class="active" ><a onClick={this.goadd.bind(this)} style={{ padding: 14, backgroundColor: 'white', fontSize: 18 }}>Maintenance Status</a></li>
                        </ul>
                        <div className="ibox-content" style={{ height: 417 }}>
                            <div className="row" style={{ marginTop: 25 }}>
                                <div className="col-md-6" >
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label style={{ fontSize: 16 }}>Go To Dealer Immediately</label>
                                                </div>
                                                <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                    <label style={{ fontSize: 45, color: 'red', fontWeight: 'bold', margin: -10 }}>1</label>
                                                </div>
                                                <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                    <label style={{ fontSize: 16, marginTop: 25 }}>Unit</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6" >
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="col-sm-5">
                                                    <label style={{ fontSize: 16, color: 'grey' }}>Derate Condition</label>
                                                </div>
                                                <div className="col-sm-7" style={{ flexDirection: 'row', textAlign: 'left' }}>
                                                    <label style={{ fontSize: 35, color: 'grey', fontWeight: 'bold', margin: 1 }}>None</label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-md-6" >
                                    <div className="panel panel-default">
                                        <div className="panel-body" >
                                            <div className="row" >
                                                <div className="col-sm-6">
                                                    <label style={{ fontSize: 16 }}>Maintenance Immediately</label>
                                                </div>
                                                <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right', }}>
                                                    <label style={{ fontSize: 45, fontWeight: 'bold', margin: -10 }}>1</label>
                                                </div>
                                                <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                    <label style={{ fontSize: 16, marginTop: 25 }}>Unit</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6" >
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="col-sm-5">
                                                    <label style={{ fontSize: 16 }}>Service Campaign</label>
                                                </div>
                                                <div className="col-sm-4" style={{ flexDirection: 'row', textAlign: 'left' }}>
                                                    <label style={{ fontSize: 45, fontWeight: 'bold', margin: -10, }}>100</label>
                                                </div>
                                                <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                    <label style={{ fontSize: 16, marginTop: 25 }}>Units</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6" >
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label style={{ fontSize: 16 }}>Maintenance Soon</label>
                                                </div>
                                                <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                    <label style={{ fontSize: 45, fontWeight: 'bold', margin: -10 }}>3</label>
                                                </div>
                                                <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                    <label style={{ fontSize: 16, marginTop: 25 }}>Units</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6" >
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label style={{ fontSize: 16 }}>Healthy Vehicles</label>
                                                </div>
                                                <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'Left' }}>
                                                    <label style={{ fontSize: 45, fontWeight: 'bold', margin: -10 }}>95</label>
                                                </div>
                                                <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                    <label style={{ fontSize: 16, marginTop: 25 }}>Units</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            )
        }
        return (

            <div className="col-md-5">

                <div className="row" style={{ marginRight: 15 }}>

                    <ul class="nav nav-tabs" >
                        <li class="active"  ><a onClick={this.gomain.bind(this)} style={{ padding: 14, backgroundColor: 'white', fontSize: 18 }}>Driving Behavior</a></li>
                        <li ><a onClick={this.goadd.bind(this)} style={{ padding: 14, backgroundColor: '#EAEDED', fontSize: 18 }}>Maintenance Status</a></li>
                    </ul>

                    <div className="ibox-content" style={{ height: 417 }}>
                        <div className="row" style={{ marginTop: 25 }}>
                            <div className="col-md-6" >
                                <div className="panel panel-default">
                                    <div className="panel-body" >
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label style={{ fontSize: 16 }}>Hash Acceleration</label>
                                            </div>
                                            <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                <label style={{ fontSize: 45, color: 'red', fontWeight: 'bold', margin: -10 }}>1</label>
                                            </div>
                                            <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                <label style={{ fontSize: 16, marginTop: 25 }}>Unit</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6" >
                                <div className="panel panel-default">
                                    <div className="panel-body" >
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label style={{ fontSize: 16 }}>Over Speed 80km/h</label>
                                            </div>
                                            <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                <label style={{ fontSize: 45, color: 'red', fontWeight: 'bold', margin: -10 }}>2</label>
                                            </div>
                                            <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                <label style={{ fontSize: 16, marginTop: 25 }}>Units</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col-md-6" >
                                <div className="panel panel-default">
                                    <div className="panel-body" >
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label style={{ fontSize: 16 }}>Hash <br></br>Brake</label>
                                            </div>
                                            <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                <label style={{ fontSize: 45, color: 'red', fontWeight: 'bold', margin: -10 }}>1</label>
                                            </div>
                                            <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                <label style={{ fontSize: 16, marginTop: 25 }}>Unit</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6" >
                                <div className="panel panel-default">
                                    <div className="panel-body" >
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label style={{ fontSize: 16 }}>Over Speed 100 km/h</label>
                                            </div>
                                            <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                <label style={{ fontSize: 45, color: 'grey', fontWeight: 'bold', margin: -10 }}>0</label>
                                            </div>
                                            <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                <label style={{ fontSize: 16, marginTop: 25 }}>Unit</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6" >
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label style={{ fontSize: 16 }}>Hash <br></br> Turn</label>
                                            </div>
                                            <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                <label style={{ fontSize: 45, color: 'red', fontWeight: 'bold', margin: -10 }}>3</label>
                                            </div>
                                            <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                <label style={{ fontSize: 16, marginTop: 25 }}>Units</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6" >
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label style={{ fontSize: 16 }}>Over Speed 120 km/h</label>
                                            </div>
                                            <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                <label style={{ fontSize: 45, color: 'grey', fontWeight: 'bold', margin: -10 }}>0</label>
                                            </div>
                                            <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                <label style={{ fontSize: 16, marginTop: 25 }}>Unit</label>
                                            </div>
                                        </div>
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

export default DrivingBehavior
