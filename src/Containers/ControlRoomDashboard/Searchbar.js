import React, { Suspense } from "react";
import { Input } from 'antd';


class Searchbar extends React.Component {
  constructor(props) {
    super(props);
      this.state = {

      }
    }
    doSearch(text) {
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      // Do the ajax stuff
      // console.log('text', text)
      this.props.doSearch(text)
    }, 500); // Will do the ajax stuff after 1000 ms, or 1 s
  }
   render() {
    let { vehiclesLoading, displayVehicle } = this.props
    let { listVehicles, pageSize } = this.state
    // console.log(' ------ VehicleList ------', listVehicles)
    return <Input
      onChange={(event) => this.doSearch(event.target.value)}
      // onChange={(event) => console.log('text', event.target.value)}
      allowClear={true}
      size="large"
      placeholder="Search..."
      prefix={<i class="fas fa-search" style={{ color: '#999' }}></i>}
      style={{ marginBottom: 5 }} />
  }

}

export default Searchbar
