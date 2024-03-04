import React from 'react';

import { Chart, Series, CommonSeriesSettings, Label, Format, Legend, ValueAxis, VisualRange, ConstantLine, ArgumentAxis} from 'devextreme-react/chart';
import { grossProductData } from './data.js';

class Chartoil extends React.Component {
  constructor(props) {
    super(props);

   
  }
  render() {
    return (
      <Chart id={'chart'}
    
        dataSource={grossProductData}
        onPointClick={this.onPointClick}
        rotated={true}
        size={{
          height:this.props.chartHeight,
          width:this.props.chartwidth
        }}
        
      >
        <CommonSeriesSettings
          argumentField={'state'}
          type={'bar'}
          hoverMode={'allArgumentPoints'}
          selectionMode={'allArgumentPoints'}
          
        >
          <Label visible={true}>
            <Format type={'fixedPoint'} precision={0} />
          </Label>
        </CommonSeriesSettings>
        <Series
          valueField={'year1997'}
          color={'#97c95c'}
          name={'AVG'}
          >
           <Label visible={true} position={"inside"}>
          
          </Label>
          </Series>
         <ValueAxis 
        maxValueMargin={0.01}
        >
          <VisualRange />
          <Label customizeText={this.customizeText} />
          <ConstantLine
            width={2}
            value={1804}
            color={'#97c95c'}
            dashStyle={'dash'}
            paddingTopBottom={10}
          >
            <Label text={'Average'} verticalAlignment={'bottom'} />
          </ConstantLine>
          
        </ValueAxis>
        <ArgumentAxis  label={{visible:false}} ></ArgumentAxis>
        <Series
          valueField={'year2001'}
          name={'Driver'}
        />
       <Series
          valueField={'year1998'}
          color={'#1db2f5'}
          name={'AVG'}
          >
           <Label visible={true} position={"inside"}>
          
          </Label>
          </Series>
     
       
        <Legend verticalAlignment={'bottom'} horizontalAlignment={'center'}></Legend>
      
      </Chart>
    );
  }

  onPointClick(e) {
    e.target.select();
  }
}

export default Chartoil;
