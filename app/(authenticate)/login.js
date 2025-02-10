import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          router.replace("/(tabs)/home");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    if (!email.includes("@") || password.length < 4) {
      Alert.alert("Invalid Input", "Please enter valid credentials.");
      return;
    }

    setIsLoading(true);
    const user = { email, password };

    try {
      console.log("try block")
      const response = await axios.post("http://192.168.0.7:3000/login", user,
        {
          headers: {
            "Content-Type": "application/json", // Explicitly setting Content-Type
          },
        }
      );
      const token = response.data.token;
      console.log("token"+token)
      await AsyncStorage.setItem("authToken", token);
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error(error);
      Alert.alert("Login Failed", "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={{
            uri: "https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={styles.header}>
          <Text style={styles.title}>Log in to your Account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <MaterialIcons style={styles.icon} name="email" size={24} color="gray" />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholder="Enter your Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <AntDesign style={styles.icon} name="lock1" size={24} color="gray" />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={styles.input}
              placeholder="Enter your Password"
            />
          </View>

          <View style={styles.actions}>
            <Text>Keep me logged in</Text>
            <Text style={styles.link}>Forgot Password</Text>
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#0072b1" style={styles.loader} />
          ) : (
            <Pressable onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
          )}

          <Pressable onPress={() => router.replace("/register")} style={styles.registerLink}>
            <Text style={styles.registerText}>Don't have an account? Sign Up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
  header: {
    alignItems: "center",
    marginTop: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#041E42",
  },
  form: {
    marginTop: 70,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },
  icon: {
    marginLeft: 8,
  },
  input: {
    color: "gray",
    marginVertical: 10,
    width: 300,
    fontSize: 18,
  },
  actions: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  link: {
    color: "#007FFF",
    fontWeight: "500",
  },
  loader: {
    marginTop: 20,
  },
  loginButton: {
    width: 200,
    backgroundColor: "#0072b1",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
    marginTop: 80,
  },
  loginText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerLink: {
    marginTop: 15,
  },
  registerText: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
  },
});
