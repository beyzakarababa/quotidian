import react from "react";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {login} from "./../../actions";
import { Button, Container } from "react-bootstrap";

const renderInput = ({input, label, meta}) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;

  return (
    <div className={`form-group ${className}`}>
      <label>{label}</label>

      <input className="form-control bg-light" {...input} autoComplete="off" />

    </div>
  );
};

const LoginPage = (props) => {
    const onSubmit = (formvalues) => {
        const rowData = new URLSearchParams(Object.keys(formvalues).map(key=>[key,formvalues[key]]));
        props.login(rowData, ()=> props.history.push("login"));
    }
    
  return <div>
      <Container>
      <form onSubmit={props.handleSubmit(onSubmit)}>
          <fieldset>
              <Field name="kullaniciAdi" label="Username" type="text" component={renderInput}/>
          </fieldset>
          <fieldset>
              <Field name="sifre" label="Password" type="text" component={renderInput}/>
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