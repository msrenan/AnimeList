import { useContext, useEffect } from "react";
import { accountContext } from "../types/context";


export default function Home() {

    const {accountId} = useContext(accountContext);

    useEffect(() => {
        console.log(`Id: ${accountId}`)
    }, [accountId])

    return(
        <>
        
            <div className="w-full h-full flex flex-col">
                
            </div>

        </>
    );

}