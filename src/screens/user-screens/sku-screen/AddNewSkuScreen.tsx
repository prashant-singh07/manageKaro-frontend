import React, { FC, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS } from "../../../assets/theme";
import {
  CustomButton,
  CustomHeader,
  CustomModal,
  CustomSecondaryButton,
  CustomTextInput,
  CustomTouchable,
} from "../../../components";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  addNewSupplier,
  resetAddNewSupplier,
} from "../../../store/supplierSlice";
import { useToast } from "../../../utilities/toast";
import { IMAGES } from "../../../assets/images";
import { CustomModalRef } from "../../../components/CustomModal";
import { addNewSku, resetAddNewSku } from "../../../store/skuSlice";

type FormDataType = {
  user_id: string;
  shop_id: string;
  name: string | null;
  type: string | null;
  kind: string | null;
  size: string | null;
  ideal_selling_price: string | null;
};

type ProductTypeOptionType = {
  id: number;
  title: string;
};
const PRODUCT_TYPE_OPTIONS: ProductTypeOptionType[] = [
  {
    id: 0,
    title: "Top",
  },
  {
    id: 1,
    title: "Bottom",
  },
];

const PRODUCT_KIND_OPTIONS = {
  "0": [
    {
      id: 0,
      title: "T-Shirt ",
    },
    {
      id: 1,
      title: "Shirt",
    },
  ],
  "1": [
    {
      id: 0,
      title: "Formal Pant",
    },
    {
      id: 1,
      title: "Jeans",
    },
    {
      id: 2,
      title: "Shorts",
    },
    {
      id: 3,
      title: "Trousers",
    },
  ],
};

const PRODUCT_SIZE_OPTIONS = {
  "0": [
    {
      id: 0,
      title: "S",
    },
    {
      id: 1,
      title: "M",
    },
    {
      id: 2,
      title: "L",
    },
    {
      id: 3,
      title: "XL",
    },
    {
      id: 4,
      title: "XXL",
    },
  ],
  "1": [
    {
      id: 0,
      title: "28",
    },
    {
      id: 1,
      title: "30",
    },
    {
      id: 2,
      title: "32",
    },
    {
      id: 3,
      title: "34",
    },
    {
      id: 4,
      title: "36",
    },
    {
      id: 5,
      title: "38",
    },
    {
      id: 6,
      title: "40",
    },
  ],
};

interface AddNewSkuScreenProps {}

