import React from 'react';
import {AddressItem} from './items/AddressItem'
import {store} from './store/Store'

export class ListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.onItemSelected = this.onItemSelected.bind(this);
        this.onRemove = this.onRemove.bind(this);
        store.subscribe(() => {
            this.setState({list: store.getState()});
        })
    }

    onItemSelected(address) {
        this.props.onAddressSelected(address);
    }

    onRemove(_id) {
        this.props.onRemove(_id);
    }

    render() {
        return (
            <div id="list">
                <ul>
                    {
                        this.state.list.map(item => (
                                <AddressItem key={item._id} _id={item._id} address={item.address}
                                             onItemSelected={this.onItemSelected} onRemove={this.onRemove}/>
                            )
                        )
                    }
                </ul>
            </div>
        )
    }

}