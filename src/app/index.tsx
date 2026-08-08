import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { authApi } from "@/api/auth";
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
  const colorScheme = useColorScheme();
  const placeholderColor = colorScheme === "dark" ? "#B0B4BA" : "#60646C";

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

    console.log(data);

    setLoading(true);
    try {
      await authApi.register(data);
    } catch (err) {
      console.log("error registrando usuario");
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
            <ThemedView className="gap-2">
              <ThemedText type="smallBold">{m.fullNameLabel}</ThemedText>
              <ThemedView
                type="backgroundElement"
                className="rounded-lg px-4 h-12 justify-center"
              >
                <TextInput
                  className="text-app-text dark:text-app-dark-text text-base leading-6 font-medium"
                  placeholder={m.fullNamePlaceholder}
                  placeholderTextColor={placeholderColor}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!loading}
                />
              </ThemedView>
            </ThemedView>

            <ThemedView className="gap-2">
              <ThemedText type="smallBold">{m.emailLabel}</ThemedText>
              <ThemedView
                type="backgroundElement"
                className="rounded-lg px-4 h-12 justify-center"
              >
                <TextInput
                  className="text-app-text dark:text-app-dark-text text-base leading-6 font-medium"
                  placeholder={m.emailPlaceholder}
                  placeholderTextColor={placeholderColor}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              </ThemedView>
            </ThemedView>

            <ThemedView className="gap-2">
              <ThemedText type="smallBold">{m.passwordLabel}</ThemedText>
              <ThemedView
                type="backgroundElement"
                className="rounded-lg px-4 h-12 justify-center"
              >
                <TextInput
                  className="text-app-text dark:text-app-dark-text text-base leading-6 font-medium"
                  placeholder={m.passwordPlaceholder}
                  placeholderTextColor={placeholderColor}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              </ThemedView>
            </ThemedView>

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

            <Pressable
              className={`bg-[#3c87f7] rounded-lg h-12 items-center justify-center mt-1 active:opacity-80 ${loading ? "opacity-80" : ""}`}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <ThemedText type="smallBold" style={{ color: "#ffffff" }}>
                  {m.registerButtonLabel}
                </ThemedText>
              )}
            </Pressable>
          </ThemedView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}
