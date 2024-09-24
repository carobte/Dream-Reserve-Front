'use client'

import { useState } from 'react'
import { Hotel, Utensils, Bed, Calendar, Plane, Clock, MapPin, DollarSign } from "lucide-react"
import NavbarSelect from '../layout/NavbarSelect'
import Footer from '../layout/Footer'
import { useAuth } from '../context/AuthContext';


// pendiente por compoetizar
const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
)

// pendiente por compoetizar
const Badge = ({ children, className = '' }) => (
  <span className={`inline-block bg-[#276F62] text-white text-xs font-semibold px-2.5 py-0.5 rounded ${className}`}>
    {children}
  </span>
)


// pendiente por compoetizar
function DetallesReserva({ reserva }) {
  if (!reserva) return null

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-[#276F62]">Detalles de la Reserva</h2>
      <Badge className="block w-max mx-auto mb-6 text-lg py-1 px-3">Reserva #{reserva.id}</Badge>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-[#276F62]">
              <Hotel className="h-6 w-6" />
              Alojamiento
            </h3>
            <p className="font-semibold text-lg">{reserva.hotel}</p>
            <div className="flex items-center gap-2 mt-2">
              <Bed className="h-5 w-5 text-gray-500" />
              <span>{reserva.habitacion}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Utensils className="h-5 w-5 text-gray-500" />
              <span>{reserva.alimentacion}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-[#276F62]">
              <Calendar className="h-6 w-6" />
              Fechas
            </h3>
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">Llegada</p>
                <p>{reserva.fechaLlegada}</p>
              </div>
              <div>
                <p className="font-semibold">Salida</p>
                <p>{reserva.fechaSalida}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2">
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-[#276F62]">
              <Plane className="h-6 w-6" />
              Vuelos
            </h3>
            <div className="space-y-4">
              {reserva.vuelos.map((vuelo, index) => (
                <div key={index}>
                  <h4 className="font-semibold">{vuelo.tipo} - Vuelo {vuelo.numero}</h4>
                  <div className="flex justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <span>Salida: {vuelo.salida}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <span>Llegada: {vuelo.llegada}</span>
                    </div>
                  </div>
                  {index < reserva.vuelos.length - 1 && <hr className="my-2 border-gray-200" />}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2">
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-[#276F62]">
              <MapPin className="h-6 w-6" />
              Tours
            </h3>
            <div className="space-y-4">
              {reserva.tours.map((tour, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{tour.nombre}</h4>
                    <p className="text-sm text-gray-500">{tour.fecha}</p>
                  </div>
                  <Badge>{tour.duracion}</Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2">
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-[#276F62]">
              <DollarSign className="h-6 w-6" />
              Precio Total
            </h3>
            <p className="text-2xl font-bold">${reserva.precioTotal}</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Componente principal 
export default function MisReservas() {

  const { user } = useAuth();

  if (!user) return (
    <>
        <NavbarSelect />
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-center text-[#276F62]">Debes iniciar sesión para ver los detalles de la reserva</h1>
          <a href="../Login"><button className="mt-4 w-28 h-8 bg-custom-green text-white font-semibold rounded-md hover:bg-custom-green">Iniciar Sesión</button></a>
        </div>
        <Footer />
    </>
  )


  const [reservas, setReservas] = useState([
    {
      id: "RES123456",
      hotel: "San Fernando",
      destino: "Medellín",
      alimentacion: "Desayuno y almuerzo",
      habitacion: "Doble",
      fechaLlegada: "2024-09-24",
      fechaSalida: "2024-09-27",
      vuelos: [
        { tipo: "Ida", numero: "AV1234", salida: "2024-09-24 10:00", llegada: "2024-09-24 13:30" },
        { tipo: "Vuelta", numero: "AV1235", salida: "2024-09-27 15:00", llegada: "2024-09-27 18:30" }
      ],
      tours: [
        { nombre: "Tour Comuna 13", fecha: "Graffiti tour", duracion: "$ 50000" },
      ],
      precioTotal: "2'500.000"
    }
  ])
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null)

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarSelect />
      <main className="flex-grow container mx-auto my-8 px-4 py-5">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#276F62]">Mis Reservas</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4 text-[#276F62]">Lista de Reservas</h2>
              <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                {reservas.map(reserva => (
                  <div
                    key={reserva.id}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setReservaSeleccionada(reserva)}
                  >
                    <h3 className="font-semibold">{reserva.hotel}</h3>
                    <p className="text-sm text-gray-600">{reserva.destino}</p>
                    <p className="text-sm text-gray-600">{reserva.fechaLlegada} - {reserva.fechaSalida}</p>
                    <Badge className="mt-2">{reserva.id}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <div className="p-4">
              {reservaSeleccionada ? (
                <DetallesReserva reserva={reservaSeleccionada} />
              ) : (
                <p className="text-center text-gray-500">Selecciona una reserva para ver los detalles</p>
              )}
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}