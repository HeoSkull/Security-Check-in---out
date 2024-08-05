import { useDispatch } from "react-redux";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";

//redux
import { AppDispatch } from "@redux/store";
import { UserActions } from "@redux/user/UserSlice";
import { AuthActions } from "@redux/auth/AuthSlice";

//models
import { LoginFormModel } from "./models/login-form.model";

//components
import FormComponent from "@screens/Login/components/LoginFormComponent";
import PlatformComponent from "@screens/Login/components/PlatformComponent";

export default function LoginScreen(props: any) {
  const { navigation } = props;

  // store
  const dispatch = useDispatch<AppDispatch>();

  const handleOnLogin = async (form: LoginFormModel) => {
    await dispatch(UserActions.loginUserAsync(form));
    await dispatch(AuthActions.checkUserSessionAsync());
  };

  const handleChangeToRegister = () => {
    navigation.navigate("Register");
  };

  const handleOnGoogleLogin = () => {
    console.log("Google login");
  };

  const handleOnFacebookLogin = () => {
    console.log("Facebook login");
  };

  const handleOnGithubLogin = () => {
    console.log("Github login");
  };

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require("@assets/logo.png")} />
        <Text style={styles.title} variant="titleLarge">
          Login
        </Text>
      </View>
      <FormComponent onLogin={handleOnLogin} onChangeToRegister={handleChangeToRegister} />
      <PlatformComponent
        onGoogleLogin={handleOnGoogleLogin}
        onFacebookLogin={handleOnFacebookLogin}
        onGithubLogin={handleOnGithubLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
});
