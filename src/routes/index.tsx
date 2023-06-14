import { useContext } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { AuthRouts } from "./auth.routs";
import { useAuth } from "../hooks/useAuth";

export function Routes() {
  const { user } = useAuth()

  console.log("USUÁRIO LOGADO =>" , user)


  return (
    <NavigationContainer>
      <AuthRouts />
    </NavigationContainer>
  );
}
