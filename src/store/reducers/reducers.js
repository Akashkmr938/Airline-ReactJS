import { IS_ADMIN } from '../actions/types';
const INITIAL_STATE = {
    isAdmin: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case IS_ADMIN:
            return { ...state, isAdmin: action.payload };
        default:
            return state;
    }
};