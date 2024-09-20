import 'react-datepicker/dist/react-datepicker.css';
import { SearchBar, NavbarHome } from '../components/index';

export default function Home() {
  return (
    <div
      className="relative w-full min-h-screen"
      style={{
        backgroundImage: "url(../ImagenFondo.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(75% 0%, 50% 50%, 75% 100%, 0% 100%, 0% 0%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)" 
        }}
      />
      <div className="absolute inset-0" />
      <div className="absolute inset-0 flex flex-col items-start justify-between p-4 sm:p-8 md:p-16 lg:p-32">
        <NavbarHome />
        <div className="w-full max-w-4xl">
          <div className="space-y-2 mb-4 sm:mb-8 md:mb-12 lg:mb-16 text-white">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              <span className="text-custom-navy-blue">D</span>ream <span className="text-custom-navy-blue">R</span>eserve
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold lg:max-w-2xl">
              ¿A qué <span className="text-custom-navy-blue">lugar</span> quiere <span className="text-custom-navy-blue">viajar</span>?
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400">
              Descubra +1000 destinos y paquetes en Dreams Reserve
            </p>
          </div>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}