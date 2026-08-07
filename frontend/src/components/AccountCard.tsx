import { useContext, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"
import { useAccount } from "../hooks/useAccount";
import Loading from "./Loading";
import type { EditAccountData } from "../types/api/Request";
import { accountContext } from "../types/context";
import type { AccountResponse } from "../types/api/Response";
import { FaTrashAlt } from "react-icons/fa";
import DeleteAccountModal from "./DeleteAccountModal";

type props = {
    x: number,
    y: number,
    acc: AccountResponse | undefined,
    menuControl: {view: boolean, setterFunc: Dispatch<SetStateAction<boolean>>}
}
export default function AccountCard( data: props ) {

    const menuRef = useRef<HTMLDivElement>(null);

    const { editAccount } = useAccount(data.acc ? data.acc.id : "");

    const { accountUpdated } = useContext(accountContext);

    const view = data.menuControl.view;
    const setMenuView = (state: boolean) => data.menuControl.setterFunc(state);
    
    const [x] = useState<number>(data.x);
    const [y] = useState<number>(data.y);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const sendAccountEdition = async (newNick: string) => {
        setEditMode(false);
        const editData: EditAccountData = {
            nickname: newNick
        }
        await editAccount(editData);
        accountUpdated();
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendAccountEdition(e.currentTarget.value);
        }
    }

    useEffect(() => {
        if (!view) return;
        
        const handleClickOutside = (e: MouseEvent) => {
            // Se o clique foi fora do container pai, fecha o dropdown
            if (menuRef.current && !menuRef.current.contains(e.target as Node) && !showDeleteModal) {
                setMenuView(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [view, showDeleteModal]);

    return (
        <>
            <div className={`absolute w-[400px] h-fit flex flex-col items-center justify-center
            bg-lead-600 border-2 border-lead-200 rounded-[12px] p-5 z-20`}
                style={{ top: `${y}px`, left: `${x}px` }}
                ref={menuRef}>
                {
                    data.acc ? (
                        <>
                            <div className="min-w-full flex flex-col items-end juistify-center">
                                <button className="text-crimson-500 hover:cursor-pointer hover:scale-[1.5]
                                    transition-all"
                                    onClick={() => setShowDeleteModal(true)}>
                                    <FaTrashAlt size={16} />
                                </button>  
                            </div>
                            <div className="w-full flex items-center juistify-center text-crimson-500 text-[22px]">
                                {
                                    editMode ? (
                                        <input autoFocus={true} className="font-bold
                                        outline-none" defaultValue={data.acc.nick} onKeyDown={(e) => handleKeyDown(e)}
                                        onBlur={(e) => sendAccountEdition(e.currentTarget.value)}/>
                                    ) : (
                                        <p className="text-center" onDoubleClick={() => setEditMode(true)}>{data.acc.nick}</p>
                                    )
                                }
                                
                            </div>
                            <div className="w-full flex items-center juistify-center">
                                <p className="text-lead-300 text-[22px]">Email: {data.acc.email}</p>
                            </div>
                        </> 
                    ) : (
                        <Loading size={24} />
                    )
                }
            </div>

            {
                showDeleteModal && data.acc && (
                    <DeleteAccountModal account={data.acc} setView={setShowDeleteModal}/>
                )
            }
        </>
    );

}