import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS, FONTS} from '../../../assets/theme';
import {
  CustomButton,
  CustomHeader,
  CustomSecondaryButton,
  CustomTextInput,
  CustomToastMessage,
  CustomTouchable,
} from '../../../components';
import {StackActions, useNavigation} from '@react-navigation/native';
import {
  performEmailPhoneValidation,
  performMobileValidation,
  SCREEN_WIDTH,
} from '../../../utilities';
import {IMAGES} from '../../../assets/images';
import {CustomToastMessageRef} from '../../../components/CustomToastMessage';
import {useDispatch, useSelector} from 'react-redux';
import {getSampleData} from '../../../store/sampleSlice';
import type {AppDispatch, RootState} from '../../../store/store'; // Import types
import {LoginResponse, onLogin} from '../../../store/authSlice';
import {useToast} from '../../../utilities/toast';
import {updateShop} from '../../../store/shopSlice';

type formDataType = {
  user_id: string;
  name: string | null;
  address: string | null;
  pincode: number | null;
  mobile: string | null;
  business_type: string | null;
};

interface AddShopScreenProps {}

const AddShopScreen: FC<AddShopScreenProps> = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const {showToast} = useToast();

  const {data: authData} = useSelector((state: RootState) => state.auth);
  const {
    shopData,
    shopLoading,
    shopSuccess,
    shopError,
    shopMessage,
    shopDescription,
  } = useSelector((state: RootState) => state.shop);

  const formDataRef = useRef<formDataType>({
    user_id: authData?.user_id,
    name: null,
    address: null,
    pincode: null,
    mobile: null,
    business_type: null,
  });
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (shopSuccess) {
      showToast(shopMessage, shopDescription, true);
      handleShopSuccess();
    }
  }, [shopSuccess]);

  function handleShopSuccess() {
    const stackActions = StackActions.replace('BottomTabs');
    navigation.dispatch(stackActions);
  }

  function handleBackPressed() {
    navigation.goBack();
  }

  function handleShopNameChanged(text: string) {
    formDataRef.current.name = text?.trim();
    validateFormData();
  }

  function handleShopAddressChanged(text: string) {
    formDataRef.current.address = text?.trim();
    validateFormData();
  }

  function handleShopPinCodeChanged(text: string) {
    formDataRef.current.pincode = parseInt(text?.trim());
    validateFormData();
  }

  function handleShopPhoneNumberChanged(text: string) {
    formDataRef.current.mobile = text?.trim();
    validateFormData();
  }

  function validateFormData() {
    console.log('validateFormData', formDataRef.current);
    if (
      formDataRef.current?.name?.length === 0 ||
      formDataRef.current?.address?.length === 0 ||
      formDataRef.current?.pincode?.toString()?.length !== 6 ||
      !performMobileValidation(formDataRef.current?.mobile) ||
      formDataRef.current?.mobile?.toString()?.length !== 10 ||
      !formDataRef.current?.business_type
    ) {
      setIsButtonEnabled(false);
      return;
    }
    setIsButtonEnabled(true);
  }

  function handleContinuePressed() {
    dispatch(updateShop(formDataRef.current));
  }

  function handleBusinessTypePressed() {
    console.log('handleBusinessTypePressed');
    formDataRef.current.business_type = 'Store';
    validateFormData();
  }

  return (
    <View style={styles.screenContainer}>
      <CustomHeader title="Set up Shop" onBackPress={handleBackPressed} />

      <ScrollView
        contentContainerStyle={styles.mainContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <CustomTextInput
          label="Shop Name"
          placeholder="Enter Shop Name"
          inputContainerStyle={styles.marginB20}
          onChangeText={handleShopNameChanged}
        />
        <CustomTextInput
          label="Shop Address"
          placeholder="Enter Shop Address"
          inputContainerStyle={styles.marginB20}
          onChangeText={handleShopAddressChanged}
        />

        <CustomTextInput
          label="Pin Code"
          placeholder="Enter Pin Code"
          keyboardType="number-pad"
          inputContainerStyle={styles.marginB20}
          maxLength={6}
          onChangeText={handleShopPinCodeChanged}
        />
        <CustomTextInput
          label="Shop Phone Number"
          placeholder="Enter Shop Phone Number"
          keyboardType="number-pad"
          inputContainerStyle={styles.marginB20}
          maxLength={10}
          onChangeText={handleShopPhoneNumberChanged}
        />

        <CustomSecondaryButton
          label="Business Type"
          title="Business Type"
          rightImage={IMAGES.CHEVRON_DOWN_ICON}
          rightImageStyle={styles.chevronDownImageStyle}
          onPress={handleBusinessTypePressed}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Continue"
          disabled={!isButtonEnabled}
          onPress={handleContinuePressed}
          isLoading={shopLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS['F9F9FA'],
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  mainContainer: {
    flexGrow: 1,
    backgroundColor: COLORS['F9F9FA'],
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  marginB20: {
    marginBottom: 20,
  },
  chevronDownImageStyle: {
    width: 16,
    height: 16,
  },
  buttonContainer: {
    backgroundColor: COLORS['FFFFFF'],
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
export default AddShopScreen;
