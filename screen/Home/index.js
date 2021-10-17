import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, Dimensions } from "react-native";
import Post from "../../components/Posts";
import { API, graphqlOperation } from "aws-amplify";
import { listPosts } from "../../src/graphql/queries";
// import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [posts, setPosts] = useState([]);
  // const navigation = useNavigation();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listPosts));
        setPosts(response.data.listPosts.items);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPost();
  }, []);

  const renderItem = useCallback(({ item }) => <Post post={item} />, []);

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get("window").height - 47}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        maxToRenderPerBatch={3}
        bounces={false}
      />
    </View>
  );
};

export default Home;
