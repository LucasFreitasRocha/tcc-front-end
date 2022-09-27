import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';

import NavBarTcc from '../../components/NavBarTcc.jsx';
import TableQuestao from '../../components/TableQuestao.jsx';


export default function Questao() {
  const [loading, setLoading] = useState(true);
  const [questoes, setQuestoes] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [totalElements, setTotalElements] = useState(0);

  const handleChangePage = async   (event, newPage) => {
    setPage(newPage);
    setLoading(true);
    handleCallapi();
  }
  

  const handleChangeRowsPerPage = async (event) => {
    setLoading(true);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    handleCallapi(parseInt(event.target.value, 10));
  };
  useEffect(() => {
    
    handleCallapi(rowsPerPage);

  }, []);
  const handleCallapi = async (perPage) => {
    api.get(`/questoes?page=${page}&size=${perPage}`).then(async (success) => {
      console.log(success)
      await setPage(0);
      await  setQuestoes(success.data.content);
      await setLoading(false);
      await setTotalElements(success.data.totalElements);
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