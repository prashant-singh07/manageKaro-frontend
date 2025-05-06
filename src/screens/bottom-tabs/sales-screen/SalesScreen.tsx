import React, { FC, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { COLORS, FONTS } from "../../../assets/theme";
import { IMAGES } from "../../../assets/images";
import { CustomButton } from "../../../components";
import { SCREEN_WIDTH } from "../../../utilities";
import {
  StackActions,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAllSales } from "../../../store/saleSlice";
import { AppDispatch, RootState } from "../../../store/store";

interface SalesScreenProps {}

const INVOICE_LIST = [
  {
    id: 129741,
    name: "Tarak Mehta",
    date: "04/03/25",
    price: "12,000",
  },
  {
    id: 129742,
    name: "Bhide",
    date: "04/03/25",
    price: "12,000",
  },
  {
    id: 129743,
    name: "Popatal",
    date: "04/03/25",
    price: "12,000",
  },
];

const SalesScreen: FC<SalesScreenProps> = (props) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();

  const { data: authData } = useSelector((state: RootState) => state.auth);

  const { getSalesOrderData, getSalesOrderSuccess } = useSelector(
    (state: RootState) => state.sales
  );

  useEffect(() => {
    const apiPayload = {
      user_id: authData?.user_id,
      shop_id: authData?.shop_id[0],
    };
    dispatch(getAllSales(apiPayload));
  }, [isFocused]);

  const handleRecordSalePressed = () => {
    const stackAction = StackActions.push("RecordSaleScreen");
    navigation.dispatch(stackAction);
  };

  console.log("getSalesOrderData", getSalesOrderData);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.wishingText}>Good Evening!</Text>
          <Text style={styles.nameText}>Prabal Gondane</Text>
        </View>
        <Image style={styles.profileIcon} source={IMAGES.PROFILE_PIC} />
      </View>
      <View style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.yourBillsText}>YOUR BILLS</Text>
          <View style={styles.separatorStyle}></View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {getSalesOrderSuccess &&
              getSalesOrderData?.map((item) => {
                const { id, sale_date, customer_name, sale_amount } = item;
                return (
                  <>
                    <View key={id?.toString()} style={styles.rowCenter}>
                      <View style={styles.userAndIdContainer}>
                        <Text>{customer_name}</Text>
                        <Text>{`#${id} - ${sale_date}`}</Text>
                      </View>
                      <Text>{`₹${sale_amount}`}</Text>
                    </View>
                    <View style={styles.separatorStyle}></View>
                  </>
                );
              })}
          </ScrollView>
        </View>
        <CustomButton
          title="Record Sale"
          style={styles.buttonContainer}
          onPress={handleRecordSalePressed}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  yourBillsText: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS["787878"],
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  separatorStyle: {
    height: 1,
    backgroundColor: COLORS["EBEBEB"],
    marginVertical: 16,
  },
  userAndIdContainer: {
    flex: 1,
  },
  buttonContainer: {
    width: SCREEN_WIDTH / 2,
    alignSelf: "flex-end",
    borderRadius: 40,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default SalesScreen;
