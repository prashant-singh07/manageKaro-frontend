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

interface RecordSaleScreenProps {}

const RecordSaleScreen: FC<RecordSaleScreenProps> = props => {
  const navigation = useNavigation();

  type UNIT_REF_TYPE = {
    itemName: string;
    rate: string;
    quantity: string;
  };
  const unitRef = useRef<UNIT_REF_TYPE>({
    itemName: '',
    rate: '',
    quantity: '',
  });
  const [addItem, setAddItem] = useState(false);
  const [units, setUnits] = useState<UNIT_REF_TYPE[]>([]);
  const idRef = useRef<number>(0);

  const handleCrossPressed = () => {
    const stackAction = StackActions.pop();
    navigation.dispatch(stackAction);
  };

  const handleAddItemPressed = () => {
    if (addItem) {
      setUnits(prev => [...prev, unitRef.current]);
      setAddItem(false);
      return;
    }
    setAddItem(true);
  };

  console.log('units', units);

  const handleItemNameChanged = (text: string) => {
    unitRef.current.itemName = text;
  };
  const handleRateChanged = (text: string) => {
    unitRef.current.rate = text;
  };
  const handleQuantityChanged = (text: string) => {
    unitRef.current.quantity = text;
  };

  const handleContinuePressed = () => {
    const action = StackActions.push('SaleRecordedScreen');
    navigation.dispatch(action);
  };

  return (
    <View style={styles.screenContainer}>
      <CustomHeader title="Generate Bill" onRightPress={handleCrossPressed} />
      <View style={styles.mainContainer}>
        <CustomTextInput
          label="Customer"
          labelStyle={styles.labelStyle}
          placeholder="Enter Customer Name"
        />
        <CustomDivider />
        <Text style={styles.orderDetailsText}>Order Details</Text>
        {units?.map(item => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 12,
                backgroundColor: COLORS['FFFFFF'],
                borderRadius: 12,
                justifyContent: 'space-between',
                marginBottom: 16,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: FONTS.MEDIUM,
                    color: COLORS['0C0C0C'],
                  }}>
                  {item.itemName}
                </Text>
                <Text>{`${item.quantity} - ${item.rate}`}</Text>
              </View>
              <Text>{`${parseInt(item.quantity) * parseInt(item.rate)}`}</Text>
            </View>
          );
        })}
        {addItem && (
          <View style={styles.addItemContainer}>
            <CustomTextInput
              label="Item Name"
              containerStyle={styles.marginBottom16}
              onChangeText={handleItemNameChanged}
            />
            <CustomTextInput
              label="Rate"
              containerStyle={styles.marginBottom16}
              onChangeText={handleRateChanged}
              keyboardType="numeric"
            />
            <CustomTextInput
              label="Quantity"
              containerStyle={styles.marginBottom16}
              onChangeText={handleQuantityChanged}
              keyboardType="numeric"
            />
          </View>
        )}
        <CustomButton title="+Add Items" onPress={handleAddItemPressed} />
        <CustomDivider />
        <CustomTextInput
          label="Discount (optional)"
          labelStyle={styles.labelStyle}
          placeholder="Enter Percent"
        />
      </View>
      {units?.length && (
        <CustomButton
          title="Continue"
          style={{marginHorizontal: 20}}
          onPress={handleContinuePressed}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS['F5F5F5'],
    // backgroundColor: COLORS['FFFFFF'],
  },
  mainContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  labelStyle: {
    backgroundColor: COLORS['F5F5F5'],
  },
  orderDetailsText: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS['787878'],
    marginBottom: 16,
  },
  addItemContainer: {
    backgroundColor: COLORS['FFFFFF'],
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  marginBottom16: {
    marginBottom: 16,
  },
});

export default RecordSaleScreen;
