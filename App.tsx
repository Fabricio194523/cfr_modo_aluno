import 'react-native-gesture-handler';

import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base'

import { Routes } from './src/routes';

import { THEME } from './src/theme';

export default function App() {

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
       <Routes />
    </NativeBaseProvider>
  );
}