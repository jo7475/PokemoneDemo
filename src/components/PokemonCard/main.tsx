import React from 'react';
import { Image, View } from 'react-native';
import { Surface, Text, TouchableRipple } from 'react-native-paper';
import { PokemonBasicInfo } from '../../types/pokemon';
import { TypeBadge } from '../TypeBadge';

interface PokemonCardProps {
  pokemon: PokemonBasicInfo;
  onPress: (id: number) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onPress }) => {
  // console.log(pokemon);
  return (
    <Surface elevation={0} className="flex-1 m-2 bg-white overflow-hidden">
      <TouchableRipple borderless onPress={() => onPress(pokemon.id)}>
        <View>
          <View className="p-2 items-center justify-center aspect-square bg-black" >
            <Image className="w-[130px] h-[130px]" source={{ uri: pokemon.image }} resizeMode="contain" />
          </View>
          <View className="flex-row justify-between items-center  pt-3">
            <Text variant='titleMedium' className="">{pokemon.name.toUpperCase()}</Text>
            <Text variant="labelSmall" className="text-[#757c7d] font-bold">#{pokemon.id.toString().padStart(4, '0')}</Text>
          </View>
          <View className="flex-row pb-3 pt-1.5">
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </View>
        </View>
      </TouchableRipple>
    </Surface>
  );
};

export default PokemonCard;
