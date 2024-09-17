import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { PlaneTakeoff, PlaneLanding, Clock, Building2, Check, Info } from 'lucide-react';
import NavbarSelect from '../layout/NavbarSelect';
import Footer from '../layout/Footer';
import { AsideFilters } from '../components';
import { usePrice } from '../context/PriceContext'; 

const departureFlights = [
  {
    id: 'dep1',
    airline: 'SkyHigh Airlines',
    departureCity: 'New York',
    arrivalCity: 'Los Angeles',
    departureTime: '08:00',
    arrivalTime: '11:30',
    price: 2500000 // Precio en pesos colombianos
  },
  {
    id: 'dep2',
    airline: 'Ocean Air',
    departureCity: 'New York',
    arrivalCity: 'Los Angeles',
    departureTime: '10:30',
    arrivalTime: '14:00',
    price: 3000000 // Precio en pesos colombianos
  },
];

const returnFlights = [
  {
    id: 'ret1',
    airline: 'SkyHigh Airlines',
    departureCity: 'Los Angeles',
    arrivalCity: 'New York',
    departureTime: '14:00',
    arrivalTime: '22:30',
    price: 2800000 // Precio en pesos colombianos
  },
  {
    id: 'ret2',
    airline: 'Ocean Air',
    departureCity: 'Los Angeles',
    arrivalCity: 'New York',
    departureTime: '16:30',
    arrivalTime: '01:00',
    price: 3200000 // Precio en pesos colombianos
  },
];

const tariffs = [
  {
    name: 'Básico',
    price: 0,
    features: ['Equipaje de mano', 'Entretenimiento a bordo']
  },
  {
    name: 'Confort',
    price: 50000,
    features: ['Equipaje de mano', 'Equipaje facturado', 'Entretenimiento a bordo', 'Selección de asiento']
  },
  {
    name: 'Flex',
    price: 100000,
    features: ['Equipaje de mano', 'Equipaje facturado', 'Entretenimiento a bordo', 'Selección de asiento', 'Reembolsable', 'Embarque prioritario']
  }
];


export default function FlightSelection() {
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [selectedTariff, setSelectedTariff] = useState('Básico');

  const { totalPrice, setTotalPrice } = usePrice(); // Usar el contexto de precios
  const navigate = useNavigate(); // Usar el hook para navegar

  const selectedDepartureFlight = departureFlights.find(flight => flight.id === selectedDeparture);
  const selectedReturnFlight = returnFlights.find(flight => flight.id === selectedReturn);
  const selectedTariffDetails = tariffs.find(tariff => tariff.name === selectedTariff);

  const flightTotalPrice = (selectedDepartureFlight?.price || 0) + (selectedReturnFlight?.price || 0) + (selectedTariffDetails?.price || 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
  };

  const handleReserve = () => {
    // Sumar el precio total del vuelo al valor actual en totalPrice
    setTotalPrice(prevTotal => prevTotal + flightTotalPrice);

    // Redirigir a la ruta que desees (ejemplo: página de confirmación)
    navigate('/date-reserve');
  };

  const FlightCard = ({ flight, isSelected, onSelect, icon }) => (
      <div className={`border rounded-lg mb-4 p-4 ${isSelected ? 'border-custom-green border-2' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2 text-lg font-semibold text-custom-green">
            {React.createElement(icon, { className: "text-custom-green" })}
            <span>{flight.airline}</span>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <Building2 className="w-4 h-4 mr-1" />
              {flight.departureCity} a {flight.arrivalCity}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {flight.departureTime} - {flight.arrivalTime}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-custom-green">{formatPrice(flight.price)}</div>
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

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarSelect />
      <main className="flex-grow container mx-auto my-8 px-4 py-5">
        <h2 className="text-3xl font-bold mb-6 text-custom-green">Vuelos Disponibles</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <AsideFilters />
          <div className="w-full max-w-4xl mx-auto border rounded-lg shadow-lg">
            <div className="p-4">
              {/* Listado de vuelos de salida */}
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
                  />
                ))}
              </div>

              {/* Listado de vuelos de regreso */}
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
                  />
                ))}
              </div>

              {/* Selección de tarifa y precio total */}
              {(selectedDeparture && selectedReturn) && (
                <div className="mt-6 border rounded-lg p-4 shadow-lg">
                  <h3 className="text-xl font-bold">Elige tu Tarifa</h3>
                  <div className="mt-4">
                    <div className="flex space-x-4 mb-4">
                      {tariffs.map((tariff) => (
                        <button
                          key={tariff.name}
                          onClick={() => setSelectedTariff(tariff.name)}
                          className={`p-2 border rounded ${selectedTariff === tariff.name ? 'bg-custom-green text-white' : 'bg-white border-custom-green text-custom-green'}`}
                        >
                          {tariff.name}
                        </button>
                      ))}
                    </div>
                    {tariffs.map((tariff) => (
                      selectedTariff === tariff.name && (
                        <div key={tariff.name} className="border rounded-lg p-4 mb-4">
                          <h4 className="text-lg font-bold">{tariff.name} - {formatPrice(tariff.price)} adicionales</h4>
                          <ul className="list-disc pl-5 mt-2">
                            {tariff.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <Check className="w-4 h-4 mr-2 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gray-50 p-6 rounded-b-lg">
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold text-custom-green flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Precio Total: {formatPrice(flightTotalPrice)}
                </div>
                <button
                  onClick={handleReserve} // Ejecutar la función handleReserve
                  className={`py-2 px-4 rounded text-white ${!selectedDeparture || !selectedReturn ? 'bg-gray-400 cursor-not-allowed' : 'bg-custom-green'}`}
                  disabled={!selectedDeparture || !selectedReturn}
                >
                  Reservar Vuelos
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