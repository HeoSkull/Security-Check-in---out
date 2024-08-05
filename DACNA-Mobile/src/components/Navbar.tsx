import { TouchableOpacity } from "react-native-gesture-handler";

import { DrawerHeaderProps } from "@react-navigation/drawer";
import { getHeaderTitle } from "@react-navigation/elements";
import { RootState } from "@redux/store";

import { StyleSheet, View, StatusBar } from "react-native";
import { Text, Avatar, useTheme } from "react-native-paper";

// Models
import { User } from "@models/User.model";

export default function Navbar({
  options,
  route,
  navigation,
  user,
}: DrawerHeaderProps & { user: User | null }) {
  const themeCustom = useTheme();
  const title = getHeaderTitle(options, route.name);

  const handleOnToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={[styles.container, { backgroundColor: themeCustom.colors.surface }]}>
      <Text style={[styles.title, { color: themeCustom.colors.primary }]}>{title}</Text>
      <TouchableOpacity onPress={handleOnToggleDrawer} style={{ padding: 5, borderRadius: 5 }}>
        <Avatar.Image
          size={32}
          source={
            user?.photo_url ? { uri: user.photo_url } : require("@assets/default_user_avatar.png")
          }
        ></Avatar.Image>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70 + StatusBar.currentHeight!,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingTop: (StatusBar.currentHeight || 0) + 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 10,
  },
});
