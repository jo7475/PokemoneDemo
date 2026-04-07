import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchPokemonList, fetchPokemonDetail, fetchPokemonSpecies, fetchAllPokemonNames } from './pokeApi';

export const usePokemonListQuery = () => {
  return useInfiniteQuery({
    queryKey: ['pokemonList'],
    queryFn: fetchPokemonList,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
  });
};

export const usePokemonDetailQuery = (id: string | number) => {
  return useQuery({
    queryKey: ['pokemonDetail', id],
    queryFn: () => fetchPokemonDetail(id),
  });
};

export const usePokemonSpeciesQuery = (id: string | number) => {
  return useQuery({
    queryKey: ['pokemonSpecies', id],
    queryFn: () => fetchPokemonSpecies(id),
  });
};

export const useAllPokemonNamesQuery = () => {
  return useQuery({
    queryKey: ['allPokemonNames'],
    queryFn: fetchAllPokemonNames,
    staleTime: Infinity, 
  });
};
