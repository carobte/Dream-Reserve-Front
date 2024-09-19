import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PlaneTakeoff, PlaneLanding, Clock, Building2, Info } from 'lucide-react';
import NavbarSelect from '../layout/NavbarSelect';
import Footer from '../layout/Footer';
import { AsideFilters, TravelLoader } from '../components';
import { usePrice } from '../context/PriceContext';
import { useReserva } from '../context/ReserveContext';

export default function FlightSelection() {

  const [tariffs, setTariffs] = useState([
    {
      "name": "Economico",
      "price": 0,
      "features": ["Equipaje de mano", "Entretenimiento a bordo"]
    },
    {
      "name": "Ejecutivo",
      "price": 50000,
      "features": ["Equipaje de mano", "Equipaje facturado", "Entretenimiento a bordo", "Selección de asiento"]
    },
    {
      "name": "Premium",
      "price": 100000,
      "features": ["Equipaje de mano", "Equipaje facturado", "Entretenimiento a bordo", "Selección de asiento", "Reembolsable", "Embarque prioritario"]
    }
  ]);

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [selectedTariff, setSelectedTariff] = useState('Básico');

  const { totalPrice, setTotalPrice } = usePrice();
  const { reserva, updateFlight } = useReserva();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('https://dreamreserve.azurewebsites.net/api/V1/Flight');
        const flightsWithTimes = response.data.map(flight => ({
          ...flight,
          randomTime: generateRandomMorningTime()
        }));
        setFlights(flightsWithTimes);
      } catch (error) {
        console.error("Error al obtener los vuelos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  const departureFlights = flights.filter(flight => flight.origin === reserva.origen && flight.destiny === 'medellin');
  const returnFlights = flights.filter(flight => flight.origin === 'medellin' && flight.destiny === reserva.origen);

  const generateRandomMorningTime = () => {
    const randomHour = Math.floor(Math.random() * 6) + 6;
    const randomMinutes = Math.floor(Math.random() * 60);
    return `${randomHour.toString().padStart(2, '0')}:${randomMinutes.toString().padStart(2, '0')} AM`;
  };

  const departureDate = reserva.startDate ? new Date(reserva.startDate).toLocaleDateString() : 'Fecha no disponible';
  const returnDate = reserva.endDate ? new Date(reserva.endDate).toLocaleDateString() : 'Fecha no disponible';

  const selectedDepartureFlight = departureFlights.find(flight => flight.id === selectedDeparture);
  const selectedReturnFlight = returnFlights.find(flight => flight.id === selectedReturn);
  const selectedTariffDetails = tariffs.find(tariff => tariff.name === selectedTariff);

  const flightTotalPrice = (selectedDepartureFlight?.flightTypePrice || 0) + (selectedReturnFlight?.flightTypePrice || 0) + (selectedTariffDetails?.price || 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
  };

  const handleReserve = () => {
    if (selectedDepartureFlight && selectedReturnFlight) {
      updateFlight(selectedDepartureFlight, 'vueloIda');
      updateFlight(selectedReturnFlight, 'vueloVuelta');
      setTotalPrice(prevTotal => prevTotal + flightTotalPrice);
      navigate('/add-tours');
    }
  };

  const FlightCard = ({ flight, isSelected, onSelect, icon, date }) => (
    <div className={`border rounded-lg mb-4 p-4 ${isSelected ? 'border-custom-green border-2' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2 text-lg font-semibold text-custom-green">
            {React.createElement(icon, { className: "text-custom-green" })}
            <span>{flight.name}</span>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <Building2 className="w-4 h-4 mr-1" />
              {flight.origin} a {flight.destiny}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {date} - {flight.randomTime}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-custom-green">{formatPrice(flight.flightTypePrice)}</div>
          <button
            onClick={onSelect}
            className={`mt-2 p-2 border rounded ${isSelected ? 'bg-custom-green text-white' : 'bg-white border-custom-green text-custom-green'}`}
          >
            {isSelected ? "Seleccionado" : "Seleccionar"}
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <TravelLoader />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarSelect />
      <main className="flex-grow container mx-auto my-8 px-4 py-5">
        <h2 className="text-3xl font-bold mb-6 text-custom-green">Vuelos Disponibles</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <AsideFilters />
          <div className="w-full max-w-4xl mx-auto border rounded-lg shadow-lg">
            <div className="p-4">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <PlaneTakeoff className="mr-2" />
                  Vuelos de Salida
                </h2>
                {departureFlights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    isSelected={selectedDeparture === flight.id}
                    onSelect={() => setSelectedDeparture(flight.id)}
                    icon={PlaneTakeoff}
                    date={departureDate}
                  />
                ))}
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <PlaneLanding className="mr-2" />
                  Vuelos de Regreso
                </h2>
                {returnFlights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    isSelected={selectedReturn === flight.id}
                    onSelect={() => setSelectedReturn(flight.id)}
                    icon={PlaneLanding}
                    date={returnDate}
                  />
                ))}
              </div>

              {selectedDeparture && selectedReturn && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Info className="mr-2" />
                    Tarifa
                  </h2>
                  {tariffs.map((tariff) => (
                    <div key={tariff.name} className={`p-2 border rounded-lg mb-4 ${selectedTariff === tariff.name ? 'border-custom-green border-2' : ''}`}>
                      <div className="flex justify-between items-center">
                        <span>{tariff.name}</span>
                        <div className="text-right">
                          <span className="font-bold text-custom-green">{formatPrice(tariff.price)}</span>
                          <button
                            onClick={() => setSelectedTariff(tariff.name)}
                            className={`ml-2 px-2 py-1 rounded ${selectedTariff === tariff.name ? 'bg-custom-green text-white' : 'border border-custom-green text-custom-green'}`}
                          >
                            {selectedTariff === tariff.name ? "Seleccionado" : "Seleccionar"}
                          </button>
                        </div>
                      </div>
                      <ul className="mt-2 text-sm text-gray-600">
                        {tariff.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 text-right">
                <div className="text-2xl font-bold text-custom-green mb-4">
                  Total: {formatPrice(flightTotalPrice)}
                </div>
                <button
                  onClick={handleReserve}
                  className="bg-custom-green text-white px-6 py-3 rounded-lg"
                  disabled={!selectedDeparture || !selectedReturn}
                >
                  Reservar Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
