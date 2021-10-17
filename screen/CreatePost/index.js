import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import { createPost } from "../../src/graphql/mutations";
import moment from "moment";
import { Storage, API, graphqlOperation, Auth } from "aws-amplify";
import { useRoute, useNavigation } from "@react-navigation/native";

const Createpost = () => {
  const [description, setDescription] = useState("");
  const [videoKey, setVideoKey] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();

  const uploadToStorage = async (imagePath) => {
    try {
      const response = await fetch(imagePath);

      const blob = await response.blob();

      const filename = `${moment().format("Do MMMM YYYY, h:mm:ss a")}.mp4`;

      const s3Response = await Storage.put(filename, blob);
      setVideoKey(s3Response.key);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    uploadToStorage(route.params.videoUri);
  }, []);

  const onPublish = async () => {
    if (!videoKey) {
      console.log("Video is not yet uploaded");
      return;
    }
    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      const newPost = {
        videoUri: videoKey,
        description: description,
        userID: userInfo.attributes.sub,
        songID: "a85fd71e-efce-41e1-bdff-1ba198ff50d8",
      };

      const response = await API.graphql(
        graphqlOperation(createPost, { input: newPost })
      );
      console.log(response);
      navigation.navigate("Home", { screen: "Home" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={description}
        onChangeText={setDescription}
        numberOfLines={5}
        placeholder={"Description"}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={onPublish}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Publish</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Createpost;
