import React, { FC, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS, FONTS } from "../../../assets/theme";
import { CustomDivider, CustomTouchable } from "../../../components";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getPurchaseOrder } from "../../../store/purchaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";

interface PurchaseOrder {
  id: string;
  supplierName: string;
  date: string;
  amount: string;
  orderNumber: string;
}

interface PurchaseOrderScreenProps {
  onPurchaseOrderPressed: (item: any) => void;
}

const PurchaseOrderScreen: FC<PurchaseOrderScreenProps> = (props) => {
  const { onPurchaseOrderPressed } = props;

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const { data: authData } = useSelector((state: RootState) => state.auth);
  const { getPurchaseOrderData } = useSelector(
    (state: RootState) => state.purchase
  );

  useEffect(() => {
    if (isFocused) {
      const apiPayload = {
        user_id: authData?.user_id,
        shop_id: authData?.shop_id[0],
      };
      dispatch(getPurchaseOrder(apiPayload));
    }
  }, [isFocused]);

  function handlePurchaseOrderPressed(item: any) {
    onPurchaseOrderPressed(item);
  }

  const renderPurchaseOrderItem = ({ item }: { item: any }) => {
    return (
      <>
        <CustomTouchable
          onPress={() => handlePurchaseOrderPressed(item)}
          style={styles.orderItem}
        >
          <View style={styles.orderDetails}>
            <Text style={styles.supplierName}>{item?.supplier?.name}</Text>
            <Text style={styles.orderDate}>
              {item.purchase_date} • #{item.id}
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>₹{item.total_amount}</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        </CustomTouchable>
        <CustomDivider />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={getPurchaseOrderData || []}
        renderItem={renderPurchaseOrderItem}
        keyExtractor={(item) => item?.id?.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS["F9F9FA"],
  },
  listContent: {
    // paddingBottom: 16,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderDetails: {
    flex: 1,
  },
  supplierName: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["0C0C0C"],
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["787878"],
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  amount: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["0C0C0C"],
    marginRight: 8,
  },
  chevron: {
    fontSize: 20,
    color: COLORS["C0C0C0"],
  },
});

export default PurchaseOrderScreen;
