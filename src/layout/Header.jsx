import { PhoneCall } from 'lucide-react';

export default function Header() {
    return (
        <>
        <nav className="bg-custom-green text-custom-navy-blue p-4">
                <ul className="flex justify-start space-x-4">
                    <li><a href="#" className="hover:underline">Reseñas</a></li>
                    <li>|</li>
                    <li><a href="#" className="hover:underline">¿Ya Has Reservado?</a></li>
                    <li>|</li>
                    <li><a href="#" className="hover:underline">Sobre Nosotros</a></li>
                    <li>|</li>
                    <li><a href="#" className="hover:underline"><PhoneCall className="inline mr-1 text-custom-navy-blue" />+57 123 456 789</a></li>
                </ul>
            </nav>
        </>
    );
}
