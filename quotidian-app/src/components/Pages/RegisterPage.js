import react from "react";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {register} from "./../../actions";
import {Button, Container} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";

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

      <input
        className="form-control bg-light"
        type="password"
        {...input}
        autoComplete="off"
      />
    </div>
  );
};

const RegisterPage = (props) => {
  const onSubmit = (formvalues) => {
    const rowData = new URLSearchParams(
      Object.keys(formvalues).map((key) => [key, formvalues[key]])
    );
    props.register(
      rowData,
      () => props.history.push("login"),
      () => toast.success("username is succesfully saved.")
    );
  };

  return (
    <div>
      <ToastContainer />
      <Container className="mt-5">
        <div style={{textAlign: "center"}}>
          <h1>QUOTIDIAN</h1>
        </div>
        <div expand="sm">
          <form
            onSubmit={props.handleSubmit(onSubmit)}
            style={{width: "40%", margin: "auto"}}
          >
            <fieldset className="mt-5">
              <Field
                name="kullaniciAdi"
                label="Username"
                type="text"
                component={renderInput}
              />
            </fieldset>
            <fieldset className="mt-2">
              <Field
                name="sifre"
                label="Password"
                type="text"
                component={renderPasswordInput}
              />
            </fieldset>
            <div className="d-flex">
              <button className="btn btn-secondary mt-3">Sign up!</button>
              <div
                className="mt-2 d-flex align-items-center"
                style={{marginLeft: "1rem"}}
              >
                If you already have an account please{" "}
                <Link to={"/login"} style={{marginLeft: "3px"}}>
                  Log in!
                </Link>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default connect(null, {register})(
  reduxForm({
    form: "registerForm",
  })(RegisterPage)
);
