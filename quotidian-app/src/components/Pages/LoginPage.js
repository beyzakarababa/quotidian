import react from "react";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {login} from "./../../actions";
import { Button, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const renderInput = ({input, label, meta}) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;

  return (
    <div className={`form-group ${className}`}>
      <label>{label}</label>

      <input className="form-control bg-light" {...input} autoComplete="off" />

    </div>
  );
};
const renderPasswordInput = ({input, label, meta}) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;

  return (
    <div className={`form-group ${className}`}>
      <label>{label}</label>

      <input className="form-control bg-light" type="password" {...input} autoComplete="off" />

    </div>
  );
};

const LoginPage = (props) => {
    const onSubmit = (formvalues) => {
        const rowData = new URLSearchParams(Object.keys(formvalues).map(key=>[key,formvalues[key]]));
        props.login(rowData, ()=> props.history.push("/"), ()=>toast.error("invalid username or password!"), ()=>toast.success("You are successfully signed in"), ()=>handleAuthenticate());
    }
    const handleAuthenticate = () => {
      localStorage.setItem("authKey", JSON.stringify("true"));
    }
    
  return <div>
      <ToastContainer
      position="top-center"
      />
      <Container className="mt-5">
      <div style={{textAlign:"center"}}>
        <h1>SIGN IN!</h1>
      </div>
      <form onSubmit={props.handleSubmit(onSubmit)} style={{width:"50%", margin:"auto"}}>
          <fieldset className="mt-5">
              <Field name="kullaniciAdi" label="Username" type="text" required={true} component={renderInput}/>
          </fieldset>
          <fieldset>
              <Field name="sifre" label="Password" type="password" required={true} component={renderPasswordInput}/>
          </fieldset>
          <div className="d-flex">
          <button className="btn btn-secondary mt-3">Sign in!</button>
          <div className="mt-2 d-flex align-items-center" style={{marginLeft:"1rem"}}>If you don't have an account please <Link to={"/register"} style={{marginLeft:"3px"}}>Sign up!</Link></div>
          </div>
      </form>
      </Container>
  </div>;
};

export default connect(null, {login})(
  reduxForm({
    form: "loginForm",
  })(LoginPage)
);