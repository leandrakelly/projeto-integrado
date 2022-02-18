import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import api from '../services/api';

function MedicineDonation() {
  const [donations, setDonations] = useState([]);
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [validity, setValidity] = useState('');
  const [name, setName] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const { data } = await api.post('/med_donation', {
      user_id: user,
      quantity,
      validity,
      name,
    });

    if (!data.error) {
      alert(data.message);
      handleDonations();
    }
  }

  async function handleDonations() {
    const { data } = await api.get('/med_donation');

    setDonations(data.data);
  }

  async function handleDelete(id) {
    const { data } = await api.delete(`/med_donation/${id}`);

    if (!data.error) {
      alert('Doação apagada com sucesso!');
      handleDonations();
    }
  }

  useEffect(() => {
    async function handleUsers() {
      const { data } = await api.get('/user');

      setUsers(data.data);
    }

    handleUsers();
    handleDonations();
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
            label="Medicamento"
            variant="outlined"
          />
          <InputLabel id="user">Cliente</InputLabel>
          <Select
            labelId="user"
            id="demo-simple-select"
            value={user}
            label="Cliente"
            onChange={(e) => setUser(e.target.value)}
          >
            {users.map((user) => {
              return <MenuItem value={user.id}>{user.name}</MenuItem>;
            })}
          </Select>
          <TextField
            id="outlined-basic"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            label="Quantidade"
            variant="outlined"
          />
          <div>
            <InputLabel id="nascimento">Data de Validadte</InputLabel>
            <TextField
              id="outlined-basic"
              type="date"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              variant="outlined"
            />
          </div>
          <Button variant="contained" onClick={handleSubmit}>
            Cadastrar Doação de Medicina
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">Validade</TableCell>
                <TableCell align="right">Quantidade</TableCell>
                <TableCell align="right">ID Usuario</TableCell>
                <TableCell align="right">Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell component="th" scope="row">
                    {donation.id}
                  </TableCell>
                  <TableCell align="right">{donation.name}</TableCell>
                  <TableCell align="right">{donation.validity}</TableCell>
                  <TableCell align="right">{donation.quantity}</TableCell>
                  <TableCell align="right">{donation.user_id}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleDelete(donation.id);
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

export default MedicineDonation;
