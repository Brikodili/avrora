import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Registration from 'pages/Registration'
import Login from 'pages/Login'
import Dashboard from 'pages/Dashboard'
import Profile from 'pages/Profile'
import Question from 'pages/Question'

import GuestRoute from 'components/Routes/guest-route';
import ProtectedRoute from 'components/Routes/protected-route';

function Routes(props) {
  return (
    <Router>
      <Route path="/" exact component={Dashboard}/>
      {/*<ProtectedRoute path="/" exact component={Dashboard}/>*/}
      <Route path="/question" component={Question}/>
      <GuestRoute path="/registration" exact component={Registration}/>
      <GuestRoute path="/login" exact component={Login}/>
      <GuestRoute path="/dashboard" component={Dashboard} />
      <GuestRoute path="/profile" component={Profile} />
    </Router>
  );
}

export default Routes;
