import React, { useContext, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from "formik";
import Layout from 'components/Layout';
import { CurrentUserContext } from 'components/App';
import loginValidationSchema from 'pages/Profile/validation-schema';

import { api } from 'api';

export default function () {
  const {dispatch, state: {name, surname, name_customer, role}} = useContext(CurrentUserContext);
  const [messageShow, setMessageShow] = useState(false);

  function handleSubmit(values, actions) {
    api.post('/edit-user', values).then((resp) => {
      if (resp.data.status) {
        dispatch({type: 'SET_CURRENT_USER', payload: resp.data.user});
        setMessageShow(true);
      } else {
        actions.setErrors(resp.data.message);
      }
    }).catch((error) => {
      // Api server doesn`t send error status
      if (error.data) {
        actions.setErrors(error.data.message);
      } else {
        alert(error.message)
      }
    }).finally(() => {
      actions.setSubmitting(false)
    })
  }

  function handleMessageClose() {
    setMessageShow(false);
  }

  const initialFormValues = {
    name,
    surname,
    name_customer,
    role,
  };

  return (
    <Layout>
      <h1 className="has-text-centered title">Edit Profile</h1>
      {messageShow && <div className="notification is-success">
        <button className="delete" onClick={handleMessageClose}/>
        Success
      </div>}
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={initialFormValues}
        onSubmit={handleSubmit}
      >
        {({errors}) => {
          return (
            <Form className="form">
              {errors.general}
              <div className="field">
                <label className="label">Name</label>
                <Field className="input" name="name" placeholder="name"/>
                <ErrorMessage name="name" render={msg => <span className="has-text-danger">{msg}</span>} />
              </div>
              <div className="field">
                <label className="label">Surname</label>
                <Field className="input" name="surname" placeholder="surname"/>
                <ErrorMessage name="surname" render={msg => <span className="has-text-danger">{msg}</span>} />
              </div>
              <div className="field">
                <label className="label">Name Customer</label>
                <Field className="input" name="name_customer" placeholder="name_customer"/>
                <ErrorMessage name="name_customer" render={msg => <span className="has-text-danger">{msg}</span>} />
              </div>
              <label className="label">Role</label>
              <div className="select">
                <Field component="select" name="role">
                  <option value="1">Поставщик</option>
                  <option value="2">Заказчик</option>
                </Field>
                <ErrorMessage name="role" render={msg => <span className="has-text-danger">{msg}</span>} />
              </div>
              <button type="submit" className="button">Submit</button>
            </Form>
          )
        }}
      </Formik>
    </Layout>
  )
};
