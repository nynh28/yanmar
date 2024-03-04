import React, { useState, Suspense, useEffect } from 'react'
import { connect } from 'react-redux'
import PannelBox from '../../Components/PannelBox'
import Table from '../../Components/DataGridView/Table'
import { t } from '../../Components/Translation'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import { get } from 'lodash'
import './styles.css'
import DataExport from './DataExport'

const TIRE_CATEGORYS = [6, 10], STATUS = [3, 5]
const MONTS = ['common_2', 'common_3', 'common_4', 'common_5', 'common_6', 'common_7', 'common_8', 'common_9', 'common_10', 'common_11', 'common_12']
const date = new Date();
const CURRENT_YEAR = date.getFullYear(), CURRENT_MONTH = date.getMonth(), CURRENT_DATE = date.getDate()


const ActivationReport = (props) => {
  let { header, language, dataLogin } = props

  const [dataSource, setDataSource] = useState([
    {
      status: 'เปิดใช้งานแล้ว',
      tire_category_ten: 0,
      tire_category_six: 0,
      total: 0,
      score: 0
    },
    {
      status: 'ยังไม่ลงทะเบียน (คิดเฉพาะเลขไมล์มากกว่า 2,000 กม.)',
      tire_category_ten: 0,
      tire_category_six: 0,
      total: 0,
      score: ''
    },
    {
      status: 'รวมทั้งหมด',
      tire_category_ten: 0,
      tire_category_six: 0,
      total: 0,
      score: ''
    },
    {
      status: '% การลงทะเบียน HINO CONNECT',
      tire_category_ten: 0,
      tire_category_six: 0,
      total: 0,
      score: ''
    }
  ])


  useEffect(() => {

    getActivationReport()
  }, [])

  const getActivationReport = async () => {
    try {

      var response = await fetch(ENDPOINT_BASE_URL + "Vehicles/Activation", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': language,
          'Authorization': header.idToken,
          'X-API-Key': header.redisKey
        }
      });

      var data = await response.json();

      if (data.length > 0) {
        // console.log("data : ", data)

        // Fillter by Tire Category
        let groupTireCategory = []
        TIRE_CATEGORYS.forEach(tire => {
          var result = data.filter(function (el) {
            return el.tireCategory === tire
          })

          groupTireCategory.push({
            tireCategory: tire,
            data: result
          })
        })

        // console.log("groupTireCategory : ", groupTireCategory)

        // Fillter by Status
        let groupStatus = []
        groupTireCategory.forEach(tireGroup => {
          STATUS.forEach(status => {
            var result = tireGroup.data.filter(function (el) {
              return el.status === status
            })
            if (result.length > 0) {
              let sum = 0
              sum = sumColumn(result, 'total')

              groupStatus.push({
                status,
                sum,
                tireCategory: tireGroup.tireCategory
              })
            }
          })
        })

        if (groupStatus.length > 0) {
          let RegisterTire = filterByStatus(groupStatus, 'status', 5)
          let UnregisterTire = filterByStatus(groupStatus, 'status', 3)

          let sum_register = 0, sum_unregister = 0
          sum_register = sumColumn(RegisterTire, 'sum')
          sum_unregister = sumColumn(UnregisterTire, 'sum')

          let registerSixTire = filterByStatus(RegisterTire, 'tireCategory', 6)
          let registerTenTire = filterByStatus(RegisterTire, 'tireCategory', 10)
          let unregisterSixTire = filterByStatus(UnregisterTire, 'tireCategory', 6)
          let unregisterTenTire = filterByStatus(UnregisterTire, 'tireCategory', 10)
          let sum_register_tire_six = get(registerSixTire, '[0].sum', 0), sum_register_tire_ten = get(registerTenTire, '[0].sum', 0)
          let sum_unregister_tire_six = get(unregisterSixTire, '[0].sum', 0), sum_unregister_tire_ten = get(unregisterTenTire, '[0].sum', 0)
          let sum_tire_category_six = sum_register_tire_six + sum_unregister_tire_six
          let sum_tire_category_ten = sum_register_tire_ten + sum_unregister_tire_ten
          let percen_tire_category_ten = ((sum_register_tire_ten / sum_tire_category_ten) * 100).toFixed('0')
          let percen_tire_category_six = ((sum_register_tire_six / sum_tire_category_six) * 100).toFixed('0')
          let percen_total = ((sum_register / (sum_register + sum_unregister)) * 100).toFixed('0')

          let summary = [...dataSource]
          summary[0].tire_category_ten = sum_register_tire_ten
          summary[0].tire_category_six = sum_register_tire_six
          summary[0].total = sum_register
          summary[0].score = scoreOfRange(percen_total)
          summary[1].tire_category_ten = sum_unregister_tire_ten
          summary[1].tire_category_six = sum_unregister_tire_six
          summary[1].total = sum_unregister
          summary[2].tire_category_ten = sum_tire_category_ten
          summary[2].tire_category_six = sum_tire_category_six
          summary[2].total = (sum_register + sum_unregister)
          summary[3].tire_category_ten = `${percen_tire_category_ten}%`
          summary[3].tire_category_six = `${percen_tire_category_six}%`
          summary[3].total = `${percen_total}%`

          // console.log("summary : ", summary)

          setDataSource(summary)
        }
      }
    } catch { }
  }

  const filterByStatus = (data, column, value) => {
    var result = data.filter(function (el) {
      return el[column] === value
    })
    return result
  }

  const sumColumn = (data, columnName) => {
    let total = 0
    data.forEach(obj => {
      for (let property in obj) {
        if (property === columnName)
          total += obj[property];
      }
    })
    return total
  }

  const scoreOfRange = (percen) => {
    if (percen >= 0 && percen <= 19)
      return 0
    else if (percen >= 20 && percen <= 39)
      return 25
    else if (percen >= 40 && percen <= 59)
      return 50
    else if (percen >= 60 && percen <= 79)
      return 75
    else if (percen >= 80)
      return 100
  }

  return (
    <Suspense fallback={null}>
      <PannelBox title={t("activation_report_1")}>
        <div className="row header-tool">
          <div className="col-lg-10">
            <label className="control-label" style={{ fontWeight: 500 }}>
              {`สรุปสถานะการเปิดใช้งาน HINO CONNECT ณ วันที่ ${CURRENT_DATE}`} {t(MONTS[CURRENT_MONTH])} {`${CURRENT_YEAR}`}
            </label>
          </div>
          <div className="col-lg-2" style={{ textAlign: "right" }}>
            <div className="text-right">
              <DataExport
                dataSource={dataSource}
                currentDate={CURRENT_DATE}
                currentMonth={MONTS[CURRENT_MONTH]}
                currentYear={CURRENT_YEAR}
              />
            </div>
          </div>
        </div>

        <Table
          mode={"offline"}
          dataSource={dataSource}
          table_id={8}
          user_id={dataLogin.userId}
          editing={{ enabled: false }}
          cookiesOptions={{
            enable: true,
            name: "ActivationReport"
          }}
          showSetting={false}
          selectionVisible={false}
          headerFilter={false}
          allowSorting={false}
          GroupPanelVisible={false}
          searchPanel={false}
          selectItemVisible={false}
          zoomVisible={false}
          ExportEnable={false}
          column={[
            {
              column_name: 'status',
              column_caption: `สถานะการลงทะเบียน (คิดเฉพาะการแจ้งขายปี ${CURRENT_YEAR})`
            },
            {
              column_name: 'tire_category_ten',
              column_caption: '10W'
            },
            {
              column_name: 'tire_category_six',
              column_caption: '6W'
            },
            {
              column_name: 'total',
              column_caption: 'ทั้งหมด'
            },
            {
              column_name: 'score',
              column_caption: 'คะแนน'
            }
          ]}
        />

      </PannelBox>
    </Suspense>
  )
}
const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  language: state.versatile.language,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivationReport)

