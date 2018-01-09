import React from 'react'
import {coordsStore} from './store/CoordinatesStore'
import {withGoogleMap, withScriptjs, Marker, GoogleMap} from 'react-google-maps';

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="map">
                <Mapas/>
            </div>
        )
    }
}

const Mapa = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={8}
        center={{lat: props.lat, lng: props.lng}}
    >
        {props.isMarkerShown && <Marker position={{lat: props.lat, lng: props.lng}}/>}
    </GoogleMap>
));


class Mapas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0,
            showMarker: false,
            name: 'loading...'
        };
        coordsStore.subscribe(() => {
            const state = coordsStore.getState();
            this.setState({
                lat: state.lat,
                lng: state.lng,
                showMarker: true,
                name: state.name
            })
        })
    }

    render() {
        return (
            <Mapa
                googleMapURL="https://maps.googleapis.com/maps/api/key=AIzaSyDeMpnFvoAVJeexUh76FMPa2_RYAuys2W0&v=3.exp"
                loadingElement={<div style={{height: `100%`}}/>}
                isMarkerShown={this.state.showMarker}
                lat={this.state.lat}
                lng={this.state.lng}
                containerElement={<div
                    style={{height: `400px`, width: '100%', margin: 'auto', marginBottom: '15px', marginTop:'90px'}}/>}
                mapElement={<div style={{height: `100%`}}/>}
            />
        )
    }
}