import { StyleSheet, Platform } from "react-native";

const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#82ccdd'

  },
  button: {
    backgroundColor:'pink',
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  text: {
    color: "#000080",
    fontSize: 35,
  },
  userNameText: {
    color: "darkblue",
    fontSize: 25,
    fontWeight: "bold",
  },
});
export default homeStyle;
