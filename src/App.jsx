import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Router'; 
import { PriceProvider } from './context/PriceContext'; 

function App() {
  return (
    <PriceProvider>
      <RouterProvider router={router} />
    </PriceProvider>
  );
}

export default App;
