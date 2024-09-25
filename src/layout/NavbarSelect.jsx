import { useState, useContext, useCallback } from 'react';
import { PhoneCall, Calendar, Users, MapPin, Settings, LogOut, X, Building, User, Plane, Check } from 'lucide-react';
import { SearchContext } from '../context/SearchContext';
import { usePrice } from '../context/PriceContext';
import { useReserva } from '../context/ReserveContext';
import { useAuth } from '../context/AuthContext';

export default function NavbarSelect() {
    const { selectedHotel, totalPrice } = usePrice();
    const { origin, destination, startDate, endDate, totalPeople, planType } = useContext(SearchContext);
    const { reserva } = useReserva(); 
    const { user, logout } = useAuth(); 
    const [menuOpen, setMenuOpen] = useState(false);
    const [itineraryOpen, setItineraryOpen] = useState(false);
    const [copyFeedback, setCopyFeedback] = useState(false);

    const formattedStartDate = startDate ? startDate.toLocaleDateString() : 'Fecha de inicio';
    const formattedEndDate = endDate ? endDate.toLocaleDateString() : 'Fecha de fin';
    const peopleText = totalPeople ? `${totalPeople} adultos` : 'Número de personas';

    const copyToClipboard = useCallback(async () => {
        const phoneNumber = '+57 123 456 789';
        try {
            await navigator.clipboard.writeText(phoneNumber);
            setCopyFeedback(true);
            setTimeout(() => setCopyFeedback(false), 2000); // Hide feedback after 2 seconds
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }, []);

    const toggleMenu = () => setMenuOpen(prev => !prev);
    const toggleItinerary = () => setItineraryOpen(prev => !prev);

    return (
        <>
            {/* Navbar */}
            <section className="text-custom-navy-blue py-2 px-4 w-full fixed top-0 left-0 z-50 bg-custom-green shadow-md">
                <nav className="flex justify-between items-center">
                    {/* Menú de navegación */}
                    <ul className="flex justify-start space-x-4 text-sm">
                        <li><a href="/" className="hover:underline">Inicio</a></li>
                        <li>|</li>
                        <li><a href="../../my-reservations" className="hover:underline">Mis Reservas</a></li>
                        <li>|</li>
                        <li><a href="../../About-us" className="hover:underline">Sobre Nosotros</a></li>
                        <li>|</li>
                        <li>
                            <button 
                                onClick={copyToClipboard} 
                                className="hover:underline flex items-center relative"
                            >
                                <PhoneCall className="inline mr-1 mr-2 h-4 w-4" />
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

                    {/* Sección botones usuario y itinerario */}
                    <div className="relative flex items-center space-x-4">
                        {/* Boton "Mi Itinerario" */}
                        <button onClick={toggleItinerary} className="text-sm text-gray-700 hover:underline text-white">
                            Mi Itinerario
                        </button>

                        {/* Boton usuario */}
                        <button onClick={toggleMenu} className="relative h-8 w-8 rounded-full focus:outline-none">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                {user ? (
                                    <img
                                        src={user.urlAvatar || "https://img.freepik.com/foto-gratis/leon-gafas-estudio_23-2150813334.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723248000&semt=ais_hybrid"}
                                        alt="Foto de perfil"
                                        className="rounded-full"
                                        width={32}
                                        height={32}
                                    />
                                ) : (
                                    <User className="h-8 w-8 text-gray-500" />
                                )}
                            </div>
                        </button>

                        {/* Menu de usuario con sus opciones */}
                        {menuOpen && (
                            <div className="absolute top-full mt-2 right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                                <div className="py-2">
                                    {user ? (
                                        <div className="px-4 py-2">
                                            <p className="text-sm font-medium leading-none text-custom-green">{user.name} {user.lastName}</p>
                                            <p className="text-xs text-gray-500">{user.email || 'usuario@ejemplo.com'}</p>
                                        </div>
                                    ) : (
                                        <div className="px-4 py-2">
                                            <p className="text-sm font-medium leading-none text-custom-green">Invitado</p>
                                            <p className="text-xs text-gray-500">No registrado</p>
                                        </div>
                                    )}
                                    <div className="border-t border-gray-100"></div>
                                    {user ? (
                                        <button
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                            onClick={logout}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Cerrar sesión
                                        </button>
                                    ) : (
                                        <>
                                            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                                                <Settings className="mr-2 h-4 w-4" />
                                                Configuración
                                            </button>
                                            <a href="../Login"><button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Iniciar sesión
                                            </button></a>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Panel de itinerario */}
                        {itineraryOpen && (
                            <>
                                {/* Fondo oscuro */}
                                <div onClick={toggleItinerary} className="fixed inset-0 bg-black opacity-50 z-40 w-full"></div>

                                {/* Panel deslizante con animación */}
                                <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 transform ${itineraryOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out`}>
                                    <div className="p-4 text-black">
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-lg font-bold">Mi Itinerario</h2>
                                            <button onClick={toggleItinerary} className="text-gray-700 hover:text-gray-900">
                                                <X className="h-6 w-6" />
                                            </button>
                                        </div>

                                        {/* Información del itinerario */}
                                        <p className="text-gray-600 text-sm py-2 px-4 flex items-center rounded">
                                            <MapPin className="mr-2 h-4 w-4" />
                                            {origin || 'Desde'}
                                        </p>
                                        <p className="text-gray-600 text-sm py-2 px-4 flex items-center rounded">
                                            <Building className="mr-2 h-4 w-4" />
                                            {destination || 'Medellín'}
                                        </p>
                                        <p className="text-gray-600 text-sm py-2 px-4 flex items-center rounded">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {formattedStartDate}
                                        </p>
                                        <p className="text-gray-600 text-sm py-2 px-4 flex items-center rounded">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {formattedEndDate}
                                        </p>
                                        <p className="text-gray-600 text-sm py-2 px-4 flex items-center rounded">
                                            <Users className="mr-2 h-4 w-4" />
                                            {peopleText}
                                        </p>

                                        {/* Detalles del hotel */}
                                        { selectedHotel && (
                                            <div className="mt-4">
                                                <h3 className="text-md font-semibold">Hotel Seleccionado</h3>
                                                <p className="text-gray-600">{selectedHotel?.name || 'No seleccionado'}</p>
                                                <p className="text-gray-600">Dirección: {selectedHotel?.address || 'No especificada'}</p>
                                                <p className="text-gray-600">Alimentación: {selectedHotel?.foodOptions || 'No especificado'}</p>
                                                <p className="text-gray-600">Habitación: {selectedHotel?.room?.type || 'No especificada'}</p>
                                                <p className="text-gray-600">Precio: COP {selectedHotel?.room?.price ? selectedHotel.room.price.toLocaleString() : 'No disponible'}</p>
                                            </div>
                                        )}

                                        {/* Detalles del vuelo */}
                                        {reserva.vueloIda && (
                                            <div className="mt-4">
                                                <h3 className="text-md font-semibold">Vuelo de Ida</h3>
                                                <p className="text-gray-600">Aerolínea: {reserva.vueloIda.airline}</p>
                                                <p className="text-gray-600">Precio: COP {reserva.vueloIda.price ? reserva.vueloIda.price.toLocaleString() : 'No disponible'}</p>
                                            </div>
                                        )}
                                        {reserva.vueloVuelta && (
                                            <div className="mt-4">
                                                <h3 className="text-md font-semibold">Vuelo de Regreso</h3>
                                                <p className="text-gray-600">Aerolínea: {reserva.vueloVuelta.airline}</p>
                                                <p className="text-gray-600">Precio: COP {reserva.vueloVuelta.price ? reserva.vueloVuelta.price.toLocaleString() : 'No disponible'}</p>
                                            </div>
                                        )}
                                        {reserva.tours && reserva.tours.length > 0 && (
                                            <div className="mt-4">
                                                <h3 className="text-md font-semibold">Tours</h3>
                                                {reserva.tours.map((tour, index) => (
                                                    <div key={index} className="mb-2">
                                                        <p className="text-gray-600">Tour: {tour.name}</p>
                                                        <p className="text-gray-600">Precio: COP {tour.price ? tour.price.toLocaleString() : 'No disponible'}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Valor Total */}
                                        <div className="mt-4 border-t border-gray-200 pt-4">
                                            <h3 className="text-lg font-semibold">Valor Total</h3>
                                            <p className="text-gray-600">COP {reserva.valorTotal ? reserva.valorTotal.toLocaleString() : 'No disponible'}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </nav>
            </section>
        </>
    );
}