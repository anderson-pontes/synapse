import { createContext, useState, ReactNode } from 'react';

interface SearchContextType {
    query: {
        data_sessao_plenaria: string;
        data_publicacao_doe: string;
        exercicios: string;
        classes_subclasses: string;
        interessados: string;
        unidades_jurisdicionadas: string;
        relator: string;
        busca_exata: string;
        busca_termos: string;
        titulo: string;
        };
    setQuery: React.Dispatch<React.SetStateAction<{
        data_sessao_plenaria: string;
        data_publicacao_doe: string;
        exercicios: string;
        classes_subclasses: string;
        interessados: string;
        unidades_jurisdicionadas: string;
        relator: string;
        busca_exata: string;
        busca_termos: string;
        titulo: string;
       }>>;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<{ 
        data_sessao_plenaria: string;
        data_publicacao_doe: string;
        exercicios: string;
        classes_subclasses: string;
        interessados: string;
        unidades_jurisdicionadas: string;
        relator: string;
        busca_exata: string;
        busca_termos: string;
        titulo: string; 
}>({
        data_sessao_plenaria: '',
        data_publicacao_doe: '',
        exercicios: '',
        classes_subclasses: '',
        interessados: '',
        unidades_jurisdicionadas: '',
        relator: '',
        busca_exata: '',
        busca_termos: '',
        titulo: '',
  });

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
