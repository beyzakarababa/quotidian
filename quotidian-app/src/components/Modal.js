import {useState} from "react";
import {Modal} from "react-bootstrap";
import { useHistory } from "react-router-dom";

const actionStyle = {
  width:"100%"
};
function ModalDelete(props) {
  const history = useHistory()
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    history.push("/");
  };
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.content}</Modal.Body>
        <Modal.Footer>
          <div style = {actionStyle}>{props.actions}</div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalDelete;
