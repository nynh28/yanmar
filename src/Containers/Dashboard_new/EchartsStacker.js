import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import { useSelector } from 'react-redux';

const EchartsStacker = () => {

    const { dataChartStackerDealer } = useSelector(state => state.tractorUser)
    // const [isLoading, setLoading] = useState()

    useEffect(_ => {
        if (dataChartStackerDealer) {

        }
    }, [dataChartStackerDealer])

    useEffect(() => {
        const chartDom = document.getElementById('nynh');
        const myChart = echarts.init(chartDom);
        const resizeChart = () => {
            myChart.resize();
        };

        // Attach the resize function to the window resize event
        window.addEventListener('resize', resizeChart);

        // Initial resize to set the correct dimensions on component mount
        resizeChart();
        let label = [...dataChartStackerDealer.label]
        let series = [ ...dataChartStackerDealer.series]
        if (label.length > 0 && series.length > 0) {

            const stackInfo = {};
            for (let i = 0; i < series[0].data_raw.length; ++i) {
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
                    const data = series[j].data_raw[i];
                    if (data && data !== '-') {
                        if (info.stackStart[i] == null) {
                            info.stackStart[i] = j;
                        }
                        info.stackEnd[i] = j;
                    }
                }
            }
            let list1 = []
            for (let i = 0; i < series.length; ++i) {
                var data = series[i].data_raw;
                const info = stackInfo[series[i].stack];
                let d1 =[]
                for (let j = 0; j < series[i].data_raw.length; ++j) {
                    const isStart = info.stackStart[j] === i;

                    const isEnd = info.stackEnd[j] === i;
                    const topBorder = isEnd ? 3 : 0;
                    const bottomBorder = 0;

                    // data[j] = {
                    //     value: data[j],
                    //     itemStyle: {
                    //         borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
                    //     }
                    // };
                    d1.push({
                        value: data[j],
                        itemStyle: {
                            borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
                        }
                    })
                }
                list1.push(d1)
            }
            series.data = [...list1]
            series = series.map((item, index) => ({
                ...item,
                data: list1[index]
            }))
            const option = {
                // title: {
                //     text: 'Views By Dealer ',
                //     textStyle: {
                //         fontFamily: 'Poppins',
                //         fontSize: '24px',
                //         fontWeight: 600,

                //     }
                // },
                grid: {
                    // Đặt chiều rộng tối đa cho trục x
                    width: '87% ',
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
                        rotate: 40,
                        formatter: function (value) {
                            // Bạn có thể tùy chỉnh hàm formatter nếu cần
                            // Ví dụ, bạn có thể giới hạn số ký tự được hiển thị
                            return value.length > 10 ? value.substring(0, 10) + '...' : value;
                        },
                        ellipsis: true, // Hiển thị dấu ba chấm cho nhãn bị cắt bớt
                    },


                    data: label,
                },
                yAxis: {
                    show: false,
                    type: 'value',
                },
                series: series.map(item => ({
                    ...item,
                    barWidth: 40, // Adjust the width of the bars as needed
                })),
            };
            myChart.setOption(option);
        }



        // Clean up when the component unmounts
        return () => {
            // Remove the event listener to avoid memory leaks
            window.removeEventListener('resize', resizeChart);

            myChart.dispose();
        };
    }, [dataChartStackerDealer]); // Empty dependency array means this effect runs once after the initial render

    return <div id="nynh" style={{ width: '100%', height: '100%' }}></div>;
};

export default EchartsStacker;
