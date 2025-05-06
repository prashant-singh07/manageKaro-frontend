import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  InventoryScreen,
  LoginScreen,
  AddProfileScreen,
  RecordSaleScreen,
  RegisterScreen,
  SaleRecordedScreen,
  AddShopScreen,
  AddPurchaseOrderScreen,
  AddNewSupplierScreen,
  AddNewSkuScreen,
  PurchaseOrderDetailsScreen,
  MoreScreen,
  SalesScreen,
} from "../screens";
import { CustomTabBar } from "../components";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="SalesScreen" component={SalesScreen} />
      <Tabs.Screen name="InventoryScreen" component={InventoryScreen} />
      <Tabs.Screen name="MoreScreen" component={MoreScreen} />
    </Tabs.Navigator>
  );
}

function RegisterStack() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="AddProfileScreen" component={AddProfileScreen} />
      <Stack.Screen name="AddShopScreen" component={AddShopScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function AppNavigations() {
  return (
    <Stack.Navigator
      initialRouteName="RegisterStack"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="RegisterStack" component={RegisterStack} />
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="RecordSaleScreen"
        component={RecordSaleScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="SaleRecordedScreen"
        component={SaleRecordedScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="AddPurchaseOrderScreen"
        component={AddPurchaseOrderScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="AddNewSupplierScreen"
        component={AddNewSupplierScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="AddNewSkuScreen"
        component={AddNewSkuScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="PurchaseOrderDetailsScreen"
        component={PurchaseOrderDetailsScreen}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigations;
