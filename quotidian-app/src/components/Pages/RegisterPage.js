import react from "react";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {register} from "./../../actions";
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

const RegisterPage = (props) => {
    const onSubmit = (formvalues) => {
        const rowData = new URLSearchParams(Object.keys(formvalues).map(key=>[key,formvalues[key]]));
        props.register(rowData, ()=> props.history.push("login"), ()=>toast.success("username is succesfully saved."));
    }
    
  return <div>
      <ToastContainer/>
      <Container className="mt-5">
        <div expand= "sm">
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <fieldset>
              <Field name="kullaniciAdi" label="Username" type="text" component={renderInput}/>
          </fieldset>
          <fieldset>
              <Field name="sifre" label="Password" type="text" component={renderPasswordInput}/>
          </fieldset>
          <button className="btn btn-success mt-3">Register me!</button>
      </form>
        </div>
      </Container>
  </div>;
};

export default connect(null, {register})(
  reduxForm({
    form: "registerForm",
  })(RegisterPage)
);
