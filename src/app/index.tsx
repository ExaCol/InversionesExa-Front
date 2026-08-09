import { Redirect } from "expo-router";

export default function Index() {
  const isAuthenticated = false;

  return <Redirect href={isAuthenticated ? "/(app)/home" : "/(auth)/login"} />;
}
