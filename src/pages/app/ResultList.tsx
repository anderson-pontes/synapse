import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '@/Context/SearchContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AiFillFilePdf } from 'react-icons/ai';
import { api } from '@/lib/axios';
import GridLoader from 'react-spinners/GridLoader';
import { Eye, SearchX } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { format, parse } from 'date-fns';

interface AtosData {
    ano_sessao_plenaria: string;
    arquivo_extensao: string;
    arquivo_quantidade_paginas: string;
    caminhoPdf: string;
    classes_subclasses: string;
    conteudo: string;
    data_conteudo: string;
    data_publicacao_doe: string;
    data_sessao_plenaria: string;
    ementa: string;
    exercicios: string;
    id_base_dados: string;
    interessados: string;
    link_download: string;
    numero: string;
    relator: string;
    titulo: string;
    unidades_jurisdicionadas: string;
    fonte: string;
    processos: string;
    relatores: string;
}

const ResultsList: React.FC = () => {
    const { query } = useContext(SearchContext)!;
    const [data, setData] = useState<AtosData[]>([]);
    const [error, setError] = useState<JSX.Element | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [page] = useState<number>(1);
    const [limit] = useState<number>(25);

    useEffect(() => {
        if (query && Object.values(query).some((value) => value)) {
            fetchResults(page);
        } else {
            setError(
                <div className='text-xl items-center flex flex-col font-semibold text-justify mt-8 text-muted-foreground'>
                    <p>Favor informe o conteúdo a ser pesquisado.</p>
                    <SearchX className="h-12 w-12 mt-4" />
                </div>
            );
            setData([]);
        }
    }, [query, page]);

    const fetchResults = async (pagina: number) => {
        setLoading(true);
        setError(null);

        try {
            const queryString = new URLSearchParams({
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
                page: pagina.toString(),
                limit: limit.toString(),
            }).toString();

            const response = await api.get(`/consulta?${queryString}`);

            if (!response.data || !Array.isArray(response.data)) {
                throw new Error('Resposta inválida da API.');
            }

            setData(response.data); // API retorna a lista diretamente
        } catch (err) {
            setError(
                <div className='text-xl items-center flex flex-col font-semibold text-justify mt-8 text-muted-foreground'>
                    <p>Erro ao buscar dados. Tente novamente mais tarde.</p>
                    <SearchX className="h-12 w-12 mt-4" />
                </div>
            );
            console.error('Erro ao buscar dados:', err);
        } finally {
            setLoading(false);
        }
    };

   

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <GridLoader size={16} color="#5359E9" />
            </div>
        );
    }

    if (error) return <div>{error}</div>;

    if (!data || data.length === 0) return (
        <div className='text-xl items-center flex flex-col font-semibold text-justify mt-8 text-muted-foreground'>
            <p>Não foi encontrado nenhum diário para o(s) filtro(s) selecionado(s).</p>
            <p>Tente novamente com outros parâmetros.</p>
            <SearchX className="h-12 w-12 mt-4" />
        </div>
    );

    return (
        <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold tracking-tight text-justify mt-4 text-blue-800/80'>Resultados para a busca:</h2>
            {data.map((item, index) => (
                <Card key={index} className='shadow-md shadow-blue-500/40'>
                    <CardHeader className="flex-items-center flex-row justify-between space-y-0 pb-4">
                        <div className="space-y-1">
                            <CardTitle className="text-base font-medium text-blue-800/80 dark:text-blue-300">
                                {item.titulo}
                            </CardTitle>
                            <CardDescription>Processo: {item.processos}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <p className="leading-7 [&:not(:first-child)]:mt-6">{item.ementa}</p>
                    </CardContent>
                    <CardFooter className="flex justify-start gap-2">
                        <Button
                            variant="outline"
                            onClick={() => window.open(item.link_download, '_blank')}
                            className="flex justify-start gap-2 items-center border-blue-500 font-normal text-blue-500"
                            type="button"
                        >
                            <AiFillFilePdf className="text-red-600" />
                            Download
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline"
                                    className="gap-2 border-blue-500 font-normal text-blue-500 hover:text-blue-600 dark:border-blue-300 dark:text-blue-300"
                                >
                                    <Eye className='h-3 w-3' />
                                    Detalhes
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle className='text-indigo-600 text-center text-xl'>{item.titulo}</DialogTitle>
                                    <DialogDescription>Detalhes do Ato</DialogDescription>
                                </DialogHeader>

                                <div className='space-y-6'>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className='text-muted-foreground'>Processo</TableCell>
                                                <TableCell className='flex justify-end'>{item.processos}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className='text-muted-foreground'>Data da sessão plenária</TableCell>
                                                <TableCell className='flex justify-end'>
                                                    {item.data_sessao_plenaria
                                                        ? (() => {
                                                            const data = parse(item.data_sessao_plenaria, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", new Date());

                                                            if (!isNaN(data.getTime())) {
                                                                return format(data, 'dd/MM/yyyy');
                                                            } else {
                                                                return 'Data inválida';
                                                            }
                                                        })()
                                                        : '-'}
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className='text-muted-foreground'>Data da publicação no Diário Oficial do Estado</TableCell>
                                                <TableCell className='flex justify-end'>
                                                    {item.data_publicacao_doe
                                                        ? (() => {
                                                            const data = parse(item.data_publicacao_doe, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", new Date());

                                                            if (!isNaN(data.getTime())) {
                                                                return format(data, 'dd/MM/yyyy');
                                                            } else {
                                                                return 'Data inválida';
                                                            }
                                                        })()
                                                        : '-'}
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className='text-muted-foreground'>Exercícios</TableCell>
                                                <TableCell className='flex justify-end'>{item.exercicios}</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className='text-muted-foreground'>Classes/Subclasses</TableCell>
                                                <TableCell className='flex text-justify'>{item.classes_subclasses}</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className='text-muted-foreground'>Interessados</TableCell>
                                                <TableCell className='flex text-justify'>{item.interessados}</TableCell>
                                            </TableRow>


                                            <TableRow>
                                                <TableCell className='text-muted-foreground'>Unidades jurisdicionadas</TableCell>
                                                <TableCell className='flex text-justify'>{item.unidades_jurisdicionadas}</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className='text-muted-foreground'>Relatores</TableCell>
                                                <TableCell className='flex text-justify'>{item.relatores}</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className='text-muted-foreground'>Ementa</TableCell>
                                                <TableCell className='flex text-justify'>{item.ementa}</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className='text-muted-foreground'>Fonte</TableCell>
                                                <TableCell className='flex justify-end'>{item.fonte}</TableCell>
                                            </TableRow>

                                        </TableBody>
                                    </Table>
                                </div>

                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            ))}

            
        </div>
    );
};

export default ResultsList;
