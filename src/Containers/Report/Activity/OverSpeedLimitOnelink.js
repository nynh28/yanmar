import React, { Suspense } from 'react'
// import $ from "jquery";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../table.css'
import { ENDPOINT_BASE_URL } from '../../../Config/app-config';

export default class OverSpeedLimitOnelink extends React.Component {
    static propTypes = {

    }
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: []
        }
    }

    async loadvehicle() {
        var api = ENDPOINT_BASE_URL + "fleet/report/driving"
        var response = await fetch(api, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify()

        });
        var responseJson = await response.json();
        //console.log(responseJson);
        this.setState({
            data: responseJson
        })

    }

    render() {

        return (
            <div>
                <p>asdasdasdasdasdsad</p>
            </div>
            // <Suspense fallback={null}>
            //     <div>
            //         <div div style={{ paddingTop: 22, paddingBottom: 40, backgroundColor: 'whitesmoke', marginBottom: 20, marginLeft: -36, marginTop: -30, marginRight: -20 }}>
            //             <div className="col-md-10">
            //                 <h3 style={{ fontWeight: "bold", fontSize: 18, marginLeft: 22 }}>My Vehicles</h3>
            //             </div>
            //         </div>
            //         <div className="row">
            //             <div className="col-lg-12">
            //                 <div className="ibox ">
            //                     <div className="ibox-title" style={{ padding: '15px 20px 10px 15px' }}>
            //                         <div className="row">
            //                             <div className="col-lg-4">
            //                                 <h3 style={{ fontSize: 18 }}>My Vehicles</h3>
            //                             </div>

            //                         </div>
            //                     </div>
            //                     <div className="ibox-content" style={{ padding: '15px 20px 5px 20px' }}>
            //                         {this.dealer_mode == true && (
            //                             <div className="form-group row">
            //                                 <div className="col-lg-6">
            //                                     <FormSelect mode={"single"}  //mode : (single/multiple)
            //                                         value={this.state.selected_dealer}  //single = "key" , multiple = [key]
            //                                         label={"Dealer name"}
            //                                         fontSize={16}
            //                                         list={this.state.dealer.map((element, i) => {
            //                                             //console.log(element)
            //                                             return { key: i, value: element.partner_id, text: ((element.prefix == null) ? '' : element.prefix) + ' ' + ((element.firstname == null) ? '' : element.firstname) + ' ' + ((element.lastname == null) ? '' : element.lastname) + ' ' + ((element.suffix == null) ? '' : element.suffix) }
            //                                         })}
            //                                         placeholder={"Dealer name"}
            //                                         flex={1}
            //                                         onChange={(selected) => {
            //                                             //console.log(selected)
            //                                             this.setState({
            //                                                 selected_dealer: selected
            //                                             })
            //                                             this.onDealerChanged(selected)
            //                                         }}>
            //                                     </FormSelect>
            //                                 </div>
            //                                 <div className="col-lg-6">
            //                                     {/* <select ref={this.selectedCustomer} className="form-control" value={this.state.selected_customer} onChange={this.onCustomerChanged}>
            //             <option value={0}>Select Customer</option>
            //             {this.state.customer.map((element, i) => {
            //               return (<option key={i} value={element.int_cust_id}>{element.customer_name}</option>)
            //             })}
            //           </select> */}
            //                                     <FormSelect mode={"single"}   //mode : (single/multiple)
            //                                         value={this.state.selected_customer}  //single = "key" , multiple = [key]
            //                                         label={"Company name"}
            //                                         list={this.state.customer.map((element, i) => {
            //                                             //console.log(element)
            //                                             return { key: i, value: element.int_cust_id, text: element.customer_name }
            //                                         })}
            //                                         placeholder={"Company name"}
            //                                         flex={1}
            //                                         onChange={(selected) => {
            //                                             //console.log(selected)
            //                                             this.setState({
            //                                                 selected_customer: selected
            //                                             })
            //                                             this.onCustomerChanged(selected)
            //                                         }}>
            //                                     </FormSelect>
            //                                 </div>
            //                             </div>
            //                         )}

            //                         {this.customer_mode == true && (
            //                             <div className="form-group row">
            //                                 <div className="col-lg-6">
            //                                     <FormSelect mode={"single"}   //mode : (single/multiple)
            //                                         value={this.state.selected_customer}  //single = "key" , multiple = [key]
            //                                         label={"Company Name"}
            //                                         list={this.state.customer.map((element, i) => {
            //                                             //console.log(element)
            //                                             return { key: i, value: element.int_cust_id, text: element.customer_name }
            //                                         })}
            //                                         placeholder={"Company Name"}
            //                                         flex={1}
            //                                         onChange={(selected) => {
            //                                             //console.log(selected)
            //                                             this.setState({
            //                                                 selected_customer: selected
            //                                             })
            //                                             this.onCustomerChanged(selected)
            //                                         }}>
            //                                     </FormSelect>
            //                                 </div>
            //                                 <div className="col-lg-6">
            //                                     <label className="col-lg-6 col-form-label">From</label>
            //                                     <label className="col-lg-6 col-form-label">To</label>
            //                                 </div>
            //                                 <div className="col-lg-6">
            //                                     <div className="col-lg-6" >
            //                                         {/* <input ref={this.DateForm} onChange={this.Formdate} className="form-control" type="date"></input> */}
            //                                         <DateRangePicker
            //                                             autoUpdateInput={false}
            //                                             startDate={this.state.dateStart}
            //                                             locale={{ format: "YYYY-MM-DD" }}
            //                                             singleDatePicker
            //                                             onEvent={this.handleDateStartChange}
            //                                         //
            //                                         >
            //                                             <input className="form-control input-sm"
            //                                                 type="text"
            //                                                 value={moment(this.state.dateStart).format("YYYY-MM-DD")}
            //                                             />
            //                                         </DateRangePicker>
            //                                     </div>
            //                                     <div className="col-lg-6" >
            //                                         <DateRangePicker
            //                                             // autoUpdateInput={false}
            //                                             startDate={this.state.dateEnd}
            //                                             locale={{ format: "YYYY-MM-DD" }}
            //                                             singleDatePicker
            //                                             onEvent={this.handleDateEndChange}
            //                                             // maxDate={moment(this.state.dateStart).add(1, 'month').calendar()}
            //                                             minDate={this.state.dateStart}
            //                                             // maxDate={moment(this.state.dateStart).add(1, 'day')}
            //                                             containerStyles={{ display: 'none' }}
            //                                         >
            //                                             <input className="form-control input-sm"
            //                                                 type="text"
            //                                                 value={moment(this.state.dateEnd).format("YYYY-MM-DD")}
            //                                             />
            //                                         </DateRangePicker>
            //                                     </div>
            //                                 </div>
            //                             </div>
            //                         )}

            //                         <div className="form-group row">
            //                             <div className="col-lg-6">
            //                                 {/* <select ref={this.selectedFleet} className="form-control" onChange={this.onFleetChanged} value={this.state.selected_fleet} >
            //           <option value={0}>Select Fleet</option>
            //           {this.state.fleet.map((element, i) => {
            //             return (<option key={i} value={element.id}>{element.fleet_name}</option>)
            //           })}
            //         </select> */}

            //                                 <FormSelect mode={"single"}   //mode : (single/multiple)
            //                                     value={this.state.selected_fleet}  //single = "key" , multiple = [key]
            //                                     label={" Fleet Name"}
            //                                     list={this.state.fleet.map((element, i) => {
            //                                         //console.log(element)
            //                                         return { key: i, value: element.id, text: element.fleet_name }
            //                                     })}
            //                                     placeholder={"Fleet ame"}
            //                                     flex={1}
            //                                     onChange={(selected) => {
            //                                         //console.log(selected)
            //                                         this.setState({
            //                                             selected_fleet: selected
            //                                         })
            //                                         this.onFleetChanged(selected)
            //                                     }}>
            //                                 </FormSelect>
            //                             </div>

            //                         </div>
            //                     </div>
            //                     <div style={{ marginTop: 15 }} className="panel">
            //                         <div className="panel-body">
            //                             <Table
            //                                 dataSource={this.state.data}
            //                                 mode={"offline"}
            //                                 //serversideSource={'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders'}
            //                                 table_id={4}
            //                                 user_id={20} //9999 20
            //                             >

            //                             </Table>
            //                         </div>
            //                     </div>

            //                 </div>

            //             </div>
            //         </div>

            //     </div >
            // </Suspense>
        )
    }
}