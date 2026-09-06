import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

type IconProps = { color: string; size: number };

function HomeIcon({ color, size }: IconProps) {
  return <Ionicons name="home" size={size} color={color} />;
}

function SearchIcon({ color, size }: IconProps) {
  return <Ionicons name="search" size={size} color={color} />;
}

function HistoryIcon({ color, size }: IconProps) {
  return <Ionicons name="time" size={size} color={color} />;
}

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3c87f7",
        tabBarInactiveTintColor: isDark ? "#B0B4BA" : "#60646C",
        tabBarStyle: {
          backgroundColor: isDark ? "#000000" : "#ffffff",
          borderTopColor: isDark ? "#212225" : "#F0F0F3",
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ tabBarLabel: "Inicio", tabBarIcon: HomeIcon }}
      />
      <Tabs.Screen
        name="search"
        options={{ tabBarLabel: "Buscar", tabBarIcon: SearchIcon }}
      />
      <Tabs.Screen
        name="history"
        options={{ tabBarLabel: "Historial", tabBarIcon: HistoryIcon }}
      />
    </Tabs>
  );
}
