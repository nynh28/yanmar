import React from 'react'
import BoxContrainer from "../../components_new/BoxContrainer";
import Map from './Map';
import FilterBar from './FilterBar'
import Dashboard from './Dashboard'
import { FormLoading } from '../../components_new'
import { connect } from 'react-redux'

const SummaryDashboard = (props) => {
  let { isLoadingSummary } = props
  return (
    <div>

      <FilterBar />
      <div className='text-3xl font-bold underline'>
vsmv,.sdnv,

      </div>
      <BoxContrainer
        iconAwesome={<i className="fa fa-location-arrow" aria-hidden="true" style={{ marginRight: 10 }} />}
        title="summary_94">
        <Dashboard />
      </BoxContrainer>

      <Map />


    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoadingSummary: state.summaryNew.isLoadingSummary,
  }
}

export default (connect(mapStateToProps)(SummaryDashboard))
