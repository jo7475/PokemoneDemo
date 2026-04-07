import {
  PokemonListResponse,
  PokemonDetail,
  PokemonSpecies,
  PokemonFullDetail,
  PokemonBasicInfo,
} from '../../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async ({ pageParam = 0 }): Promise<{
  data: PokemonBasicInfo[];
  nextOffset: number | null;
}> => {
  const limit = 20;
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${pageParam}`);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  const result: PokemonListResponse = await response.json();
  
  const basicInfoPromises = result.results.map(async (pokemon) => {
    const detailResponse = await fetch(pokemon.url);
    const detail: PokemonDetail = await detailResponse.json();
    return {
      id: detail.id,
      name: detail.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detail.id}.png`,
      types: detail.types.map((t) => t.type.name),
    };
  });

  const fullData = await Promise.all(basicInfoPromises);

  const urlParams = new URLSearchParams(result.next?.split('?')[1] || '');
  const nextOffset = urlParams.get('offset') ? parseInt(urlParams.get('offset') as string, 10) : null;

  return {
    data: fullData,
    nextOffset,
  };
};

export const fetchPokemonDetail = async (idOrName: string | number): Promise<PokemonFullDetail> => {
  const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon details');
  }
  return response.json();
};

export const fetchPokemonSpecies = async (idOrName: string | number): Promise<PokemonSpecies> => {
  const response = await fetch(`${BASE_URL}/pokemon-species/${idOrName}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon species');
  }
  return response.json();
};

export const fetchAllPokemonNames = async (): Promise<{ name: string; url: string }[]> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=10000`);
  if (!response.ok) {
    throw new Error('Failed to fetch all pokemon names');
  }
  const result: PokemonListResponse = await response.json();
  return result.results;
};
