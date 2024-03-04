import React from "react";
import CheckBox from "devextreme-react/check-box";
import { t } from '../../Components/Translation';
import { numberWithComma } from '../../Functions/Calculation';
import { useTranslation } from 'react-i18next'

const Name = (arg) => {
  const { t } = useTranslation()
  return <td style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', border: 0 }} title={t(arg.groupText)}>{t(arg.groupText)}</td>
}

class GroupTemplate extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <table id='row-header' style={{ width: '100%', tableLayout: 'fixed' }}>
          <tbody>
            <tr>
              <td style={{ width: 30, border: 0 }}>
                <CheckBox
                  value={this.props.checked}
                  onValueChanged={this.props.onValueChanged}
                />
              </td>
              <Name groupText={this.props.groupText} />
              <td style={{ textAlign: 'right', width: 130, border: 0 }}>
                <div >
                  <span>{numberWithComma(this.props.total)}</span>{' '}
                  <span >{t(this.props.textTotal)}</span>{' '}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* <CheckBox
          value={this.props.checked}
          onValueChanged={this.props.onValueChanged}
        />
        <span style={{ marginLeft: "5px", overflow: 'hidden', textOverflow: 'ellipsis' }}> {this.props.groupText} </span>
        <div style={{ float: 'right' }}>
          <span>{this.props.total}</span>{' '}
          <span >{t(this.props.textTotal)}</span>{' '}
        </div> */}
      </React.Fragment>
    );
  }
}

export default GroupTemplate;
