import Grid from '@mui/material/Grid';

import Dog from '../assets/images/cachorro.png';
import Header from '../components/Header';

function Home() {
  return (
    <div className="home">
      <header>
        <Header />
      </header>
      <div className="home-body">
        <Grid container>
          <Grid item xs={5}>
            <div className="welcome-title">Bem vindo ao Adote-me!</div>
            <div className="description">
              Ter um animalzinho de estimação é ter uma amizade verdadeira e
              leal. Animais conseguem nos amar com pureza e livre de
              julgamentos, mesmo nos momentos mais difíceis. Adotar um animal é
              adotar um amigo!
            </div>
          </Grid>
          <Grid item xs={5}>
            <div className="home-image">
              <img src={Dog} alt="dog" />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Home;
