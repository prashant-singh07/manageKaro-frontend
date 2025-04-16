import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacityProps} from 'react-native';
import {COLORS, FONTS} from '../../assets/theme';
import {CustomTouchable} from '..';

interface CustomSelectableChipItemProps extends TouchableOpacityProps {
  chipId: number;
  title?: string | undefined;
  description?: string | undefined;
  onChipPress: (id: number) => void;
  isSelected?: boolean | undefined;
}

const CustomSelectableChipItem: FC<CustomSelectableChipItemProps> = props => {
  const {chipId, title, description, onChipPress, isSelected, ...rest} = props;

  function handleChipPressed() {
    onChipPress?.(chipId);
  }
  console.log('description', description);

  return (
    <CustomTouchable
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={handleChipPressed}
      {...rest}>
      <Text
        style={[styles.titleStyle, isSelected && styles.selectedTitleStyle]}>
        {title}
      </Text>
      {description ? (
        <Text style={styles.descriptionText}>{description}</Text>
      ) : null}
    </CustomTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS['E0E0E0'],
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedContainer: {
    borderColor: COLORS['7F30FF'],
  },
  titleStyle: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    color: COLORS['B1B1B1'],
  },
  selectedTitleStyle: {
    color: COLORS['272727'],
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    color: COLORS['B1B1B1'],
  },
});

export default CustomSelectableChipItem;
