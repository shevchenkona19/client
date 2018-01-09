import {createStore} from 'redux'

function coordinatesStore(state = {}, action) {
    switch (action.type) {
        case 'SET_COORDINATES':
            return {
                lat: action.lat,
                lng: action.lon,
                name: action.name
            }
    }
}

export const coordsStore = createStore(coordinatesStore);