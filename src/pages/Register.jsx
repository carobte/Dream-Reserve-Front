import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    numeroDocumento: "",
    tipoDocumento: "cedula",
    correo: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarSelect = (avatar) => {
    setFormData((prevData) => ({
      ...prevData,
      avatar,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.nombre) newErrors.nombre = "El nombre es requerido";
    if (!formData.apellido) newErrors.apellido = "El apellido es requerido";
    if (!formData.numeroDocumento) newErrors.numeroDocumento = "El número de documento es requerido";
    if (!formData.correo) newErrors.correo = "El correo es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.correo)) newErrors.correo = "El correo no es válido";
    if (!formData.password) newErrors.password = "La contraseña es requerida";
    else if (formData.password.length < 8) newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const tipoDocumentoId = formData.tipoDocumento === "cedula" ? 1 : 2; // 1 para cédula, 2 para pasaporte

        const response = await axios.post("https://dream-reserve.azurewebsites.net/api/V1/People", {
          name: formData.nombre,
          lastName: formData.apellido,
          documentNumber: formData.numeroDocumento,
          email: formData.correo,
          password: formData.password,
          urlAvatar: formData.avatar,
          documentTypeId: tipoDocumentoId,
          documentTypeName: formData.tipoDocumento === "cedula" ? "Cédula" : "Pasaporte", // Ajustar según sea necesario
        });

        if (response.status === 200) {
          alert("Registro exitoso");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error en el registro:", error);
        setErrors({ api: "Error en el registro. Por favor, verifica tus datos." });
      }
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const avatarOptions = [
    "https://img.freepik.com/premium-vector/adorable-panda-avatar-logo-playful-branding_1219282-43647.jpg",
    "https://i.pinimg.com/564x/2b/ed/95/2bed95b5d11eb748fdb1c9e1f007378f.jpg",
    // Agrega más avatares según sea necesario
  ];

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4" style={{ backgroundImage: "url('../../public/ImagenFondo.webp')" }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between">
        <div className="text-white mb-8 lg:mb-0 lg:mr-8 text-center lg:text-left">
          <h2 className="text-xl sm:text-2xl mb-2 text-white font-bold"> <span className="text-teal-300">D</span>ream <span className="text-teal-300">R</span>eserve</h2>
          <p className="text-4xl sm:text-6xl font-bold mb-4">¿Listo para comenzar <br/>tu próxima <span className=" text-teal-300">aventura</span>?</p>
        </div>

        <div className="w-full max-w-md">
          <button onClick={handleGoBack} className="text-white hover:text-teal-300 flex items-center mb-8">
            <ArrowLeft className="mr-2" />
            Volver a la página principal
          </button>
          
          <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 sm:p-8 shadow-xl overflow-y-auto max-h-[75vh]">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">Registro</h2>

            <div className="space-y-4">
              {/* Campos del formulario */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-teal-300 mb-1">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 border border-teal-500 rounded-md text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Tu nombre"
                />
                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
              </div>

              <div>
                <label htmlFor="apellido" className="block text-sm font-medium text-teal-300 mb-1">Apellido</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 border border-teal-500 rounded-md text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Tu apellido"
                />
                {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>}
              </div>

              <div>
                <label htmlFor="tipoDocumento" className="block text-sm font-medium text-teal-300 mb-1">Tipo de Documento</label>
                <select
                  id="tipoDocumento"
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 border border-teal-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="" disabled selected hidden>Selecciona un documento</option>
                  <option className="text-gray-700" value="cedula">Cédula</option>
                  <option className="text-gray-700" value="pasaporte">Pasaporte</option>
                </select>
              </div>

              <div>
                <label htmlFor="numeroDocumento" className="block text-sm font-medium text-teal-300 mb-1">Número de Documento</label>
                <input
                  type="text"
                  id="numeroDocumento"
                  name="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 border border-teal-500 rounded-md text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Tu número de documento"
                />
                {errors.numeroDocumento && <p className="text-red-500 text-xs mt-1">{errors.numeroDocumento}</p>}
              </div>

              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-teal-300 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 border border-teal-500 rounded-md text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Tu correo"
                />
                {errors.correo && <p className="text-red-500 text-xs mt-1">{errors.correo}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-teal-300 mb-1">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white bg-opacity-20 border border-teal-500 rounded-md text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Tu contraseña"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {showPassword ? <EyeOff className="text-teal-300" /> : <Eye className="text-teal-300" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-teal-300 mb-1">Confirmar Contraseña</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white bg-opacity-20 border border-teal-500 rounded-md text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Confirma tu contraseña"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {showConfirmPassword ? <EyeOff className="text-teal-300" /> : <Eye className="text-teal-300" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-teal-300 mb-1">Selecciona tu avatar</label>
                <div className="flex space-x-4">
                  {avatarOptions.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      onClick={() => handleAvatarSelect(avatar)}
                      className={`cursor-pointer rounded-full w-16 h-16 ${formData.avatar === avatar ? "border-2 border-teal-500" : ""}`}
                    />
                  ))}
                </div>
              </div>
              {errors.api && <p className="text-red-500 text-xs mt-1">{errors.api}</p>}
            </div>

            <button type="submit" className="w-full mt-6 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-md transition duration-300">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
