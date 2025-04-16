import React, {FC, useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS} from '../../../assets/theme';
import {
  CustomButton,
  CustomTextInput,
  CustomTouchable,
} from '../../../components';
import {StackActions, useNavigation} from '@react-navigation/native';
import {performMobileValidation} from '../../../utilities';
import {useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from '../../../store/store'; // Import types
import {onLogin} from '../../../store/authSlice';
import {useToast} from '../../../utilities/toast';

interface LoginScreenProps {}

const LoginScreen: FC<LoginScreenProps> = props => {
  const mobileNumberRef = useRef('');
  const passwordValueRef = useRef('');
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const {showToast} = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const {loading, success, error, message, description, data} = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (success) {
      handleOnLoginSuccess();
      showToast(message, description, true);
      return;
    }
    if (error) {
      handleOnLoginError();
      showToast(message, description, false);
      return;
    }
  }, [success, error]);

  function handleOnLoginError() {}
  console.log('data', data);

  function handleOnLoginSuccess() {
    const {is_profile_completed, is_shop_linked} = data;
    if (!is_profile_completed) {
      const replaceAction = StackActions.replace('AddProfileScreen');
      navigation.dispatch(replaceAction);
      return;
    }
    if (!is_shop_linked) {
      const replaceAction = StackActions.replace('AddShopScreen');
      navigation.dispatch(replaceAction);
      return;
    }
    const replaceAction = StackActions.replace('BottomTabs');
    navigation.dispatch(replaceAction);
  }

  function validateInputs() {
    if (
      performMobileValidation(mobileNumberRef.current) &&
      passwordValueRef.current.length > 0
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }

  function handleMobileChanged(inputText: string) {
    mobileNumberRef.current = inputText;
    validateInputs();
  }

  function handlePasswordChanged(inputText: string) {
    passwordValueRef.current = inputText?.trim();
    validateInputs();
  }

  function handleContinuePressed() {
    const apiPayload = {
      mobile: mobileNumberRef.current,
      password: passwordValueRef.current,
    };
    dispatch(onLogin(apiPayload));
  }

  function handleRegisterPressed() {
    const navigationAction = StackActions.push('RegisterScreen');
    navigation.dispatch(navigationAction);
  }
  // 9892341234

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.logoText}>ManageKaro</Text>
        <CustomTextInput
          inputContainerStyle={styles.marginB20}
          label="Phone"
          placeholder="Enter your phone number"
          onChangeText={handleMobileChanged}
          keyboardType="numeric"
          maxLength={10}
        />
        <CustomTextInput
          inputContainerStyle={styles.marginB30}
          label="Password"
          placeholder="Enter your password"
          onChangeText={handlePasswordChanged}
          secureTextEntry={true}
        />
        <CustomButton
          isLoading={loading}
          disabled={!isButtonEnabled}
          title="Continue"
          onPress={handleContinuePressed}
        />
        <View style={styles.orContainer}>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerDescriptionText}>
            Don't have an account?{' '}
          </Text>
          <CustomTouchable onPress={handleRegisterPressed}>
            <Text style={styles.registerText}>Register</Text>
          </CustomTouchable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS['FFFFFF'],
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: COLORS['FFFFFF'],
    paddingHorizontal: 20,
  },
  logoText: {
    fontSize: 40,
    marginBottom: 40,
    textAlign: 'center',
    color: COLORS['7F30FF'],
  },
  marginB20: {
    marginBottom: 20,
  },
  marginB30: {
    marginBottom: 30,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 40,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS['B1B1B1'],
  },
  orText: {
    fontSize: 18,
    fontFamily: FONTS.MEDIUM,
    color: COLORS['272727'],
    marginHorizontal: 20,
  },
  googleButton: {
    backgroundColor: COLORS['FFFFFF'],
    borderWidth: 1,
    borderColor: COLORS['E0E0E0'],
    // marginBottom: 40,
  },
  googleButtonTitle: {
    color: COLORS['272727'],
  },
  registerContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerDescriptionText: {
    fontSize: 18,
    fontFamily: FONTS.REGULAR,
    color: COLORS['272727'],
  },
  registerText: {
    fontSize: 18,
    fontFamily: FONTS.MEDIUM,
    color: COLORS['7F30FF'],
  },
});

export default LoginScreen;
