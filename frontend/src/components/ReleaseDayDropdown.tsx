import { useContext, useEffect, useRef, useState } from "react";
import { ReleaseDay } from "../types/enum";
import { animeFormContext } from "../types/context";

type props = {
    initialValue?: ReleaseDay
}

export default function ReleaseDayDropdown(data: props) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentOption, setCurrentOption] = useState<string>(data.initialValue ? data.initialValue : "");

    const containerRef = useRef<HTMLDivElement>(null);

    const { setReleaseDay } = useContext(animeFormContext);

    const OPTIONS = [ReleaseDay.Domingo, ReleaseDay.Segunda, ReleaseDay.Terca, ReleaseDay.Quarta, ReleaseDay.Quinta, ReleaseDay.Sexta, ReleaseDay.Sabado];

    const handleOptionChosen = (choice: ReleaseDay) => {
        setIsOpen(false);
        setCurrentOption(choice);
        setReleaseDay(choice);
    }

    const handleToggleDropdown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            // Se o clique foi fora do container pai, fecha o dropdown
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        /* O container pai DEVE ser "relative" */
        <div ref={containerRef} className="relative inline-block w-full">
            
            {/* O Trigger (Botão) */}
            <div onClick={handleToggleDropdown} className="cursor-pointer rounded-lg border border-lead-700
            bg-lead-900 px-4 py-2 text-[28px] text-lead-400 outline-none transition-all focus:border-lead-700 
            focus:ring-1 focus:ring-lead-700">
                <div>{currentOption === "" ? "Dia que Atualiza" : currentOption}</div>
            </div>

            {/* O Dropdown */}
            {isOpen && (
                <div 
                    /*  absolute: flutua. 
                        top-full: cola exatamente na base do botão. 
                        left-0: alinha com o lado esquerdo do botão. 
                        mt-1: dá uma margemzinha de respiro. */
                    className="absolute top-full left-0 mt-1 z-50 bg-lead-900 border-2 border-lead-700
                    rounded-[4px] max-sm:w-[170px] min-w-full shadow-lg"
                >
                    <ul className="flex flex-col text-lead-400">
                        {OPTIONS.map((opt) => (
                            /* Bônus: <li> deve ser filho direto de <ul>. Removi a <div> que estava no meio */
                            <li 
                                key={opt} 
                                className="px-4 py-2 hover:bg-lead-800 cursor-pointer transition-colors"
                                onClick={() => handleOptionChosen(opt)} // Fecha ao selecionar
                            >
                                {opt}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}