import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1">
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 24 }}>
        <ThemedText type="subtitle" className="mt-8">
          Home
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}