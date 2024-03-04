import React from 'react'
import './styles.css'
import Icon from '../Icons'
import FormLoading from '../FormLoading'
import { t } from '../../helpers/Translation'


export default (props) => {
  let {
    id,
    children = "",
    title = "",
    headerTitle = "",
    icon = "",
    className,
    boxContentStyles,
    boxContentClass,
    boxContrainerStyles,
    formLoading = false,
    iconAwesome,
    toolbarRight = "",
    toolbarLeft = "",
    toolbarRightStyles,
    headerTextAlign = 'left',
    footer = "",
    totalAlertSummary = "",
    isDevelop = false,
    isTran = true
  } = props

  const styleAlertSummary = {
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '15px',
    lineHeight: '20px',
    color: '#0A84FF',
    marginLeft: '10px'
  }

  return (
    <div className={className + ' box-contrainer'} style={{ ...boxContrainerStyles }}>
      {
        title !== "" && <div className={children !== "" ? "box-header" : "box-header-only"} >
          <div className="hd-left" style={{ textAlign: headerTextAlign }}>
            {iconAwesome !== "" && iconAwesome}
            {icon !== "" && <Icon iconName={icon} marginTop={-7} width={24} />}<span title={headerTitle} style={{ fontWeight: 600, color: '#252525' }}>{isTran ? t(title) : title}  {totalAlertSummary !== '' && (<span style={styleAlertSummary}> ({totalAlertSummary}) </span>)}</span>
            {toolbarLeft !== "" && toolbarLeft}

            {isDevelop && <span style={{ color: 'red' }}>(อยู่ระหว่างการพัฒนา)</span>}
          </div>

          {toolbarRight !== "" &&
            <div className="hd-right" style={{ ...toolbarRightStyles }}>
              <div style={{ textAlign: 'right', marginRight: 12 }}>{toolbarRight}  </div>
            </div>
          }
        </div>
      }

      {
        children !== "" && <div className={boxContentClass + " box-content"} style={{ ...boxContentStyles, opacity: formLoading ? 0.5 : 1 }}>
          {formLoading && <FormLoading />}
          {children}
        </div>
      }

      {footer !== "" && <div className="box-footer">
        {footer}
      </div>}

    </div >
  )
}
