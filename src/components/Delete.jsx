import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import closeImg from "../assets/close.svg";
import { Button } from '@mui/material';
import api from '../services/api.js';
import { useHistory, useParams } from "react-router-dom";
import NavBarTcc from "./NavBarTcc";

export function Delete() {
  const { id, recurso } = useParams();
  const history = useHistory();
  const jwt = localStorage.getItem('jwt');
  const handleCancel = () => {
    history.goBack();
  }
  const handleConfirm = () => {
    const header = {
      headers: {"Authorization" : `Bearer ${jwt}`}
    }
    api.delete(`/${recurso}/${id}`)
    .then((sucess) => {
      alert(`Recurso ${recurso} excluido com sucesso`);
      history.push(`/${recurso}`)
    }).catch((error) => {
      if( error.response ){
          if(error.response.data.status === 403){
            alert("sessão expirada");
            localStorage.setItem('jwt', '');
            history.push("/")
          }else if(error.response.data.status === 404){
            alert(`Recurso não existe com esse id: ${id} ` );
          }else{
            console.log(error);
            alert('Ocorreu um erro, tente novamente mais tarde')
          }    
      }
    });
  }
  
  return (
    <>
    <NavBarTcc />
    <div className="container center">
    <Box className="box-tema">
      <Paper >
      <div >
        <div><h2>Tem certeza que quer excluir este recurso "{recurso}"</h2></div>
        <div>
        <Button
          variant="contained"
          color="success"
          size="small"
          id="btn-detalhes-temas"
          onClick={handleCancel}
          >Não</Button>
          <Button
          variant="contained"
          color="error"
          size="small"
          id="btn-detalhes-temas"
          onClick={handleConfirm}
          >Sim</Button>
        </div>
      </div>
      </Paper>
      </Box>
      </div>
      </>
  )
}