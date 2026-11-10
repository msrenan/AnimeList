import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Modal from "./ui/Modal";
import AnimeSelection from "./AnimeSelection";
import { listsContext } from "../types/context";
import type { AnimeListData } from "../types/api/Request";

export default function ListCreationForm() {
  const [name, setName] = useState("");
  const [ids, setIds] = useState<string[]>([]);
  const [nameError, setNameError] = useState(false);
  const { setAddList } = useContext(listsContext);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setNameError(true);
      toast.error("Informe um nome para a lista.");
      return;
    }

    const newList: AnimeListData = {
      name: name.trim(),
      animeIds: ids,
    };

    setAddList(false, newList);
  };

  return (
    <Modal
      title="Nova lista"
      subtitle="Organize seus animes do seu jeito."
      onClose={() => setAddList(false)}
      footer={
        <>
          <button type="button" className="btn-secondary" onClick={() => setAddList(false)}>
            Cancelar
          </button>
          <button type="submit" form="list-creation-form" className="btn-primary">
            Criar lista
          </button>
        </>
      }
    >
      <form
        id="list-creation-form"
        onSubmit={submit}
        className="flex min-h-[360px] flex-col gap-5"
      >
        <div>
          <label htmlFor="list-name" className="field-label">
            Nome da lista
          </label>
          <input
            id="list-name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setNameError(false);
            }}
            placeholder="Ex.: Para maratonar nas férias"
            maxLength={60}
            className={`input ${nameError ? "border-red-500/70" : ""}`}
            autoFocus
          />
          {nameError && (
            <p className="mt-1.5 text-xs text-red-300">O nome da lista é obrigatório.</p>
          )}
        </div>

        <AnimeSelection sendData={setIds} />
      </form>
    </Modal>
  );
}
