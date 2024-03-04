import React, { Component } from 'react'
import { connect } from 'react-redux'
import MessageActions from '../../Redux/MessageRedux'
import {
  Input, Button
} from 'reactstrap'




class MessageBox extends Component {

  // __________________________________ CONSTRUCTOR __________________________________
  constructor(props) {
    super(props)
    // ------------------
    this.state = {
      dataAll: {},
      fitterAll: {},
      amountCheckAll: {},
      showAll: {},
      fitter: false,
      inputSearch: '',
      buttonDisable: false,
    }
    // ------------------
    // this.setData = this.setData.bind(this);
  }
  // __________________________________________________________________________________

  // _________________________________ ส่วน Component __________________________________
  // ------------------------- GET USER จาก API -------------------------
  componentWillMount() {
    let { businessPartnerId, groupType } = this.props
    this.props.getDataUser(businessPartnerId, groupType)
  }
  // --------------------------------------------------------------------
  // ---------------------------- DID UPDATE ----------------------------
  componentDidUpdate(prevProps, prevState) {
    // ------------------- SET ข้องมูลจาก API เข้า STATE -------------------
    if (prevProps.dataUser !== this.props.dataUser) {
      let { dataAll, fitterAll, amountCheckAll, showAll } = this.state
      let { dataUser, currentUser } = this.props

      for (let objDU in dataUser) {
        let { name, data } = dataUser[objDU]
        dataAll[name] = []
        fitterAll[name] = []
        amountCheckAll[name] = false
        showAll[name] = false
        for (let obj in data) {
          if (data[obj].username !== currentUser) {
            dataAll[name].push({ name: data[obj].fullName, check: false })
          }
        }
      }
      this.setState(preState => preState)
    }
    // -------------------- SET ข้อมูลที่ใช้ในการ FITTER --------------------
    if (prevState.fitter !== this.state.fitter) {
      let { fitter, dataAll, fitterAll } = this.state
      if (fitter) {
        for (let name in fitterAll) {
          fitterAll[name].length = 0
        }
        for (let name in dataAll) {
          let data = dataAll[name]
          for (let obj in data) {
            fitterAll[name].push({ ...data[obj] })
          }
        }
        this.setState(preState => preState)
      }
    }
  }
  // --------------------------------------------------------------------
  // __________________________________________________________________________________

  // __________________________________ Action ต่างๆๆ __________________________________

  // -------------- ตรวจสอบว่า checkbox allในแต่ละส่วนใช่หรือไม่ --------------
  checkAllCheckBox(name) {
    if (this.state.fitterAll[name].find(obj => obj.check === false) !== undefined) {
      this.state.amountCheckAll[name] = false
    } else {
      this.state.amountCheckAll[name] = true
    }
  }
  // ----------------- เปลี่ยนข้อมูล checkbox ของแต่ละ user -----------------
  changeCheck(item) {
    item.check = !item.check
    this.setState(preState => preState)
  }
  // --------------------------------------------------------------------
  // -------------------- เปลี่ยนข้อมูล checkbox ทั้งหมด ---------------------
  changeAll(name, amountList) {
    let setBoolean = !amountList
    let lst = this.state.fitterAll[name]

    for (let obj in lst) {
      lst[obj].check = setBoolean
    }
    this.state.amountCheckAll[name] = setBoolean
    this.setState(preState => preState)
  }
  // --------------------------------------------------------------------
  // ------------------ SET การ SHOW ข้อมูล USER ทั้งหมด -------------------
  setShowAll(name) {
    let { showAll } = this.state
    showAll[name] = !showAll[name]
    this.setState(preState => preState)
  }
  // --------------------------------------------------------------------
  // ---------------- ONCLICK ที่เกี่ยวข้องกับ BUTTON ทั้งหมด ------------------
  onClk(name) {
    let { dataAll, fitterAll, showAll } = this.state
    if (name === 'Send') {
    } else {
      if (name === 'OK') {
        for (let name in dataAll) {
          dataAll[name].length = 0
        }
        for (let name in fitterAll) {
          let data = fitterAll[name]
          for (let obj in data) {
            dataAll[name].push({ ...data[obj] })
          }
        }
      }
      // for (let name in showAll) {
      //   showAll[name] = false
      // }
      this.setState({ fitter: false, inputSearch: '', buttonDisable: false })
    }
  }
  // --------------------------------------------------------------------
  // __________________________________________________________________________________

