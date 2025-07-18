import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import BarLoader from "react-spinners/BarLoader";
import { Button } from '@/components/ui/button';
import { api } from '@/lib/axios';

export function UploadPdf() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null); 
    const [fileName, setFileName] = useState<string | null>(null); 
    const [uploadProgress, setUploadProgress] = useState<number>(0); 
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false); 
    const [uploadError, setUploadError] = useState<boolean>(false); 
    const [isLoading, setIsLoading] = useState<boolean>(false); 

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
            setUploadSuccess(false);
            setUploadProgress(0);
            setUploadError(false); 
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setFileName(null);
        setUploadProgress(0);
        setUploadSuccess(false);
        setUploadError(false); 
    };

    const handleSubmit = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const token = localStorage.getItem('token');

            setIsLoading(true); 

            try {
                const response = await api.post('/uploadsefapgto', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                    onUploadProgress: (progressEvent) => {
                        const total = progressEvent.total || 1; 
                        const progress = Math.round((progressEvent.loaded / total) * 100);
                        setUploadProgress(progress);
                    },
                    timeout: 300000, 
                });

                if (response.status === 200) {
                    setUploadSuccess(true);
                    setUploadError(false);
                } else {
                    throw new Error('Erro no envio do arquivo');
                }
            } catch (error) {
                console.error('Erro de upload:', error);
                setUploadError(true);
                setUploadSuccess(false);
            } finally {
                setIsLoading(false);
            }
        } else {
            alert('Selecione um arquivo antes de enviar.');
        }
    };

    return (
    <>
        <Helmet title="Anominização de Dados" />
        {/* Adicionado padding no container geral para telas pequenas */}
        <div className="relative flex justify-center items-start min-h-screen overflow-hidden p-4 sm:p-6 md:p-8">
            {/* Padding interno do card foi ajustado para ser menor em telas pequenas */}
            <div className="w-full max-w-4xl p-4 sm:p-6 md:p-8 bg-slate-950 rounded-lg shadow-md">
                {/* Tamanho da fonte do título ajustado */}
                <h1 className="relative z-10 mb-6 sm:mb-8 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-center text-xl sm:text-2xl font-extrabold tracking-tight text-transparent">
                    Faça o upload de um arquivo PDF para anonimizar dados sensíveis.
                </h1>

                {/* Bloco do seletor de arquivo (nenhuma mudança necessária aqui) */}
                <div className="mb-4">
                    <label htmlFor="file-upload" className="block text-sm font-medium text-gray-400">
                        Selecione um arquivo PDF:
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="mt-2 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition-colors"
                    />
                </div>

                {/* Bloco de arquivo selecionado: agora é flexível e se adapta à tela */}
                {fileName && !isLoading && (
                    <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-slate-900 rounded-lg">
                        {/* Adicionado 'truncate' para evitar quebra com nomes de arquivo longos */}
                        <p className="text-sm text-gray-300 truncate">
                            Arquivo: <strong className="font-medium text-cyan-400">{fileName}</strong>
                        </p>
                        <button
                            onClick={handleRemoveFile}
                            // Botão agora ocupa a largura toda em telas pequenas
                            className="w-full sm:w-auto px-3 py-1.5 text-sm font-medium text-red-400 border border-red-400 rounded-md hover:bg-red-400 hover:text-slate-950 transition-colors"
                        >
                            Remover
                        </button>
                    </div>
                )}

                {/* Indicador de Progresso de Upload (nenhuma mudança necessária) */}
                {uploadProgress > 0 && !isLoading && (
                     <div className="mb-4">
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div
                                className="bg-violet-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                        <p className="text-sm font-semibold text-gray-400 mt-1 text-right">{uploadProgress}% enviado</p>
                    </div>
                )}
                
                {/* Mensagens de Sucesso e Erro (nenhuma mudança necessária) */}
                {uploadSuccess && (
                    <div className="mb-4 text-center p-3 bg-green-900/50 rounded-lg">
                        <p className="text-green-400 font-medium">Anonimização realizada com sucesso! ✅</p>
                    </div>
                )}
                {uploadError && (
                    <div className="mb-4 text-center p-3 bg-red-900/50 rounded-lg">
                        <p className="text-red-400 font-medium">Erro ao anonimizar os dados. ❌</p>
                    </div>
                )}

                {/* Indicador de Carregamento (nenhuma mudança necessária) */}
                {isLoading && (
                    <div className="mb-4 w-full flex flex-col items-center gap-2">
                        <p className="text-sm font-semibold text-gray-400 mt-1">Anonimizando os dados...</p>
                        <BarLoader className="flex-grow" color="#6366f1" width="100%" />
                    </div>
                )}

                {/* Botão de Ação Principal: agora ocupa a largura toda no celular */}
                <div className="mt-6 flex justify-center">
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading || !selectedFile}
                        className="w-full py-3 sm:py-2 sm:w-auto sm:px-6 text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 transition-all duration-300 transform sm:hover:scale-105 disabled:opacity-50 disabled:transform-none"
                    >
                        Anonimizar Arquivo
                    </Button>
                </div>
            </div>
        </div>
    </>
);
}
