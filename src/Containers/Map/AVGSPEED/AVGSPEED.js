import React from 'react';
import { Animation ,Chart, Series , Legend, ValueAxis, Title, Pane , Grid ,Tooltip , Crosshair, ConstantLine, Label, VisualRange, Size, Point, ScrollBar, ZoomAndPan, Aggregation, ArgumentAxis, LoadingIndicator, TooltipTemplate, CommonSeriesSettings, Border} from 'devextreme-react/chart';
import { dataSource } from './data.js';



class AVGSPEEDchart extends React.Component {

  constructor(props){
    super(props);
   
  }
  


  render() {
    
    return (
  
      <div>
         <Chart
        dataSource={dataSource}
        id={'chart'}
        size={{
            height:this.props.chartHeight,
            width:this.props.chartwidth
          }}>
        <Series valueField={'silver'} name={'Silver Medals'} color={'#c0c0c0'}><Point size={0}></Point></Series>
        <CommonSeriesSettings
          argumentField={'year'}
          type={'stepline'}>
          <Border visible={false} />
        </CommonSeriesSettings>
        <ValueAxis>
        <ConstantLine
            width={2}
            value={43}
            color={'#28B463'}
            dashStyle={'dash'}
          >
                <Label visible={false}></Label>
          </ConstantLine>
        </ValueAxis>
        <ArgumentAxis>
          <Label format={'decimal'} />
        </ArgumentAxis>
        <ZoomAndPan argumentAxis={'both'} dragToZoom={true}/>
        <ScrollBar visible={true} />
        <Legend
         visible={false} />
      </Chart>
      </div>
    );
 
  }
 
}

export default AVGSPEEDchart;