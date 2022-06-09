import React, { useEffect, useState } from "react";
import {Container, Row, Col, Button} from "react-bootstrap";
import {ToastContainer} from "react-toastify";
import AddTable from "../components/tables/TableManagement";
import Header from "./Header";

export default function Dashboard() {
  const [openHeader, setOpenHeader] = useState(false);
  useEffect(() => {
    let a = JSON.parse(localStorage.getItem("authKey"))
    setOpenHeader(JSON.parse(localStorage.getItem("authKey")));
    
  }, [openHeader])
  
  return (
    <div>
      <ToastContainer position="bottom-right" />
      {openHeader ? <Header/> : undefined}
      <div className="container mt-4">
      <AddTable></AddTable>
      </div>
    </div>
  );
}
