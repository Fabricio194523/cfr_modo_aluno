import React from "react";
import { NativeBaseProvider, Box, StatusBar } from "native-base";
import { SignIn } from "./src/screen/Groups/SignIn";
import { THEME } from '../cfr_modo_aluno/theme/index';
import Loading from '../cfr_modo_aluno/components/Loading';


export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
      <SignIn />
    </NativeBaseProvider>
  );
}