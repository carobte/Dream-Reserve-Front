import React, { createContext, useState } from 'react';

// Crear el contexto
export const SearchContext = createContext();

// Proveedor del contexto
export const SearchProvider = ({ children }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPeople, setTotalPeople] = useState(2);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <SearchContext.Provider
      value={{
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        totalPeople,
        setTotalPeople,
        origin,
        setOrigin,
        destination,
        setDestination,
        selectedOption,
        setSelectedOption
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
