import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // 👈 Importe o Helmet

export const NotFound = () => (
    <div className="relative flex h-screen flex-col items-center justify-center gap-2 overflow-hidden text-center">
        {/* 👇 Adicione o Helmet para definir o título da página */}
        <Helmet title="Página em Construção" />
        
        <div className="relative z-10">
            <h1 className="mb-8 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
                Página em Construção
            </h1>

            <p className="text-slate-300">
                Voltar para a página{' '}
                <Link to="/" className="text-violet-600 dark:text-violet-400">
                    Inicial
                </Link>
            </p>
        </div>
    </div>
);