import {createStore} from 'redux'

function addressStore(state = [], action) {
    switch (action.type) {
        case 'ADD_ADDRESS' :
            return [
                ...state,
                action.item
            ];
            break;
        case 'DELETE_ADDRESS' :
            let arr = [];
            state.forEach((item, index) => {
                if (item._id === action._id) {
                    //skip this item to delete it
                } else {
                    arr.push(item)
                }
            });
            return arr;
            break;
        case 'UPDATE_FROM_SERVER' :
            return action.items;
    }
}

export const store = createStore(addressStore);