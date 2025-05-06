import React, { FC, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { COLORS, FONTS } from "../../../assets/theme";
import { IMAGES } from "../../../assets/images";
import {
  CustomButton,
  CustomDivider,
  CustomHeader,
  CustomSecondaryButton,
  CustomTextInput,
  CustomTouchable,
} from "../../../components";
import DateTimePicker from "@react-native-community/datetimepicker";
import { performMobileValidation, SCREEN_WIDTH } from "../../../utilities";
import {
  StackActions,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getAllSkus } from "../../../store/skuSlice";
import CustomModal, { CustomModalRef } from "../../../components/CustomModal";
import { SalesOrderSummrayModal } from "./SalesOrderSummrayModal";
import {
  createSalesOrder,
  resetCreateSaleOrder,
} from "../../../store/saleSlice";
import { useToast } from "../../../utilities/toast";

type UNIT_REF_TYPE = {
  sku: object | null;
  rate: string;
  quantity: string;
};

interface RecordSaleScreenProps {}

const RecordSaleScreen: FC<RecordSaleScreenProps> = (props) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useToast();

  const unitRef = useRef<UNIT_REF_TYPE>({
    sku: null,
    rate: "",
    quantity: "",
  });

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [dateOfSale, setDateOfSale] = useState<Date>(new Date());
  const customerNameRef = useRef<string>("");
  const [isAddProductDisabled, setIsAddProductDisabled] =
    useState<boolean>(true);
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false);

  const phoneNumberRef = useRef<string>("");
  const skuModalRef = useRef<CustomModalRef>(null);
  const modeOfPaymentRef = useRef<string>("");

  const { data: authData } = useSelector((state: RootState) => state.auth);
  const { getAllSkuData } = useSelector((state: RootState) => state.sku);
  const {
    createSalesOrderLoading,
    createSalesOrderSuccess,
    createSalesOrderMessage,
    createSalesOrderDescription,
  } = useSelector((state: RootState) => state.sales);

  const [selectedSku, setSelectedSku] = useState<any>(null);
  const [addedProducts, setAddedProducts] = useState([]);
  const [showSalesOrderSummaryModal, setShowSalesOrderSummaryModal] =
    useState<boolean>(false);

  useEffect(() => {
    if (isFocused) {
      const getAllSkusApiPayload = {
        user_id: authData?.user_id,
        shop_id: authData?.shop_id[0],
      };
      dispatch(getAllSkus(getAllSkusApiPayload));
    } else {
      dispatch(resetCreateSaleOrder());
    }
  }, [isFocused]);

  useEffect(() => {
    if (createSalesOrderSuccess) {
      handleCreateSaleOrderSuccess();
    }
  }, [createSalesOrderSuccess]);

  function handleCreateSaleOrderSuccess() {
    setShowSalesOrderSummaryModal(false);
    showToast(createSalesOrderMessage, createSalesOrderDescription, true);
    const SaleRecordedRouteParams = { addedProducts, total: getTotalAmount() };
    const action = StackActions.push(
      "SaleRecordedScreen",
      SaleRecordedRouteParams
    );
    navigation.dispatch(action);
  }

  function updateAddProductDisability() {
    if (
      !performMobileValidation(phoneNumberRef.current) ||
      !customerNameRef.current ||
      !dateOfSale
    ) {
      setIsAddProductDisabled(true);
      return;
    }
    if (
      isAddingProduct &&
      (!unitRef.current.sku ||
        !unitRef.current.rate ||
        !unitRef.current.quantity)
    ) {
      setIsAddProductDisabled(true);
      return;
    }
    setIsAddProductDisabled(false);
  }

  const handleCrossPressed = () => {
    const stackAction = StackActions.pop();
    navigation.dispatch(stackAction);
  };

  const handleAddProuctPressed = () => {
    if (!isAddingProduct) {
      setIsAddingProduct(true);
      setIsAddProductDisabled(true);
      return;
    }
    setAddedProducts((prev) => [
      ...prev,
      {
        id: Math.random(),
        sku_id: unitRef.current.sku?.id,
        sku_name: unitRef.current.sku?.name,
        sku_type: unitRef.current.sku?.type,
        sku_ideal_selling_price: unitRef.current.sku?.ideal_selling_price,
        selling_price: unitRef.current.rate,
        quantity: unitRef.current.quantity,
      },
    ]);
    unitRef.current.sku = null;
    unitRef.current.rate = "";
    unitRef.current.quantity = "";
    setSelectedSku(null);
    setIsAddingProduct(false);
    // if (!currentProduct) {
    //   setIsAddProductDisabled(true);
    //   return;
    // }
  };

  const handleSellingPriceChanged = (text: string) => {
    unitRef.current.rate = text;
    updateAddProductDisability();
  };
  const handleQuantityChanged = (text: string) => {
    unitRef.current.quantity = text;
    updateAddProductDisability();
  };

  const handleRecordSalePressed = () => {
    setShowSalesOrderSummaryModal(true);
    // const action = StackActions.push("SaleRecordedScreen");
    // navigation.dispatch(action);
  };

  // Get Total Amount
  function getTotalAmount() {
    return addedProducts.reduce(
      (acc, item) => acc + Number(item.selling_price) * Number(item.quantity),
      0
    );
  }

  // Get Total Quantity
  function getTotalQuantity() {
    return addedProducts.reduce((acc, item) => acc + Number(item.quantity), 0);
  }

  // Render Total Amount
  function renderTotalAmount() {
    return (
      <View style={{ width: "34%" }}>
        <Text style={styles.totalAmountText}>Total</Text>
        <Text style={styles.totalAmountValue}>₹{getTotalAmount()}</Text>
      </View>
    );
  }

  // Handle Date Picker Pressed
  function handleDatePickerPressed() {
    setShowDatePicker((prev) => !prev);
  }

  // Handle Date Change
  function handleDateChange(event: any, date?: Date) {
    setShowDatePicker(false);
    if (date) {
      setDateOfSale(date);
      updateAddProductDisability();
    }
  }

  // Handle Phone Number Changed
  function handlePhoneNumberChanged(text: string) {
    phoneNumberRef.current = text?.trim();
    updateAddProductDisability();
  }

  // Handle Customer Name Changed
  function handleCustomerNameChanged(text: string) {
    customerNameRef.current = text?.trim();
    updateAddProductDisability();
  }

  // Handle Enter Product Name Pressed
  function handleEnterProductNamePressed() {
    skuModalRef.current?.open();
  }

  // Handle Sku Option Pressed
  function handleSkuOptionPressed(item: any) {
    skuModalRef.current?.close();
    unitRef.current.sku = item;
    setSelectedSku(item);
    updateAddProductDisability();
  }

  function handleDeleteProductPressed(id: number) {
    setAddedProducts((prev) => prev.filter((item) => item.id !== id));
  }

  // Handle Mode of Payment Changed
  function handleModeOfPaymentChange(text: string) {
    modeOfPaymentRef.current = text?.trim();
  }

  function handleConfirmRecordSale() {
    const addSalesOrderApiPayload = {
      user_id: authData?.user_id,
      shop_id: authData?.shop_id[0],
      customer_name: customerNameRef.current,
      customer_mobile: phoneNumberRef.current,
      // sku_id: selectedSupplier?.id,
      sale_date: dateOfSale,
      sale_amount: getTotalAmount()?.toString(),
      sale_quantity: getTotalQuantity()?.toString(),
      payment_mode: modeOfPaymentRef.current,
      sales_items: addedProducts,
    };
    console.log("addSalesOrderApiPayload", addSalesOrderApiPayload);

    dispatch(createSalesOrder(addSalesOrderApiPayload));
  }

  return (
    <View style={styles.screenContainer}>
      <CustomHeader title="Record Sale" onRightPress={handleCrossPressed} />
      <ScrollView
        contentContainerStyle={styles.mainContainer}
        showsVerticalScrollIndicator={false}
      >
        <CustomTextInput
          label="Phone Number"
          placeholder="Enter Phone Number"
          keyboardType="number-pad"
          maxLength={10}
          returnKeyType="done"
          inputContainerStyle={styles.marginBottom16}
          onChangeText={handlePhoneNumberChanged}
        />
        <View style={styles.customerDetailsContainer}>
          <CustomTextInput
            label="Customer"
            placeholder="Enter Name"
            inputContainerStyle={{ width: SCREEN_WIDTH / 2.5 }}
            onChangeText={handleCustomerNameChanged}
          />

          <CustomSecondaryButton
            label="Date of Sale"
            title={dateOfSale.toLocaleDateString()}
            titleStyle={{
              fontSize: 14,
              fontFamily: FONTS.REGULAR,
              color: COLORS["0C0C0C"],
            }}
            onPress={handleDatePickerPressed}
            containerStyle={{ width: SCREEN_WIDTH / 2.5 }}
            rightImage={IMAGES.CALENDAR_ICON}
            onRightPress={handleDatePickerPressed}
          />
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={dateOfSale}
            mode="date"
            display="default"
            onChange={handleDateChange}
            style={{ alignSelf: "flex-end" }}
          />
        )}
        <CustomDivider />
        <Text style={styles.orderDetailsText}>Order Details</Text>

        {isAddingProduct && (
          <View style={styles.addItemContainer}>
            {/*  */}
            <View style={{ flexDirection: "row" }}>
              <CustomSecondaryButton
                label="Product Name"
                title={selectedSku?.name || "Enter Product Name"}
                titleStyle={selectedSku ? styles.optionNameText : {}}
                containerStyle={[
                  styles.marginBottom16,
                  { width: SCREEN_WIDTH * 0.6, marginRight: 8 },
                ]}
                rightImage={IMAGES.CHEVRON_DOWN_ICON}
                onPress={handleEnterProductNamePressed}
              />
              <CustomTextInput
                label="Rate"
                inputContainerStyle={[
                  styles.marginBottom16,
                  { width: SCREEN_WIDTH * 0.2 },
                ]}
                editable={false}
                placeholder={selectedSku?.ideal_selling_price?.toString()}
                placeholderTextColor={COLORS["0C0C0C"]}
              />
            </View>

            {/* Sku Details */}
            <View
              style={{ flexDirection: "row", width: "100%", marginBottom: 16 }}
            >
              <CustomTextInput
                label="Type"
                placeholder={selectedSku?.type}
                inputContainerStyle={{
                  width: SCREEN_WIDTH / 3 - 36,
                  marginRight: 20,
                }}
                editable={false}
                placeholderTextColor={COLORS["0C0C0C"]}
              />
              <CustomTextInput
                label="Kind"
                placeholder={selectedSku?.kind}
                inputContainerStyle={{
                  width: SCREEN_WIDTH / 3 - 36,
                  marginRight: 20,
                }}
                editable={false}
                placeholderTextColor={COLORS["0C0C0C"]}
              />
              <CustomTextInput
                label="Size"
                placeholder={selectedSku?.size}
                inputContainerStyle={{
                  width: SCREEN_WIDTH / 3 - 36,
                  marginRight: 20,
                }}
                editable={false}
                placeholderTextColor={COLORS["0C0C0C"]}
              />
            </View>

            {/* Sold at and Quantity */}
            <View style={{ flexDirection: "row", flex: 1 }}>
              <CustomTextInput
                label="Selling Price"
                inputContainerStyle={[
                  styles.marginBottom16,
                  { width: SCREEN_WIDTH / 2 - 40, marginRight: 8 },
                ]}
                onChangeText={handleSellingPriceChanged}
                keyboardType="numeric"
              />
              <CustomTextInput
                label="Quantity"
                inputContainerStyle={[
                  styles.marginBottom16,
                  { width: SCREEN_WIDTH / 2 - 40 },
                ]}
                onChangeText={handleQuantityChanged}
                keyboardType="numeric"
              />
            </View>
          </View>
        )}
        <CustomButton
          title="Add Products"
          onPress={handleAddProuctPressed}
          disabled={isAddProductDisabled}
          style={styles.marginBottom20}
        />

        {addedProducts.map((item) => {
          return (
            <View key={item.id} style={styles.productContainer}>
              <View>
                <Text
                  style={styles.productNameText}
                >{`${item.sku_name}: ${item.sku_type}`}</Text>
                <View style={styles.productDetailsContainer}>
                  <Text>{`₹${item.selling_price} x ${item.quantity}`}</Text>
                </View>
              </View>
              <View style={styles.productRightContainer}>
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: FONTS.MEDIUM,
                      color: COLORS["787878"],
                      textDecorationLine: "line-through",
                      textAlign: "right",
                    }}
                  >
                    ₹{item?.sku_ideal_selling_price * item?.quantity}
                  </Text>
                  <Text>₹{item?.selling_price * item?.quantity} </Text>
                </View>
                <CustomTouchable
                  style={styles.deleteContainer}
                  onPress={() => handleDeleteProductPressed(item.id)}
                >
                  <Image
                    source={IMAGES.DELETE_ICON}
                    style={styles.deleteIcon}
                  />
                </CustomTouchable>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.buttonContainer}>
        {renderTotalAmount()}
        <CustomButton
          disabled={
            !phoneNumberRef.current ||
            !customerNameRef.current ||
            addedProducts.length == 0
          }
          style={{ flex: 1 }}
          title="Record Sale"
          onPress={handleRecordSalePressed}
        />
      </View>

      {/* SKU Modal */}
      <CustomModal
        ref={skuModalRef}
        options={getAllSkuData || []}
        renderOption={(item: any) => {
          return (
            <CustomTouchable
              style={styles.optionContainer}
              onPress={() => handleSkuOptionPressed(item)}
            >
              <Text style={styles.optionNameText}>{item.name}</Text>
              <Text style={styles.optionNumberText}>{item.mobile}</Text>
            </CustomTouchable>
          );
        }}
      />

      {/* Sales Confirmation Modal */}
      <SalesOrderSummrayModal
        isVisible={showSalesOrderSummaryModal}
        onBackButtonPress={() => setShowSalesOrderSummaryModal(false)}
        onBackdropPress={() => setShowSalesOrderSummaryModal(false)}
        onChangeText={handleModeOfPaymentChange}
        customerName={customerNameRef.current}
        dateOfSale={dateOfSale.toLocaleDateString()}
        totalAmount={getTotalAmount()}
        onConfirmRecordSale={handleConfirmRecordSale}
        isLoading={createSalesOrderLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS["F5F5F5"],
    // backgroundColor: COLORS["FFFFFF"],
  },
  mainContainer: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  labelStyle: {
    backgroundColor: COLORS["F5F5F5"],
  },
  orderDetailsText: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["787878"],
    marginBottom: 16,
  },
  addItemContainer: {
    backgroundColor: COLORS["FFFFFF"],
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  marginBottom20: {
    marginBottom: 20,
  },
  marginBottom16: {
    marginBottom: 16,
  },
  customerDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS["FFFFFF"],
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  totalAmountText: {
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["787878"],
  },
  totalAmountValue: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["0C0C0C"],
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
  optionNumberText: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: COLORS["0C0C0C"],
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS["FFFFFF"],
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS["EBEBEB"],
  },
  productRightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productDetailsContainer: {
    backgroundColor: COLORS["7F30FF"] + "26",
    borderWidth: 1,
    borderColor: COLORS["7F30FF"],
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  deleteContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  deleteIcon: {
    width: 12,
    height: 12,
    resizeMode: "contain",
    marginLeft: 4,
  },
  productNameText: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["0C0C0C"],
  },
  productSizeText: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: COLORS["787878"],
  },
});

export default RecordSaleScreen;
