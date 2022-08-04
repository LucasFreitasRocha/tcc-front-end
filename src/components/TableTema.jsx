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
import { Link } from 'react-router-dom';


const headCells = ['id', 'tema', 'opções'];
/*const temas2  = [
  {id: 1 , tema : 'tema 1'},
  {id: 1 , tema : 'tema 2'},
  {id: 1 , tema : 'tema 3'},
  {id: 1 , tema : 'tema 4'},
  {id: 1 , tema : 'tema 5'},
  {id: 1 , tema : 'tema 6'}
 ] */
// const largura = window.screen.width;

const size = 50;

export default function TableTema( {handleOpenTemaModal}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [loading, setLoading] = useState(true);
  const [temas, setTemas] = useState([]);
  const [pageApi, setPageApi] = useState(0);
  const [auxPage, setAuxPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  useEffect( () => {

     handleCallapi(0, size);
  
  }, [])

 

  const handleCallapi = async (pageAux, size) => {
    api.get(`/temas?page=${pageAux}&size=${size}`).then(async (success) => {
      console.log(success)
      await setAuxPage(0);
      await  setTemas(success.data.content);
      await setTotalElements(success.data.totalElements);
      await setLoading(false);
     },
     (error) => {
       console.log(error)
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
            Temas
          </Typography>
          <Button 
              variant="contained"
              color="primary"
              size="small" 
              onClick={handleOpenTemaModal}
            >
              Novo
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
              {temas
                .slice(auxPage * rowsPerPage, auxPage * rowsPerPage + rowsPerPage)
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
                       <Link to={`/delete/temas/${tema.id}`} >
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
  );
}
