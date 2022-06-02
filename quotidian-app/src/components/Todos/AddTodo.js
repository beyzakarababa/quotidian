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
import {fetchTodo, createTodo, deleteTodo, register, login, editTable} from "./../../actions";
import {Link} from "react-router-dom";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import EditTodo from "./EditTodo";

const AddTodo = (props) => {
  const [listName, setListName] = useState();
  const [todoId, setTodoId] = useState();
  const [contentOfCard, setContentOfCard] = useState();
  const [openEditInput, setOpenEditInput] = useState(false);
  const [card, setCard] = useState(false);
  const handleAddTodo = (values) => {
    values = {...values, cardName: `${props.card.cardName}`};
    props.createTodo(values);
    setCard(false);
    toast.success("Todo is succesfully created.");
  };

  const AddButton = () => {
    card ? setCard(false) : setCard(true);
  };

  useEffect(() => {
    props.fetchTodo();
  }, [openEditInput]);

  const onDragEnd = (result, column) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      
      // props.editTable()
    }
  }

  const handleOpenEditInputTag = (content, todoId, listName) => {
    setOpenEditInput(true);
    setContentOfCard(content);
    setTodoId(todoId);
    setListName(listName);

  }
  const handleCloseEditInputTag = () => {
    setOpenEditInput(false);
  }

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result, props.card)}>
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
          <Droppable key={props.card.id} droppableId={props.card.id.toString()}>
            {(provided, snapshot) => {
              return (
                <ListGroup className="mt-2" {...provided.droppableProps} ref={provided.innerRef}>
                  {props.todoList.map((todo) => {
                    if (todo.cardName === props.card.cardName) {
                      return (
                        <Draggable key={todo.id} draggableId={todo.id.toString()} index={todo.id}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                key={todo.id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  padding: "4px",
                                  backgroundColor: "#dce0e6",
                                  border: "1px",
                                  borderRadius: "10px",
                                }}
                              >
                                <ListGroupItem key={todo.id}>
                                  {todo.name}
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
                                      variant="light"
                                    >
                                      <Dropdown.Item eventKey="1">
                                        <Link
                                          className=""
                                          to={`/todos/delete/${todo.id}`}
                                        >
                                          Delete
                                        </Link>
                                      </Dropdown.Item>
                                      <Dropdown.Item onClick={()=>handleOpenEditInputTag(todo.name, todo.id, props.card.cardName)} eventKey="2">
                                        Edit
                                      </Dropdown.Item>
                                    </DropdownButton>
                                  ))}
                                </ListGroupItem>
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    }
                  })}
                  {openEditInput ? <EditTodo listName={listName} todoId={todoId} contentOfCard={contentOfCard} handleCloseEditInputTag={handleCloseEditInputTag}/> : undefined}
                  {provided.placeholder}
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
                </ListGroup>
              );
            }}
          </Droppable>
        </div>
      </Card>
    </DragDropContext>
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
  editTable
})(AddTodo);
