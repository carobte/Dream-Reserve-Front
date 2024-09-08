import 'react-datepicker/dist/react-datepicker.css';
import {SearchBar, NavbarHome} from '../components/index';

export default function Component() {


  return (
    <div
  className="relative w-full h-screen"
  style={{
    backgroundImage: "url(https://images.unsplash.com/photo-1578115172582-b27c8cd114bb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
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
  <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-16 lg:px-32">
    <NavbarHome />
    <div className="space-y-2 mb-8 md:mb-12 lg:mb-16 text-white">
      <h1 className="text-2xl font-bold md:text-2xl lg:text-3xl">
        <span className="text-custom-navy-blue">D</span>reams <span className="text-custom-navy-blue">R</span>eserve
      </h1>
      <h2 className="text-5xl text-balance font-bold md:text-6xl lg:text-8xl  lg:max-w-2xl ">
        ¿A qué <span className="text-custom-navy-blue">lugar</span> quiere <span className="text-custom-navy-blue">viajar</span>?
      </h2>
      <p className="text-lg text-gray-400 md:text-xl lg:text-2xl">
        Descubra +1000 destinos y paquetes en Dreams Reserve
      </p>
    </div>
    <SearchBar />
  </div>
</div>

  );
}
