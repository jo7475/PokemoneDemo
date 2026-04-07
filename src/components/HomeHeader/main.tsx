import React from 'react';
import { View, TextInput } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../AppHeader';

interface HomeHeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <>
      <AppHeader leftAction="menu" />
      
      <View className="px-5 pb-5 bg-[#FAFAFA]">
        <Text variant="headlineLarge" className="font-[800] text-[#333] mb-6">Who are you looking for?</Text>
        <View className="flex-row items-center bg-[#F5F5F5] rounded-2xl px-4 py-3 border border-[#EBEBEB]">
          <Ionicons name="search" size={20} color="#9E9E9E" />
          <TextInput
            placeholder="Search Pokemon, Move, Type..."
            onChangeText={onSearchChange}
            value={searchQuery}
            className="flex-1 ml-3 text-base text-[#333]"
            placeholderTextColor="#9E9E9E"
            autoCorrect={false}
          />
        </View>
      </View>
    </>
  );
};

export default HomeHeader;
