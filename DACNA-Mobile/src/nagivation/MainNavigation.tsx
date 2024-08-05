import { FAB, Portal } from "react-native-paper";

// Navigations
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";

// Screens
import TimerScreen from "@screens/Timer/TimerScreen";
import GroupsScreen from "@screens/Groups/GroupsScreen";

// Tab Navigator
const Tab = createMaterialBottomTabNavigator();

const BOTTOM_TABS = [
  { name: "Current", icon: "clock", component: TimerScreen },
  { name: "Groups", icon: "account-group", component: GroupsScreen },
];

export default function MainNavigation(props: any) {
  const navigateToCheckIn = () => {
    props.navigation.navigate("QuickResponseNavigation");
  };

  return (
    <>
      <Portal.Host>
        <Tab.Navigator>
          {BOTTOM_TABS.map((tab, index) => (
            <Tab.Screen
              key={index}
              name={tab.name}
              component={tab.component}
              options={{ tabBarIcon: tab.icon }}
            ></Tab.Screen>
          ))}
        </Tab.Navigator>
        <FAB
          style={{ position: "absolute", margin: 16, right: 0, bottom: 90 }}
          icon="qrcode-scan"
          onPress={() => navigateToCheckIn()}
        />
      </Portal.Host>
    </>
  );
}
