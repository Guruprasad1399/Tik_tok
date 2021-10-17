import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    backgroundColor: "black",
  },
  header: {
    margin: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "center",
    borderBottomWidth: 2,
    borderBottomColor: "red",
  },
  profinfo: {
    fontSize: 17,
    margin: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  profcont: {
    position: "absolute",
    top: 200,
    left: 50,
    right: 50,
    alignItems: "center",
  },
});

export default styles;
