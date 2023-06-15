import { useContext } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { AuthRouts } from "./auth.routs";
import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from './app.routes';

export function Routes() {
  const { user, token } = useAuth()

  console.log("USUÁRIO LOGADO =>" , user)


  return (
    <NavigationContainer>
      { token ? <AppRoutes /> : <AuthRouts />}
    </NavigationContainer>
  );
}
