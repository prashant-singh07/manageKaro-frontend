import React, { FC, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../../assets/theme";
import {
  CustomButton,
  CustomHeader,
  CustomTextInput,
} from "../../../components";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  addNewSupplier,
  resetAddNewSupplier,
} from "../../../store/supplierSlice";
import { performMobileValidation } from "../../../utilities";
import { useToast } from "../../../utilities/toast";

type FormDataType = {
  user_id: string;
  shop_id: string;
  name: string | null;
  mobile: string | null;
  email_id: string | null;
  address: string | null;
  gst_number: string | null;
};

interface AddNewSupplierScreenProps {}

const AddNewSupplierScreen: FC<AddNewSupplierScreenProps> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useToast();

  const { data: authData } = useSelector((state: RootState) => state.auth);
  const {
    addNewSupplierLoading,
    addNewSupplierSuccess,
    addNewSupplierMessage,
    addNewSupplierDescription,
  } = useSelector((state: RootState) => state.supplier);

  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const formDataRef = useRef<FormDataType>({
    user_id: authData?.user_id || "",
    shop_id: authData?.shop_id[0] || "",
    name: null,
    mobile: null,
    email_id: null,
    address: null,
    gst_number: null,
  });

  useEffect(() => {
    if (addNewSupplierSuccess) {
      handleAddSupplierSuccess();
    }
  }, [addNewSupplierSuccess]);

  function handleAddSupplierSuccess() {
    showToast(addNewSupplierMessage, addNewSupplierDescription, true);

    dispatch(resetAddNewSupplier());
    const stackActions = StackActions.pop();
    navigation.dispatch(stackActions);
  }

  function handleBackPressed() {
    navigation.goBack();
  }

  function handleNameChanged(text: string) {
    formDataRef.current.name = text?.trim();
    validateFormData();
  }

  function handleMobileChanged(text: string) {
    formDataRef.current.mobile = text?.trim();
    validateFormData();
  }

  function handleEmailChanged(text: string) {
    formDataRef.current.email_id = text?.trim();
    validateFormData();
  }

  function handleAddressChanged(text: string) {
    formDataRef.current.address = text?.trim();
    validateFormData();
  }

  function handleGSTINChanged(text: string) {
    formDataRef.current.gst_number = text?.trim();
    validateFormData();
  }

  function validateFormData() {
    if (
      !formDataRef.current?.name ||
      !performMobileValidation(formDataRef.current?.mobile)
      // !formDataRef.current?.email_id ||
      // !formDataRef.current?.address
    ) {
      setIsButtonEnabled(false);
      return;
    }
    setIsButtonEnabled(true);
  }

  function handleAddSupplierPressed() {
    dispatch(addNewSupplier(formDataRef.current));
  }

  return (
    <View style={styles.screenContainer}>
      <CustomHeader title="Add New Supplier" onBackPress={handleBackPressed} />
      <View style={styles.mainContainer}>
        <CustomTextInput
          label="Name"
          placeholder="Enter Supplier Name"
          inputContainerStyle={styles.marginB20}
          onChangeText={handleNameChanged}
        />
        <CustomTextInput
          label="Mobile Number"
          placeholder="Enter Mobile Number"
          keyboardType="number-pad"
          maxLength={10}
          inputContainerStyle={styles.marginB20}
          onChangeText={handleMobileChanged}
        />
        <CustomTextInput
          label="Email"
          placeholder="Enter Email"
          keyboardType="email-address"
          inputContainerStyle={styles.marginB20}
          onChangeText={handleEmailChanged}
        />
        <CustomTextInput
          label="Address"
          placeholder="Enter Address"
          inputContainerStyle={styles.marginB20}
          onChangeText={handleAddressChanged}
        />
        <CustomTextInput
          label="GSTIN"
          placeholder="Enter GSTIN"
          inputContainerStyle={styles.marginB20}
          onChangeText={handleGSTINChanged}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Add New Supplier"
          disabled={!isButtonEnabled}
          onPress={handleAddSupplierPressed}
          isLoading={addNewSupplierLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS["F9F9FA"],
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  marginB20: {
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: COLORS["FFFFFF"],
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});

export default AddNewSupplierScreen;
