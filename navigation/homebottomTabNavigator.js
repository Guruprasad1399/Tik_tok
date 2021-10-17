import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screen/Home";
import Camera from "../screen/Camera";
import Profile from "../screen/Profile";
import Inbox from "../screen/Inbox";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text } from "react-native";
import PlusIcon from "../assets/Images/plus-icon.png";
import Search from "../screen/Search";

const Tab = createBottomTabNavigator();

const homebottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#000" },
        tabBarActiveTintColor: "#fff",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={"Home"}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={"Search"}
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={"Upload"}
        component={Camera}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => (
            <Image
              source={PlusIcon}
              style={{ height: 35, resizeMode: "contain" }}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name={"Inbox"}
        component={Inbox}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="message-minus-outline"
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"Profile"}
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default homebottomTabNavigator;
