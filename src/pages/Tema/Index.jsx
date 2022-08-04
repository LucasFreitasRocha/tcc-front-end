import React, { useState } from 'react';
import TableTema from '../../components/TableTema.jsx';


import NavBarTcc from '../../components/NavBarTcc.jsx';
import { ModalTema } from '../../components/ModalTema.jsx';


export default function Tema() {
  const [isNewTemaModalOpen, setIsNewTransactionModalOpen] = useState(false);
  
  

  function handleOpenTemaModal(){
    setIsNewTransactionModalOpen(true);
  }
  function handleCloseNewTransactionModal(){
    setIsNewTransactionModalOpen(false);
  }
 
  return (
    <>
      <NavBarTcc />
      <ModalTema
        isOpen={isNewTemaModalOpen}
        onRequestClose={handleCloseNewTransactionModal} 
        
      />
      <div className="container center">
        <TableTema 
          handleOpenTemaModal={handleOpenTemaModal}
        

        />
      </div>
      
    </>
  );
}