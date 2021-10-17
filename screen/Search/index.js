import React, { useState, useEffect } from "react";
import { View, TextInput, Pressable, Text, ScrollView } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { API, graphqlOperation } from "aws-amplify";
import { listPosts } from "../../src/graphql/queries";
import { Storage } from "aws-amplify";

const Search = () => {
  const [searchtxt, setsearchtxt] = useState("");
  const [searcheddata, setsearchedData] = useState("");
  const [videoUri, setvideoUri] = useState("");
  const [viduri, setviduri] = useState("");

  const searchtexthandler = (enteredtext) => {
    setsearchtxt(enteredtext);
  };

  useEffect(() => {
    const searchedpost = async () => {
      try {
        const resp = await API.graphql(graphqlOperation(listPosts));
        for (let i = 0; i < resp.data.listPosts.items.length; i++) {
          if (resp.data.listPosts.items[i].description === searchtxt) {
            setsearchedData(resp.data.listPosts.items[i].description);
            setvideoUri(resp.data.listPosts.items[i].videoUri);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    searchedpost();
  }, [searchtexthandler]);

  useEffect(() => {
    const render = async () => {
      setviduri(await Storage.get(videoUri));
    };
    render();
  }, [onSearch]);

  const onSearch = () => {
    if (searchtxt === "") {
      alert("You havent searched anything");
    } else {
      console.log(searchtxt);
      setsearchtxt("");
    }
  };

  return (
    <View style={styles.maincont}>
      <View style={styles.container}>
        <TextInput
          placeholder="Search for Post, username"
          style={styles.txtin}
          placeholderTextColor="white"
          value={searchtxt}
          onChangeText={searchtexthandler}
          numberOfLines={1}
          maxLength={35}
        />
        <Pressable onPress={onSearch}>
          {searchtxt === "" ? (
            <Ionicons name="search" size={30} color="white" />
          ) : (
            <Ionicons name="close" size={30} color="white" />
          )}
        </Pressable>
      </View>
      <View style={styles.searchContainer}>
        <Text style={styles.result}>
          Matches Found :{" "}
          {searcheddata ? searcheddata : <Text>No results found</Text>}
        </Text>
      </View>
      {searcheddata ? (
        <>
          <Text
            style={{
              fontSize: 16,
              color: "#000",
              fontWeight: "bold",
              margin: 10,
            }}
          >
            Your results :
          </Text>

          <ScrollView style={styles.video}>
            <Text
              style={{
                margin: 10,
              }}
            >
              {" "}
              {viduri}
            </Text>
          </ScrollView>
        </>
      ) : (
        <View style={styles.video}>
          <Text
            style={{
              fontSize: 20,
              color: "#000",
              fontWeight: "bold",
              margin: 10,
            }}
          >
            No Video
          </Text>
        </View>
      )}
    </View>
  );
};

export default Search;
