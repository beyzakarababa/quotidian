import react, {useEffect} from "react";
import Modal from "./../Modal";
import {connect} from "react-redux";
import {deleteTable, fetchSingleTable} from "./../../actions";
import {Link} from "react-router-dom";
import "../../App.css";
import {toast} from "react-toastify";

const DeleteTodo = (props) => {
  useEffect(() => {
    props.fetchSingleTable(props.match.params.id);
  }, []);

  return (
    <Modal
      title="Delete List?"
      content={renderContent(props.card)}
      actions={renderActions(props)}
      onDismiss={() => props.history.push("/")}
    />
  );
};

function renderContent(card) {
  if (!card) {
    return "Are you sure you want to delete it?";
  }
  return `This action cannot be undone and it will be removed from the page. Are you sure you want to delete the "${card.cardName}" ?`;
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
          props.deleteTable(props.match.params.id, () => {
            props.history.push("/");
            toast.error("List is succesfully deleted.");
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
    card: state.cardName[ownProps.match.params.id],
  };
};
export default connect(mapStateToProps, {deleteTable, fetchSingleTable})(
  DeleteTodo
);
