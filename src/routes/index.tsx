import { NavigationContainer } from "@react-navigation/native";
import { AuthRouts } from "./auth.routs";
import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from "./app.routes";
import Loading from "@components/Loading";

export function Routes() {
  const { token, isLoadingUserStorageData } = useAuth();

  if (isLoadingUserStorageData){
    return (
        <Loading />
    )
}

  return (
    <NavigationContainer>
      {token ? <AppRoutes /> : <AuthRouts />}
    </NavigationContainer>
  );
}
