import { View, Image, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { RegisterFormModel } from "./models/register-form.model";

import FormComponent from "./components/RegisterFormComponent";

export default function RegisterScreen(props: any) {
  const { navigation } = props;

  const handleOnRegister = (form: RegisterFormModel) => {
    console.log(form);
  };

  const handleChangeToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require("@assets/logo.png")} />
        <Text style={styles.title} variant="titleLarge">
          Register
        </Text>
      </View>
      <FormComponent onRegister={handleOnRegister} changeToLogin={handleChangeToLogin} />
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
