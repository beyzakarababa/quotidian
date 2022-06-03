import react from "react";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {login} from "./../../actions";
import { Button, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

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
        props.login(rowData, ()=> props.history.push("/"), ()=>toast.error("invalid username or password!"), ()=>toast.success("success"), ()=>handleAuthenticate());
    }
    const handleAuthenticate = () => {
      localStorage.setItem("authKey", JSON.stringify("true"));
    }
    
  return <div>
      <ToastContainer
      position="top-center"
      />
      <Container className="mt-5">
      <form onSubmit={props.handleSubmit(onSubmit)}>
          <fieldset>
              <Field name="kullaniciAdi" label="Username" type="text" required={true} component={renderInput}/>
          </fieldset>
          <fieldset>
              <Field name="sifre" label="Password" type="password" required={true} component={renderPasswordInput}/>
          </fieldset>
          <button className="btn btn-success mt-3">Login me!</button>
      </form>
      </Container>
  </div>;
};

export default connect(null, {login})(
  reduxForm({
    form: "loginForm",
  })(LoginPage)
);