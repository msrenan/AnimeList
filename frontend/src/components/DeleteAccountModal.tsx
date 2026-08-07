import { IoMdClose } from "react-icons/io";
import type { AccountResponse } from "../types/api/Response"
import { useContext, type Dispatch, type SetStateAction } from "react";
import { accountContext } from "../types/context";
import { useAccount } from "../hooks/useAccount";

type props = {
    account: AccountResponse
    setView: Dispatch<SetStateAction<boolean>>
}

export default function DeleteAccountModal(data: props) {

    const { logout } = useContext(accountContext);

    const { deleteAccount } = useAccount(data.account.id);

    return (
        <div className="flex absolute z-10 top-0 left-0 w-full h-full backdrop-blur-md
        justify-center items-center">
            <div className="w-[600px] h-[400px] bg-crimson-950 border-4 border-lead-200 rounded-[16px]
            p-5">
                <div className="w-full flex justify-end">
                    <button className="border-2 border-lead-600 text-lead-600 hover:border-lead-200
                    hover:text-lead-200 hover:cursor-pointer transition-all duration-75"
                    onClick={() => data.setView(false)}>
                        <IoMdClose size={28} />
                    </button>
                </div>
                <h1 className="font-bold text-[28px] text-lead-300 text-center mb-5">
                    Você tem certeza que deseja deletar a conta de: <span className="text-crimson-200">{data.account.nick}</span>?
                </h1>
                <div className="flex flex-col justify-center items-center gap-3">
                    <p className="text-lead-300 text-[20px]">Esta ação é <span className="font-bold text-crimson-200">irreversível</span>.</p>
                </div>
                <div className="flex items-center justify-center gap-8 mt-[70px]">
                    <button className="w-[220px] h-[50px] rounded-[12px] bg-lead-600 text-lead-100
                        flex justify-center items-center gap-1 hover:cursor-pointer
                        hover:-translate-y-0.5 hover:bg-lead-800 transition-all"
                        onClick={async () => {
                            console.log("Deleting")
                            await deleteAccount();
                            logout();
                        }}>
                        <p className="font-bold text-[28px]">Deletar</p>
                    </button>
                    <button className="genericButton" onClick={() => data.setView(false)}>
                        <p className="font-bold text-[28px]">Cancelar</p>
                    </button>
                </div>
            </div>
        </div>
    );

}