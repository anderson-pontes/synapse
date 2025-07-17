import { useState } from "react";
import { Home, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "@/assets/synapse2.png";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    const navLinkClasses = "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors";
    
    const getActiveLinkClasses = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? `${navLinkClasses} bg-slate-800 text-slate-50`
            : `${navLinkClasses} text-slate-400 hover:bg-slate-800 hover:text-slate-50`;
    
    return (
        // 👇 A MUDANÇA ESTÁ AQUI 👇
        <header className="sticky top-0 z-50 w-full border-b border-indigo-300/10 bg-gradient-to-r from-indigo-950 to-slate-950">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo e Título */}
                <NavLink to="/" onClick={closeMenu} className="flex items-center gap-3">
                    <img className="h-10 w-auto" src={Logo} alt="Logo Synapse" />
                    <span className="text-xl font-bold tracking-tight text-slate-200">
                        Portal Synapse
                    </span>
                </NavLink>

                {/* Navegação para Desktop */}
                <nav className="hidden items-center space-x-2 lg:flex">
                    <NavLink to="/" className={getActiveLinkClasses}>
                        <Home className="h-4 w-4" />
                        Home
                    </NavLink>
                </nav>

                {/* Botão do Menu Mobile */}
                <div className="lg:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menu">
                        {isMenuOpen ? (
                            <X className="h-6 w-6 text-slate-300" />
                        ) : (
                            <Menu className="h-6 w-6 text-slate-300" />
                        )}
                    </button>
                </div>
            </div>

            {/* Menu Mobile como Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-16 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden">
                    <nav className="container mx-auto flex flex-col space-y-4 px-4 pt-4">
                        <NavLink to="/" onClick={closeMenu} className={getActiveLinkClasses}>
                            <Home className="h-4 w-4" />
                            Home
                        </NavLink>
                    </nav>
                </div>
            )}
        </header>
    );
}