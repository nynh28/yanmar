import React, { Component, Suspense, useEffect } from 'react'
import { connect } from 'react-redux'
import Gauge from './Gauge'
import Chart from './ChartPanel'
import { t } from "../../../Components/Translation";

const FooterPanal = (props) => {
  let { dataLogin } = props

  console.log(">> RENDER FooterPanal <<")
  return (
    <div className='footer-dasboard'>
      {/* <div className='footer-dasboard-left'> */}
      <style type="text/css">
        {` ::-webkit-scrollbar {
      width: 5px;
    }

  
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

  
    ::-webkit-scrollbar-thumb {
      background: rgb(213 213 213);
    }

   
    ::-webkit-scrollbar-thumb:hover {
      background: rgb(153 153 153);
    }`}
      </style>
      <Gauge />
      <div className='section-line' />
      <Chart />
    </div>
  )
}


const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(FooterPanal)
