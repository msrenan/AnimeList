import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

type props = {
    size: number
}

export default function Loading(data: props) {

    const [size, setSize] = useState<number>(data.size);

    useEffect(() => {
        const updateSize = () => {
            setSize(size);
        }

        updateSize();
    }, [data.size])

    return(

        <div className="absolute flex flex-col w-[500px] h-[500px] justify-center items-center
            top-1/2 left-1/2 -translate-y-[250px] -translate-x-[250px]">
            <div className="animate-spin duration-100 transition-all text-crimson-800">
                <AiOutlineLoading size={size}/>
            </div>
        </div>

    );
}