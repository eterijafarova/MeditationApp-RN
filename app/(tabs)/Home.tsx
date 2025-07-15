import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAudioPlayer } from "expo-audio";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const audioSource = require("../../assets/music/mus7.mp3");

export default function HomeScreen() {
  const [name, setName] = useState("User");
  const [topic, setTopic] = useState<string | null>(null);
  const [currentSource, setCurrentSource] = useState(audioSource);
  const player = useAudioPlayer(currentSource);
  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      setName(name);
      const savedTopic = await AsyncStorage.getItem("selectedTopic");
      setTopic(savedTopic);
    };
    loadUserData();
  }, []);

  const recommendedCourses = [
    {
      id: 1,
      title: "Focus",
      image: require("../../assets/photos/home1.png"),
    },
    {
      id: 2,
      title: "Happiness",
      image: require("../../assets/photos/home2.png"),
    },
    {
      id: 3,
      title: "Inner Peace",
      image: require("../../assets/photos/home3.png"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Good Morning, {name}</Text>
      <Text style={styles.subGreeting}>We wish you have a good day</Text>
      <View style={styles.cardRow}>
        <Pressable
          style={[styles.card, styles.cardPurple]}
          onPress={() => router.push("/course/1")}
        >
          <Text style={styles.cardTitle}>Basics</Text>
          <Text style={styles.cardType}>COURSE</Text>
          <Text style={styles.cardTime}>3-10 MIN</Text>
          <View style={styles.startButtonLight}>
            <Text style={styles.startButtonTextLight}>START</Text>
          </View>
        </Pressable>

        <Pressable
          style={[styles.card, styles.cardOrange]}
          onPress={() => router.push("/course/2")}
        >
          <Text style={styles.cardTitle}>Relaxation</Text>
          <Text style={styles.cardType}>MUSIC</Text>
          <Text style={styles.cardTime}>3-10 MIN</Text>
          <View style={styles.startButtonDark}>
            <Text style={styles.startButtonTextDark}>START</Text>
          </View>
        </Pressable>
      </View>

      <Pressable
        style={styles.miniPlayer}
        onPress={() => {
          player.playing ? player.pause() : player.play();
        }}
      >
        <View>
          <Text style={styles.miniPlayerTitle}>Daily Thought</Text>
          <Text style={styles.miniPlayerSubtitle}>MEDITATION • 3-10 MIN</Text>
        </View>
        <Ionicons
          name={player.playing ? "pause-circle" : "play-circle"}
          size={36}
          color="#fff"
        />
      </Pressable>
      <Text style={styles.recommendedTitle}>Recommended for you</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recommendedCourses.map((course) => (
          <Pressable
            key={course.id}
            style={styles.recommendationCard}
            onPress={() => router.push(`/course/${course.id}`)}
          >
            <Image source={course.image} style={styles.cardImage} />
            <Text style={styles.recCardTitle}>{course.title}</Text>
            <Text style={styles.recCardSubtitle}>MEDITATION • 3-10 MIN</Text>
          </Pressable>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  subGreeting: {
    color: "#777",
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    width: "48%",
    borderRadius: 20,
    padding: 16,
  },
  cardPurple: {
    backgroundColor: "#8e97fd",
  },
  cardOrange: {
    backgroundColor: "#f9d97b",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  cardType: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 8,
  },
  cardTime: {
    fontSize: 12,
    color: "#fff",
  },
  startButtonLight: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  startButtonTextLight: {
    color: "#8e97fd",
    fontWeight: "600",
  },
  startButtonDark: {
    backgroundColor: "#000",
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  startButtonTextDark: {
    color: "#fff",
    fontWeight: "600",
  },
  miniPlayer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3f414e",
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  miniPlayerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  miniPlayerSubtitle: {
    color: "#ddd",
    fontSize: 12,
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#000",
  },
  recommendationCard: {
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
  },
  recCardTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },
  recCardSubtitle: {
    fontSize: 11,
    color: "#666",
  },
});
