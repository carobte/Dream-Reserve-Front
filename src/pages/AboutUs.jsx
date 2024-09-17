import { Plane, Users, Globe, Star, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import NavbarSelect from '../layout/NavbarSelect';
import Footer from '../layout/Footer';

export default function AboutUs() {
  const navigate = useNavigate();

  const handleClickStart = function (){
    navigate('/');
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <NavbarSelect/>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-extrabold text-center text-custom-green mb-8"> Dream Reserve</h1>
        <p className="text-xl text-center text-gray-700 mb-16 max-w-2xl mx-auto">
          Transformando sueños de viaje en realidades inolvidables
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-custom-green-opacity mb-6">Nuestra Misión</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              En Dream Reserve, nos dedicamos a hacer realidad los sueños de viaje de nuestros clientes. 
              Creemos que cada viaje es una oportunidad para crear recuerdos inolvidables y expandir horizontes. 
              Nuestro compromiso es proporcionar experiencias de viaje excepcionales, combinando tecnología 
              innovadora con un servicio personalizado de primera clase.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: Plane, title: 'Destinos Globales', description: 'Acceso a una amplia gama de destinos en todo el mundo.' },
              { icon: Users, title: 'Servicio Personalizado', description: 'Itinerarios a medida que se adaptan a tus preferencias únicas.' },
              { icon: Globe, title: 'Tecnología Innovadora', description: 'Simplificamos la reserva y mejoramos tu experiencia de viaje.' },
              { icon: Star, title: 'Experiencias Únicas', description: 'Creamos momentos mágicos y experiencias exclusivas.' },
            ].map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300 border rounded-lg">
                <div className="p-6">
                  <feature.icon className="w-10 h-10 text-custom-green-opacity mb-4" />
                  <h3 className="text-lg font-semibold text-custom-green-opacity mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-custom-green mb-8 text-center">Nuestros Fundadores</h2>
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="/public/Foto Coder 1.png" 
              alt="Fundadores de Dream Reserve" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-8 text-white">
                <p className="text-lg mb-4 leading-relaxed">
                  Dream Reserve fue fundada por un grupo de apasionados viajeros y expertos en tecnología 
                  que compartían un sueño común: revolucionar la industria de los viajes. Nuestros fundadores 
                  combinan años de experiencia en el sector turístico con un profundo conocimiento de las 
                  últimas innovaciones tecnológicas.
                </p>
                <p className="text-lg leading-relaxed">
                  Juntos, han creado una plataforma que no solo simplifica la planificación y reserva de 
                  viajes, sino que también añade un toque personal y mágico a cada experiencia. Su visión 
                  es hacer que cada viaje sea una aventura inolvidable, accesible y perfectamente adaptada 
                  a los deseos de cada viajero.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleClickStart} 
            className="bg-custom-green-opacity hover:bg-custom-green text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            Comienza Tu Aventura
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
