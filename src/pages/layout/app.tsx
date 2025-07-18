import { Header } from '@/components/components_project/Header';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatedBackground } from '../../components/components_project/AnimatedBackgroun';

export function AppLayout() {
    const { pathname } = useLocation();

    // A sua lógica para páginas de tela cheia está perfeita, vamos mantê-la.
    const fullscreenPages = [
        '/camarasemfoco',
        '/panoramamunicipal',
        '/acompanhamentodeprodutividade',
    ];
    const isFullscreenPage = fullscreenPages.includes(pathname);

    return (
        // 👇 Fundo principal da aplicação definido aqui.
        <div className="relative flex min-h-screen flex-col antialiased bg-slate-950 overflow-hidden">
            <AnimatedBackground />
            {/* O Header já tem seu próprio estilo sticky e de fundo, não precisa de um wrapper. */}
            <Header />

            {/* O container do conteúdo principal agora herda o fundo. */}
            <main
                className={`flex flex-1 flex-col ${
                    isFullscreenPage ? 'p-0' : 'p-6 md:p-8'
                }`}
            >
                <Outlet />
            </main>

            {/* Footer integrado ao tema escuro. */}
            <footer className="relative z-10 w-full p-4 text-center text-sm text-slate-500">
                Copyright &copy; {new Date().getFullYear()} | Todos os direitos
                reservados.
            </footer>
        </div>
    );
}
