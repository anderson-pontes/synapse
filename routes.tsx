import { createHashRouter } from "react-router-dom";

import { NotFound } from './src/pages/app/404';
import { Home } from './src/pages/app/Home';
import { AppLayout } from './src/pages/layout/app'
import { Jurisdicionados } from '@/pages/app/Jurisdicionados';
import { AcordoMunicipios } from '@/pages/app/AcordoMunicipios';
import { AcordoEstado } from '@/pages/app/AcordoEstado';
import { Saneamento } from '@/pages/app/Saneamento';
import { IndicadoresSaneamento } from '@/pages/app/IndicadoresSaneamento';
import { CamarasEmFoco } from '@/pages/app/CamarasFoco';
import { PanoramaMunicipalDespesas } from '@/pages/app/PanoramaMunicipal';
import { AcompanhamentoProdutividade } from '@/pages/app/AcompanhamentoProdutividade';
import SearchPage from '@/pages/app/SearchPage';
import ResultsPage from '@/pages/app/ResultsPage';



export const Router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },     
      { path: '/jurisdicionados', element: <Jurisdicionados /> },     
      { path: '/acordomunicipios', element: <AcordoMunicipios /> },     
      { path: '/acordoestado', element: <AcordoEstado /> },     
      { path: '/saneamento', element: <Saneamento /> },     
      { path: '/indicadores', element: <IndicadoresSaneamento /> },     
      { path: '/anonimizacaodedados', element: <AcompanhamentoProdutividade /> },     
      { path: '/camarasemfoco', element: <CamarasEmFoco /> },     
      { path: '/panoramamunicipal', element: <PanoramaMunicipalDespesas /> },     
      { path: '/pesquisaintegrada', element: <SearchPage /> },   
      { path: '/pesquisaintegrada/results', element: <ResultsPage /> },   
          
      
      
    ]
  },
  
  
]);
