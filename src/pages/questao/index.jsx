import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';

import NavBarTcc from '../../components/NavBarTcc.jsx';
import TableQuestao from '../../components/TableQuestao.jsx';


export default function Questao() {
  const [loading, setLoading] = useState(true);
  const [questoes, setQuestoes] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [auxPage, setAuxPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const handleChangePage = async   (event, newPage) => {
    setLoading(true);
    handleCallapi(newPage,rowsPerPage);
  }
  

  const handleChangeRowsPerPage = async (event) => {
    setLoading(true);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    handleCallapi(0, parseInt(event.target.value, 10));
  };
  useEffect(() => {
    
    handleCallapi(page,rowsPerPage);

  }, []);
  const handleCallapi = async (newPage,perPage) => {
    api.get(`/questoes?page=${newPage}&size=${perPage}`).then(async (success) => {
      console.log(success)
      setPage(newPage);
      setAuxPage(0);
      await setQuestoes(success.data.content);
      await setTotalElements(success.data.totalElements);
      await setLoading(false);
      
     },
     (error) => {
       console.log(error)
     }
   );
  }

  return (
    <>
      <NavBarTcc />
      <div className="container center">
    { loading ? <div className="loading">Carregando <p className="pontos">...</p> </div> :
      <TableQuestao
      title="Questões"
      questoes={questoes} 
      page ={page}
      auxPage={auxPage}
      totalElements = {totalElements}
      rowsPerPage = {rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    }
    </div>
    </>
  )
} 