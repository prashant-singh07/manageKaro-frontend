import React, {FC, useRef, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS, FONTS} from '../../../assets/theme';
import {IMAGES} from '../../../assets/images';
import {
  CustomButton,
  CustomDivider,
  CustomHeader,
  CustomTextInput,
} from '../../../components';
import {SCREEN_WIDTH} from '../../../utilities';
import {StackActions, useNavigation} from '@react-navigation/native';

const SaleRecordedScreen = () => {
  const handleCrossPressed = () => {};
  return (
    <View>
      <CustomHeader title="Generate Bill" onRightPress={handleCrossPressed} />
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SaleRecordedScreen;
