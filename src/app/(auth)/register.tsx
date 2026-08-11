import { router } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { authApi } from "@/api/auth";
import { Button } from "@/components/button";
import { FormField } from "@/components/form-field";
import { ThemedSelect } from "@/components/themed-select";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { messages } from "@/constants/messages";

const m = messages.RegisterPage;

function getCountryOptions() {
  return [
    { label: "Colombia", value: "CO" },
    { label: "USA", value: "US" },
  ];
}

export default function RegisterScreen() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("CO");

  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!fullName || !email || !password || !countryCode) {
      Alert.alert(m.errorRequiredTitle, m.errorRequiredMessage);
      return;
    }
    if (password.length < 6) {
      Alert.alert(m.errorPasswordShortTitle, m.errorPasswordShortMessage);
      return;
    }
    const data = {
      fullName: fullName,
      email: email,
      password: password,
      countryCode: countryCode,
    };

    setLoading(true);
    try {
      await authApi.register(data);
      router.replace("/(app)/home");
    } catch (err) {
      const message = err instanceof Error ? err.message : m.errorAlreadyRegistered;
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
            {m.createAccountLabel}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" className="mb-6">
            {m.subtitleLabel}
          </ThemedText>

          <ThemedView className="gap-4">
            <FormField
              label={m.fullNameLabel}
              placeholder={m.fullNamePlaceholder}
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              autoCorrect={false}
              editable={!loading}
            />

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

            <ThemedView className="gap-2">
              <ThemedText type="smallBold">{m.countryLabel}</ThemedText>
              <ThemedView
                type="backgroundElement"
                className="rounded-lg px-4 h-12 justify-center"
              >
                <ThemedSelect
                  options={getCountryOptions()}
                  value={countryCode}
                  onChange={setCountryCode}
                />
              </ThemedView>
            </ThemedView>

            <Button
              className="mt-1"
              label={m.registerButtonLabel}
              onPress={handleRegister}
              loading={loading}
            />
          </ThemedView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}
