import { StyleSheet, View } from "react-native";
import { Text, useTheme, ActivityIndicator, Avatar } from "react-native-paper";

// redux
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

export default function MyAccountScreen() {
  const themeCustom = useTheme();
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <View style={[styles.container, { backgroundColor: themeCustom.colors.background }]}>
      {user ? (
        <>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={100}
              source={
                user.photo_url
                  ? { uri: user.photo_url }
                  : require("@assets/default_user_avatar.png")
              }
            />
          </View>

          <View>
            <Text style={styles.userFullName}>
              {user.first_name} {user.last_name}
            </Text>
            <Text style={styles.username}>@{user.username}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </>
      ) : (
        <ActivityIndicator animating={true} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userFullName: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  username: {
    fontSize: 18,
    textAlign: "center",
    opacity: 0.75,
  },
  userEmail: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.5,
  },
});
