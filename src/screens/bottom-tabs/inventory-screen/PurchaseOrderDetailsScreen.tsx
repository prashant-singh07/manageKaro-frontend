import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import {
  CustomHeader,
  CustomTextInput,
  CustomTouchable,
  CustomDivider,
  CustomButton,
} from "../../../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getPurchaseOrderDetails } from "../../../store/purchaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { IMAGES } from "../../../assets/images";
import { COLORS, FONTS } from "../../../assets/theme";

interface PurchaseOrderDetailsScreenProps {}

const PurchaseOrderDetailsScreen: FC<PurchaseOrderDetailsScreenProps> = (
  props
) => {
  const route = useRoute();
  const purchaseOrder = route?.params;

  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const { getPurchaseOrderDetailsData } = useSelector(
    (state: RootState) => state.purchase
  );
  console.log("getPurchaseOrderDetailsData", getPurchaseOrderDetailsData);

  useEffect(() => {
    const apiPayload = {
      po_id: purchaseOrder?.id,
    };
    dispatch(getPurchaseOrderDetails(apiPayload));
  }, [purchaseOrder]);

  function handleCrossPressed() {
    navigation.goBack();
  }

  function renderItems({ item }: { item: any }) {
    return (
      <View key={item.id} style={styles.productContainer}>
        <View>
          <Text style={styles.productNameText}>{item.sku?.name}</Text>
          <Text
            style={styles.productSizeText}
          >{`${item?.sku?.kind}· ${item?.sku?.size}`}</Text>
        </View>
        <View style={styles.productRightContainer}>
          <View style={styles.productDetailsContainer}>
            <Text>{`₹${item.cost_price} x ${item.quantity}`}</Text>
          </View>
          {/* <CustomTouchable style={styles.deleteContainer} onPress={() => {}}>
            <Image source={IMAGES.DELETE_ICON} style={styles.deleteIcon} />
          </CustomTouchable> */}
        </View>
      </View>
    );
  }

  // Render Total Amount
  function renderTotalAmount() {
    return (
      <View style={{}}>
        <Text style={styles.totalAmountText}>Total</Text>
        <Text style={styles.totalAmountValue}>
          ₹ {purchaseOrder?.total_amount}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <CustomHeader
        title="Purchase Order Details"
        onRightPress={handleCrossPressed}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <CustomTextInput
            value={purchaseOrder?.supplier_name}
            label="Supplier"
            editable={false}
            inputContainerStyle={styles.inputContainer}
          />

          <CustomTextInput
            value={purchaseOrder?.purchase_date}
            label="Date of Purchase"
            editable={false}
          />

          <CustomDivider style={styles.divider} />

          <FlatList
            data={getPurchaseOrderDetailsData || []}
            renderItem={renderItems}
            keyExtractor={(item) => item?.id?.toString()}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>{renderTotalAmount()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.F9F9FA,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  formContainer: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["787878"],
    marginBottom: 8,
  },

  divider: {
    marginVertical: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  itemDetails: {
    flex: 1,
  },
  skuName: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["0C0C0C"],
    marginBottom: 4,
  },
  skuInfo: {
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["787878"],
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["0C0C0C"],
    marginRight: 12,
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.EBEBEB,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    fontSize: 16,
    color: COLORS["787878"],
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

export default PurchaseOrderDetailsScreen;
