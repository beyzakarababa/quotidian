import axios from "axios";
import baseUrl from "./../api/Todo";
import {
  TODOS_DATA,
  CREATE_TODOS_DATA,
  DELETE_TODOS_DATA,
  DELETE_SINGLE_TODOS_DATA,
  REGISTER_FORM,
  CREATE_CARD,
  FETCH_CARD,
  GET_SINGLE_TABLE_DATA,
  DELETE_TABLE_DATA,
  LOGIN_FORM,
  EDIT_TABLE_DATA,
  EDIT_TODOS_DATA
} from "./types";

export const fetchTodo = () => async (dispatch) => {
  const response = await axios.get("http://localhost:3001/todo");
  dispatch({
    type: TODOS_DATA,
    payload: response.data,
  });
};

export const createTodo = (values) => async (dispatch) => {
  const response = await axios.post("http://localhost:3001/todo", values);
  dispatch({
    type: CREATE_TODOS_DATA,
    payload: response.data,
  });
};

export const deleteTodo = (id, callback) => async (dispatch) => {
  const response = await axios.delete(`http://localhost:3001/todo/${id}`);
  dispatch({
    type: DELETE_TODOS_DATA,
    payload: id,
  });
  callback();
};

export const editTodo = (id, name, cardName) => (dispatch) => {
  const response = axios.put(`http://localhost:3001/todo/${id}`, {name, cardName});
  dispatch({
    type: EDIT_TODOS_DATA,
    payload: id,
  });
};

export const fetchSingleTodo = (id) => async (dispatch) => {
  const response = await axios.get(`http://localhost:3001/todo/${id}`);
  dispatch({
    type: DELETE_SINGLE_TODOS_DATA,
    payload: response.data,
  });
};
export const register = (formvalues, callback) => async (dispatch) => {
  const response = await axios.post(
    `http://localhost/rest_api/index.php`,
    formvalues
  );
  dispatch({
    type: REGISTER_FORM,
    payload: response.data,
  });
  callback();
};

export const login = (formvalues, callback) => async (dispatch) => {
  const response = await axios.get(
    `http://localhost/rest_api/index.php`,
    formvalues
  );
  dispatch({
    type: LOGIN_FORM,
    payload: response.data,
  });
  callback();
};

export const createTableName = (values) => async (dispatch) => {
  const response = await axios.post("http://localhost:3001/listName", values);
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

export const fetchSingleTable = (id) => async (dispatch) => {
  const response = await axios.get(`http://localhost:3001/listName/${id}`);
  dispatch({
    type: GET_SINGLE_TABLE_DATA,
    payload: response.data,
  });
};

export const deleteTable = (id, callback) => async (dispatch) => {
  const response = await axios.delete(`http://localhost:3001/listName/${id}`);
  dispatch({
    type: DELETE_TABLE_DATA,
    payload: id,
  });
  callback();
};

export const editTable = (id, values) => async (dispatch) => {
  const response = await axios.patch(`http://localhost:3001/todo/${id}`, values);
  dispatch({
    type: EDIT_TABLE_DATA,
    payload: response.data,
  });
};

