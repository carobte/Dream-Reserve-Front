import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { usePrice } from '../context/PriceContext';
import { SearchContext } from '../context/SearchContext';
import { Plane, Users, ArrowRight, PlaneTakeoff, Building, Calendar, MapPin, MapPin as MapPinArrival } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const flights = [
  {
    id: 1,
    airline: 'AeroColombiana',
    departureTime: '08:00',
    arrivalTime: '10:30',
    duration: '2h 30m',
    departureAirport: 'BOG',
    arrivalAirport: 'MDE',
    price: 250000,
    stops: 0,
    popular: true,
  },
  {
    id: 2,
    airline: 'VuelaFácil',
    departureTime: '10:15',
    arrivalTime: '13:00',
    duration: '2h 45m',
    departureAirport: 'BOG',
    arrivalAirport: 'MDE',
    price: 220000,
    stops: 1,
    popular: false,
  },
  {
    id: 3,
    airline: 'CieloAbierto',
    departureTime: '14:30',
    arrivalTime: '16:45',
    duration: '2h 15m',
    departureAirport: 'BOG',
    arrivalAirport: 'MDE',
    price: 280000,
    stops: 0,
    popular: false,
  },
];

const flightClasses = [
  { id: 'economy', name: 'Económica', price: 0 },
  { id: 'premium-economy', name: 'Económica Premium', price: 50000 },
  { id: 'business', name: 'Ejecutiva', price: 150000 },
];

export default function FlightSelection() {

  const {
    origin,
    destination,
    startDate,
    endDate,
    totalPeople
  } = useContext(SearchContext);


  const formattedStartDate = startDate ? startDate.toLocaleDateString() : 'Fecha de inicio';
  const formattedEndDate = endDate ? endDate.toLocaleDateString() : 'Fecha de fin';
  const peopleText = totalPeople ? `${totalPeople} adultos` : 'Número de personas';

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedClass, setSelectedClass] = useState({});
  const [previousFlightPrice, setPreviousFlightPrice] = useState(0); // Nueva variable para guardar el precio anterior
  const navigate = useNavigate();

  const { selectedHotel, totalPrice, setTotalPrice } = usePrice();

  const calculateFlightTotalPrice = (basePrice, classId) => {
    const flightClass = flightClasses.find(fc => fc.id === classId);
    return basePrice + (flightClass ? flightClass.price : 0);
  };

  useEffect(() => {
    if (selectedHotel) {
      // Si hay un hotel seleccionado, inicializa el totalPrice con el precio del hotel
      const initialTotalPrice = selectedHotel.price;
      setTotalPrice(prev => prev || initialTotalPrice);
    }
  }, [selectedHotel, setTotalPrice]);

  useEffect(() => {
    if (selectedFlight) {
      const flight = flights.find(flight => flight.id === selectedFlight);
      if (flight) {
        const flightTotalPrice = calculateFlightTotalPrice(flight.price, selectedClass[selectedFlight] || flightClasses[0].id);
        const hotelPrice = selectedHotel?.price || 0;

        setTotalPrice(prevTotalPrice => {
          const updatedTotal = prevTotalPrice - previousFlightPrice + flightTotalPrice;
          setPreviousFlightPrice(flightTotalPrice); 
          return updatedTotal;
        });
      }
    }
  }, [selectedFlight, selectedClass, selectedHotel, setTotalPrice, previousFlightPrice]);

  const handleSelectFlight = () => {
    const flight = flights.find(flight => flight.id === selectedFlight);
    if (flight) {
      const flightTotalPrice = calculateFlightTotalPrice(flight.price, selectedClass[selectedFlight] || flightClasses[0].id);
      const hotelPrice = selectedHotel?.price || 0;

      setTotalPrice(prevTotalPrice => {
        const updatedTotal = prevTotalPrice - previousFlightPrice + flightTotalPrice;
        setPreviousFlightPrice(flightTotalPrice); 
        return updatedTotal;
      });

      navigate('/add-tours'); 
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div className="flex justify-between items-start mb-6 flex-col">
        <h2 className="text-3xl font-bold text-green-800 mb-4 md:mb-0">Selecciona tu vuelo</h2>
        <h3 className="text-xl font-semibold text-green-800">
          Precio Total: COP {totalPrice ? totalPrice.toLocaleString() : '0'}
        </h3>
      </div>
      <div className="flex space-x-2">
        <button className="border border-gray-300 text-gray-600 text-sm py-2 px-4 flex items-center rounded">
          <MapPin className="mr-2 h-4 w-4" />
          {origin || 'Desde'}
        </button>
        <button className="border border-gray-300 text-gray-600 text-sm py-2 px-4 flex items-center rounded">
          <Calendar className="mr-2 h-4 w-4" />
          {formattedStartDate}
        </button>
        <button className="border border-gray-300 text-gray-600 text-sm py-2 px-4 flex items-center rounded">
          <Calendar className="mr-2 h-4 w-4" />
          {formattedEndDate}
        </button>
        <button className="border border-gray-300 text-gray-600 text-sm py-2 px-4 flex items-center rounded">
          <Users className="mr-2 h-4 w-4" />
          {peopleText}
        </button>
      </div>
      </div>
      <div className="grid gap-6">
        {flights.map((flight) => (
          <div 
            key={flight.id} 
            className={`border rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl`}
            onClick={() => setSelectedFlight(flight.id)}
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <Plane className="w-8 h-8 text-green-800 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-green-800">{flight.airline}</h3>
                    <p className="text-sm text-gray-600">Vuelo {flight.id}</p>
                  </div>
                </div>
                {flight.popular && (
                  <span className="bg-yellow-400 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Popular
                  </span>
                )}
              </div>
              <div className="flex flex-col md:flex-row justify-between mt-4">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="flex flex-col items-center mr-8">
                    <MapPinArrival className="text-green-800" />
                    <p className="text-center text-sm text-gray-600">{flight.departureTime}</p>
                    <p className="text-center text-xs text-gray-500">{flight.departureAirport}</p>
                  </div>
                  <p>________________________________________</p>
                  <div className="flex flex-col items-center mx-4">
                    <PlaneTakeoff className="w-6 h-6 text-gray-400" />
                    <p className="text-xs text-gray-500">{flight.duration}</p>
                    {flight.stops > 0 && (
                      <p className="text-xs text-gray-500">{flight.stops} escala{flight.stops > 1 ? 's' : ''}</p>
                    )}
                  </div>
                  <p>________________________________________</p>
                  <div className="flex flex-col items-center ml-8">
                    <Building className="text-green-800" />
                    <p className="text-center text-sm text-gray-600">{flight.arrivalTime}</p>
                    <p className="text-center text-xs text-gray-500">{flight.arrivalAirport}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-3xl font-bold text-green-800">
                    COP {calculateFlightTotalPrice(flight.price, selectedClass[flight.id] || flightClasses[0].id).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">por pasajero</p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold text-lg mb-2">Clase:</h4>
                <div className="flex flex-wrap gap-4">
                  {flightClasses.map((flightClass) => (
                    <label key={flightClass.id} className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        name={`class-${flight.id}`} 
                        value={flightClass.id} 
                        checked={selectedClass[flight.id] === flightClass.id} 
                        onChange={() => setSelectedClass(prev => ({ ...prev, [flight.id]: flightClass.id }))} 
                      />
                      <span>{flightClass.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4">
              <button className="bg-green-800 text-white font-semibold py-2 px-4 rounded" onClick={handleSelectFlight}>
                Seleccionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}