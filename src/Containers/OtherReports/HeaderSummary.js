import React, { Component } from 'react'
import { BoxContrainer, Button } from "../../components_new";

export default class HeaderSummary extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { component: Component, ...rest } = this.props
    return (
      <BoxContrainer>
        <div className='flex flex-row'>
          <div className='basis-3/4' style={{ marginBottom: -17 }}>
            {this.props.children}
          </div>

          <div className='basis-1/4' style={{ textAlign: 'end' }}>
            <Button
              size="small"
              className="ant-btn-primary-outline"
              icon={<i className="fa fa-cogs" style={{ width: 15, marginRight: 4 }} />}
              text="other_reports_23"
              onClick={() => this.props.onClick()}
            />
          </div>
        </div>
      </BoxContrainer>
    )
  }
}
