import React, { useState } from 'react';
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
export default function TableQuestao(
  {title,
  questoes,
  page,
  totalElements,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage}) {
 

  
  return (
    <>
     <Box className="box-tema">
      <Paper >
        <Toolbar>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
           
          >
          Detalhes de   {title}
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
              {questoes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((questao, index) => {

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={questao.codigo}
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
                        <Link to={`/questoes/${questao.id}`}>
                          <Button variant="contained" color="primary" size="small" id="btn-detalhes-temas"  >Detalhes</Button>
                        </Link>
                       <Link to={`/delete/questoes/${questao.id}`} >
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
      </Paper>
    </Box>
    </>
  );
}