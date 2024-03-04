import React, { Component } from 'react'

export class ArrayFieldTemplateNoSeperator extends Component {

  render() {
    const { props } = this
    // console.log(props)
    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontWeight: 'bold' }}>{props.schema && props.schema.label || ''}</span>
        </div>
        {props.items.map((element, i) => {
          // console.log(element)
          return <div key={element.key}
            style={{ marginTop: 0, }}>

            <div style={{ marginRight: 15, width: '90%', float: 'left' }}>{element.children}</div>
            <button style={{ width: 30, height: 30, float: 'left' }} type="button"
              onClick={element.onDropIndexClick(element.index)}>-</button>
            <div style={{ clear: 'both' }}></div>
          </div>
        })}
        {props.canAdd && <div style={{ marginTop: 10, clear: 'both' }}>
          <button type="button" onClick={props.onAddClick}>+</button>
        </div>
        }
      </div>
    );
  }
}
