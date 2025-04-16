import React, {FC} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

export interface CutsomTouchableProps extends TouchableOpacityProps {
  children?: React.ReactNode;
}

const CutsomTouchable: FC<CutsomTouchableProps> = function (props) {
  const {children} = props;

  return (
    <TouchableOpacity activeOpacity={0.6} {...props}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default CutsomTouchable;
