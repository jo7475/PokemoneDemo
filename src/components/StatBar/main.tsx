import React from 'react';
import { View } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';

interface StatBarProps {
  label: string;
  value: number;
  color?: string;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, color = '#4caf50' }) => {
  const maxStat = 255;
  const progress = Math.min(1, Math.max(0, value / maxStat));

  return (
    <View className="flex-row items-center my-1">
      <Text variant="labelSmall" className="text-[#666] font-bold w-20">{label.toUpperCase()}</Text>
      <View className="flex-1 mx-2">
        <ProgressBar progress={progress} color={color} style={{ backgroundColor: '#eee', height: 4, borderRadius: 2 }} />
      </View>
      <Text variant="labelMedium" className="font-bold text-[#333] w-6 text-right">{value}</Text>
    </View>
  );
};

export default StatBar;
