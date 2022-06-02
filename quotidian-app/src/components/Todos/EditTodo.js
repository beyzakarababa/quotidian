import React from "react";
import {Formik, Field, Form} from "formik";
import { Button, ListGroupItem } from "react-bootstrap";
import { editTodo} from "../../actions";
import { connect } from "react-redux";

const EditTodo = (props) => {
  
  const handleEditTodo = (values) => {
    props.editTodo(props.todoId, values.name, props.listName);
  }
  return (
    <ListGroupItem>
      <Formik
        initialValues={{name: props.contentOfCard}}
        onSubmit={(values) => {
          handleEditTodo(values);
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
          <Button className="mt-2" variant="info" type="submit" size="sm">
            Edit
          </Button>
          <Button 
            onClick={()=>props.handleCloseEditInputTag()}
            className="mt-2"
            variant="danger"
            size="sm"
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
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    
  };
};
export default connect(mapStateToProps, {editTodo})(EditTodo);
