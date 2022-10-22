import React, { useState } from 'react';
import NavBarTcc from '../../../components/NavBarTcc.jsx';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api.js'

export default function Matricular() {
  const [codigoAcesso, setCodigoAcesso] = useState('');
  const history = useHistory();
  const jwt = localStorage.getItem('jwt');
  const handleMatricular = () => {
    const header = {
      headers: {"Authorization" : `Bearer ${jwt}`}
    }
    api.post(`/turmas/matricular/${codigoAcesso}`,{}, header)
    .then((sucess) => {
      alert(`Matriculado com sucess`);
      history.push(`/turmas`)
    }).catch((error) => {
      if( error.response ){
          if(error.response.data.status === 403){
            alert("sessão expirada");
            localStorage.setItem('jwt', '');
            history.push("/")
          }else if(error.response.data.status === 404){
            console.log(error)
            alert(`Turma não encontrada` );
          }else if(error.response.data.status === 400){
            console.log(error)
            alert(error.response.data.message );
          }
          else{
            console.log(error);
            alert('Ocorreu um erro, tente novamente mais tarde')
          }    
      }
    });
  }
  
  const handleCancel = () => {
    history.goBack();
  }
 
  return (
    <>
      <NavBarTcc />
      <div className="container center">
      <Box className="box-tema">
        <Paper  >
        <form  onSubmit={handleMatricular}>
        <div className="titulo">
          Matricular
        </div>
        <div className="titulo">
          <input
            placeholder="Codigo Acesso"
            value={codigoAcesso}
            onChange={(event) => setCodigoAcesso(event.target.value)}
          />
        </div>
        <div className="campos-de-btns" >
          <Button
          variant="contained"
          color="error"
          size="small"
          id="btn-detalhes-temas"
          onClick={handleCancel}
          >voltar</Button>
          
          <Button variant="contained" color="primary" size="small" id="btn-detalhes-temas"
            onClick={handleMatricular}>Matricular</Button>
        </div>
      </form>
        </Paper> 
      </Box>
      </div>
    </>
  );
}