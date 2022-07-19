import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api.js';

import NavBarTcc from '../../components/NavBarTcc.jsx';


export default function Home() {
  const jwt = localStorage.getItem('jwt');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    console.log('iniciando...');
    console.log(jwt);
    if (!jwt) {
      history.push("/login");
    } else {
      api.get('/user/profile', {
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
      <h1>hello world {name} !</h1>
      <h2>Email: {email}</h2>
    </>
  );
}