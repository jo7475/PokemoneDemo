import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
import { AppHeader } from '../../src/components/AppHeader';
import { ScreenLoader } from '../../src/components/ScreenLoader';
import { StatBar } from '../../src/components/StatBar';
import { TypeBadge } from '../../src/components/TypeBadge';
import { usePokemonDetailQuery, usePokemonSpeciesQuery } from '../../src/store/api/hooks';
import { getBackgroundColor, getTypeColor } from '../../src/theme/colors';

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data: pokemon, isLoading: isPokemonLoading, isError: isPokemonError } = usePokemonDetailQuery(id as string);
  const { data: species, isLoading: isSpeciesLoading } = usePokemonSpeciesQuery(id as string);

  if (isPokemonLoading || isSpeciesLoading) {
    return <ScreenLoader />;
  }
console.log(pokemon);
  if (isPokemonError || !pokemon) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text variant="titleMedium" className="text-red-500 mb-4">Failed to load Pokemon details.</Text>
        <Button mode="contained" onPress={() => router.back()} buttonColor="#eee" textColor="#333">
          Go Back
        </Button>
      </View>
    );
  }

  const primaryType = pokemon.types[0].type.name;
  const bgColor = getBackgroundColor(primaryType);
  const themeColor = getTypeColor(primaryType);
  
  const flavorText = species?.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text.replace(/\s+/g, ' ') || 'No description available.';

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <AppHeader 
        leftAction="back" 
        rightActions={
          <>
            <Appbar.Action icon="heart-outline" onPress={() => {}} color="#666" />
            <Appbar.Action icon="share-variant" onPress={() => {}} color="#666" />
          </>
        }
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="h-[300px] mx-5 mt-2.5 rounded-[20px] justify-center items-center" style={{ backgroundColor: bgColor }}>
          <Image 
            source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` }} 
            className="w-[250px] h-[250px]" 
            resizeMode="contain" 
          />
        </View>

        <View className="px-6 pt-6">
          <Text className="text-sm font-bold text-[#666] mb-1">#{pokemon.id.toString().padStart(4, '0')}</Text>
          <Text className="text-4xl font-[900] text-[#333] mb-3">{pokemon.name.toUpperCase()}</Text>
          
          <View className="flex-row mb-5">
            {pokemon.types.map((typeObj) => (
              <TypeBadge key={typeObj.type.name} type={typeObj.type.name} />
            ))}
          </View>

          <Text className="text-base leading-6 text-[#444] mb-6">{flavorText}</Text>

          <View className="flex-row mb-8">
            <View className="flex-1">
              <Text className="text-[10px] font-bold text-[#999] mb-1">HEIGHT</Text>
              <Text className="text-lg font-bold text-[#333]">{pokemon.height / 10} m</Text>
            </View>
            <View className="flex-1">
              <Text className="text-[10px] font-bold text-[#999] mb-1">WEIGHT</Text>
              <Text className="text-lg font-bold text-[#333]">{pokemon.weight / 10} kg</Text>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-xs font-bold tracking-widest mb-4 underline" style={{ color: themeColor }}>BASE STATS</Text>
            {pokemon.stats.map(statObj => {
              const labelMap: Record<string, string> = {
                'hp': 'HP',
                'attack': 'ATTACK',
                'defense': 'DEFENSE',
                'special-attack': 'SP. ATK',
                'special-defense': 'SP. DEF',
                'speed': 'SPEED',
              };
              return (
                <StatBar 
                  key={statObj.stat.name} 
                  label={labelMap[statObj.stat.name] || statObj.stat.name} 
                  value={statObj.base_stat} 
                  color={themeColor} 
                />
              );
            })}
          </View>

          <View className="mb-8">
            <Text className="text-xs font-bold tracking-widest mb-4 underline" style={{ color: themeColor }}>SIGNATURE MOVES</Text>
            <View className="bg-[#F5F5F5] rounded-lg p-4">
              <View className="flex-row justify-between mb-3"><Text className="text-sm font-bold text-[#333]">VINE WHIP</Text><Text className="text-xs text-[#666]">Lv. 7</Text></View>
              <View className="flex-row justify-between mb-3"><Text className="text-sm font-bold text-[#333]">RAZOR LEAF</Text><Text className="text-xs text-[#666]">Lv. 13</Text></View>
              <View className="flex-row justify-between mb-3"><Text className="text-sm font-bold text-[#333]">SOLAR BEAM</Text><Text className="text-xs text-[#666]">TM 01</Text></View>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-xs font-bold tracking-widest mb-4 underline" style={{ color: themeColor }}>ECOLOGY</Text>
            <View className="border border-[#EAEAEA] rounded-lg p-4">
              <View className="mb-4">
                <Text className="text-[10px] font-bold text-[#999] mb-1">GROWTH RATE</Text>
                <Text className="text-sm text-[#333] capitalize">{species?.growth_rate.name.replace('-', ' ') || 'N/A'}</Text>
              </View>
              <View className="mb-4">
                <Text className="text-[10px] font-bold text-[#999] mb-1">EGG GROUPS</Text>
                <Text className="text-sm text-[#333] capitalize">{species?.egg_groups.map(g => g.name).join(', ') || 'N/A'}</Text>
              </View>
              <View className="mb-4">
                <Text className="text-[10px] font-bold text-[#999] mb-1">HABITAT</Text>
                <Text className="text-sm text-[#333] capitalize">{species?.habitat?.name.replace('-', ' ') || 'N/A'}</Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}
