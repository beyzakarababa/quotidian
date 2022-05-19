import axios from "axios";
import baseUrl from "./../api/Todo";
import {TODOS_DATA, CREATE_TODOS_DATA, DELETE_TODOS_DATA, DELETE_SINGLE_TODOS_DATA, REGISTER_FORM, CREATE_CARD, FETCH_CARD} from "./types";

export const fetchTodo = () => async (dispatch) => {
  const response = await axios.get("http://localhost:3001/todo");
  dispatch({
    type: TODOS_DATA,
    payload: response.data,
  });
};

export const createTodo = (values) => async(dispatch) => {
  const response = await axios.post("http://localhost:3001/todo", (values));
  dispatch({
    type: CREATE_TODOS_DATA,
    payload: response.data,
  });
}

export const deleteTodo = (id, callback) => async(dispatch) => {
  const response = await axios.delete(`http://localhost:3001/todo/${id}`);
  dispatch({
    type: DELETE_TODOS_DATA,
    payload: id,
  });
  callback();
}

export const fetchSingleTodo = (id) => async(dispatch) => {
  const response = await axios.get(`http://localhost:3001/todo/${id}`);
  dispatch({
    type: DELETE_SINGLE_TODOS_DATA,
    payload: response.data,
  });
}
export const register = (formvalues, callback) => async(dispatch) => {
  const response = await axios.post(`http://localhost/rest_api/index.php`, formvalues);
  dispatch({
    type: REGISTER_FORM,
    payload: response.data,
  });
  callback();
}

export const createTableName = (values) => async (dispatch) => {
  const response = await axios.post("http://localhost:3001/listName", (values));
  dispatch({
    type: CREATE_CARD,
    payload: response.data,
  });
};

export const fetchTableName = () => async (dispatch) => {
  const response = await axios.get("http://localhost:3001/listName");
  dispatch({
    type: FETCH_CARD,
    payload: response.data,
  });
};
