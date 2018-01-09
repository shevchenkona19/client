import React, {Component} from 'react'

export class AddressItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: props.address,
            _id: props._id
        };
        this.onClicked = this.onClicked.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onClicked() {
        this.props.onItemSelected({
            selectedId: this.state._id,
            name: this.state.address
        });
    }

    onRemove() {
        this.props.onRemove(this.state._id)
    }

    render() {
        return (
            <li classID="show" id="address-item"
                onClick={this.onClicked}>
                {this.state.address}
                <br/>
                <button id="remove-btn" onClick={this.onRemove}>Remove</button>
            </li>
        )
    }
}