  // ___________________________________ SET LAYOUT ___________________________________
  setList(item, index) {
    if (this.state.fitter) { // ------------- กล่อง fitter -------------
      if ((item.name).toLowerCase().includes(this.state.inputSearch.toLowerCase())) {
        let classN = item.check ? "fa fa-check-square" : "far fa-square";
        return (
          <li key={"set-list-li-" + index}>
            <div className="chat-user" onClick={() => this.changeCheck(item)}>
              <i className={classN}></i> {item.name}
            </div>
          </li>
        )
      }
    } else { // ------------- กล่อง show ข้อมูล -------------
      if (item.check) {
        return (
          <li key={"set-list-li-2-" + index}>
            <div className="chat-user" style={{ cursor: 'context-menu' }}>
              {item.name}
            </div>
          </li>
        )
      }
    }
  }
  // --------------------------------------------------------------------
  // --------------------------- กล่อง fitter ----------------------------
  setFitter(name) {
    let booleanAmount = this.state.amountCheckAll[name]
    let arrow = this.state.showAll[name] ? 'fa fa-angle-down' : 'fa fa-angle-left'
    let classN = booleanAmount ? "fa fa-check-square"
      : this.state.fitterAll[name].find(obj => obj.check === true) ? "fa fa-minus-square"
        : "far fa-square"
    return (
      <div>
        <li>
          <div className="chat-user">
            <div style={{ width: '90%' }}>
              <span onClick={() => this.changeAll(name, booleanAmount)}>
                <i class={classN}></i> {name} ทุกคน</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2, width: '10%' }} onClick={() => this.setShowAll(name)}>
              <span className={arrow}></span>
            </div>
          </div>
        </li>
        {(this.state.showAll[name] || this.state.inputSearch !== '') &&
          <div>
            {this.state.fitterAll[name].map((item, index) => this.setList(item, index))}
          </div>}
      </div>
    )
  }
  // --------------------------------------------------------------------
  // --------- ตรวจสอบว่าเป็นกล่อง fitter หรือ กล่อง show ข้อมูลเท่านั้น ---------
  getData() {
    let lst = []
    for (let name in this.state.dataAll) {
      if (this.state.fitter) { // --------------- กล่อง fitter ---------------
        this.checkAllCheckBox(name)
        lst.push(this.setFitter(name))
      } else { // --------------- กล่อง show ข้อมูล ---------------
        lst.push(this.state.dataAll[name].map((item, index) => this.setList(item, index)))
      }
    }
    return lst
  }
  // --------------------------------------------------------------------
  // ---------------- ตรวจสอบว่า list ที่ show มีข้อมูลหรือไม่ -----------------
  checkEmpty() {
    let { dataAll } = this.state
    let empty = true
    for (let name in dataAll) {
      if (dataAll[name].find(obj => obj.check === true)) {
        empty = false
        break
      }
    }
    return empty
  }
  // --------------------------------------------------------------------
  // __________________________________________________________________________________

  // _____________________________________ RENDER _____________________________________
  render() {
    return (
      <div className="panel-body">
        <Input className="search-message-box" onMouseDown={() => this.setState({ fitter: true, buttonDisable: true })}
          onChange={(e) => this.setState({ inputSearch: e.target.value })}
          value={this.state.inputSearch}
          placeholder='Search for Somethings...'></Input>

        <div className="panel panel-default" style={{ marginBottom: 0 }} >
          <div className="panel-body2 box-list scroll" >
            <ul className="folder-list m-b-md" style={{ padding: 0 }}>
              {/* ___________________ SET LAYOUT ___________________ */}
              {this.getData()}
              {(this.checkEmpty() && this.state.fitter === false) &&
                <div style={{ color: 'gray', fontSize: 14 }}>
                  Search...
                </div>}
              {/* __________________________________________________ */}
            </ul>
          </div >
        </div>
        {/* ___________________ BUTTON FITTER ___________________ */}
        {this.state.fitter &&
          <div style={{ marginTop: 5 }}>
            <Button size="xs" style={{ float: 'right', backgroundColor: '#1ab394', borderRadius: 2.5, color: 'white' }}
              onClick={() => this.onClk('OK')}>OK</Button>
            <Button size="xs" style={{ float: 'right', backgroundColor: '#D3D3D3', borderRadius: 2.5, marginRight: 10, color: 'white' }}
              onClick={() => this.onClk('cancel')}>cancel</Button>
          </div>
        }
        {/* _____________________________________________________ */}
        {/* ____________________ SET LAYOUT _____________________ */}
        <div style={{ marginBottom: 10 }} />
        <h4>Message</h4>
        <textarea className="form-control" rows="4"></textarea>
        <br />
        <Button size="xs" color="default" style={{ backgroundColor: '#1ab394', float: 'right' }}
          onClick={() => this.onClk('Send')}
          disabled={this.state.buttonDisable}>Send</Button>
        {/* _____________________________________________________ */}

      </div >
    )
  }
}


const mapStateToProps = (state) => ({
  //   getIDSuccess: state.driver.getIDSuccess,
  groupType: state.signin.groupType,
  businessPartnerId: state.signin.businessPartnerId,
  currentUser: state.signin.currentUser,
  dataUser: state.message.dataUser,

});

const mapDispatchToProps = (dispatch) => ({
  getDataUser: (id, typeForm) => dispatch(MessageActions.getDataUser(id, typeForm)),



  // setTest: test => dispatch(PopupActions.setTest(test))
});


export default connect(mapStateToProps, mapDispatchToProps)(MessageBox)
