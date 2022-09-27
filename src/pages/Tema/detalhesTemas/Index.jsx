import React, { useState, useEffect } from 'react';
import NavBarTcc from '../../../components/NavBarTcc.jsx';
import { useParams } from "react-router-dom";
import api from '../../../services/api.js';
import TableQuestao from '../../../components/TableQuestao.jsx';




export default function DetalhesTema() {
  const { id } = useParams();
  const [tema, setTema] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const handleChangePage = async   (event, newPage) => {
    setPage(newPage);
  }
  

  const handleChangeRowsPerPage = async (event) => {
    
     setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 
  useEffect(() => {
    
    handleCallapi();

  }, []);
  const handleCallapi = async () => {
    api.get(`/temas/${id}`).then(
      (success) => {
        console.log(success);
        setTema(success.data);
        setTotalElements(success.data.questoes.length);
        setLoading(false);
      
      },
      (error) => {
        console.log(error);
        alert("Ocorreu um erro, tente novamente mais tarde!")
      }
    );
  }

  
  return (
    <>
    <NavBarTcc />
    <div className="container center">
    { loading ? <div className="loading">Carregando <p className="pontos">...</p> </div> :
      <TableQuestao
      title={tema.description}
      questoes={tema.questoes} 
      page ={page}
      auxPage = {page}
      rowsPerPage = {rowsPerPage}
      totalElements = {totalElements}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    }
    </div>
    </>
  );

} 