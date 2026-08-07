import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/lib/supabase';

function translateAuthError(message: string): string {
  if (message.includes('already registered') || message.includes('already been registered')) {
    return 'Este email ya está registrado.';
  }
  if (message.includes('Password should be at least')) {
    return 'La contraseña debe tener al menos 6 caracteres.';
  }
  if (message.includes('Unable to validate email address')) {
    return 'El formato del email no es válido.';
  }
  if (message.includes('Email rate limit exceeded')) {
    return 'Demasiados intentos. Esperá unos minutos e intentá de nuevo.';
  }
  return message;
}

export default function RegisterScreen() {
  const theme = useTheme();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!fullName || !email || !password) {
      Alert.alert('Campos requeridos', 'Por favor completá todos los campos.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Contraseña muy corta', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    setLoading(false);

    if (error) {
      Alert.alert('Error al registrarse', translateAuthError(error.message));
      return;
    }

    Alert.alert('¡Registro exitoso!', 'Revisá tu email para confirmar tu cuenta.');
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}>
          <ThemedText type="subtitle" style={styles.title}>
            Crear cuenta
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
            Ingresá tus datos para registrarte
          </ThemedText>

          <ThemedView style={styles.form}>
            <ThemedView style={styles.field}>
              <ThemedText type="smallBold">Nombre completo</ThemedText>
              <ThemedView type="backgroundElement" style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="Juan Pérez"
                  placeholderTextColor={theme.textSecondary}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!loading}
                />
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.field}>
              <ThemedText type="smallBold">Email</ThemedText>
              <ThemedView type="backgroundElement" style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="juan@email.com"
                  placeholderTextColor={theme.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.field}>
              <ThemedText type="smallBold">Contraseña</ThemedText>
              <ThemedView type="backgroundElement" style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="••••••••"
                  placeholderTextColor={theme.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              </ThemedView>
            </ThemedView>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                (pressed || loading) && styles.buttonPressed,
              ]}
              onPress={handleRegister}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <ThemedText type="smallBold" style={styles.buttonText}>
                  Registrarse
                </ThemedText>
              )}
            </Pressable>
          </ThemedView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}


const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea :{
    flex: 1,
    paddingHorizontal: Spacing.four,
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    width: '100%',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.two,
  },
  title: {
    marginBottom: Spacing.one,
  },
  subtitle: {
    marginBottom: Spacing.four,
  },
  form: {
    gap: Spacing.three,
  },
  field:{
    gap: Spacing.two,
  },
  inputWrapper: {
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    height: 48,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },

  button: {
    backgroundColor: '#3c87f7',
    borderRadius: Spacing.two,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.one,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#ffffff',
  }
})


