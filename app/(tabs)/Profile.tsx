import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const dayLabels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const ProfileScreen = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [reminderTime, setReminderTime] = useState<string | null>(null);
  const [reminderDays, setReminderDays] = useState<boolean[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const topic = await AsyncStorage.getItem("selectedTopic");
      const time = await AsyncStorage.getItem("reminderTime");
      const days = JSON.parse(
        (await AsyncStorage.getItem("reminderDays")) || "[]"
      );
      const favs = JSON.parse(
        (await AsyncStorage.getItem("favorites")) || "[]"
      );

      setSelectedTopic(topic);
      setReminderTime(time);
      setReminderDays(days);
      setFavorites(favs);
    };

    loadData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    Alert.alert("Logged out");
    router.replace("/(auth)/SignIn");
  };

  const handleEditTopic = () => {
    router.push("/pages/ChoseTopics");
  };

  const handleEditReminders = () => {
    router.push("/pages/Reminders");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Meditation Reason:</Text>
        <Text style={styles.value}>{selectedTopic || "Not selected yet"}</Text>
        <Pressable style={styles.editButton} onPress={handleEditTopic}>
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Reminder Time:</Text>
        <Text style={styles.value}>{reminderTime || "Not set"}</Text>

        <Text style={[styles.label, { marginTop: 10 }]}>Reminder Days:</Text>
        <Text style={styles.value}>
          {reminderDays.filter(Boolean).length > 0
            ? reminderDays
                .map((isSelected, i) => (isSelected ? dayLabels[i] : null))
                .filter(Boolean)
                .join(", ")
            : "Not set"}
        </Text>

        <Pressable style={styles.editButton} onPress={handleEditReminders}>
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Favorite Tracks:</Text>

        {favorites.length === 0 ? (
          <Text style={styles.value}>No favorite tracks yet</Text>
        ) : (
          favorites.map((track, index) => (
            <Text key={index} style={styles.value}>
              {track.title} — {track.artist}
            </Text>
          ))
        )}
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>LOG OUT</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#3F414E",
  },
  section: {
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  value: {
    fontSize: 18,
    color: "#333",
    marginTop: 4,
  },
  editButton: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#8E97FD",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logoutButton: {
    height: 50,
    width: 100,
    backgroundColor: "coral",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileScreen;
