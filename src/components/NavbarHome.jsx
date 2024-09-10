import { useNavigate } from 'react-router-dom';

const buttonOptions = [
  {
    id: 1,
    text: 'Explorar Ofertas',
    path: '/explore-offers',
    className: 'cursor-pointer bg-custom-green-opacity text-white py-2 px-4 rounded border border-none',
  },
  {
    id: 2,
    text: 'Reservas',
    path: '/reservations',
    className: 'cursor-pointer bg-custom-green-opacity text-white py-2 px-4 rounded border border-none',
  }
];

export default function Home() {
  const navigate = useNavigate(); 

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const loginPath = '/login';
  const registerPath = '/register'; 

  return (
    <>
      {/* Sección botón para login */}
      <div className="flex items-center space-x-4 mb-8 md:mb-12 lg:mb-16">
        <div className="w-16 h-16 bg-custom-green rounded-full flex items-center justify-center">
          <span className="text-white text-xl">U</span>
        </div>
        <button 
          className="bg-custom-green text-white py-2 px-4 rounded"
          onClick={() => handleButtonClick(loginPath)}
        >
          Iniciar sesión
        </button>
        <button 
          className="bg-custom-green text-white py-2 px-4 rounded"
          onClick={() => handleButtonClick(registerPath)}
        >
          Registrar
        </button>
      </div>

      {/* Navbar con los botones */}
      <div className="space-y-8 space-x-4 mb-8 md:mb-12 lg:mb-16">
        {buttonOptions.map((option) => (
          <button
            key={option.id}
            className={option.className}
            onClick={() => handleButtonClick(option.path)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </>
  );
}
