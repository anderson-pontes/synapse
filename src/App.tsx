import '@/index.css'
import { Router } from '../routes'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { createHashRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { SearchProvider } from '@/Context/SearchContext';
import { queryClient } from './lib/react-query';
import { RouterProvider, RouteObject } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import SearchPage from '@/pages/app/SearchPage';
import ResultsPage from '@/pages/app/ResultsPage';


const newRoutes: RouteObject[] = [
    { path: "/pesquisaintegrada", element: <SearchPage /> },
    { path: "/pesquisaintegrada/results", element: <ResultsPage /> },
  ];
  
  // Combinando as rotas do AdminRouter com as novas rotas
  const combinedRouter = createHashRouter([
    ...Router.routes,  // Supondo que AdminRouter já possui um array de rotas
    ...newRoutes,  // Adiciona as novas rotas definidas acima
  ]);
  export const App = () => (
    <HelmetProvider>
      
        <Helmet titleTemplate="PORTAL | %s" />
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