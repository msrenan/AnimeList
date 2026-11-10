import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { GoHomeFill } from "react-icons/go";
import { LuListVideo } from "react-icons/lu";
import { MdLocalMovies, MdAccountCircle } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import { accountContext } from "../types/context";
import AccountCard from "./AccountCard";
import { initials } from "../utils/anime";

const NAV_ITEMS = [
  { path: "/home", label: "Início", icon: GoHomeFill },
  { path: "/anime", label: "Animes", icon: MdLocalMovies },
  { path: "/list", label: "Minhas listas", icon: LuListVideo },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { account, logout } = useContext(accountContext);
  const [showAccount, setShowAccount] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path || (path === "/list" && location.pathname.startsWith("/list"));

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-lead-800/80 bg-lead-950/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[1500px] items-center justify-between gap-4 px-4 md:h-[72px] md:px-8">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="group flex shrink-0 cursor-pointer items-center gap-3"
            aria-label="Ir para o início"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-crimson-500 to-crimson-800 text-white shadow-[0_8px_24px_-8px_rgba(225,29,72,0.8)] transition-transform duration-300 group-hover:scale-105">
              <MdLocalMovies size={20} />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Anime<span className="text-crimson-400">List</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
              <button
                key={path}
                type="button"
                onClick={() => navigate(path)}
                className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive(path)
                    ? "bg-crimson-600/15 text-crimson-200 ring-1 ring-crimson-500/30"
                    : "text-lead-300 hover:bg-lead-800/80 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setShowAccount((current) => !current)}
              className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-lead-800/80"
              aria-label="Abrir perfil"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-lead-600 to-lead-800 text-sm font-bold text-white ring-1 ring-lead-600">
                {account ? initials(account.nick) : <MdAccountCircle size={20} />}
              </span>
              <span className="hidden max-w-[120px] truncate text-sm font-semibold text-lead-200 sm:block">
                {account?.nick ?? "Perfil"}
              </span>
              <FiChevronDown
                size={16}
                className={`hidden text-lead-400 transition-transform duration-200 sm:block ${
                  showAccount ? "rotate-180" : ""
                }`}
              />
            </button>

            <button
              type="button"
              onClick={logout}
              className="btn-icon"
              aria-label="Sair"
              title="Sair da conta"
            >
              <IoExit size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Navegação mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-lead-800 bg-lead-950/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around py-1.5">
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
            <button
              key={path}
              type="button"
              onClick={() => navigate(path)}
              className={`flex flex-1 cursor-pointer flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-semibold transition-colors ${
                isActive(path) ? "text-crimson-300" : "text-lead-400 hover:text-lead-200"
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>
      </nav>

      {showAccount && <AccountCard onClose={() => setShowAccount(false)} />}
    </>
  );
}
