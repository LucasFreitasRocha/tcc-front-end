import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import api from '../services/api.js';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';





export default function FormQuestao({ editQuestao }) {
  const [enuciado, setEnuciado] = useState('');
  const [temas, setTemas] = useState([]);
  const [alternativas, setAlternativas] = useState([]);
  const [selectedTemas, setSelectedTemas] = useState(1);
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
  const handleChangeVerdadeiraAlternativa = async (verdadeira, index) => {
    alternativas[index].certo = verdadeira;
    await setAlternativas([...alternativas]);
  
  }
  const handleAddAlternativa = () => {
    setAlternativas([...alternativas, { alternativa: '', certo: false }])
  }
  const handleCreateNewQuestao = (event) => {
    console.log(alternativas)
  }


  const handleRemoveAlternativa = (position) => {

    console.log("handleRemoveAlternativa")
    setAlternativas([...alternativas.filter(( alternativa ,index)  => index !== position)]);
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
              onClick={handleAddAlternativa}  >Adicionar Questão</Button>
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
                  <div className="campos-de-btns">
                    <div >
                      <div> resposta Certa? </div>
                      <ToggleButton
                        value="check"
                        color="success"
                        selected={alternativa.certo}
                        onChange={(event) => {
                          handleChangeVerdadeiraAlternativa(!event.target.value, index)
                        }
                        }
                      >
                        <CheckIcon />
                      </ToggleButton>
                    </div>
                    <div className="campos-de-btns" >
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        id="removerAlternativa"
                        onClick={(event) => {setAlternativas([...alternativas.filter(( alternativa ,index2)  => index2 !== index)]);}}
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
