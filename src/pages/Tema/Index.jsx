import React from 'react';
import TableTema from '../../components/TableTema.jsx';


import NavBarTcc from '../../components/NavBarTcc.jsx';


export default function Tema() {
  

 
  return (
    <>
      <NavBarTcc />
      <div className="container center">
        <TableTema/>
      </div>
      
    </>
  );
}