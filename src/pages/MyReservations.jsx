import { useEffect, useState } from 'react';
import NavbarSelect from '../layout/NavbarSelect';
import Footer from '../layout/Footer';
import { Card, Badge, ReserveDetails } from '../components';
import { useAuth } from '../context/AuthContext';

// Componente principal 
export default function MisReservas() {

/*   const { user } = useAuth();

  if (!user) return (
    <>
        <NavbarSelect />
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-center text-[#276F62]">Debes iniciar sesión para ver los detalles de la reserva</h1>
          <a href="../Login"><button className="mt-4 w-28 h-8 bg-custom-green text-white font-semibold rounded-md hover:bg-custom-green">Iniciar Sesión</button></a>
        </div>
        <Footer />
    </>
  ) */

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
        { nombre: "Tour Comuna 13", descripcion: "Graffiti tour", precio: " 50000" },
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
                <ReserveDetails reserva={reservaSeleccionada} />
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