import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { SignIn } from "../screen/Groups/SignIn";

type AuthRouts = {
  signIn: undefined;
};

export type AuthNavigateRoutesProps = NativeStackNavigationProp<AuthRouts>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRouts>();

export function AuthRouts() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />
    </Navigator>
  );
}
