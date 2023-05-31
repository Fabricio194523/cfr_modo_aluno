import { NavigationContainer } from "@react-navigation/native";
import { AuthRouts } from "./auth.routs";

export function Routes() {
  return (
    <NavigationContainer>
      <AuthRouts />
    </NavigationContainer>
  );
}
