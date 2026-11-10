import { useContext } from "react";
import type { AnimeResponse } from "../types/api/Response";
import { animeContext } from "../types/context";
import ConfirmModal from "./ui/ConfirmModal";
import { formatReleaseDay } from "../utils/anime";

type DeleteAnimeModalProps = {
  anime: AnimeResponse;
};

export default function DeleteAnimeModal({ anime }: DeleteAnimeModalProps) {
  const { setShowDeleteModal, setDeleteAnime } = useContext(animeContext);

  return (
    <ConfirmModal
      title="Excluir anime"
      description={`Tem certeza que deseja excluir "${anime.title}" da sua coleção? Ele também será removido de todas as listas.`}
      details={[
        `Temporada ${anime.season}`,
        `Episódio ${anime.episode}`,
        formatReleaseDay(anime.releaseDay),
      ]}
      confirmLabel="Excluir anime"
      onConfirm={() => setDeleteAnime(true, anime.id)}
      onClose={() => setShowDeleteModal(false)}
    />
  );
}
