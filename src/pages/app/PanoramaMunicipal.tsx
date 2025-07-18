import { Helmet } from 'react-helmet-async';

export function PanoramaMunicipalDespesas() {
    return (
        <>
            <Helmet title="Panorama Municipal - Despesas" />
            {/* Este container flex vai crescer para preencher todo o espaço 
                disponível que o <main> do nosso AppLayout oferece.
            */}
            <div className="flex flex-1 flex-col">
                <iframe
                    className="h-full w-full flex-1" // flex-1 aqui também para garantir o preenchimento
                    title="AB_Despesas"
                    src="https://anonimizacao.streamlit.app/"
                    allowFullScreen={true}
                    style={{ border: 'none' }}
                >
                    <p>Seu navegador não suporta iframes.</p>
                </iframe>
            </div>
        </>
    );
}