import React, { PureComponent } from 'react'
import Table from '../../../Components/Table';
export default class Exceeded5hourOngoingDriving extends PureComponent {
    static propTypes = {

    }

    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    render() {
        if (this.state.loading == true) {
            return (<div></div>)
        }
        return (
            <div>
                <Table
                    dataSource={this.state.report}
                    mode={"offline"}
                    tableId={0}
                    user_id={0}
                >
                </Table>
            </div>
        )
    }
}
