import React, {FC, useState} from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import CustomSelectableChipItem from './CustomSelectableChipItem';
import {COLORS, FONTS} from '../../assets/theme';

interface CustomSelectableChipProps extends ScrollViewProps {
  containerStyle?: StyleProp<ViewStyle> | undefined;
  title?: string | undefined;
  titleStyle?: StyleProp<TextStyle> | undefined;
  data: {id: number; title: string; description?: string}[];
  onChipPress: (id: number | null) => void;
}

const CustomSelectableChip: FC<CustomSelectableChipProps> = props => {
  const {
    containerStyle,
    title = '',
    titleStyle,
    data = [],
    onChipPress,
    contentContainerStyle,
    ...rest
  } = props;
  const [selectedId, setSelectedId] = useState<number | null>(null);

  function handleChipPressed(id: number) {
    setSelectedId(prev => {
      const currentId = prev == id ? null : id;
      onChipPress?.(currentId);
      return currentId;
    });
  }

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {title ? (
        <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
      ) : null}
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContainerStyle,
          contentContainerStyle,
        ]}
        {...rest}>
        {data?.map(item => {
          const {id, title, description} = item;
          const isSelected = id === selectedId;
          return (
            <CustomSelectableChipItem
              isSelected={isSelected}
              key={id?.toString()}
              chipId={id}
              title={title}
              description={description}
              onChipPress={handleChipPressed}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {},
  scrollContainerStyle: {},
  titleStyle: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    color: COLORS['272727'],
    marginBottom: 12,
  },
});

export default CustomSelectableChip;
