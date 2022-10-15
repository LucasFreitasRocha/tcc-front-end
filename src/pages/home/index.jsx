import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import api from '../../services/api.js';

import NavBarTcc from '../../components/NavBarTcc.jsx';


export default function Home() {
  const jwt = localStorage.getItem('jwt');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (!jwt) {
      history.push("/login");
    } else {
      api.get('/users/profile', {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      }).then(
        (sucess) => {
          setName(sucess.data.name);
          setEmail(sucess.data.email);
        },
        (error) => {
          console.log("erro ao carregar o perfil: ", error);
          alert("Error ao carregar o perfil, tente de novo mais tarde");
          localStorage.removeItem('jwt');
          history.push("/login");
        }

      );
    }

  }, [history, jwt])
  return (
    <>
      <NavBarTcc />
      <div className="container center">
      <Box className="box-tema">
        <Paper  >
          <h1>Bem vindo ao front-end do nosso tcc</h1>
          <p>
          Agradecemos por querer colaborar em nosso projeto, <Link to="/matricular"> clique aqui </Link>para se cadastrar em uma turma. 
          </p>
        </Paper> 
      </Box>
      </div>
    </>
  );
}