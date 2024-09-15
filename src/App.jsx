import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Router'; 
import { PriceProvider } from './context/PriceContext'; 
import { SearchProvider } from './context/SearchContext';


function App() {
  return (
    <PriceProvider>
      <SearchProvider> 
          <RouterProvider router={router} />
      </SearchProvider>
    </PriceProvider>
  );
}

export default App;