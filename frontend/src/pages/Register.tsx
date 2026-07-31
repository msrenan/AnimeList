import { useNavigate } from "react-router";


export default function Register() {

    const navigate = useNavigate();

    return(
        <>
        
            <div className="absolute top-1/2 left-1/2 -translate-x-[400px]
                            -translate-y-[400px] bg-lead-800 w-[800px] h-[800px]
                            rounded-[16px] shadow-md flex flex-col items-center p-5 gap-[60px]">
                
                <h1 className="font-bold text-[48px]">Register</h1>
                <div className="relative w-full">
                    <input
                        id={"nick"}
                        /* O truque do CSS: um espaço em branco no placeholder */
                        placeholder=" "
                        className="peer w-full rounded-lg border border-lead-700 bg-lead-900 px-4 py-2 text-[32px] text-white outline-none transition-all focus:border-lead-700 focus:ring-1 focus:ring-lead-700"
                    />
                    
                    <label
                        htmlFor={"nick"}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[32px] text-lead-400 transition-all duration-200 ease-out 
                        /* Quando o input está focado */
                        peer-focus:-top-8 peer-focus:translate-y-0 peer-focus:text-[20px] peer-focus:font-medium peer-focus:text-lead-400
                        /* Quando o input NÃO está vazio (tem texto digitado) */
                        peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[20px] peer-[:not(:placeholder-shown)]:text-lead-500"
                    >
                        {"Nickname"}
                    </label>
                </div>

                <div className="relative w-full">
                    <input
                        id={"email"}
                        /* O truque do CSS: um espaço em branco no placeholder */
                        placeholder=" "
                        className="peer w-full rounded-lg border border-lead-700 bg-lead-900 px-4 py-2 text-[32px] text-white outline-none transition-all focus:border-lead-700 focus:ring-1 focus:ring-lead-700"
                    />
                    
                    <label
                        htmlFor={"email"}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[32px] text-lead-400 transition-all duration-200 ease-out 
                        /* Quando o input está focado */
                        peer-focus:-top-8 peer-focus:translate-y-0 peer-focus:text-[20px] peer-focus:font-medium peer-focus:text-lead-400
                        /* Quando o input NÃO está vazio (tem texto digitado) */
                        peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[20px] peer-[:not(:placeholder-shown)]:text-lead-500"
                    >
                        {"Email"}
                    </label>
                </div>

                <div className="relative w-full">
                    <input
                        id={"pass"}
                        /* O truque do CSS: um espaço em branco no placeholder */
                        placeholder=" "
                        type="password"
                        className="peer w-full rounded-lg border border-lead-700 bg-lead-900 px-4 py-2 text-[32px] text-white outline-none transition-all focus:border-lead-700 focus:ring-1 focus:ring-lead-700"
                    />
                    
                    <label
                        htmlFor={"pass"}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[32px] text-lead-400 transition-all duration-200 ease-out 
                        /* Quando o input está focado */
                        peer-focus:-top-8 peer-focus:translate-y-0 peer-focus:text-[20px] peer-focus:font-medium peer-focus:text-lead-400
                        /* Quando o input NÃO está vazio (tem texto digitado) */
                        peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[20px] peer-[:not(:placeholder-shown)]:text-lead-500"
                    >
                        {"Password"}
                    </label>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <button className="font-bold text-[32px] bg-crimson-500 py-3 px-[50px]
                        rounded-[16px] shadow-md hover:bg-crimson-900 hover:cursor-pointer transition-all">
                        Entrar
                    </button>
                    <p className="font-semibold text-crimson-100 text-[24px] hover:text-crimson-500
                                hover:cursor-pointer transition-all"
                        onClick={() => navigate("/login")}>
                        <u>Já possuí uma conta? Clique aqui para entrar!</u>
                    </p>
                </div>
            </div>
        
        </>
    );

}