import { Button, Input, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';

import Header from '../components/Header';

function Adoption() {
  return (
    <div className="adoption">
      <header>
        <Header />
      </header>
      <div className="adoption-body">
        <Grid container>
          <Grid item xs={6}>
            <h3>Dados do Animal</h3>
            <p>Código do animal</p>
            <Input type="number" placeholder="Digite o código" />
            <Button variant="contained">Buscar</Button>
            <div>
              <TextField
                label="Nome"
                helperText="nome do animal"
                variant="standard"
              />
              <TextField
                label="Espécie"
                helperText="espécie do animal"
                variant="standard"
              />
              <TextField
                label="Raça"
                helperText="raça do animal"
                variant="standard"
              />
              <TextField
                label="Pelagem"
                helperText="pelagem do animal"
                variant="standard"
              />
              <TextField
                type="date"
                helperText="data de nascimento"
                variant="standard"
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <h3>Dados do Cliente</h3>
            <p>CPF do cliente</p>
            <Input type="number" placeholder="Digite o código" />
            <Button variant="contained">Buscar</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Adoption;
