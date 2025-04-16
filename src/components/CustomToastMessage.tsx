import {TypedUseLazyQuerySubscription} from '@reduxjs/toolkit/query/react';
import React, {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {StyleSheet, View, Text, Platform, Image} from 'react-native';
import {COLORS} from '../assets/theme';
import ReactNativeModal, {ModalProps} from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IMAGES} from '../assets/images';

interface CustomToastMessageProps extends Partial<ModalProps> {
  message?: string | undefined;
  description?: string | undefined;
  isSuccess?: boolean | undefined;
  visible: boolean;
  // autoClose?: number;
}
export interface CustomToastMessageRef {
  open: () => void;
  close: () => void;
}

const CustomToastMessage = forwardRef<
  CustomToastMessageRef,
  CustomToastMessageProps
>((props, ref) => {
  const {message, description, isSuccess, visible = false, ...rest} = props;
  const [isVisible, setIsVisible] = useState<boolean>(visible);

  const {top} = useSafeAreaInsets();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isVisible) {
      timer = setTimeout(() => closeModal(), 3000);
    }

    return () => clearTimeout(timer);
  }, [isVisible]);

  function closeModal() {
    setIsVisible(false);
  }

  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={styles.modalStyle}
      animationIn={'slideInDown'}
      animationOut={'slideOutUp'}
      animationInTiming={500}
      animationOutTiming={500}
      swipeDirection={'up'}
      onSwipeComplete={closeModal}
      swipeThreshold={0.8}
      backdropOpacity={0}
      {...rest}>
      <View
        style={[
          styles.modalContainer,
          {marginTop: Platform.OS === 'ios' ? top + 10 : top},
        ]}>
        <Image
          source={isSuccess ? IMAGES.ICON_CHECK_CIRCLE : IMAGES.GOOGLE_ICON}
          style={styles.statusImageStyle}
        />
        <View>
          {message ? <Text>{message}</Text> : null}
          {description ? <Text>{description}</Text> : null}
        </View>
      </View>
    </ReactNativeModal>
  );
});

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
    justifyContent: 'flex-start',
  },
  modalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS['FFFFFF'],
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: COLORS['7F30FF'],
    shadowColor: COLORS['000000'],
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: {height: 2, width: 2},
    elevation: 4,
  },
  statusImageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
});

export default CustomToastMessage;
