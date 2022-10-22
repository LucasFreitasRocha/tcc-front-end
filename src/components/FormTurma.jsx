import React, { useState, useEffect } from 'react';
import 
{ 
  Button,
  Box,
  Paper,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Checkbox
} from '@mui/material';

import { useHistory } from 'react-router-dom';
import api from '../services/api.js';





export default function FormTurma({ editTurma }) {
  const [codigo, setCodigo] = useState('');
  const [name, setName] = useState('');
  const jwt = localStorage.getItem('jwt');
  const history = useHistory();
  useEffect(() => {

  }, []);

  const handleCancel = () => {
    history.goBack();
  }
  const handleCreatenewClass = async () => {

    if (codigo.trim() !== '' && name.trim() !== '') {
      const body = {
        codigo,
        name
      }
      const header = {
        headers: { "Authorization": `Bearer ${jwt}` }
      }
      api.post('/turmas', body, header).then(
        (success) => {
          setName('');
          setCodigo('')
          history.push('/');
        }
      ).catch((error) => {
        if (error.response) {
          if (error.response.data.status === 403) {
            alert("sessão expirada");
            localStorage.setItem('jwt', '');
          }
        }
      });
    } else {
      alert("escrever algo!");
    }

  }

  
  
  



  return (
    <Box className="box-tema">
      <Paper >
      <form onSubmit={handleCreatenewClass}>
        <div className="titulo">
          {(editTurma) ? <h2 >Editar Tema</h2> : <h2 >Cadastrar Tema</h2>}
        </div>
        <div className="titulo ">
          <div>
            <input
              placeholder="nome Da Turma"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              placeholder="Codigo"
              value={codigo}
              onChange={(event) => setCodigo(event.target.value)}
            />
          </div>
        </div>
        <div className="campos-de-btns" >
          <Button
            variant="contained"
            color="error"
            size="small"
            id="btn-detalhes-temas"
            onClick={handleCancel}
          >Cancelar</Button>
          {(editTurma) ?
            <Button variant="contained" color="primary" size="small" id="btn-detalhes-temas"  >Atualizar</Button> :
            <Button variant="contained" color="primary" size="small" id="btn-detalhes-temas" onClick={handleCreatenewClass}>Cadastrar</Button>}
        </div>
      </form>

      </Paper>
    </Box>
  );

}
