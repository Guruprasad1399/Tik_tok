import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import homebottomTabNavigator from "./homebottomTabNavigator";
import createPost from "../screen/CreatePost";

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={homebottomTabNavigator} />
        <Stack.Screen
          name="CreatePost"
          component={createPost}
          options={{ headerShown: true, title: "Post" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
