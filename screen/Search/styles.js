import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    padding: 5,
    justifyContent: "space-between",
    backgroundColor: "#000",
  },
  txtin: {
    color: "#fff",
    fontSize: 16,
  },
  searchContainer: {
    marginLeft: 15,
    marginTop: 5,
    padding: 5,
    width: "90%",
    height: "6%",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  result: {
    fontSize: 20,
    padding: 5,
    alignItems: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  maincont: {
    flex: 1,
  },
  video: {
    flex: 1,
    margin: 10,
  },
});

export default styles;
