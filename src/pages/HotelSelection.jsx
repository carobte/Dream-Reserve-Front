import { useState, useEffect } from 'react';
import { usePrice } from '../context/PriceContext';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarSelect from '../layout/NavbarSelect';
import { AsideFilters } from '../components';
import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';

const HOTELS_PER_PAGE = 3;

export default function HotelListingPage() {
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState({});
  const [selectedFoodType, setSelectedFoodType] = useState({});
  const [roomNotAvailable, setRoomNotAvailable] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { selectedHotel: contextSelectedHotel, setSelectedHotel: setContextSelectedHotel, totalPrice, setTotalPrice } = usePrice();
  const { numberOfNights } = useContext(SearchContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [hotelResponse, roomResponse, foodResponse] = await Promise.all([
        axios.get('http://localhost:3000/hotel'),
        axios.get('http://localhost:3000/room'),
        axios.get('http://localhost:3000/food'),
      ]);
      
      setHotels(hotelResponse.data);
      setRooms(roomResponse.data);
      setFoods(foodResponse.data);

      if (hotelResponse.data.length > 0) {

        const hotelRoomTypes = {};
        hotelResponse.data.forEach(hotel => {
          const hotelRooms = roomResponse.data.filter(room => room.hotel_id === hotel.id);
          const availableRoomTypes = hotelRooms.map(room => room.type);
          const defaultRoomType = availableRoomTypes.length > 0 ? availableRoomTypes[0] : null;
          if (defaultRoomType) {
            hotelRoomTypes[hotel.id] = defaultRoomType;
          }
        });
        setSelectedRoomTypes(hotelRoomTypes);
      }
    } catch (error) {
      setError('Lo lamento, el backend no ha desplegado el servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRoomTypeChange = (hotelId, roomType) => {
    const hotelRooms = rooms.filter(room => room.hotel_id === hotelId);
    const availableRoomTypes = hotelRooms.map(room => room.type);
  
    if (availableRoomTypes.includes(roomType)) {
      setSelectedRoomTypes(prevState => ({
        ...prevState,
        [hotelId]: roomType
      }));
      setRoomNotAvailable(prevState => ({
        ...prevState,
        [hotelId]: ''
      }));
    } else {
      setRoomNotAvailable(prevState => ({
        ...prevState,
        [hotelId]: `El hotel no presenta este tipo de habitación: ${roomType}`
      }));
    }
  };

  const handleFoodTypeChange = (hotelId, foodType) => {
    setSelectedFoodType(prevState => ({
      ...prevState,
      [hotelId]: foodType
    }));
  };

  const getHotelRooms = (hotelId) => {
    return rooms.filter(room => room.hotel_id === hotelId);
  };

  const getFoodOptions = () => {
    const options = foods.map(food => {
      switch (food.id) {
        case 1:
          return 'Desayuno';
        case 2:
          return 'Desayuno y Almuerzo';
        case 3:
          return 'Desayuno, Almuerzo y Cena';
        default:
          return 'Sin Alimentación';
      }
    });
    return [...new Set(options)];
  };

  const calculatePrice = (roomPrice, foodType) => {
    const food = foods.find(f => {
      switch (foodType) {
        case 'Desayuno':
          return f.id === 1;
        case 'Desayuno y Almuerzo':
          return f.id === 2;
        case 'Desayuno, Almuerzo y Cena':
          return f.id === 3;
        default:
          return f.id === 0;
      }
    });
    const foodPrice = food ? food.price : 0;
    return (roomPrice + foodPrice) * numberOfNights;
  };

  const handleReserveClick = (hotelId, room) => {
    const selectedHotel = hotels.find(hotel => hotel.id === hotelId);
    const price = calculatePrice(room.price, selectedFoodType[hotelId] || 'Sin Alimentación');

    setContextSelectedHotel({ ...selectedHotel, room });
    setTotalPrice(price);
    navigate('/flight-selection'); 
  };

  const paginatedHotels = hotels.slice((currentPage - 1) * HOTELS_PER_PAGE, currentPage * HOTELS_PER_PAGE);
  const totalPages = Math.ceil(hotels.length / HOTELS_PER_PAGE);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-green-800 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-custom-green text-white p-4">
        <div className="container mx-auto">
          <NavbarSelect />
        </div>
      </header>

      <main className="flex-grow container mx-auto my-8 px-4">
        <h2 className="text-3xl font-bold mb-6 text-custom-green">Hoteles Disponibles</h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* aside filtros */}
          <AsideFilters />
          
          <section className="flex-grow space-y-6">
            {paginatedHotels.map((hotel) => (
              <div 
                key={hotel.id} 
                className={`border rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl`}
                onClick={() => setSelectedHotel(hotel.id)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1718606267789-de728d02f064?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt={hotel.name} 
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{hotel.name}</h3>
                        <div className="flex items-center">
                          {[...Array(hotel.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      {hotel.popular && (
                        <span className="bg-yellow-400 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{hotel.description}</p>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 border-b border-gray-200">
                        {['Sencilla', 'Doble', 'Triple', 'Familiar'].map((type) => {
                          const isAvailable = getHotelRooms(hotel.id).some(room => room.type === type);
                          return (
                            isAvailable && (
                              <button
                                key={type}
                                className={`py-1 px-3 text-sm font-medium rounded ${selectedRoomTypes[hotel.id] === type ? 'bg-green-800 text-white border border-green-800' : 'bg-gray-200 text-gray-700 border border-gray-300'} hover:bg-green-700 hover:text-white`}
                                onClick={() => handleRoomTypeChange(hotel.id, type)}
                              >
                                {type}
                              </button>
                            )
                          )
                        })}
                      </div>
                      {roomNotAvailable[hotel.id] && (
                        <p className="mt-2 text-red-600">{roomNotAvailable[hotel.id]}</p>
                      )}
                      <div className="flex flex-wrap gap-2 border-b border-gray-200 mt-4">
                        {getFoodOptions().map((type) => (
                          <button
                            key={type}
                            className={`py-1 px-3 text-sm font-medium rounded ${selectedFoodType[hotel.id] === type ? 'bg-green-800 text-white border border-green-800' : 'bg-gray-200 text-gray-700 border border-gray-300'} hover:bg-green-700 hover:text-white`}
                            onClick={() => handleFoodTypeChange(hotel.id, type)}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      {getHotelRooms(hotel.id)
                        .filter(room => room.type === selectedRoomTypes[hotel.id])
                        .map((room) => (
                          <div key={room.id} className="mt-2">
                            <div className="grid grid-cols-4 gap-1 mb-1">
                              {[1, 2, 3].map((index) => (
                                <img
                                  key={index}
                                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGFiaXRhY2lvbmVzJTIwaG90ZWxlc3xlbnwwfHwwfHx8MA%3D%3D" 
                                  alt={`${room.type} room ${index}`} 
                                  className="w-full h-32 object-cover rounded-md"
                                />
                              ))}
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                              <div className='flex gap-2'>
                                <button 
                                  className="text-white border bg-custom-green border-green-800 rounded px-4 py-2"
                                >
                                  Ver Fotos
                                </button>
                                <button
                                  className="text-white border bg-custom-green rounded px-4 py-2"
                                  onClick={() => handleReserveClick(hotel.id, room)}
                                >
                                  Reservar Este
                                </button>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-custom-green">COP {calculatePrice(room.price, selectedFoodType[hotel.id] || 'Sin Alimentación').toLocaleString()}</p>
                                <p className="text-sm text-gray-600">{numberOfNights} noches, 2 adultos</p>
                                <p className="text-xs text-gray-500">Impuestos y cargos incluidos <span className='text-custom-green font-bold'>Precio por Habitacion</span></p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
      {/* Paginación */}
      <div className="flex justify-center mt-6">
        <div className="flex space-x-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`border border-gray-300 px-4 py-2 rounded-md text-sm ${currentPage === number ? 'bg-green-800 text-white' : 'text-gray-700'}`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
