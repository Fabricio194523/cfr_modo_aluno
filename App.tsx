import 'react-native-gesture-handler';

import React from "react";
import { NativeBaseProvider, Box, StatusBar } from "native-base";
import { THEME } from './src/theme';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Routes } from "@routes/index";
import { AuthContextProvider } from "@contexts/AuthContexts";
import Loading from '@components/Loading';


export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular})
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
      {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
      
    </NativeBaseProvider>
  );
}