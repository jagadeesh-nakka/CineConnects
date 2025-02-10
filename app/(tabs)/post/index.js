import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  Alert
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { useRouter } from "expo-router";

const Index = () => {

  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const [permissionStatus, setPermissionStatus] = useState(null);
  const router = useRouter();

  // Request permissions on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      console.log("hii" + token)
      const decodedToken = jwtDecode(token);
     
      setUserId(decodedToken.userId);
    };

    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermissionStatus(status);
    };

    fetchUser();
    requestPermissions();
  }, []);

  const pickImage = async () => {
    if (permissionStatus !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict to images
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      alert("Image selection was canceled");
    }
  };

  const createPost = async () => {
    try {

      const uploadedUrl = await uploadToBackend();
      console.log("checking uploD URL" + uploadedUrl)
      const postData = {
        description: description,
        imageUrl: uploadedUrl,
        userId: userId,
      };
      console.log(postData);

      const response = await axios.post(
        "http://192.168.112.27:3000/create", // Your API endpoint
        postData
      );
      console.log(response.data)

      if (response.status === 201) {
        Alert.alert("post Uploaded suceesfull")
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

  const uploadToBackend = async () => {
  try {
    if (!image) throw new Error("No image selected");

    // Create a FormData object to handle file upload
    const formData = new FormData();
    const uriParts = image.split('.');
    const fileType = uriParts[uriParts.length - 1]; // Get the file extension (e.g., jpg, png)

    formData.append("foto", {
      uri: image,
      type: `image/${fileType}`, // Dynamically set the image type based on extension
      name: `post_${Date.now()}.${fileType}`, // Dynamic name based on timestamp
    });

    try {
      const response = await axios.post("http://192.168.112.27:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
        console.log(response.data.data.url)
      
      if (response.status === 201) {
        
        return response.data.data.url
      } else {
        Alert.alert("Upload Failed", "An error occurred while uploading the image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Upload Failed", "An error occurred while uploading the image.");
    }
  
  } catch (error) {
    console.error("Error uploading to backend:", error);
    throw error; // Rethrow error for handling in the calling function
  }
};

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginVertical: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Entypo name="circle-with-cross" size={24} color="black" />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://media.licdn.com/dms/image/v2/C4D03AQGwx1msKINmVQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1660451966801?e=1741219200&v=beta&t=sBECGE2p10V6Q-bEeCZbecLMUQnXAzj2R_Qw9nKE3ZQ",
              }}
            />
            <Text style={{ fontWeight: "500" }}>Anyone</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginRight: 8,
          }}
        >
          <Entypo name="back-in-time" size={24} color="black" />
          <Pressable
            onPress={createPost}
            style={{
              padding: 10,
              backgroundColor: "#0072b1",
              borderRadius: 20,
              width: 80,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Post
            </Text>
          </Pressable>
        </View>
      </View>

      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="What do you want to talk about"
        placeholderTextColor={"black"}
        style={{
          marginHorizontal: 10,
          fontSize: 15,
          fontWeight: "500",
          marginTop: 10,
        }}
        multiline={true}
        numberOfLines={10}
        textAlignVertical={"top"}
      />

      <View>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 240, marginVertical: 20 }}
          />
        )}
      </View>

      <Pressable
        style={{
          flexDirection: "column",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <Pressable
          onPress={pickImage}
          style={{
            width: 40,
            height: 40,
            marginTop: 15,
            backgroundColor: "#E0E0E0",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="perm-media" size={24} color="black" />
        </Pressable>

        <Text>Media</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({});
