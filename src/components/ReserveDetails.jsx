
import { Hotel, Utensils, Bed, Calendar, Plane, Clock, MapPin, DollarSign } from "lucide-react";
import { Card, Badge } from '../components';


export default function ReserveDetails({ reserva }) {
    if (!reserva) return null;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-[#276F62]">Detalles de la Reserva</h2>
            <Badge className="block w-max mx-auto mb-6 text-lg py-1 px-3">Reserva #{reserva.id}</Badge>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-[#276F62]">
                            <Hotel className="h-6 w-6" />
                            Alojamiento
                        </h3>
                        <p className="font-semibold text-lg">{reserva.hotelName}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <Bed className="h-5 w-5 text-gray-500" />
                            <span>{reserva.roomType} - {reserva.roomName}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <Utensils className="h-5 w-5 text-gray-500" />
                            <span>{reserva.foodDescription}</span>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-[#276F62]">
                            <Calendar className="h-6 w-6" />
                            Fechas
                        </h3>
                        <div className="flex justify-between">
                            <div>
                                <p className="font-semibold">Check-In</p>
                                <p>{reserva.checkIn}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Check-Out</p>
                                <p>{reserva.checkOut}</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="md:col-span-2">
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-[#276F62]">
                            <Plane className="h-6 w-6" />
                            Vuelos
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold">Vuelo: {reserva.flightName}</h4>
                                <div className="flex justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-gray-500" />
                                        <span>Duración: {reserva.flightDuration}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="md:col-span-2">
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-[#276F62]">
                            <MapPin className="h-6 w-6" />
                            Tours
                        </h3>
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold">{reserva.tourName}</h4>
                                <p className="text-sm text-gray-500">Duración: {reserva.tourPrice}</p>
                            </div>
                            <Badge>${reserva.tourPrice}</Badge>
                        </div>
                    </div>
                </Card>

                <Card className="md:col-span-2">
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-[#276F62]">
                            <DollarSign className="h-6 w-6" />
                            Precio Total
                        </h3>
                        <p className="text-2xl font-bold">${reserva.total.toLocaleString('es-CO')}</p>
                    </div>
                </Card>
            </div>
        </div>
    );
} 