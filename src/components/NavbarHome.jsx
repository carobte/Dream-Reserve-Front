import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const buttonOptions = [
  {
    id: 1,
    text: '¿ Quienes Somos ?',
    path: '/about-us',
    className: 'cursor-pointer bg-custom-green-opacity text-white py-2 px-4 rounded border border-none',
  },
  {
    id: 2,
    text: 'Reservas',
    path: '/my-reservations',
    className: 'cursor-pointer bg-custom-green-opacity text-white py-2 px-4 rounded border border-none',
  }
];

export default function NavbarHome() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const loginPath = '/login';
  const registerPath = '/register';

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between w-full mb-4 sm:mb-8 md:mb-12 lg:mb-16">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-custom-green rounded-full flex items-center justify-center">
            <span className="text-white text-lg sm:text-xl">U</span>
          </div>
          {user ? (
            <button 
              className="bg-custom-green text-white py-2 px-4 rounded text-sm sm:text-base"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              Cerrar sesión
            </button>
          ) : (
            <div className="flex space-x-2">
              <button 
                className="bg-custom-green text-white py-2 px-4 rounded text-sm sm:text-base"
                onClick={() => handleButtonClick(loginPath)}
              >
                Iniciar sesión
              </button>
              <button 
                className="bg-custom-green text-white py-2 px-4 rounded text-sm sm:text-base"
                onClick={() => handleButtonClick(registerPath)}
              >
                Registrar
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center sm:justify-end space-x-2 space-y-2 sm:space-y-0">
          {buttonOptions.map((option) => (
            <button
              key={option.id}
              className={`${option.className} text-sm sm:text-base`}
              onClick={() => handleButtonClick(option.path)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}