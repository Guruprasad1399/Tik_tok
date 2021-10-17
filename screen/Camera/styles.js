import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonRecord: {
    alignSelf: "center",
    height: 50,
    width: 50,
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: "#ff4343",
  },
  buttonStop: {
    alignSelf: "center",
    height: 35,
    width: 35,
    marginVertical: 10,
    borderRadius: 3,
    backgroundColor: "#ff4343",
  },
  flip: {
    position: "absolute",
    right: 15,
    top: 700,
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  startstopcontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default styles;
