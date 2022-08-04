import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import closeImg from "../assets/close.svg";
import { Button } from '@mui/material';
import api from '../services/api.js';
import { useHistory } from 'react-router-dom';

export function ModalTema({ isOpen, onRequestClose,  editTema }) {
  const [tema, setTema] = useState('');
  const jwt = localStorage.getItem('jwt');
  const history = useHistory();
  const handleCreateNewTema = (event) => {

    if(tema.trim() !== ''){
      const body = {
        descricao : tema
      }
      const header = {
        headers: {"Authorization" : `Bearer ${jwt}`}
      }
      api.post('/temas',body,header).then(
        (success) => {
          setTema('');
          onRequestClose();
          history.push('/');

        }
      ).catch((error) => {
        if( error.response ){
            if(error.response.data.status === 403){
              alert("sessão expirada");
              localStorage.setItem('jwt', '');
              onRequestClose() 
            } 
        }
      });
    }else{
      alert("escrever algo!");
    }
    
  
  }
  const handlehaveEditTema = () =>{
    setTema(editTema.tema);
  }
  useEffect(() => {
    if (editTema) {
      handlehaveEditTema();
    }
  })
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" className="react-modal-close" onClick={onRequestClose}>
        <img src={closeImg} alt="Fechar o modal" />
      </button>
      <form  onSubmit={handleCreateNewTema}>
        <div className="titulo">
          {(editTema) ? <h2 >Editar Tema</h2> : <h2 >Cadastrar Tema</h2>}
        </div>
        <div className="titulo">
          <input
            placeholder="Tema"
            value={tema.tema}
            onChange={(event) => setTema(event.target.value)}
          />
        </div>
        <div className="campos-de-btns" >
          <Button
          variant="contained"
          color="error"
          size="small"
          id="btn-detalhes-temas"
          onClick={onRequestClose}
          >Cancelar</Button>
          {(editTema) ?
            <Button variant="contained" color="primary" size="small" id="btn-detalhes-temas"  >Atualizar</Button> :
            <Button variant="contained" color="primary" size="small" id="btn-detalhes-temas"  onClick={handleCreateNewTema}>Cadastrar</Button>}
        </div>
      </form>

    </Modal>
  );
}