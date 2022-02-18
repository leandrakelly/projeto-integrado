import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import api from '../services/api';

function FeedStock() {
  const [stock, setStock] = useState([]);
  const [name, setName] = useState('');
  const [rationType, setRationType] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState(0);

  async function handleSubmit() {
    const { data } = await api.post('/ration', {
      name,
      ration_type: rationType,
      brand,
      quantity: Number(quantity),
    });

    if (!data.error) {
      alert('Ração cadastrada com sucesso!');
      handleDonations();
    }
  }

  async function handleDelete(id) {
    const { data } = await api.delete(`/ration/${id}`);

    if (!data.error) {
      alert('Ração apagada com sucesso!');
      handleDonations();
    }
  }

  async function handleDonations() {
    const { data } = await api.get('/ration');

    setStock(data.data);
  }

  useEffect(() => {
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
            label="Nome"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            value={rationType}
            onChange={(e) => setRationType(e.target.value)}
            label="Tipo"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            value={quantity}
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
            label="Quantidade"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            label="Marca"
            variant="outlined"
          />
          <Button variant="contained" onClick={handleSubmit}>
            Cadastrar Ração
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">Tipo</TableCell>
                <TableCell align="right">Marca</TableCell>
                <TableCell align="right">Quantidade</TableCell>
                <TableCell align="right">Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stock.map((ration) => (
                <TableRow key={ration.id}>
                  <TableCell component="th" scope="row">
                    {ration.id}
                  </TableCell>
                  <TableCell align="right">{ration.name}</TableCell>
                  <TableCell align="right">{ration.ration_type}</TableCell>
                  <TableCell align="right">{ration.brand}</TableCell>
                  <TableCell align="right">{ration.quantity}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleDelete(ration.id);
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

export default FeedStock;
