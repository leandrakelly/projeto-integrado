import {
  Button,
  FormControl,
  Input,
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
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

import Header from '../components/Header';
import api from '../services/api';

function Adoption() {
  const [adoptions, setAdoptions] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [users, setUsers] = useState([]);

  const [animal, setAnimal] = useState(0);
  const [user, setUser] = useState(0);

  function handleAnimalChange(e) {
    setAnimal(e.target.value);
  }

  function handleUserChange(e) {
    setUser(e.target.value);
  }

  async function handleAdoption(e) {
    e.preventDefault();

    const { data } = await api.post('/adoption', {
      user_id: user,
      animal_id: animal,
    });

    if (!data.error) {
      alert(data.message);
      handleAdoptions();
    }
  }

  async function handleAdoptions() {
    const { data } = await api.get('/adoption');

    setAdoptions(data.data);
  }

  async function handleAdoptionDelete(id) {
    const { data } = await api.delete(`/adoption/${id}`);

    if (!data.error) {
      alert('Adoção apagada com sucesso!');
      handleAdoptions();
    }
  }

  useEffect(() => {
    handleAdoptions();
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

  useEffect(() => {
    async function handleClients() {
      const url = '/user';
      try {
        const { data } = await api.get(url);

        setUsers(data.data);
      } catch (error) {
        console.log(error);
      }
    }

    handleClients();
  }, []);

  return (
    <div className="adoption">
      <header>
        <Header />
      </header>
      <div className="adoption-body">
        <Grid container>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="user">Cliente</InputLabel>
              <Select
                labelId="user"
                id="demo-simple-select"
                value={user}
                label="Animal"
                onChange={handleUserChange}
              >
                {users.map((user) => {
                  return <MenuItem value={user.id}>{user.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={handleAdoption}>
          Cadastrar Adoção
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nome Cliente</TableCell>
              <TableCell align="right">Nome Animal</TableCell>
              <TableCell align="right">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adoptions.map((adoption) => (
              <TableRow key={adoption.id}>
                <TableCell component="th" scope="row">
                  {adoption.id}
                </TableCell>
                <TableCell align="right">{adoption.user.name}</TableCell>
                <TableCell align="right">{adoption.animal.name}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleAdoptionDelete(adoption.id);
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
    </div>
  );
}

export default Adoption;
