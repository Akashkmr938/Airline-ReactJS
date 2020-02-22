import * as actionTypes from './actionTypes';
import { httpGet, httpPut } from '../../utils/api/http-calls';

export const allFlights = () => {
    return dispatch => {
        httpGet('/flight').then(getResponse => {
            dispatch({
                type: actionTypes.ALL_FLIGHTS,
                payload: getResponse.data
            })
        })
    }
}
export const flightDetails = (airlineNumber) => {
    return dispatch => {
        httpGet('/' + airlineNumber).then(getResponse => {
            dispatch({
                type: actionTypes.FLIGHT_DETAILS,
                payload: getResponse.data
            })
        })
    }
}
export const updatePassenger = (airlineNumber, passengerId) => {
    return dispatch => {
        httpPut('/' + airlineNumber + '/' + passengerId).then(getResponse => {
            dispatch({
                type: actionTypes.UPDATE_PASSENGER,
                payload: getResponse.data
            })
        })
    }
}
export const deletePassenger = (airlineNumber, passengerId) => {
    return dispatch => {
        httpGet('/' + airlineNumber + '/' + passengerId).then(getResponse => {
            dispatch({
                type: actionTypes.DELETE_PASSENGER,
                payload: getResponse.data
            })
        })
    }
}