import { Stack } from "expo-router";
import React from "react";
import { ThemeProvider } from "./Theme";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ThemeProvider>
  );
}
