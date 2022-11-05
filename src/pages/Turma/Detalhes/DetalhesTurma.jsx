import React, { useState, useEffect } from 'react';
import NavBarTcc from '../../../components/NavBarTcc.jsx';
import { useParams } from "react-router-dom";
import api from '../../../services/api.js';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  Box,
  TableRow,
  Paper,
  Toolbar,
  Typography,
  TableContainer
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const headCells = ['id', 'name', 'Ranking', 'opções'];
const size = 50;
export default function DetalhesTurma() {
  const { id } = useParams();
  const jwt = localStorage.getItem('jwt');
  const [loading, setLoading] = useState(true);
  const [turma, setTurma] = useState({})
  const [page, setPage] = useState(0);
  const [pageApi, setPageApi] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [auxPage, setAuxPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [usuarioTurmas, setUsuarioTurmas] = useState([]);
  const header = {
    headers: {"Authorization" : `Bearer ${jwt}`}
  }
  useEffect(() => {
    
    handleCallapi();

  }, []);

  const handleRanking = () => {
    api.post(`/turmas/calcularRanking/${id}`, {}, header).then( async (success) => {
     alert("Ranking Calculado com sucesso")
     handleCallapi();
    },
    (error) => {
      console.log(error);
      alert("Ocorreu um erro, tente novamente mais tarde!")
    }
  );
  }
  const handleCallapi = async () => {
   
    api.get(`/turmas/${id}`, header ).then( async (success) => {
        var total = success.data.UsuariosTurma.length;
        console.log(success)
        await setTurma(success.data);
        await setTotalElements(total);
        await setUsuarioTurmas(success.data.UsuariosTurma);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        alert("Ocorreu um erro, tente novamente mais tarde!")
      }
    );

    
  }
  const handleChangePage = async (event, newPage) => {
    var auxNPage = newPage + 1;
    var rangeMinimo = (pageApi === 0) ? (pageApi + 1) : pageApi * size;
    var rangeMaximo = (pageApi === 0) ? size : rangeMinimo + size;
    var rangeAtual = auxNPage * rowsPerPage;

    console.log("rangeMinimo: ", rangeMinimo, " rangeAtual: ", rangeAtual, " RangeMaximo: ", rangeMaximo);
    if (rangeAtual > rangeMaximo) {
      console.log("rangeAtual > rangeMaximo")
      setLoading(true);
      await handleCallapi(pageApi + 1, size);
      await setPageApi(pageApi + 1);
    }
    if (rangeAtual <= rangeMinimo) {
      console.log("rangeAtual <= rangeMinimo")
      setLoading(true);
      await handleCallapi(pageApi - 1, size);
      await setPageApi(pageApi - 1);
    }
    if (newPage < page) {
      await setAuxPage(auxPage - 1);
    } else {
      await setAuxPage(auxPage + 1);
    }
    setPage(newPage);
  }


  const handleChangeRowsPerPage = async (event) => {

    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setAuxPage(0);
  };

  return (
    <>
    <NavBarTcc />
    <div className="container center">
    <Box className="box-tema">
        <Paper >
          {loading ? <div className="loading">Carregando <p className="pontos">...</p> </div> :
            <>
              
              <Toolbar>
                <Typography
                  sx={{ flex: '1 1 100%' }}
                  variant="h6"
                  id="tableTitle"
                  component="div"

                >
                  Alunos
                </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick ={handleRanking}
                  >
                    Calcular Ranking
                  </Button>
              </Toolbar>

              <TableContainer>

                <Table
                  sx={{ minWidth: 500 }}
                  aria-labelledby="tableTitle"
                  size='small'
                >

                  <TableHead>
                    <TableRow>
                      {headCells.map((headCell, index) => (
                        <TableCell
                          key={index}
                          align='center'
                          padding='normal'
                        >
                          {headCell}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                    {usuarioTurmas
                      .slice(auxPage * rowsPerPage, auxPage * rowsPerPage + rowsPerPage)
                      .map((turma, index) => {

                        return (
                          <TableRow
                            hover
                            tabIndex={-1}
                            key={turma.id}
                          >

                            <TableCell
                              component="th"
                              scope="row"
                              padding='normal'
                            >
                              {turma.id}
                            </TableCell>
                            <TableCell align='center'  >{turma.user.nome}</TableCell>
                            <TableCell align='center'  >{turma.ranking}</TableCell>
                            <TableCell align='center'   >
                              <Link to={`/turmas/${turma.id}`}>
                                <Button variant="contained" color="primary" size="small" id="btn-detalhes-temas"  >Detalhes</Button>
                              </Link>
                              <Link to={`/delete/turmas/${turma.id}`} >
                                <Button
                                  variant="outlined"
                                  color="error"
                                  startIcon={<DeleteIcon />}
                                  size="small"
                                >Delete</Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[2, 5, 10]}
                component="div"
                count={totalElements}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          }
        </Paper>
      </Box>
    </div>
    </>
  );
}