import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import closeImg from "../assets/close.svg";
import { Button } from '@mui/material';

export function ModalTema({ isOpen, onRequestClose, editTema }) {
  const [tema, setTema] = useState({});
  const handleCreateNewTema = (event) => {
    event.preventDefault();
  }
  useEffect(() => {
    if (editTema) {
      setTema(editTema)
    }
  }, [])
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
      <form action="" onSubmit={handleCreateNewTema}>
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
          <Button variant="contained" color="error" size="small" id="btn-detalhes-temas"  >Cancelar</Button>
          {(editTema) ?
            <Button variant="contained" color="primary" size="small" id="btn-detalhes-temas"  >Atualizar</Button> :
            <Button variant="contained" color="primary" size="small" id="btn-detalhes-temas"  >Cadastrar</Button>}
        </div>
      </form>

    </Modal>
  );
}