import react from "react";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {register} from "./../../actions";
import { Button } from "react-bootstrap";

const renderInput = ({input, label, meta}) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;

  return (
    <div className={`form-group ${className}`}>
      <label>{label}</label>

      <input className="form-control bg-light" {...input} autoComplete="off" />

    </div>
  );
};


const RegisterPage = (props) => {
    const onSubmit = (formvalues) => {
        const rowData = new URLSearchParams(Object.keys(formvalues).map(key=>[key,formvalues[key]]));
        props.register(rowData, ()=> props.history.push("/"));
    }
    
  return <div>
      <form onSubmit={props.handleSubmit(onSubmit)}>
          <fieldset>
              <Field name="kullaniciAdi" label="Username" type="text" component={renderInput}/>
          </fieldset>
          <fieldset>
              <Field name="sifre" label="Password" type="text" component={renderInput}/>
          </fieldset>
          <button className="btn btn-success mt-3">Register me!</button>
      </form>
  </div>;
};

export default connect(null, {register})(
  reduxForm({
    form: "registerForm",
  })(RegisterPage)
);
