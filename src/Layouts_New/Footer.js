import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { get } from "lodash";
import { t } from "../Components/Translation";
import VersatileActions from "../Redux/VersatileRedux";

class Footer extends Component {
  render() {
    return (
      <div className="footer fixed">
        <div className="pull-right">Onelink Technology Co.,Ltd. © 2020</div>
        <div>
          {t("last_version_1")}
          {/* {' ('}
          <u
            style={{ cursor: 'pointer', color: 'blue' }}
            onClick={() => {
              if ((get(this, 'props.history.location.pathname')).toLowerCase() !== '/help')
                this.props.history.push({ pathname: '/help', state: 'show_detail_help' })
              else
                this.props.setIsOpenDetail()
            }}
          >
            {t('release_8')}
          </u>
          {')'} */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // language: state.versatile.language,
});

const mapDispatchToProps = (dispatch) => ({
  setIsOpenDetail: () => dispatch(VersatileActions.setIsOpenDetail()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));
