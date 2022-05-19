import { REGISTER_FORM } from "../actions/types";
import _ from "lodash";

export default(state={}, action) => {
    switch(action.type) {
        case REGISTER_FORM:
            return {...state, ...action.payload};


        default : return state;

    }
}