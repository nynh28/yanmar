import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { Row } from 'reactstrap'
import { t } from '../../Components/Translation'

class LoadingPercent extends Component {
    render() {
        let { percent } = this.props
        return <Suspense fallback={null}>
            {percent < 100 && <center>
                <Row >
                    <label className="control-label" style={{ fontWeight: 500 }}>
                        {t("loading")} {percent} {' %'}
                    </label>
                </Row>
            </center>
            }
        </Suspense>
    }
}

const mapStateToProps = (state) => ({
    percent: state.otherReport.percent
});

export default connect(mapStateToProps)(LoadingPercent)