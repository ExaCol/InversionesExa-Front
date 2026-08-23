import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { authApi, type CountryDto } from "@/api/auth";
import { CountrySelect } from "@/components/country-select";
import { FormField } from "@/components/form-field";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { messages } from "@/constants/messages";
import { useAuth } from "@/context/auth-context";

const m = messages.RegisterPage;
const common = messages.Common;

const STRONG_PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const [countries, setCountries] = useState<CountryDto[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  useEffect(() => {
    authApi
      .getCountries()
      .then(setCountries)
      .catch(() => Alert.alert("Error", common.errorLoadCountries))
      .finally(() => setLoadingCountries(false));
  }, []);

  async function handleRegister() {
    if (!fullName || !email || !password || !confirmPassword || !countryCode) {
      Alert.alert(m.errorRequiredTitle, m.errorRequiredMessage);
      return;
    }
    if (!STRONG_PASSWORD_REGEX.test(password)) {
      Alert.alert(m.errorPasswordShortTitle, m.errorPasswordShortMessage);
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(m.errorPasswordMismatchTitle, m.errorPasswordMismatchMessage);
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
      const tokens = await authApi.register(data);
      await signIn(tokens);
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

            <ThemedView className="gap-2">
              <FormField
                label={m.passwordLabel}
                placeholder={m.passwordPlaceholder}
                value={password}
                onChangeText={setPassword}
                isPassword
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
              <ThemedText type="small" themeColor="textSecondary">
                {m.passwordHintLabel}
              </ThemedText>
            </ThemedView>

            <FormField
              label={m.confirmPasswordLabel}
              placeholder={m.confirmPasswordPlaceholder}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isPassword
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />

            <ThemedView className="gap-2">
              <ThemedText type="smallBold">{m.countryLabel}</ThemedText>
              {loadingCountries ? (
                <ActivityIndicator />
              ) : (
                <CountrySelect
                  countries={countries}
                  value={countryCode}
                  onChange={setCountryCode}
                  placeholder={common.countrySelectPlaceholder}
                  searchPlaceholder={common.countrySearchPlaceholder}
                  emptyLabel={common.countryEmptyLabel}
                  disabled={loading}
                />
              )}
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
