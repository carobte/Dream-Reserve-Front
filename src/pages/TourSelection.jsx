import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { usePrice } from '../context/PriceContext';
import { useReserva } from '../context/ReserveContext';
import Footer from '../layout/Footer';
import { Advertising, TravelLoader } from '../components';
import { useNavigate } from 'react-router-dom';
import NavbarSelect from '../layout/NavbarSelect';

export default function Component() {
  const { totalPrice, setTotalPrice } = usePrice();
  const { reserva, setReserva } = useReserva(); 
  const [tours, setTours] = useState([]); 
  const [selectedTours, setSelectedTours] = useState(reserva.tours.map(tour => tour.id)); 
  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate();


  const tourInfo = {
    1: ["Con Guía", "Almuerzo", "Recogida en punto", "Merienda"],
    2: ["Transporte", "Desayuno", "Guía local"],
    3: ["Recorrido guiado", "Entrada a la atracción", "Transporte incluido"],
    4: ["Guía experto", "Degustación de café", "Transporte"],
    5: ["Guía experto", "Degustación de café", "Transporte"],
    6: ["Guía experto", "Degustación de café", "Transporte"],
    7: ["Guía experto", "Degustación de café", "Transporte"],
    8: ["Guía experto", "Degustación de café", "Transporte"],
    9: ["Guía experto", "Degustación de café", "Transporte"],
    10: ["Guía experto", "Degustación de café", "Transporte"]
  };

  useEffect(() => {
    axios.get('https://dream-reserve.azurewebsites.net/api/V1/Tour')
      .then(response => {
        setTours(response.data); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los tours:', error);
        setLoading(false);
      });
  }, []);

  const handleSelectTour = (tour) => {
    if (selectedTours.includes(tour.id)) {
      setSelectedTours(selectedTours.filter(id => id !== tour.id));
      setTotalPrice(totalPrice - tour.price);
      setReserva(prev => ({
        ...prev,
        tours: prev.tours.filter(t => t.id !== tour.id),
        valorTotal: prev.valorTotal - tour.price
      }));
    } else {
      setSelectedTours([...selectedTours, tour.id]);
      setTotalPrice(totalPrice + tour.price);
      setReserva(prev => ({
        ...prev,
        tours: [...prev.tours, tour],
        valorTotal: prev.valorTotal + tour.price
      }));
    }
  };

  const handleConfirm = () => {
    navigate('/date-reserve');
  };

  if (loading) {
    return(
      <TravelLoader />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarSelect />
      <main className="flex-grow container mx-auto my-8 px-4 py-6">
        <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
          <h2 className="text-3xl font-bold text-custom-green mt-10">Tours Disponibles</h2>
          {selectedTours.length > 0 && (
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold mt-4 sm:mt-0"
              onClick={handleConfirm}
            >
              Confirmar
            </button>
          )}
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-1/4 mb-4 lg:mb-0">
            <Advertising />
          </div>
          <div className="lg:w-3/4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <div key={tour.id} className="border rounded-lg overflow-hidden flex flex-col justify-between">
                <div className="p-4 flex-grow">
                  <h3 className="text-lg font-semibold">{tour.name}</h3>
                  <img src={tour.urlImages} alt={tour.name} className="w-full h-48 object-cover mb-4 rounded-md" />
                  <p className="text-sm text-gray-600 mb-4">{tour.description}</p>
                  {tourInfo[tour.id] && tourInfo[tour.id].map((info, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <p>{info}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-xl font-bold">COP {tour.price.toLocaleString()}</span>
                  <button
                    className={`${
                      selectedTours.includes(tour.id) ? 'bg-red-500' : 'bg-blue-500'
                    } text-white px-4 py-2 rounded`}
                    onClick={() => handleSelectTour(tour)}
                  >
                    {selectedTours.includes(tour.id) ? 'Quitar' : 'Reservar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}