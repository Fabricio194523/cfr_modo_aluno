import 'react-native-gesture-handler';

import React from "react";
import { NativeBaseProvider, Box, StatusBar } from "native-base";
import { SignIn } from "./src/screens/SignIn";
import { THEME } from './src/theme';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import Loading from '@components/Loading';
import { Routes } from "@routes/index";
import { AuthContextProvider } from "@contexts/AuthContexts";


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