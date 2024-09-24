// LoginPage.js
import { useState, useContext } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 
  const { login } = useContext(AuthContext); 

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("Por favor ingresa un correo electrónico válido.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true); 

    try {
      const response = await axios.post("https://dream-reserve.azurewebsites.net/api/V1/Auth/login", {
        email,
        password,
      });

      if (response.data) {
        const userData = {
          name: response.data.userLogged.name,
          lastName: response.data.userLogged.lastName,
          documentNumber: response.data.userLogged.documentNumber,
          documentTypeId: response.data.userLogged.documentTypeId,
          urlAvatar: response.data.userLogged.urlAvatar,
          id: response.data.userLogged.id,
        };

        localStorage.setItem("token", response.data.jwt);
        login(userData); // Envía los datos al contexto
        navigate("/"); 
      }
    } catch (error) {
      setErrorMessage("Error en el inicio de sesión. Por favor, verifica tus credenciales.");
    } finally {
      setLoading(false); 
    }
  };

  const handleRegister = () => {
    navigate("/register"); 
  };

  const handleGoBack = () => {
    navigate("/"); 
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4" style={{ backgroundImage: "url('/ImagenFondo.webp')" }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between">
        <div className="text-white mb-8 md:mb-0 md:mr-8 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl mb-2 text-white font-bold"> <span className="text-teal-300">D</span>ream <span className="text-teal-300">R</span>eserve</h2>
          <p className="text-4xl sm:text-6xl font-bold mb-4">¿A dónde te llevará tu próxima <span className=" text-teal-300">aventura</span>?</p>
        </div>

        <div className="w-full max-w-md">
          <button onClick={handleGoBack} className="text-white hover:text-teal-300 flex items-center mb-8">
            <ArrowLeft className="mr-2" />
            Volver a la página principal
          </button>
          
          <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Iniciar Sesión</h2>
            
            {errorMessage && (
              <div className="text-red-500 text-center mb-4">
                {errorMessage}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-teal-300 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 border border-teal-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-teal-300 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white bg-opacity-20 border border-teal-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-teal-300 hover:text-teal-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                disabled={loading}
              >
                {loading ? "Cargando..." : "Iniciar Sesión"}
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-white">
                ¿No tienes una cuenta?{" "}
                <span onClick={handleRegister} className="text-teal-300 hover:text-teal-500 font-medium cursor-pointer">
                  Regístrate
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
