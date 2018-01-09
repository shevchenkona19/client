import React, {Component} from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: ''
        };
        this.onChange = (address) => this.setState({address});
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (event) => {
        event.preventDefault();

        const text = this.state.address;
        this.setState({
            address: ''
        });
        geocodeByAddress(text)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log("Success: " + latLng);
                if (latLng) {
                    this.props.addItem({
                        address: text,
                        lat: latLng.lat,
                        lon: latLng.lng
                    })
                }
            })
            .catch(error => console.error('Error', error))
    };

    render() {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
        };
        return (
            <div id="header">
                <form onSubmit={this.onSubmit}>
                    <PlacesAutocomplete inputProps={inputProps}/>
                    <br/>
                    <button classID="ripple" data-ripple-color="#fff" id="btnSubmit" type="submit">Add address</button>
                </form>
            </div>
        )
    }
}