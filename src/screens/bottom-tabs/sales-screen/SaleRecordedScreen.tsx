import React, { FC, use, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { COLORS, FONTS } from "../../../assets/theme";
import { IMAGES } from "../../../assets/images";
import {
  CustomButton,
  CustomDivider,
  CustomHeader,
  CustomTextInput,
  CustomTouchable,
} from "../../../components";
import { SCREEN_WIDTH } from "../../../utilities";
import {
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const SaleRecordedScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const routeParam = route.params;
  const { addedProducts, total } = routeParam;
  console.log("routeParam", routeParam);

  const {
    createSalesOrderLoading,
    createSalesOrderSuccess,
    createSalesOrderMessage,
    createSalesOrderDescription,
    createSalesOrderData,
  } = useSelector((state: RootState) => state.sales);

  const handleCrossPressed = () => {
    navigation.navigate("BottomTabs");
  };

  const handleReturnToHomePressed = () => {
    navigation.navigate("BottomTabs");
  };

  return (
    <View style={styles.screenContainer}>
      <CustomHeader title="Sale Recorded" onRightPress={handleCrossPressed} />
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={styles.createSaleOrderStatusContainer}>
          <Text style={styles.statusTextStyle}>{createSalesOrderMessage}</Text>
        </View>
        <CustomDivider />

        <Text style={styles.billSummary}>Bill Summary</Text>
        <View style={styles.biillSummaryContainer}>
          <View style={[styles.rowCenter, styles.marginBottom12]}>
            <Text style={styles.billSummaryLabel}>Customer</Text>
            <Text style={styles.billSummaryValue}>
              {createSalesOrderData?.customer_name}
            </Text>
          </View>
          <View style={[styles.rowCenter, styles.marginBottom12]}>
            <Text style={styles.billSummaryLabel}>Date</Text>
            <Text style={styles.billSummaryValue}>
              {createSalesOrderData?.sale_date}
            </Text>
          </View>
          <View style={[styles.rowCenter]}>
            <Text style={styles.billSummaryLabel}>Bill Number</Text>
            <Text style={styles.billSummaryValue}>
              #{createSalesOrderData?.id}
            </Text>
          </View>

          <CustomDivider style={styles.marginVertical12} />

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
                </View>
              </View>
            );
          })}

          <CustomDivider style={styles.marginVertical12} />
          <View style={[styles.rowCenter]}>
            <Text style={styles.billSummaryLabel}>Total</Text>
            <Text style={styles.billSummaryValue}>₹{total}</Text>
          </View>
        </View>

        <CustomDivider style={styles.marginVertical16} />
      </ScrollView>
      <View style={styles.buttonCotainer}>
        <CustomButton
          title="Return to Home"
          onPress={handleReturnToHomePressed}
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
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  createSaleOrderStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS["E0E0E0"],
    borderRadius: 12,
    padding: 12,
    backgroundColor: COLORS["FFFFFF"],
  },
  statusTextStyle: {
    fontSize: 14,
    fontFamily: FONTS["MEDIUM"],
    color: COLORS["000000"],
  },
  billSummary: {
    fontSize: 14,
    fontFamily: FONTS["MEDIUM"],
    color: COLORS["787878"],
    marginBottom: 16,
  },
  biillSummaryContainer: {
    borderWidth: 1,
    borderColor: COLORS["EBEBEB"],
    borderRadius: 12,
    padding: 12,
    backgroundColor: COLORS["FFFFFF"],
    width: "100%",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // flex: 1,
  },
  billSummaryLabel: {
    fontSize: 14,
    fontFamily: FONTS["MEDIUM"],
    color: COLORS["787878"],
  },
  billSummaryValue: {
    fontSize: 14,
    fontFamily: FONTS["MEDIUM"],
    color: COLORS["0C0C0C"],
  },
  marginBottom12: {
    marginBottom: 12,
  },
  marginVertical12: {
    marginVertical: 12,
  },
  marginVertical16: {
    marginVertical: 16,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS["FFFFFF"],
    // padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    // borderWidth: 1,
    borderColor: COLORS["EBEBEB"],
  },
  productRightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productDetailsContainer: {
    // backgroundColor: COLORS["7F30FF"] + "26",
    // borderWidth: 1,
    borderColor: COLORS["7F30FF"],
    // padding: 8,
    borderRadius: 8,
    marginTop: 4,
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
  buttonCotainer: {
    backgroundColor: COLORS["FFFFFF"],
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS["E0E0E0"],
  },
});

export default SaleRecordedScreen;
