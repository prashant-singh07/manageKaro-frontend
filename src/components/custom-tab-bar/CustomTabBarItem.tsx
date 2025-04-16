import React, {FC, useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CutsomTouchable from '../CustomTouchable';
import {COLORS, FONTS} from '../../assets/theme';
import {SCREEN_WIDTH} from '../../utilities';

interface CustomTabBarItemProps {
  onPress: (routeName: string) => void | undefined;
  routeName: string;
  activeIcon?: ImageSourcePropType | undefined;
  inactiveIcon?: ImageSourcePropType | undefined;
  isFocused: boolean | undefined;
  label: string | undefined;
}

const CustomTabBarItem: FC<CustomTabBarItemProps> = props => {
  const {onPress, routeName, activeIcon, inactiveIcon, isFocused, label} =
    props;
  const opacityAnimationRef = useRef(
    new Animated.Value(isFocused ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(opacityAnimationRef, {
      toValue: isFocused ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    });
  }, [isFocused]);

  function handleItemPressed() {
    onPress?.(routeName);
  }

  return (
    <CutsomTouchable
      onPress={handleItemPressed}
      style={styles.tabItemContainer}>
      <Animated.Image
        source={inactiveIcon}
        style={[
          styles.iconStyle,
          {
            opacity: opacityAnimationRef.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}
      />
      <Animated.Image
        source={activeIcon}
        style={[styles.iconStyle, {opacity: opacityAnimationRef}]}
      />
      <Animated.Text
        style={[styles.labelStyle, isFocused && styles.activeLabelStyle]}>
        {label}
      </Animated.Text>
    </CutsomTouchable>
  );
};

const styles = StyleSheet.create({
  tabItemContainer: {},
  iconStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    position: 'absolute',
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS['000000'],
  },
  activeLabelStyle: {
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS['7F30FF'],
  },
});

export default CustomTabBarItem;
