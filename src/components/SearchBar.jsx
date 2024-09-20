import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SearchContext } from '../context/SearchContext'; 

export default function SearchBar() {
  const {
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
    setPlanType,
  } = useContext(SearchContext);

  const [showPeopleSelector, setShowPeopleSelector] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleCheckboxChange = (value) => {
    setSelectedOption(selectedOption === value ? null : value);
    setPlanType(value);  
  };

  // validaciones de opcon selecionada 
  const validateForm = () => {
    if (!selectedOption) {
      setError('Por favor, selecciona una opción.');
      return false;
    }
  
    // Validar solo el campo de destino para la opción de "tours"
    if (selectedOption === 'tours') {
      if (!destination) {
        setError('Por favor, ingresa la ciudad del tour.');
        return false;
      }
    } else if (selectedOption === 'solo-hotel') {
      // Validación solo para la opción de "solo-hotel"
      if (!destination) {
        setError('Por favor, completa el campo de destino.');
        return false;
      }
      if (!startDate || !endDate) {
        setError('Por favor, selecciona las fechas.');
        return false;
      }
      if (totalPeople <= 0) {
        setError('Por favor, ingresa el número de personas.');
        return false;
      }
    } else {
      // Validaciones para las otras opciones (paquete completo, vuelos)
      if (!origin) {
        setError('Por favor, completa el campo de origen.');
        return false;
      }
      if (!destination) {
        setError('Por favor, completa el campo de destino.');
        return false;
      }
      if (!startDate || !endDate) {
        setError('Por favor, selecciona las fechas.');
        return false;
      }
      if (totalPeople <= 0) {
        setError('Por favor, ingresa el número de personas.');
        return false;
      }
    }
  
    setError('');
    return true;
  };
  
  

  const handleSearch = (e) => {
    e.preventDefault(); 
    if (!validateForm()) return; 

    const searchParams = new URLSearchParams({
      startDate: startDate ? startDate.toISOString() : '',
      endDate: endDate ? endDate.toISOString() : '',
      totalPeople,
      origin,
      destination,
      selectedOption
    }).toString();

    // Redireccionar según la opción seleccionada
    switch (selectedOption) {
      case 'paquete-completo':
        navigate(`/search-results?${searchParams}`); 
        break;
      case 'solo-hotel':
        navigate(`/search-results?${searchParams}`);
        break;
      case 'vuelos':
        navigate(`/flight-selection?${searchParams}`); 
        break;
      case 'tours':
        navigate(`/tour-selection?${searchParams}`); 
        break;
      default:
        navigate(`/`); 
    }
  };

  const today = new Date();

  const CustomInput = ({ value, onClick }) => (
    <input
      type="text"
      onClick={onClick}
      value={value}
      readOnly
      className="bg-transparent text-white px-3 py-2 w-full placeholder-white dark:placeholder-white placeholder-opacity-100 border-r-2"
      placeholder={value ? "" : "Selecciona una fecha"}
    />
  );

  return (
    <>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex flex-wrap justify-center sm:justify-start items-center space-x-2 sm:space-x-4 mb-4 sm:mb-8"> 
        {/* Checkbox options */}
        {['paquete-completo', 'solo-hotel', 'vuelos', 'tours'].map((option) => (
          <div key={option} className="flex items-center space-x-2 mb-2 sm:mb-0">
            <input
              type="checkbox"
              id={option}
              name="opciones"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleCheckboxChange(option)}
              className="hidden peer"
            />
            <label
              htmlFor={option}
              className="flex items-center px-2 py-1 sm:px-3 sm:py-2 cursor-pointer text-white space-x-2 text-sm"
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center border-2 border-white rounded-md peer-checked:bg-blue-500 peer-checked:border-transparent">
                <svg
                  className={`w-3 h-3 sm:w-4 sm:h-4 text-white ${selectedOption === option ? '' : 'hidden'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span>{option.replace('-', ' ').charAt(0).toUpperCase() + option.replace('-', ' ').slice(1)}</span>
            </label>
          </div>
        ))}
      </div>

      <div className="bg-custom-navy-blue-opacity bg-opacity-75 p-2 sm:p-4 rounded-lg sm:rounded-full w-full max-w-4xl mx-auto">
        <form className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full" onSubmit={handleSearch}>
        {selectedOption !== 'solo-hotel' && selectedOption !== 'tours' && (
            <div className="relative flex-1 w-full sm:w-auto">
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Desde"
                className="bg-transparent border-b sm:border-r sm:border-b-0 text-white px-3 py-2 w-full placeholder-white dark:placeholder-white placeholder-opacity-100 focus:outline-none focus:ring-0 focus:border-white"
              />
            </div>
          )}

          <div className="relative flex-1 w-full sm:w-auto">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={selectedOption === 'tours' ? 'Ciudad del tour' : 'Hasta'}
              className="bg-transparent border-b sm:border-r sm:border-b-0 text-white px-3 py-2 w-full placeholder-white dark:placeholder-white placeholder-opacity-100 focus:outline-none focus:ring-0 focus:border-white"
            />
          </div>

          {selectedOption !== 'tours' && (
            <>
              <div className="relative flex-1 w-full sm:w-auto">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  customInput={
                    <CustomInput
                      value={startDate ? startDate.toLocaleDateString() : "Desde"}
                    />
                  }
                  className="bg-white dark:bg-gray-800 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:border-white w-full"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Selecciona una fecha"
                  minDate={today}
                />
              </div>

              <div className="relative flex-1 w-full sm:w-auto">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  customInput={
                    <CustomInput
                      value={endDate ? endDate.toLocaleDateString() : "Hasta"}
                    />
                  }
                  className="bg-white dark:bg-gray-800 border border-gray-300 rounded-md p-2 w-full"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Selecciona una fecha"
                  minDate={startDate || today}
                />
              </div>
            </>
          )}

          {(selectedOption !== 'tours' || showPeopleSelector) && (
            <div className="relative flex-1 w-full sm:w-auto">
              <button
                type="button"
                className="bg-transparent text-white px-3 py-2 w-full placeholder-white dark:placeholder-white placeholder-opacity-100 border-b sm:border-r sm:border-b-0"
                onClick={() => setShowPeopleSelector(!showPeopleSelector)}
              >
                <div className="flex items-center gap-2">
                  <span>{`${totalPeople} personas`}</span>
                </div>
              </button>
              {showPeopleSelector && (
                <div className="absolute top-full left-0 mt-2 z-10 bg-white rounded-md shadow-lg p-4 w-full sm:w-[300px]">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total de personas</span>
                    <input
                      type="number"
                      value={totalPeople}
                      onChange={(e) => setTotalPeople(parseInt(e.target.value, 10))}
                      className="bg-gray-100 border border-gray-300 rounded-md p-1 w-16 text-center"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="bg-custom-green text-white py-2 px-4 rounded-full w-full sm:w-12 h-12 flex items-center justify-center mt-2 sm:mt-0"
          >
            <svg width="24" height="24" viewBox="0 0 48 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M43.6333 51.5L27.3583 33.65C26.0667 34.7833 24.5812 35.6806 22.9021 36.3417C21.2229 37.0028 19.4361 37.3333 17.5417 37.3333C12.8486 37.3333 8.87674 35.5507 5.62604 31.9854C2.37535 28.4201 0.75 24.0639 0.75 18.9167C0.75 13.7694 2.37535 9.41319 5.62604 5.84792C8.87674 2.28264 12.8486 0.5 17.5417 0.5C22.2347 0.5 26.2066 2.28264 29.4573 5.84792C32.708 9.41319 34.3333 13.7694 34.3333 18.9167C34.3333 20.9944 34.0319 22.9542 33.4292 24.7958C32.8264 26.6375 32.0083 28.2667 30.975 29.6833L47.25 47.5333L43.6333 51.5ZM17.5417 31.6667C20.7708 31.6667 23.5156 30.4271 25.776 27.9479C28.0365 25.4687 29.1667 22.4583 29.1667 18.9167C29.1667 15.375 28.0365 12.3646 25.776 9.88542C23.5156 7.40625 20.7708 6.16667 17.5417 6.16667C14.3125 6.16667 11.5677 7.40625 9.30729 9.88542C7.04687 12.3646 5.91667 15.375 5.91667 18.9167C5.91667 22.4583 7.04687 25.4687 9.30729 27.9479C11.5677 30.4271 14.3125 31.6667 17.5417 31.6667Z" fill="#ABF5E8"/>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
