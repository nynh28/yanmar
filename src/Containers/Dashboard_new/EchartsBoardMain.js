
import React, { Suspense, useEffect, useState } from "react"
import moment from 'moment'
import arrowImg from './img/arrow-path-rounded-square.png'
import exploreImg from './img/explore.png'
import './dashboardNew.css'
import MachineEcharts from './MachineECharts'
import MaintenanceEcharts from "./MaintenanceEcharts"
import MachineDetail from "./MachineDetail"
import { BoxContrainer } from "../../components_new"
import { Select } from "antd"
import TractorApi from "../../Services/TractorApi"
const { Option } = Select;

const dataMaintenanceChart = [
    {
        time: '01/2023',
        dataChart: {
            seriesOne: Math.floor(Math.random() * 100) + 1,
            seriesTwo: Math.floor(Math.random() * 100) + 1,
        }
    },
    {
        time: '02/2023',
        dataChart: {
            seriesOne: Math.floor(Math.random() * 100) + 1,
            seriesTwo: Math.floor(Math.random() * 100) + 1,
        }
    },
    {
        time: '03/2023',
        dataChart: {
            seriesOne: Math.floor(Math.random() * 100) + 1,
            seriesTwo: Math.floor(Math.random() * 100) + 1,
        }
    },
]
const api = TractorApi.create()

