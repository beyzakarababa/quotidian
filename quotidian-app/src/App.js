import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./layout/Dashboard";
import { BrowserRouter, Route } from "react-router-dom";
import DeleteTodo from "./components/todos/DeleteTodo";
import RegisterPage from "./pages/RegisterPage";
import DeleteTable from "./components/tables/DeleteTable";
import LoginPage from "./pages/LoginPage";

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
