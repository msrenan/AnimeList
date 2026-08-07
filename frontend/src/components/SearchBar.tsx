import { SlMagnifier } from "react-icons/sl";
import { searchContext } from "../types/context";
import { useContext } from "react";


export default function SearchBar() {

    const { setQuery } = useContext(searchContext);

    return(
        <div className="w-[800px] h-[80px] flex px-5 items-center gap-5 shrink-0">
            
            <input 
                className="order-2 border-b-2 border-lead-400 w-full outline-0 text-[28px] text-crimson-600
                focus:border-crimson-900 transition-all peer/input"
                placeholder=" "
                onChange={(e) => setQuery(e.currentTarget.value)}
            />
            <div className="order-1 text-lead-400 peer-focus/input:text-crimson-900 transition-all">
                <SlMagnifier size={32} />
            </div>
        </div>
    );

}