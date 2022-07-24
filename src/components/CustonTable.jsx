import * as React from 'react';
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


function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData('Cupcake', 305),
  createData('Donut', 452),
  createData('Eclair', 262),
  createData('Frozen yoghurt', 159),
  createData('Gingerbread', 356),
  createData('Honeycomb', 408),
  createData('Ice cream sandwich', 352),
  createData('Jelly Bean', 375),
  createData('KitKat', 518),
  createData('Lollipop', 392),
  createData('Marshmallow', 318),
  createData('Nougat', 360),
  createData('Oreo', 437),
];
const headCells = [ 'id', 'tema']


const variaveisBody = [
  {id : 1,
    tema: 'tutorial'
  },
  { 
    id : 1,
    tema: 'Noções Básicas de Segurança da Informação'
  },
  { 
    id : 1,
    tema: 'Segurança Física e Lógica'
  }
]


export default function CustonTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box sx={{ width: '70%' }}>
      <Paper sx={{ width: '70%', mb: 2 }}>
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
            sx={{ minWidth: 100 }}
            aria-labelledby="tableTitle"
            size='small'
          >
            
            <TableHead>
              <TableRow>
                {headCells.map((headCell, index) => (
                  <TableCell
                    key={index}
                    align='left'
                    padding= 'normal' 
                  >
                    {headCell}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {variaveisBody
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((variavelBody, index) => {

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                    >

                      <TableCell
                        component="th"
                      
                        scope="row"
                        padding= 'normal'
                      >
                        {variavelBody.id}
                      </TableCell>
                      <TableCell align="left"  >{variavelBody.tema}</TableCell>
                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 3, 5]}
          component="div"
          count={variaveisBody.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
