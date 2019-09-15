import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Layout from 'components/Layout';
import signUpValidationSchema from 'pages/Registration/validation-schema';
import { api } from 'api';
import {Link} from "react-router-dom";
import Dropdown from 'components/Dropdown'

export default function ({history}) {
  // function handleSubmit(values, actions) {
  //   api.post('/register', values).then((resp) => {
  //     if (resp.status === 201) {
  //       history.push('/')
  //     } else {
  //       actions.setErrors(resp.data.message)
  //     }
  //   })
  // }
  function handleSubmit(values, actions) {
    history.push('/')
  }

  const initialFormValues = {
    name: '',
    surname: '',
    name_customer: '',
    number_passport: '',
    number2_passport: '',
    date_passport: '',
    location_passport: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    password_confirmation: '',
  };

  return (
    <>
      <h1 className="has-text-centered title">Реєстрація</h1>
      <Formik
        validationSchema={signUpValidationSchema}
        initialValues={initialFormValues}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => {
          return (
            <div>
              <Form className="form">
                <div className="field">
                  <label className="label">Ім'я</label>
                  <Field className="input" name="name" placeholder="name"/>
                  <ErrorMessage name="name" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <div className="field">
                  <label className="label">Призвіще</label>
                  <Field className="input" name="surname" placeholder="surname"/>
                  <ErrorMessage name="surname" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <div className="field">
                  <label className="label">По батькові</label>
                  <Field className="input" name="name_customer" placeholder=""/>
                  <ErrorMessage name="name_customer" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <Field className="input" name="email" placeholder="email"/>
                  <ErrorMessage name="email" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <div className="field">
                  <label className="label">Телефон</label>
                  <Field className="input" name="phone" placeholder="phone"/>
                  <ErrorMessage name="phone" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <label className="label">Тип</label>
                <div className="select">
                  <Field component="select" name="role">
                    <option value="1">Батько</option>
                    <option value="2">Мати</option>
                  </Field>
                  <ErrorMessage name="role" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <div className="field">
                  <label className="label">Серія паспорта</label>
                  <Field className="input" name="number_passport" placeholder=""/>
                  <ErrorMessage name="phone" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <div className="field">
                  <label className="label">Номер паспорта</label>
                  <Field className="input" name="number2_passport" placeholder=""/>
                  <ErrorMessage name="number2_passport" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <div className="field">
                  <label className="label">Дата видачі</label>
                  <Field className="input" name="date_passport" placeholder=""/>
                  <ErrorMessage name="date_passport" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <div className="field">
                  <label className="label">Ким виданий</label>
                  <Field className="input" name="location_passport" placeholder=""/>
                  <ErrorMessage name="location_passport" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <div className="field">
                  <label className="label">Додати медичну карту дитини</label>
                  <Field type="file" className="input" name="card" placeholder=""/>
                  <ErrorMessage name="card" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <div className="field">
                  <label className="label">Пароль</label>
                  <Field className="input" type="password" name="password" placeholder="password"/>
                  <ErrorMessage name="password" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <div className="field">
                  <label className="label">Підтвердження</label>
                  <Field className="input" type="password" name="password_confirmation" placeholder="password_confirmation"/>
                  <ErrorMessage name="password_confirmation" render={msg => <span className="has-text-danger">{msg}</span>} />
                </div>
                <button type="submit" className={`button ${isSubmitting && ' is-loading'}`}>Submit</button>
              </Form>
            </div>
          )
        }}
      </Formik>
      </>
  )
};
