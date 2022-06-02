import {
  CREATE_TODOS_DATA,
  DELETE_SINGLE_TODOS_DATA,
  DELETE_TODOS_DATA,
  EDIT_TODOS_DATA,
  TODOS_DATA,
  EDIT_TABLE_DATA,
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case TODOS_DATA:
      return {...state, ..._.mapKeys(action.payload, "id")};

    case CREATE_TODOS_DATA:
      return {...state, [action.payload.id]: action.payload};

    case DELETE_TODOS_DATA:
      return _.omit(state, action.payload);

    case EDIT_TODOS_DATA:
      return {...state, [action.payload.id]: action.payload};

    case DELETE_SINGLE_TODOS_DATA:
      return {...state, [action.payload.id]: action.payload};

    case EDIT_TABLE_DATA:
      return {...state, [action.payload.id]: action.payload};

    default:
      return state;
  }
};
