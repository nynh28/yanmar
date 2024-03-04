import React from 'react';

import { Chart, SeriesTemplate, CommonSeriesSettings, Title } from 'devextreme-react/chart';
import { dataSource } from './data.js';

class Rankingchart extends React.Component {
    render() {
        return (
            <Chart
                id="chart"
                palette="Soft"
                dataSource={dataSource}>
                <CommonSeriesSettings
                    argumentField="age"
                    valueField="number"
                    type="bar"
                    ignoreEmptyPoints={true}
                />
                <SeriesTemplate nameField="age" />
                <Title
                    text="RankingChart"
                    subtitle="as of January 2020"
                />
            </Chart>
        );
    }
}

export default Rankingchart;