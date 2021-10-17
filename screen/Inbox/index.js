import React from "react";
import { View, Image } from "react-native";
import styles from "./styles";

const Inbox = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "http://www.artnet.com/WebServices/images/ll00061lldK1MJFgONeR3CfDrCWvaHBOc9ZBF/pasta-oner-your-mailbox-is-empty.jpg",
        }}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default Inbox;
