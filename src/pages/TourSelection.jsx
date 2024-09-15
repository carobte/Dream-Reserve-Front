import { useState } from 'react';
import { usePrice } from '../context/PriceContext';
import Header from '../layout/NavbarSelect';

const tours = [
  {
    id: 1,
    name: "City Tour Medellín",
    description: "Recorrido por los principales puntos turísticos de Medellín, incluyendo el Parque Arví y la Comuna 13.",
    price: 150000,
    image: "/placeholder.svg?height=200&width=300",
    options: ["Con Guía", "Sin Guía", "Guía + Almuerzo", "Tour Completo"]
  },
  {
    id: 2,
    name: "Tour del Café",
    description: "Visita a una finca cafetera en las afueras de Medellín. Aprende sobre el proceso del café y disfruta de una degustación.",
    price: 200000,
    image: "/placeholder.svg?height=200&width=300",
    options: ["Básico", "Con Transporte", "Con Almuerzo", "Todo Incluido"]
  },
  {
    id: 3,
    name: "Guatapé y Piedra del Peñol",
    description: "Excursión de un día a Guatapé, incluyendo la subida a la Piedra del Peñol y un recorrido por el pueblo.",
    price: 180000,
    image: "/placeholder.svg?height=200&width=300",
    options: ["Solo Transporte", "Con Guía", "Con Almuerzo", "Todo Incluido"]
  }
];

export default function Component() {
  const { totalPrice, setTotalPrice } = usePrice();
  const [selectedTours, setSelectedTours] = useState([]);

  const handleSelectTour = (tour) => {
    if (selectedTours.includes(tour.id)) {
      setSelectedTours(selectedTours.filter(id => id !== tour.id));
      setTotalPrice(totalPrice - tour.price);
    } else {
      setSelectedTours([...selectedTours, tour.id]);
      setTotalPrice(totalPrice + tour.price);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Header totalPrice={totalPrice} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <div key={tour.id} className="border rounded-lg overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold">{tour.name}</h3>
              <img src={tour.image} alt={tour.name} className="w-full h-48 object-cover mb-4 rounded-md" />
              <p className="text-sm text-gray-600 mb-4">{tour.description}</p>
              {tour.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input type="radio" name={`option-${tour.id}`} id={`option-${tour.id}-${index}`} />
                  <label htmlFor={`option-${tour.id}-${index}`}>{option}</label>
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
  );
}