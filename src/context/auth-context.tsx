import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const storage = {
  getItem: (key: string) =>
    Platform.OS === "web"
      ? AsyncStorage.getItem(key)
      : SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) =>
    Platform.OS === "web"
      ? AsyncStorage.setItem(key, value)
      : SecureStore.setItemAsync(key, value),
  deleteItem: (key: string) =>
    Platform.OS === "web"
      ? AsyncStorage.removeItem(key)
      : SecureStore.deleteItemAsync(key),
};

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextValue {
  accessToken: string | null;
  isLoading: boolean;
  signIn: (tokens: AuthTokens) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStoredToken() {
      const storedToken = await storage.getItem("accessToken");
      if (storedToken) {
        setAccessToken(storedToken);
      }
      setIsLoading(false);
    }
    loadStoredToken();
  }, []);

  async function signIn(tokens: AuthTokens) {
    await storage.setItem("accessToken", tokens.accessToken);
    await storage.setItem("refreshToken", tokens.refreshToken);
    setAccessToken(tokens.accessToken);
  }

  async function signOut() {
    await storage.deleteItem("accessToken");
    await storage.deleteItem("refreshToken");
    setAccessToken(null);
  }

  return (
    <AuthContext.Provider value={{ accessToken, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}