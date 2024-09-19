import { createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import { Home, Login, Register, SearchResults, FlightSelection, TourSelection, AddToursPrompt, DateReserve, AboutUs, FrequentQuestion, PoliticsAndPrivacy, TermsAndConditions, MyReservations} from '../pages'; 


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/flight-selection" element={<FlightSelection />} />
      <Route path="/tour-selection" element={<TourSelection />} />
      <Route path="/add-tours" element={<AddToursPrompt />} />
      <Route path="/date-reserve" element={<DateReserve />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/frequent-questions" element={<FrequentQuestion />} />
      <Route path="/politics-and-privacy" element={<PoliticsAndPrivacy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/my-reservations" element={<MyReservations />} />
    </>
  )
);
