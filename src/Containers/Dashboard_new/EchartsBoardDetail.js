import React, { useEffect } from "react";
import exploreImg from './img/explore.png'
import './dashboardNew.css'
import { useSelector } from "react-redux";

const EchartsBoardDetail = () => {

    const { dataGroupByDealer } = useSelector(state => state.tractorUser)

    useEffect(_ => {
        console.log(dataGroupByDealer)
    }, [dataGroupByDealer])
    return (
        <div className="table-machine-detail overflow-auto max-h-[100%]">
            <table>
                <tr>
                    <th width="50%">Dealer</th>
                    <th><div className="flex"> < div className="box-color bg-[#4AA3E7]"> </div> Normal  </div> </th>
                    <th><div className="flex"> <div className="box-color bg-[#F4B73F]"> </div> Waiting  </div>  </th>
                    <th> <div className="flex"> <div className="box-color bg-[#E45D33]"> </div>Overdue   </div> </th>
                    <th>Total</th>

                </tr>

                {Object.values(dataGroupByDealer).map(data => {
                    return (
                        <tr>
                            <td>{data[0].dealer_name}</td>
                            <td>{data.filter(i => i.maintenance_status == 0).length}</td>
                            <td>{data.filter(i => i.maintenance_status == 1).length}</td>
                            <td>{data.filter(i => i.maintenance_status == 2).length}</td>
                            <td>{data.length}</td>

                        </tr>
                    )
                })}

            </table>
        </div>
    )
}

export default EchartsBoardDetail;
