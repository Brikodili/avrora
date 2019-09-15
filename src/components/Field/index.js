import React from 'react';
import { ErrorMessage, Field } from "formik";

export default function (props) {
  const { label, name, placeholder, } = props;

  return (
    <div className="field">
      <label className="label">{label}</label>
      <Field className="input" name={name} placeholder={placeholder}/>
      <ErrorMessage name={name} render={msg => <span className="has-text-danger">{msg}</span>}/>
    </div>
  )
};
