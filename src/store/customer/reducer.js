import { SET_ME } from './types';

const initialState = {
    me: {},
};

export function productReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_ME:
            return {
                ...state,
                search: Object.assign({}, state.me, payload),
            };
        default:
            return state;
    }
}
