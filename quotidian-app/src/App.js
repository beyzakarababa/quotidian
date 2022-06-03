import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Layout/Dashboard";
import { BrowserRouter, Route } from "react-router-dom";
import DeleteTodo from "./components/Todos/DeleteTodo";
import RegisterPage from "./components/Pages/RegisterPage";
import DeleteTable from "./components/Tables/DeleteTable";
import LoginPage from "./components/Pages/LoginPage";
import { useEffect, useState } from "react";

function App() {
  
  return (
    <div >
      <div>
      <BrowserRouter>
        <>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/todos/delete/:id" exact component={DeleteTodo}/>
        <Route path="/table/delete/:id" exact component={DeleteTable}/>
        <Route path="/register" exact component={RegisterPage}/>
        <Route path="/login" exact component={LoginPage}/>
        </>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
