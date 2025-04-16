import React, {
  FC,
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Animated,
  TextInput,
  TextInputProps,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  Platform,
} from 'react-native';
import {COLORS, FONTS} from '../assets/theme';

interface CustomTextInputProps extends TextInputProps {
  label?: string | undefined;
  labelStyle?: StyleProp<TextStyle> | undefined;
  inputContainerStyle?: StyleProp<ViewStyle> | undefined;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  errorMessage?: string | undefined;
  showAnimation?: boolean | undefined;
  rightComponent?: () => ReactNode;
  leftComponent?: () => ReactNode;
}

const CustomTextInput: FC<CustomTextInputProps> = props => {
  const {
    label,
    labelStyle,
    inputContainerStyle,
    containerStyle,
    onChangeText,
    errorMessage,
    showAnimation,
    placeholder,
    rightComponent,
    leftComponent,
    ...rest
  } = props;

  const [inputTextValue, setInputTextValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const labelPositionRef = useRef(
    new Animated.Value(inputTextValue ? 1 : 0),
  ).current;

  const isInputFocusedOrFilled = isFocused || inputTextValue;

  useEffect(() => {
    Animated.timing(labelPositionRef, {
      toValue: isInputFocusedOrFilled ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, inputTextValue]);

  function handleInputTextChanged(inputText: string) {
    setInputTextValue(inputText);
    onChangeText?.(inputText);
  }

  function getPlaceHolderValue() {
    if (!placeholder) return undefined;
    if (!showAnimation) return placeholder;
    return isFocused ? placeholder : undefined;
  }

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={[styles.containerStyle, containerStyle]}>
    <View>
      {label && !showAnimation && (
        <Text style={[styles.fixedLabelStyle, labelStyle]}>{label}</Text>
      )}
      <View
        style={[
          styles.inputContainerStyle,
          inputContainerStyle,
          isInputFocusedOrFilled && styles.focusedInputContainerStyle,
        ]}>
        {leftComponent && leftComponent()}
        {label && showAnimation && (
          <Animated.Text
            style={[
              styles.labelStyle,
              {
                top: labelPositionRef.interpolate({
                  inputRange: [0, 1],
                  outputRange: [14, -8],
                }),
                fontSize: labelPositionRef.interpolate({
                  inputRange: [0, 1],
                  outputRange: [14, 12],
                }),
                color: labelPositionRef.interpolate({
                  inputRange: [0, 1],
                  outputRange: [COLORS['C0C0C0'], COLORS['7F30FF']],
                }),
              },
              labelStyle,
            ]}>
            {label}
          </Animated.Text>
        )}
        <TextInput
          style={[styles.textInputStyle]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={inputTextValue}
          onChangeText={handleInputTextChanged}
          placeholder={getPlaceHolderValue()}
          {...rest}
        />
        {rightComponent && rightComponent()}
      </View>
    </View>
    //</KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    // paddingVertical: 10,
  },
  inputContainerStyle: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS['FFFFFF'],
    borderWidth: 1,
    borderColor: COLORS['E0E0E0'],
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 13,
    // height: 48,
    position: 'relative',
    // justifyContent: 'center',
  },
  focusedInputContainerStyle: {
    borderColor: COLORS['7F30FF'],
  },
  fixedLabelStyle: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS['0C0C0C'],
    marginBottom: 8,
  },
  labelStyle: {
    position: 'absolute',
    left: 12,
    backgroundColor: COLORS['F9F9FA'],
    paddingHorizontal: 4,
    fontFamily: FONTS.MEDIUM,
  },
  textInputStyle: {
    // height: 40,
    paddingHorizontal: 4,
    paddingVertical: 0,
    // backgroundColor: 'pink',
    flex: 1,
  },
});

export default CustomTextInput;
