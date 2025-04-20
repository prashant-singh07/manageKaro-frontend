import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../../../assets/theme";
import {
  CustomButton,
  CustomHeader,
  CustomTextInput,
  CustomTouchable,
} from "../../../components";
import { StackActions, useNavigation } from "@react-navigation/native";

interface AddPurchaseOrderScreenProps {}

const AddPurchaseOrderScreen: FC<AddPurchaseOrderScreenProps> = (props) => {
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState<number>(1);

  function handleCrossPressed() {
    navigation.goBack();
  }

  function handleAddPurchaseOrderPressed() {
    const navigationAction = StackActions.push("AddPurchaseOrderScreen");
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

  return (
    <View style={styles.screenContainer}>
      <CustomHeader title="Shop" onRightPress={handleCrossPressed} />
      <View style={styles.mainContainer}>
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
      </View>
      <CustomButton
        style={{ alignSelf: "flex-end", margin: 20, borderRadius: 40 }}
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
  mainContainer: {
    flex: 1,
    paddingVertical: 16,
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
});

export default AddPurchaseOrderScreen;
