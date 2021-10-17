import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  video: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    width: "100%",
    height: Dimensions.get("window").height - 47,
    backgroundColor: "black",
  },
  uicontainer: {
    height: "95%",
    justifyContent: "flex-end",
    marginLeft: 8,
  },
  rightContainer: {
    alignSelf: "flex-end",
    marginRight: 10,
  },
  handle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "100",
    marginBottom: 10,
  },
  songrow: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomcontainer: {
    marginBottom: -8,
    padding: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  songname: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
  profilepic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "white",
  },
  rightContainer: {
    alignSelf: "flex-end",
    height: 280,
    justifyContent: "space-between",
    marginRight: 5,
  },
  statsLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
  },
  iconcontainer: {
    alignItems: "center",
  },
  songpic: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: "#4c4c4c",
  },
});

export default styles;
