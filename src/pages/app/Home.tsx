import { Helmet } from 'react-helmet-async';
import imgServidor from '@/assets/servidor.png';
import imgTecnologiaIA from '@/assets/tecnologia-de-ia.png';
import imgTeste from '@/assets/teste-de-software.png';
import imgDadosPrivados from '@/assets/inteligencia-artificial.png';
import imgNuvem from '@/assets/nuvem-de-ia.png';
import imgIA from '@/assets/nos-de-ia.png';
import imgCodificacao from '@/assets/codificacao.png';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { AnimatedBackground } from '../../components/components_project/AnimatedBackgroun';

export function Home() {
    const flashcards = [
        
        {
            title: 'ANONIMIZAÇÃO DE DADOS',
            description:
                'Automatize as práticas exigidas pela LGPD e outras regulamentações de privacidade.',
            image: imgDadosPrivados,
            route: 'uploadpdf',
        },
        {
            title: 'MÓDULO 2',
            description:
                'O centro de controle do seu escritório, onde cada prazo e tarefa estão sob seu domínio.',
            image: imgNuvem,
            route: '/manutencao',
        },
        {
            title: 'MÓDULO 3',
            description:
                'Alertas e notificações automáticas com base nas publicações dos diários oficiais e andamentos dos tribunais.',
            image: imgIA,
            route: '/manutencao',
        },
        {
            title: 'MÓDULO 4',
            description:
                'Linha do tempo interativa com todos os eventos, documentos e comunicações.',
            image: imgTecnologiaIA,
            route: '/manutencao',
        },
        {
            title: 'MÓDULO 5',
            description:
                'Crie documentos a partir de modelos dinâmicos preenchidos com os dados do caso.',
            image: imgTeste,
            route: '/manutencao',
        },
        {
            title: 'MÓDULO 6',
            description:
                'Encontre informações em qualquer documento, incluindo PDFs escaneados, através de buscas por contexto.',
            image: imgServidor,
            route: '/manutencao',
        },
        {
            title: 'MÓDULO 7',
            description:
                'Estatísticas sobre taxas de sucesso, tempo médio de julgamento e valores de condenação.',
            image: imgCodificacao,
            route: '/manutencao',
        },
    ];

    return (
        <>
            <Helmet title="Home" />
            {/* Fundo escuro para a página inteira */}
            <div className="relative min-h-screen bg-slate-950 p-6 sm:p-8 overflow-hidden">
                <AnimatedBackground />
                {/* Título com gradiente no texto */}

                <div className="relative z-10">

                    <h1 className="mb-8 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent">
                    Bem-vindo ao Portal Synapse!
                </h1>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {flashcards.map((card, index) => (
                        <div
                            key={index}
                            className="group relative h-64 w-full perspective-1000"
                        >
                            {/* Container 3D */}
                            <div className="relative h-full w-full transform-style-3d transition-transform duration-700 ease-in-out group-hover:rotate-y-180">
                                {/* Frente do Card (agora escura) */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center shadow-lg backface-hidden">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="mb-4 h-16 w-16"
                                    />
                                    <h2 className="mb-2 text-lg font-semibold text-slate-200">
                                        {card.title}
                                    </h2>
                                    <p className="text-sm text-slate-400">
                                        {card.description}
                                    </p>
                                </div>

                                {/* Verso do Card (com gradiente harmônico) */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-indigo-800 to-slate-900 p-6 text-center text-white rotate-y-180 backface-hidden">
                                    <h1 className="text-lg font-semibold">
                                        {card.title}
                                    </h1>
                                    {card.route.startsWith('http') ? (
                                        <a
                                            href={card.route}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button variant="secondary">
                                                <Eye className="mr-2 h-5 w-5" />
                                                Saiba mais
                                            </Button>
                                        </a>
                                    ) : (
                                        <Link to={card.route}>
                                            <Button variant="secondary">
                                                <Eye className="mr-2 h-5 w-5" />
                                                Saiba mais
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                </div>
                
            </div>
        </>
    );
}