const EchartsBoardMain = () => {

    const [selectValue, setSelectValue] = useState(3)
    const [isLoading, setLoading] = useState(false)
    const [tableData, setTableData] = useState({ result: [], total: 0 })
    const [filterTime, setfilterTime] = useState({ startDate: moment().subtract(3, 'months').unix(), endDate: moment().unix() })
    const [data, setData] = useState({ result: [], total: 0 })
    const [dataMaintenanceChartbar, setDataMaintenanceChartbar] = useState([])
    const [showStacker, setShowStacker] = useState(true)
    const handleClick = () => {
        setShowStacker(!showStacker)
    }


    return (
        <>
            <Suspense fallback={null}>
                <div
                    className="font-pop min-h-[600px] h-[calc(100vh_-_115px)] bg-transparent mt-[7px] p-[5px] pb-0 flex flex-col overflow-hidden"

                >
                    <div className="flex-1 flex flex-col min-h-[400px] box-content-custom">

                        <div className="flex justify-between items-center mb-[10px]">
                            <div className="flex first-element text-center items-center">
                                <p className="font-medium font-pop text-[26px] mb-0 text-[#515151]">{moment().format('dddd DD-MM-YYYY HH:mm:ss')} </p>
                                <div className="bg-[#4190F740] font-pop ml-2 px-3 py-1 rounded-[15px] text-[#0169B6] text-[12px]">
                                    2 minutes ago
                                </div>
                            </div>
                            <button className="flex items-center text-3 bg-red-500 text-white rounded-[7px] p-3 h-[35px]">
                                <div className="mr-3">  <img className="img-reset " src={arrowImg} /></div>
                                Reset
                            </button>

                        </div>

                        <div className="flex flex-1 w-full min-h-[500px] h-[calc(100vh-175px)] gap-[10px]" >
                            <div className="w-[37%] flex gap-[10px] flex-col">
                                <div className="flex-1 flex flex-col bg-[#ffffff] px-[15px] py-[10px] rounded-[22px]">
                                    <div className="title">
                                        <p className="title-panel mb-0 inline-block">Machine</p>
                                        <span className="text-[#489FEA] inline-block ml-2 font-medium">(Real Time)</span>
                                    </div>
                                    <div className="content flex-1">
                                        <MachineEcharts />
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col bg-[#ffffff] px-[15px] py-[10px] rounded-[22px]">
                                    <div className="title">
                                        <div className="flex justify-between items-center">
                                            <p className="title-panel mb-0">Maintenance</p>
                                            <div className="flex gap-3 items-end">
                                                <button onClick={handleClick} ><p className="flex items-center gap-1 hover:bg-[#CB353E] leading-[22px] hover:border-[#CB353E] border-[#dcdcdc] hover:text-white btn font-medium font-pop px-4 rounded-[6px] text-[12px] py-0 text-[#000]" >Dealer</p></button>
                                                <div>

                                                    <Select
                                                        size="small"
                                                        className="w-full text-[12px] font-pop"
                                                        // showSearch
                                                        optionFilterProp="children"
                                                        onChange={(value, id) => {
                                                            setSelectValue(value)
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
                                                </div>

                                                <button className="flex items-center gap-1 hover:bg-[#CB353E] leading-[22px] hover:border-[#CB353E] border-[#dcdcdc] hover:text-white btn font-medium font-pop px-4 rounded-[6px] text-[12px] py-0 text-[#000]">
                                                    <span className="inline-block text-[#99A0A4] text-[12px]">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                        </svg>
                                                    </span>

                                                    Explore
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="content flex-1">
                                        <MaintenanceEcharts data={dataMaintenanceChartbar} />
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
                            <div className="w-[63%] overflow-hidden h-full bg-[#ffffff] rounded-[25px] p-[15px]" >
                                <MachineDetail />
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>
            {/* <>
                <div className="flex justify-between items-center p-2" >
                    <div className="flex first-element text-center items-center">
                        <p className="textTime">{moment().format('dddd')} </p>
                        <p className="textTime">{moment().format('DD-MM-YYYY')}</p>
                        <p className="textTime">{moment().format('HH-mm-ss')}</p>
                        <div className="border-time px-3 py-1 ml-2"> <p className="mb-0">2 minutes ago</p></div>
                    </div>
                    <div className="flex ">
                        <button className="flex items-center bg-[#FFFFFF] text-[#363636] rounded-[7px]  h-[35px] p-3">
                            <p className="mb-0 text-3">Filtered</p>
                        </button>
                        <button class="flex items-center bg-red-500 text-white rounded-[7px] p-3 h-[35px]">
                            <div className="mr-3">  <img className="img-reset " src={arrowImg} /></div>
                            <div > <p className="mb-0 text-3"> Reset</p></div>
                        </button>
                    </div>

                </div>

                <div className="flex w-full min-h-[500] h-[calc(100vh-175px)]" >
                    <div className="w-[37%] h-full">
                        <div className="h-[49%] bg-[#ffffff] rounded-[24px] mb-4">
                            <div className="flex absolute ">
                                <p className="text-1 pl-6 pt-3">Machine</p>
                                <p className="text-2 pl-2 pt-5">(Real Time)</p>
                            </div>
                            <MachineEcharts />
                        </div>
                        <div className="h-[49%] bg-[#ffffff] rounded-[24px] relative ">
                            <div className="flex absolute z-50 right-[3%] mt-5 " >

                                <div className="mr-2 ml-2">
                                    <select className="select-chart-bar text-3 p-1" >
                                        <option value="option1">3 Month</option>
                                        <option value="option2">4 Month</option>
                                        <option value="option3">5 Month</option>
                                    </select>
                                </div>
                                <button className="select-chart-bar flex items-center  h-[30px] p-3">
                                    <img className="img-explore mb-1 mr-3" src={exploreImg} />
                                    <p className="text-3 mb-0">Explore</p>
                                </button>
                            </div>
                            {showStacker ? <MaintenanceEcharts /> : <MaintenanceStacker />}
                            <MaintenanceStacker />
                        </div>
                    </div>
                    <div className="w-[63%] h-full ml-4" >
                        <div className="h-[49%] bg-[#ffffff] rounded-[25px] mb-4">
                            <EchartsStacker />
                        </div>
                        <div className="h-[49%] bg-[#ffffff] rounded-[25px]">
                            <EchartsBoardDetail />
                        </div>
                    </div>
                </div>
            </> */}
        </>
    )
}
export default EchartsBoardMain 