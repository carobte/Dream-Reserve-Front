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
    <nav className="w-full flex flex-row flex-wrap space-x-4 mb-8   sm:flex-row gap-4 items-center pace-y-0  ">
      <div className="flex flex-row flex-wrap items-center space-x-4">
        <div className="w-12 h-12 bg-custom-green rounded-full flex items-center justify-center">
          <span className="text-white text-xl">U</span>
        </div>
        {user ? (
          <button 
            className="bg-custom-green text-white py-2 px-4 rounded"
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

      <div className="flex space-x-2">
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