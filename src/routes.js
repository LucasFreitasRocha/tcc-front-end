import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login/index';
import Register from './pages/register';

export default function Routes() {
  return (
      <BrowserRouter>
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              
          </Switch>
      </BrowserRouter>
  )
}