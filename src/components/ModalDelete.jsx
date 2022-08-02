import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import closeImg from "../assets/close.svg";
import { Button } from '@mui/material';
import api from '../services/api.js';

export function ModalDelete({ isOpen, onRequestClose, atualizar,id, recurso}) {

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
      <div>
        <div><h2>Tem certeza que quer excluir este recurso "{recurso}"</h2></div>
        <div>
        <Button
          variant="contained"
          color="success"
          size="small"
          id="btn-detalhes-temas"
          onClick={onRequestClose}
          >Não</Button>
          <Button
          variant="contained"
          color="error"
          size="small"
          id="btn-detalhes-temas"
          onClick={onRequestClose}
          >Sim</Button>
        </div>
      </div>
    </Modal>
  )
}