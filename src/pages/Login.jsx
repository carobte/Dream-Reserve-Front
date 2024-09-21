import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
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
          login(user);
          navigate('/');
        } else {
          setError('Email o contraseña incorrectos');
        }
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col lg:flex-row text-black">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(../ImagenFondo.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(75% 0%, 50% 50%, 75% 100%, 0% 100%, 0% 0%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)" 
        }}
      />
      {/* Left Pane */}
      <div className="relative w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="text-white text-center lg:text-left max-w-lg">
          <div className="mb-8">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-custom-green text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
            >
              Volver al inicio
            </button>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-custom-navy-blue">D</span>reams
            <span className="text-custom-navy-blue">R</span>eserve
          </h1>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            ¿Dónde te llevará tu <span className="text-custom-navy-blue">próxima aventura</span>?
          </h2>
        </div>
      </div>
      {/* Right Pane */}
      <div className="relative w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md bg-custom-green-form bg-opacity-85 p-8 rounded-2xl">
          <h1 className="text-3xl font-semibold mb-6 text-white text-center">Iniciar sesión</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField label="Correo" id="email" type="email" value={email} onChange={setEmail} />
            <PasswordField label="Contraseña" id="password" value={password} onChange={setPassword} showPassword={showPassword} setShowPassword={setShowPassword} />
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
          </form>
          {error && (
            <div className="mt-4 text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          <div className="mt-4 text-sm text-white text-center">
            <p>¿Aún no tienes una cuenta?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-custom-navy-blue hover:underline"
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

function InputField({ label, id, type = "text", value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-white mb-1">{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-navy-blue focus:border-transparent transition-colors duration-300"
        required
      />
    </div>
  );
}

function PasswordField({ label, id, value, onChange, showPassword, setShowPassword }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-white mb-1">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-navy-blue focus:border-transparent transition-colors duration-300"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-white focus:outline-none"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}