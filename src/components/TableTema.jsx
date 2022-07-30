import React, { useState, useEffect } from 'react';
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
import api from '../services/api.js';
import './index.css';

const size = 2;

const headCells = ['id', 'tema', 'opções'];
const largura = window.screen.width;

var auxTemas = [];

export default function TableTema() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [temas, setTemas] = useState([]);
  const [pageApi, setPageApi] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  useEffect( async () => {
    await handleCallapi(0);

  }, [])

  const handleCallapi = async (pageAux) => {
     
     api.get(`/tema?page=${pageAux}&size=${size}`).then((success) => {
      auxTemas = success.data.content;
      setTotalElements(success.data.totalElements);
      console.log(success)
      setLoading(false);
      
     },
     (error) => {
       console.log(error)
     }
   );
  }

  const handleChangePage =   (event, newPage) => {
    var auxNPage = newPage + 1;
    var rangeMinimo = (pageApi === 0) ? (pageApi + 1) : pageApi * size;
    var rangeMaximo = (pageApi === 0) ? size : rangeMinimo + size;
    var rangeAtual = auxNPage * rowsPerPage;

    console.log("page API: ", pageApi);
    console.log("aux page: ", auxNPage);
    console.log("rangeMinimo: ", rangeMinimo);
    console.log("rangeAtual: ", rangeAtual);
    console.log("rangeMaximo: ", rangeMaximo);

   
      if (rangeAtual > rangeMaximo) {
        console.log("aumentar a pagina api");
        setLoading(true);
         handleCallapi(pageApi + 1);
        setPageApi(pageApi + 1);
       
      }
      if (rangeAtual < rangeMinimo) {
        console.log("diminuir  a pagina api");
        setLoading(true);
         handleCallapi(pageApi - 1);
        setPageApi(pageApi - 1);

        
      }

      setPage(newPage);

      console.log("----------------------------------------------")
    
  }
  

  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    console.log("rowsPerPage: ", rowsPerPage);
    setPage(0);
    // handleCallapi(event.target.value);

  };
  return (
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
            Nutrition
          </Typography>
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
              {auxTemas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((tema, index) => {

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
                        {tema.id}
                      </TableCell>
                      <TableCell align='center'  >{tema.tema}</TableCell>
                      <TableCell align='center'   >
                        <Button variant="contained" color="primary" size="small" id="btn-detalhes-temas"  >Detalhes</Button>
                        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} size="small">Delete</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 2, 5, 10]}
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
  );
}
