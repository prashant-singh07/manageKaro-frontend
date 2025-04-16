import React, {FC, useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS} from '../../../assets/theme';
import {
  CustomButton,
  CustomHeader,
  CustomTextInput,
  CustomTouchable,
} from '../../../components';
import {StackActions, useNavigation} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store/store';
import {useToast} from '../../../utilities/toast';
import {onRegister} from '../../../store/authSlice';
import {performMobileValidation} from '../../../utilities';

type formDataType = {
  mobile: string | null;
  password: string | null;
};

interface RegisterScreenProps {}

const RegisterScreen: FC<RegisterScreenProps> = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const {showToast} = useToast();

  const {loading, success, error, message, description, data} = useSelector(
    (state: RootState) => state.auth,
  );

  const formDataRef = useRef<formDataType>({
    mobile: null,
    password: null,
  });
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (success) {
      showToast(message, description, true);
      handleOnRegisterSuccess();
    }
  }, [success]);

  function handleOnRegisterSuccess() {
    const stackActions = StackActions.replace('AddProfileScreen');
    navigation.dispatch(stackActions);
  }

  function validateInputs() {
    if (
      !performMobileValidation(formDataRef.current.mobile) ||
      !formDataRef.current.password
    ) {
      setIsButtonEnabled(false);
      return;
    }
    setIsButtonEnabled(true);
  }

  function handleMobileChanged(inputText: string) {
    formDataRef.current.mobile = inputText?.trim();
    validateInputs();
  }

  function handlePasswordChanged(inputText: string) {
    formDataRef.current.password = inputText?.trim();
    validateInputs();
  }

  function handleContinuePressed() {
    // call server to store the data
    dispatch(onRegister(formDataRef.current));
  }

  function handleLoginPressed() {
    navigation.goBack();
  }

  return (
    <View style={styles.screenContainer}>
      <CustomHeader title="Sign Up" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CustomTextInput
          label="Phone Number"
          placeholder="Enter Phone Number"
          keyboardType="number-pad"
          onChangeText={handleMobileChanged}
          maxLength={10}
          inputContainerStyle={styles.marginB20}
        />
        <CustomTextInput
          label="Create Password"
          placeholder="Enter Password"
          onChangeText={handlePasswordChanged}
          inputContainerStyle={styles.marginB30}
        />
        <CustomButton
          disabled={!isButtonEnabled}
          title="Continue"
          onPress={handleContinuePressed}
          isLoading={loading}
        />
        <View style={styles.loginContainer}>
          <Text style={styles.loginDescriptionText}>
            Already have an account?{' '}
          </Text>
          <CustomTouchable onPress={handleLoginPressed}>
            <Text style={styles.loginText}>Login</Text>
          </CustomTouchable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS['F9F9FA'],
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS['F9F9FA'],
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  marginB20: {
    marginBottom: 20,
  },
  marginB30: {
    marginBottom: 30,
  },
  loginContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginDescriptionText: {
    fontSize: 18,
    fontFamily: FONTS.REGULAR,
    color: COLORS['272727'],
  },
  loginText: {
    fontSize: 18,
    fontFamily: FONTS.MEDIUM,
    color: COLORS['7F30FF'],
  },
});

export default RegisterScreen;
