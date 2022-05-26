import {Formik, Field, Form} from "formik";
import React, {useEffect, useState} from "react";
import {
  Card,
  ListGroup,
  Button,
  ListGroupItem,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from "react-bootstrap";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import {fetchTodo, createTodo, deleteTodo, register} from "./../../actions";
import {Link} from "react-router-dom";

const AddTodo = (props) => {
  const [card, setCard] = useState(false);
  console.log(props.cardId);
  const handleAddTodo = (values) => {
    values = {...values, cardName: `${props.cardName}`};
    props.createTodo(values);
    setCard(false);
    toast.success("Todo is succesfully created.");
  };

  const AddButton = () => {
    card ? setCard(false) : setCard(true);
  };

  useEffect(() => {
    props.fetchTodo();
  }, []);

  return (
    <Card style={{backgroundColor: "#bdbbb5"}}>
      <div style={{backgroundColor: "#bdbbb5", width: "100%"}}>
        <Card.Header className="d-flex justify-content-between">
          <div className="text-light mt-2">{props.cardName}</div>
          <Link className="btn" to={`/table/delete/${props.cardId}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              class="bi bi-x-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </Link>
        </Card.Header>
        <ListGroup className="mt-2">
          {props.todoList.map((todo) => {
            if (todo.cardName === props.cardName) {
              return (
                <div
                  style={{
                    padding: "4px",
                    backgroundColor: "#bdbbb5",
                    border: "1px",
                    borderRadius: "10px",
                  }}
                >
                  <ListGroupItem key={todo.id}>
                    {todo.name}
                    {["end"].map((direction) => (
                      <DropdownButton
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          float: "right",
                        }}
                        as={ButtonGroup}
                        size="sm"
                        key={direction}
                        id={`dropdown-button-drop-${direction}`}
                        drop={direction}
                        variant="light"
                      >
                        <Dropdown.Item eventKey="1">
                          <Link className="" to={`/todos/delete/${todo.id}`}>
                            Delete
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2">Edit</Dropdown.Item>
                      </DropdownButton>
                    ))}
                  </ListGroupItem>
                </div>
              );
            }
          })}
          {card ? (
            <div className="mt-2"
              style={{
                padding: "4px",
                backgroundColor: "#bdbbb5",
                border: "1px",
                borderRadius: "10px",
              }}
            >
              <ListGroupItem>
                <Formik
                  initialValues={{name: ""}}
                  onSubmit={(values) => {
                    handleAddTodo(values);
                  }}
                >
                  <Form>
                    <div>
                      <Field
                        className="form-control"
                        name="name"
                        type="text"
                        placeholder="Add todo.."
                      ></Field>
                    </div>
                    <Button
                      className="mt-2"
                      variant="info"
                      type="submit"
                      size="sm"
                    >
                      Create Issue
                    </Button>
                    <Button
                      className="mt-2"
                      variant="danger"
                      size="sm"
                      onClick={() => setCard(false)}
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        float: "right",
                      }}
                    >
                      Cancel
                    </Button>
                  </Form>
                </Formik>
              </ListGroupItem>
            </div>
          ) : undefined}
          <div className="mb-2">
            <Button
              onClick={AddButton}
              className="mt-2 d-flex justify-content-start"
              size="sm"
              style={{
                width: "100%",
                border: "1px",
                backgroundColor: "#bdbbb5",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-square mx-2"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <div>Add a todo...</div>
            </Button>
          </div>
        </ListGroup>
      </div>
    </Card>
  );
};
const mapStateToProps = (state) => {
  return {
    todoList: Object.values(state.todo),
    user: state.user,
  };
};
export default connect(mapStateToProps, {
  fetchTodo,
  createTodo,
  deleteTodo,
  register,
})(AddTodo);
