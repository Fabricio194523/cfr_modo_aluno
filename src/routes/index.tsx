import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
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
      {token ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
