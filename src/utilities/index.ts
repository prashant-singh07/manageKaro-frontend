import {useEffect} from 'react';
import {Alert, BackHandler, Dimensions} from 'react-native';

export const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} =
  Dimensions.get('screen');

export function performNameValidation(text: string) {
  const regex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
  return regex.test(text);
}
export function performEmailPhoneValidation(text: string) {
  const regex =
    /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[6-9]\d{9})$/;
  return regex.test(text);
}

export function performMobileValidation(text: string | null) {
  if (!text) {
    return false;
  }
  const regex = /^[6-9]\d{9}$/;
  return regex.test(text);
}

export default function usePreventBack(
  message = 'You cannot go back from here.',
) {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', message, [{text: 'OK', onPress: () => null}]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
}
