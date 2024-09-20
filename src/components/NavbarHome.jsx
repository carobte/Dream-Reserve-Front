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
    <nav className="w-full  flex flex-col gap-12 sm:flex-col items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
      <div className="flex flex-wrap justify-center sm:justify-start items-center space-x-2 sm:space-x-4">
        <div className="w-12 h-12 bg-custom-green rounded-full flex items-center justify-center">
          <span className="text-white text-xl">U</span>
        </div>
        {user ? (
          <button 
            className="bg-custom-green text-white py-2 px-4 rounded mt-2 sm:mt-0"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            Cerrar sesión
          </button>
        ) : (
          <div className="flex space-x-2 mt-2 sm:mt-0">
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
        )}
      </div>

      <div className="flex flex-wrap justify-center sm:justify-end space-x-2 sm:space-x-4">
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
    </nav>
  );
}