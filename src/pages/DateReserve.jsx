import { PlaneIcon, HotelIcon, UtensilsIcon, UsersIcon, MapPinIcon, CalendarIcon, MapIcon, LuggageIcon, UmbrellaIcon } from "lucide-react";
import NavbarSelect from "../layout/NavbarSelect";
import Footer from "../layout/Footer";
import { useReserva } from "../context/ReserveContext"; // Verifica que la ruta sea correcta

export default function DetallesReserva() {
  const { reserva } = useReserva();
  console.log(reserva);

  const formatoFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-CO', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-200 flex flex-col">
      <NavbarSelect />

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Detalles de tu Reserva</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <HotelIcon className="text-blue-500" />
                <span className="font-semibold">Hotel:</span> {reserva.hotel ? reserva.hotel.name : "Hotel no seleccionado"}

              </div>
              <div className="flex items-center space-x-2">
                <UtensilsIcon className="text-green-500" />
                <span className="font-semibold">Alimentación:</span> {reserva.alimentacion}
              </div>
              <div className="flex items-center space-x-2">
                <UsersIcon className="text-purple-500" />
                <span className="font-semibold">Personas:</span> {reserva.personas}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPinIcon className="text-red-500" />
                <span className="font-semibold">Origen:</span> {reserva.origen}
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="text-green-500" />
                <span className="font-semibold">Destino:</span> {reserva.destino}
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-300" />

          {reserva.alimentacion !== "Solo hotel" && (
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-lg">Vuelos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reserva.vueloIda && (
                  <div className="bg-white shadow-md p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Vuelo de Ida</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <PlaneIcon className="text-blue-500" />
                      <span>{reserva.vueloIda.aerolinea} - {reserva.vueloIda.numero}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="text-gray-500" />
                      <span>{formatoFecha(reserva.vueloIda.salida)}</span>
                    </div>
                  </div>
                )}
                {reserva.vueloVuelta && (
                  <div className="bg-white shadow-md p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Vuelo de Vuelta</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <PlaneIcon className="text-blue-500" />
                      <span>{reserva.vueloVuelta.aerolinea} - {reserva.vueloVuelta.numero}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="text-gray-500" />
                      <span>{formatoFecha(reserva.vueloVuelta.salida)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {reserva.alimentacion !== "Solo hotel" && reserva.tours.length > 0 && (
            <div className="space-y-2 mb-6">
              <h3 className="font-semibold text-lg">Tours Incluidos</h3>
              <ul className="list-disc list-inside space-y-1">
                {reserva.tours.map((tour, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <MapIcon className="text-yellow-500" />
                    <span>{tour}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <hr className="my-6 border-gray-300" />

          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold text-lg">Valor Total:</span>
            <span className="text-2xl font-bold text-green-600 flex items-center">
              {reserva.valorTotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
            </span>
          </div>
          <div className="flex justify-end space-x-4">
            <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100">Cancelar</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Confirmar</button>
          </div>
        </div>

        {/* Sección de Próximos Pasos */}
        <div className="mt-8 w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Próximos Pasos</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li className="flex items-center space-x-2">
              <LuggageIcon className="text-blue-500" />
              <span>Prepara tu equipaje según el clima de tu destino.</span>
            </li>
            <li className="flex items-center space-x-2">
              <UmbrellaIcon className="text-orange-500" />
              <span>Verifica las condiciones climáticas antes de tu viaje.</span>
            </li>
            <li className="flex items-center space-x-2">
              <PlaneIcon className="text-green-500" />
              <span>Realiza el check-in en línea 24 horas antes de tu vuelo.</span>
            </li>
          </ol>
        </div>
      </main>

      <Footer />
    </div>
  );
}
