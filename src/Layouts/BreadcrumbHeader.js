import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { connect } from 'react-redux'
import VersatileActions from '../Redux/VersatileRedux'
import Images from '../Themes/Images'
import { element } from 'prop-types';
import { listMenuAll } from "./Menu"
import { get } from 'lodash'
class BreadcrumbHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      language: this.props.language
    }
  }
  setBreadCrumb = () => {

  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.language != prevState.language) {
      // newProps.getDataDictionary(newProps.language)
      // return {
      //   language: newProps.language
      // }
    }
  }

  render() {
    const { component: Component, ...rest } = this.props
    const location = rest
    let tmp_path = [...location.location.pathname.split('/')]
    let sidebar = this.props.sidebarArray
    tmp_path.shift()
    // console.log(tmp_path)


    // let leftPath = tmp_path[tmp_path.length - 1].slice(0, 1).toUpperCase() + tmp_path[tmp_path.length - 1].slice(1, tmp_path[tmp_path.length - 1].length)
    let LeftPath2

    let hideBreadcrumb = ['dashboard', 'dashboardJob', 'realtime', 'history', 'privacyandpolicy', 'homePage']

    return (
      <Route {...rest} render={matchProps => {
        return (
          <div
            style={{
              backgroundColor: '#ffffff', marginLeft: -15, marginRight: -15,
              paddingTop: this.props.nonpadding ? 10 : 0
              // paddingTop: 10
            }}
          >
            {!this.props.nonpadding && <div>
              {/* <div style={style || { marginLeft: -15, marginRight: -15 }}> */}
              <img src={Images.ads} style={{ width: "100%", height: 'auto' }} />
            </div >}

            {!hideBreadcrumb.includes(get(tmp_path, '[0]')) &&
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 24, paddingLeft: 30, marginTop: 10, marginBottom: 10 }}>{LeftPath2}</span>
                <Breadcrumb style={{ paddingLeft: 22, paddingRight: 22 }}>
                  {tmp_path.map((e, i) => {
                    let first_character = e.slice(0, 1).toUpperCase()
                    let name = first_character + e.slice(1, e.length)
                    // console.log(name) // Dashboard & DrivingBehaviors
                    let nameMenu
                    let displayName = name
                    listMenuAll.map((e, i) => {
                      if (!e.subMenu) {
                        let linkTo = e.linkTo.slice(0, 1).toUpperCase() + e.linkTo.slice(1, e.linkTo.length)
                        if (linkTo == name) {
                          // name = e[this.props.language]
                          displayName = e[this.props.language]
                          // name2 = e[this.props.language].slice(0, 1).toUpperCase() + e[this.props.language].slice(1, e[this.props.language].length)
                          // Menu ทั้้งหลาย ต้องมี ภาษา ja ก่อน และ แก้ค่ในไฟล์ Header ในเซ็ทเป็น ja ได้
                        }
                      } else {

                        e.subMenu.map((ele, ind) => {
                          let linkTo = ele.linkTo.slice(0, 1).toUpperCase() + ele.linkTo.slice(1, ele.linkTo.length)
                          if (linkTo == name) {
                            // name = ele[this.props.language]
                            nameMenu = e[this.props.language]
                            displayName = ele[this.props.language]
                            // name2 = ele[this.props.language].slice(0, 1).toUpperCase() + ele[this.props.language].slice(1, ele[this.props.language].length)
                            // file Menu.js ทั้้งหลาย ต้องมี ภาษา ja ก่อน และ แก้ค่าในไฟล์ Header.js ในเซ็ทเป็น ja ได้
                          }
                        })
                      }
                    })
                    // let s = name.replace(/([A-Z])/g, ' $1').trim()
                    // console.log(displayName)
                    return [nameMenu &&
                      <BreadcrumbItem key={i} style={{ paddingLeft: 10 }}>
                        <a>
                          {nameMenu}
                        </a>
                      </BreadcrumbItem>
                      ,
                    <BreadcrumbItem key={i} style={{ paddingLeft: 10 }}>
                      <a
                        // onClick={(viewA) => { this.props.setBreadcrumbPath(e) }}
                        href={"#/" + e}
                        style={{ fontWeight: i == tmp_path.length - 1 ? 'bold' : '' }}>
                        {displayName}
                      </a>
                    </BreadcrumbItem>
                    ]
                  })}
                </Breadcrumb>
              </div>
            }
          </div>
        )
      }
      } />

    )
  }
}

const mapStateToProps = (state) => ({
  breadcrumb: state.versatile.breadcrumb,
  language: state.versatile.language,
  sidebarArray: state.versatile.sidebarArray,
})

const mapDispatchToProps = (dispatch) => ({
  setBreadcrumbPath: (data) => dispatch(VersatileActions.setBreadcrumbPath(data)),
  getDataDictionary: (language) => dispatch(VersatileActions.getDataDictionary(language)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BreadcrumbHeader))
