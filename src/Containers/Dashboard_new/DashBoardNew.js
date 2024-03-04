
import React, { Suspense, useEffect, useState } from "react"
import moment from 'moment'
import arrowImg from './img/arrow-path-rounded-square.png'
import exploreImg from './img/explore.png'
import './dashboardNew.css'
import MachineEcharts from './MachineECharts'
import EchartsStacker from './EchartsStacker'

import MaintenanceEcharts from "./MaintenanceEcharts"
import EchartsBoardDetail from "./EchartsBoardDetail"
import MachineDetail from "./MachineDetail"
import { BoxContrainer, LoadingLayout } from "../../components_new"
import { Select } from "antd"
import TractorApi from "../../Services/TractorApi"
import { withRouter } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setDashboardFetchTimeData } from "../../Redux/TractorUserRedux"
import TractorUserActions from '../../Redux/TractorUserRedux'
import { adminRoleId } from "../../Config/app-config"

const { Option } = Select;

// const dataMaintenanceChart = [
//     {
//         time: '01/2023',
//         dataChart: {
//             seriesOne: Math.floor(Math.random() * 100) + 1,
//             seriesTwo: Math.floor(Math.random() * 100) + 1,
//         }
//     },
//     {
//         time: '02/2023',
//         dataChart: {
//             seriesOne: Math.floor(Math.random() * 100) + 1,
//             seriesTwo: Math.floor(Math.random() * 100) + 1,
//         }
//     },
//     {
//         time: '03/2023',
//         dataChart: {
//             seriesOne: Math.floor(Math.random() * 100) + 1,
//             seriesTwo: Math.floor(Math.random() * 100) + 1,
//         }
//     },
// ]
const api = TractorApi.create()
var interval = null
const DashBoardNew = () => {

    const dispatch = useDispatch()
    const { dashboardFetchTimeData } = useSelector(state => state.tractorUser)
    const dataLogin = useSelector((state) => state.signin.dataLogin);

    const [countDown, setCountDown] = useState('Just now')
    const [isLoading, setLoading] = useState(false)
    const [isLoadingMachine, setLoadingMachine] = useState(false)
    const [filterTime, setfilterTime] = useState({ startDate: moment().subtract(2, 'months').unix(), endDate: moment().unix() })
    const [data, setData] = useState({ result: [], total: 0 })

    const [selectValue, setSelectValue] = useState(3)
    const [dataMachine, setDataMachine] = useState([])
    const [countStatusMachine, setCountStatusMachine] = useState({})
    const [dataMachineTable, setDataMachineTable] = useState([])

    const ButtonRoute = withRouter(({ history }) => (
        <button onClick={() => history.push("/Tractor/maintenance")} className="flex items-center gap-1 hover:bg-[#CB353E] leading-[22px] hover:border-[#CB353E] border-[#dcdcdc] hover:text-white btn font-medium font-pop px-4 rounded-[6px] text-[12px] py-0 text-[#000]">
            <span className="inline-block text-[#99A0A4] text-[12px]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
            </span>

            Explore
        </button>
    ))

    const fetchMachineDashboard = async () => {
        setLoadingMachine(true)
        var resp = await api.getListDataMachine('user_id='+dataLogin.user_id);
        var data = resp.data;
        if (data?.code == 200) {
            // setDataMachine(data)
            dispatch(TractorUserActions.setDataMachineDashboard(data.result))
            setLoadingMachine(false)
        } else {
            setLoadingMachine(false)
            // setAlertSetting({
            //     show: true,
            //     type: 2,
            //     ErrorSubcode: 'Something wrong, please try again later.'
            // })
        }
    }

    const fetchData = async () => {
        setLoading(true)
        let params = `startDate=${filterTime.startDate}&endDate=${filterTime.endDate}`;
        try {
            var resp = await api.dataMachineDashBoard(params);
            var data = resp.data;
            if (data?.code == 200) {
                setData(data)
                setLoading(false)
            } else {
                setLoading(false)
            }

        } catch (e) {
            console.log(e)
            setLoading(false)

        }
    }
    useEffect(_ => {
        fetchData()
    }, [filterTime])


    const getDiffTime = (time) => {
        if (time) {

            var duration = moment.duration(moment().diff(time));
            var hours = duration.asHours();
            var minutes = duration.asMinutes();
            var seconds = duration.asSeconds();
            if (hours > 1) {
                return `${Math.trunc(hours)} hours ago`
            } else if (minutes > 1) {
                return `${Math.trunc(minutes)} minutes ago`
            } else {
                return `${Math.trunc(seconds)} seconds ago`
            }
        }

    }

    const resetDashboard = () => {
        dispatch(TractorUserActions.setDashboardFetchTimeData(moment().format()))
        setCountDown('Just now')
        // fetchDataMachine()
        fetchData()
        fetchMachineDashboard()
    }


    useEffect(_ => {
        if (dashboardFetchTimeData) {
            if (interval) {
                clearInterval(interval)
            }
            interval = setInterval(_ => {
                let a = getDiffTime(dashboardFetchTimeData)
                setCountDown(a)
            }, 60 * 1000)
        }
    }, [dashboardFetchTimeData])

    useEffect(_ => {
        dispatch(TractorUserActions.setDashboardFetchTimeData(moment().format()))
        // fetchDataMachine()
        fetchMachineDashboard()
        fetchData()
    }, [])

    return (
        <Suspense fallback={null}>
            {(isLoading || isLoadingMachine) && <LoadingLayout />}
            <div
                className="font-pop min-h-[600px] h-[calc(100vh_-_115px)] bg-transparent mt-[7px] p-[5px] pb-0 flex flex-col overflow-hidden"

            >
                <div className="flex-1 flex flex-col min-h-[400px] box-content-custom">

                    <div className="flex justify-between items-center mb-[10px]">
                        <div className="flex first-element text-center items-center">
                            <p className="font-medium font-pop text-[26px] mb-0 text-[#515151]">{(dashboardFetchTimeData ? moment(dashboardFetchTimeData) : moment()).format('dddd DD-MM-YYYY HH:mm:ss')} </p>
                            <div className="bg-[#4190F740] font-pop ml-2 px-3 py-1 rounded-[15px] text-[#0169B6] text-[12px]">
                                {countDown}
                            </div>
                        </div>
                        <button className="flex items-center text-3 bg-red-500 text-white rounded-[7px] p-3 h-[35px]" onClick={() => resetDashboard()}>
                            <div className="mr-3">  <img className="img-reset " src={arrowImg} /></div>
                            Reset
                        </button>

                    </div>

                    <div className="flex flex-1 w-full min-h-[500px] h-[calc(100vh-175px)] gap-[10px]" >
                        <div className="w-[37%] flex gap-[10px] flex-col">
                            <div className="h-1/2 flex-1 flex flex-col bg-[#ffffff] px-[15px] py-[10px] rounded-[22px]">
                                <div className="title">
                                    <p className="title-panel mb-0 inline-block">Machine</p>
                                    <span className="text-[#489FEA] inline-block ml-2 font-medium">(Real Time)</span>
                                </div>
                                <div className="content flex-1">
                                    <MachineEcharts />
                                </div>
                            </div>
                            <div className="h-1/2 flex-1 flex flex-col bg-[#ffffff] px-[15px] py-[10px] rounded-[22px]">
                                <div className="title">
                                    <div className="flex justify-between items-center">
                                        <p className="title-panel mb-0">Maintenance</p>
                                        <div className="flex gap-3 items-end">
                                            <div>

                                                <Select
                                                    size="small"
                                                    className="w-full text-[12px] font-pop"
                                                    // showSearch
                                                    optionFilterProp="children"
                                                    onChange={(value, id) => {
                                                        setSelectValue(value)
                                                        setfilterTime({ startDate: moment().subtract(value - 1, 'months').unix(), endDate: moment().unix() })
                                                    }}
                                                    value={selectValue}
                                                // onSearch={(input) => {
                                                // this.setState({
                                                //     startSearch: input !== "" ? true : false,
                                                // });
                                                // }}
                                                >
                                                    <Option value={1}>
                                                        <span className="flex items-center gap-3 font-pop font-medium text-[12px]">
                                                            1 Month
                                                        </span>
                                                    </Option>
                                                    <Option value={2}>
                                                        <span className="flex items-center gap-3 font-pop font-medium text-[12px]">
                                                            2 Month
                                                        </span>
                                                    </Option>
                                                    <Option value={3}>
                                                        <span className="flex items-center gap-3 font-pop font-medium text-[12px]">
                                                            3 Month
                                                        </span>
                                                    </Option>
                                                </Select>
                                            </div>

                                            <ButtonRoute />
                                        </div>
                                    </div>

                                </div>
                                <div className="content flex-1">
                                    <MaintenanceEcharts data={data.result} />
                                </div>
                            </div>
                            {/* <div className="h-[49%] bg-[#ffffff] rounded-[24px] relative ">
                                <div className="flex absolute z-50 right-[3%] mt-3 " >
                                    <div className=" select-chart-bar mr-8 px-3 py-1">
                                        <select className=" text-3 " >
                                            <option value="option1">3 Month</option>
                                            <option value="option2">4 Month</option>
                                            <option value="option3">5 Month</option>
                                        </select>
                                    </div>
                                    <button className="select-chart-bar flex items-center py-1 px-3">
                                        <img className="img-explore mr-2 mb-1" src={exploreImg} />
                                        <p className="mb-0 text-3">Explore</p>
                                    </button>
                                </div>
                                <MaintenanceEcharts />
                            </div> */}
                        </div>

                        {
                            dataLogin.role_id == adminRoleId ? (
                                <div className="w-[63%] flex gap-[10px] flex-col" >
                                    <div className="h-1/2 flex-1 flex flex-col bg-[#ffffff] px-[15px] py-[10px] rounded-[22px]">
                                        <div className="title">
                                            <p className="title-panel mb-0 inline-block">Views By Dealer</p>
                                            {/* <span className="text-[#489FEA] inline-block ml-2 font-medium">(Real Time)</span> */}
                                        </div>
                                        <div className="content flex-1">
                                            <EchartsStacker />
                                        </div>
                                    </div>
                                    <div className="h-1/2 flex-1 flex flex-col bg-[#ffffff] px-[15px] py-[10px] rounded-[22px]">
                                        <div className="title">
                                            <div className="flex justify-between items-center">
                                                <p className="title-panel mb-0">Filtered</p>
                                                <div className="flex gap-3 items-end">
                                                    {/* <div>

                                                        <Select
                                                            size="small"
                                                            className="w-full text-[12px] font-pop"
                                                            // showSearch
                                                            optionFilterProp="children"
                                                            onChange={(value, id) => {
                                                                setSelectValue(value)
                                                                setfilterTime({ startDate: moment().subtract(value - 1, 'months').unix(), endDate: moment().unix() })
                                                            }}
                                                            value={selectValue}
                                                        // onSearch={(input) => {
                                                        // this.setState({
                                                        //     startSearch: input !== "" ? true : false,
                                                        // });
                                                        // }}
                                                        >
                                                            <Option value={3}>
                                                                <span className="flex items-center gap-3 font-pop font-medium text-[12px]">
                                                                    3 Month
                                                                </span>
                                                            </Option>
                                                            <Option value={6}>
                                                                <span className="flex items-center gap-3 font-pop font-medium text-[12px]">
                                                                    6 Month
                                                                </span>
                                                            </Option>
                                                            <Option value={12}>
                                                                <span className="flex items-center gap-3 font-pop font-medium text-[12px]">
                                                                    1 Year
                                                                </span>
                                                            </Option>
                                                        </Select>
                                                    </div> */}

                                                    <ButtonRoute />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="content pt-2 flex-1 overflow-hidden">
                                            <EchartsBoardDetail />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-[63%] overflow-hidden h-full bg-[#ffffff] rounded-[25px] p-[15px]" >
                                    <MachineDetail />
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </Suspense>

    )
}
export default DashBoardNew
