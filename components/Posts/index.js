import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Video } from "expo-av";
import { Storage } from "aws-amplify";
import styles from "./styles";

const Post = (props) => {
  const [post, setPost] = useState(props.post);
  const [isLiked, setIsLiked] = useState(false);
  const [videoUri, setVideoUri] = useState("");
  const video = React.useRef(null);

  const onLikePress = () => {
    const LikestoAdd = isLiked ? -1 : 1;
    setPost({ ...post, likes: post.likes + LikestoAdd });
    setIsLiked(!isLiked);
  };

  const getvideoUri = async () => {
    if (post.videoUri.startsWith("http")) {
      setVideoUri(post.videoUri);
    }
    setVideoUri(await Storage.get(post.videoUri));
  };

  useEffect(() => {
    getvideoUri();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <Video
          ref={video}
          style={styles.video}
          rate={1.0}
          source={{
            uri: videoUri,
          }}
          resizeMode="cover"
          isLooping
          useNativeControls
          onError={(e) => console.log(e)}
        />
      </TouchableWithoutFeedback>

      <View style={styles.uicontainer}>
        <View style={styles.rightContainer}>
          <View style={styles.profilepiccontainer}>
            <Image
              style={styles.profilepic}
              source={{
                uri: post.user.imageUri,
              }}
            />
          </View>
          <TouchableOpacity style={styles.iconcontainer} onPress={onLikePress}>
            <AntDesign
              name="heart"
              size={35}
              color={isLiked ? "red" : "white"}
            />
            <Text style={styles.statsLabel}> {post.likes}</Text>
          </TouchableOpacity>
          <View style={styles.iconcontainer}>
            <FontAwesome name="commenting" size={35} color="white" />
            <Text style={styles.statsLabel}> {post.comments}</Text>
          </View>
          <View style={styles.iconcontainer}>
            <Fontisto name="share-a" size={24} color="white" />
            <Text style={styles.statsLabel}> {post.shares}</Text>
          </View>
        </View>
        <View style={styles.bottomcontainer}>
          <View>
            <Text style={styles.handle}>{post.user.username}</Text>
            <Text style={styles.description}>{post.description}</Text>
            <View style={styles.songrow}>
              <Entypo name="beamed-note" size={24} color="white" />
              <Text style={styles.songname}> {post.song.name}</Text>
            </View>
          </View>
          <Image
            style={styles.songpic}
            source={{
              uri: post.song.imageUri,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Post;
