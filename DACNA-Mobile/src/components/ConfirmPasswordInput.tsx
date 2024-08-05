import { useState } from "react";
import { View } from "react-native";
import { useController } from "react-hook-form";
import { TextInput, Text } from "react-native-paper";

import globalStyles from "./styles.css";

export default function ConfirmPasswordInput(props: any) {
  const { control, name, label } = props;

  const {
    field,
    fieldState,
    formState: { errors },
  } = useController({
    name: name,
    control: control,
    defaultValue: "",
    rules: {
      required: true,
      validate: (value) => {
        return true;
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
        {fieldState.invalid && fieldState.isDirty && fieldState.error?.message}{" "}
        {errors.root?.message}
      </Text>
      {}
    </View>
  );
}
