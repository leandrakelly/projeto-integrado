import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { InputLabel } from '@mui/material/';
import TextField from '@mui/material/TextField';

import api from '../services/api';
import { Button } from '@mui/material';

function Animals() {
  const [animals, setAnimals] = useState([]);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [birth, setBirth] = useState(`${new Date().toDateString()}`);

  async function handleSubmit() {
    const { data } = await api.post('/animal', {
      name,
      breed,
      birth: new Date(birth),
    });

    if (!data.error) {
      alert('Animal cadastrado com sucesso!');
      handleAnimals();
    }
  }

  async function handleAnimals() {
    const url = '/animal';
    try {
      const { data } = await api.get(url);

      setAnimals(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    const { data } = await api.delete(`/animal/${id}`);

    if (!data.error) {
      alert('Animal apagada com sucesso!');
      handleAnimals();
    }
  }

  useEffect(() => {
    handleAnimals();
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
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            label="Raça"
            variant="outlined"
          />
          <div>
            <InputLabel id="nascimento">Data de Nascimento</InputLabel>
            <TextField
              id="outlined-basic"
              type="date"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              variant="outlined"
            />
          </div>
          <Button variant="contained" onClick={handleSubmit}>
            Cadastrar Animal
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">Raça</TableCell>
                <TableCell align="right">Nascimento</TableCell>
                <TableCell align="right">Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {animals.map((animal) => (
                <TableRow key={animal.id}>
                  <TableCell component="th" scope="row">
                    {animal.id}
                  </TableCell>
                  <TableCell align="right">{animal.name}</TableCell>
                  <TableCell align="right">{animal.breed}</TableCell>
                  <TableCell align="right">{animal.birth}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleDelete(animal.id);
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

export default Animals;
