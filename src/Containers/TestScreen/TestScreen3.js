import React, { Component } from 'react'
// import { Switch, withRouter } from 'react-router'
import {
    Row, Col,
    Card, CardHeader, CardBlock,
    Button,

} from "reactstrap";
import Images from '../../Themes/Images'
import { withRouter } from 'react-router-dom';
import PannelBox from '../../Components/PannelBox'
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'
import { Container } from 'reactstrap';
class TestScreen3 extends Component {
    state = {
        loading: false,
        value: "test form input",
    }
    render() {
        console.log(this.state.value, "-------------------- Test Screen 3 ---------------------")
        // console.log('---------------------- TestScreen Screen ------------------------------')
        const { component: Component, ...rest } = this.props
        return (
            <div>
                <PannelBox title={'TestScreen3'} {...rest}>
                    <div className="row">
                        <div className="col-lg-6">
                            <h3>Pannel 1</h3>
                            <input value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
                        </div>

                        <div className="col-lg-6">
                            <h3>Pannel 2</h3>
                        </div>
                    </div>
                </PannelBox>
                <Row>
                    {/* // ปุ่ม เซฟ / และยกเลิก สองอันนี้เลย */}
                    <CancelButton loading={false} onClick={() => {
                        this.setState({ loading: false })
                        console.log('--------------- Click Button Cancel -----------------')
                    }} />

                    <SaveButton loading={this.state.loading} onClick={() => {
                        this.setState({ loading: true })
                        console.log('--------------- Click Button -----------------')
                    }} />
                </Row>
            </div>

        )
    }
}

export default (TestScreen3)