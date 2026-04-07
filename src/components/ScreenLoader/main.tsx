import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const ScreenLoader: React.FC = () => {
  return (
    <View className="flex-1 justify-center items-center bg-[#FAFAFA]">
      <ActivityIndicator size="large" animating={true} color="#1E90FF" />
    </View>
  );
};

export default ScreenLoader;
