import React, { useState}   from 'react';
import { useHistory} from 'react-router-dom';
import { Card, Button, TextField } from '@mui/material';
import './register.css';
import { Link } from 'react-router-dom';

import api from '../../services/api.js';
export default function Register() {
  
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  async function onSubmitFomr() {
    
    const body = {
      name,
      email,
      password,
      userName
    };
      api.post("/users", body).then(
        (succes) => {
          console.log("sucess");
          localStorage.setItem('jwt', succes.data.token);
          history.push('/');
        },
        (error) =>{
          console.log("error: ", error)
          alert("ops! tente de novo mais tarde!");
        }
      ); 
  }
  return (
    <div className="bg-black center" >
      <Card className="card-padrao">
        <div className='form'>
          <h1>Cadastro</h1>
          <TextField
            id="name"
            label="name"
            variant="outlined"
            margin="normal"
            fullWidth
            type="input"
            onChange={
              (e) => {
                setName(e.target.value);
              }
            }
            value={name}
          />
          <TextField
            id="userName"
            label="userName (maximo 15)"
            variant="outlined"
            margin="normal"
            fullWidth
            type="string"
            maxlength="2"
            onChange={
              (e) => {
                if(e.target.value.length <=15){
                  setUserName(e.target.value);
                }
              }
            }
            value={userName}
          />
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
            label="Senha (maximo 15)"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            onChange={
              (e) => {
                if(e.target.value.length <=15){
                setPassword(e.target.value);
                }
              }
            }
            value={password}
          />
          <div className='space-around' >
           
            <Button variant="contained" color="primary" onClick={onSubmitFomr} >Cadastrar</Button>
           <Link to={"/login"}> <Button variant="contained" color="primary"  >Login</Button></Link>

          </div>
        </div>
      </Card>
    </div>
  );
}