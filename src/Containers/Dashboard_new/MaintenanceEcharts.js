import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import moment from 'moment';



const MaintenanceEcharts = ({data}) => {
    // const [dataLable, setDataLable] = useState([])
    // const [dataSeries, setDataSeries] = useState([])
    // const [dataSeriesY, setDataSeriesY] = useState([])
    const labels=[]
    const dataSeries=[]
    const dataSeriesY=[]
    data.forEach( (item)=>{
        labels.push((item.month))
        dataSeries.push(item.status_1)
        dataSeriesY.push(item.status_2)
     })



    const getOption = () => {
        return {

            title: {
                textStyle: {
                    fontFamily: 'Poppins',
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#515151',
                }
            },

            legend: {
                bottom: '5%',
                data: ['On Time', 'Late']
            },
            calculable: true,
            xAxis: [
                {
                    name: ' Month',
                    nameTextStyle: {
                        color: '#515151',

                    },
                    nameLocation: 'start',
                    axisTick: { show: false },
                    type: 'category',
                    data: labels,
                    axisLabel:{
                        rotate: data.length > 6 && 40 ,
                        fontSize: data.length > 6 && 10

                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    show: false,
                }
            ],
            series: [
                {
                    name: 'On Time',
                    type: 'bar',
                    data: dataSeries,
                    label: {
                        show: true,
                        position: 'top',

                    },
                    itemStyle: {
                        borderRadius: [5, 5, 5, 5],
                        color: '#0169B6'

                    },

                },
                {
                    name: 'Late',
                    type: 'bar',
                    data:dataSeriesY,
                    label: {
                        show: true,
                        position: 'top',

                    },
                    itemStyle: {
                        borderRadius: [5, 5, 5, 5],
                        color: ' #FFBC2F',
                    }
                },

            ]
        };
    };

    useEffect(() => {
        // You can perform any additional setup or data fetching here
    }, []);

    return (
        <ReactECharts option={getOption()} style={{ height: '100%', width: '110%', padding: '2% 2% 0 2%' }} />
    );
};
export default MaintenanceEcharts;
