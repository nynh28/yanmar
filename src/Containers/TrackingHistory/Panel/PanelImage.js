import React, { Component, Suspense } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import TrackingHistoryActions from '../../../Redux/TrackingHistoryRedux'
import Draggable from 'react-draggable';

class PanelImage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { dataMapPoint, listImageSelected } = this.props

    if (nextProps.dataMapPoint !== dataMapPoint) {


      return true
    }

    if (nextProps.listImageSelected !== listImageSelected) {
      console.log("nextProps.listImageSelected  : ", nextProps.listImageSelected)
      return true
    }

    return true
  }


  createImageChanel(url) {
    return <img src={url} width="150" height="150" />
  }

  render() {
    let { dataMapPoint, listImageSelected } = this.props
    const dragHandlers = {};


    console.log(">> RENDER SHOW PANEL IMAGE << ")

    return <Draggable bounds={{ top: -100, left: -480 }} handle="strong" {...dragHandlers} >
      <div
        className="ibox float-e-margins shadow-model-video"
        style={{
          left: 100,
          top: -150,
          position: 'absolute',
          display: listImageSelected.length > 0 ? '' : 'none'
        }}>
        <strong>
          <div className="ibox-title" style={{ cursor: "move" }}>
            <div className="icon-hover" style={{ float: 'right' }}
              onClick={() => this.props.setValue("listImageSelected", [])}
            >
              <i className="fa fa-times"></i>
            </div>
            <b>{'Image'}</b>
          </div>
        </strong>
        <div id="div-content-video" className="ibox-content"
          style={{
            padding: '0px',
            backgroundColor: '#fff',
            width: listImageSelected.length == 1 ? 'auto' : 300,
            height: 'auto'
          }}>
          <div style={{ backgroundColor: '#fff' }}>
            {/* <div
              style={{ display: "flex", flexDirection: "row" }}
            > */}
            {
              listImageSelected.map((item) => {
                // return <div
                //   style={{ display: "flex", flexDirection: "row" }}
                // >
                //   <div
                //     style={{ display: "flex", flexDirection: "col" }}
                //   >
                //     {this.createImageChanel(item.url)}
                //     <div><span>CH: 1</span></div>
                //   </div>
                // </div>


                return this.createImageChanel(item.url)
              })

            }
            {/* </div> */}
          </div>
        </div>
      </div>
    </Draggable >
  }
}

const mapStateToProps = (state) => ({
  dataMapPoint: state.trackingHistory.dataMapPoint,
  listImageSelected: state.trackingHistory.listImageSelected,
});
const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(TrackingHistoryActions.setValue(name, value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PanelImage))
