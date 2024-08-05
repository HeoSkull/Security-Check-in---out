import { useForm } from "react-hook-form";

import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

//colors
import { currentTheme } from "@themes/themes";
import { RegisterFormModel } from "../models/register-form.model";

//components
import EmailInput from "@components/EmailInput";
import PasswordInput from "@components/PasswordInput";
import ConfirmPasswordInput from "@components/ConfirmPasswordInput";

export default function Form(props: any) {
  const { control, handleSubmit, setError } = useForm<RegisterFormModel>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { onRegister, changeToLogin } = props;

  const onSubmit = (data: RegisterFormModel) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    onRegister(data);
  };

  return (
    <>
      <View>
        <EmailInput control={control} name="email" label="Email" />
        <PasswordInput control={control} name="password" label="Password" />
        <ConfirmPasswordInput control={control} name="confirmPassword" label="Comfirm Password" />
      </View>

      <View>
        <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
          Register
        </Button>
      </View>

      <View>
        <Text style={styles.login}>
          Already have an account?{" "}
          <Text style={styles.loginAction} onPress={changeToLogin}>
            Login
          </Text>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  login: {
    marginTop: 10,
    textAlign: "center",
  },
  loginAction: {
    color: currentTheme.colors.primary,
  },
});
