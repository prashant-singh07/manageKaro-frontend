import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS } from "../../../assets/theme";
import {
  CustomButton,
  CustomHeader,
  CustomTextInput,
  CustomTouchable,
} from "../../../components";
import { StackActions, useNavigation } from "@react-navigation/native";
import PurchaseOrderScreen from "./PurchaseOrderScreen";
import { IMAGES } from "../../../assets/images";
import { SCREEN_WIDTH } from "../../../utilities";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface AddPurchaseOrderScreenProps {}

const AddPurchaseOrderScreen: FC<AddPurchaseOrderScreenProps> = (props) => {
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState<number>(1);

  const { data: authData } = useSelector((state: RootState) => state.auth);

  function handleAddPurchaseOrderPressed() {
    const navigationAction = StackActions.push("AddPurchaseOrderScreen");
    navigation.dispatch(navigationAction);
  }

  function handlePurchaseOrderPressed(item: any) {
    const { id, supplier, purchase_date, total_amount } = item;

    const navigationAction = StackActions.push("PurchaseOrderDetailsScreen", {
      id,
      supplier_name: supplier?.name,
      purchase_date,
      total_amount,
    });
    navigation.dispatch(navigationAction);
  }

  const TAB_ITEMS = [
    {
      id: 1,
      label: "Stocks",
    },
    {
      id: 2,
      label: "Purchase Order",
    },
  ];

  function renderContent() {
    switch (selectedTab) {
      case 1:
        return null; //<StocksScreen />;
      case 2:
        return (
          <PurchaseOrderScreen
            onPurchaseOrderPressed={handlePurchaseOrderPressed}
          />
        );
    }
  }
  console.log(authData);
  return (
    <View style={styles.screenContainer}>
      {/* <CustomHeader title="Shop" onRightPress={handleCrossPressed} /> */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.wishingText}>{`Hello ${authData?.name}`}</Text>
          <Text style={styles.nameText}>{`${authData?.shop_name}`}</Text>
        </View>
        <Image style={styles.profileIcon} source={IMAGES.PROFILE_PIC} />
      </View>
      <View style={styles.mainContainer}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          {TAB_ITEMS.map((item, index) => {
            const { id, label } = item;
            const isSelected = selectedTab === id;
            return (
              <CustomTouchable
                key={id?.toString()}
                onPress={() => setSelectedTab(id)}
                style={[styles.tabItem, isSelected && styles.selectedTabItem]}
              >
                <Text
                  style={[
                    styles.tabItemLabel,
                    isSelected && styles.selectedTabItemLabel,
                  ]}
                >
                  {label}
                </Text>
              </CustomTouchable>
            );
          })}
        </View>
        {/* Content */}
        <View style={styles.contentContainer}>{renderContent()}</View>
      </View>
      <CustomButton
        style={{
          position: "absolute",
          bottom: 16,
          // left: 20,
          right: 20,
          borderRadius: 40,
          width: SCREEN_WIDTH / 2,
        }}
        title="Add Purchase Order"
        onPress={handleAddPurchaseOrderPressed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS["F9F9FA"],
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS["FFFFFF"],
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  wishingText: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["787878"],
  },
  nameText: {
    fontSize: 18,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS["0C0C0C"],
  },
  profileIcon: {
    height: 46,
    width: 46,
    resizeMode: "contain",
    borderRadius: 23,
  },
  mainContainer: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS["EBEBEB"],
    borderRadius: 6,
    padding: 2,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    paddingVertical: 8,
  },
  tabItemLabel: {
    fontSize: 13,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["787878"],
  },
  selectedTabItem: {
    backgroundColor: COLORS["FFFFFF"],
  },
  selectedTabItemLabel: {
    color: COLORS["7F30FF"],
  },
  marginBottom16: {
    marginBottom: 16,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
  },
});

export default AddPurchaseOrderScreen;
