import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";

const topics = [
  {
    title: "Reduce Stress",
    color: "#A7A9D1",
    image: require("../../assets/photos/stress.png"),
  },
  {
    title: "Improve Performance",
    color: "#F25F5C",
    image: require("../../assets/photos/yoga.png"),
  },
  {
    title: "Increase Happiness",
    color: "#FFD700",
    image: require("../../assets/photos/emotions.png"),
  },
  {
    title: "Reduce Anxiety",
    color: "#F29D2A",
    image: require("../../assets/photos/anxiety.png"),
  },
  {
    title: "Personal Growth",
    color: "#9EDE73",
    image: require("../../assets/photos/self-improvement.png"),
  },
  {
    title: "Better Sleep",
    color: "#6E6EE4",
    image: require("../../assets/photos/sleep.png"),
  },
  {
    title: "Mindfulness",
    color: "#FFC107",
    image: require("../../assets/photos/philosophy.png"),
  },
  {
    title: "Self-Love",
    color: "#FF73E5",
    image: require("../../assets/photos/love-yourself.png"),
  },
  {
    title: "Motivation",
    color: "#39A2DB",
    image: require("../../assets/photos/motivation.png"),
  },
  {
    title: "Inner Peace",
    color: "#6F8E1F",
    image: require("../../assets/photos/inner-peace.png"),
  },
];

const ChooseTopicScreen = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadTopic = async () => {
      const topic = await AsyncStorage.getItem("selectedTopic");
      if (topic) setSelectedTopic(topic);
    };
    loadTopic();
  }, []);

  const handleSelectTopic = async (topic: string) => {
    setSelectedTopic(topic);
    await AsyncStorage.setItem("selectedTopic", topic);
  };

  const handleContinue = () => {
    router.replace("/pages/Reminders");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What brings you to Silent Moon?</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          {topics.map((topic, index) => (
            <Pressable
              key={index}
              style={[
                styles.card,
                selectedTopic === topic.title && styles.selectedCard,
                { backgroundColor: topic.color },
              ]}
              onPress={() => handleSelectTopic(topic.title)}
            >
              <Image style={styles.cardImage} source={topic.image} />
              <Text style={styles.cardText}>{topic.title}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={[styles.continueButton, { opacity: selectedTopic ? 1 : 0.5 }]}
          onPress={handleContinue}
          disabled={!selectedTopic}
        >
          <Text style={styles.continueText}>Continue</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    height: 120,
    borderRadius: 15,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: "#fff",
  },
  cardImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  continueButton: {
    marginTop: 20,
    backgroundColor: "#8E97FD",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ChooseTopicScreen;
