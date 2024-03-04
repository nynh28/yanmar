import React, { Component } from 'react'
import { Row, Col, Progress } from "reactstrap";
import $ from 'jquery'
import { t } from '../../Components/Translation'

export default class HeaderSummary extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { component: Component, ...rest } = this.props
        return (
            <div id={"manage-ibox-" + this.props.boxid} className="ibox" style={{ boxShadow: 'rgb(222, 222, 222) 0px 2px 3px', marginBottom: 6 }}>
                <div className="ibox-title" style={{ borderColor: '#f3f3f4', borderWidth: '2px 0px 0' }}>
                    <Row style={{ margin: '-10px 0px -7px 0px' }}>
                        <div className="pull-left">
                            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-end', marginTop: 8 }}>
                                <label className="control-label" style={{ fontWeight: 500, marginTop: 5 }}>
                                    {t("other_reports_3")}
                                </label>
                                <Col lg={12} style={{ width: 450 }}>
                                    {this.props.children}
                                </Col>
                            </div>
                        </div>

                        <div className="pull-right">
                            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-end', marginTop: 8 }}>
                                <div className="form-group field field-string" style={{ padding: '0 3px' }}>
                                    <a className="btn btn-white btn-md" title="Config" style={{ backgroundColor: 'grey' }} onClick={() => this.props.onClick()} ><i className="fa fa-cogs" style={{ fontSize: 16, color: "white", marginRight: 5 }}></i><span style={{ color: "white" }}>{t('other_reports_23')}</span></a>
                                </div>
                            </div>
                        </div>
                    </Row>
                </div >
            </div >
        )
    }
}