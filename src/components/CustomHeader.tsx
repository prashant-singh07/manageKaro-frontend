import React, {FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS} from '../assets/theme';
import {CustomTouchable} from '.';
import {IMAGES} from '../assets/images';

interface CustomHeaderProps {
  headerContainer?: StyleProp<ViewStyle>;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  onBackPress?: () => void;
  onRightPress?: () => void;
}

const CustomHeader: FC<CustomHeaderProps> = props => {
  const {headerContainer, title, titleStyle, onBackPress, onRightPress} = props;

  const handleBackPressed = () => {
    onBackPress?.();
  };

  const handleRightIconPressed = () => {
    onRightPress?.();
  };

  return (
    <View style={[styles.headerContainer, headerContainer]}>
      <View style={styles.leftContainer}>
        {onBackPress && (
          <CustomTouchable
            style={styles.iconContainer}
            onPress={handleBackPressed}>
            <Image style={styles.iconStyle} source={IMAGES.BACK_ICON} />
          </CustomTouchable>
        )}
        {title && <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>}
      </View>
      {/* <View> */}
      {onRightPress && (
        <CustomTouchable
          style={styles.iconContainer}
          onPress={handleRightIconPressed}>
          <Image source={IMAGES.CLOSE_ICON} style={styles.iconStyle} />
        </CustomTouchable>
      )}
      {/* </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS['FFFFFF'],
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 4,
    marginRight: 12,
  },
  iconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  titleStyle: {
    fontSize: 16,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS['0C0C0C'],
  },
});

export default CustomHeader;
