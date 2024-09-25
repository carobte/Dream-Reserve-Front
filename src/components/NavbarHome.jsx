import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Menu, X } from 'lucide-react';
import { useState } from 'react';

const buttonOptions = [
  {
    id: 1,
    text: '¿Quienes Somos?',
    path: '/about-us',
    className: 'px-3 py-1 bg-teal-700 rounded text-sm hidden sm:inline-block',
  },
  {
    id: 2,
    text: 'Reservas',
    path: '/my-reservations',
    className: 'px-3 py-1 bg-teal-700 rounded text-sm hidden sm:inline-block',
  }
];

export default function NavbarHome() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const loginPath = '/login';
  const registerPath = '/register';

  return (
    <div className="relative z-10">
      <nav className="flex justify-between items-center text-white mb-8">
        <div className="flex items-center space-x-2">
          {/* Mostrar avatar o ícono de usuario */}
          {user?.urlAvatar ? (
            <img 
              src={user.urlAvatar} 
              alt="Avatar" 
              className="h-11 w-11 rounded-full" 
            />
          ) : (
            <User className="h-8 w-8" />
          )}
          {user ? (
            <button 
              className="px-3 py-1 bg-teal-700 rounded text-sm"
              onClick={() => {
                logout();
                navigate('/'); 
              }}
            >
              Cerrar sesión
            </button>
          ) : (
            <>
              <button 
                className="px-3 py-1 bg-teal-700 rounded text-sm hidden sm:inline-block"
                onClick={() => handleButtonClick(loginPath)} // Redirección a iniciar sesión
              >
                Iniciar sesión
              </button>
              <button 
                className="px-3 py-1 bg-teal-700 rounded text-sm hidden sm:inline-block"
                onClick={() => handleButtonClick(registerPath)} // Redirección a registrar
              >
                Registrar
              </button>
            </>
          )}
        </div>

        <div className="hidden sm:flex space-x-2">
          {buttonOptions.map((option) => (
            <button
              key={option.id}
              className={option.className}
              onClick={() => handleButtonClick(option.path)} // Redirección a las opciones
            >
              {option.text}
            </button>
          ))}
        </div>

        <button className="sm:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-teal-700 z-50 flex flex-col items-center justify-center">
          <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
            <X className="h-6 w-6 text-white" />
          </button>

          <nav className="flex flex-col space-y-4 items-center">
            {/* Mostrar avatar o ícono de usuario en el menú desplegable */}
            {user?.urlAvatar ? (
              <img 
                src={user.urlAvatar} 
                alt="Avatar" 
                className="h-12 w-12 rounded-full mb-4" 
              />
            ) : (
              <User className="h-12 w-12 mb-4" />
            )}

            {user ? (
              <button 
                className="px-3 py-1 bg-teal-600 rounded text-sm text-white"
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                  navigate('/'); 
                }}
              >
                Cerrar sesión
              </button>
            ) : (
              <>
                <button 
                  className="px-3 py-1 bg-teal-600 rounded text-sm text-white"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleButtonClick(loginPath);
                  }} // Redirección a iniciar sesión
                >
                  Iniciar sesión
                </button>
                <button 
                  className="px-3 py-1 bg-teal-600 rounded text-sm text-white"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleButtonClick(registerPath);
                  }} // Redirección a registrar
                >
                  Registrar
                </button>
              </>
            )}

            {buttonOptions.map((option) => (
              <button
                key={option.id}
                className="px-3 py-1 bg-teal-600 rounded text-sm text-white"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleButtonClick(option.path);
                }} // Redirección a las opciones
              >
                {option.text}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
