import { PhoneCall } from 'lucide-react';
import { Calendar, Users, MapPin } from 'lucide-react';
import { SearchContext } from '../context/SearchContext';
import { useContext } from 'react';

export default function NavbarSelect({totalPrice}) {
    const {
        origin,
        destination,
        startDate,
        endDate,
        totalPeople
    } = useContext(SearchContext);
    
    
    const formattedStartDate = startDate ? startDate.toLocaleDateString() : 'Fecha de inicio';
    const formattedEndDate = endDate ? endDate.toLocaleDateString() : 'Fecha de fin';
    const peopleText = totalPeople ? `${totalPeople} adultos` : 'Número de personas';

    return (
        <header className="bg-custom-green text-custom-navy-blue py-2 px-4 w-full fixed top-0 left-0 z-50">
            <nav className='flex justify-between'>
                <ul className="flex justify-start space-x-4">
                    <li><a href="#" className="hover:underline">Reseñas</a></li>
                    <li>|</li>
                    <li><a href="#" className="hover:underline">¿Ya Has Reservado?</a></li>
                    <li>|</li>
                    <li><a href="#" className="hover:underline">Sobre Nosotros</a></li>
                    <li>|</li>
                    <li><a href="#" className="hover:underline"><PhoneCall className="inline mr-1 text-custom-navy-blue" />+57 123 456 789</a></li>
                </ul>
                <div className="flex space-x-2">
                    <button className="border border-gray-300 text-gray-600 text-sm py-2 px-4 flex items-center rounded text-white">
                        <MapPin className="mr-2 h-4 w-4" />
                        {origin || 'Desde'}
                    </button>
                    <button className="border border-gray-300 text-gray-600 text-sm py-2 px-4 flex items-center rounded text-white">
                        <Calendar className="mr-2 h-4 w-4" />
                        {formattedStartDate}
                    </button>
                    <button className="border border-gray-300 text-gray-600 text-sm py-2 px-4 flex items-center rounded text-white">
                        <Calendar className="mr-2 h-4 w-4" />
                        {formattedEndDate}
                    </button>
                    <button className="border border-gray-300 text-gray-600 text-sm py-2 px-4 flex items-center rounded text-white">
                        <Users className="mr-2 h-4 w-4" />
                        {peopleText}
                    </button>
                </div>
                <h2 className='text-white '>Precio Reserva :  <span className='text-green-400 font-bold'>COP $ {totalPrice ? totalPrice.toLocaleString() : '0'}</span> </h2>
            </nav>
        </header>
    );
}
