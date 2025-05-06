import React, { FC, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ReactNativeModal, { ModalProps } from "react-native-modal";
import { COLORS, FONTS } from "../../../assets/theme";
import {
  CustomButton,
  CustomDivider,
  CustomTextInput,
} from "../../../components";

interface SalesOrderSummrayModalProps extends Partial<ModalProps> {
  onChangeText: (text: string) => void;
  onConfirmRecordSale: () => void;
  isVisible: boolean;
  customerName: string;
  dateOfSale: string;
  totalAmount: number;
  isLoading: boolean;
}

export const SalesOrderSummrayModal: FC<SalesOrderSummrayModalProps> = (
  props
) => {
  const {
    onChangeText,
    onConfirmRecordSale,
    isVisible,
    customerName,
    dateOfSale,
    totalAmount,
    isLoading,
    ...rest
  } = props;

  const [modeOfPayment, setModeOfPayment] = useState<string>("");

  const handleModeOfPaymentChange = (text: string) => {
    setModeOfPayment(text?.trim());
    onChangeText(text);
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={styles.modalStyle}
      backdropOpacity={0.4}
      {...rest}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeaderContainer}>
          <Text style={styles.headerText}>Confirm Sale</Text>
        </View>

        <View style={styles.purchaseDetailsContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Customer</Text>
            <Text style={styles.value}>{customerName}</Text>
          </View>
          <View style={[styles.row, { marginTop: 12 }]}>
            <Text style={styles.label}>Date of Sale</Text>
            <Text style={styles.value}>{dateOfSale}</Text>
          </View>

          <CustomDivider style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.value}>₹{totalAmount}</Text>
          </View>
        </View>
        <CustomDivider style={[styles.divider, { width: "90%" }]} />
        <Text style={[styles.value, { width: "90%" }]}>Mode of Payment*</Text>
        <CustomTextInput
          inputContainerStyle={{ width: "90%", marginBottom: 16, marginTop: 8 }}
          //   style={{ width: "90%", paddingVertical: 12 }}
          placeholder="Enter Mode of Payment"
          onChangeText={handleModeOfPaymentChange}
        />

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Confirm Record Sale"
            onPress={onConfirmRecordSale}
            disabled={!modeOfPayment}
            isLoading={isLoading}
            //   buttonStyle={{ width: "40%" }}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
    paddingHorizontal: 16,
  },
  modalContainer: {
    backgroundColor: COLORS["F9F9FA"],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  modalHeaderContainer: {
    backgroundColor: COLORS["FFFFFF"],
    padding: 16,
    width: "100%",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 16,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS["0C0C0C"],
    textAlign: "center",
  },
  purchaseDetailsContainer: {
    width: "90%",
    padding: 16,
    backgroundColor: COLORS["FFFFFF"],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS["E5E5E5"],
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["787878"],
  },
  value: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["0C0C0C"],
  },
  divider: {
    marginVertical: 12,
  },
  createButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainer: {
    width: "100%",
    backgroundColor: COLORS["FFFFFF"],
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS["EBEBEB"],
  },
});
