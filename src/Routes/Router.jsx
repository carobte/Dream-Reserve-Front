import { createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import { Home, Login, Register, AboutUs   } from '../pages';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      {/* <Route path="/explore-offers" element={<ExploreOffers />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/reservations" element={<Reservations />} /> */}
      <Route path="/about-us" element={<AboutUs />} />
    </>
  )
);
