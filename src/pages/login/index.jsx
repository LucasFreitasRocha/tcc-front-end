import { Card, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


import './login.css';
import api from '../../services/api.js';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassowrd] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function onSubmitFomr() {
    setLoading(true);
    const body = {
      userName,
      password
    };
    api.post('/auth', body).then(
      (success) => {
        console.log(success);
        localStorage.setItem('jwt', success.data.token);
        history.push('/');
      },
      (error) => {
        console.log("error: ", error);
        alert("Login ou senha incorreto!");
      }
    )


  }
  return (
    <div className="bg-black center" >
      <Card className="card-padrao">
        <div className='Form'>
          <h1>Login</h1>
          <TextField
            id="userName"
            label="userName (maximo 15)"
            variant="outlined"
            margin="normal"
            fullWidth
            type="string"
            onChange={
              (e) => {
                if (e.target.value.length <= 15) {
                  setUserName(e.target.value);
                }
              }
            }
            value={userName}
          />
          <TextField
            id="password"
            label="Senha"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            onChange={
              (e) => {
                if (e.target.value.length <= 15) {
                  setPassowrd(e.target.value);
                }
              }
            }
            value={password}
          />
          {loading ? <div className="loading">Carregando <p className="pontos">...</p> </div> : ''}
          <div className='space-around' >
            <Link to={"/register"}> <Button variant="contained" color="primary" >Cadastrar</Button></Link>
            <Button variant="contained" color="primary" onClick={onSubmitFomr} >Login</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}