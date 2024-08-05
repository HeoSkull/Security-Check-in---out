import { createNativeStackNavigator } from "@react-navigation/native-stack";

// navigations
const Stack = createNativeStackNavigator();

// screens
import LoginScreen from "@screens/Login/LoginScreen";
import RegisterScreen from "@screens/Register/RegisterScreen";

export default function AuthenticationNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
