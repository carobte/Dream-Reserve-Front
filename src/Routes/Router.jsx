import { createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import { Home, Login } from '../pages';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      {/* <Route path="/explore-offers" element={<ExploreOffers />} /> */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/reservations" element={<Reservations />} /> */}
    </>
  )
);
