import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";

const lightTheme = {
  background: "#fff",
  text: "#3F414E",
  secondary: "#666",
  border: "#eee",
  highlight: "#8E97FD",
};

const darkTheme = {
  background: "#1E255E",
  text: "#f5f5f5",
  secondary: "#aaa",
  border: "#333",
  highlight: "#8E97FD",
};

const mockCourses = {
  "1": {
    title: "Happy Morning",
    description:
      "Ease the mind into a restful night’s sleep with these deep, ambient tones.",
    favorites: 24234,
    listening: 34234,
    imageLight: require("../../assets/photos/sun.jpg"),
    imageDark: require("../../assets/photos/moon.jpg"),
    tracks: [
      { id: "1", title: "Focus Attention", duration: "10 MIN" },
      { id: "2", title: "Body Scan", duration: "5 MIN" },
      { id: "3", title: "Making Happiness", duration: "3 MIN" },
    ],
  },
};

export default function CourseDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [voice, setVoice] = useState<"male" | "female">("male");

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const course = mockCourses[id as keyof typeof mockCourses];

  if (!course) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Course not found</Text>
      </View>
    );
  }

  const handlePlayTrack = (trackId: string) => {
    router.push(`/player/${trackId}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.headerImageContainer}>
        <Image
          source={colorScheme === "dark" ? course.imageDark : course.imageLight}
          style={styles.headerImage}
        />
        <View style={styles.topRightButtons}>
          <Ionicons
            name="heart-outline"
            size={26}
            color="#fff"
            style={styles.icon}
          />
          <Ionicons
            name="download-outline"
            size={26}
            color="#fff"
            style={styles.icon}
          />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          {course.title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondary }]}>
          COURSE
        </Text>
        <Text style={[styles.description, { color: theme.secondary }]}>
          {course.description}
        </Text>

        <View style={styles.stats}>
          <Text style={[styles.stat, { color: theme.secondary }]}>
            {course.favorites.toLocaleString()} Favorites
          </Text>
          <Text style={[styles.stat, { color: theme.secondary }]}>
            {course.listening.toLocaleString()} Listening
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Pick a Narrator
        </Text>
        <View style={[styles.voiceSwitch, { borderColor: theme.border }]}>
          <Pressable
            style={[
              styles.voiceTab,
              voice === "male" && {
                borderBottomColor: theme.highlight,
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setVoice("male")}
          >
            <Text
              style={{
                color: voice === "male" ? theme.highlight : theme.secondary,
                fontWeight: "bold",
              }}
            >
              MALE VOICE
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.voiceTab,
              voice === "female" && {
                borderBottomColor: theme.highlight,
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setVoice("female")}
          >
            <Text
              style={{
                color: voice === "female" ? theme.highlight : theme.secondary,
                fontWeight: "bold",
              }}
            >
              FEMALE VOICE
            </Text>
          </Pressable>
        </View>

        <FlatList
          data={course.tracks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.trackItem, { borderColor: theme.border }]}
              onPress={() => handlePlayTrack(item.id)}
            >
              <Ionicons
                name="play-circle-outline"
                size={28}
                color={theme.highlight}
              />
              <View style={styles.trackInfo}>
                <Text style={[styles.trackTitle, { color: theme.text }]}>
                  {item.title}
                </Text>
                <Text
                  style={[styles.trackDuration, { color: theme.secondary }]}
                >
                  {item.duration}
                </Text>
              </View>
            </Pressable>
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerImageContainer: {
    width: "100%",
    height: 220,
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  topRightButtons: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    gap: 16,
  },
  icon: {
    backgroundColor: "#00000050",
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  stat: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  voiceSwitch: {
    flexDirection: "row",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  voiceTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  trackItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  trackInfo: {
    marginLeft: 12,
  },
  trackTitle: {
    fontSize: 16,
  },
  trackDuration: {
    fontSize: 12,
  },
});
