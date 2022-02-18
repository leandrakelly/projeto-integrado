import {
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
  Box,
  TextField,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import api from '../services/api';

function FeedDonation() {
  const [donations, setDonations] = useState([]);
  const [rations, setRations] = useState([]);
  const [users, setUsers] = useState([]);

  const [ration, setRation] = useState(0);
  const [user, setUser] = useState(0);
  const [validity, setValidity] = useState('');
  const [quantity, setQuantity] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await api.post('/ration_donation', {
        ration_id: ration,
        user_id: user,
        validity: new Date(validity),
        quantity,
      });

      if (!data.error) {
        alert(data.message);
        handleDonations();
      }
    } catch (error) {
      alert(error);
    }
  }

  async function handleDonations() {
    const { data } = await api.get('/ration_donation');

    setDonations(data.data);
  }

  async function handleDelete(id) {
    const { data } = await api.delete(`/ration_donation/${id}`);

    if (!data.error) {
      alert('Doação apagada com sucesso!');
      handleDonations();
    }
  }

  useEffect(() => {
    async function handleRations() {
      const { data } = await api.get('/ration');

      setRations(data.data);
    }

    async function handleUsers() {
      const { data } = await api.get('/user');

      setUsers(data.data);
    }

    handleUsers();
    handleRations();
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
          <InputLabel id="ration">Ração</InputLabel>
          <Select
            labelId="ration"
            id="demo-simple-select"
            value={ration}
            label="Ração"
            onChange={(e) => setRation(e.target.value)}
          >
            {rations.map((ration) => {
              return <MenuItem value={ration.id}>{ration.name}</MenuItem>;
            })}
          </Select>
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
            <InputLabel id="nascimento">Data de Validade</InputLabel>
            <TextField
              id="outlined-basic"
              type="date"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              variant="outlined"
            />
          </div>
          <Button variant="contained" onClick={handleSubmit}>
            Cadastrar Doação de Ração
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">ID Ração</TableCell>
                <TableCell align="right">ID Cliente</TableCell>
                <TableCell align="right">Validade</TableCell>
                <TableCell align="right">Quantidade</TableCell>
                <TableCell align="right">Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell component="th" scope="row">
                    {donation.id}
                  </TableCell>
                  <TableCell align="right">{donation.ration_id}</TableCell>
                  <TableCell align="right">{donation.user_id}</TableCell>
                  <TableCell align="right">{donation.validity}</TableCell>
                  <TableCell align="right">{donation.quantity}</TableCell>
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

export default FeedDonation;
