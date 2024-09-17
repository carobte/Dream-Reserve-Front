import { useState } from 'react';
import { ChevronDown, Lock, Shield, Eye, UserCheck, RefreshCw } from 'lucide-react';
import NavbarSelect from '../layout/NavbarSelect';
import Footer from '../layout/Footer';

export default function PrivacyPolicy() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    const policyItems = [
        {
            title: "Información que Recopilamos",
            content: "Recopilamos información que usted nos proporciona directamente, como su nombre, dirección de correo electrónico, número de teléfono y detalles de pago cuando realiza una reserva. También podemos recopilar información sobre sus preferencias de viaje y hábitos de navegación en nuestro sitio.",
            icon: <Eye className="w-6 h-6" />
        },
        {
            title: "Uso de la Información",
            content: "Utilizamos su información para procesar reservas, proporcionar servicios de atención al cliente, personalizar su experiencia y mejorar nuestros servicios. No compartimos su información con terceros sin su consentimiento, excepto cuando sea necesario para completar su reserva o cumplir con requisitos legales.",
            icon: <UserCheck className="w-6 h-6" />
        },
        {
            title: "Protección de Datos",
            content: "Implementamos medidas de seguridad técnicas y organizativas para proteger su información contra acceso no autorizado, alteración, divulgación o destrucción. Esto incluye el uso de encriptación, firewalls y protocolos de seguridad actualizados regularmente.",
            icon: <Shield className="w-6 h-6" />
        },
        {
            title: "Sus Derechos",
            content: "Usted tiene derecho a acceder, corregir o eliminar su información personal. También puede solicitar la portabilidad de sus datos o restringir ciertos usos. Para ejercer estos derechos, contáctenos a través de nuestro correo electrónico de soporte privacy@dreamreserve.com.",
            icon: <Lock className="w-6 h-6" />
        },
        {
            title: "Cambios en la Política",
            content: "Nos reservamos el derecho de modificar esta política en cualquier momento para reflejar cambios en nuestras prácticas o en la legislación aplicable. Los cambios entrarán en vigor inmediatamente después de su publicación en nuestro sitio web. Le recomendamos revisar esta política periódicamente.",
            icon: <RefreshCw className="w-6 h-6" />
        }
    ];
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <NavbarSelect />
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen pt-24 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-teal-700 mb-8">Política de Privacidad</h1>
                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="p-6 sm:p-10">
                            <p className="text-gray-700 mb-8 text-center">
                                En Dream Reserve, su privacidad es nuestra prioridad. Nos comprometemos a proteger su información personal y a ser transparentes sobre cómo la utilizamos.
                            </p>
                            {policyItems.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <button
                                        onClick={() => toggleSection(index)}
                                        className="flex items-center justify-between w-full p-4 bg-teal-50 hover:bg-teal-100 transition-colors duration-200 rounded-lg">
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
                                <h3 className="text-xl font-semibold text-teal-700 mb-4">Contáctenos</h3>
                                <p className="text-gray-700 mb-4">
                                    Si tiene alguna pregunta sobre nuestra política de privacidad o cómo manejamos sus datos, no dude en contactarnos:
                                </p>
                                <ul className="list-disc list-inside text-teal-600">
                                    <li>Email: privacy@dreamreserve.com</li>
                                    <li>Teléfono: +57 123 456 789</li>
                                    <li>Dirección: Cl. 16 #55-129, Piso 3,  Medellín, Colombia.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}