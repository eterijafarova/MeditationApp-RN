import dayjs from "dayjs";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "light" });

export const useTheme = () => useContext(ThemeContext);

const isDarkByTime = () => {
  const hour = dayjs().hour();
  return hour >= 18 || hour < 6;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>("light");

  useEffect(() => {
    if (isDarkByTime()) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
