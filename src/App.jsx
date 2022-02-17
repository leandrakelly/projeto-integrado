import { Route, Routes } from 'react-router-dom';

import Adoption from './pages/Adoption';
import Animals from './pages/Animals';
import Clients from './pages/Clients';
import FeedDonation from './pages/FeedDonation';
import FeedStock from './pages/FeedStock';
import Home from './pages/Home';
import MedicineDonation from './pages/MedicineDonation';
import MedicineStock from './pages/MedicineStock';
import Vaccination from './pages/Vaccination';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="adoption" element={<Adoption/>} />
        <Route path="animals" element={<Animals/>} />
        <Route path="clients" element={<Clients/>} />
        <Route path="feed-donation" element={<FeedDonation/>} />
        <Route path="medicine-donation" element={<MedicineDonation/>} />
        <Route path="feed-stock" element={<FeedStock/>} />
        <Route path="medicine-stock" element={<MedicineStock/>} />
        <Route path="vaccination" element={<Vaccination/>} />
      </Routes>
    </div>
  );
}

export default App;
