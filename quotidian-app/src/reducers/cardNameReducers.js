import { CREATE_CARD, FETCH_CARD } from "../actions/types";
import _ from "lodash";

export default(state={}, action) => {
    switch(action.type) {
        case CREATE_CARD:
            return {...state, [action.payload.id]:action.payload};

        case FETCH_CARD:
            return {...state, ..._.mapKeys(action.payload, "id")};

        // case DELETE_TODOS_DATA:
        //     return _.omit(state, action.payload);

        // case DELETE_SINGLE_TODOS_DATA:
        //     return {...state, [action.payload.id]:action.payload};

        default : return state;

    }
}