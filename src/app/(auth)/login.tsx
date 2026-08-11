import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { authApi } from "@/api/auth";
import { Button } from "@/components/button";
import { FormField } from "@/components/form-field";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { messages } from "@/constants/messages";
import { useAuth } from "@/context/auth-context";
import { useGoogleAuth } from "@/hooks/use-google-auth";

const m = messages.LoginPage;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { signIn } = useAuth();

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert(m.errorRequiredTitle, m.errorRequiredMessage);
      return;
    }

    setLoading(true);
    try {
      const tokens = await authApi.login({ email, password });
      await signIn(tokens);
      router.replace("/(app)/home");
    } catch (err) {
      const message = err instanceof Error ? err.message : m.errorInvalidCredentials;
      Alert.alert("Error", message);
    }
    setLoading(false);
  }

  async function handleGoogleLoginSuccess(idToken: string) {
    setGoogleLoading(true);
    try {
      const tokens = await authApi.loginWithGoogle({ idToken });
      await signIn(tokens);
      router.replace("/(app)/home");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al iniciar sesión con Google";
      Alert.alert("Error", message);
    }
    setGoogleLoading(false);
  }

  const { request, promptAsync } = useGoogleAuth(handleGoogleLoginSuccess);

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

            <Button
              className="mt-1"
              label={m.loginButtonLabel}
              onPress={handleLogin}
              loading={loading}
            />

            <Button
              className="mt-1"
              variant="outline"
              label="Continuar con Google"
              onPress={() => promptAsync()}
              loading={googleLoading}
              disabled={!request || loading}
            />

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