import React, {FC, useEffect, useRef, useState} from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, FONTS} from '../../../assets/theme';
import {
  CustomButton,
  CustomHeader,
  CustomSecondaryButton,
  CustomTextInput,
} from '../../../components';
import {StackActions, useNavigation} from '@react-navigation/native';
import {IMAGES} from '../../../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store/store';
import {updateProfile} from '../../../store/profileSlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useToast} from '../../../utilities/toast';

type formDataType = {
  user_id: number;
  name: string | null;
  email_id: string | null;
  gender: string | null;
  dob: string | Date | null;
  address: string | null;
  role: string | null;
  gst_number: string | null;
  profile_image: string | null;
};

interface AddProfileScreenProps {}

const AddProfileScreen: FC<AddProfileScreenProps> = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const {data: authData} = useSelector((state: RootState) => state.auth);
  const {
    profileLoading,
    profileSuccess,
    profileError,
    profileMessage,
    profileDescription,
    profileData,
  } = useSelector((state: RootState) => state.profile);
  const {showToast} = useToast();

  const formDataRef = useRef<formDataType>({
    user_id: authData?.user_id,
    name: null,
    email_id: null,
    gender: null,
    dob: null,
    address: null,
    role: null,
    gst_number: null,
    profile_image: null,
  });
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    if (profileSuccess) {
      console.log('profileSuccess', profileSuccess);
      handleProfileSuccess();
      showToast(profileMessage, profileDescription, true);
      return;
    }
    if (profileError) {
      console.log('profileError', profileError);
      return;
    }
  }, [profileSuccess, profileError]);

  function handleProfileSuccess() {
    const stackActions = StackActions.push('AddShopScreen');
    navigation.dispatch(stackActions);
  }

  function handleBackPressed() {
    navigation.goBack();
  }

  function handleNameChanged(text: string) {
    formDataRef.current.name = text?.trim();
    setIsButtonEnabled(formDataRef.current.name?.length > 0);
  }

  function handleEmailChanged(text: string) {
    formDataRef.current.email_id = text?.trim();
  }

  function handleDateOfBirthPressed() {
    setShowDatePicker(true);
  }

  function handleDateOfBirthConfirmed(event: any, selectedDate?: Date) {
    const currentDate = selectedDate || formDataRef.current.dob;
    // setShowDatePicker(Platform.OS === 'ios'); // for iOS, stays open
    // formDataRef.current.dob = currentDate;
    setShowDatePicker(false);
  }

  function handleAddressChanged(text: string) {
    formDataRef.current.address = text?.trim();
  }

  function handleContinuePressed() {
    console.log(
      'handleContinuePressed formDataRef.current',
      formDataRef.current,
    );
    dispatch(updateProfile(formDataRef.current));
  }

  return (
    <View style={styles.screenContainer}>
      <CustomHeader title="Set up Profile" onBackPress={handleBackPressed} />
      <ScrollView
        contentContainerStyle={styles.mainContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <CustomTextInput
          label="Name"
          placeholder="Enter your name"
          inputContainerStyle={styles.marginB20}
          onChangeText={handleNameChanged}
        />
        <CustomTextInput
          label="Email"
          placeholder="Enter your email"
          inputContainerStyle={styles.marginB20}
          onChangeText={handleEmailChanged}
        />

        <CustomSecondaryButton
          containerStyle={styles.marginB20}
          label="Gender"
          title="Gender"
          rightImage={IMAGES.CHEVRON_DOWN_ICON}
          rightImageStyle={styles.chevronDownImageStyle}
          onRightPress={() => {}}
        />
        <CustomSecondaryButton
          containerStyle={styles.marginB20}
          label="Date of Birth"
          title="Date of Birth"
          rightImage={IMAGES.CALENDAR_ICON}
          onRightPress={handleDateOfBirthPressed}
        />
        <CustomTextInput
          label="Address"
          placeholder="Enter your address"
          inputContainerStyle={styles.marginB20}
          onChangeText={handleAddressChanged}
        />
        <CustomTextInput label="GSTN" placeholder="Enter your GSTN" />
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Continue"
          disabled={!isButtonEnabled}
          onPress={handleContinuePressed}
          isLoading={profileLoading}
        />
      </View>
      {showDatePicker && (
        <DateTimePicker
          display="default"
          mode="date"
          value={formDataRef.current.dob}
          // date={new Date()}
          onChange={handleDateOfBirthConfirmed}
          onCancel={() => setShowDatePicker(false)}
        />
      )}
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
export default AddProfileScreen;
