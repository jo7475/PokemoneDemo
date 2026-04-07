import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { getBackgroundColor, getTypeColor } from '../../theme/colors';

interface TypeBadgeProps {
  type: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const textColor = getTypeColor(type);
  const bgColor = getBackgroundColor(type);

  return (
    <View className="px-3 py-1 mr-2 self-start items-center justify-center" style={{ backgroundColor: bgColor }}>
      <Text variant="labelSmall" className="font-bold tracking-wide text-[11px] capitalize" style={{ color: textColor }}>{type}</Text>
    </View>
  );
};

export default TypeBadge;
