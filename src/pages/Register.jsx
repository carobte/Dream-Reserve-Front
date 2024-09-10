import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

export default function Register() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [documentTypeId, setDocumentTypeId] = useState(1); // Voy asumir el valor del TypeDocument porque no se aun como se manejara 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate(); 

  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`http://localhost:3000/person?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      
      if (response.ok && data.length > 0) {
        return true; 
      } else {
        return false; 
      }
    } catch (error) {
      console.error('Error al verificar el correo:', error);
      return false; 
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    // Validación básica de campos
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    // Verificar si el correo electrónico ya existe
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      setError('El correo electrónico ya está registrado');
      alert('El correo electrónico ya está registrado');
      setLoading(false);
      return;
    }

    try {
      // Solicitud al endpoint de registro
      const response = await fetch('http://localhost:3000/person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          last_name: lastName,
          document_number: documentNumber,
          email,
          password,
          document_type_id: documentTypeId
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registro exitoso');
        // Redirige a la página de inicio de sesión para que cuando registre pueda ir a login y probar a iniciar sesión
        navigate('/login');
      } else {
        setError(data.message || 'Error al registrar');
        alert(data.message || 'Error al registrar');
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
        className="relative w-full lg:w-1/2 flex items-center justify-center bg-transparent text-black px-4"
      >
        <div className="max-w-md text-center">
          <div className="flex-1 flex items-center justify-center max-w-screen-lg px-4">
            <div className="text-white text-center lg:text-left max-w-full lg:max-w-screen-lg">
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
              <h2 className="max-w-md text-4xl font-bold md:text-4xl lg:text-7xl mt-4 break-words">
                ¿Listo para <span className="text-custom-navy-blue">comenzar</span> tu
                <span className="text-custom-navy-blue"> aventura</span> ?
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
          <h1 className="text-3xl font-semibold mb-6 text-white text-center">Registrarse</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-white">Apellido</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="documentNumber" className="block text-sm font-medium text-white">Número de Documento</label>
              <input
                type="text"
                id="documentNumber"
                name="documentNumber"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                required
              />
            </div>
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
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirmar Contraseña</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                required
              />
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id="showConfirmPassword"
                  checked={showConfirmPassword}
                  onChange={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="mr-2"
                />
                <label htmlFor="showConfirmPassword" className="text-sm text-white">Mostrar contraseña</label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Registrarse'}
              </button>
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
          </form>
          <div className="mt-4 text-sm text-white text-center">
            <p>¿Ya tienes una cuenta? <a href="/login" className="text-custom-navy-blue hover:underline">Inicia sesión aquí</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
