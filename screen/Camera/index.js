import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable } from "react-native";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const Camera1 = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [audperm, setAudperm] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isRecording, setIsRecording] = useState(false);
  const [camera, setcamera] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      const { audstatus } = await Audio.requestPermissionsAsync();
      if (status === "granted") {
        setHasPermission(status === "granted");
      }
      if (audstatus === "granted") {
        setAudperm(audstatus === "granted");
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takeVideo = async () => {
    if (camera && !isRecording) {
      setIsRecording(true);
      let video = await camera.recordAsync();
      console.log("video", video.uri);
      navigation.navigate("CreatePost", { videoUri: video.uri });
    } else {
      setIsRecording(false);
      camera.stopRecording();
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={(ref) => setcamera(ref)}
        style={styles.preview}
        type={type}
        ratio={"4:3"}
      />
      <Pressable
        onPress={() => {
          takeVideo();
        }}
        style={isRecording ? styles.buttonStop : styles.buttonRecord}
      />
      <Pressable
        style={styles.flip}
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      />
    </View>
  );
};

export default Camera1;
