import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listUsers, listPosts } from "../../src/graphql/queries";

const Profile = () => {
  const [user, setuser] = useState("");
  const [useremail, setuseremail] = useState("");
  const [tp, settp] = useState("");
  let totalpost = [];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listUsers));
        const authuser = await Auth.currentAuthenticatedUser();
        for (let i = 0; i < response.data.listUsers.items.length; i++) {
          if (response.data.listUsers.items[i].id === authuser.attributes.sub) {
            setuser(response.data.listUsers.items[i].username);
            setuseremail(response.data.listUsers.items[i].email);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    const fetchposts = async () => {
      try {
        const response1 = await API.graphql(graphqlOperation(listPosts));
        const authuser = await Auth.currentAuthenticatedUser();
        for (let j = 0; j < response1.data.listPosts.items.length; j++) {
          if (
            response1.data.listPosts.items[j].user.id ===
            authuser.attributes.sub
          ) {
            totalpost.push(response1.data.listPosts.items[j].id);
          }
        }
        settp(totalpost.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchposts();
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Profile</Text>
      <View style={styles.profcont}>
        <Text style={styles.profinfo}>Your Username : {user}</Text>
        <Text style={styles.profinfo}>Email id : {useremail}</Text>
        <Text style={styles.profinfo}>Total Posts posted by you : {tp}</Text>
      </View>
    </View>
  );
};

export default Profile;
