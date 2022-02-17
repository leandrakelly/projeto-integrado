import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import api from '../services/api'

function Animals() {
  const [animals, setAnimals] = useState([]);


  useEffect(() => {
    async function handleAnimals() {
      const url = '/animal';
      try {
        const { data } = await api.get(url);
  
        setAnimals(data.data);
      } catch (error) {
        console.log(error) 
      }
    }
  
    handleAnimals();
  },[])

  return (
    <div>
      <header>
        <Header/>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">Raça</TableCell>
                <TableCell align="right">Nascimento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {animals.map((animal) => (
                <TableRow key={animal.id}>
                  <TableCell component="th" scope="row">
                    {animal.id}
                  </TableCell>
                  <TableCell align="right">
                    {animal.name}
                  </TableCell>
                  <TableCell align="right">{animal.breed}</TableCell>
                  <TableCell align="right">{animal.birth}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </header>
    </div>
  )
}

export default Animals