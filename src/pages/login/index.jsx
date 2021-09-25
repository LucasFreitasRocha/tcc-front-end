import { Card, Button, TextField } from '@mui/material';
import React, {useState} from 'react';
import {  useHistory } from 'react-router-dom'

import './login.css';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const history = useHistory();
  async function onSubmitFomr(e) {
    e.preventDefault();
    localStorage.setItem('jwt', email);
    history.push('/');
  }

  return (
    <div className="bg-black center" >
      <Card className="cardLogin">
      <form  onSubmit={onSubmitFomr}>
        <h1>Login</h1>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth
        type="email"
        onChange = {
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
        onChange = {
          (e) => {
            setPassowrd(e.target.value);
          }
        }  
        value={password}
      />
      <Button variant="contained" color="primary"  type="submit" >Login</Button>
    </form>
      </Card>
    </div>
  );
}