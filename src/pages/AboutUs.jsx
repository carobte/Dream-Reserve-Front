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

                <div className="max-w-8xl mx-auto h-96 p-4 border-solid border-4 border-black mt-4 flex flex-row space-x-4">

                    <div className="w-3/4 border-solid border-4 border-black">
                    textoooooo

                    </div>

                    <div className="w-1/2 border-solid border-4 border-black flex flex-col space-y-4 p-4 ">

                        <div className=" border-solid  border-4 border-black rounded-xl w-full h-full flex flex-col space-y-4">

                            <div className=' w-full h-1/2 border-solid border-4 border-black'>
                            imagen
                            </div>

                            <div className=' w-full h-1/2 border-solid border-4 border-black'>
                                texto
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}


