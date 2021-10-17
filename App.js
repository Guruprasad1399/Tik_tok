import React, { useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import "react-native-gesture-handler";
import Navigation from "./navigation/index";
import Amplify from "aws-amplify";
import config from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const randomImages = [
  "https://cdn.pixabay.com/photo/2017/01/08/13/58/cube-1963036__340.jpg",
  "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
  "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
  "https://i.pinimg.com/236x/71/28/3b/71283bb49db55cfee5bb6acd1389c465--tree-of-life-the-tree.jpg",
];

const getRandomImage = () => {
  return randomImages[Math.floor(Math.random() * randomImages.length)];
};

const App = () => {
  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      if (!userInfo) {
        return;
      }
      const getUserResponse = await API.graphql(
        graphqlOperation(getUser, { id: userInfo.attributes.sub })
      );
      if (getUserResponse.data.getUser) {
        console.log("User Already Exists");
        return;
      }

      const newUser = {
        id: userInfo.attributes.sub,
        username: userInfo.username,
        email: userInfo.attributes.email,
        imageUri: getRandomImage(),
      };
      await API.graphql(graphqlOperation(createUser, { input: newUser }));
    };
    fetchUser();
  }, []);
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <Navigation />
      </SafeAreaView>
    </>
  );
};

export default withAuthenticator(App);
