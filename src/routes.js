import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Delete } from './components/Delete';

import Home from './pages/home';
import Login from './pages/login/index';
import Ranking from './pages/Ranking/Index';
import Register from './pages/register';
import Tema from './pages/Tema/Index';
import Turma from './pages/Turma/Index';

export default function Routes() {
  return (
      <BrowserRouter>
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/temas" component={Tema} />
              <Route path="/turmas" component={Turma} />
              <Route path="/ranking" component={Ranking} />
              <Route path="/delete/:recurso/:id" component={Delete} />
          </Switch>
      </BrowserRouter>
  )
}