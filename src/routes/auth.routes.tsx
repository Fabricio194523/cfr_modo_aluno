import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { SignIn } from "../screens/SignIn";

type AuthRouts = {
  signIn: undefined;
};

export type AuthNavigateRoutesProps = NativeStackNavigationProp<AuthRouts>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRouts>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />
    </Navigator>
  );
}
