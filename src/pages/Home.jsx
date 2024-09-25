import { useState } from "react";
import { NavbarHome, SearchBar } from "../components";

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/ImagenFondo.webp')" }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 min-h-screen flex flex-col p-4 sm:p-6">
        <NavbarHome />

        <div className="flex-grow flex flex-col justify-center max-w-6xl mx-auto w-full text-white">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl mb-2 text-white font-bold">
            <span className="text-teal-300">D</span>ream <span className="text-teal-300">R</span>eserve
          </h2>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-8xl font-bold mb-4">
            ¿Listo para descubrir <br />
            <span className="text-teal-300">Medellín</span>?
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-3xl mb-8 text-gray-300">
            Descubre +1000 lugares y paquetes en Medellín con Dream Reserve
          </p>

          <SearchBar />
        </div>
      </div>
    </div>
  );
}
