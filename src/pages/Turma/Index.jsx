import React from 'react';
import NavBarTcc from '../../components/NavBarTcc.jsx';
import TableTurma from '../../components/TableTurma.jsx';
import { Link } from 'react-router-dom';
import { Button, Box,Paper } from '@mui/material';


export default function Turma() {
  

 
  return (
    <>
      <NavBarTcc />
      <div className="container center">
      <TableTurma />
      </div>
      
    </>
  );
}