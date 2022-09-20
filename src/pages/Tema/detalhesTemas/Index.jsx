import React, { useState, useEffect } from 'react';
import NavBarTcc from '../../../components/NavBarTcc.jsx';
import { useParams } from "react-router-dom";
import api from '../../../services/api.js';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const headCells = ['codigo', 'Enuciado', 'opções'];
const size = 50;
export default function DetalhesTema() {
  const { id } = useParams();
  const [tema, setTema] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [loading, setLoading] = useState(true);
  const [pageApi, setPageApi] = useState(0);
  const [auxPage, setAuxPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  useEffect(() => {
    
    handleCallapi();

  }, []);
  const handleCallapi = async () => {
    api.get(`/temas/${id}`).then(
      (success) => {
        console.log(success);
        setTema(success.data);
        setTotalElements(success.data.questoes.length);
        setLoading(false);
      
      },
      (error) => {
        console.log(error);
        alert("Ocorreu um erro, tente novamente mais tarde!")
      }
    );
  }

  const handleChangePage = async   (event, newPage) => {
    var auxNPage = newPage + 1;
    var rangeMinimo = (pageApi === 0) ? (pageApi + 1) : pageApi * size;
    var rangeMaximo = (pageApi === 0) ? size : rangeMinimo + size;
    var rangeAtual = auxNPage * rowsPerPage;

    console.log("rangeMinimo: " , rangeMinimo , " rangeAtual: ", rangeAtual, " RangeMaximo: ", rangeMaximo);
      if (rangeAtual > rangeMaximo) {
        console.log("rangeAtual > rangeMaximo")
        setLoading(true);
        await handleCallapi(pageApi + 1, size);
        await  setPageApi(pageApi + 1);
      }
      if (rangeAtual <= rangeMinimo) {
        console.log("rangeAtual <= rangeMinimo")
        setLoading(true);
        await handleCallapi(pageApi - 1, size);
        await setPageApi(pageApi - 1);   
      }
      if(newPage < page){
        await setAuxPage(auxPage - 1);
      }else {
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
      { loading ? <div className="loading">Carregando <p className="pontos">...</p> </div> :
      <>
        <Toolbar>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
           
          >
          Detalhes de   {tema.description}
          </Typography>
          <Link to={`/nova-questao`}>
          <Button 
              variant="contained"
              color="primary"
              size="small" 
          >
              Nova Questão
          </Button>
          </Link>   
            
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
              {tema.questoes
                .slice(auxPage * rowsPerPage, auxPage * rowsPerPage + rowsPerPage)
                .map((questao, index) => {

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                    >

                      <TableCell
                        component="th"
                        scope="row"
                        padding='normal'
                      >
                        {questao.codigo}
                      </TableCell>
                      <TableCell align='center'  >{questao.enuciado}</TableCell>
                      <TableCell align='center'   >
                        <Link to={`/temas/${questao.id}`}>
                          <Button variant="contained" color="primary" size="small" id="btn-detalhes-temas"  >Detalhes</Button>
                        </Link>
                       <Link to={`/delete/questoes/${tema.id}`} >
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
          rowsPerPageOptions={[ 2, 5, 10]}
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