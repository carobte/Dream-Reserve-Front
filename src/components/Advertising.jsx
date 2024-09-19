import { useState } from 'react'
import { ChevronLeft, ChevronRight, Lightbulb, Tag, Star, MapPin } from 'lucide-react'

const destinations = [
  { id: 1, name: 'Cartagena', image: 'https://media.istockphoto.com/id/466497932/es/foto/torre-del-reloj-de-puerta.jpg?s=612x612&w=0&k=20&c=iDG3eUSoQHWvWFwwDmGlWOK0o0KFZ_Xfnw7tR9UdinI=', description: 'Ciudad histórica con playas caribeñas' },
  { id: 2, name: 'Bogotá', image: 'https://www.estylomagazine.com/wp-content/uploads/2019/03/Post_Bogota-Contrastes-01.jpg', description: 'Capital cultural y gastronómica' },
]

const tips = [
  "Reserva con anticipación para obtener mejores precios",
  "Viaja fuera de temporada alta para evitar multitudes",
  "Prueba la comida local para una experiencia auténtica",
]

function PromotionalSidebar() {
  const [currentDestination, setCurrentDestination] = useState(0)

  const nextDestination = () => {
    setCurrentDestination((prev) => (prev + 1) % destinations.length)
  }

  const prevDestination = () => {
    setCurrentDestination((prev) => (prev - 1 + destinations.length) % destinations.length)
  }

  return (
    <div className="w-64 space-y-6">
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-bold text-green-800 mb-2">Proximamente nuevos destinos</h2>
        <div className="relative">
          <img 
            src={destinations[currentDestination].image} 
            alt={destinations[currentDestination].name} 
            className="w-full h-32 object-cover rounded-lg mb-2"
          />
          <button
            className="absolute top-1/2 left-1 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full"
            onClick={prevDestination}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full"
            onClick={nextDestination}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <h3 className="font-semibold">{destinations[currentDestination].name}</h3>
        <p className="text-sm text-gray-600">{destinations[currentDestination].description}</p>
      </div>
  
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-bold text-green-800 mb-2">Consejos de Viaje</h2>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start text-sm">
              <Lightbulb className="w-4 h-4 mr-2 text-yellow-500 flex-shrink-0 mt-1" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
  
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-4">
        <div className="flex items-center mb-2">
          <Tag className="w-5 h-5 mr-2" />
          <h2 className="text-lg font-bold">Ofertas Especiales</h2>
        </div>
        <p className="text-sm mb-3">¡Reserva ahora y obtén hasta un 30% de descuento en hoteles seleccionados!</p>
        <button className="w-full bg-white text-green-800 hover:bg-gray-100 py-2 px-4 rounded text-sm font-medium">
          Ver Ofertas
        </button>
      </div>
    </div>
  )
}

export default PromotionalSidebar;
