import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; 
import ExploreOffers from './pages/ExploreOffers'; 
import Reservations from './pages/Reservations'; 
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore-offers" element={<ExploreOffers />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
