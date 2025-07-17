import { Helmet } from "react-helmet-async";
import imgMaps from "@/assets/servidor.png";
import imgSaneamento from "@/assets/tecnologia-de-ia.png";
import imgIndicadores from "@/assets/teste-de-software.png";
import imgDadosPrivados from "@/assets/inteligencia-artificial.png";
import imgCamara from "@/assets/nuvem-de-ia.png";
import imgDespesa from "@/assets/nos-de-ia.png";
import imgBancoAtos from "@/assets/codificacao.png";
import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

export function Home() {
    const flashcards = [
        // Seu array de flashcards continua o mesmo...
        {
            title: "ANONIMIZAÇÃO DE DADOS",
            description: "Automatize as práticas exigidas pela LGPD e outras regulamentações de privacidade.",
            image: imgDadosPrivados,
            route: "/acompanhamentodeprodutividade",
        },
        {
            title: "MÓDULO 2",
            description: "Panorama financeiro das câmaras municipais paraenses",
            image: imgCamara,
            route: "/camarasemfoco",
        },
        {
            title: "MÓDULO 3",
            description: "Panorama das despesas dos municípios paraenses",
            image: imgDespesa,
            route: "/panoramamunicipal"
        },
        {
            title: "MÓDULO 4",
            description: "Informações de Saneamento Básico disponibilizadas no Sistema Nacional de Informações sobre Saneamento - SNIS",
            image: imgSaneamento,
            route: "/saneamento",
        },
        {
            title: "MÓDULO 5",
            description: "Indicadores de Saneamento Básico disponibilizadas no Sistema Nacional de informações sobre Saneamento - SNIS",
            image: imgIndicadores,
            route: "/indicadores",
        },
        {
            title: "MÓDULO 6",
            description: "Levantamento das pessoas jurídicas subordinadas à jurisdição do TCE-PA",
            image: imgMaps,
            route: "/jurisdicionados",
        },
        {
            title: "MÓDULO 7",
            description: "Consulta abrangente de atos normativos da base de dados do TCE-PA",
            image: imgBancoAtos,
            route: "/pesquisaintegrada",
        },
    ];

    return (
        <>
            <Helmet title="Home" />
            {/* Fundo escuro para a página inteira */}
            <div className="min-h-screen bg-slate-950 p-6 sm:p-8">

                {/* Título com gradiente no texto */}
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
                                    <p className="text-sm text-slate-400">{card.description}</p>
                                </div>

                                {/* Verso do Card (com gradiente harmônico) */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-indigo-800 to-slate-900 p-6 text-center text-white rotate-y-180 backface-hidden">
                                    <h1 className="text-lg font-semibold">{card.title}</h1>
                                    <Link to={card.route || "/"}>
                                        <Button variant="secondary">
                                            <Eye className="mr-2 h-5 w-5" />
                                            Saiba mais
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}