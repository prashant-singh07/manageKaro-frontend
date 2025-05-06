import React, { FC, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { COLORS, FONTS } from "../../../assets/theme";
import {
  CustomButton,
  CustomDivider,
  CustomHeader,
  CustomModal,
  CustomSecondaryButton,
  CustomTextInput,
  CustomTouchable,
} from "../../../components";
import {
  StackActions,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { IMAGES } from "../../../assets/images";
import { getAllSuppliers } from "../../../store/supplierSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { CustomModalRef } from "../../../components/CustomModal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getAllSkus } from "../../../store/skuSlice";
import { PurchaseOrderSummaryModal } from "./PurchaseOrderSummaryModal";
import {
  createPurchaseOrder,
  resetCreatePurchaseOrder,
} from "../../../store/purchaseSlice";
import { useToast } from "../../../utilities/toast";

type UNIT_REF_TYPE = {
  id: number;
  sku_id: string;
  sku_name: string;
  cost_price: string;
  quantity: string;
  size: string;
  type: string;
  kind: string;
};

interface AddPurchaseOrderScreenProps {}

const AddPurchaseOrderScreen: FC<AddPurchaseOrderScreenProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { showToast } = useToast();

  const { data: authData } = useSelector((state: RootState) => state.auth);
  const { getAllSkuData } = useSelector((state: RootState) => state.sku);
  const { getAllSuppliersData } = useSelector(
    (state: RootState) => state.supplier
  );
  const {
    createPurchaseOrderLoading,
    createPurchaseOrderSuccess,
    createPurchaseOrderError,
    createPurchaseOrderMessage,
    createPurchaseOrderDescription,
    createPurchaseOrderData,
  } = useSelector((state: RootState) => state.purchase);

  const supplierModaRef = useRef<CustomModalRef>(null);
  const skuModalRef = useRef<CustomModalRef>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [dateOfPurchase, setDateOfPurchase] = useState<Date>(new Date());
  const [addedProducts, setAddedProducts] = useState<UNIT_REF_TYPE[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false);
  const [selectedSku, setSelectedSku] = useState<any>(null);
  const purchaseRateRef = useRef<string | null>(null);
  const [isAddingProductDisabled, setIsAddingProductDisabled] =
    useState<boolean>(true);
  const quantityRef = useRef<string | null>(null);
  const [showPurchaseOrderSummary, setShowPurchaseOrderSummary] =
    useState<boolean>(false);
  const modeOfPaymentRef = useRef<string>("");

  // Fetching Data
  useEffect(() => {
    if (isFocused) {
      const getAllSuppliersApiPayload = {
        user_id: authData?.user_id,
        shop_id: authData?.shop_id[0],
      };
      dispatch(getAllSuppliers(getAllSuppliersApiPayload));

      const getAllSkusApiPayload = {
        user_id: authData?.user_id,
        shop_id: authData?.shop_id[0],
      };
      dispatch(getAllSkus(getAllSkusApiPayload));
    }
  }, [isFocused]);

  useEffect(() => {
    if (createPurchaseOrderSuccess) {
      handleCreatePurchaseOrderSuccess();
    }
  }, [createPurchaseOrderSuccess]);

  // Handle Create Purchase Order Success
  function handleCreatePurchaseOrderSuccess() {
    showToast(createPurchaseOrderMessage, createPurchaseOrderDescription, true);
    setShowPurchaseOrderSummary(false);
    setAddedProducts([]);
    setSelectedSupplier(null);
    setSelectedSku(null);
    dispatch(resetCreatePurchaseOrder());
    navigation.goBack();
  }

  // Updating Add Product Button Disable State
  useEffect(() => {
    updateAddProductDisability();
  }, [isAddingProduct, selectedSku, selectedSupplier]);

  // Handle Cross Pressed
  function handleCrossPressed() {
    navigation.goBack();
  }

  // Handle Supplier Pressed
  function handleSupplierPressed() {
    supplierModaRef.current?.open();
  }

  // Handle Add Supplier Pressed
  function handleAddSupplierPressed() {
    supplierModaRef.current?.close();
    const stackActions = StackActions.push("AddNewSupplierScreen");
    navigation.dispatch(stackActions);
  }

  // Handle Supplier Option Pressed
  function handleSupplierOptionPressed(item: any) {
    supplierModaRef.current?.close();
    setSelectedSupplier(item);
  }

  // Handle Date Picker Pressed
  function handleDatePickerPressed() {
    setShowDatePicker((prev) => !prev);
  }

  // Handle Date Change
  function handleDateChange(event: any, date?: Date) {
    setShowDatePicker(false);
    if (date) {
      setDateOfPurchase(date);
    }
  }

  // Handle Add Product Pressed
  function handleAddProductPressed() {
    if (isAddingProduct) {
      setAddedProducts((prev) => [
        ...prev,
        {
          id: Math.random(),
          sku_id: selectedSku?.id,
          sku_name: selectedSku?.name,
          cost_price: purchaseRateRef.current,
          quantity: quantityRef.current,
          size: selectedSku?.size,
          type: selectedSku?.type,
          kind: selectedSku?.kind,
        },
      ]);
      quantityRef.current = null;
      purchaseRateRef.current = null;
      setSelectedSku(null);
      setIsAddingProduct(false);
    } else {
      setIsAddingProduct(true);
    }
  }

  // Handle Enter Product Name Pressed
  function handleEnterProductNamePressed() {
    skuModalRef.current?.open();
  }

  // Handle Add New SKU Pressed
  function handleAddNewSkuPressed() {
    skuModalRef.current?.close();
    const stackActions = StackActions.push("AddNewSkuScreen");
    navigation.dispatch(stackActions);
  }

  // Handle Sku Option Pressed
  function handleSkuOptionPressed(item: any) {
    skuModalRef.current?.close();
    setSelectedSku(item);
  }

  // Handle Purchase Rate Changed
  function handlePurchaseRateChanged(text: string) {
    purchaseRateRef.current = text?.trim();
    updateAddProductDisability();
  }

  // Handle Quantity Changed
  function handleQuantityChanged(text: string) {
    quantityRef.current = text?.trim();
    updateAddProductDisability();
  }

  // Handle Delete Product Pressed
  function handleDeleteProductPressed(id: number) {
    setAddedProducts((prev) => prev.filter((item) => item.id !== id));
  }

  // Handle Continue Pressed
  function handleCreatePurchaseOrderPressed() {
    setShowPurchaseOrderSummary(true);
  }

  // Updating Add Product Button Disable State
  function updateAddProductDisability() {
    if (isAddingProduct) {
      if (!selectedSku || !purchaseRateRef.current || !quantityRef.current) {
        setIsAddingProductDisabled(true);
        return;
      }
      setIsAddingProductDisabled(false);
      return;
    }
    if (!selectedSupplier) {
      setIsAddingProductDisabled(true);
      return;
    }
    setIsAddingProductDisabled(false);
  }

  // Render Add Product
  function renderAddProduct() {
    if (isAddingProduct) {
      return (
        <View style={styles.productInputContainer}>
          <CustomSecondaryButton
            label="Product Name"
            title={selectedSku?.name || "Enter Product Name"}
            titleStyle={selectedSku ? styles.optionNameText : {}}
            containerStyle={styles.marginBottom20}
            rightImage={IMAGES.CHEVRON_DOWN_ICON}
            onPress={handleEnterProductNamePressed}
          />
          <CustomTextInput
            label="Purchase Rate"
            placeholder="Enter Purchase Rate"
            inputContainerStyle={styles.marginBottom20}
            onChangeText={handlePurchaseRateChanged}
            keyboardType="numeric"
            returnKeyType="done"
          />
          <CustomTextInput
            label="Quantity"
            value={selectedSku?.quantity}
            onChangeText={handleQuantityChanged}
            placeholder="Enter Quantity"
            keyboardType="numeric"
            returnKeyType="done"
          />
        </View>
      );
    }
    return null;
  }

  // Get Total Amount
  function getTotalAmount() {
    return addedProducts.reduce(
      (acc, item) => acc + Number(item.cost_price) * Number(item.quantity),
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
        <Text style={styles.totalAmountValue}>₹ {getTotalAmount()}</Text>
      </View>
    );
  }

  // Handle Mode of Payment Changed
  function handleModeOfPaymentChange(text: string) {
    modeOfPaymentRef.current = text?.trim();
  }

  // Handle Confirm Purchase Order Pressed
  function handleConfirmPurchaseOrderPressed() {
    const addPurchaseOrderApiPayload = {
      user_id: authData?.user_id,
      shop_id: authData?.shop_id[0],
      supplier_id: selectedSupplier?.id,
      purchase_date: dateOfPurchase,
      payment_mode: modeOfPaymentRef.current,
      purchase_items: addedProducts,
      total_amount: getTotalAmount()?.toString(),
      total_quantity: getTotalQuantity()?.toString(),
    };
    dispatch(createPurchaseOrder(addPurchaseOrderApiPayload));
  }

  return (
    <View style={styles.screenContainer}>
      <CustomHeader
        title="Add Purchase Order"
        onRightPress={handleCrossPressed}
      />
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomSecondaryButton
            label="Supplier"
            title={
              selectedSupplier ? selectedSupplier?.name : "Enter Supplier Name"
            }
            titleStyle={selectedSupplier ? styles.optionNameText : {}}
            onPress={handleSupplierPressed}
            rightImage={IMAGES.CHEVRON_DOWN_ICON}
            containerStyle={styles.marginBottom20}
          />
          <CustomSecondaryButton
            label="Date Of Purchase"
            title={dateOfPurchase.toLocaleDateString()}
            titleStyle={dateOfPurchase ? styles.optionNameText : {}}
            onPress={handleDatePickerPressed}
            rightImage={IMAGES.CALENDAR_ICON}
            rightImageStyle={styles.calendarIconStyle}
          />
          {showDatePicker && (
            <DateTimePicker
              value={dateOfPurchase}
              mode="date"
              display="default"
              onChange={handleDateChange}
              // style={{ position: "absolute", bottom: 110, right: 100 }}
            />
          )}

          <CustomDivider />

          {renderAddProduct()}

          {/* Add Product Button */}
          <CustomButton
            title="Add Product"
            onPress={handleAddProductPressed}
            disabled={isAddingProductDisabled}
            style={styles.marginBottom20}
          />

          {/* Added Products */}
          {addedProducts.map((item) => {
            return (
              <View key={item.id} style={styles.productContainer}>
                <View>
                  <Text style={styles.productNameText}>{item.sku_name}</Text>
                  <Text
                    style={styles.productSizeText}
                  >{`${item.kind}· ${item.size}`}</Text>
                </View>
                <View style={styles.productRightContainer}>
                  <View style={styles.productDetailsContainer}>
                    <Text>{`₹${item.cost_price} x ${item.quantity}`}</Text>
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
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        {renderTotalAmount()}
        <CustomButton
          style={{ flex: 1 }}
          title="Create Purchase Order"
          disabled={addedProducts.length === 0}
          onPress={handleCreatePurchaseOrderPressed}
        />
      </View>

      {/* Supplier Modal */}
      <CustomModal
        ref={supplierModaRef}
        title="Add New Supplier"
        onTitlePressed={handleAddSupplierPressed}
        options={getAllSuppliersData || []}
        renderOption={(item: any) => {
          return (
            <CustomTouchable
              style={styles.optionContainer}
              onPress={() => handleSupplierOptionPressed(item)}
            >
              <Text style={styles.optionNameText}>{item.name}</Text>
              <Text style={styles.optionNumberText}>{item.mobile}</Text>
            </CustomTouchable>
          );
        }}
      />

      {/* SKU Modal */}
      <CustomModal
        ref={skuModalRef}
        title="Add New SKU"
        onTitlePressed={handleAddNewSkuPressed}
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

      {/* Purchase Order Summary Modal */}
      <PurchaseOrderSummaryModal
        isVisible={showPurchaseOrderSummary}
        onChangeText={handleModeOfPaymentChange}
        onConfirmPurchaseOrder={handleConfirmPurchaseOrderPressed}
        onBackButtonPress={() => setShowPurchaseOrderSummary(false)}
        onBackdropPress={() => setShowPurchaseOrderSummary(false)}
        supplierName={selectedSupplier?.name}
        purchaseDate={dateOfPurchase.toLocaleDateString()}
        totalAmount={getTotalAmount()}
        totalQuantity={getTotalQuantity()}
        isLoading={createPurchaseOrderLoading}
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
    paddingTop: 16,
  },
  marginBottom20: {
    marginBottom: 20,
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
  calendarIconStyle: {
    width: 16,
    height: 16,
  },
  productInputContainer: {
    backgroundColor: COLORS["FFFFFF"],
    borderWidth: 1,
    borderColor: COLORS["EBEBEB"],
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS["FFFFFF"],
    paddingHorizontal: 20,
    paddingVertical: 16,
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
});
export default AddPurchaseOrderScreen;
