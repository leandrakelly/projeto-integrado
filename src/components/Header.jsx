import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="site-name"> <Link to="/"> Adote-me! ♥ </Link></div>
        </Grid>
        <Grid item xs={12}>
          <div className="menu-options">
            <Button variant="contained">
              <Link to="/adoption"> Adoção </Link>
            </Button>
            <Button variant="contained">
              <Link to="/animals"> Animais </Link>
            </Button>
            <Button variant="contained">
              <Link to="/clients"> Clientes </Link>
            </Button>
            <Button variant="contained">
              <Link to="/feed-donation"> Doação de Ração </Link>
            </Button>
            <Button variant="contained">
              <Link to="/medicine-donation"> Doação de Medicamento </Link>
            </Button>
            <Button variant="contained">
              <Link to="/feed-stock"> Estoque de Ração </Link>
            </Button>
            <Button variant="contained">
              <Link to="/medicine-stock"> Estoque de Medicamento </Link>
            </Button>
            <Button variant="contained">
              <Link to="/vaccination"> Vacinação </Link>
            </Button>
          </div>
        </Grid>
      </Grid>
      <div className="header-divider">
        <Divider />
      </div>
    </div>
  );
}

export default Header;