const AddNewSupplierScreen: FC<AddNewSkuScreenProps> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useToast();

  const { data: authData } = useSelector((state: RootState) => state.auth);
  const {
    addNewSkuLoading,
    addNewSkuSuccess,
    addNewSkuMessage,
    addNewSkuDescription,
  } = useSelector((state: RootState) => state.sku);

  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const productNameRef = useRef<string | null>(null);
  const productMrpRef = useRef<string | null>(null);

  const typeModalRef = useRef<CustomModalRef>(null);
  const kindModalRef = useRef<CustomModalRef>(null);
  const sizeModalRef = useRef<CustomModalRef>(null);
  const [selectedProductType, setSelectedProductType] =
    useState<ProductTypeOptionType | null>(null);
  const [selectedProductKind, setSelectedProductKind] =
    useState<ProductTypeOptionType | null>(null);
  const [selectedProductSize, setSelectedProductSize] =
    useState<ProductTypeOptionType | null>(null);

  useEffect(() => {
    if (addNewSkuSuccess) {
      handleAddSkuSuccess();
    }
  }, [addNewSkuSuccess]);

  useEffect(() => {
    if (selectedProductType) {
      setSelectedProductKind(null);
      setSelectedProductSize(null);
    }
  }, [selectedProductType]);

  function handleAddSkuSuccess() {
    showToast(addNewSkuMessage, addNewSkuDescription, true);

    dispatch(resetAddNewSku());
    const stackActions = StackActions.pop();
    navigation.dispatch(stackActions);
  }

  function handleBackPressed() {
    navigation.goBack();
  }

  function validateFormData() {
    if (
      !productNameRef.current ||
      !selectedProductType ||
      !selectedProductKind ||
      !selectedProductSize ||
      !productMrpRef.current
    ) {
      setIsButtonEnabled(false);
      return;
    }
    setIsButtonEnabled(true);
  }

  function handleNameChanged(text: string) {
    productNameRef.current = text?.trim();
    validateFormData();
  }

  function handleMrpChanged(text: string) {
    productMrpRef.current = text?.trim();
    validateFormData();
  }

  function handleAddNewProductPressed() {
    const formData: FormDataType = {
      user_id: authData?.user_id || "",
      shop_id: authData?.shop_id[0] || "",
      name: productNameRef.current,
      type: selectedProductType?.title || null,
      kind: selectedProductKind?.title || null,
      size: selectedProductSize?.title || null,
      ideal_selling_price: productMrpRef.current || null,
    };

    dispatch(addNewSku(formData));
  }

  function handleProductTypePressed() {
    typeModalRef.current?.open();
  }

  function handleProductTypeOptionSelected(option: any) {
    typeModalRef.current?.close();
    // formDataRef.current.type = option.title;
    setSelectedProductType(option);
    validateFormData();
  }

  function handleProductKindPressed() {
    kindModalRef.current?.open();
  }

  function handleProductKindOptionSelected(option: any) {
    kindModalRef.current?.close();
    setSelectedProductKind(option);
    validateFormData();
  }

  function handleProductSizePressed() {
    sizeModalRef.current?.open();
  }

  function handleProductSizeOptionSelected(option: any) {
    sizeModalRef.current?.close();
    setSelectedProductSize(option);
    validateFormData();
  }

  return (
    <View style={styles.screenContainer}>
      <CustomHeader title="Add New Product" onBackPress={handleBackPressed} />
      <View style={styles.mainContainer}>
        <CustomTextInput
          label="Product Name"
          placeholder="Enter Product Name"
          inputContainerStyle={styles.marginB20}
          onChangeText={handleNameChanged}
        />
        <CustomSecondaryButton
          label="Type"
          title={selectedProductType?.title || "Enter Product Type"}
          titleStyle={selectedProductType ? styles.optionNameText : {}}
          containerStyle={styles.marginB20}
          rightImage={IMAGES.CHEVRON_DOWN_ICON}
          onPress={handleProductTypePressed}
        />
        <CustomSecondaryButton
          label="Kind"
          title={selectedProductKind?.title || "Enter Product Kind"}
          titleStyle={selectedProductKind ? styles.optionNameText : {}}
          containerStyle={styles.marginB20}
          rightImage={IMAGES.CHEVRON_DOWN_ICON}
          onPress={handleProductKindPressed}
        />
        <CustomSecondaryButton
          label="Size"
          title={selectedProductSize?.title || "Enter Product Size"}
          titleStyle={selectedProductSize ? styles.optionNameText : {}}
          containerStyle={styles.marginB20}
          rightImage={IMAGES.CHEVRON_DOWN_ICON}
          onPress={handleProductSizePressed}
        />
        <CustomTextInput
          label="MRP"
          placeholder="Enter MRP"
          inputContainerStyle={styles.marginB20}
          onChangeText={handleMrpChanged}
          keyboardType="numeric"
          returnKeyType="done"
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Add New Product"
          disabled={!isButtonEnabled}
          onPress={handleAddNewProductPressed}
          isLoading={addNewSkuLoading}
        />
      </View>

      <CustomModal
        ref={typeModalRef}
        options={PRODUCT_TYPE_OPTIONS}
        title="Select Product Type"
        renderOption={(option) => {
          return (
            <CustomTouchable
              style={styles.optionContainer}
              onPress={() => handleProductTypeOptionSelected(option)}
            >
              <Text style={styles.optionNameText}>{option.title}</Text>
            </CustomTouchable>
          );
        }}
      />
      <CustomModal
        ref={kindModalRef}
        options={PRODUCT_KIND_OPTIONS[selectedProductType?.id]}
        title="Enter Product Kind"
        renderOption={(option) => {
          return (
            <CustomTouchable
              style={styles.optionContainer}
              onPress={() => handleProductKindOptionSelected(option)}
            >
              <Text style={styles.optionNameText}>{option.title}</Text>
            </CustomTouchable>
          );
        }}
      />
      <CustomModal
        ref={sizeModalRef}
        options={PRODUCT_SIZE_OPTIONS[selectedProductKind?.id]}
        title="Select Product Size"
        renderOption={(option) => {
          return (
            <CustomTouchable
              style={styles.optionContainer}
              onPress={() => handleProductSizeOptionSelected(option)}
            >
              <Text style={styles.optionNameText}>{option.title}</Text>
            </CustomTouchable>
          );
        }}
      />
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
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS["EBEBEB"],
    borderRadius: 12,
    marginBottom: 10,
  },
  optionNameText: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: COLORS["0C0C0C"],
  },
});

export default AddNewSupplierScreen;
