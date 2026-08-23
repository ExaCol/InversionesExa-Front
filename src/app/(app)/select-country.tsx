import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { authApi, type CountryDto } from "@/api/auth";
import { userApi } from "@/api/user";
import { CountrySelect } from "@/components/country-select";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { messages } from "@/constants/messages";
import { useAuth } from "@/context/auth-context";

const m = messages.SelectCountryPage;
const common = messages.Common;

export default function SelectCountryScreen() {
  const { accessToken } = useAuth();

  const [countries, setCountries] = useState<CountryDto[]>([]);
  const [countryCode, setCountryCode] = useState("");
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    authApi
      .getCountries()
      .then(setCountries)
      .catch(() => Alert.alert("Error", common.errorLoadCountries))
      .finally(() => setLoadingCountries(false));
  }, []);

  async function handleContinue() {
    if (!countryCode || !accessToken) {
      Alert.alert(m.errorCountryRequiredTitle, m.errorCountryRequiredMessage);
      return;
    }

    setSaving(true);
    try {
      await userApi.updateCountry(accessToken, countryCode);
      router.replace("/(app)/home");
    } catch (err) {
      const message = err instanceof Error ? err.message : m.errorSaveCountry;
      Alert.alert("Error", message);
    }
    setSaving(false);
  }

  return (
    <ThemedView className="flex-1">
      <SafeAreaView
        style={{ flex: 1, paddingHorizontal: 24, justifyContent: "center", gap: 16 }}
      >
        <ThemedText type="subtitle" className="mb-1">
          {m.titleLabel}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary" className="mb-4">
          {m.subtitleLabel}
        </ThemedText>

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
            disabled={saving}
          />
        )}

        <Pressable
          className={`bg-[#3c87f7] rounded-lg h-12 items-center justify-center mt-4 active:opacity-80 ${saving ? "opacity-80" : ""}`}
          onPress={handleContinue}
          disabled={saving || loadingCountries}
        >
          {saving ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <ThemedText type="smallBold" style={{ color: "#ffffff" }}>
              {m.continueButtonLabel}
            </ThemedText>
          )}
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}
