import * as actionTypes from '../actions/actionTypes';
const INITIAL_STATE = {
    isAdmin: null,
    allFlightDetails: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.IS_ADMIN:
            return {
                ...state,
                isAdmin: action.payload
            };

        case actionTypes.ALL_FLIGHTS:
            return {
                ...state,
                allFlightDetails: action.payload
            };

        case actionTypes.FLIGHT_DETAILS:
            return {
                ...state,
                inFlightSeatmap: action.payload
            };

        case actionTypes.UPDATE_PASSENGER:
            return {
                ...state,
                updatedPassengerDetails: action.payload
            };

        case actionTypes.DELETE_PASSENGER:
            return {
                ...state,
                deletedPassengerDetails: action.payload
            };

        default:
            return state;
    }
};