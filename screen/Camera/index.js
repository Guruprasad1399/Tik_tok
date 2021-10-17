import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, Button } from "react-native";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const Camera1 = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [audperm, setaudperm] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isRecording, setIsRecording] = useState(false);
  const navigation = useNavigation();
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      const { status1 } = await Audio.requestPermissionsAsync();
      if (status === "granted") {
        setHasPermission(status === "granted");
      }
      if (status1 === "granted") {
        setaudperm(status1 === "granted");
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onRecord = async () => {
    if (cameraRef.current) {
      try {
        const videoRecordPromise = cameraRef.current.recordAsync();
        if (videoRecordPromise) {
          setIsRecording(true);
          const video = await videoRecordPromise;
          navigation.navigate("CreatePost", { videoUri: video.uri });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const stopVideoRecording = () => {
    if (cameraRef.current) {
      setIsRecording(false);
      cameraRef.current.stopRecording();
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.preview}
        type={type}
        ratio={"4:3"}
      />
      <View style={styles.startstopcontainer}>
        <Pressable onPress={onRecord}>
          <Text style={{ color: "white", fontSize: 20 }}>Start Rec</Text>
        </Pressable>
        <Pressable onPress={stopVideoRecording}>
          <Text style={{ color: "white", fontSize: 20 }}>Stop Rec</Text>
        </Pressable>
      </View>

      <View style={{ alignItems: "center" }}>
        <Pressable
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Flip</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Camera1;
