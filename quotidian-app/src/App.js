import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Layout/Header";
import Dashboard from "./components/Layout/Dashboard";
import { BrowserRouter, Route } from "react-router-dom";
import DeleteTodo from "./components/Todos/DeleteTodo";
import RegisterPage from "./components/Pages/RegisterPage";

function App() {
  return (
    <div>
      <div >
      <BrowserRouter>
        <>
        <Header/>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/todos/delete/:id" exact component={DeleteTodo}/>
        <Route path="/register" exact component={RegisterPage}/>
        </>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
