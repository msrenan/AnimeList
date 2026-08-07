import { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { listsContext } from "../types/context";
import type { AnimeListData } from "../types/api/Request";
import AnimeSelection from "./AnimeSelection";


export default function ListCreationForm() {
    const [name, setName] = useState<string>("");
    const [ids, setIds] = useState<string[]>([]);
    const { setAddList } = useContext(listsContext);

    const sendList = () => {
        if (name.trim() === "") return;
        const newList: AnimeListData = {
            name,
            animeIds: ids
        }

        setAddList(false, newList);
    }

    const sendIds = (list: string[]) => {
        setIds(list);
    }

    return(
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[500px] bg-crimson-900 border-2
        border-lead-300 -translate-x-[300px] -translate-y-[250px] rounded-[16px] flex flex-col
        p-3 items-center gap-5">
            <div className="flex w-full items-center justify-end">
                <button className="border-2 border-lead-300 text-lead-300 hover:border-crimson-200
                hover:text-crimson-200 hover:cursor-pointer transition-all duration-75"
                onClick={() => setAddList(false)}>
                    <IoMdClose size={28} />
                </button>
            </div>
            <div className="w-full flex items-center justify-center mb-5">
                <h1 className="text-lead-300 font-bold text-[32px]">Adicione uma Nova Lista!</h1>
            </div>
            <div className="relative w-full">
                <input
                    id={"titleInput"}
                    /* O truque do CSS: um espaço em branco no placeholder */
                    placeholder=" "
                    onBlur={(e) => setName(e.currentTarget.value)}
                    className="peer w-full rounded-lg border border-lead-700 bg-lead-900 px-4 py-2 text-[28px] text-white outline-none transition-all focus:border-lead-700 focus:ring-1 focus:ring-lead-700"
                />
                
                <label
                    htmlFor={"titleInput"}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[32px] text-lead-400 transition-all duration-200 ease-out 
                    /* Quando o input está focado */
                    peer-focus:-top-8 peer-focus:translate-y-0 peer-focus:text-[20px] peer-focus:font-medium peer-focus:text-crimson-400
                    /* Quando o input NÃO está vazio (tem texto digitado) */
                    peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[20px] peer-[:not(:placeholder-shown)]:text-crimson-500"
                >
                    {"Nome da Lista"}
                </label>
            </div>
            <div className="w-full h-full overflow-hidden flex items-center">
                <AnimeSelection sendData={sendIds}/>
            </div>
            <div className="w-full flex items-center justify-center">
                <button className="genericButton">
                    <p className="font-bold text-[22px]"
                    onClick={() => sendList()}>Adicionar Lista</p>
                </button>
            </div>
        </div>
    );

}