import { useContext } from "react";
import type { AnimeListResponse } from "../types/api/Response";
import { listsContext } from "../types/context";
import ConfirmModal from "./ui/ConfirmModal";
import { pluralize } from "../utils/anime";

type DeleteListModalProps = {
  list: AnimeListResponse;
};

export default function DeleteListModal({ list }: DeleteListModalProps) {
  const { setDeleteList } = useContext(listsContext);

  return (
    <ConfirmModal
      title="Excluir lista"
      description={`Tem certeza que deseja excluir a lista "${list.name}"? Os animes continuam na sua coleção.`}
      details={[pluralize(list.animes?.length ?? 0, "anime", "animes")]}
      confirmLabel="Excluir lista"
      onConfirm={() => setDeleteList(false, undefined, list.id)}
      onClose={() => setDeleteList(false)}
    />
  );
}
