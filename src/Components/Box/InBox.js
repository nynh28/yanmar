import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Input
} from 'reactstrap'

import Images from '../../Themes/Images'
import '../Styles/MessageBox.css'


class InBox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      allInbox: [
        { name: 'Monica Smithhhhhhhhhh', message: 'Hello', day: 'Mon', num: 17 },
        { name: 'Michael Smith', message: 'hi..', day: 'Fri', num: 2 },
        { name: 'Karl Jordan', message: 'HAHAHAHA', day: 'Mon', num: 31 },
        { name: 'Monica Cale', message: 'Fail', day: 'Sun', num: 5 },
        { name: 'Mark Jordan Meiiakd', message: 'Hello', day: 'Web', num: 25 },
        { name: 'Karl Jordan Alice in wonderland', message: 'Hello', day: 'Mon', num: 52 },
        { name: 'Mark Jordan Alice in wonderland', message: 'GO HOME NOW!!!!!!!!!!!', day: 'Mon', num: 166 },
        { name: 'Alice Cale', message: 'Hello', day: 'Sun', num: 0 },
        { name: 'Michael Smith', message: 'Hello', day: 'Web', num: 4 },
      ],
      inputSearch: ''

    }

    // this.orderHeaderFilter = this.orderHeaderFilter.bind(this);

  }


  setListInbox(item, index) {
    // let color = 'write'
    // if (index % 2 !== 0) {
    //   color = '#F9F9F9'
    // }
    let show = true
    if (this.state.inputSearch !== '') {
      if (!(item.name).toLowerCase().includes(this.state.inputSearch.toLowerCase())) {
        show = false
      }
    }
    if (show) {
      return (
        <div key={'set-list-inbox-' + index} className="chat-user" onClick={() => (console.log('_____________ ON CLICK _____________'))
        } //style={{ backgroundColor: color }}
        >
          <img alt="image" className="chat-avatar" src={Images.profile1} />
          <div className="chat-user-name">
            <span className="message-author"> {item.name} </span>
            <span className="message-content">{item.message}</span>
          </div>
          <div>
            <span className="message-date">{item.day}</span>
            <br />
            {item.num !== 0 && <span className="pull-right badge badge-danger">{item.num}</span>}
          </div>

        </div >
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

          <div className="users-list">
            {this.state.allInbox.map((item, index) => this.setListInbox(item, index))}
          </div>

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


export default connect(mapStateToProps, mapDispatchToProps)(InBox)
