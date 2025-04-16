import React, {FC} from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';
import CutsomTouchable, {CutsomTouchableProps} from './CustomTouchable';
import {COLORS, FONTS} from '../assets/theme';

interface CustomDividerProps extends ViewProps {}

const CustomDivider: FC<CustomDividerProps> = props => {
  return <View style={styles.dividerSyle} {...props} />;
};

const styles = StyleSheet.create({
  dividerSyle: {
    height: 2,
    backgroundColor: COLORS['EBEBEB'],
    marginVertical: 20,
  },
});

export default CustomDivider;
