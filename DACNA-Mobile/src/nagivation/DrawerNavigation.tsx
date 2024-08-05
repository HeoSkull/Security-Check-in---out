import { useTheme, Icon } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Navigations
import MainNavigation from "./MainNavigation";

// Screens
import MyAccountScreen from "@screens/MyAccount/MyAccountScreen";
import SettingScreen from "@screens/Setting/SettingScreen";

//Components
import Navbar from "@components/Navbar";
import DrawerContentComponent from "@components/DrawerContent";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation(props: any) {
  const themeCustom = useTheme();
  const user = useSelector((state: RootState) => state.user.user);
  const { reInitializeApp } = props.route.params;

  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => <Navbar {...props} user={user} />,
        drawerPosition: "right",
        drawerStyle: {
          backgroundColor: themeCustom.colors.surface,
        },
      }}
      drawerContent={(props) => (
        <DrawerContentComponent {...props} user={user} reInitializeApp={reInitializeApp} />
      )}
    >
      <Drawer.Screen key={1} name="Home" component={MainNavigation} />
      <Drawer.Screen key={2} name="My Account" component={MyAccountScreen} />
      <Drawer.Screen key={3} name="Settings" component={SettingScreen} />
    </Drawer.Navigator>
  );
}
