import React from 'react';
import { useParams } from "react-router-dom";
import FormQuestao from '../../../components/FormQuestao';
import NavBarTcc from '../../../components/NavBarTcc';
export default function NovaQuestao( ) {
 
  return(
    <>
      <NavBarTcc />
      
      <div className="container center">
      
      <FormQuestao  />
      </div>

    </>
  );

}