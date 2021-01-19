/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Index from './components/Index.js';
import {ConfigProvider} from './context.js';

const App: () => React$Node = ({pageProps}) => {
  return (
    <ConfigProvider>
      <Index {...pageProps} />
    </ConfigProvider>
  );
};

export default App;
