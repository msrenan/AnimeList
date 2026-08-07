export const ReleaseDay = {
    Segunda: "SEGUNDA",
    Terca: "TERÇA",
    Quarta: "QUARTA",
    Quinta: "QUINTA",
    Sexta: "SEXTA",
    Sabado: "SABADO",
    Domingo: "DOMINGO"
} as const;

export type ReleaseDay = typeof ReleaseDay[keyof typeof ReleaseDay];

export const FilterOptions = {
    Favoritos: "FAVORITOS",
    Assistidos: "ASSISTIDOS",
    Assistindo: "ASSISTINDO",
    Comecar: "COMEÇAR",
}

export type FilterOptions = typeof FilterOptions[keyof typeof FilterOptions];