import React, { Component } from 'react'
import Order from './Order';
import CargoLinkActions from '../../Redux/CargoLinkRedux'
import { connect } from 'react-redux'
import { ENDPOINT_BASE_URL_CARGOLINK } from '../../Config/app-config';

class GetOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
      auth: this.props.auth,
    }

    // this.getOrders = this.getOrders.bind(this);
  }

  componentWillMount() {

  }

  componentDidUpdate(prevProps) {
    //   console.log(this.props)
    //   console.log(this.state)
    if (this.props.orders != null && this.state.orders != this.props.orders) {
      this.setState({
        orders: this.props.orders
      })
      console.log(this.state.orders)
    }
    console.log(this.state.orders)
  }

  //   splitData(data){
  //     var _loadingAddress = []
  //     for(let i = 0; i<=data.length; i+30){
  //         _loadingAddress.push(data.substring(i, i+30))
  //     }
  //     // this.setState({loadingAddress: _loadingAddress})
  //     console.log(_loadingAddress)
  //     return _loadingAddress
  // }

  render() {
    console.log(this.state)
    return (
      <div style={{
        borderStyle: "solid", borderColor: "#fcba03",
        backgroundColor: "white",

      }}>
        <div className="yellow-bar">
          <h1 className="bar-text">CargoLink JOB</h1>
        </div>
        <ul className="no-bullet-list" style={{
          paddingLeft: 0,
          height: 'calc(82vh - 70px)',
          overflowY: 'scroll'
        }}>
          {/* <div style={{ overflowY: 'scroll'}}> */}
          {/* <br></br> */}
          {this.state.orders != null && this.state.orders.map((order, i) =>

            <li style={{ paddingTop: '10px', paddingLeft: '10px', marginTop: '10px', marginLeft: '10px', backgroundColor: this.props.idDirection == i && "#42EE87" }}>
              <Order index={i}
                idDirection={this.props.idDirection}
                typeOfCargo={order.typeOfCargo}
                truckType={order.truckType}
                loadingAddress={order.loadingAddress}
                loadingTime={order.loadingTime}
                deliveryAddress={order.deliveryAddress}
                deliveryTime={order.deliveryTime}
                price={order.price}
                loadingLatitude={order.loadingLatitude}
                loadingLongitude={order.loadingLongitude}
                longitudeDest={order.shipmentList[0].longitudeDest}
                latitudeDest={order.shipmentList[0].latitudeDest}
                direction={(e) => this.props.direction(e)}
                redirectOrder={"https://cargolink.co.th/carriers/transportRequest/detail/" + order.orderId}
              />
              {/* {console.log(i)} */}
            </li>

          )}
          {/* </div> */}
        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(GetOrders)
