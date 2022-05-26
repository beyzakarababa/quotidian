import React, {useEffect, useState} from "react";
import {Container, Row, Col, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {createTableName, fetchTableName} from "../../actions";
import AddTodo from "../Todos/AddTodo";
import {toast} from "react-toastify";

function AddTable(props) {
  const [card, setCard] = useState(false);
  const [inputChange, setInputChange] = useState("");
  useEffect(() => {
    props.fetchTableName();
  }, []);
  const addCard = () => {
    setCard(!card);
  };

  const onInputChange = (e) => {
    setInputChange(e.target.value);
  };

  const onAddButtonClick = () => {
    if (inputChange !== "") {
      props.createTableName({cardName: inputChange});
      addCard(false);
      toast.success("New list is succesfully created.");
    }
  };
  const renderTodo = () => {
    return props.listName.map((el, index) => (
      <Col sm={4}>
        <AddTodo key={index} cardName={el.cardName} cardId={el.id}/>
      </Col>
    ));
  };
  return (
    <div>
      <div className="mx-2"
        style={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
          float: "right",
        }}
      >
        <Button onClick={addCard} variant="outline-secondary" className="mt-2" size="sm">
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
          Add another list
        </Button>
        {card ? (
          <div className="mt-2">
            <input placeholder="Add new card.." onChange={onInputChange} />
            <div className="mt-2">
              <Button onClick={addCard} variant="danger" >Cancel</Button>
              <Button onClick={onAddButtonClick} variant="info" style={{display: "flex", alignItems: "flex-end", float: "right"}}>Add</Button>
              
            </div>
          </div>
        ) : undefined}
      </div>
      <div>
      <Container className="mt-4">
        <Row className="mt-4 flex-nowrap overflow-auto" style={{padding:"10px"}}>
          {renderTodo()}
        </Row>
      </Container>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    listName: Object.values(state.cardName),
  };
};
export default connect(mapStateToProps, {createTableName, fetchTableName})(
  AddTable
);
