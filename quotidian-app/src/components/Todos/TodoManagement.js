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
import {connect, Provider} from "react-redux";
import {
  fetchTodo,
  createTodo,
  deleteTodo,
  register,
  login,
  editTable,
  editTodo,
} from "../../actions";
import {Link} from "react-router-dom";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import EditTodo from "./EditTodo";

const AddTodo = (props) => {
  const [list, setList] = useState();
  const [openEditInput, setOpenEditInput] = useState(false);
  const [card, setCard] = useState(false);
  const [indexKeeper, setIndexKeeper] = useState(1);

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "lightblue" : "white",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightgrey" : "#dce0e6",
  });

  const handleAddTodo = (values) => {
    values = {
      ...values,
      cardName: `${props.card.cardName}`,
      index: indexKeeper,
      color: "white",
    };
    props.createTodo(values);
    setCard(false);
    toast.success("Todo is succesfully created.");
  };

  const AddButton = () => {
    card ? setCard(false) : setCard(true);
  };
  useEffect(() => {
    if (props.todoList.length > 0) {
      setIndexKeeper(props.todoList[props.todoList.length - 1].index + 1);
      if (isNaN(props.todoList[props.todoList.length - 1].index))
        setIndexKeeper(props.todoList[props.todoList.length - 2].index + 1);
    }
  }, [props.todoList]);

  useEffect(() => {
    props.fetchTodo();
  }, [openEditInput]);

  const handleOpenEditInputTag = (content) => {
    setOpenEditInput(true);
    setList(content);
  };
  const handleCloseEditInputTag = () => {
    setOpenEditInput(false);
  };

  return (
    <Card style={{backgroundColor: "#dce0e6"}} className="mt-5">
      <div style={{backgroundColor: "#dce0e6", width: "100%"}}>
        <Card.Header className="d-flex justify-content-between">
          <div className="text-dark mt-2">{props.card.cardName}</div>
          <Link className="btn" to={`/table/delete/${props.card.id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              className="bi bi-x-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </Link>
        </Card.Header>
        <ListGroup className="mt-2">
          <Droppable droppableId={`${props.card.id}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {props.todoList
                  .sort((v1, v2) => v1.index - v2.index)
                  .map((todo) => {
                    if (todo.cardName === props.card.cardName) {
                      return (
                        <Draggable
                          key={todo.id}
                          draggableId={todo.id.toString()}
                          index={todo.index}
                        >
                          {(provided, snapshot) => (
                            <ListGroupItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                              className="d-flex justify-content-between m-2"
                              key={todo.id}
                            >
                              <div className="d-flex justify-content-start">
                                {todo.color !== "white" ? (
                                  <div
                                    className="mt-1"
                                    style={{
                                      backgroundColor: todo.color,
                                      width: "15px",
                                      height: "15px",
                                      borderRadius: "50%",
                                      marginRight: "5px",
                                    }}
                                  ></div>
                                ) : <></>}

                                <div>{todo.name}</div>
                              </div>

                              <div className="d-flex align-items-center">
                                {["end"].map((direction) => (
                                  <DropdownButton
                                    title={""}
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
                                    variant="white"
                                  >
                                    <Dropdown.Item
                                      eventKey="1"
                                      as={Link}
                                      to={`/todos/delete/${todo.id}`}
                                    >
                                      Delete
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() =>
                                        handleOpenEditInputTag(todo)
                                      }
                                      eventKey="2"
                                    >
                                      Edit
                                    </Dropdown.Item>
                                    <div style={{marginTop: "6px"}}>
                                      {["down"].map((direction) => (
                                        <div
                                          key={1}
                                          className="d-flex justify-content-between"
                                        >
                                          <span style={{marginLeft: "14px"}}>
                                            Label
                                          </span>
                                          <DropdownButton
                                            title={""}
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
                                            variant="white"
                                          >
                                            <Dropdown.Item
                                              onClick={() => {
                                                todo.color = "red";
                                                props.editTodo(todo.id, todo);
                                              }}
                                              eventKey="1"
                                              style={{
                                                backgroundColor: "#c44141",
                                              }}
                                            >
                                              High
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                              onClick={() => {
                                                todo.color = "orange";
                                                props.editTodo(todo.id, todo);
                                              }}
                                              eventKey="2"
                                              style={{
                                                backgroundColor: "orange",
                                              }}
                                            >
                                              Medium
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                              onClick={() => {
                                                todo.color = "#5176f0";
                                                props.editTodo(todo.id, todo);
                                              }}
                                              eventKey="3"
                                              style={{
                                                backgroundColor: "#5176f0",
                                              }}
                                            >
                                              Low
                                            </Dropdown.Item>
                                          </DropdownButton>
                                        </div>
                                      ))}
                                    </div>
                                  </DropdownButton>
                                ))}
                              </div>
                            </ListGroupItem>
                          )}
                        </Draggable>
                      );
                    }
                  })}
                {provided.placeholder}
                <div style={{height: "5px"}}></div>
              </div>
            )}
          </Droppable>
        </ListGroup>
        {openEditInput ? (
          <EditTodo
            list={list}
            handleCloseEditInputTag={handleCloseEditInputTag}
          />
        ) : undefined}
        {card ? (
          <div
            className="mt-2"
            style={{
              padding: "4px",
              backgroundColor: "#dce0e6",
              border: "1px",
              borderRadius: "10px",
            }}
          >
            <div>
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
            </div>
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
              backgroundColor: "#dce0e6",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-square text-dark mx-2"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <div className="text-dark">Add a todo...</div>
          </Button>
        </div>
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
  login,
  editTable,
  editTodo,
})(AddTodo);
