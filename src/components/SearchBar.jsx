import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function SearchBar() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPeople, setTotalPeople] = useState(2); 
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [showPeopleSelector, setShowPeopleSelector] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate(); 

  const handleCheckboxChange = (value) => {
    setSelectedOption(selectedOption === value ? null : value);
  };

  const handleSearch = (e) => {
    e.preventDefault(); 
    const searchParams = new URLSearchParams({
      startDate: startDate ? startDate.toISOString() : '',
      endDate: endDate ? endDate.toISOString() : '',
      totalPeople,
      origin,
      destination,
      selectedOption
    }).toString();
    

    navigate(`/search-results?${searchParams}`);
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
      {/* Opciones de selección */}
      <div className="flex items-center space-x-4 mb-8 md:mb-12 lg:mb-16">
        {/* Paquete completo */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="paquete-completo"
            name="opciones"
            value="paquete-completo"
            checked={selectedOption === 'paquete-completo'}
            onChange={() => handleCheckboxChange('paquete-completo')}
            className="hidden peer"
          />
          <label
            htmlFor="paquete-completo"
            className="flex items-center cursor-pointer text-white space-x-2"
          >
            <div className="w-5 h-5 flex items-center justify-center border-2 border-white rounded-md peer-checked:bg-blue-500 peer-checked:border-transparent">
              <svg
                className={`w-4 h-4 text-white ${selectedOption === 'paquete-completo' ? '' : 'hidden'}`}
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
            <span>Paquete completo</span>
          </label>
        </div>

        {/* Solo hotel */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="solo-hotel"
            name="opciones"
            value="solo-hotel"
            checked={selectedOption === 'solo-hotel'}
            onChange={() => handleCheckboxChange('solo-hotel')}
            className="hidden peer"
          />
          <label
            htmlFor="solo-hotel"
            className="flex items-center cursor-pointer text-white space-x-2"
          >
            <div className="w-5 h-5 flex items-center justify-center border-2 border-white rounded-md peer-checked:bg-blue-500 peer-checked:border-transparent">
              <svg
                className={`w-4 h-4 text-white ${selectedOption === 'solo-hotel' ? '' : 'hidden'}`}
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
            <span>Solo hotel</span>
          </label>
        </div>

        {/* Vuelos */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="vuelos"
            name="opciones"
            value="vuelos"
            checked={selectedOption === 'vuelos'}
            onChange={() => handleCheckboxChange('vuelos')}
            className="hidden peer"
          />
          <label
            htmlFor="vuelos"
            className="flex items-center cursor-pointer text-white space-x-2"
          >
            <div className="w-5 h-5 flex items-center justify-center border-2 border-white rounded-md peer-checked:bg-blue-500 peer-checked:border-transparent">
              <svg
                className={`w-4 h-4 text-white ${selectedOption === 'vuelos' ? '' : 'hidden'}`}
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
            <span>Vuelos</span>
          </label>
        </div>

        {/* Tours */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="tours"
            name="opciones"
            value="tours"
            checked={selectedOption === 'tours'}
            onChange={() => handleCheckboxChange('tours')}
            className="hidden peer"
          />
          <label
            htmlFor="tours"
            className="flex items-center cursor-pointer text-white space-x-2"
          >
            <div className="w-5 h-5 flex items-center justify-center border-2 border-white rounded-md peer-checked:bg-blue-500 peer-checked:border-transparent">
              <svg
                className={`w-4 h-4 text-white ${selectedOption === 'tours' ? '' : 'hidden'}`}
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
            <span>Tours</span>
          </label>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="bg-custom-navy-blue-opacity sm:rounded-none  md:rounded-full  bg-opacity-75 p-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
        <form className="flex flex-col md:flex-row items-center gap-4 w-full" onSubmit={handleSearch}>
          {selectedOption !== 'solo-hotel' && selectedOption !== 'tours' && (
            <>
              {/* Lugar de origen Desde */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Desde"
                  className="bg-transparent border-r-2 text-white px-3 py-2 w-full placeholder-white dark:placeholder-white placeholder-opacity-100  focus:outline-none focus:ring-0 focus:border-white"
                />
              </div>
            </>
          )}

          {/* Lugar de destino Hasta / Destino */}
          <div className="relative flex-1">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={selectedOption === 'tours' ? 'Ciudad del tour' : 'Hasta'}
              className="bg-transparent text-white px-3 py-2 w-full placeholder-white dark:placeholder-white placeholder-opacity-100 border-r-2 focus:outline-none focus:ring-0 focus:border-white"
            />
          </div>

          {selectedOption !== 'tours' && (
            <>
              {/* Campo de Fechas */}
              <div className="relative flex-1">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  customInput={
                    <CustomInput
                      value={startDate ? startDate.toLocaleDateString() : "Desde"}
                    />
                  }
                  className="bg-white dark:bg-gray-800 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:border-white"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Selecciona una fecha"
                  minDate={today}
                />
              </div>

              <div className="relative flex-1">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  customInput={
                    <CustomInput
                      value={endDate ? endDate.toLocaleDateString() : "Hasta"}
                    />
                  }
                  className="bg-white dark:bg-gray-800 border border-gray-300 rounded-md p-2"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Selecciona una fecha"
                  minDate={startDate || today}
                />
              </div>
            </>
          )}

          {/* Campo de Personas */}
          {(selectedOption !== 'tours' || showPeopleSelector) && (
            <div className="relative flex-1">
              <button
                type="button"
                className="bg-transparent text-white px-3 py-2 w-full placeholder-white dark:placeholder-white placeholder-opacity-100 border-r-2"
                onClick={() => setShowPeopleSelector(!showPeopleSelector)}
              >
                <div className="flex items-center gap-2">
                  <span>{`${totalPeople} personas`}</span>
                </div>
              </button>
              {showPeopleSelector && (
                <div className="absolute top-full left-0 mt-2 z-10 bg-white rounded-md shadow-lg p-4 w-[300px]">
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

          {/* Botón de Buscar */}
          <button
            type="submit"
            className="bg-custom-green text-white py-2 px-4 rounded-full w-12 h-12 flex items-center justify-center mt-4 md:mt-0"
          >
            <svg width="48" height="52" viewBox="0 0 48 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M43.6333 51.5L27.3583 33.65C26.0667 34.7833 24.5812 35.6806 22.9021 36.3417C21.2229 37.0028 19.4361 37.3333 17.5417 37.3333C12.8486 37.3333 8.87674 35.5507 5.62604 31.9854C2.37535 28.4201 0.75 24.0639 0.75 18.9167C0.75 13.7694 2.37535 9.41319 5.62604 5.84792C8.87674 2.28264 12.8486 0.5 17.5417 0.5C22.2347 0.5 26.2066 2.28264 29.4573 5.84792C32.708 9.41319 34.3333 13.7694 34.3333 18.9167C34.3333 20.9944 34.0319 22.9542 33.4292 24.7958C32.8264 26.6375 32.0083 28.2667 30.975 29.6833L47.25 47.5333L43.6333 51.5ZM17.5417 31.6667C20.7708 31.6667 23.5156 30.4271 25.776 27.9479C28.0365 25.4687 29.1667 22.4583 29.1667 18.9167C29.1667 15.375 28.0365 12.3646 25.776 9.88542C23.5156 7.40625 20.7708 6.16667 17.5417 6.16667C14.3125 6.16667 11.5677 7.40625 9.30729 9.88542C7.04687 12.3646 5.91667 15.375 5.91667 18.9167C5.91667 22.4583 7.04687 25.4687 9.30729 27.9479C11.5677 30.4271 14.3125 31.6667 17.5417 31.6667Z" fill="#ABF5E8"/>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
