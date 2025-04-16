/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {AppNavigations} from './src/navigations';
import {COLORS} from './src/assets/theme';
import {NavigationContainer} from '@react-navigation/native';
import {ToastProvider} from './src/utilities/toast';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ToastProvider>
          <SafeAreaView style={styles.screenContainer}>
            <NavigationContainer>
              <AppNavigations />
            </NavigationContainer>
          </SafeAreaView>
        </ToastProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.FFFFFF,
  },
});

export default App;
