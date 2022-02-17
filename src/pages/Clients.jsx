import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import api from '../services/api';

function Clients() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    async function handleClients() {
      const url = '/user';
      try {
        const { data } = await api.get(url);
  
        setUsers(data.data);
      } catch (error) {
        console.log(error) 
      }
    }
  
    handleClients();
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
                <TableCell align="right">Telefone</TableCell>
                <TableCell align="right">CPF</TableCell>
                <TableCell align="right">Endereço</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="right">
                    {user.name}
                  </TableCell>
                  <TableCell align="right">{user.phone}</TableCell>
                  <TableCell align="right">{user.cpf}</TableCell>
                  <TableCell align="right">{user.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </header>
      </div>
    )
  }
  
  export default Clients