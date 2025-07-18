import '@/index.css'
import { Router } from '../routes'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { createHashRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { SearchProvider } from '@/Context/SearchContext';
import { queryClient } from './lib/react-query';
import { RouterProvider} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';




  
  // Combinando as rotas do AdminRouter com as novas rotas
  const combinedRouter = createHashRouter([
    ...Router.routes,  // Supondo que AdminRouter já possui um array de rotas
    
  ]);
  export const App = () => (
    <HelmetProvider>
      
        <Helmet titleTemplate="SYNAPSE | %s" />
        <Toaster richColors />
        <ToastContainer />
        <QueryClientProvider client={queryClient}>
          {/* Adiciona o SearchProvider ao redor de RouterProvider */}
          <SearchProvider>
            <RouterProvider router={combinedRouter} />
          </SearchProvider>
        </QueryClientProvider>
    
    </HelmetProvider>
  );