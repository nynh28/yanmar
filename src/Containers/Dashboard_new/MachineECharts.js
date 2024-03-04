import React from 'react';
import * as echarts from 'echarts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TractorUserActions from '../../Redux/TractorUserRedux'

const MachineEcharts = ({ props }) => {

    const dispatch = useDispatch()
    const {dashboardMachinePieChartData} = useSelector(state => state.tractorUser)
    function tooltip_click_event() {
        // process the event.
        console.log(3)
     }
     
    useEffect(() => {
        const dataNormal = dashboardMachinePieChartData.normal
        const dataWaiting = dashboardMachinePieChartData.waiting
        const dataOverdue = dashboardMachinePieChartData.overdue
        const chartDom = document.getElementById('main');
        const myChart = echarts.init(chartDom);
        const resizeChart = () => {
            myChart.resize();

        };

        // Attach the resize function to the window resize event
        window.addEventListener('resize', resizeChart);

        // Initial resize to set the correct dimensions on component mount
        resizeChart();
        const data = [
            { value: dataNormal, name: 'Normal', status: 0 },
            { value: dataWaiting, name: 'Waiting', status: 1 },
            { value: dataOverdue, name: 'Overdue', status: 2 },

        ]
        const total = data.reduce((acc, curr) => acc + curr.value, 0);

        function tooltip_click_event() {
            // process the event.
            console.log(3)
         }
         
        const option = {
            tooltip: {
                trigger: 'item',
                borderColor: 'transparent',
                classNames: 'rounded-[10px]',
                formatter: function (params) {
                    let dot = `<div className="tooltip-1" style="display:inline-block; width:13px; height:13px; background-color:${params.color}; border-radius:50%; margin-right:5px;"></div>`;
                    const tooltipContent = `<div onclick='tooltip_click_event' class="tooltip-1" style="color: #515151; font-size:14px; font-family: Poppins "> ${dot}${params.name} <div style="margin-left:18px; color: #B6B1B1; font-size: 14px">  ${params.value} units </div> </div>`;
                    return tooltipContent;
                },
            },

            legend: {
                left: '5%',
                orient: 'vertical',
                top: '15%',
                itemGap: 15,
                selectedMode: 'multiple',
                formatter: function (name) {
                    const item = data.find(item => item.name === name);
                    return ` {custom|${name}}\n {customNew|${item.value} units}`;
                },
                textStyle: {
                    rich: {
                        'custom': {
                            fontFamily: 'Poppins',
                            fontWeight: '500',
                            fontSize: '16',
                            color: '#515151',
                            lineHeight: '30'


                        },
                        'customNew': {
                            color: '#C3C3C3',
                            fontFamily: 'Poppins',
                            fontWeight: '500',
                            fontSize: '14',
                        }
                    }
                },
            },
            // visualMap: {
            //     type: 'piecewise',
            //     show: true,
            //     left: '0%',
            //     top: '5%',
            //     itemGap: 20,
            //     selectedMode: 'multiple',
            //     pieces: data.map((item) => ({
            //         value: item.value,
            //         label: (<span> ncm </span>),
            //         // text: 'ấmm,'
            //         // label: ` ${item.name}\n <span>${item.value} units</span>`,

            //     })),
            //     textStyle: {
            //         fontFamily: 'Poppins',
            //         fontWeight: '500',
            //         fontSize: '18',

            //     },
            //     inRange: {
            //         color: ['#E45D33', '#F4B73F', '#4AA3E7',],
            //         colorAlpha: [1, 1, 1],
            //     },
            //     outOfRange: {
            //         color: ['#E45D33', '#F4B73F', '#4AA3E7',],
            //         opacity: 0.3,
            //     },


            // },

            series: [
                {
                    left: '38%',
                    top: '0%',
                    type: 'pie',
                    radius: ['60%', '90%'],
                    avoidLabelOverlap: false,
                    color: ['#4AA3E7', '#F4B73F', '#E45D33',],
                    label: {
                        show: true,
                        position: 'center',
                        formatter: function () {
                            return `{a|${total}}\n{b|units}`;
                        },
                        rich: {
                            a: {
                                fontSize: 40,
                                lineHeight: 30,
                                fontWeight: '700',
                                fontFamily: 'Poppins', // Thêm fontFamily nếu cần
                                color: '#4F5050',   // Thêm màu sắc nếu cần
                            },
                            b: {
                                fontSize: 22,
                                lineHeight: 33,
                                fontWeight: '500',
                                fontFamily: 'Poppins',
                                color: '#BBC1C7'
                            },
                        },
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }
            ]
        };

        myChart.setOption(option);
        myChart.on('click', function (params) {
            console.log(params)
            dispatch(TractorUserActions.setSelectedDashboardMachineStatus(params?.data?.status))
        });

        document.querySelector('body').addEventListener('click', e => {
            if(e.target.classList.contains('exp-charts-tooltip-link')){
                console.log(1)
                // do something ...
            }
            if(e.target.classList.contains('tooltip-1')){
                console.log(2)
              // do something ...
            }
          });
          


        // console.log('kt', option );
        // Clean up when the component unmounts
        return () => {
            // Remove the event listener to avoid memory leaks
            window.removeEventListener('resize', resizeChart);

            myChart.dispose();
        };
    }, [dashboardMachinePieChartData]); // Empty dependency array means this effect runs once after the initial render
    return <div id="main" style={{ width: '100%', height: '100%' }}></div>;
};
export default MachineEcharts;
