import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import BarLoader from 'react-spinners/BarLoader';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/axios';
import { Download, RotateCcw } from 'lucide-react'; // Importar ícone de reset

export function UploadPdf() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [anonymizedFileUrl, setAnonymizedFileUrl] = useState<string | null>(
        null
    );

    useEffect(() => {
        return () => {
            if (anonymizedFileUrl) {
                URL.revokeObjectURL(anonymizedFileUrl);
            }
        };
    }, [anonymizedFileUrl]);

    // Função para resetar todos os estados para o valor inicial
    const handleReset = () => {
        setSelectedFile(null);
        setFileName(null);
        setUploadProgress(0);
        setUploadSuccess(false);
        setUploadError(false);
        setIsLoading(false);
        if (anonymizedFileUrl) {
            URL.revokeObjectURL(anonymizedFileUrl);
            setAnonymizedFileUrl(null);
        }
        // Garante que o valor do input de arquivo seja limpo
        const fileInput = document.getElementById(
            'file-upload'
        ) as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
            setUploadSuccess(false);
            setUploadProgress(0);
            setUploadError(false);
            if (anonymizedFileUrl) {
                URL.revokeObjectURL(anonymizedFileUrl);
                setAnonymizedFileUrl(null);
            }
        }
    };

    const handleRemoveFile = () => {
        handleReset(); // A função de reset já faz tudo que precisamos
    };

    const handleSubmit = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            const token = localStorage.getItem('token');
            setIsLoading(true);
            setUploadSuccess(false);
            setUploadError(false);

            try {
                const response = await api.post('/anonimizar', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                    onUploadProgress: (progressEvent) => {
                        const total = progressEvent.total || 1;
                        const progress = Math.round(
                            (progressEvent.loaded / total) * 100
                        );
                        setUploadProgress(progress);
                    },
                    responseType: 'blob',
                    timeout: 300000,
                });

                if (response.status === 200) {
                    const blob = new Blob([response.data], {
                        type: 'application/pdf',
                    });
                    const url = URL.createObjectURL(blob);

                    setAnonymizedFileUrl(url);
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
            <div className="relative flex justify-center items-start min-h-screen overflow-hidden p-4 sm:p-6 md:p-8">
                <div className="w-full max-w-4xl p-4 sm:p-6 md:p-8 bg-slate-950 rounded-lg shadow-md">
                    <h1 className="relative z-10 mb-6 sm:mb-8 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-center text-xl sm:text-2xl font-extrabold tracking-tight text-transparent">
                        Faça o upload de um arquivo PDF para anonimizar dados
                        sensíveis.
                    </h1>

                    {/* Tela Inicial: Input de arquivo */}
                    {!isLoading && !uploadSuccess && !uploadError && (
                        <>
                            <div className="mb-4">
                                <label
                                    htmlFor="file-upload"
                                    className="block text-sm font-medium text-gray-400"
                                >
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

                            {fileName && (
                                <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-slate-900 rounded-lg">
                                    <p className="text-sm text-gray-300 truncate">
                                        Arquivo:{' '}
                                        <strong className="font-medium text-cyan-400">
                                            {fileName}
                                        </strong>
                                    </p>
                                    <button
                                        onClick={handleRemoveFile}
                                        className="w-full sm:w-auto px-3 py-1.5 text-sm font-medium text-red-400 border border-red-400 rounded-md hover:bg-red-400 hover:text-slate-950 transition-colors"
                                    >
                                        Remover
                                    </button>
                                </div>
                            )}

                            <div className="mt-6 flex justify-center">
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!selectedFile}
                                    className="w-full py-3 sm:py-2 sm:w-auto sm:px-6 text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 transition-all duration-300 transform sm:hover:scale-105 disabled:opacity-50 disabled:transform-none"
                                >
                                    Anonimizar Arquivo
                                </Button>
                            </div>
                        </>
                    )}

                    {/* Tela de Sucesso */}
                    {uploadSuccess && (
                        <div className="text-center p-4 space-y-4">
                            <div className="p-3 bg-green-900/50 rounded-lg">
                                <p className="text-green-400 font-medium">
                                    Anonimização realizada com sucesso! ✅
                                </p>
                            </div>

                            {/* Container responsivo para os botões de ação */}
                            <div className="flex flex-col sm:flex-row sm:justify-center gap-3">
                                <a
                                    href={anonymizedFileUrl ?? undefined}
                                    download={`anonimizado_${fileName}`}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    <Download className="h-4 w-4" />
                                    Baixar Arquivo
                                </a>
                                <Button
                                    onClick={handleReset}                                   
                                    className="w-full py-3 sm:py-2 sm:w-auto sm:px-6 text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 transition-all duration-300 transform sm:hover:scale-105 disabled:opacity-50 disabled:transform-none"
                                >
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Enviar Outro Arquivo
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Tela de Erro */}
                    {uploadError && (
                        <div className="text-center p-4 space-y-4">
                            <div className="p-3 bg-red-900/50 rounded-lg">
                                <p className="text-red-400 font-medium">
                                    Erro ao anonimizar os dados. ❌
                                </p>
                            </div>
                            <Button
                                onClick={handleReset}
                                variant="outline"
                                className="w-full sm:w-auto text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white"
                            >
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Tentar Novamente
                            </Button>
                        </div>
                    )}

                    {/* Tela de Carregamento */}
                    {isLoading && (
                        <div className="mb-4 w-full flex flex-col items-center gap-2">
                            <p className="text-sm font-semibold text-gray-400 mt-1">
                                {uploadProgress < 100
                                    ? `Enviando ${uploadProgress}%`
                                    : 'Processando arquivo...'}
                            </p>
                            <BarLoader
                                className="flex-grow"
                                color="#6366f1"
                                width="100%"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
