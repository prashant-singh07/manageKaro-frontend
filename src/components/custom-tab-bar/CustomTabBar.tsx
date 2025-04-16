import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomTabBarItem from './CustomTabBarItem';

const CustomTabBar: FC<BottomTabBarProps> = props => {
  const {state, navigation} = props;
  const {routes, index: routeIndex} = state;

  function handleTabBarItemPressed(routeName: string) {
    console.log('routeName', routeName);
    navigation.navigate(routeName);
  }

  function getTabBarIcon(routeName: string) {
    let activeIcon, inactiveIcon, label;
    switch (routeName) {
      case 'InvoiceScreen':
        label = 'Invoice';
        break;
      case 'InventoryScreen':
        label = 'Inventory';
        break;
      default:
        label = 'Invoice';
        break;
    }
    return {activeIcon, inactiveIcon, label};
  }

  return (
    <View style={styles.tabStyle}>
      {routes.map((item, index) => {
        const {key, name, params} = item;
        console.log('item', item);
        const isFocused = routeIndex == index;

        const {activeIcon, inactiveIcon, label} = getTabBarIcon(name);
        return (
          <CustomTabBarItem
            key={key}
            routeName={name}
            onPress={handleTabBarItemPressed}
            isFocused={isFocused}
            label={label}
            activeIcon={activeIcon}
            inactiveIcon={inactiveIcon}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
});

export default CustomTabBar;
