import React, { useCallback, useEffect, useMemo, useState } from "react";
import exploreImg from './img/explore.png'
import './dashboardNew.css'
import { Table } from "antd";
import { InfoCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import * as moment from 'moment'
import { withRouter } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Alert } from "../../Components";


const _debounce = function (ms, fn) {
  var timer;
  return function () {
    clearTimeout(timer);
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this);
    timer = setTimeout(fn.bind.apply(fn, args), ms);
  };
};

const MachineDetail = ({ api, refetch, data }) => {
  const [tableHeight, setTableHeight] = useState(0);
  const [tableData, setTableData] = useState([])
  const [isLoading, setLoading] = useState(false)

  // const {selectedDashboardMachineStatus} = useSelector(state => state.tractorUser)
  const { dashboardMachineDataTable } = useSelector(state => state.tractorUser)

  const ButtonRoute = withRouter(({ history }) => (
    <button onClick={() => history.push("/Tractor/machine")} className="flex items-center gap-1 hover:bg-[#CB353E] leading-[22px] hover:border-[#CB353E] border-[#dcdcdc] hover:text-white btn font-medium font-pop px-4 rounded-[6px] text-[12px] py-0 text-[#000]">
      <span className="inline-block text-[#99A0A4] text-[12px]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </span>

      Explore
    </button>
  ))

  const elementRefBar = useCallback(node => {
    if (!node) return;
    const resizeObserver = new ResizeObserver(_debounce(300, function (muts) {
      // console.log(node.offsetWidth);
      const height = node.offsetHeight
      // console.log(height)
      setTableHeight(height - 55)
    }));
    resizeObserver.observe(node);
  }, []);

  const columns = useMemo(() => {
    return [

      {
        title: 'Status',
        className: 'text-[14px] whitespace-nowrap',
        dataIndex: 'status',
        key: 'status',
        width: '120px',
        render: value => {
          switch (value) {
            case 'Normal':
              return <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#489FEA] bg-[#4190F740] text-[12px] rounded-[15px]">
                <i className="fa fa-circle text-[9px] text-[#4AA3E7]" aria-hidden="true"></i>
                Normal
              </span>
            case 'Waiting':
              return <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#F4B73F] bg-[#F4B73F40] text-[12px] rounded-[15px]">
                <i className="fa fa-circle text-[9px] text-[#F4B73F]" aria-hidden="true"></i>
                Waiting
              </span>
            // return <span className="bg-[#4190F740] text-[#4190F7] text-[14px] px-[8px] py-[4px] rounded-[5px] overflow-hidden font-pop">Waiting</span>
            case 'Overdue':
              return <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#E56234] bg-[#E5623440] text-[12px] rounded-[15px]">
                <i className="fa fa-circle text-[9px] text-[#E45D33]" aria-hidden="true"></i>
                OverDue
              </span>
          }
        }
      },
      {
        title: 'VIN',
        className: 'text-[14px] whitespace-nowrap',
        dataIndex: 'vin_no',
        key: 'vin_no',
      },
      {
        title: 'Model',
        className: 'text-[14px] whitespace-nowrap',
        dataIndex: 'model_code',
        key: 'model_code',
      },
      {
        title: 'Inform time',
        className: 'text-[14px] whitespace-nowrap',
        dataIndex: 'inform_time',
        key: 'inform_time',
        width: 170,
        render: value => value ? moment(value).format('DD/MM/YYYY HH:mm:ss') : '',
      },
      {
        title: 'Customer',
        className: 'text-[14px] whitespace-nowrap',
        dataIndex: 'customer_name',
        key: 'customer_name',
      },
      {
        title: 'Maintenance Type',
        className: 'text-[14px] whitespace-nowrap',
        width: 240,
        dataIndex: 'maintenance_type',
        key: 'maintenance_type',
        // render: value => {
        //     switch(value){
        //         case 1: return 'First maintenance'
        //         case 2: return 'Routine'
        //     }
        // }
      },

    ];
  }, [])

  return (
    <>
      <div className="flex flex-col w-full h-full overflow-hidden">
        <div className='content-header'>
          <div className="flex flex-row space-x-3">
            <p className="title-panel mb-0">
              Machine
            </p>

            <div className="flex-1"></div>

            <div className="text-end">
              <ButtonRoute />
            </div>
          </div>
        </div>
        <div className="content-body flex-1 overflow-hidden" ref={elementRefBar}>
          <div>

            <Table pagination={false}
              loading={isLoading}
              scroll={{ x: 1200, y: tableHeight }}
              className="ant-table-custom"
              size="small"
              rowKey={'vin_no'}
              dataSource={dashboardMachineDataTable}
              columns={columns} />
          </div>
        </div>
      </div>

    </>
    // <div className="py-5 px-7">
    //     <div className="flex justify-between">
    //         <p className="text-1 mb-0">Machine</p>
    //         <button className="select-chart-bar flex items-center px-3">
    //             <img className="img-explore mr-2 mb-1" src={exploreImg} />
    //             <p className="mb-0 text-3 pb-0">Explore</p>
    //         </button>
    //     </div>
    //     <div className="table-machine-detail mt-4">
    //         <table>
    //             <tr>
    //                 <th>Status</th>
    //                 <th>VIN</th>
    //                 <th>Model</th>
    //                 <th>Inform time</th>
    //                 <th>Customer</th>
    //                 <th>maintenance type</th>
    //             </tr>

    //             <tr>
    //                 <td>Normal</td>
    //                 <td>VIN</td>
    //                 <td>Model</td>
    //                 <td>Inform time</td>
    //                 <td>Customer</td>
    //                 <td>maintenance type</td>
    //             </tr>

    //         </table>
    //     </div>
    // </div>
  )
}

export default MachineDetail;
