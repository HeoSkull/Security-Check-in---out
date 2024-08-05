import globalStyles from "@components/styles.css";
import { View } from "react-native";
import { Text, ActivityIndicator, MD3Colors } from "react-native-paper";

export default function Loading() {
  return (
    <View style={[globalStyles.container, { alignContent: "center" }]}>
      <Text style={{ textAlign: "center" }}>
        <ActivityIndicator size="large" animating={true} color={MD3Colors.primary50} />
      </Text>
    </View>
  );
}
