import React, { FC } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { COLORS, FONTS } from "../../../assets/theme";
import { CustomTouchable, CustomDivider } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  AllProducts: undefined;
  AllSuppliers: undefined;
  AllPurchaseOrders: undefined;
  AllSales: undefined;
  CustomerList: undefined;
  ViewTeam: undefined;
  AddTeamMember: undefined;
  EditProfile: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface MenuItem {
  id: string;
  title: string;
  count?: number;
  onPress: () => void;
}

interface AuthData {
  profile_image?: string;
  name?: string;
  shop_name?: string;
  user_id: string;
  shop_id: string[];
}

const MoreScreen: FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data: authData } = useSelector<RootState, { data: AuthData }>(
    (state: RootState) => state.auth
  );

  const inventoryMenuItems: MenuItem[] = [
    {
      id: "1",
      title: "All Products",
      count: 24,
      onPress: () => navigation.navigate("AllProducts"),
    },
    {
      id: "2",
      title: "All Suppliers",
      count: 4,
      onPress: () => navigation.navigate("AllSuppliers"),
    },
    {
      id: "3",
      title: "All Purchase Orders",
      onPress: () => navigation.navigate("AllPurchaseOrders"),
    },
  ];

  const salesMenuItems: MenuItem[] = [
    {
      id: "1",
      title: "All Sales",
      onPress: () => navigation.navigate("AllSales"),
    },
    {
      id: "2",
      title: "Customer List",
      count: 41,
      onPress: () => navigation.navigate("CustomerList"),
    },
  ];

  const teamMenuItems: MenuItem[] = [
    {
      id: "1",
      title: "View Team",
      onPress: () => navigation.navigate("ViewTeam"),
    },
    {
      id: "2",
      title: "Add New Team Member",
      onPress: () => navigation.navigate("AddTeamMember"),
    },
  ];

  const renderMenuItem = (item: MenuItem) => (
    <CustomTouchable
      key={item.id}
      style={styles.menuItem}
      onPress={item.onPress}
    >
      <Text style={styles.menuItemText}>{item.title}</Text>
      <View style={styles.menuItemRight}>
        {item.count !== undefined && (
          <Text style={styles.countText}>{item.count}</Text>
        )}
        <Text style={styles.chevron}>›</Text>
      </View>
    </CustomTouchable>
  );

  const handleLogout = () => {
    // Implement logout logic
  };

  return (
    <View style={styles.screenContainer}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileInfo}>
          {/* <Image
            source={{ uri: authData?.profile_image }}
            style={styles.profileImage}
            defaultSource={require("../../../assets/images/default-avatar.png")}
          /> */}
          <View style={styles.profileTexts}>
            <Text style={styles.nameText}>
              {authData?.name || "Shop Owner"}
            </Text>
            <Text style={styles.roleText}>Shop Owner</Text>
          </View>
        </View>
        <CustomTouchable onPress={() => navigation.navigate("EditProfile")}>
          {/* <Image
            source={require("../../../assets/images/edit.png")}
            style={styles.editIcon}
          /> */}
        </CustomTouchable>
      </View>

      {/* Shop Name */}
      <CustomTouchable style={styles.shopNameContainer}>
        <Text style={styles.shopNameText}>
          {authData?.shop_name || "Gada Clothing"}
        </Text>
        <Text style={styles.chevron}>›</Text>
      </CustomTouchable>

      <ScrollView style={styles.menuContainer}>
        {/* Inventory Section */}
        <Text style={styles.sectionTitle}>Inventory</Text>
        {inventoryMenuItems.map(renderMenuItem)}

        {/* Sales Section */}
        <Text style={[styles.sectionTitle, styles.marginTop]}>Sales</Text>
        {salesMenuItems.map(renderMenuItem)}

        {/* My Team Section */}
        <Text style={[styles.sectionTitle, styles.marginTop]}>My Team</Text>
        {teamMenuItems.map(renderMenuItem)}

        {/* Logout Button */}
        <CustomTouchable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </CustomTouchable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.F9F9FA,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: COLORS.FFFFFF,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  profileTexts: {
    justifyContent: "center",
  },
  nameText: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["0C0C0C"],
    marginBottom: 4,
  },
  roleText: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: COLORS["787878"],
  },
  editIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS["7F30FF"],
  },
  shopNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: COLORS.FFFFFF,
    marginTop: 1,
  },
  shopNameText: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["0C0C0C"],
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["787878"],
    marginBottom: 8,
  },
  marginTop: {
    marginTop: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.FFFFFF,
    padding: 16,
    borderRadius: 8,
    marginBottom: 1,
  },
  menuItemText: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["0C0C0C"],
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  countText: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["787878"],
    marginRight: 8,
  },
  chevron: {
    fontSize: 20,
    color: COLORS["787878"],
  },
  logoutButton: {
    backgroundColor: COLORS.FFFFFF,
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 24,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.FF0000,
  },
});

export default MoreScreen;
