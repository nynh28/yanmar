import React, { Component } from 'react'
import Pin from './Trucks/pin.png'
import Clock from './Trucks/clock.png'
import { connect } from 'react-redux'
// import { color } from 'html2canvas/dist/types/css/types/color';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onLoadingAddress: this.props.loadingAddress,
      loadingAddress: null,
      truckType: null

    }

    // this.getOrders = this.getOrders.bind(this);
  }

  componentWillMount() {
    if(this.props.truckType.split(',')[0] == ' ' || this.props.truckType.split(',')[0] == '' || this.props.truckType.split(',')[0] == undefined || this.props.truckType.split(',')[0] == null){
      // ? 'null' : this.props.truckType.split(',')[0]
      this.setState({truckType: 'null'})
    }
    else{
      this.setState({truckType: this.props.truckType.split(',')[0]})
    }
    // console.log(this.props.loadingAddress)
    // if(this.state.loadingAddress != null){
    //     if(this.state.loadingAddress.length == 1){
    // let loadingAddress = []
    // for(let i = 0; i<=this.props.loadingAddress.length; i+30){
    // loadingAddress.push(this.props.loadingAddress.substring(i, i+30))
    // }
    // this.setState({loadingAddress: loadingAddress})
    // console.log(this.state.loadingAddress)
    //     }
    // }


    // for(let i = 0; i <= )
    // this.splitData()

  }

  // splitData(){
  //     let _loadingAddress = []
  //     for(let i = 0; i<=this.state.onLoadingAddress.length; i+30){
  //         _loadingAddress.push(this.state.onLoadingAddress.substring(i, i+30))
  //     }
  //     this.setState({loadingAddress: _loadingAddress})
  //     console.log(this.state.loadingAddress)
  // }


  render() {
    // this.splitData()truckType
    // console.log(this.props.typeOfCargo)
    console.log('./Trucks/' + this.state.truckType + '.png')
    return (
      <div className="shipper-list"
        style={{ display: 'flex', flex: 1 }}
      >
        <div>
          <img src={require('./Trucks/' + this.state.truckType + '.png')}
            style={{
              marginRight: '10px', paddingRight: '10px'

            }} alt="car"
            className="car-bar" />
        </div>
        <img src={Pin} alt="pin" className="pin"></img>

        <div className="address-andtime" style={{ marginLeft: 0, flex: 1 }}>
          <div className="address-andtime-each">
            <h1 className="address-text">{this.props.loadingAddress}</h1>
            {
              // this.props.loadingAddress != null && this.props.loadingAddress.map(v => <h1 className="address-text">{v}</h1>)
              // for(let i = 0; i <= this.props.loadingAddress.length;)
              // this.props.loadingAddress.split(' ').length >= 2 ? this.props.loadingAddress.split(' ').forEach((e,i) => console.log('more 2:', this.props.loadingAddress.split(' ')[i*2])) : console.log('low 2')
              // this.props.loadingAddress.split(' ').length >= 2 ?
              // this.props.loadingAddress.split(' ').map((e,i) => {
              //     if(this.props.loadingAddress.split(' ')[i*2] != undefined && ){
              //         return <h1 className="address-text">{this.props.loadingAddress.split(' ')[i*2] != undefined && this.props.loadingAddress.split(' ')[i*2] + " " + this.props.loadingAddress.split(' ')[(i*2)+1]}</h1>
              //     }
              // })
              // : <h1 className="address-text">{this.props.loadingAddress.split(' ')[0] + " " + this.props.loadingAddress.split(' ')[1]}</h1>
            }

            <img src={Clock} alt="clock" className="clock"></img>
            <h1 className="time-text">{this.props.loadingTime}</h1>
          </div>
          <div>
            <h1 className="address-text">{this.props.deliveryAddress}</h1>
            <img src={Clock} alt="clock" className="clock"></img>
            <h1 className="time-text">{this.props.deliveryTime}</h1>
          </div>
        </div>
        <div className="right-bar" style={{ width: 150 }}>
          <button className="details-link" style={{ marginLeft: 3 }}
            onClick={() => this.props.direction(this.props.index)}>Show Route ></button>
          <h1 className="price-text">{this.props.price}</h1>
          <a className="cargolink-button" href={this.props.redirectOrder}
            style={{ marginLeft: 0 }}
            target="_blank">Send Quotation</a>
        </div>


      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authorization: state.cargolink.authorization,
  orders: state.cargolink.orders,
  resBody: state.cargolink.resBody
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Order)



// import React, { Component } from 'react'
// import Pin from '../../Assets/Trucks/pin.png'
// import Clock from '../../Assets/Trucks/pin.png'

// export default function Orders({typeOfCargo="",loadingAddress="",loadingTime="",deliveryAddress="",deliveryTime="",price=0,loadingLatitude="",loadingLongitude="",longitudeDest="",latitudeDest=""}) {
//     return (
//         <div className="shipper-list">
//             <img src={require('../../Assets/Trucks/' + typeOfCargo + ".png")} alt="fucking car" className="car-bar"></img>
//             <img src={Pin} alt="fucking pin" className="pin"></img>
//             <div className="address-andtime">
//                 <div className="address-andtime-each">
//                     <h1 className="address-text">{loadingAddress}</h1>
//                     <img src={Clock} alt="fucking clock" className="fuckingclock"></img>
//                     <h1 className="time-text">{loadingTime}</h1>
//                 </div>
//                 <div>
//                     <h1 className="address-text">{deliveryAddress}</h1>
//                     <img src={Clock} alt="fucking clock" className="fuckingclock"></img>
//                     <h1 className="time-text">{deliveryTime}</h1>
//                 </div>
//             </div>

//             <div className="right-bar">
//                 <a className="details-link" href="">click to view detail > </a>
//                 <h1 className="price-text">{price}</h1>
//                 <button className="fucking-button">For quotation</button>
//             </div>
//         </div>
//     )
// }
