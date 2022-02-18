import {
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
import { Box } from '@mui/system';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import api from '../services/api';

function MedicineStock() {
  const [medUse, setMedUse] = useState([]);
  const [animals, setAnimals] = useState([]);

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState(0);
  const [animal, setAnimal] = useState(0);
  const [validity, setValidity] = useState('');
  const [employee, setEmployee] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const { data } = await api.post('/med_use', {
      dosage,
      employee,
      validity,
      name,
      animal_id: animal,
    });

    if (!data.error) {
      alert(data.message);
      handleMeds();
    }
  }

  async function handleDelete(id) {
    const { data } = await api.delete(`/med_use/${id}`);

    if (!data.error) {
      alert('Uso de medicamento apagado com sucesso!');
      handleMeds();
    }
  }

  async function handleMeds() {
    const { data } = await api.get('/med_use');

    setMedUse(data.data);
  }
  useEffect(() => {
    async function handleAnimals() {
      const { data } = await api.get('/animal');

      if (!data.error) {
        setAnimals(data.data);
      }
    }

    handleAnimals();
    handleMeds();
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
          <TextField
            id="outlined-basic"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            label="Dosagem"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            label="Funcionário"
            variant="outlined"
          />
          <InputLabel id="user">Animal</InputLabel>
          <Select
            labelId="animal"
            id="demo-simple-select"
            value={animal}
            label="Animal"
            onChange={(e) => setAnimal(e.target.value)}
          >
            {animals.map((animal) => {
              return <MenuItem value={animal.id}>{animal.name}</MenuItem>;
            })}
          </Select>
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
            Cadastrar Uso de Medicamento
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Medicamento</TableCell>
                <TableCell align="right">Dosagem</TableCell>
                <TableCell align="right">Funcionário</TableCell>
                <TableCell align="right">Animal ID</TableCell>
                <TableCell align="right">Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medUse.map((med) => (
                <TableRow key={med.id}>
                  <TableCell component="th" scope="row">
                    {med.id}
                  </TableCell>
                  <TableCell align="right">{med.name}</TableCell>
                  <TableCell align="right">{med.dosage}</TableCell>
                  <TableCell align="right">{med.employee}</TableCell>
                  <TableCell align="right">{med.validity}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleDelete(med.id);
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

export default MedicineStock;
