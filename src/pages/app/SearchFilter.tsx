import React, { useContext, useState } from 'react';
import { SearchContext } from '@/Context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from 'lucide-react';


const SearchFilter: React.FC = () => {
    const { query, setQuery } = useContext(SearchContext)!;
    const [localQuery, setLocalQuery] = useState({
        data_sessao_plenaria: query.data_sessao_plenaria || '',
        data_publicacao_doe: query.data_publicacao_doe || '',
        exercicios: query.exercicios || '',
        classes_subclasses: query.classes_subclasses || '',
        interessados: query.interessados || '',
        unidades_jurisdicionadas: query.unidades_jurisdicionadas || '',
        relator: query.relator || '',
        busca_exata: query.busca_exata || '',
        busca_termos: query.busca_termos || '',
        titulo: query.titulo || '',
    });

    // Adiciona setValue do useForm
    const navigate = useNavigate();

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        setQuery(localQuery);
        navigate('/pesquisaintegrada/results');
    };

    const handleClearFilters = () => {
        // Reseta o estado local para os valores iniciais
        const initialValues = {
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
        };
        setLocalQuery(initialValues);


        setQuery(initialValues);



    };

    return (
        <>
         <span className="text-lg font-semibold text-blue-800/80">Pesquisar:</span>
        <form className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 text-slate-700'>
           
            <Input
                placeholder="Busca avançada por termos"
                value={localQuery.busca_termos}
                onChange={(e) => setLocalQuery({ ...localQuery, busca_termos: e.target.value })}
                className="w-full"
            />
            <Input
                placeholder="Busca exata"
                value={localQuery.busca_exata}
                onChange={(e) => setLocalQuery({ ...localQuery, busca_exata: e.target.value })}
                className="w-full"
            />
            <Input
                placeholder="Busca por título"
                value={localQuery.titulo}
                onChange={(e) => setLocalQuery({ ...localQuery, titulo: e.target.value })}
                className="w-full"
            />
            <Input
                placeholder="Exercícios"
                value={localQuery.exercicios}
                onChange={(e) => setLocalQuery({ ...localQuery, exercicios: e.target.value })}
                className="w-full"
            />
            <Input
                placeholder="Interessados"
                value={localQuery.interessados}
                onChange={(e) => setLocalQuery({ ...localQuery, interessados: e.target.value })}
                className="w-full"
            />
            <Input
                placeholder="relator"
                value={localQuery.relator}
                onChange={(e) => setLocalQuery({ ...localQuery, relator: e.target.value })}
                className="w-full"
            />
            <Input
                placeholder="Unidades jurisdicionadas"
                value={localQuery.unidades_jurisdicionadas}
                onChange={(e) => setLocalQuery({ ...localQuery, unidades_jurisdicionadas: e.target.value })}
                className="w-full"
            />
            <Input
                placeholder="Classes e Subclasses"
                value={localQuery.classes_subclasses}
                onChange={(e) => setLocalQuery({ ...localQuery, classes_subclasses: e.target.value })}
                className="w-full"
            />
            
            <Input
                placeholder="Data da sessão plenário"
                value={localQuery.data_sessao_plenaria}
                onChange={(e) => setLocalQuery({ ...localQuery, data_sessao_plenaria: e.target.value })}
                className="w-full"
            />
            <Input
                placeholder="Data de publicação no DOE"
                value={localQuery.data_publicacao_doe}
                onChange={(e) => setLocalQuery({ ...localQuery, data_publicacao_doe: e.target.value })}
                className="w-full"
            />
            


            <Button onClick={handleSearch} type="submit" size="default" className='bg-gradient-to-r from-blue-400 to-indigo-600 shadow-lg text-white hover:text-blue-300'>
                <Search className="h-4 w-4 mr-2" />
                Pesquisar
            </Button>
            <Button onClick={handleClearFilters} variant="outline" size="default" className="w-full sm:w-auto">
                <X className="h-4 w-4 mr-2" />
                Remover filtros
            </Button>
        </form>
        </>
        
    );
};

export default SearchFilter;
