import { usePrice } from '../context/PriceContext';

const FlightSelection = () => {
  const { selectedHotel, totalPrice } = usePrice();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Selecciona tu vuelo</h1>
      <p className="text-lg">Hotel seleccionado: {selectedHotel}</p>
      <p className="text-lg">Precio total de la reserva: COP {totalPrice.toLocaleString()}</p>
    </div>
  );
};

export default FlightSelection;
