import { Helmet } from 'react-helmet-async';

export function CamarasEmFoco() {
  return (
    <>
      <Helmet title="Câmaras em Foco" />
      <div className="h-screen w-screen flex overflow-hidden">
        <iframe
          title="AB_Camaras"
          className="w-full h-full"
          src="https://app.powerbi.com/view?r=eyJrIjoiMWRkNGQ4YjYtM2FmMi00MTVmLTlkMjYtODJjYWZhNDM3YmUzIiwidCI6IjA2YjQ3Y2UyLWZmN2UtNDRjOS05M2ExLTEwZDVhYTE4M2RlNCJ9"
          allowFullScreen
          style={{ border: 'none' }}
        />
      </div>
    </>
  );
}
