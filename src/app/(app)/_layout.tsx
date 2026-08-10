import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/context/auth-context";

export default function AppLayout() {
  const { accessToken, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!accessToken) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}