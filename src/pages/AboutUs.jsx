import React from 'react';

export default function AboutUsPage() {
    return (
        <>
            <div className="max-w-8xl mx-auto">
                <header className="bg-custom-green text-custom-navy-blue p-1 font">
                    <nav className="bg-custom-green text-custom-navy-blue p-4 font">
                        <ul className="flex justify-start space-x-4">
                            <li><a href="#" className="hover:underline">Reseñas</a></li>
                            <li>|</li>
                            <li><a href="#" className="hover:underline">¿Ya Has Reservado?</a></li>
                            <li>|</li>
                            <li><a href="#" className="hover:underline">Sobre Nosotros</a></li>
                            <li>|</li>
                            <li><a href="#" className="hover:underline">+57 123 456 789</a></li>
                        </ul>
                    </nav>

                </header>
                {/* banner */}
                <section>
                    <div className="relative h-[80vh] w-full overflow-hidden bg-gray-800 text-white mt-5">
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://i.pinimg.com/originals/e3/ec/a6/e3eca6e54c62a90611e131a1327414c3.jpg"
                                alt="Vista panorámica de ciudad montañosa"
                                className="h-full w-full object-cover opacity-50"
                            />
                        </div>
                        <div className="relative z-10 flex h-full border">
                            <div className="w-3/4 bg-gray-800 bg-opacity-50 p-28 "
                                style={{
                                    clipPath: "polygon(0 0, 100% 0, 50% 100%, 0% 100%)",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                                }}>
                                <div className="p-10 max-w-xl">
                                    <h2 className="mb-12 text-8xl font-bold text-custom-green ">
                                        Acerca de <br />
                                        nosotros.
                                    </h2>
                                    <p className="text-xl leading-relaxed">
                                        En <span className="font-semibold">Dreams Reserve</span>, transformamos el
                                        concepto de viajar a un nuevo nivel, ofreciendo
                                        experiencias únicas que se ajustan
                                        perfectamente a tus deseos y necesidades. A
                                        diferencia de otras agencias de turismo, nos
                                        especializamos en diseñar viajes completamente
                                        personalizables, garantizando que cada aspecto
                                        de tu aventura sea tan único como tú.
                                    </p>
                                </div>
                            </div>
                            <div className="flex w-1/2 items-center justify-center">
                                <div className="rounded-lg bg-teal-600 bg-opacity-40 p-6 text-center ">
                                    <h3 className="mb-4 text-xl font-semibold">Nuestros Fundadores</h3>
                                    <img
                                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                        alt="Fundadores de Dreams Reserve"
                                        className="mb-4 max-h-64  w-full rounded-lg object-cover"
                                    />
                                    <button className="rounded bg-teal-500 px-4 py-2 font-semibold text-white hover:bg-teal-600 transition duration-300">
                                        conocer mas
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}


