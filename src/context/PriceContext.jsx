import { createContext, useContext, useState } from 'react';

const PriceContext = createContext();

export const usePrice = () => useContext(PriceContext);

export const PriceProvider = ({ children }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const value = {
    selectedHotel,
    setSelectedHotel,
    totalPrice,
    setTotalPrice
  };

  return (
    <PriceContext.Provider value={value}>
      {children}
    </PriceContext.Provider>
  );
};
