import { Helmet } from 'react-helmet-async';

export function AcompanhamentoProdutividade() {
    return (
        <>
            <Helmet title="Acompanhamento de Produtividade" />
            <div className="h-screen w-screen flex overflow-hidden">
                <iframe
                    title="AB_Produtividade"
                    className="w-full h-full"
                    src="https://app.powerbi.com/view?r=eyJrIjoiN2JmNGE2OGUtZjJhOS00MjgzLWI2M2MtZTQ1OGVjNzQ1ZWE1IiwidCI6IjA2YjQ3Y2UyLWZmN2UtNDRjOS05M2ExLTEwZDVhYTE4M2RlNCJ9"
                    allowFullScreen
                    style={{ border: 'none' }}
                />
            </div>
        </>
    );
}
