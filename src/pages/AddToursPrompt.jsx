import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Palmtree, Coffee, Mountain, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const tourHighlights = [
  { icon: Palmtree, text: "Explora la vibrante cultura de Medellín" },
  { icon: Coffee, text: "Descubre la rica tradición cafetera" },
  { icon: Mountain, text: "Maravíllate con paisajes impresionantes" },
]

export default function AddToursPrompt() {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/tour-selection');
  }

  const handlePostpone = () => {
    
    console.log("Decisión pospuesta...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-custom-green flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              ¿Deseas añadir emocionantes tours a tu viaje a Medellín?
            </h1>
            <p className="text-center text-gray-600">
              Descubre las maravillas de Medellín con nuestros tours cuidadosamente seleccionados
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tourHighlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg">
                  <highlight.icon className="h-6 w-6 text-green-500" />
                  <span className="text-sm text-gray-700">{highlight.text}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={handleExplore}
                  className="text-lg px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out flex items-center"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span>Explorar Tours</span>
                  <ChevronRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={handlePostpone}
                  className="text-lg px-8 py-3 bg-white text-gray-600 hover:bg-gray-100 border border-gray-300 rounded-full shadow-lg transition-all duration-300 ease-in-out flex items-center"
                >
                  <Clock className="mr-2 h-5 w-5" />
                  <span>Añadir despues</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}