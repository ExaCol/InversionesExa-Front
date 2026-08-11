import { ActivityIndicator, Pressable, type PressableProps } from "react-native";

import { ThemedText } from "@/components/themed-text";

export type ButtonVariant = "primary" | "secondary" | "success" | "danger" | "outline";

export type ButtonProps = Omit<PressableProps, "children"> & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  className?: string;
};

const containerClasses: Record<ButtonVariant, string> = {
  primary: "bg-yellow",
  secondary: "bg-red",
  success: "bg-blue",
  danger: "bg-vanilla",
  outline: "bg-transparent border border-app-selected dark:border-app-dark-selected",
};

const spinnerColor: Record<ButtonVariant, string> = {
  primary: "#ffffff",
  secondary: "#ffffff",
  success: "#ffffff",
  danger: "#ffffff",
  outline: "#3c87f7",
};

const labelStyle: Record<ButtonVariant, { color: string } | undefined> = {
  primary: { color: "#ffffff" },
  secondary: { color: "#ffffff" },
  success: { color: "#ffffff" },
  danger: { color: "#ffffff" },
  outline: undefined,
};

export function Button({
  label,
  variant = "primary",
  loading = false,
  disabled,
  className,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      className={`rounded-lg h-12 items-center justify-center active:opacity-80 ${containerClasses[variant]} ${loading ? "opacity-80" : ""} ${className ?? ""}`.trim()}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor[variant]} />
      ) : (
        <ThemedText type="smallBold" style={labelStyle[variant]}>
          {label}
        </ThemedText>
      )}
    </Pressable>
  );
}
