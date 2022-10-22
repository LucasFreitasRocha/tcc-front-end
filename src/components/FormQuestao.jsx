import React, { useState, useEffect } from 'react';
import 
{ 
  Button,
  Box,
  Paper,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Checkbox
} from '@mui/material';

import { useHistory } from 'react-router-dom';
import api from '../services/api.js';





export default function FormQuestao({ editQuestao }) {
  const [enuciado, setEnuciado] = useState('');
  const [codigo, setCodigo] = useState('');
  const [temas, setTemas] = useState([]);
  const [alternativas, setAlternativas] = useState([]);
  const [selectedTemas, setSelectedTemas] = useState(1);
  const history = useHistory();
  useEffect(() => {
    handleCallapi();

  }, []);
  const handleCallapi = async () => {
    api.get('/temas/select-temas').then(async (success) => {
      console.log(success.data)
      setTemas(success.data);
    },
      (error) => {
        console.log(error)
      }
    );

  }
  const handleChangeEnuciadoAlternativa = (alternativa, index) => {

    alternativas[index].alternativa = alternativa;
    setAlternativas([...alternativas]);

  }
  const handleChangeCodigolternativa = (codigo, index) => {

    alternativas[index].codigo = codigo;
    setAlternativas([...alternativas]);

  }
  const handleCheckBox = (index) => {
    alternativas.forEach((alternativa, index2)=> {
      if(index2 != index){
        alternativa.certo = false;
      }else{
        alternativa.certo = !alternativa.certo;
      }
    })
    setAlternativas([...alternativas])
  }
  const handleAddAlternativa = () => {
    setAlternativas([...alternativas, { alternativa: '', codigo: '',  certo: false }])
  }
  const handleCreateNewQuestao = (event) => {
    const questao = {
      alternativas: alternativas ,
      codigo: codigo,
      enuciado: enuciado,
      temaId: selectedTemas
    }
    api.post('/questoes',questao ).then(
      (success) => {
        setEnuciado('');
        setCodigo('');
        setAlternativas([]);
        history.push('/');

      }
    ).catch((error) => {
      if( error.response ){
          if(error.response.data.status === 403){
            alert("sessão expirada");
            localStorage.setItem('jwt', '');
          } 
          console.log(error.response);
      }
    });
    
  }




  return (
    <Box className="box-tema">
      <Paper >
        <form onSubmit={handleCreateNewQuestao}>
          <div className="titulo">
            {(editQuestao) ? <h2 >Editar Questao</h2> : <h2 >Cadastrar Questao</h2>}
          </div>
          <div className="titulo">
            <input
              placeholder="Enuciado"
              value={enuciado}
              onChange={(event) => setEnuciado(event.target.value)}
            />
          </div>
          <div className="titulo">
            <input
              placeholder="Codigo"
              value={codigo}
              onChange={(event) => setCodigo(event.target.value)}
            />
          </div>
          <FormControl className="select-form-control">
            <InputLabel id="demo-simple-select-label" className="select-input-placeholder">Temas</InputLabel>
            <Select
              className="select-input"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedTemas}
              label="Temas"
              onChange={(event) => setSelectedTemas(event.target.value)}
            >
              {temas.map((tema, index) => {
                return (<MenuItem value={tema.value}>{tema.label}</MenuItem>);
              })
              }


            </Select>
          </FormControl>

          <div>
            <h2>A Questão deve ter pelo menos 2 alternativas</h2>
            <Button variant="contained" color="success" size="small" id="btn-detalhes-temas"
              onClick={handleAddAlternativa}  >Adicionar Alternativa</Button>
          </div>

          {
            alternativas.map((alternativa, index) => {
              return (
                <div key={index} className="sub-form-alternativas">
                  <input
                    placeholder="Enuciado Da alternativa"
                    value={alternativa.alternativa}
                    onChange={(event) => handleChangeEnuciadoAlternativa(event.target.value, index)}
                  />
                  <input
                    placeholder="codigo Da alternativa"
                    value={alternativa.codigo}
                    onChange={(event) => handleChangeCodigolternativa(event.target.value, index)}
                  />
                  <div className="campos-de-btns">
                    <div >
                      <div> resposta Certa? </div>
                      <Checkbox
                        checked={alternativa.certo}
                        onChange={(event) => {
                         handleCheckBox(index)
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </div>
                    <div className="campos-de-btns" >
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        id="removerAlternativa"
                        onClick={(event) => { setAlternativas([...alternativas.filter((alternativa, index2) => index2 !== index)]); }}
                      >Remover Alternativa</Button>
                    </div>
                  </div>
                </div>
              );
            })
          }


          <div className="campos-de-btns" >
            <Button
              variant="contained"
              color="error"
              size="small"
              id="btn-detalhes-temas"

            >Cancelar</Button>
            {(editQuestao) ?
              <Button variant="contained" color="primary" size="small" id="btn-detalhes-temas"  >Atualizar</Button> :
              <Button variant="contained" color="primary" size="small" id="btn-detalhes-temas" onClick={handleCreateNewQuestao}>Cadastrar</Button>}
          </div>
        </form>

      </Paper>
    </Box>
  );

}
