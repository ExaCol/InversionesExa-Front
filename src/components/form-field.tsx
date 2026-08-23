import { useState } from "react";
import { Pressable, useColorScheme, TextInput, type TextInputProps } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

type FormFieldProps = TextInputProps & {
  label: string;
  isPassword?: boolean;
};

export function FormField({
  label,
  isPassword,
  secureTextEntry,
  ...inputProps
}: FormFieldProps) {
  const colorScheme = useColorScheme();
  const placeholderColor = colorScheme === "dark" ? "#B0B4BA" : "#60646C";
  const [visible, setVisible] = useState(false);

  return (
    <ThemedView className="gap-2">
      <ThemedText type="smallBold">{label}</ThemedText>
      <ThemedView
        type="backgroundElement"
        className="rounded-lg px-4 h-12 flex-row items-center"
      >
        <TextInput
          className="flex-1 text-app-text dark:text-app-dark-text text-base leading-6 font-medium"
          placeholderTextColor={placeholderColor}
          {...inputProps}
          secureTextEntry={isPassword ? !visible : secureTextEntry}
        />
        {isPassword && (
          <Pressable onPress={() => setVisible((v) => !v)} hitSlop={8} className="pl-2">
            <ThemedText type="small" themeColor="textSecondary">
              {visible ? "Ocultar" : "Mostrar"}
            </ThemedText>
          </Pressable>
        )}
      </ThemedView>
    </ThemedView>
  );
}
