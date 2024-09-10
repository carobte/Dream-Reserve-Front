import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Solicitud al endpoint de autenticación
      const response = await fetch('http://localhost:3000/person', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        const user = data.find(person => person.email === email && person.password === password);

        if (user) {
          alert('Inicio de sesión exitoso');
          // Redirige a la página de inicio
          navigate('/');
        } else {
          setError('Email o contraseña incorrectos');
          alert('Email o contraseña incorrectos');
        }
      } else {
        setError(data.message || 'Error al iniciar sesión');
        alert(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
      alert('Error al conectar con el servidor');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center text-black"
      style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1578115172582-b27c8cd114bb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Pseudo-element overlay */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(75% 0%, 50% 50%, 75% 100%, 0% 100%, 0% 0%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
      />
      {/* Left Pane */}
      <div
        className="relative w-full lg:w-1/2 flex items-center justify-center bg-transparent text-black"
      >
        <div className="max-w-md text-center">
          <div className="flex-1 flex items-center justify-center max-w-screen-lg px-4">
            <div className="text-white text-center lg:text-left max-w-screen-lg">

              <div className="pb-10">
                <button
                  type="button"
                  onClick={() => navigate('/')} 
                  className="bg-custom-green text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  Volver al inicio
                </button>
              </div>

              <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                <span className="text-custom-navy-blue">D</span>reams
                <span className="text-custom-navy-blue">R</span>eserve
              </h1>
              <h2 className="text-4xl font-bold md:text-4xl lg:text-7xl mt-4">
                ¿Dónde te llevará tu <span className="text-custom-navy-blue">próxima aventura</span>?
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/* Right Pane */}
      <div className="w-full lg:w-1/2 flex items-center justify-center z-10">
        <div
          className="max-w-md w-full p-6 bg-custom-green-form rounded-2xl"
          style={{
            backgroundColor: 'rgba(39, 111, 98, 0.85)'
          }}
        >
          <h1 className="text-3xl font-semibold mb-6 text-white text-center">Iniciar sesión</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">Correo</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">Contraseña</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                required
              />
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                <label htmlFor="showPassword" className="text-sm text-white">Mostrar contraseña</label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Iniciar sesión'}
              </button>
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
          </form>
          <div className="mt-4 text-sm text-white text-center">
            <p>Aún no tienes una cuenta? 
              <button
                onClick={() => navigate('/register')}
                className="text-custom-navy-blue hover:underline ml-1"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
