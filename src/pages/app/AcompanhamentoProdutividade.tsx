import { Helmet } from 'react-helmet-async';

export function AcompanhamentoProdutividade() {
    return (
        <>
            <Helmet title="Panorama Municipal - Despesas" />
            <div className="flex flex-1 flex-col items-center justify-center min-h-screen text-center p-8">
                <h1 className="text-2xl font-semibold mb-4">Panorama Municipal - Despesas</h1>
                <p className="mb-6 text-gray-700">
                    O conteúdo desejado está hospedado em uma aplicação externa. Clique no botão abaixo para acessá-lo em uma nova aba.
                </p>
                <a
                    href="https://anonimizacao.streamlit.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors"
                >
                    Acessar o painel externo
                </a>
            </div>
        </>
    );
}
