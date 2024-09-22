import { useState } from "react"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    numeroDocumento: "",
    tipoDocumento: "cedula",
    correo: "",
    password: "",
    confirmPassword: ""
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const validateForm = () => {
    let newErrors = {}
    if (!formData.nombre) newErrors.nombre = "El nombre es requerido"
    if (!formData.apellido) newErrors.apellido = "El apellido es requerido"
    if (!formData.numeroDocumento) newErrors.numeroDocumento = "El número de documento es requerido"
    if (!formData.correo) newErrors.correo = "El correo es requerido"
    else if (!/\S+@\S+\.\S+/.test(formData.correo)) newErrors.correo = "El correo no es válido"
    if (!formData.password) newErrors.password = "La contraseña es requerida"
    else if (formData.password.length < 8) newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Formulario enviado", formData)
      // Aquí iría la lógica para enviar los datos al servidor
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-8" style={{backgroundImage: "url('https://images.unsplash.com/photo-1578115172582-b27c8cd114bb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between">
        <div className="text-white mb-8 lg:mb-0 lg:mr-8 text-center lg:text-left">
          <h2 className="text-xl sm:text-2xl mb-2 text-white font-bold"> <span className="text-teal-300">D</span>ream <span className="text-teal-300">R</span>eserve</h2>
          <p className="text-4xl sm:text-6xl font-bold mb-4"> ¿Listo para comenzar <br/> tu próxima <span className=" text-teal-300">aventura</span>?</p>
        </div>

        <div className="w-full max-w-md">
          <button
            onClick={() => navigate("/")}
            className="text-white hover:text-teal-300 flex items-center mb-8"
          >
            <ArrowLeft className="mr-2" />
            Volver a la página principal
          </button>
          
          <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 sm:p-8 shadow-xl overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">Registro</h2>
            
            <div className="space-y-4">
              {/* Campos del formulario */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-teal-300 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 border border-teal-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Tu nombre"
                />
                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
              </div>

              <div>
                <label htmlFor="apellido" className="block text-sm font-medium text-teal-300 mb-1">
                  Apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 border border-teal-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Tu apellido"
                />
                {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>}
              </div>

              <div>
                <label htmlFor="tipoDocumento" className="block text-sm font-medium text-teal-300 mb-1">
                  Tipo de Documento
                </label>
                <select
                  id="tipoDocumento"
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 border border-teal-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="cedula">Cédula</option>
                  <option value="pasaporte">Pasaporte</option>
                </select>
              </div>

              <div>
                <label htmlFor="numeroDocumento" className="block text-sm font-medium text-teal-300 mb-1">
                  Número de Documento
                </label>
                <input
                  type="text"
                  id="numeroDocumento"
                  name="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 border border-teal-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Tu número de documento"
                />
                {errors.numeroDocumento && <p className="text-red-500 text-xs mt-1">{errors.numeroDocumento}</p>}
              </div>

              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-teal-300 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 border border-teal-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="tu@email.com"
                />
                {errors.correo && <p className="text-red-500 text-xs mt-1">{errors.correo}</p>}
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
                    value={formData.password}
                    onChange={handleChange}
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
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-teal-300 mb-1">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white bg-opacity-20 border border-teal-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-teal-300 hover:text-teal-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition-colors"
              >
                Registrarse
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-white">
                ¿Ya tienes una cuenta?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-teal-300 hover:text-teal-500"
                >
                  Inicia sesión
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
