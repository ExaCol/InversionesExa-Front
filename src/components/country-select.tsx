import { useMemo, useState } from "react";
import { FlatList, Modal, Pressable, TextInput, useColorScheme } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { CountryDto } from "@/api/auth";

type CountrySelectProps = {
  countries: CountryDto[];
  value: string;
  onChange: (countryCode: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyLabel?: string;
  disabled?: boolean;
};

export function CountrySelect({
  countries,
  value,
  onChange,
  placeholder = "Seleccioná un país",
  searchPlaceholder = "Buscar país...",
  emptyLabel = "No se encontraron países",
  disabled,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const colorScheme = useColorScheme();
  const placeholderColor = colorScheme === "dark" ? "#B0B4BA" : "#60646C";

  const selected = countries.find((c) => c.country_code === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.country_code.toLowerCase().includes(q),
    );
  }, [countries, query]);

  function handleSelect(countryCode: string) {
    onChange(countryCode);
    setQuery("");
    setOpen(false);
  }

  function handleClose() {
    setQuery("");
    setOpen(false);
  }

  return (
    <>
      <Pressable
        className="rounded-lg px-4 h-12 justify-center bg-app-element dark:bg-app-dark-element"
        onPress={() => !disabled && setOpen(true)}
        disabled={disabled}
      >
        <ThemedText themeColor={selected ? "text" : "textSecondary"}>
          {selected ? selected.name : placeholder}
        </ThemedText>
      </Pressable>

      <Modal
        visible={open}
        animationType="slide"
        transparent
        onRequestClose={handleClose}
      >
        <Pressable className="flex-1 bg-black/40" onPress={handleClose}>
          <Pressable
            className="mt-auto rounded-t-2xl p-4 bg-app-bg dark:bg-app-dark-bg"
            style={{ maxHeight: "70%" }}
            onPress={(e) => e.stopPropagation()}
          >
            <ThemedText type="smallBold" className="mb-3">
              {placeholder}
            </ThemedText>

            <ThemedView
              type="backgroundElement"
              className="rounded-lg px-4 h-12 justify-center mb-3"
            >
              <TextInput
                autoFocus
                value={query}
                onChangeText={setQuery}
                placeholder={searchPlaceholder}
                placeholderTextColor={placeholderColor}
                className="text-app-text dark:text-app-dark-text text-base"
              />
            </ThemedView>

            <FlatList
              data={filtered}
              keyExtractor={(item) => item.country_code}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <ThemedText
                  type="small"
                  themeColor="textSecondary"
                  className="py-4 text-center"
                >
                  {emptyLabel}
                </ThemedText>
              }
              renderItem={({ item }) => (
                <Pressable
                  className="py-3 border-b border-app-selected dark:border-app-dark-selected"
                  onPress={() => handleSelect(item.country_code)}
                >
                  <ThemedText>{item.name}</ThemedText>
                </Pressable>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
