//Navigations
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

//Screens
import QRScannerScreen from "@screens/QRScanner/QRScannerScreen";
import CheckInScreen from "@screens/CheckIn/CheckIn";

export default function QuickResponseNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="QRScanner">
      <Stack.Screen name="QRScanner" component={QRScannerScreen} />
      <Stack.Screen name="CheckIn" component={CheckInScreen} />
    </Stack.Navigator>
  );
}
