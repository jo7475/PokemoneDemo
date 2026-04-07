import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { HomeHeader } from '../src/components/HomeHeader';
import { PokemonList } from '../src/components/PokemonList';
import { ScreenLoader } from '../src/components/ScreenLoader';
import { useDebounce } from '../src/hooks/use-debounce';
import { useAllPokemonNamesQuery, usePokemonListQuery } from '../src/store/api/hooks';
import { PokemonBasicInfo } from '../src/types/pokemon';

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);

  const {
    data: data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInfiniteLoading,
    isError: isInfiniteError,
  } = usePokemonListQuery();

  const { data: allPokemon } = useAllPokemonNamesQuery();

  const [searchResults, setSearchResults] = useState<PokemonBasicInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  React.useEffect(() => {
    const search = async () => {
      if (debouncedSearch && allPokemon) {
        setIsSearching(true);
        const filtered = allPokemon.filter((p) =>
          p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        ).slice(0, 20); 

        const results = await Promise.all(
          filtered.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            const detail = await detailResponse.json();
            return {
              id: detail.id,
              name: detail.name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detail.id}.png`,
              types: detail.types.map((t: any) => t.type.name),
            };
          })
        );
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    };
    search();
  }, [debouncedSearch, allPokemon]);

  const handlePokemonPress = (id: number) => {
    router.push(`/pokemon/${id}`);
  };

  if (isInfiniteLoading && !debouncedSearch) {
    return <ScreenLoader />;
  }

  const allFetched = data?.pages.flatMap((page) => page.data) || [];
  const uniqueData = Array.from(new Map(allFetched.map(item => [item.id, item])).values());
  const displayedData = debouncedSearch ? searchResults : uniqueData;

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <HomeHeader 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      <PokemonList
        data={displayedData}
        isSearching={isSearching}
        isInfiniteError={isInfiniteError}
        debouncedSearch={debouncedSearch}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        onPokemonPress={handlePokemonPress}
      />
    </View>
  );
}
