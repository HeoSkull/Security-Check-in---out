import { useState } from "react";
import { View } from "react-native";
import { useController } from "react-hook-form";
import { TextInput, Text } from "react-native-paper";

import globalStyles from "./styles.css";

export default function PasswordInput(props: any) {
  const { control, name, label } = props;

  const { field, fieldState } = useController({
    name: name,
    control: control,
    defaultValue: "",
    rules: {
      required: true,
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
      maxLength: {
        value: 20,
        message: "Password must be at most 20 characters",
      },
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <View style={globalStyles.inputContainer}>
      <TextInput
        label={label}
        value={field.value}
        style={globalStyles.input}
        mode="outlined"
        secureTextEntry={!showPassword}
        onChangeText={field.onChange}
        right={<TextInput.Icon icon="eye" onPress={toggleShowPassword} />}
      />
      <Text style={globalStyles.inputError}>
        {fieldState.invalid && fieldState.isDirty && fieldState.error?.message}
      </Text>
    </View>
  );
}
