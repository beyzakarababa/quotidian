import React from "react";
import {Container, Row, Col, Button} from "react-bootstrap";
import {ToastContainer} from "react-toastify";
import AddTable from "../Tables/AddTable";
import "../../App.css";

export default function Dashboard() {
  return (
    <div className="container mt-4">
      <ToastContainer position="bottom-right" />
      <AddTable></AddTable>
    </div>
  );
}
