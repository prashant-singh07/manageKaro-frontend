import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../../assets/theme';

interface InventoryScreenProps {}

const InventoryScreen: FC<InventoryScreenProps> = props => {
  return (
    <View style={styles.screenContainer}>
      <Text>InventoryScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS['FFFFFF'],
  },
});

export default InventoryScreen;
