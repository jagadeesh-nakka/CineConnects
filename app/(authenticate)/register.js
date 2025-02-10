import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  Alert
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import { link } from "../app";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  const handleRegister = () => {
  
    const user = {
      name: name,
      email: email,
      password: password,
      profileImage: image
    }
    console.log("hello2")

    axios.post(`${link}/register`, user).then((response) => {
      console.log("hello3")
      console.log(response);
      Alert.alert("Registration successful", "You have been registered successfully");
      setName("");
      setEmail("");
      setPassword("");
      setImage("");
    }).catch((error) => {
      Alert.alert("Registration failed", "An error occurred while registering");
      console.log("registration failed", error.response.data)
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://ik.imagekit.io/tob3kbbws/Screenshot%202025-02-07%20191038.png?updatedAt=1738935659795",
          }}
        />
      </View>

      <KeyboardAvoidingView style={styles.formContainer}>
        <Text style={styles.heading}>Register to your Account</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person" size={24} color="gray" style={styles.icon} />
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="gray" style={styles.icon} />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="Enter your Email"
          />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign name="lock1" size={24} color="gray" style={styles.icon} />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={styles.input}
            placeholder="Enter your Password"
          />
        </View>

        <View style={styles.inputContainer}>
          <Entypo name="image" size={24} color="gray" style={styles.icon} />
          <TextInput
            value={image}
            onChangeText={(text) => setImage(text)}
            style={styles.input}
            placeholder="Enter your image URL"
          />
        </View>

        <View style={styles.footer}>
          <Text>Keep me logged in</Text>
          <Text style={styles.forgotPassword}>Forgot Password</Text>
        </View>

        <Pressable onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register</Text>
        </Pressable>

        <Pressable onPress={() => router.replace("/(authenticate)/login")} style={styles.loginRedirect}>
          <Text style={styles.loginRedirectText}>Already have an account? Sign in</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
  formContainer: {
    marginTop: 40,
    width: "100%",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#041E42",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    color: "gray",
    width: "85%",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotPassword: {
    color: "#007FFF",
    fontWeight: "500",
  },
  registerButton: {
    marginTop: 30,
    width: "100%",
    backgroundColor: "#0072b1",
    borderRadius: 6,
    paddingVertical: 15,
    alignItems: "center",
  },
  registerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginRedirect: {
    marginTop: 15,
    alignItems: "center",
  },
  loginRedirectText: {
    color: "gray",
    fontSize: 16,
  },
});
