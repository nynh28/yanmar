import React from 'react'
import './styles.css'
import { Collapse, Select } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { t } from '../../helpers/Translation';
import { get } from 'lodash'

const { Panel } = Collapse;
const { Option } = Select;

export default (props) => {
  let {
    id,
    panels,
    expandIconPosition = 'right',
    marginTop = 7,
    onChange,
    defaultActiveKey = ['1'],
    onOpen
  } = props

  const callback = (key) => {
    if (get(props, 'onOpen')) onOpen(key.length === 0 ? false : true)
  }

  return (
    <>
      <Collapse
        className='custom-collaps'
        defaultActiveKey={defaultActiveKey}
        onChange={callback}
        expandIconPosition={expandIconPosition}
        style={{ marginTop }}
      >
        {
          panels.map((panel) => {
            return <Panel
              header={panel.isHeanderTitle === undefined ? t(panel.title) : panel.isHeanderTitle ? t(panel.title) : panel.titleElement}
              key={panel.key}
              extra={panel.toolbarRight}
            >
              {panel.children}

              {panel.footer && <>
                <div className="hr-line-dashed" />
                {panel.footer}
              </>}
            </Panel>
          })
        }
        <style type="text/css">
          {` 
          .ant-collapse-header > span{
            font-weight: 600;
          }
       `}
        </style>
      </Collapse>
    </>
  )
}