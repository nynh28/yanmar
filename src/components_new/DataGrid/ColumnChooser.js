import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommonActions from '../../Redux/CommonRedux'
import Draggable from 'react-draggable';
import { Checkbox, Row } from 'antd';
import './Table.css'
import { t } from '../../helpers/Translation'

class ColumnChooser extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(checkedValues) {
    let { column } = this.props
    let config = []
    for (let idx in column) {
      let index = checkedValues.findIndex(x => x === column[idx].column_name);
      if (index >= 0)
        config.push({ column_name: column[idx].column_name, visible: true })
      else
        config.push({ column_name: column[idx].column_name, visible: false })
    }

    this.props.onChangeColumnOption(config)
  }

  render() {
    let { column, visibleColumnList, columnChooserVisible } = this.props
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };

    let ColumnChooser = []
    column && column.map((item) => {
      let index = visibleColumnList.findIndex(x => x.dataField === item.column_name);
      if (index >= 0) ColumnChooser.push(item.column_name)
    })

    return columnChooserVisible ? <Draggable bounds={{ top: -100, left: -480 }} handle="strong" {...dragHandlers} >
      <div className="ibox float-e-margins box-column-chooser" >
        <strong>
          <div className="box-column-chooser-title" style={{ cursor: 'move' }}>
            <div className="icon-hover" style={{ float: 'right', paddingTop: 5 }}>
              <i className="dx-icon dx-icon-close" onClick={() => this.props.setValue("columnChooserVisible", false)} ></i>
            </div>
            <b>{t('dg_select_item')}</b>
          </div>
        </strong>
        <div className="ibox-content" style={{ padding: '0px', backgroundColor: '#fff' }}>
          <div className="ibox-content-chooser" style={{ height: 260, width: 240, padding: 15 }}>
            <style type="text/css">
              {`
          ::-webkit-scrollbar {
            width: 5px;
          }

          ::-webkit-scrollbar-track {
            background: #f1f1f1;
          }

          ::-webkit-scrollbar-thumb {
            background: #cacaca;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }

          .ibox-content-chooser:hover {
            -webkit-mask-position: left top;
          }
          `}
            </style>

            <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange} defaultValue={ColumnChooser}>
              {column && column.map((item) => {
                return (
                  [<Checkbox value={item.column_name}> <span style={{ fontWeight: 100 }}>{t(item.column_caption)}</span></Checkbox>, <br />]
                )
              })}

            </Checkbox.Group>
          </div>

        </div>
      </div>
    </Draggable > : ""
  }
}

const mapStateToProps = (state) => ({
  columnChooserVisible: state.common.columnChooserVisible,
  visibleColumnList: state.common.visibleColumnList,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(CommonActions.setValue(name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ColumnChooser)
