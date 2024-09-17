import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Router';
import { PriceProvider } from './context/PriceContext';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './context/AuthContext';
import { ReservaProvider } from './context/ReserveContext'; 


function App() {
  return (
    <PriceProvider>
    <SearchProvider>
      <AuthProvider>
        <ReservaProvider>
          <RouterProvider router={router} />
        </ReservaProvider>
      </AuthProvider>
    </SearchProvider>
  </PriceProvider>
  );
}

export default App;
