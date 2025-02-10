import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import UserProfile from "../../../components/UserProfile";
import ConnectionRequest from "../../../components/ConnectionRequest";
import { useRouter } from "expo-router";

const index = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [connectionRequests, setConnectionRequests] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      console.log("checking" + token)
      
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
    
      console.log(decodedToken)
      const userId = decodedToken.userId;
      console.log("User id : " +userId)
      setUserId(userId);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    console.log(userId)
    if (userId) {
      console.log("fetching")
      fetchUserProfile();
      fetchUsers();
      fetchFriendRequests();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    console.log("profile page ")
    try {
      const response = await axios.get(
        `http://192.168.112.27:3000/profile/${userId}`
      );
      const userData = response.data.user;
      setUser(userData);
      console.log("users data ")
    } catch (error) {
      console.log("Error fetching user profile", error);
    }
  };

  const fetchUsers = async () => {
    axios
      .get(`http://192.168.112.27:3000/users/${userId}`)
      .then((response) => {
        setUsers(response.data);
        console.log('/n') 
        console.log(response.data)
      })
      
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(
        `http://192.168.112.27:3000/connection-request/${userId}`
      );
      if (response.status === 200) {
        const connectionRequestsData = response.data?.map((friendRequest) => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.profileImage,
        }));

        setConnectionRequests(connectionRequestsData);
      }
    } catch (error) {
      console.log("Error fetching friend requests", error);
    }
  };

  const renderHeader = () => (
    <>
      <Pressable
        onPress={() => router.push("/network/connections")}
        style={{
          marginTop: 10,
          marginHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Manage My Network
        </Text>
        <AntDesign name="arrowright" size={22} color="black" />
      </Pressable>

      <View style={{ borderColor: "#E0E0E0", borderWidth: 2, marginVertical: 10 }} />

      <View
        style={{
          marginTop: 10,
          marginHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Invitations (0)</Text>
        <AntDesign name="arrowright" size={22} color="black" />
      </View>

      <View style={{ borderColor: "#E0E0E0", borderWidth: 2, marginVertical: 10 }} />

      <View>
        {connectionRequests?.map((item, index) => (
          <ConnectionRequest
            item={item}
            key={index}
            connectionRequests={connectionRequests}
            setConnectionRequests={setConnectionRequests}
            userId={userId}
          />
        ))}
      </View>

      <View style={{ marginHorizontal: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Grow your network faster</Text>
          <Entypo name="cross" size={24} color="black" />
        </View>

        <Text>
          Find and contact the right people. Plus see who's viewed your profile
        </Text>
        <View
          style={{
            backgroundColor: "#FFC72C",
            width: 140,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 25,
            marginTop: 8,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "600" }}
          >
            Try Premium
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView>
    <FlatList
      data={users}
      ListHeaderComponent={renderHeader}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      numColumns={2}
      keyExtractor={(item) => item._id}
      renderItem={({ item,key }) => (
        <UserProfile userId={userId} item={item}  key={index} />
      )}
      contentContainerStyle={{ backgroundColor: "white" }}
    />
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
