import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Layout from 'components/Layout';
import signUpValidationSchema from 'pages/Registration/validation-schema';
import { api } from 'api';

export default function ({history}) {
  function handleSubmit(values, actions) {
    api.post('/register', values).then((resp) => {
      if (resp.status === 201) {
        history.push('/')
      } else {
        actions.setErrors(resp.data.message)
      }
    })
  }

  const initialFormValues = {
    name: '',
    surname: '',
    name_customer: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    password_confirmation: '',
  };

  return (
    <Layout>
      <h1 className="has-text-centered title">Sign Up</h1>
      <Formik
        validationSchema={signUpValidationSchema}
        initialValues={initialFormValues}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => {
          return (
            <div>
              <Form className="form">
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
                <div className="field">
                  <label className="label">Email</label>
                  <Field className="input" name="email" placeholder="email"/>
                  <ErrorMessage name="email" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <div className="field">
                  <label className="label">Phone</label>
                  <Field className="input" name="phone" placeholder="phone"/>
                  <ErrorMessage name="phone" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <label className="label">Role</label>
                <div className="select">
                  <Field component="select" name="role">
                    <option value="1">Поставщик</option>
                    <option value="2">Заказчик</option>
                  </Field>
                  <ErrorMessage name="role" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <Field className="input" type="password" name="password" placeholder="password"/>
                  <ErrorMessage name="password" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <div className="field">
                  <label className="label">Confirm password</label>
                  <Field className="input" type="password" name="password_confirmation" placeholder="password_confirmation"/>
                  <ErrorMessage name="password_confirmation" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <button type="submit" className={`button ${isSubmitting && ' is-loading'}`}>Submit</button>
              </Form>
            </div>
          )
        }}
      </Formik>
    </Layout>
  )
};
