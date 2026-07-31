import { GoHomeFill } from "react-icons/go";
import { LuListVideo } from "react-icons/lu";
import { MdAccountCircle, MdLocalMovies } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { useNavigate } from "react-router";

export default function Navbar() {

    const navigate  = useNavigate();

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
                                        hover:-translate-y-0.5 transition-all">
                        <MdAccountCircle size={32}/>
                    </button>
                    <button className="text-lead-200 hover:text-lead-400 hover:cursor-pointer
                                        hover:-translate-y-0.5 transition-all">
                        <SlOptions size={28} />
                    </button>
                </div>
            </div>
        </>
    );

}