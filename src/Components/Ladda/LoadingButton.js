import React, { Component } from 'react'
import LaddaButton from 'react-ladda';

class LoadingButton extends Component {
    state = { loading: false };

    toggle = () => {
        this.setState({
            loading: !this.state.loading
        });
    }

    render() {
        const {
            id, name, bgColor, loading, onClick, dataSize,
            dataStyle, spinnerSize, spinnerColor, btnWidth
        } = this.props
        return (
            <LaddaButton
                id={id}
                loading={loading}
                onClick={onClick}
                data-color="#eee"
                data-size={dataSize || 's'}
                data-style={dataStyle || 'slide-left'}
                data-spinner-size={spinnerSize || 30}
                data-spinner-color={spinnerColor || "#ddd"}
                data-spinner-lines={12}
                style={{
                    backgroundColor: bgColor || '#1ab394',
                    borderRadius: 2.5,
                    marginRight: 10,
                    width: btnWidth,
                }}
            >
                <div id="save" style={{ paddingLeft: 10, paddingRight: 10 }}>{name || 'Save'}</div>
            </LaddaButton>
        )
    }
}


export default LoadingButton


// data - style="expand-left"
// data-style="expand-right"
// data-style="expand-up"
// data-style="expand-down"
// data-style="zoom-in"
// data-style="zoom-out"
// data-style="slide-left"
// data-style="slide-right"
// data-style="slide-up"
// data-style="slide-down"
// data-style="contract"

// data-size="xs"
// data-size="s"
// data-size="l"	