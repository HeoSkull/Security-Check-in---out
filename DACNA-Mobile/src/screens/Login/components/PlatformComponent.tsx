import { View, StyleSheet } from "react-native";
import { IconButton, TouchableRipple } from "react-native-paper";

import googleSVG from "@assets/icons/google.svg";
import facebookSVG from "@assets/icons/facebook.svg";
import githubSVG from "@assets/icons/github.svg";

export default function PlatformComponent(props: any) {
  const { onGoogleLogin, onFacebookLogin, onGithubLogin } = props;

  return (
    <View>
      <View style={styles.iconContainer}>
        <TouchableRipple>
          <IconButton icon={googleSVG} mode="contained-tonal" size={32} onPress={onGoogleLogin} />
        </TouchableRipple>
        <TouchableRipple>
          <IconButton
            icon={facebookSVG}
            mode="contained-tonal"
            size={32}
            onPress={onFacebookLogin}
          />
        </TouchableRipple>
        <TouchableRipple>
          <IconButton icon={githubSVG} mode="contained-tonal" size={32} onPress={onGithubLogin} />
        </TouchableRipple>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
});
