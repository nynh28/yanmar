import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import $ from 'jquery'
const { TabPane } = Tabs;

export default class Tabbed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultActiveKey !== "" && nextProps.defaultActiveKey !== undefined && nextProps.defaultActiveKey !== null) {
      if (this.state.activeTab !== nextProps.defaultActiveKey) {
        this.setState({ activeTab: nextProps.defaultActiveKey })

        let id = this.props.id || "tab1"
        let tabElement = document.getElementById(id) || document
        let elm = tabElement.getElementsByClassName("ant-tabs-tab")
        try {
          elm[nextProps.defaultActiveKey].click()
        } catch {
          console.error('error: click() in tabbed.js')
        }
        // try {
        //   let id = this.props.id || "tab1"
        //   let tabElement = document.getElementById(id) || document
        //   let elm = tabElement.getElementsByClassName("ant-tabs-tab")
        //   elm[nextProps.defaultActiveKey].click()
        // } catch {
        //   // let elm = document.getElementsByClassName("ant-tabs-tab")
        //   // try {
        //   //   elm[nextProps.defaultActiveKey].click()
        //   // } catch {
        //   //   console.error('error tabbed.js')
        //   // }
        // }
      }
    }
  }

  onChange = activeKey => {
    this.setState({ activeTab: activeKey });
    if (this.props.onActive !== undefined) {
      this.props.onActive(activeKey)
    }
  }

  componentWillMount() {
    let activeKey = "0"
    this.props.defaultActiveKey !== undefined && (activeKey = this.props.defaultActiveKey + "")
    this.setState({ activeTab: activeKey })
  }

  render() {
    let { activeTab } = this.state
    let { className, id, tabName, tabPane, tabPosition, empty, defaultActiveKey, tabPaneStyles, isTypeCard, tabBarExtraContent } = this.props

    return (
      <div className={className+ " card-container"} id={id || "tab1"} >
        <Tabs
          defaultActiveKey={activeTab}
          tabPosition={tabPosition || 'left'}
          onChange={this.onChange}
          type="card"
          tabBarExtraContent={tabBarExtraContent}
        >
          {
            tabName.map((item, index) => {
              let style = tabPaneStyles ? JSON.parse(JSON.stringify(tabPaneStyles)) : {}
              // if (style.marginTop && index != 0) style.marginTop = 0
              return <TabPane
                tab={item}
                key={index}
                style={style}>
                {
                  empty ? tabPane[index]
                    : <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 2, height: '100%' }}>
                        {tabPane[index]}
                      </div>
                    </div>
                }
              </TabPane>
            })
          }
        </Tabs>
      </div >
    )
  }
}
