import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Delete } from './components/Delete';

import Home from './pages/home';
import Login from './pages/login/index';
import Ranking from './pages/Ranking/Index';
import Register from './pages/register';
import Tema from './pages/Tema/Index';
import DetalhesTema from './pages/Tema/detalhesTemas/Index';
import Turma from './pages/Turma/Index';
import NovaQuestao from './pages/questao/nova/index';
import Questao from './pages/questao';
import Matricular from './pages/Turma/Matricular/Index';
import NovaTurma from './pages/Turma/NovaTurma/Index';
import DetalhesTurma from './pages/Turma/Detalhes/DetalhesTurma';

export default function Routes() {
  return (
      <BrowserRouter>
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/temas/:id" component={DetalhesTema} />
              <Route path="/temas" component={Tema} />
              <Route path="/turmas/:id" component={DetalhesTurma} />
              <Route path="/turmas" component={Turma} />
              <Route path="/ranking" component={Ranking} />
              <Route path="/nova-questao" component={NovaQuestao}/>
              <Route path="/matricular" component={Matricular}/>
              <Route path="/questoes" component={Questao}/>
              <Route path="/nova-turma" component={NovaTurma}/>
              <Route path="/delete/:recurso/:id" component={Delete} />
          </Switch>
      </BrowserRouter>
  )
}