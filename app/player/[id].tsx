import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";

const lightTheme = {
  background: "#F5EBDD",
  text: "#333",
  secondaryText: "#666",
  trackColor: "#aaa",
  thumbColor: "#333",
  heart: "red",
};

const darkTheme = {
  background: "#1E255E",
  text: "#f5f5f5",
  secondaryText: "#aaa",
  trackColor: "#444",
  thumbColor: "#fff",
  heart: "#f55",
};

const tracks = [
  {
    id: "1",
    title: "Relax Music 1",
    artist: "No name",
    source: require("../../assets/music/mus1.mp3"),
  },
  {
    id: "2",
    title: "Relax Music 2",
    artist: "No name",
    source: require("../../assets/music/mus2.mp3"),
  },
  {
    id: "3",
    title: "Relax Music 3",
    artist: "No name",
    source: require("../../assets/music/mus3.mp3"),
  },
  {
    id: "4",
    title: "Relax Music 4",
    artist: "No name",
    source: require("../../assets/music/mus4.mp3"),
  },
  {
    id: "5",
    title: "Relax Music 5",
    artist: "No name",
    source: require("../../assets/music/mus5.mp3"),
  },
  {
    id: "6",
    title: "Relax Music 6",
    artist: "No name",
    source: require("../../assets/music/mus6.mp3"),
  },
  {
    id: "7",
    title: "Relax Music 7",
    artist: "No name",
    source: require("../../assets/music/mus7.mp3"),
  },
];

export default function PlayerScreen() {
  const { id } = useLocalSearchParams();
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;

  const track = tracks.find((t) => t.id === id) || tracks[0];
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      const stored = await AsyncStorage.getItem("favorites");
      const list = stored ? JSON.parse(stored) : [];
      const exists = list.some((t: any) => t.id === track.id);
      setIsFavorite(exists);
    };
    checkIfFavorite();
  }, [track]);

  const player = useAudioPlayer(track.source);
  const status = useAudioPlayerStatus(player);

  const positionMillis = status?.currentTime ?? 0;
  const durationMillis = status?.duration ?? 1;

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const onSeek = (value: number) => {
    player.seekTo(value);
  };

  const seekBy = (offset: number) => {
    const newPos = Math.min(
      Math.max(positionMillis + offset, 0),
      durationMillis
    );
    player.seekTo(newPos);
  };

  const toggleFavorite = async () => {
    try {
      const existing = await AsyncStorage.getItem("favorites");
      const parsed = existing ? JSON.parse(existing) : [];

      let updated;
      if (isFavorite) {
        updated = parsed.filter((t: any) => t.id !== track.id);
      } else {
        updated = [
          ...parsed,
          { id: track.id, title: track.title, artist: track.artist },
        ];
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Failed to update favorites:", error);
      Alert.alert("Error", "Can not find favorites");
    }
  };

  const handleDownload = () => {
    Alert.alert("Coming soon!", "Download feature will be added later.");
  };

  return (
    <View style={[styles.fullscreen, { backgroundColor: theme.background }]}>
      <View style={styles.topRightButtons}>
        <Pressable onPress={toggleFavorite} hitSlop={10}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={28}
            color={isFavorite ? theme.heart : theme.text}
            style={styles.topIcon}
          />
        </Pressable>
        <Pressable onPress={handleDownload} hitSlop={10}>
          <Ionicons
            name="download-outline"
            size={26}
            color={theme.text}
            style={styles.topIcon}
          />
        </Pressable>
      </View>

      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>{track.title}</Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          {track.artist}
        </Text>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={durationMillis}
          value={positionMillis}
          minimumTrackTintColor={theme.text}
          maximumTrackTintColor={theme.trackColor}
          onSlidingComplete={onSeek}
          thumbTintColor={theme.thumbColor}
        />

        <View style={styles.timeContainer}>
          <Text style={[styles.timeText, { color: theme.secondaryText }]}>
            {formatTime(positionMillis)}
          </Text>
          <Text style={[styles.timeText, { color: theme.secondaryText }]}>
            {formatTime(durationMillis)}
          </Text>
        </View>

        <View style={styles.controls}>
          <Pressable onPress={() => seekBy(-15000)}>
            <Ionicons name="play-back" size={36} color={theme.text} />
          </Pressable>

          <Pressable
            onPress={() => (status?.playing ? player.pause() : player.play())}
          >
            <Ionicons
              name={status?.playing ? "pause-circle" : "play-circle"}
              size={80}
              color={theme.text}
            />
          </Pressable>

          <Pressable onPress={() => seekBy(15000)}>
            <Ionicons name="play-forward" size={36} color={theme.text} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  topRightButtons: {
    position: "absolute",
    top: 40,
    right: 20,
    flexDirection: "row",
    gap: 12,
    zIndex: 1,
  },
  topIcon: {
    padding: 6,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 60,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
  },
  slider: {
    width: "90%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 4,
    paddingHorizontal: 10,
  },
  timeText: {
    fontSize: 14,
  },
  controls: {
    flexDirection: "row",
    marginTop: 40,
    width: "70%",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
