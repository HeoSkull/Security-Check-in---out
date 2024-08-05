import { StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { Button, Text, ActivityIndicator } from "react-native-paper";
import { useSelector } from "react-redux";

//redux
import { RootState } from "@redux/store";

//models
import { LoginFormModel } from "../models/login-form.model";

//components
import EmailInput from "@components/EmailInput";
import DefaultInput from "@components/DefaultInput";
import PasswordInput from "@components/PasswordInput";

// theme
import { currentTheme } from "@themes/themes";

export default function Form(props: any) {
  const { control, handleSubmit } = useForm<LoginFormModel>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const isLogging = useSelector((state: RootState) => state.user.loading);

  const { onLogin, onChangeToRegister } = props;

  const onSubmit = (data: LoginFormModel) => {
    onLogin(data);
  };

  return (
    <>
      <DefaultInput control={control} name="username" label="Username" />
      <PasswordInput control={control} name="password" label="Password" />
      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
        {isLogging ? <ActivityIndicator animating={true} /> : "Login"}
      </Button>
      <Text style={styles.register}>
        Don't have an account?{" "}
        <Text style={styles.registerAction} onPress={onChangeToRegister}>
          Register
        </Text>
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  register: {
    marginTop: 10,
    textAlign: "center",
  },
  registerAction: {
    color: currentTheme.colors.primary,
  },
});
