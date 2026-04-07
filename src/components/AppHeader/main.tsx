import React from 'react';
import { Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';

interface AppHeaderProps {
  leftAction?: 'menu' | 'back' | 'none';
  onLeftPress?: () => void;
  rightActions?: React.ReactNode;
}

const AppHeader: React.FC<AppHeaderProps> = ({ leftAction = 'none', onLeftPress, rightActions }) => {
  const router = useRouter();

  const handleLeftPress = () => {
    if (onLeftPress) {
      onLeftPress();
    } else if (leftAction === 'back' && router.canGoBack()) {
      router.back();
    }
  };

  return (
    <Appbar.Header style={{ backgroundColor: '#FAFAFA' }} mode="small" elevated={false}>
      {leftAction === 'menu' && <Appbar.Action icon="menu" onPress={handleLeftPress} color="#006D5B" />}
      {leftAction === 'back' && <Appbar.BackAction onPress={handleLeftPress} color="#006D5B" />}
      
      <Appbar.Content title="POKEDEX" titleStyle={{ fontWeight: 'bold', color: '#006D5B', fontSize: 18 }} />
      
      {rightActions}
    </Appbar.Header>
  );
};

export default AppHeader;
