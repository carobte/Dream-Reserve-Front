import { useState, useContext, useCallback } from 'react';
import { PhoneCall, Calendar, Users, MapPin, Settings, LogOut, X, Building, User, Plane, Check, Menu, Info, Home } from 'lucide-react';
import { SearchContext } from '../context/SearchContext';
import { usePrice } from '../context/PriceContext';
import { useReserva } from '../context/ReserveContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

export default function NavbarSelect() {
    const { selectedHotel, totalPrice } = usePrice();
    const { origin, destination, startDate, endDate, totalPeople, planType } = useContext(SearchContext);
    const { reserva } = useReserva();
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [itineraryOpen, setItineraryOpen] = useState(false);
    const [copyFeedback, setCopyFeedback] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const formattedStartDate = startDate ? startDate.toLocaleDateString() : 'Fecha de inicio';
    const formattedEndDate = endDate ? endDate.toLocaleDateString() : 'Fecha de fin';
    const peopleText = totalPeople ? `${totalPeople} adultos` : 'Número de personas';

    const copyToClipboard = useCallback(async () => {
        const phoneNumber = '+57 123 456 789';
        try {
            await navigator.clipboard.writeText(phoneNumber);
            setCopyFeedback(true);
            setTimeout(() => setCopyFeedback(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }, []);

    /* Handlers for navigation */
    const handleHome = () => {
        navigate("/");
        setMobileMenuOpen(false);
    };
    const handleMyReservations = () => {
        navigate("/my-reservations");
        setMobileMenuOpen(false);
    }
    const handleAboutUs = () => {
        navigate("/about-us");
        setMobileMenuOpen(false);
    }

    const toggleMenu = () => setMenuOpen(prev => !prev);
    const toggleItinerary = () => setItineraryOpen(prev => !prev);
    const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

    return (
        <>
            {/* Navbar */}
            <section className="text-white py-4 px-6 w-full fixed top-0 left-0 z-50 bg-custom-green shadow-lg">
                <nav className="flex justify-between items-center">
                    {/* Logo and Brand Name */}
                    <div className="flex items-center space-x-4 hover:text-gray-300 transition duration-300">
                        <button
                            onClick={handleHome}
                            className="flex items-center text-white hover:text-gray-300 transition duration-300 space-x-2">
                            <img src="/DRLogo.png" alt="Logo" className="h-8 w-8 " />
                            <div className="text-white font-bold text-2xl hover:text-gray-300 transition duration-300">
                                <span className="text-custom-navy-blue">D</span>ream <span className="text-custom-navy-blue">R</span>eserve
                            </div>
                        </button>
                    </div>

                    {/* Desktop menu */}
                    <ul className="hidden lg:flex justify-center space-x-6 text-sm text-custom-navy-blue">
                        <li>
                            <button onClick={handleHome} className="hover:text-gray-300 transition duration-300">
                                Inicio
                            </button>
                        </li>
                        <li>|</li>
                        <li>
                            <button onClick={handleMyReservations} className="hover:text-gray-300 transition duration-300">
                                Mis Reservas
                            </button>
                        </li>
                        <li>|</li>
                        <li>
                            <button onClick={handleAboutUs} className="hover:text-gray-300 transition duration-300">
                                Sobre Nosotros
                            </button>
                        </li>
                        <li>|</li>
                        <li>
                            <button
                                onClick={copyToClipboard}
                                className="hover:text-gray-300 transition duration-300 flex items-center relative"
                            >
                                <PhoneCall className="inline mr-2 h-4 w-4" />
                                +57 123 456 789
                                {copyFeedback && (
                                    <span className="absolute top-full left-0 mt-1 px-2 py-1 bg-white text-green-600 text-xs rounded shadow">
                                        <Check className="inline h-3 w-3 mr-1" />
                                        Copiado
                                    </span>
                                )}
                            </button>
                        </li>
                    </ul>

                    {/* User info and buttons */}
                    <div className="flex items-center space-x-4">
                        <button onClick={toggleItinerary} className="text-custom-navy-blue text-sm hover:text-gray-300 transition duration-300">
                            Mi Itinerario
                        </button>

                        {/* User info - visible on all screen sizes */}
                        <div className="relative group">
                            <button onClick={toggleMenu} className="flex items-center space-x-2 focus:outline-none">
                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    {user ? (
                                        <img
                                            src={user.urlAvatar || "https://img.freepik.com/foto-gratis/leon-gafas-estudio_23-2150813334.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723248000&semt=ais_hybrid"}
                                            alt="Foto de perfil"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <User className="h-6 w-6 text-gray-500" />
                                    )}
                                </div>
                            </button>

                            {/* Dropdown menu */}
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                    {user ? (
                                        <>
                                            <div className="px-4 py-2 text-sm text-gray-700">
                                                <p className="font-medium">{user.name} {user.lastName}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                            <hr className="border-gray-200" />
                                            <button
                                                onClick={logout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <LogOut className="inline mr-2 h-4 w-4" />
                                                Cerrar sesión
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <a href="../Login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <LogOut className="inline mr-2 h-4 w-4" />
                                                Iniciar sesión
                                            </a>
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <Settings className="inline mr-2 h-4 w-4" />
                                                Configuración
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Hamburger menu for mobile and tablet */}
                        <button
                            onClick={toggleMobileMenu}
                            className={`lg:hidden text-white focus:outline-none transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </nav>

                {/* Mobile and tablet menu */}
                <div 
                    className={`lg:hidden mt-4 bg-gradient-to-r from-teal-600 to-teal-400 rounded-xl shadow-xl overflow-hidden transition-all transform ease-in-out duration-500 ${
                        mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <ul className="divide-y divide-teal-300">
                        <li>
                            <button
                                onClick={handleHome}
                                className="block w-full text-left px-4 py-2 text-sm font-medium text-white hover:bg-teal-500 hover:scale-105 transform transition-all duration-300 ease-in-out rounded-t-xl"
                            >
                                <Home className="inline-block w-4 h-4 mr-2 text-white" />
                                Inicio
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleMyReservations}
                                className="block w-full text-left px-4 py-2 text-sm font-medium text-white hover:bg-teal-500 hover:scale-105 transform transition-all duration-300 ease-in-out"
                            >
                                <Calendar className="inline-block w-4 h-4 mr-2 text-white" />
                                Mis Reservas
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleAboutUs}
                                className="block w-full text-left px-4 py-2 text-sm font-medium text-white hover:bg-teal-500 hover:scale-105 transform transition-all duration-300 ease-in-out"
                            >
                                <Info className="inline-block w-4 h-4 mr-2 text-white" />
                                Sobre Nosotros
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={copyToClipboard}
                                className="block w-full text-left px-4 py-2 text-sm font-medium text-white hover:bg-teal-500 hover:scale-105 transform transition-all duration-300 ease-in-out rounded-b-xl"
                            >
                                <PhoneCall className="inline-block w-4 h-4 mr-2 text-white" />
                                +57 123 456 789
                            </button>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Panel de itinerario */}
            {itineraryOpen && (
                <>
                    {/* Fondo oscuro */}
                    <div onClick={toggleItinerary} className="fixed inset-0 bg-black opacity-50 z-40 w-full"></div>

                    {/* Panel deslizante con animación */}
                    <div className={`bg-gradient-to-r from-custom-green to-teal-600 fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 transform ${itineraryOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out overflow-y-auto`}>
                        <div className="p-6 text-black"> 
                            {/* Contenido del panel deslizante */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-custom-navy-blue">Mi Itinerario</h2>
                                <button onClick={toggleItinerary} className="text-gray-500 hover:text-gray-700 transition duration-300">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Información del itinerario */}
                            <div className=" space-y-4 mb-6">
                                <ItineraryItem icon={<MapPin className="text-custom-navy-blue h-5 w-5" />} text={origin || 'Desde'} />
                                <ItineraryItem icon={<Building className="text-custom-navy-blue h-5 w-5" />} text={destination || 'Medellín'} />
                                <ItineraryItem icon={<Calendar className="text-custom-navy-blue h-5 w-5" />} text={formattedStartDate} />
                                <ItineraryItem icon={<Calendar className="text-custom-navy-blue h-5 w-5" />} text={formattedEndDate} />
                                <ItineraryItem icon={<Users className="text-custom-navy-blue h-5 w-5" />} text={peopleText} />
                            </div>

                            {/* Detalles del hotel */}
                            {selectedHotel && (
                                <ItinerarySection title="Hotel Seleccionado">
                                    <p className="text-gray-600">{selectedHotel.name || 'No seleccionado'}</p>
                                    <p className="text-gray-600">Dirección: {selectedHotel.address || 'No especificada'}</p>
                                    <p className="text-gray-600">Alimentación: {selectedHotel.foodOptions || 'No especificado'}</p>
                                    <p className="text-gray-600">Habitación: {selectedHotel.room?.type || 'No especificada'}</p>
                                    <p className="text-gray-600">Precio: COP {selectedHotel.room?.price ? selectedHotel.room.price.toLocaleString() : 'No disponible'}</p>
                                </ItinerarySection>
                            )}

                            {/* Detalles del vuelo */}
                            {reserva.vueloIda && (
                                <ItinerarySection title="Vuelo de Ida">
                                    <p className="text-gray-600">Aerolínea: {reserva.vueloIda.airline}</p>
                                    <p className="text-gray-600">Precio: COP {reserva.vueloIda.price ? reserva.vueloIda.price.toLocaleString() : 'No disponible'}</p>
                                </ItinerarySection>
                            )}
                            {reserva.vueloVuelta && (
                                <ItinerarySection title="Vuelo de Regreso">
                                    <p className="text-gray-600">Aerolínea: {reserva.vueloVuelta.airline}</p>
                                    <p className="text-gray-600">Precio: COP {reserva.vueloVuelta.price ? reserva.vueloVuelta.price.toLocaleString() : 'No disponible'}</p>
                                </ItinerarySection>
                            )}
                            {reserva.tours && reserva.tours.length > 0 && (
                                <ItinerarySection title="Tours">
                                    {reserva.tours.map((tour, index) => (
                                        <div key={index} className="mb-2">
                                            <p className="text-gray-600">Tour: {tour.name}</p>
                                            <p className="text-gray-600">Precio: COP {tour.price ? tour.price.toLocaleString() : 'No disponible'}</p>
                                        </div>
                                    ))}
                                </ItinerarySection>
                            )}

                            {/* Valor Total */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <h3 className="text-xl font-semibold text-custom-navy-blue">Valor Total</h3>
                                <p className="text-2xl font-bold text-white">
                                    COP {reserva.valorTotal ? reserva.valorTotal.toLocaleString() : 'No disponible'}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

function ItineraryItem({ icon, text }) {
    return (
        <div className="flex items-center space-x-3 text-white">
            <div className="text-custom-green">{icon}</div>
            <span>{text}</span>
        </div>
    );
}

function ItinerarySection({ title, children }) {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-custom-green mb-2">{title}</h3>
            <div className="space-y-1">{children}</div>
        </div>
    );
}