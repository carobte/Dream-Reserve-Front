import { PlaneIcon, HotelIcon, UtensilsIcon, UsersIcon, MapPinIcon, CalendarIcon, MapIcon, LuggageIcon, UmbrellaIcon } from "lucide-react";
import NavbarSelect from "../layout/NavbarSelect";
import Footer from "../layout/Footer";
import { useReserva } from "../context/ReserveContext"; 
import { useNavigate } from "react-router-dom";

export default function DetallesReserva() {
  const navigate = useNavigate();
  const { reserva } = useReserva();
  
  // Log buscando errores estado 
  console.log("Reserva data:", reserva);

  const handleConfirmReserve = async () => {
    const payload = {
      personId: reserva.persona?.id || 7, 
      roomId: reserva.habitacion?.id || null, 
      foodId: reserva.alimentacion?.id || null, 
      flightId: reserva.vueloIda?.id || null, 
      tourId: reserva.tours?.[0]?.id || null, 
      checkIn: reserva.startDate || "2024-09-20T03:09:27.143Z", 
      checkOut: reserva.endDate || "2024-09-20T03:09:27.143Z", 
      peopleCuantity: reserva.personas || 1, 
      total: reserva.valorTotal || 1, 
    };
  
    try {
      const response = await fetch("https://dreamreserve.azurewebsites.net/api/V1/Reserves", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert("Reserva confirmada con éxito");
        navigate("/my-reservations");
      } else {
        // Si la respuesta no es exitosa, muestra el estado y texto de la respuesta
        const errorText = await response.text();
        console.log("Error en la respuesta del servidor:", response.status, response.statusText);
        console.log("Detalles del error:", errorText);
        alert("Error al confirmar la reserva. Inténtalo de nuevo.");
      }
    } catch (error) {
      // Si hay un error en el proceso de la solicitud (red, conexión, etc.)
      console.error("Error en la solicitud de reserva:", error);
      alert("Hubo un problema al confirmar la reserva.");
    }
  };

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
          
          <div>Hotel: {console.log("Hotel:", reserva.hotel)}</div>
          <div>Alimentación: {console.log("Alimentación:", reserva.alimentacion)}</div>
          <div>Valor Total: {console.log("Valor Total:", reserva.valorTotal)}</div>

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
                {reserva.habitacion 
                  ? `${reserva.habitacion.name} - ${reserva.habitacion.description} - ${reserva.habitacion.price?.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}`
                  : "Habitación no seleccionada"}
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
                    <span>{reserva.vueloIda.aerolinea} - {reserva.vueloIda.numero}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="text-gray-500" />
                    <span>{formatoFecha(reserva.vueloIda.salida)}</span>
                  </div>
                </div>
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
      </main>
      <Footer />
    </div>
  );
}
