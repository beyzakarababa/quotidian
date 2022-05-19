import react, {useEffect} from "react";
import Modal from "./../Modal";
import {connect} from "react-redux";
import {deleteTodo, fetchSingleTodo} from "./../../actions";
import {Link} from "react-router-dom";
import "../../App.css";
import {toast} from "react-toastify";

const DeleteTodo = (props) => {
  useEffect(() => {
    props.fetchSingleTodo(props.match.params.id);
  }, []);

  return (
    <Modal
      title="Delete Todo?"
      content={renderContent(props.todo)}
      actions={renderActions(props)}
      onDismiss={() => props.history.push("/")}
    />
  );
};

function renderContent(todo) {
  if (!todo) {
    return "Are you sure you want to delete it?";
  }
  return `This action cannot be undone and it will be removed from the board. Are you sure you want to delete the "${todo.name}" ?`;
}

const style = {
  justifyContent: "space-between",
  display: "flex",
  width: "%100",
};
function renderActions(props) {
  return (
    <div style={style}>
      <Link className="btn btn-secondary" to="/">
        Cancel
      </Link>

      <button
        onClick={() =>
          props.deleteTodo(props.match.params.id, () => {
            props.history.push("/");
          })
        }
        className="btn btn-danger"
      >
        Delete
      </button>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    todo: state.todo[ownProps.match.params.id],
  };
};
export default connect(mapStateToProps, {deleteTodo, fetchSingleTodo})(
  DeleteTodo
);
