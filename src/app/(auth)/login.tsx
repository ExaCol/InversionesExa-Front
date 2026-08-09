import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { authApi } from "@/api/auth";
import { FormField } from "@/components/form-field";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { messages } from "@/constants/messages";

const m = messages.LoginPage;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert(m.errorRequiredTitle, m.errorRequiredMessage);
      return;
    }

    setLoading(true);
    try {
      await authApi.login({ email, password });
      router.replace("/(app)/home");
    } catch (err) {
      const message = err instanceof Error ? err.message : m.errorInvalidCredentials;
      Alert.alert("Error", message);
    }
    setLoading(false);
  }

  return (
    <ThemedView className="flex-1 flex-row justify-center">
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 24,
          maxWidth: 800,
          alignSelf: "center",
          width: "100%",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-center gap-2"
        >
          <ThemedText type="subtitle" className="mb-1">
            {m.titleLabel}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" className="mb-6">
            {m.subtitleLabel}
          </ThemedText>

          <ThemedView className="gap-4">
            <FormField
              label={m.emailLabel}
              placeholder={m.emailPlaceholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />

            <FormField
              label={m.passwordLabel}
              placeholder={m.passwordPlaceholder}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />

            <Pressable
              className={`bg-[#3c87f7] rounded-lg h-12 items-center justify-center mt-1 active:opacity-80 ${loading ? "opacity-80" : ""}`}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <ThemedText type="smallBold" style={{ color: "#ffffff" }}>
                  {m.loginButtonLabel}
                </ThemedText>
              )}
            </Pressable>

            <View className="flex-row justify-center gap-1 mt-2">
              <ThemedText type="small" themeColor="textSecondary">
                {m.noAccountLabel}
              </ThemedText>
              <Link href="/(auth)/register">
                <ThemedText type="linkPrimary">
                  {m.registerLinkLabel}
                </ThemedText>
              </Link>
            </View>
          </ThemedView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}
