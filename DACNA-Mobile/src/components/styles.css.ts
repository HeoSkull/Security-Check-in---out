import { StyleSheet, StatusBar } from "react-native";
import { MD3Colors } from "react-native-paper";

export default StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 10,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    alignContent: "center",
  },
  inputContainer: {
    marginBottom: 5,
  },
  input: {
    marginBottom: 0,
  },
  inputError: {
    color: MD3Colors.error50,
    fontSize: 13,
    marginBottom: 0,
  },
});
