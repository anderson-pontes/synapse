import React, { useContext, useState } from 'react';
import { SearchContext } from '@/Context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Input } from "@/components/ui/input";
import logo from '@/assets/logo.svg';
import { Button } from "@/components/ui/button";
import { Search, X } from 'lucide-react';

const SearchForm: React.FC = () => {
    const { query, setQuery } = useContext(SearchContext)!;
    const [localQuery, setLocalQuery] = useState<{ 
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
        data_sessao_plenaria: query.data_sessao_plenaria,
        data_publicacao_doe: query.data_publicacao_doe,
        exercicios: query.exercicios,
        classes_subclasses: query.classes_subclasses,
        interessados: query.interessados,
        unidades_jurisdicionadas: query.unidades_jurisdicionadas,
        relator: query.relator,
        busca_exata: query.busca_exata,
        busca_termos: query.busca_termos,
        titulo: query.titulo,
        
    });
    const navigate = useNavigate();

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        setQuery(localQuery);
        navigate('/pesquisaintegrada/results');
    };

    const handleClearFilters = () => {
        // Reseta o estado local para os valores iniciais
        setLocalQuery({
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

        // Também reseta o contexto se necessário
        setQuery({
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
    };

    return (
        <>
            <Helmet title="Pesquisa Avançada" />
            <form className="flex flex-col gap-4 items-center p-4 sm:p-6 md:p-8 ">

                <img className="w-24 h-24" src={logo} alt="Logo" />
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-blue-800/80">Tribunal de Contas do Estado do Pará</h1>
                <h2 className="text-lg sm:text-xl tracking-tight text-blue-700/80">Pesquisa Avançada</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">


                    <Input
                        placeholder="Busca avançada por termos"
                        value={localQuery.busca_termos}
                        onChange={(e) => setLocalQuery({ ...localQuery, busca_termos: e.target.value })}
                        className="w-full sm:col-span-1 md:col-span-2"
                    />
                    <Input
                        placeholder="Busca exata"
                        value={localQuery.busca_exata}
                        onChange={(e) => setLocalQuery({ ...localQuery, busca_exata: e.target.value })}
                        className="w-full sm:col-span-1 md:col-span-2"
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
                        placeholder="Busca por título"
                        value={localQuery.titulo}
                        onChange={(e) => setLocalQuery({ ...localQuery, titulo: e.target.value })}
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
                    <Input
                        placeholder="Exercícios"
                        value={localQuery.exercicios}
                        onChange={(e) => setLocalQuery({ ...localQuery, exercicios: e.target.value })}
                        className="w-full"
                    />

                    

                    
                    </div>


                <div className="flex flex-row gap-4 items-center mt-4">

                    <Button className='bg-gradient-to-r from-blue-400 to-indigo-600 shadow-lg text-white hover:text-blue-300' onClick={handleSearch} type="submit"  size="lg">
                        <Search className="h-4 w-4 mr-2" />
                        Pesquisar
                    </Button>

                    <Button
                        onClick={handleClearFilters}
                        type="button"
                        variant="secondary"
                        size="lg"
                        className="flex items-center"
                    >
                        <X className="h-4 w-4 mr-2" />
                        Remover filtros
                    </Button>

                </div>


            </form>


        </>

    );
};

export default SearchForm;
