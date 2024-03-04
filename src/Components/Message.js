import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Background } from 'devextreme-react/range-selector'

import Images from '../Themes/Images'
import './Styles/MessageBox.css'
import MessageBox from './Box/MessageBox'
import InBox from './Box/InBox'
import OutBox from './Box/OutBox'




class Message extends Component {

  constructor(props) {
    super(props)
    // this.state = {

    // }


    // this.orderHeaderFilter = this.orderHeaderFilter.bind(this);

  }
  onClickDropdown = (id) => {
    this.props.onClickDropdown(id)
  }



  render() {
    return (
      // <ul className="dropdown-menu dropdown-messages">
      <ul className="dropdown-menu dropdown-messages" onClick={() => this.onClickDropdown('message-li')}
      // style={{ maxHeight: window.innerHeight / 2 }}>
      >

        <div className="tabs-container">

          <div className="tabs-left">
            <ul className="nav nav-tabs">
              <li className="active"><a data-toggle="tab" href="#tab-1"><i className="fa fa-flag" /></a></li>
              <li className=""><a data-toggle="tab" href="#tab-2"><i className="fa fa-envelope" /></a></li>
              <li className=""><a data-toggle="tab" href="#tab-3"><i className="fa fa-inbox" /></a></li>
            </ul>
            <div className="tab-content">


              <div id="tab-1" className="tab-pane active">
                <MessageBox />
              </div>

              <div id="tab-2" className="tab-pane">
                <InBox />
              </div>

              <div id="tab-3" className="tab-pane">
                <OutBox />
              </div>

            </div>

          </div>
        </div>


      </ul>


    )
  }
}


const mapStateToProps = (state) => ({
  //   getIDSuccess: state.driver.getIDSuccess,

});

const mapDispatchToProps = (dispatch) => ({
  //   setData:  typeForm => dispatch(DriverActions.setData(typeForm)),



  // setTest: test => dispatch(PopupActions.setTest(test))
});


export default connect(mapStateToProps, mapDispatchToProps)(Message)
