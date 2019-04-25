import { FETCH_SWITCHS } from '../Actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_SWITCHS:
            return action.payload.data;
        default:
            return state;
    }
}

