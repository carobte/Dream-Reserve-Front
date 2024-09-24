import { PlaneIcon, HotelIcon, UtensilsIcon, UsersIcon, MapPinIcon, CalendarIcon, MapIcon, LuggageIcon, UmbrellaIcon } from "lucide-react";
import NavbarSelect from "../layout/NavbarSelect";
import Footer from "../layout/Footer";
import { useReserva } from "../context/ReserveContext"; 
import { useNavigate } from "react-router-dom";

export default function DetallesReserva() {
  const navigate = useNavigate();
  const { reserva } = useReserva();
  
  

  const handleConfirmReserve = (reserva) => {

    //Aca hay una alerta para estilar 
    alert("Reserva confirmada");

    navigate("/my-reservations");
  }
  const formatoFecha = (fecha) => {
    if (!fecha) return "Fecha no disponible"; 
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
                <span className="font-semibold">Alimentación:</span> {reserva.alimentacion || "No disponible"}
              </div>
              <div className="flex items-center space-x-2">
                <UsersIcon className="text-purple-500" />
                <span className="font-semibold">Personas:</span> {reserva.personas || "No disponible"}
              </div>
              <div className="flex items-center space-x-2">
                <HotelIcon className="text-yellow-500" />
                <span className="font-semibold">Habitación:</span> 
                <span>{reserva.habitacion || "No disponible"}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPinIcon className="text-red-500" />
                <span className="font-semibold">Origen:</span> {reserva.origen || "No disponible"}
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="text-green-500" />
                <span className="font-semibold">Destino:</span> {reserva.destino || "No disponible"}
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-300" />

          {reserva.vueloIda && (
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-lg">Vuelos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white shadow-md p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Vuelo de Ida</h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <PlaneIcon className="text-blue-500" />
                    <span>Dream Air - Dream Air</span>
                  </div>
                </div>
                {reserva.vueloVuelta && (
                  <div className="bg-white shadow-md p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Vuelo de Vuelta</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <PlaneIcon className="text-blue-500" />
                      <span>Dream Air - Dream Air</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {reserva.tours && reserva.tours.length > 0 && (
            <div className="space-y-2 mb-6">
              <h3 className="font-semibold text-lg">Tours Incluidos</h3>
              <ul className="list-disc list-inside space-y-1">
                {reserva.tours.map((tour, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <MapIcon className="text-yellow-500" />
                    <span>{tour.name || "Tour no disponible"}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <hr className="my-6 border-gray-300" />

          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold text-lg">Valor Total:</span>
            <span className="text-2xl font-bold text-green-600 flex items-center">
              {reserva.valorTotal 
                ? reserva.valorTotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
                : "Valor no disponible"}
            </span>
          </div>
          <div className="flex justify-end space-x-4">
            <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100">Cancelar</button>
            <button 
              className="bg-custom-green text-white px-4 py-2 rounded-lg hover:bg-custom-green-form pointer"
                onClick={handleConfirmReserve}
            >
              Confirmar
            </button>
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
