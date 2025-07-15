import { Link } from "expo-router";
import { Image, Text, Pressable, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <View style={{ alignItems: "center", marginTop: 50 }}>
        <Image
          source={require("../../assets/photos/liegen.jpg")}
          style={{ width: 300, height: 300, resizeMode: "contain" }}
        />
      </View>

      <View style={{ alignItems: "center", marginTop: 30 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          We are what we do
        </Text>
        <Text style={{ fontSize: 14, textAlign: "center", color: "#666" }}>
          Thousands of people are using Silent Moon for small meditations.
        </Text>
      </View>

      <View style={{ marginTop: 50 }}>
        <Link href="/SignUp" asChild>
          <Pressable
            style={{
              backgroundColor: "#8E97FD",
              paddingVertical: 15,
              borderRadius: 30,
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              SIGN UP
            </Text>
          </Pressable>
        </Link>

        <View style={{ alignItems: "center" }}>
          <Link href="/SignIn" asChild>
            <Text style={{ color: "#8E97FD", fontWeight: "bold" }}>
              ALREADY HAVE AN ACCOUNT? LOG IN
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
