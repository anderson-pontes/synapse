import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div className="flex h-screen flex-col items-center justify-center gap-2">
    <h1 className="mb-8 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent">Página em Construção</h1>
    <p className="text-slate-300">
      Voltar para a página <Link to="/" className="text-violet-600 dark:text-violet-400">Inicial</Link>
    </p>
  </div>
);
