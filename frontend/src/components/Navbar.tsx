import { useContext, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { LuListVideo } from "react-icons/lu";
import { MdAccountCircle, MdLocalMovies } from "react-icons/md";
import { useNavigate } from "react-router";
import { accountContext } from "../types/context";
import { IoExit } from "react-icons/io5";
import AccountCard from "./AccountCard";

export default function Navbar() {

    const navigate  = useNavigate();

    const { account, logout } = useContext(accountContext);

    const [showAccount, setShowAccount] = useState<boolean>(false);
    const [accCardCoords, setAccCardCoords] = useState<{x: number, y: number}>({x: 0, y: 0});

    return(
        <>
            <div className="w-full flex h-[80px] bg-app-border shadow-md rounded-[16px]
                            items-center px-5 justify-between">
                <p className="font-bold text-[32px] shrink-none">AnimeList</p>
                <div className="flex justify-center items-center space-x-2 h-full w-full">
                    <button className="navbarButton" onClick={() => navigate("/home")}>
                        <GoHomeFill size={28} />
                        Home
                    </button>
                    <button className="navbarButton" onClick={() => navigate("/anime")}>
                        <MdLocalMovies size={28} />
                        Animes
                    </button>
                    <button className="navbarButton" onClick={() => navigate("/list")}>
                        <LuListVideo size={28} />
                        My Lists
                    </button>
                </div>
                <div className="flex justify-center items-center space-x-5 shrink-none">
                    <button className="text-lead-200 hover:text-lead-400 hover:cursor-pointer
                                        hover:-translate-y-0.5 transition-all"
                    onClick={(e) => {
                        setAccCardCoords({x: e.clientX - 400, y: e.clientY})
                        setShowAccount(true);
                    }}                    
                    >
                        <MdAccountCircle size={32}/>
                    </button>
                    <button className="text-lead-200 hover:text-lead-400 hover:cursor-pointer
                                        hover:-translate-y-0.5 transition-all"
                    onClick={() => logout()}
                    >
                        <IoExit size={28} />
                    </button>
                </div>
            </div>

            {showAccount && (
                <AccountCard acc={account} x={accCardCoords.x} y={accCardCoords.y} menuControl={{view: showAccount, setterFunc: setShowAccount}} />
            )}

        </>
    );

}