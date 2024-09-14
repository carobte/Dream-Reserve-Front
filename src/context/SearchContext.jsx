import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPeople, setTotalPeople] = useState(2);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const value = {
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
    setSelectedOption,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
