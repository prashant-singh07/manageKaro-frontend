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
  ViewStyle,
} from 'react-native';
import {COLORS, FONTS} from '../assets/theme';
import CutsomTouchable from './CustomTouchable';

interface CustomSecondaryButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  rightImage?: ImageSourcePropType;
  rightImageStyle?: StyleProp<ImageStyle>;
  onRightPress?: () => void;
}

const CustomSecondaryButton: FC<CustomSecondaryButtonProps> = props => {
  const {
    containerStyle,
    label,
    labelStyle,
    onPress,
    title,
    titleStyle,
    rightImage,
    rightImageStyle,
    onRightPress,
  } = props;
  return (
    <View>
      {label && <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>}
      <CutsomTouchable
        onPress={onPress}
        style={[styles.containerStyle, containerStyle]}>
        {title && <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>}

        {onRightPress && (
          <CutsomTouchable
            style={styles.rightImageContainerStyle}
            onPress={onRightPress}>
            <Image
              source={rightImage}
              style={[styles.rightImageStyle, rightImageStyle]}
            />
          </CutsomTouchable>
        )}
      </CutsomTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS['FFFFFF'],
    borderWidth: 1,
    borderColor: COLORS['E5E5E5'],
  },
  labelStyle: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS['0C0C0C'],
    marginBottom: 8,
  },
  titleStyle: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: COLORS['C0C0C0'],
  },
  rightImageContainerStyle: {
    paddingHorizontal: 4,
  },
  rightImageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
export default CustomSecondaryButton;
