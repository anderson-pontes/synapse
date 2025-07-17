import { Helmet } from 'react-helmet-async';

export function PanoramaMunicipalDespesas() {
    return (
        <>
            <Helmet title="Panorama Municipal - Despesas" />
            <div className="h-screen w-screen flex overflow-hidden">
                
                     <iframe
                         className="w-full h-full"
                        title="AB_Despesas"
                        src="https://app.powerbi.com/view?r=eyJrIjoiN2M0YmY1NzMtNjQzZi00NzE3LTgxMzQtM2Q4YTAxN2Q3MjA5IiwidCI6IjA2YjQ3Y2UyLWZmN2UtNDRjOS05M2ExLTEwZDVhYTE4M2RlNCJ9"
                        allowFullScreen={true}
                        style={{
                            border: 'none',
                        }}

                    >
                    </iframe>             
               
            </div>
        </>
    );
}
