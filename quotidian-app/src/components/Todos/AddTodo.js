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
    <div className="todoList">
      <Card style={{width: "24rem"}}>
        <Card.Header>
          {" "}
          {props.cardName}{" "}
          
          <Button
            onClick={AddButton}
            className="float-sm-and"
            variant="light"
            style={{display: "flex", alignItems: "flex-end", float: "right"}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </Button>
          
        </Card.Header>
        {card ? (
          <Card style={{width: "24rem"}}>
            <Card.Body>
              <Card.Title>Add Todo</Card.Title>

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
            </Card.Body>
          </Card>
        ) : undefined}

        <ListGroup variant="flush">
          {props.todoList.map((todo) => {
            if (todo.cardName === props.cardName) {
              return (
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
              );
            }
          })}
        </ListGroup>
      </Card>
    </div>
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
