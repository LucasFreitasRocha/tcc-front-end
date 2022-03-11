import { Card, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


import './login.css';
import api from '../../services/api.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const history = useHistory();
  async function onSubmitFomr() {
    
    const body = {
      email,
      password
    };
    api.post('/auth', body).then(
      (success) => {
        localStorage.setItem('jwt', success.data.token);
        history.push('/');
      },
      (error) => {
        console.log("error: " , error);
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
            id="email"
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            type="email"
            onChange={
              (e) => {
                setEmail(e.target.value);
              }
            }
            value={email}
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
                setPassowrd(e.target.value);
              }
            }
            value={password}
          />
          <div className='space-around' >
            <Link to={"/register"}> <Button variant="contained" color="primary" >Cadastrar</Button></Link>
            <Button variant="contained" color="primary" onClick={onSubmitFomr} >Login</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}