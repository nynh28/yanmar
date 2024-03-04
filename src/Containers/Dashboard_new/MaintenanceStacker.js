import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const MaintenanceStacker = () => {
    useEffect(() => {
        const chartDom = document.getElementById('nynhvu');
        const myChart = echarts.init(chartDom);
        const resizeChart = () => {
            myChart.resize();
        };

        // Attach the resize function to the window resize event
        window.addEventListener('resize', resizeChart);

        // Initial resize to set the correct dimensions on component mount
        resizeChart();
        const series = [
            { data: [10, 46, 64, 28, 22], type: 'bar', stack: 'a', name: 'Late', color: '#F4B73F' },
            { data: [120, 200, 150, 80, 92], type: 'bar', stack: 'a', name: 'On Time', color: '#4AA3E7' },
           

        ];

        const stackInfo = {};
        for (let i = 0; i < series[0].data.length; ++i) {
            for (let j = 0; j < series.length; ++j) {
                const stackName = series[j].stack;
                if (!stackName) {
                    continue;
                }
                if (!stackInfo[stackName]) {
                    stackInfo[stackName] = {
                        stackStart: [],
                        stackEnd: []
                    };
                }
                const info = stackInfo[stackName];
                const data = series[j].data[i];
                if (data && data !== '-') {
                    if (info.stackStart[i] == null) {
                        info.stackStart[i] = j;
                    }
                    info.stackEnd[i] = j;
                }
            }
        }
        for (let i = 0; i < series.length; ++i) {
            const data = series[i].data;
            const info = stackInfo[series[i].stack];
            for (let j = 0; j < series[i].data.length; ++j) {
                // const isStart = info.stackStart[j] === i;
                const isEnd = info.stackEnd[j] === i;
                const topBorder = isEnd ? 3 : 0;
                const bottomBorder = 0;
                data[j] = {
                    value: data[j],
                    itemStyle: {
                        borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
                    }
                };
            }
        }

        const option = {
            legend: {
                bottom: '5%',
                left: '30%',
                data: ['On Time', 'Late']
            },
            title: {
                text: 'Maintenance ',
                textStyle: {
                    fontFamily: 'Poppins',
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#515151',
                }
            },
            grid: {
                // Đặt chiều rộng tối đa cho trục x
                width: '65% ',
                // ... (các thuộc tính khác)
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                padding: 10,
                formatter: function (params) {

                    // Customize only the content, keep default style
                    const xAxisValue = params[0].axisValue;
                    const formattedValue = xAxisValue.length > 10 ? xAxisValue.substring(0, 10) + '...' : xAxisValue;

                    // Build the tooltip content with custom styling for each part
                    let tooltipContent = `<div style="font-size: 16; color: #515151;">${formattedValue}</div>`;

                    params.forEach((param) => {
                        let dot = `<div style="display:inline-block; width:10px; height:8px; background-color:${param.color}; border-radius:30%; margin-right:5px;"></div>`;
                        tooltipContent += `<div style="color: #515151; font-size:14px "> ${dot}${param.seriesName} <div style="margin-left:15px; color: #B6B1B1; font-size: 14px"> ${param.value} units </div> </div>`;
                    });

                    return tooltipContent;
                },
            },
            xAxis: {
                type: 'category',
                name: ' Dealer',
                nameTextStyle: {
                    color: '#515151',
                },
                nameLocation: 'start',
                axisTick: { show: false },
                axisLabel: {
                    interval: 0,
                    formatter: function (value) {
                        // Bạn có thể tùy chỉnh hàm formatter nếu cần
                        // Ví dụ, bạn có thể giới hạn số ký tự được hiển thị
                        return value.length > 6 ? value.substring(0, 6) + '...' : value;
                    },
                    ellipsis: true, // Hiển thị dấu ba chấm cho nhãn bị cắt bớt
                },


                data: ['Mon djdha adjakdlad ad djakdal', 'Tue', 'Wed', 'Thu', 'kkkk'],
            },
            yAxis: {
                show: false,
                type: 'value',
            },
            series: series.map(item => ({
                ...item,
                barWidth: 35, // Adjust the width of the bars as needed
            })),
        };

        myChart.setOption(option);

        // Clean up when the component unmounts
        return () => {
            // Remove the event listener to avoid memory leaks
            window.removeEventListener('resize', resizeChart);

            myChart.dispose();
        };
    }, []); // Empty dependency array means this effect runs once after the initial render

    return <div id="nynhvu" style={{ width: '130%', height: '100%', padding: '2% 2% 0 2%', }}></div>;
};

export default MaintenanceStacker;
