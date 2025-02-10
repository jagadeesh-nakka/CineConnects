import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  Modal,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Ionicons, Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { useRouter } from "expo-router";

const index = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState(""); // For comment input
  const [currentCommentPostId, setCurrentCommentPostId] = useState(""); // Tracks post being commented
  const [commentsVisibility, setCommentsVisibility] = useState({}); // Track comment visibility for each post
  const [selectedPost, setSelectedPost] = useState(null); // Selected post for comments modal
  const [modalVisible, setModalVisible] = useState(false); // Controls modal visibility
  const router = useRouter();

  // Fetch user ID from token
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  // Fetch user profile
  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://192.168.112.27:3000/profile/${userId}`
      );
      const userData = response.data.user;
      setUser(userData);
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };

  // Fetch all posts
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get("http://192.168.112.27:3000/all");
        setPosts(response.data.posts);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchAllPosts();
  }, []);

  const MAX_LINES = 2;
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  // Handle liking posts
  const [isLiked, setIsLiked] = useState(false);

  const handleLikePost = async (postId) => {
    try {
      const response = await axios.post(
        `http://192.168.112.27:3000/like/${postId}/${userId}`
      );

      if (response.status === 200) {
        const updatedPost = response.data.post;
        setIsLiked(updatedPost.likes.some((like) => like.user === userId));
      }
    } catch (error) {
      console.error("Error liking/unliking the post:", error);
    }
  };

  // Add comment to a post
  const handleAddComment = async (postId, userId) => {
    if(commentText.length===0)
      return
    try {
      const response = await axios.post(
        `http://192.168.112.27:3000/comment/${postId}/${userId}`,

      
        {
          Comment: commentText,
        }
      );
    
      if (response.status === 201) {
        // Update post comments immediately
        setSelectedPost((prevPost) => ({
          ...prevPost,
          comments: [...prevPost.comments, commentText],
        }));
        setCommentText(""); // Clear comment input
      }
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error.message);
    }
  };

  // Show comments in the modal for the selected post
  const openModalWithComments = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPost(null);
  };

  return (
    <ScrollView>
      <View style={{ padding: 10, flexDirection: "row", alignItems: "center", gap: 4 }}>
        <Pressable onPress={() => router.push("/home/profile")}>
          <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={{ uri: user?.profileImage }} />
        </Pressable>

        <Pressable style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 7, gap: 10, backgroundColor: "white", borderRadius: 3, height: 30, flex: 1 }}>
          <AntDesign style={{ marginLeft: 10 }} name="search1" size={20} color="black" />
          <TextInput placeholder="Search" />
        </Pressable>


        <Pressable onPress={() => router.push("/home/chat")}>
        <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />

        </Pressable>
      </View>

      <View>
        {posts?.map((item, index) => (
          <View key={index}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={{ uri: item?.user?.profileImage }} />
                <View style={{ flexDirection: "column", gap: 2 }}>
                  <Text style={{ fontSize: 15, fontWeight: "600" }}>{item?.user?.name}</Text>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: 230, color: "gray", fontSize: 15, fontWeight: "400" }}>
                    Engineer Graduate | LinkedIn Member
                  </Text>
                  <Text style={{ color: "gray" }}>{moment(item.createdAt).format("MMMM Do YYYY")}</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Entypo name="dots-three-vertical" size={20} color="black" />
                <Feather name="x" size={20} color="black" />
              </View>
            </View>

            <View style={{ marginTop: 10, marginHorizontal: 10, marginBottom: 12 }}>
              <Text style={{ fontSize: 15 }} numberOfLines={showFullText ? undefined : MAX_LINES}>
                {item?.description}
              </Text>
              {!showFullText && (
                <Pressable onPress={toggleShowFullText}>
                  <Text>See more</Text>
                </Pressable>
              )}
            </View>

            <Image style={{ width: "100%", height: 240 }} source={{ uri: item?.imageUrl }} />

            {item?.likes?.length > 0 && (
              <View style={{ padding: 10, flexDirection: "row", alignItems: "center", gap: 6 }}>
                <SimpleLineIcons name="like" size={16} color="#0072b1" />
                <Text style={{ color: "gray" }}>{item?.likes?.length}</Text>
              </View>
            )}

            <View style={{ height: 2, borderColor: "#E0E0E0", borderWidth: 2 }} />

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginVertical: 10 }}>
              <TouchableOpacity onPress={() => handleLikePost(item?._id)}>
                <AntDesign style={{ textAlign: "center" }} name={isLiked?"like1":"like2"} size={24} color={isLiked ? "#0072b1" : "gray"} />
                <Text style={{ textAlign: "center", fontSize: 12, color: isLiked ? "#0072b1" : "gray", marginTop: 2 }}>Like</Text>
              </TouchableOpacity>
              <Pressable onPress={() => openModalWithComments(item)}>
                <FontAwesome name="comment-o" size={20} color="gray" style={{ textAlign: "center" }} />
                <Text style={{ textAlign: "center", marginTop: 2, fontSize: 12, color: "gray" }}>Comment</Text>
              </Pressable>
              <Pressable>
                <Ionicons name="md-share-outline" size={20} color="gray" style={{ textAlign: "center" }} />
                <Text style={{ marginTop: 2, fontSize: 12, textAlign: "center", color: "gray" }}>Repost</Text>
              </Pressable>
              <Pressable>
                <Feather name="send" size={20} color="gray" />
                <Text style={{ marginTop: 2, fontSize: 12, color: "gray" }}>Send</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      {/* Modal for comments */}
      {selectedPost && (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={{ flex: 1,justifyContent: "flex-end", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <View style={{ backgroundColor: "white", padding: 20, maxHeight: "90%" , borderTopLeftRadius:20,borderTopRightRadius:20}}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Comments</Text>
              <ScrollView style={{ maxHeight: 500,borderTopLeftRadius:10,}}>
                {selectedPost?.comments?.map((comment, idx) => (
                  <View key={idx} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#E0E0E0" }}>
                    <Text style={{ fontWeight: "600" }}>{comment.user?.name}</Text>
                    <Text>{comment.text}</Text>
                  </View>
                ))}
              </ScrollView>

              <TextInput
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Write a comment..."
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "#E0E0E0",
                  padding: 10,
                  marginTop: 10,
                }}
              />

              <TouchableOpacity
                onPress={() => handleAddComment(selectedPost._id, userId) }
                style={{
                  backgroundColor: "#0072b1",
                  borderRadius: 10,
                  padding: 10,
                  marginTop: 10,
                }}
                
              >
            
                <Text style={{ color: "white", textAlign: "center" }}>Add Comment</Text>
              </TouchableOpacity>

              <Pressable onPress={closeModal} style={{ marginTop: 10 }}>
                <Text style={{ textAlign: "center", color: "#0072b1" }}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

export default index;
