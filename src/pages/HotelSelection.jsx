import { useState, useEffect, useContext } from 'react';
import { usePrice } from '../context/PriceContext';
import { Loader, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarSelect from '../layout/NavbarSelect';
import { Advertising, AsideFilters } from '../components';
import { SearchContext } from '../context/SearchContext';
import Footer from '../layout/Footer';
import TravelLoader from '../components/TravelLoader';

const HOTELS_PER_PAGE = 4;

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

  const { planType } = useContext(SearchContext);
  const { selectedHotel: contextSelectedHotel, setSelectedHotel: setContextSelectedHotel, totalPrice, setTotalPrice } = usePrice();
  const { numberOfNights } = useContext(SearchContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [hotelResponse, roomResponse, foodResponse] = await Promise.all([
        axios.get('https://dreamreserve.azurewebsites.net/api/V1/Hotel'),
        axios.get('https://dreamreserve.azurewebsites.net/api/V1/Room'),
        axios.get('https://dreamreserve.azurewebsites.net/api/V1/Food'),
      ]);

      setHotels(hotelResponse.data);
      setRooms(roomResponse.data);
      setFoods(foodResponse.data);

      if (hotelResponse.data.length > 0) {
        const hotelRoomTypes = {};
        hotelResponse.data.forEach(hotel => {
          const hotelRooms = roomResponse.data.filter(room => room.hotelId === hotel.id);
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
    const hotelRooms = rooms.filter(room => room.hotelId === hotelId);
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
    return rooms.filter(room => room.hotelId === hotelId);
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

    if (planType === 'solo-hotel') {
      navigate('/date-reserve');
    } else {
      navigate('/flight-selection');
    }
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
      <TravelLoader />
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
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4 mb-4 lg:mb-0">
            <Advertising />
          </div>

          <section className="lg:w-3/4 space-y-6">
            {paginatedHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="border rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl bg-white"
                onClick={() => setSelectedHotel(hotel.id)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                    <img
                      src={hotel.urlImages.split(' ')[0]}
                      alt={hotel.name}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold capitalize">{hotel.name}</h3>
                        <div className="flex items-center">
                          {[...Array(hotel.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{hotel.description}</p>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
                        {['sencilla', 'doble', 'triple', 'familiar'].map((type) => {
                          const isAvailable = getHotelRooms(hotel.id).some(room => room.type === type);
                          return (
                            isAvailable && (
                              <button
                                key={type}
                                className={`py-1 px-3 text-sm font-medium rounded ${selectedRoomTypes[hotel.id] === type ? 'bg-custom-green text-white border border-green-800' : 'bg-gray-200 text-gray-700 border border-gray-300'} hover:bg-custom-green hover:text-white`}
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
                      <div className="flex flex-wrap gap-2 border-b border-gray-200 mt-4 pb-2">
                        {getFoodOptions().map((type) => (
                          <button
                            key={type}
                            className={`py-1 px-3 text-sm font-medium rounded ${selectedFoodType[hotel.id] === type ? 'bg-custom-green text-white border border-green-800' : 'bg-gray-200 text-gray-700 border border-gray-300'} hover:bg-custom-green hover:text-white`}
                            onClick={() => handleFoodTypeChange(hotel.id, type)}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      {getHotelRooms(hotel.id)
                        .filter(room => room.type === selectedRoomTypes[hotel.id])
                        .map((room) => {
                          const imageUrls = room.urlImages ? room.urlImages.split(' ') : [];
                          return (
                            <div key={room.id} className="mt-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                                {imageUrls.slice(0, 4).map((url, index) => (
                                  <img
                                    key={index}
                                    src={url}
                                    alt={`Room image ${index}`}
                                    className="w-full h-24 object-cover rounded-md"
                                  />
                                ))}
                              </div>
                              <div className="mt-2 flex flex-col md:flex-row justify-between items-center">
                                <div className='flex gap-2 mb-2 md:mb-0'>
                                  <button
                                    className="text-white border bg-custom-green rounded px-4 py-2 text-sm"
                                    onClick={() => handleReserveClick(hotel.id, room)}
                                  >
                                    Reservar Este
                                  </button>
                                </div>
                                <div className="text-center md:text-right">
                                  <p className="text-2xl font-bold text-custom-green">COP {calculatePrice(room.price, selectedFoodType[hotel.id] || 'Sin Alimentación').toLocaleString()}</p>
                                  <p className="text-sm text-gray-600">{numberOfNights} noches, 2 adultos</p>
                                  <p className="text-xs text-gray-500">Impuestos y cargos incluidos <span className='text-custom-green font-bold'>Precio por Habitacion</span></p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className='w-full flex flex-col sm:flex-row justify-between items-center mt-6'>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 bg-custom-green text-white disabled:bg-gray-300 disabled:cursor-not-allowed mb-2 sm:mb-0"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex flex-wrap justify-center space-x-2 mb-2 sm:mb-0">
                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 ${currentPage === page
                      ? 'bg-custom-green text-white'
                      : 'bg-white text-teal-600 border border-teal-600'
                      } mb-2 sm:mb-0`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 bg-custom-green text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
