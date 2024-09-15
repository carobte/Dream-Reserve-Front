import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Router'; 
import { PriceProvider } from './context/PriceContext'; 
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <PriceProvider>
      <SearchProvider>
        <AuthProvider> {/* Asegúrate de envolver los demás proveedores */}
          <RouterProvider router={router} />
        </AuthProvider>
      </SearchProvider>
    </PriceProvider>
  );
}

export default App;