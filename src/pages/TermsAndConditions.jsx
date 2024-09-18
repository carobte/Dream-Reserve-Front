import NavbarSelect from '../layout/NavbarSelect';
import Footer from '../layout/Footer';
import { useState } from 'react';
import { ChevronDown, Book, Briefcase, Scale, Calendar, AlertTriangle } from 'lucide-react';

export default function TermsAndConditions() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    const termsItems = [
        {
            title: "Aceptación de los Términos",
            content: "Al utilizar los servicios de Dream Reserve, usted acepta cumplir y estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá utilizar nuestros servicios.",
            icon: <Book className="w-6 h-6" />
        },
        {
            title: "Reservas y Pagos",
            content: "Las reservas están sujetas a disponibilidad y confirmación. Los precios pueden variar y no se garantizan hasta la confirmación. Se requiere un pago inicial para asegurar la reserva, y el pago completo debe realizarse antes de la fecha especificada en la confirmación de la reserva.",
            icon: <Briefcase className="w-6 h-6" />
        },
        {
            title: "Cancelaciones y Reembolsos",
            content: "Las políticas de cancelación varían según el proveedor de servicios. Los reembolsos, si son aplicables, se procesarán de acuerdo con la política de cancelación específica de cada reserva. Se recomienda adquirir un seguro de viaje para protegerse contra cancelaciones imprevistas.",
            icon: <Scale className="w-6 h-6" />
        },
        {
            title: "Modificaciones de Reserva",
            content: "Las solicitudes de modificación de reserva están sujetas a disponibilidad y pueden incurrir en cargos adicionales. Dream Reserve no garantiza que las modificaciones sean posibles y no es responsable de los costos adicionales asociados con los cambios de reserva.",
            icon: <Calendar className="w-6 h-6" />
        },
        {
            title: "Limitación de Responsabilidad",
            content: "Dream Reserve actúa como intermediario entre usted y los proveedores de servicios de viaje. No somos responsables de las acciones, omisiones, errores o fallas de estos proveedores. Nuestra responsabilidad se limita al costo de los servicios reservados a través de nuestra plataforma.",
            icon: <AlertTriangle className="w-6 h-6" />
        }
    ];

    return (
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen ">
            <NavbarSelect />
            <div className="max-w-4xl mx-auto pt-16 py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center text-teal-700 mb-8">Términos y Condiciones</h1>
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="p-6 sm:p-10">
                        <p className="text-gray-700 mb-8 text-center">
                            Bienvenido a Dream Reserve. Al utilizar nuestros servicios, usted acepta los siguientes términos y condiciones. Por favor, léalos cuidadosamente.
                        </p>

                        {termsItems.map((item, index) => (
                            <div key={index} className="mb-4">
                                <button
                                    onClick={() => toggleSection(index)}
                                    className="flex items-center justify-between w-full p-4 bg-teal-50 hover:bg-teal-100 transition-colors duration-200 rounded-lg"
                                >
                                    <div className="flex items-center">
                                        <div className="mr-4 text-teal-600">
                                            {item.icon}
                                        </div>
                                        <span className="text-lg font-semibold text-teal-700">{item.title}</span>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 text-teal-600 transform transition-transform duration-200 ${openSection === index ? 'rotate-180' : ''}`} />
                                </button>
                                {openSection === index && (
                                    <div className="mt-2 p-4 bg-white rounded-lg shadow-inner">
                                        <p className="text-gray-700">{item.content}</p>
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="mt-8 p-6 bg-teal-50 rounded-lg shadow-inner">
                            <h3 className="text-xl font-semibold text-teal-700 mb-4">Contacto y Disputas</h3>
                            <p className="text-gray-700 mb-4">
                                Si tiene alguna pregunta sobre estos términos y condiciones o si surge alguna disputa, por favor contáctenos:
                            </p>
                            <ul className="list-disc list-inside text-teal-600">
                                <li>Email: legal@dreamreserve.com</li>
                                <li>Teléfono: +57 123 456 789</li>
                                <li>Dirección: Cl. 16 #55-129, Piso 3,  Medellín, Colombia.</li>
                            </ul>
                        </div>

                        <p className="mt-8 text-sm text-gray-600 text-center">
                            Estos términos y condiciones fueron actualizados por última vez el 17 de septiembre de 2024.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}