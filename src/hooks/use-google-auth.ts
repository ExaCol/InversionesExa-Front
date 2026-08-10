import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

export function useGoogleAuth(onSuccess: (idToken: string) => void) {
  async function promptAsync() {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;
      if (idToken) {
        onSuccess(idToken);
      }
    } catch (error) {
      console.error("Error en Google Sign-In:", error);
    }
  }

  return { request: true, promptAsync };
}