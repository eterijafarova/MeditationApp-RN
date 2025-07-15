import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Please fill all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Invalid email format");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Password must be at least 8 characters");
      return;
    }

    if (!agree) {
      Alert.alert("You must accept the Privacy Policy");
      return;
    }

    Alert.alert("Signed up successfully!");
    router.replace("/pages/LetsStart");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <View style={{ alignItems: "center", marginTop: 50 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Create your account
        </Text>
      </View>

      <Pressable
        style={{
          backgroundColor: "#8E97FD",
          paddingVertical: 15,
          borderRadius: 30,
          alignItems: "center",
          marginVertical: 15,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../assets/photos/facebook.png")}
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          CONTINUE WITH FACEBOOK
        </Text>
      </Pressable>

      <Pressable
        style={{
          backgroundColor: "#CACCCC",
          paddingVertical: 15,
          borderRadius: 30,
          alignItems: "center",
          marginVertical: 15,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../assets/photos/google.png")}
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
        <Text style={{ fontWeight: "bold" }}>CONTINUE WITH GOOGLE</Text>
      </Pressable>

      <Text style={{ textAlign: "center", color: "#999", marginVertical: 15 }}>
        OR LOG IN WITH EMAIL
      </Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
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
        onPress={() => setAgree(!agree)}
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 4,
            backgroundColor: agree ? "#8E97FD" : "#fff",
            marginRight: 10,
          }}
        />
        <Text>I have read the Privacy Policy</Text>
      </Pressable>

      <Pressable
        style={{
          backgroundColor: "#8E97FD",
          paddingVertical: 15,
          borderRadius: 30,
          alignItems: "center",
        }}
        onPress={handleSignUp}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>GET STARTED</Text>
      </Pressable>
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
