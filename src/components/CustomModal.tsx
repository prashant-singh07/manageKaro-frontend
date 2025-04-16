import React, {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  Image,
  ImageStyle,
  TextStyle,
  BackHandler,
} from 'react-native';
import ReactNativeModal, {ModalProps} from 'react-native-modal';
import {COLORS, FONTS} from '../assets/theme';

interface CustomModalProps extends Partial<ModalProps> {
  autoCloseDuration?: number;
  modalContainerStyle?: StyleProp<ViewStyle> | undefined;
  icon?: ImageSourcePropType | undefined;
  iconStyle?: StyleProp<ImageStyle>;
  title?: string | undefined;
  titleStyle?: StyleProp<TextStyle> | undefined;
  description?: string | undefined;
  descriptionStyle?: StyleProp<TextStyle> | undefined;
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
      icon,
      iconStyle,
      title,
      titleStyle,
      description,
      descriptionStyle,
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
      [],
    );

    useEffect(() => {
      let timer: ReturnType<typeof setTimeout>;
      if (isModalVisible && autoCloseDuration) {
        timer = setTimeout(() => {
          closeModal();
        }, autoCloseDuration);
      }

      return () => {
        clearTimeout(timer);
      };
    }, [autoCloseDuration, isModalVisible]);

    function openModal() {
      setIsModalVisible(true);
    }

    function closeModal() {
      setIsModalVisible(false);
    }

    return (
      <ReactNativeModal
        isVisible={isModalVisible}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        style={styles.modalStyle}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        {...rest}>
        <View style={[styles.modalContainerStyle, modalContainerStyle]}>
          {icon ? (
            <Image style={[styles.iconStyle, iconStyle]} source={icon} />
          ) : null}
          {title ? (
            <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
          ) : null}
          {description ? (
            <Text style={[styles.descriptionStyle, descriptionStyle]}>
              {description}
            </Text>
          ) : null}
        </View>
      </ReactNativeModal>
    );
  },
);

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    margin: 0,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContainerStyle: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: COLORS['FFFFFF'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  titleStyle: {
    fontSize: 20,
    fontFamily: FONTS.MEDIUM,
    color: COLORS['272727'],
    textAlign: 'center',
  },
  descriptionStyle: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS['B1B1B1'],
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CustomModal;
