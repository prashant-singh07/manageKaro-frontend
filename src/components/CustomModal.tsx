import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ScrollView,
  FlatList,
} from "react-native";
import ReactNativeModal, { ModalProps } from "react-native-modal";
import { COLORS, FONTS } from "../assets/theme";
import CutsomTouchable from "./CustomTouchable";
import { SCREEN_HEIGHT } from "../utilities";

interface CustomModalProps extends Partial<ModalProps> {
  autoCloseDuration?: number;
  modalContainerStyle?: StyleProp<ViewStyle> | undefined;
  title?: string | undefined;
  titleStyle?: StyleProp<TextStyle> | undefined;
  options?: any[] | undefined;
  renderOption?: (item: any) => React.ReactNode | undefined;
  onTitlePressed?: () => void | undefined;
}

export interface CustomModalRef {
  open: () => void;
  close: () => void;
}

const CustomModal = forwardRef<CustomModalRef, CustomModalProps>(
  (props, ref) => {
    const {
      autoCloseDuration,
      modalContainerStyle,
      title,
      titleStyle,
      options,
      renderOption,
      onTitlePressed,
      ...rest
    } = props;
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    useImperativeHandle(
      ref,
      () => {
        return {
          open: openModal,
          close: closeModal,
        };
      },
      []
    );

    // useEffect(() => {
    //   let timer: ReturnType<typeof setTimeout>;
    //   if (isModalVisible && autoCloseDuration) {
    //     timer = setTimeout(() => {
    //       closeModal();
    //     }, autoCloseDuration);
    //   }

    //   return () => {
    //     clearTimeout(timer);
    //   };
    // }, [autoCloseDuration, isModalVisible]);

    function openModal() {
      setIsModalVisible(true);
    }

    function closeModal() {
      setIsModalVisible(false);
    }

    function handleTitlePressed() {
      onTitlePressed?.();
    }

    return (
      <ReactNativeModal
        isVisible={isModalVisible}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        style={styles.modalStyle}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        onSwipeComplete={closeModal}
        // backdropColor={COLORS["000000"]}
        backdropOpacity={0.5}
        useNativeDriver={true}
        {...rest}
      >
        <View style={[styles.modalContainerStyle, modalContainerStyle]}>
          {title && (
            <CutsomTouchable
              style={[styles.flexRowCenter]}
              onPress={handleTitlePressed}
            >
              <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
              <Text style={styles.titleStyle}>+</Text>
            </CutsomTouchable>
          )}

          <FlatList
            data={options}
            keyExtractor={(item, index) =>
              item?.id?.toString() + index?.toString()
            }
            renderItem={({ item, index }) => renderOption?.(item)}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ReactNativeModal>
    );
  }
);

const styles = StyleSheet.create({
  modalStyle: {
    // flex: 1,
    margin: 0,
    justifyContent: "flex-end",
    // height: SCREEN_HEIGHT * 0.7,
    // backgroundColor: COLORS["000000"],
    // paddingHorizontal: 20,
  },
  modalContainerStyle: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: COLORS["F9F9FA"],
    height: SCREEN_HEIGHT * 0.7,
    // flex: 1,
    // justifyContent: "center",

    // alignItems: "flex-start",
  },
  flexRowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS["EBEBEB"],
    borderRadius: 12,
    marginBottom: 10,
  },
  iconStyle: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    marginBottom: 20,
  },
  titleStyle: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS["7F30FF"],
    textAlign: "center",
  },
  optionTitleStyle: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: COLORS["0C0C0C"],
    textAlign: "center",
  },
});

export default CustomModal;
