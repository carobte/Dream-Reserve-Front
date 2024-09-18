import { useState } from 'react'
import { Search, Mail, ChevronDown, ChevronUp } from 'lucide-react'
import NavbarSelect from '../layout/NavbarSelect';
import Footer from '../layout/Footer';

const faqs = [ 
  {
    question: "¿Cómo puedo reservar un paquete de viaje con Dream Reserve?",
    answer: "Reservar un paqute de viaje con Dream Reserve es súper fácil. Simplemente visita nuestra página principal, introduce los detalles del plan que quieras realizar dentro de la barra del buscador, selecciona el lugar donde te encuentras, al igual que la fecha en la que quieres viajar y hasta cuando vas a viajar y por último, la cantidad de personas con las que realizaras el viaje. Le das clic en la lupa y seleccionas tu hotel, habitación y alimentación de preferencia, luego le das clic en reservas y la página te mostrará los tipos de vuelvos que ofrecemos en Dream Reserve, escoge con el que más te acomodes. Por ultimo, reserva "
  },
  {
    question: "¿Qué pasa si necesito cambiar o cancelar mi reserva?",
    answer: "Entendemos que los planes pueden cambiar. Puedes modificar o cancelar tu reserva a través de tu cuenta en nuestro sitio web. Ten en cuenta que pueden aplicarse cargos dependiendo de la política de la aerolínea y el tipo de tarifa que hayas seleccionado. Te recomendamos revisar los términos y condiciones de tu reserva."
  },
  {
    question: "¿Ofrecen paquetes de vuelo + hotel?",
    answer: "Sí, ofrecemos paquetes de vuelo + hotel que pueden ahorrarte dinero en tu viaje. Puedes buscar estas ofertas en nuestra sección de 'Paquetes' o contactar con nuestro equipo para opciones personalizadas que se ajusten a tus necesidades y presupuesto."
  },
  {
    question: "¿Cómo puedo obtener el mejor precio para mi vuelo?",
    answer: "Para obtener los mejores precios, te recomendamos reservar con anticipación, ser flexible con tus fechas de viaje y suscribirte a nuestras alertas de ofertas. También ofrecemos una garantía de mejor precio: si encuentras un precio más bajo para el mismo vuelo dentro de las 24 horas posteriores a tu reserva, igualaremos ese precio."
  },
  {
    question: "¿Qué servicios adicionales ofrece Dream Reserve?",
    answer: "Además de la reserva de vuelos, ofrecemos servicios de alquiler de coches, reservas de hotel, seguros de viaje y asistencia para la planificación de itinerarios personalizados. Nuestro objetivo es ser tu socio de viaje completo, cubriendo todas tus necesidades desde el momento en que planificas tu viaje hasta que regresas a casa."
  },
  {
    question: "¿Cómo puedo contactar con el servicio de atención al cliente?",
    answer: "Nuestro equipo de atención al cliente está disponible 24/7. Puedes contactarnos por teléfono, email o chat en vivo a través de nuestro sitio web. También ofrecemos asistencia de emergencia para viajeros que ya están en ruta. Tu satisfacción y seguridad son nuestra prioridad."
  },
  {
    question: "¿Puedo reservar solo el vuelo sin alojamiento?",
    answer: "Sí, puedes reservar únicamente tu vuelo sin necesidad de reservar alojamiento. Ofrecemos flexibilidad para que puedas personalizar tu viaje según tus necesidades."
  },
  {
    question: "¿Cómo recibo la confirmación de mi reserva?",
    answer: "Una vez que completes tu reserva, recibirás un correo electrónico de confirmación con todos los detalles de tu vuelo o paquete. También puedes acceder a tu reserva desde tu cuenta en nuestro sitio web."
  },
  {
    question: "¿Cuáles son las formas de pago disponibles?",
    answer: "Aceptamos tarjetas de crédito, débito, transferencias bancarias y pagos a través de plataformas seguras como PayPal. También puedes optar por pagar en cuotas dependiendo de tu ubicación."
  },
  {
    question: "¿Es seguro reservar a través de Dream Reserve?",
    answer: "Sí, garantizamos que todas tus transacciones están protegidas con los más altos estándares de seguridad. Utilizamos tecnología de cifrado SSL para proteger tu información personal y financiera."
  },
  {
    question: "¿Cómo puedo hacer el check-in para mi vuelo?",
    answer: "El check-in se puede hacer directamente desde la página web de la aerolínea o, en algunos casos, te proporcionaremos un enlace para que puedas hacerlo fácilmente. El check-in online suele estar disponible entre 24 y 48 horas antes del vuelo."
  },
  {
    question: "¿Puedo reservar un viaje para un grupo grande?",
    answer: "¡Por supuesto! Ofrecemos tarifas especiales y paquetes personalizados para grupos grandes. Te recomendamos contactarnos directamente para poder ofrecerte las mejores opciones."
  }
]

export default function FrequentQuestion() {
  const [openIndex, setOpenIndex] = useState(null);  

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);  
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <NavbarSelect/>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-[#276F62] mb-8">Preguntas Frecuentes</h1>

        {/* <div className="mb-12 bg-white/30 backdrop-blur-sm shadow-lg p-6">
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              placeholder="Buscar preguntas frecuentes..." 
              className="flex-grow border-[#276F62] focus:ring-[#276F62] focus:border-[#276F62] px-4 py-2 rounded-md border"
            />
            <button type="submit" className="bg-[#276F62] hover:bg-[#1e5b50] text-white p-2 rounded-md">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div> */}

        {/* carts question */}
        <div className="mb-12 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/30 backdrop-blur-sm rounded-lg shadow-md">
              <button 
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-[#276F62] hover:text-[#1e5b50] px-6 py-4 focus:outline-none"
                onClick={() => toggleAnswer(index)}  
              >
                {faq.question}
                
                {openIndex === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              {openIndex === index && (
                <div className="text-gray-700 leading-relaxed px-6 pb-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Card de contacto */}
        <div className="bg-white/10 backdrop-blur-sm shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-[#276F62] mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-gray-700 mb-6">
            Si no has encontrado la respuesta que buscabas, no dudes en contactarnos. 
            Nuestro equipo de atención al cliente estará encantado de ayudarte.
          </p>
          <button className="bg-[#276F62] hover:bg-[#1e5b50] text-white transition duration-300 ease-in-out transform hover:scale-105 flex items-center px-4 py-2 rounded-md">
            <Mail className="mr-2 h-4 w-4" /> Contáctanos
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
