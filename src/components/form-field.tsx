import { useColorScheme, TextInput, type TextInputProps } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

type FormFieldProps = TextInputProps & {
  label: string;
};

export function FormField({ label, ...inputProps }: FormFieldProps) {
  const colorScheme = useColorScheme();
  const placeholderColor = colorScheme === "dark" ? "#B0B4BA" : "#60646C";

  return (
    <ThemedView className="gap-2">
      <ThemedText type="smallBold">{label}</ThemedText>
      <ThemedView
        type="backgroundElement"
        className="rounded-lg px-4 h-12 justify-center"
      >
        <TextInput
          className="text-app-text dark:text-app-dark-text text-base leading-6 font-medium"
          placeholderTextColor={placeholderColor}
          {...inputProps}
        />
      </ThemedView>
    </ThemedView>
  );
}
