import React, { Suspense, useState } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import PannelBox from '../../Components/PannelBox'
import { t } from '../../Components/Translation'
import Loading from './Loading'
import DataTable from './DataTable'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import DatePicker from './Datepicker'
import moment from 'moment'

var today = new Date();
var toDayDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()

const ReportNamheng = (props) => {
  const [booking_date, setBookingDate] = useState(toDayDate)
  const [isLoading, setIsLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])

  const getDataReport = async () => {
    setIsLoading(true)
    try {
      let _booking_date = moment(booking_date, 'DD/MM/YYYY').format('YYYY-MM-DD')
      var response = await fetch(`${ENDPOINT_BASE_URL}fleet/report/namheng?booking_date=${_booking_date}&user_id=${props.dataLogin.userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      var data = await response.json();
      if (data.message === "ok")
        setDataSource(data.result)
      else
        setDataSource([])

      setIsLoading(false)
    } catch {
      setIsLoading(false)
      setDataSource([])
    }
  }

  const onChangeDate = (name, value) => {
    setBookingDate(value)
  }

  return <Suspense fallback={null}>
    <Loading isLoading={isLoading} />
    <div className="row">
      <div className="col-md-12">
        <div className="ibox" style={{ marginBottom: 7 }}>
          <div className="ibox-title"   >
            <div className="row">
              <div className="col-lg-4">
                <h3 style={{ marginTop: 5, fontSize: 18 }}>
                  {t("ERP Integration")}
                </h3>
              </div>
              <div className="col-lg-8" style={{ textAlign: "right" }}>
                <div className="col-md-12 text-right">
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <label className="control-label" style={{ fontWeight: 500, padding: '5px 10px' }}>รายงานวันที่</label>
                    <DatePicker
                      schema={{ "required": [""] }}
                      value={booking_date}
                      fieldForm={"booking_date"}
                      flex={1}
                      onChange={onChangeDate}
                    />
                    <a
                      className="btn btn-white btn-md"
                      style={{ backgroundColor: '#1AB394', color: 'white', marginLeft: 6 }}
                      onClick={() => getDataReport()} >
                      <span style={{ color: "white" }}>{t('ค้นหา')}</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <PannelBox
      style={{ marginTop: -20 }}
      contentStyle={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>
      <DataTable dataSource={dataSource} reportDate={booking_date} />
    </PannelBox>
  </Suspense>
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header
});

export default connect(mapStateToProps)(ReportNamheng)