import { useState } from 'react'
import { Search, Mail, ChevronDown, ChevronUp } from 'lucide-react'
import NavbarSelect from '../layout/NavbarSelect';
import Footer from '../layout/Footer';

const faqs = [
  {
    question: "¿Cómo puedo reservar un paquete de viaje con Dream Reserve?",
    answer: "Reservar un paqute de viaje con Dream Reserve es súper fácil. Simplemente visita nuestra página principal, introduce los detalles del plan que quieras realizar dentro de la barra del buscador, selecciona el lugar donde te encuentras, al igual que la fecha en la que quieres viajar y hasta cuando vas a viajar y por último, la cantidad de personas con las que realizaras el viaje. Le das clic en la lupa y seleccionas tu hotel, habitación y alimentación de preferencia, luego le das clic en reservar este y la página te mostrará los tipos de vuelvos que ofrecemos en Dream Reserve, escoge con el que más te acomodes. Por ultimo, reserva "
  },
  {
    question: "¿Qué pasa si necesito cambiar o cancelar mi reserva?",
    answer: "Entendemos que los planes pueden cambiar.No puedes modificar tu reserva pero la puedes cancelar a través de tu cuenta en nuestro sitio web. Ten en cuenta que pueden aplicarse cargos dependiendo de la política de la aerolínea y el tipo de tarifa que hayas seleccionado. Te recomendamos revisar los términos y condiciones de tu reserva además de ello, recuerda que para cancelar reserva se debe hacer con mínimo 3 días de antelación."
  },
  {
    question: "¿Ofrecen paquetes de vuelo + hotel?",
    answer: "No, ofreceremos paquetes de vuelo + hotel en un próximo alcance de Dream Reserve, para este este primer alcance te podemos ofrecer un paquete completo que pueden ahorrarte dinero en tu viaje la cual contiene(hotel, vuelo, alimentación y toures). Puedes buscar esta oferta en nuestra sección de 'Paquete completo'."
  },
  {
    question: "¿Cómo puedo obtener el mejor precio para mi vuelo?",
    answer: "Para obtener los mejores precios, te recomendamos reservar con anticipación, ser flexible con tus fechas y horarios de viaje. Los precios de vuelos dependen directamented de las aerolíneas, por ende, mantenemos los precios originales, siendo así, en las temporadas más bajas podrás conseguir vuelos con precios más favorables."
  },
  {
    question: "¿Qué servicios adicionales ofrece Dream Reserve?",
    answer: "Además de la reserva de vuelos, ofrecemos servicios de reservas de hotel, con la habitación de tu preferencia, además de que podrás elegir que tipo de alimentación deseas para tu viaje, en Dream Reserve brindamos asistencia para la planificación de itinerarios personalizados. Nuestro objetivo es ser tu socio de viaje completo, cubriendo todas tus necesidades desde el momento en que planificas tu viaje recorriendo hoteles y destinos turísticos hasta que regresas a casa."
  },
  {
    question: "¿Cómo puedo contactar con el servicio de atención al cliente?",
    answer: "Te podemos ofrecer un número de contacto por si tienes alguna duda o inconveniente con las reservas de tu viaje, pero como tal, no te ofrecemos una atención del servicio al cliente por si te general dudas o conflictos con el vuelo u hoteles directamente"
  },
  {
    question: "¿Puedo reservar solo el vuelo sin alojamiento?",
    answer: "Sí, puedes reservar únicamente tu vuelo sin necesidad de reservar alojamiento. Ofrecemos flexibilidad para que puedas personalizar tu viaje según tus necesidades."
  },
  {
    question: "¿Cómo recibo la confirmación de mi reserva?",
    answer: "Una vez que completes los detalles de tu viaje, dentro del sitio web encontrarás un itinerario dónde podrás ver las reservas que tienes pendientes."
  },
  {
    question: "¿Cuáles son las formas de pago disponibles?",
    answer: "No nos encargamos de pagos, simplemente segun las opciones que elegiste para tu reserva, te generamos un valor apróximado de lo que deberías pagar, pero el sitio web no se reciben los pagos"
  },
  {
    question: "¿Es seguro reservar a través de Dream Reserve?",
    answer: "Sí, garantizamos la seguridad de tu viaje, además te ofrecemos sitios con la mejor calidad"
  },
  {
    question: "¿Cómo puedo hacer el check-in para mi vuelo?",
    answer: "El check-in se puede hacer directamente desde el sitio web de la aerolínea o, en algunos casos, te proporcionaremos un enlace para que puedas hacerlo fácilmente. El check-in online suele estar disponible entre 24 y 48 horas antes del vuelo."
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
      <NavbarSelect />
      <div className="container min-h-screen mx-auto px-4 py-12 pt-24 ">
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
        <div className="bg-white/30 backdrop-blur-sm shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-[#276F62] mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-gray-700 mb-6">
            Si no has encontrado la respuesta que buscabas, no dudes en contactarnos.
            Nuestro equipo de atención al cliente estará encantado de ayudarte.
          </p>
          <ul className="list-disc list-inside text-teal-600">
            <li>Email: contacto@dreamreserve.com</li>
            <li>Teléfono: +57 123 456 789</li>
            <li>Dirección: Cl. 16 #55-129, Piso 3,  Medellín, Colombia.</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  )
}
