import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from "reactstrap";
import Box from '../../Components/Box'
import Summary from './Summary'
import DataTable from './DataTable'
import { t } from '../../Components/Translation'
import moment from 'moment';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return <div style={{ marginBottom: 20 }}>
      <Suspense>
        <Summary />
        <Row>
          <Col lg={12}>
            <Box
              title={t("รายละเอียดการเดินทาง")}
            >
              <DataTable />
            </Box>
          </Col>
        </Row>
      </Suspense>
    </div >
  }
}

const mapStateToProps = (state) => ({
  // isProcess: state.hmstDashboard.isProcess,
});

const mapDispatchToProps = (dispatch) => ({
  // filterData: (dateStart, dateEnd) => dispatch(HmstDashboardActions.filterData(dateStart, dateEnd)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
