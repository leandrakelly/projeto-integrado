import {
  Button,
  FormControl,
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
import { Box } from '@mui/system';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import api from '../services/api';

function Vaccination() {
  const [vaccines, setVaccines] = useState([]);
  const [animals, setAnimals] = useState([]);

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState(0);
  const [disease, setDisease] = useState('');
  const [animal, setAnimal] = useState(0);

  async function handleSubmit() {
    const { data } = await api.post('/vacination', {
      name,
      dosage,
      disease,
      animal_id: animal,
    });

    if (!data.error) {
      alert('Vacina cadastrada com sucesso!');
      handleDonations();
    }
  }

  async function handleDelete(id) {
    const { data } = await api.delete(`/vacination/${id}`);

    if (!data.error) {
      alert('Vacina apagada com sucesso!');
      handleDonations();
    }
  }

  function handleAnimalChange(e) {
    setAnimal(e.target.value);
  }

  async function handleDonations() {
    const { data } = await api.get('/vacination');

    setVaccines(data.data);
  }

  useEffect(() => {
    handleDonations();
  }, []);

  useEffect(() => {
    async function handleAnimals() {
      const url = '/animal';
      try {
        const { data } = await api.get(url);

        setAnimals(data.data);
      } catch (error) {
        console.log(error);
      }
    }

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
            type="number"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            label="Dosagem"
            rationType
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            label="Doença"
            variant="outlined"
          />
          <FormControl fullWidth>
            <InputLabel id="animal">Animal</InputLabel>
            <Select
              labelId="animal"
              id="demo-simple-select"
              value={animal}
              label="Animal"
              onChange={handleAnimalChange}
            >
              {animals.map((animal) => {
                return <MenuItem value={animal.id}>{animal.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleSubmit}>
            Cadastrar Vacina
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">Dosagem</TableCell>
                <TableCell align="right">Doença</TableCell>
                <TableCell align="right">Animal ID</TableCell>
                <TableCell align="right">Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vaccines.map((vaccine) => (
                <TableRow key={vaccine.id}>
                  <TableCell component="th" scope="row">
                    {vaccine.id}
                  </TableCell>
                  <TableCell align="right">{vaccine.name}</TableCell>
                  <TableCell align="right">{vaccine.dosage}</TableCell>
                  <TableCell align="right">{vaccine.disease}</TableCell>
                  <TableCell align="right">{vaccine.animal_id}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleDelete(vaccine.id);
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

export default Vaccination;
