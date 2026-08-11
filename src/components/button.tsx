import { useUnstableNativeVariable } from "nativewind";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  type PressableProps,
} from "react-native";

import { ThemedText } from "@/components/themed-text";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "outline";

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
  outline:
    "bg-transparent border border-app-selected dark:border-app-dark-selected",
};

const labelClasses: Record<ButtonVariant, string> = {
  primary: "text-white",
  secondary: "text-white",
  success: "text-white",
  danger: "text-white",
  outline: "",
};

const spinnerVariable: Record<ButtonVariant, `--${string}`> = {
  primary: "--color-white",
  secondary: "--color-white",
  success: "--color-white",
  danger: "--color-white",
  outline: "--color-yellow",
};

function useCssVariableColor(name: `--${string}`) {
  const nativeValue = useUnstableNativeVariable(name);
  return Platform.OS === "web" ? `var(${name})` : nativeValue;
}

export function Button({
  label,
  variant = "primary",
  loading = false,
  disabled,
  className,
  ...rest
}: ButtonProps) {
  const spinnerColor = useCssVariableColor(spinnerVariable[variant]);

  return (
    <Pressable
      className={`rounded-lg h-12 items-center justify-center transition-transform duration-100 ease-out hover:scale-105 active:opacity-80 ${containerClasses[variant]} ${loading ? "opacity-80" : ""} ${className ?? ""}`.trim()}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <ThemedText type="smallBold" className={labelClasses[variant]}>
          {label}
        </ThemedText>
      )}
    </Pressable>
  );
}
