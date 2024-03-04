import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Input
} from 'reactstrap'

import '../Styles/MessageBox.css'


class OutBox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      allInbox: [
        { name: 'Monica Smith', day: '02-12-19', total: 230, read: 104 },
        { name: 'Michael Smith', day: '14-01-19', total: 100, read: 23 },
        { name: 'Karl Jordan', day: '25-07-19', total: 30, read: 12 },

      ],
      inputSearch: ''
    }

    // this.orderHeaderFilter = this.orderHeaderFilter.bind(this);

  }


  setListOutbox(item, index) {
    // let color = 'write'
    // if (index % 2 !== 0) {
    //   color = '#F9F9F9'
    // }
    let percent = (item.read / item.total * 100) + '%'
    let show = true
    if (this.state.inputSearch !== '') {
      if (!(item.name).toLowerCase().includes(this.state.inputSearch.toLowerCase())) {
        show = false
      }
    }
    if (show) {
      return (
        <div key={'set-list-outbox-' + index} className="chat-user" onClick={() => (console.log(' _________ onClick _________ '))}
        // style={{ backgroundColor: color }}
        >
          <div className="outbox-message">
            <span className="message-author"> {item.name} </span>
            <span className="message-content">{item.day}</span>
          </div>
          <div className="message-percent">
            <b>{item.read}/{item.total}</b>

            <div style={{ backgroundColor: 'lightgray', height: 5, borderRadius: 10 }}>
              <div style={{ backgroundColor: 'green', height: 5, borderRadius: 10, width: percent }}></div>
            </div>

          </div>
        </div>

      )
    }

  }



  render() {
    return (

      <div className="panel-body">

        <Input className="search-message-box" placeholder='Search for Somethings...'
          onChange={(e) => this.setState({ inputSearch: e.target.value })}></Input>

        <div className='inbox-outbox scroll'
          style={{ height: 320 }}>

          {/* <div className="chat-users"> */}
          <div className="users-list">
            {this.state.allInbox.map((item, index) => this.setListOutbox(item, index))}
          </div>
          {/* </div> */}

        </div>
      </div>

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


export default connect(mapStateToProps, mapDispatchToProps)(OutBox)
