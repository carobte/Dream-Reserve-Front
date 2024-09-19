import { useState } from 'react';
import { usePrice } from '../context/PriceContext';
import { useReserva } from '../context/ReserveContext'; // Importar useReserva
import NavbarSelect from '../layout/NavbarSelect';
import Footer from '../layout/Footer';
import { Advertising, AsideFilters } from '../components';
import { useNavigate } from 'react-router-dom';

const tours = [
  {
    id: 1,
    name: "City Tour Medellín",
    description: "Recorrido por los principales puntos turísticos de Medellín, incluyendo el Parque Arví y la Comuna 13.",
    price: 150000,
    image: "/placeholder.svg?height=200&width=300",
    info: ["Con Guía", "Almuerzo", "Recogida en punto", "Merienda"]
  },
  {
    id: 2,
    name: "Tour del Café",
    description: "Visita a una finca cafetera en las afueras de Medellín. Aprende sobre el proceso del café y disfruta de una degustación.",
    price: 200000,
    image: "/placeholder.svg?height=200&width=300",
    info: ["Con Guía", "Almuerzo", "Recogida en punto", "Merienda"]
  },
  {
    id: 3,
    name: "Guatapé y Piedra del Peñol",
    description: "Excursión de un día a Guatapé, incluyendo la subida a la Piedra del Peñol y un recorrido por el pueblo.",
    price: 180000,
    image: "/placeholder.svg?height=200&width=300",
    info: ["Con Guía", "Almuerzo", "Recogida en punto", "Merienda"]
  },
  {
    id: 4,
    name: "Guatapé y Piedra del Peñol",
    description: "Excursión de un día a Guatapé, incluyendo la subida a la Piedra del Peñol y un recorrido por el pueblo.",
    price: 180000,
    image: "/placeholder.svg?height=200&width=300",
    info: ["Con Guía", "Almuerzo", "Recogida en punto", "Merienda"]
  }
];

export default function Component() {
  const { totalPrice, setTotalPrice } = usePrice();
  const { reserva, setReserva } = useReserva(); // Obtener setReserva
  const [selectedTours, setSelectedTours] = useState(reserva.tours.map(tour => tour.id)); // Inicializar con los tours seleccionados

  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarSelect />
      <main className="flex-grow container mx-auto my-8 px-4 py-5">
        <div className='flex justify-between items-center'>
          <h2 className="text-3xl font-bold mb-6 text-custom-green">Tours Disponibles</h2>
          {/* Mostrar el botón Confirmar solo si hay al menos un tour seleccionado */}
          {selectedTours.length > 0 && (
              <div className=" text-center">
                <button
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold"
                  onClick={handleConfirm}
                >
                  Confirmar
                </button>
              </div>
            )}
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <Advertising />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
            {tours.map((tour) => (
              <div key={tour.id} className="border rounded-lg overflow-hidden flex flex-col justify-between">
                <div className="p-4 flex-grow">
                  <h3 className="text-lg font-semibold">{tour.name}</h3>
                  <img src="https://paisatoursesmedellin.com/wp-content/uploads/2022/07/tours-medellin.jpg" alt={tour.name} className="w-full h-48 object-cover mb-4 rounded-md" />
                  <p className="text-sm text-gray-600 mb-4">{tour.description}</p>
                  {tour.info.map((info, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <p>{info}</p>
                    </div>
                  ))}
                </div>
                {/* Precio y botón de selección siempre abajo */}
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
