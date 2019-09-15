import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Registration from 'pages/Registration'
import Login from 'pages/Login'
import Dashboard from 'pages/Dashboard'
import Profile from 'pages/Profile'

import GuestRoute from 'components/Routes/guest-route';
import ProtectedRoute from 'components/Routes/protected-route';

function Routes(props) {
  return (
    <Router>
      <ProtectedRoute path="/" exact component={Dashboard}/>
      <GuestRoute path="/registration" exact component={Registration}/>
      <GuestRoute path="/login" exact component={Login}/>
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/profile" component={Profile} />
    </Router>
  );
}

export default Routes;
