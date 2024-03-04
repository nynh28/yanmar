import React, { Component } from 'react'

export class ArrayFieldForm extends Component {

  render() {
    const { props } = this
    // console.log(props)
    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontWeight: 'bold' }}>{props.schema && props.schema.label || ''}</span>
        </div>

        {props.items.map((element, i) => {
          console.log(element)
          return <div key={element.key}
            style={{ marginTop: 0, }}>
            <div style={{ marginRight: 15, width: '90%', float: 'left' }}>{element.children}</div>
          </div>
        })}
      </div>
    );
  }
}
