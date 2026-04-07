import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { PokemonBasicInfo } from '../../types/pokemon';
import { PokemonCard } from '../PokemonCard';

interface PokemonListProps {
  data: PokemonBasicInfo[];
  isSearching: boolean;
  isInfiniteError: boolean;
  debouncedSearch: string;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  onPokemonPress: (id: number) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({
  data,
  isSearching,
  isInfiniteError,
  debouncedSearch,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  onPokemonPress,
}) => {
  const renderFooter = () => {
    if (!isFetchingNextPage || debouncedSearch) return null;
    return <ActivityIndicator className="m-5" color="#1E90FF" />;
  };

  if (isInfiniteError) {
    return <Text className="text-red-500 text-center mt-5">Failed to load Pokedex.</Text>;
  }

  if (isSearching) {
    return <ActivityIndicator className="mt-[50px]" size="large" color="#1E90FF" />;
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 4 }}>
      <FlashList
        data={data.slice(0)}
        keyExtractor={(item) => item.id?.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage && !debouncedSearch) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
          <View style={{ flex: 1, marginHorizontal: 4, marginBottom: 12 }}>
            <PokemonCard pokemon={item} onPress={onPokemonPress} />
          </View>
        )}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default PokemonList;