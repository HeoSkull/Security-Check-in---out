import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Avatar, Button, Drawer, Portal } from "react-native-paper";

import { DrawerContentComponentProps } from "@react-navigation/drawer";

//Redux
import { AppDispatch } from "@redux/store";
import { useDispatch } from "react-redux";

import { UserActions } from "@redux/user/UserSlice";

// Models
import { FullUser } from "@models/User.model";

//Component
import ConfirmDialog from "./ComfirmDialog";

export default function DrawerContentComponent(
  props: DrawerContentComponentProps & { user: FullUser | null; reInitializeApp: () => void }
) {
  const dispatch = useDispatch<AppDispatch>();

  const { reInitializeApp, navigation } = props;

  const [active, setActive] = useState<string>("Home");
  const [confirmDialogVisible, setConfirmDialogVisible] = useState<boolean>(false);

  const handleOnConfirmLogout = () => {
    setConfirmDialogVisible(true);
  };

  const handleOnLogout = async () => {
    await dispatch(UserActions.logoutUserAsync());
    reInitializeApp();
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Drawer.Section style={styles.userContainer}>
            <Avatar.Image
              size={64}
              source={
                props.user?.photo_url
                  ? { uri: props.user.photo_url }
                  : require("@assets/default_user_avatar.png")
              }
            ></Avatar.Image>
            <Text style={styles.userName}>
              {props.user?.first_name} {props.user?.last_name}
            </Text>
            <Text style={styles.userEmail}>{props.user?.email}</Text>
          </Drawer.Section>

          <Drawer.Section>
            <Drawer.Item
              label="Home"
              active={active === "Home"}
              onPress={() => {
                setActive("Home");
                navigation.navigate("Home");
              }}
              icon={"home"}
            />
            <Drawer.Item
              label="My Account"
              active={active === "My Account"}
              onPress={() => {
                setActive("My Account");
                navigation.navigate("My Account");
              }}
              icon={"account"}
            />
            <Drawer.Item
              label="Settings"
              active={active === "Settings"}
              onPress={() => {
                setActive("Settings");
                navigation.navigate("Settings");
              }}
              icon={"cog"}
            />
          </Drawer.Section>
          <Button
            mode="contained"
            icon={"logout"}
            style={styles.logoutButton}
            onPress={handleOnConfirmLogout}
          >
            Log out
          </Button>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Cham Cong Online</Text>
          <Text style={styles.footerText}>Version 1.0.0</Text>
        </View>
      </View>
      <Portal>
        <ConfirmDialog
          visible={confirmDialogVisible}
          message="Are you sure you want to log out?"
          callback={(result) => {
            if (result) {
              handleOnLogout();
            }
            setConfirmDialogVisible(false);
          }}
        />
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 40,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  userContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.5,
  },
  logoutButton: {
    marginTop: 15,
  },
  footer: {
    alignItems: "center",
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.5,
  },
});
