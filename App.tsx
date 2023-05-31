import React from "react";
import { NativeBaseProvider, Box, StatusBar } from "native-base";
import { SignIn } from "./src/screen/Groups/SignIn";
import { THEME } from '../cfr_modo_aluno/theme/index';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import Loading from '../cfr_modo_aluno/components/Loading';
import { Routes } from "@routes/index";


export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Poppins_400Regular})
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}