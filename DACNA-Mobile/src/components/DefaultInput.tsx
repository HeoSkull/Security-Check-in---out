import { View } from "react-native";
import { TextInput, Text } from "react-native-paper";

import { useController } from "react-hook-form";

import globalStyles from "./styles.css";

export default function DefaultInput(props: any) {
  const { control, name, label } = props;

  const { field, fieldState } = useController({
    name: name,
    control: control,
    defaultValue: "",
    rules: {
      required: true,
    },
  });

  return (
    <View style={globalStyles.inputContainer}>
      <TextInput
        label={label}
        value={field.value}
        style={globalStyles.input}
        mode="outlined"
        inputMode="text"
        onChangeText={field.onChange}
        error={fieldState.invalid && fieldState.isDirty}
      />
      <Text style={globalStyles.inputError}>
        {fieldState.invalid && fieldState.isDirty && fieldState.error?.message}
      </Text>
    </View>
  );
}
