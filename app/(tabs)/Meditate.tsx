import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";

const { width } = Dimensions.get("window");

const darkTheme = {
  background: "#0B0F2F",
  title: "#ffffff",
  subtitle: "#A1A4B2",
  filterBg: "#121742",
  filterActive: "#8E97FD",
  filterIcon: "#A1A4B2",
  filterIconActive: "#fff",
  cardBg: "#121742",
  cardTitle: "#fff",
  cardSubtitle: "#A1A4B2",
  icon: "#fff",
};

const lightTheme = {
  background: "#fff",
  title: "#000",
  subtitle: "#777",
  filterBg: "#ddd",
  filterActive: "#8e97fd",
  filterIcon: "#000",
  filterIconActive: "#fff",
  cardBg: "#fff",
  cardTitle: "#000",
  cardSubtitle: "#666",
  icon: "#000",
};

const categories = [
  { label: "All", icon: "grid" },
  { label: "My", icon: "heart" },
  { label: "Anxious", icon: "sad" },
  { label: "Sleep", icon: "moon" },
  { label: "Kids", icon: "happy" },
];

const meditations = [
  {
    id: 1,
    title: "Daily Calm",
    subtitle: "APR 30 · PAUSE PRACTICE",
    color: "#F6C58E",
    isMain: true,
    route: "/player/1",
  },
  {
    id: 2,
    title: "7 Days of Calm",
    image: require("../../assets/photos/rel1.png"),
    category: "All",
    route: "/course/1",
  },
  {
    id: 3,
    title: "Anxiety Release",
    image: require("../../assets/photos/rel2.png"),
    category: "Anxious",
    route: "/course/1",
  },
  {
    id: 4,
    title: "Self Discovery",
    image: require("../../assets/photos/rel3.png"),
    category: "My",
    route: "/player/2",
  },
  {
    id: 5,
    title: "Stress Detox",
    image: require("../../assets/photos/rel4.png"),
    category: "All",
    route: "/course/1",
  },
];

export default function MeditateScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;

  const filtered =
    selectedCategory === "All"
      ? meditations
      : meditations.filter((m) => m.category === selectedCategory);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <Text style={[styles.title, { color: theme.title }]}>Meditate</Text>
      <Text style={[styles.subtitle, { color: theme.subtitle }]}>
        we can learn how to recognize when our minds are doing their normal
        everyday acrobatics.
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
      >
        {categories.map((cat) => {
          const isActive = cat.label === selectedCategory;
          return (
            <Pressable
              key={cat.label}
              onPress={() => setSelectedCategory(cat.label)}
              style={[
                styles.filterButton,
                {
                  backgroundColor: isActive
                    ? theme.filterActive
                    : theme.filterBg,
                },
              ]}
            >
              <Ionicons
                name={cat.icon as any}
                size={20}
                color={isActive ? theme.filterIconActive : theme.filterIcon}
              />
              <Text
                style={{
                  marginTop: 4,
                  color: isActive ? theme.filterIconActive : theme.filterIcon,
                  fontSize: 12,
                }}
              >
                {cat.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.cardList}>
        {filtered.map((item) => {
          const isDark = scheme === "dark";

          if (item.isMain) {
            return (
              <Pressable
                key={item.id}
                onPress={() => router.push(item.route)}
                style={[
                  styles.mainCard,
                  isDark ? {} : { backgroundColor: item.color },
                ]}
              >
                {isDark && (
                  <Image
                    source={require("../../assets/photos/sleepMode.jpg")}
                    style={styles.mainCardBackground}
                  />
                )}

                <View style={styles.mainCardContent}>
                  <Text
                    style={[
                      styles.mainCardTitle,
                      { color: isDark ? "#fff" : "#000" },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.mainCardSubtitle,
                      { color: isDark ? "#ccc" : "#000" },
                    ]}
                  >
                    {item.subtitle}
                  </Text>

                  {isDark ? (
                    <Pressable style={styles.startButton}>
                      <Text style={styles.startButtonText}>Start</Text>
                    </Pressable>
                  ) : (
                    <Ionicons
                      name="play-circle"
                      size={40}
                      color={"#000"}
                      style={{ marginTop: 8 }}
                    />
                  )}
                </View>
              </Pressable>
            );
          }

          return (
            <Pressable
              key={item.id}
              onPress={() => router.push(item.route)}
              style={[
                styles.card,
                {
                  backgroundColor: theme.cardBg,
                  width: (width - 60) / 2,
                },
              ]}
            >
              {item.image && (
                <Image
                  source={item.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              )}
              <Text style={[styles.cardTitle, { color: theme.cardTitle }]}>
                {item.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  filterRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  filterButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 10,
    width: 60,
  },
  cardList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
  mainCard: {
    width: "100%",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  mainCardBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    resizeMode: "cover",
  },
  mainCardContent: {
    position: "relative",
    zIndex: 1,
  },
  mainCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mainCardSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  startButton: {
    marginTop: 12,
    backgroundColor: "#8E97FD",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  startButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 100,
    borderRadius: 16,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
