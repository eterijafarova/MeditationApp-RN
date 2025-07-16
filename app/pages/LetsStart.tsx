import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../Theme";

const { width, height } = Dimensions.get("window");

export default function LetsStart() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#03174C" : "#8E97FD" },
      ]}
    >
      <Image
        source={
          isDark
            ? require("../../assets/photos/sleepy.png")
            : require("../../assets/photos/letsStart.jpg")
        }
        style={styles.illustration}
        resizeMode="contain"
      />

      <Text style={[styles.title, { color: "#fff" }]}>
        {isDark ? "Welcome to Sleep" : "Hi, Welcome to Silent Moon"}
      </Text>

      <Text style={[styles.subtitle, { color: isDark ? "#ccc" : "#e6e6e6" }]}>
        {isDark
          ? "Explore the new king of sleep. It uses sound and visualization to create perfect conditions for relaxing sleep."
          : "Explore the app. Find some peace of mind to prepare for meditation."}
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/(tabs)/Home")}
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  illustration: {
    width: 400,
    height: 400,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: "#8E97FD",
    fontWeight: "bold",
    fontSize: 16,
  },
});
