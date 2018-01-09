import React from 'react';
import './App.css';
import {ListContainer} from './mvp/ui/List';
import {MapContainer} from './mvp/ui/Map'
import {Header} from './mvp/ui/Header'
import * as axios from 'axios';
import {store} from './mvp/ui/store/Store'
import {addAddress} from './utils/Constants'
import {delAddress} from './utils/Constants'
import {updateFromServer} from './utils/Constants'
import {coordsStore} from './mvp/ui/store/CoordinatesStore'
import {geolocated} from 'react-geolocated';

const ip = '192.168.0.118';


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.addressSelected = this.addressSelected.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeAddress = this.removeAddress.bind(this);
        this.findMe = this.findMe.bind(this);
        this.state = {
            isShowingWarning: false,
            warningText: 'Something is wrong with geolocation',
            warning: <h1>{this.warningText}</h1>,
            map: <MapContainer id="map-container"/>
        }

    }

    addressSelected(address) {
        let list = store.getState();
        let coords = {};
        list.forEach(item => {
            if (item._id === address.selectedId) {
                coords = item;
            }

        });
        coordsStore.dispatch({
            type: 'SET_COORDINATES',
            lat: coords.lat,
            lon: coords.lon,
            name: address.name
        })
    }

    addItem(addressObject) {
        const insertAddress = {
            method: 'post',
            url: 'http://' + ip + ':4000/insertAddress',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            data: addressObject
        };
        axios(insertAddress).then(response => {
            if (response.status === 500) throw "Error in inserting";
            store.dispatch({
                type: addAddress,
                item: {
                    _id: response.data.insertedId,
                    address: addressObject.address,
                    lat: addressObject.lat,
                    lon: addressObject.lon,
                }
            });
        }).catch(err => {
            if (err) throw err
        })
    }

    componentDidMount() {
        //fetch addresses from server
        const getAllAddresses = {
            method: 'get',
            url: 'http://' + ip + ':4000/getAllAddresses',
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios(getAllAddresses).then(response => {
            if (response.status === 500) throw "Error in getting all addresses";
            store.dispatch({
                type: updateFromServer,
                items: response.data.items
            });
        }).catch(err => {
            if (err) throw err
        });
        this.findMe();
    }

    findMe() {
        if (this.props.isGeolocationAvailable) {
            if (this.props.isGeolocationEnabled) {
                //everything is fine
                coordsStore.dispatch({
                    type: 'SET_COORDINATES',
                    lat: this.props.coords.latitude,
                    lon: this.props.coords.longitude,
                    name: 'Current Location'
                })
            } else {
                this.setState({
                    isShowingWarning: true,
                    warningText: 'Geolocation is not enabled'
                })
            }
        } else {
            this.setState({
                isShowingWarning: true,
                warningText: 'Your browser does not support Geolocation'
            })
        }
    }

    removeAddress(_id) {
        const removal = {
            method: 'post',
            url: 'http://' + ip + ':4000/removeAddress',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            data: {_id: _id}
        };
        axios(removal).then(response => {
            if (response.status === 500) throw "Error in removing record from server.";
            store.dispatch({
                type: delAddress,
                _id: _id
            });
            coordsStore.dispatch({
                type: 'SET_COORDINATES',
                lat: 0,
                lon: 0,
                name: 'Init'
            })
        }).catch(err => {
            if (err) throw err;
        })
    }

    render() {
        return (
            <div>
                <div id="navigation">
                    <ListContainer
                        onAddressSelected={this.addressSelected}
                        onRemove={this.removeAddress}
                    />
                </div>
                <div id="main">
                    <Header addItem={this.addItem}/>

                    <br/>
                    { this.state.map}
                </div>
            </div>
        )
    }

}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(App);