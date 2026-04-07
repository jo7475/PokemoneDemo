export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
}

export interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: NamedAPIResource;
    version: NamedAPIResource;
  }[];
  growth_rate: NamedAPIResource;
  egg_groups: NamedAPIResource[];
  habitat: NamedAPIResource | null;
}

export interface PokemonMoveDetail {
  move: NamedAPIResource;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
  }[];
}

export interface PokemonFullDetail extends PokemonDetail {
  moves: PokemonMoveDetail[];
}

export interface PokemonBasicInfo {
  id: number;
  name: string;
  image: string;
  types: string[];
}
