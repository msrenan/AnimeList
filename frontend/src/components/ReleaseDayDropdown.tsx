import { useContext, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { ReleaseDay } from "../types/enum";
import { animeFormContext } from "../types/context";

type ReleaseDayDropdownProps = {
  initialValue?: ReleaseDay;
};

const OPTIONS = [
  ReleaseDay.Domingo,
  ReleaseDay.Segunda,
  ReleaseDay.Terca,
  ReleaseDay.Quarta,
  ReleaseDay.Quinta,
  ReleaseDay.Sexta,
  ReleaseDay.Sabado,
];

export default function ReleaseDayDropdown({ initialValue }: ReleaseDayDropdownProps) {
  const [currentOption, setCurrentOption] = useState<string>(initialValue ?? "");
  const { setReleaseDay } = useContext(animeFormContext);

  const handleChange = (choice: ReleaseDay) => {
    setCurrentOption(choice);
    setReleaseDay(choice);
  };

  return (
    <div className="relative">
      <select
        value={currentOption}
        onChange={(event) => handleChange(event.target.value as ReleaseDay)}
        className={`input h-[46px] cursor-pointer appearance-none py-0 pr-10 ${
          currentOption ? "text-white" : "text-lead-400"
        }`}
        aria-label="Dia de lançamento"
      >
        <option value="" disabled>
          Dia que atualiza
        </option>
        {OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0) + option.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
      <FiChevronDown
        size={16}
        className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-lead-400"
      />
    </div>
  );
}
