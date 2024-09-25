
export default function AsideFilters() {
  return(
    <aside className="w-full md:w-64 shrink-0">
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4 text-custom-green">Filtros</h3>
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">Buscar Hotel</label>
            <input id="search" type="text" placeholder="Nombre del hotel..." className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destino</label>
            <select id="destination" className="w-full p-2 border border-gray-300 rounded-md">
              <option value="">Todos los destinos</option>
              <option value="beach">Playa</option>
              <option value="mountain">Montaña</option>
              <option value="city">Ciudad</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Rango de Precio</label>
            <input type="range" min="0" max="500" step="10" defaultValue="[0, 500]" className="w-full" />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Servicios</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input id="wifi" type="checkbox" className="mr-2" />
                <label htmlFor="wifi" className="text-sm text-gray-700">Wi-Fi</label>
              </div>
              <div className="flex items-center space-x-2">
                <input id="pool" type="checkbox" className="mr-2" />
                <label htmlFor="pool" className="text-sm text-gray-700">Piscina</label>
              </div>
              <div className="flex items-center space-x-2">
                <input id="parking" type="checkbox" className="mr-2" />
                <label htmlFor="parking" className="text-sm text-gray-700">Estacionamiento</label>
              </div>
            </div>
          </div>
          
          <button type="submit" className="w-full bg-custom-green text-white py-2 px-4 rounded-md hover:bg-green-800 cursor-pointer">Aplicar Filtros</button>
        </form>
      </div>
    </aside>
  );
}