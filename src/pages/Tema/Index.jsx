import React, { useState } from 'react';
import TableTema from '../../components/TableTema.jsx';


import NavBarTcc from '../../components/NavBarTcc.jsx';
import { ModalTema } from '../../components/ModalTema.jsx';


export default function Tema() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  
  function handleOpenNewTransactionModal(){
    setIsNewTransactionModalOpen(true);
  }
  function handleCloseNewTransactionModal(){
    setIsNewTransactionModalOpen(false);
  }
 
  return (
    <>
      <NavBarTcc />
      <ModalTema
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal} 
      />
      <div className="container center">
        <TableTema handleOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      </div>
      
    </>
  );
}