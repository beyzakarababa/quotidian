import {reducer as formReducer} from "redux-form"; 
import { combineReducers } from "redux";
import todoReducers from "./todoReducers";
import userReducers from "./userReducers";
import cardNameReducers from "./cardNameReducers";

export default combineReducers({
    todo:todoReducers,
    user:userReducers,
    form:formReducer,
    cardName:cardNameReducers
});