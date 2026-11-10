import { useContext, useEffect, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { searchContext } from "../types/context";

type SearchBarProps = {
  placeholder?: string;
};

export default function SearchBar({
  placeholder = "Buscar por título...",
}: SearchBarProps) {
  const { setQuery } = useContext(searchContext);
  const [value, setValue] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleChange = (next: string) => {
    setValue(next);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setQuery(next), 320);
  };

  const clear = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setValue("");
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-xl">
      <FiSearch
        size={18}
        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lead-400"
      />
      <input
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="input h-12 py-0 pr-11 pl-11 text-[15px]"
      />
      {value && (
        <button
          type="button"
          onClick={clear}
          className="absolute top-1/2 right-2.5 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-lead-400 transition-colors hover:bg-lead-700 hover:text-white"
          aria-label="Limpar busca"
        >
          <FiX size={16} />
        </button>
      )}
    </div>
  );
}
