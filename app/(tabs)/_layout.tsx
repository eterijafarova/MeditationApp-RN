import { FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Tabs } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextProps>({ theme: "light" });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function TabLayout() {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const updateThemeByTime = () => {
      const hour = dayjs().hour();
      setTheme(hour >= 6 && hour < 18 ? "light" : "dark");
    };

    updateThemeByTime();
    const interval = setInterval(updateThemeByTime, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme === "light" ? "#8e97fd" : "#f9d97b",
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            backgroundColor: theme === "light" ? "#fff" : "#0B0F2F",
            borderTopWidth: 0,
            elevation: 5,
            height: 60,
            paddingBottom: 6,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "Home",
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="Meditate"
          options={{
            title: "Meditate",
            tabBarLabel: "Meditate",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="mountain-sun" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </ThemeContext.Provider>
  );
}
