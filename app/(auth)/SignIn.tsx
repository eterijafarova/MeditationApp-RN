import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://192.168.0.198:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        await SecureStore.setItemAsync("authToken", data.token);
        Alert.alert("Logged in successfully!");
        router.replace("/(tabs)/Home");
      } else {
        Alert.alert(
          "Login failed",
          data.message || "Invalid email or password"
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <View style={{ alignItems: "center", marginTop: 50 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Welcome Back!</Text>
      </View>

      <Pressable
        style={{
          backgroundColor: "#8E97FD",
          paddingVertical: 15,
          borderRadius: 30,
          alignItems: "center",
          marginVertical: 15,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          CONTINUE WITH FACEBOOK
        </Text>
      </Pressable>

      <Pressable
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          paddingVertical: 15,
          borderRadius: 30,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>CONTINUE WITH GOOGLE</Text>
      </Pressable>

      <Text style={{ textAlign: "center", color: "#999", marginVertical: 15 }}>
        OR LOG IN WITH EMAIL
      </Text>

      <TextInput
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Pressable
        style={{
          backgroundColor: "#8E97FD",
          paddingVertical: 15,
          borderRadius: 30,
          alignItems: "center",
        }}
        onPress={handleSignIn}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>LOG IN</Text>
      </Pressable>

      <Text style={{ textAlign: "center", marginVertical: 15, color: "#999" }}>
        Forgot Password?
      </Text>

      <View style={{ alignItems: "center" }}>
        <Link href="/SignUp" asChild>
          <Text style={{ color: "#8E97FD", fontWeight: "bold" }}>
            DON'T HAVE AN ACCOUNT? SIGN UP
          </Text>
        </Link>
      </View>
    </View>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
};
