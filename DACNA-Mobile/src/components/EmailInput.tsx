import { View } from "react-native";
import { TextInput, Text, MD3Colors } from "react-native-paper";
import { useController } from "react-hook-form";

import { isEmail } from "validator";

import globalStyles from "./styles.css";

export default function EmailInput(props: any) {
  const { control, name, label } = props;

  const { field, fieldState } = useController({
    name: name,
    control: control,
    defaultValue: "",
    rules: {
      required: true,
      validate: (value) => isEmail(value) || "Invalid email",
    },
  });

  return (
    <View style={globalStyles.inputContainer}>
      <TextInput
        label={label}
        value={field.value}
        style={globalStyles.input}
        mode="outlined"
        inputMode="email"
        onChangeText={field.onChange}
        autoComplete="email"
        error={fieldState.invalid && fieldState.isDirty}
      />
      <Text style={globalStyles.inputError}>
        {fieldState.invalid && fieldState.isDirty && fieldState.error?.message}
      </Text>
    </View>
  );
}
