import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  InputLabel,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import api from '../services/api';

function Clients() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');

  async function handleSubmit() {
    const { data } = await api.post('/user', {
      name,
      address,
      phone,
      cpf,
    });

    if (!data.error) {
      alert('Cliente cadastrado com sucesso!');
      handleClients();
    } else {
      alert(data.message);
    }
  }

  async function handleClients() {
    const url = '/user';
    try {
      const { data } = await api.get(url);

      setUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    const { data } = await api.delete(`/user/${id}`);

    if (!data.error) {
      alert('Cliente apagado com sucesso!');
      handleClients();
    }
  }

  useEffect(() => {
    handleClients();
  }, []);

  return (
    <div>
      <header>
        <Header />
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Nome"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            label="Endereço"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            label="Telefone"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            label="CPF"
            variant="outlined"
          />
          <Button variant="contained" onClick={handleSubmit}>
            Cadastrar Usuário
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">Telefone</TableCell>
                <TableCell align="right">CPF</TableCell>
                <TableCell align="right">Endereço</TableCell>
                <TableCell align="right">Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="right">{user.name}</TableCell>
                  <TableCell align="right">{user.phone}</TableCell>
                  <TableCell align="right">{user.cpf}</TableCell>
                  <TableCell align="right">{user.address}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleDelete(user.id);
                      }}
                    >
                      Deletar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </header>
    </div>
  );
}

export default Clients;
