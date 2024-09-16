import { createContext, useContext, useState, useEffect } from 'react';
import { useSearch } from './SearchContext'; 
import { usePrice } from './PriceContext';

// Crear el contexto
export const ReservaContext = createContext();

// Hook para usar el contexto de reserva
export const useReserva = () => useContext(ReservaContext);

// Proveedor del contexto
export const ReservaProvider = ({ children }) => {
  // Datos de SearchContext
  const {
    startDate,
    endDate,
    totalPeople,
    origin,
    destination,
    selectedOption,
    planType,
  } = useSearch();

  // Datos de PriceContext
  const { selectedHotel, totalPrice } = usePrice();

  // Datos de reserva combinados
  const [reserva, setReserva] = useState({
    hotel: selectedHotel,
    habitacion: "Suite Deluxe",
    alimentacion: planType === "todo incluido" ? "Todo incluido" : "Solo hotel",
    personas: totalPeople,
    origen: origin,
    destino: destination,
    vueloIda: null,
    vueloVuelta: null,
    tours: [],
    valorTotal: totalPrice
  });

  // Actualiza `reserva` cuando cambian los datos de los contextos
  useEffect(() => {
    setReserva(prev => ({
      ...prev,
      hotel: selectedHotel,
      habitacion: "Suite Deluxe",
      alimentacion: planType === "todo incluido" ? "Todo incluido" : "Solo hotel",
      personas: totalPeople,
      origen: origin,
      destino: destination,
      valorTotal: totalPrice
    }));
  }, [selectedHotel, totalPrice, planType, totalPeople, origin, destination]);

  const updateFlight = (flight, flightType) => {
    setReserva(prev => ({
      ...prev,
      [flightType]: flight,
      valorTotal: prev.valorTotal + flight.price
    }));
  };

  return (
    <ReservaContext.Provider value={{
      reserva,
      setReserva,
      updateFlight, 
    }}>
      {children}
    </ReservaContext.Provider>
  );
};
