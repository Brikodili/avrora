import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CurrentUserContext } from 'components/App';
import loginValidationSchema from 'pages/Login/validation-schema';
import Layout from 'components/Layout';
import Cookie from 'js-cookie';
import { api } from 'api';

export default function(props) {
  const { dispatch } = useContext(CurrentUserContext);

  function handleSubmit(values, actions) {
    api.post('/login', values).then((resp) => {
      dispatch({type: 'SET_CURRENT_USER', payload: resp.data.user });
      Cookie.set('token', resp.data.token.split(' ')[1]);
    }).catch((error) => {
      actions.setErrors({ general: 'Unauthorized' });
      actions.setSubmitting(false);
    })
  }

  const initialFormValues = {
    email: '',
    password: '',
  };

  return (
    <Layout>
      <h1 className="title has-text-centered">Login</h1>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={initialFormValues}
        onSubmit={handleSubmit}
      >
        {({ errors, isSubmitting }) => {
          return (
            <Form className="form">
              <span className="has-text-danger">{errors.general}</span>
              <div className="field">
                <label className="label">Email</label>
                <Field className="input" name="email" placeholder="email"/>
                <ErrorMessage name="email" render={msg => <span className="has-text-danger">{msg}</span>} />
              </div>
              <div className="field">
                <label className="label">Password</label>
                <Field className="input" type="password" name="password" placeholder="password"/>
                <ErrorMessage name="password" render={msg => <span className="has-text-danger">{msg}</span>} />
              </div>
              <button type="submit" className={`button ${isSubmitting && ' is-loading'}`}>Submit</button>
            </Form>
          )
        }}
      </Formik>
    </Layout>
  )
};
