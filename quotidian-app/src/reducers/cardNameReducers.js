import { CREATE_CARD, FETCH_CARD, GET_SINGLE_TABLE_DATA, DELETE_TABLE_DATA } from "../actions/types";
import _ from "lodash";

export default(state={}, action) => {
    switch(action.type) {
        case CREATE_CARD:
            return {...state, [action.payload.id]:action.payload};

        case FETCH_CARD:
            return {...state, ..._.mapKeys(action.payload, "id")};

        case GET_SINGLE_TABLE_DATA:
            return {...state, [action.payload.id]:action.payload};

        case DELETE_TABLE_DATA:
            return _.omit(state, action.payload);

        default : return state;

    }
}