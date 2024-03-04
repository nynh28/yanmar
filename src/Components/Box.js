import React, { Component } from 'react'

export default class Box extends Component {
  render() {
    const { component: Component, ...rest } = this.props
    let { title, footerElement, headerElement, showIboxTitle, iboxContentStyles, headerElementLeft, headerElementStyle } = this.props

    let _showIboxTitle = true
    if (showIboxTitle !== undefined) _showIboxTitle = showIboxTitle
    return (
      <div className="ibox float-e-margins" style={{ marginBottom: 6 }}>
        {
          _showIboxTitle && <div className="ibox-title">
            {title && <h5>{title}</h5>}
            {headerElementLeft && headerElementLeft}

            {
              headerElement && <div className="pull-right" style={headerElementStyle}>
                <div className="btn-group">
                  {headerElement}
                </div>
              </div>
            }
          </div>
        }
        {
          this.props.children && <div className="ibox-content" style={iboxContentStyles}>
            {this.props.children}
          </div>
        }
        {
          footerElement && <div className="ibox-footer">
            {
              footerElement
            }
          </div>
        }
      </div>
    )
  }
}