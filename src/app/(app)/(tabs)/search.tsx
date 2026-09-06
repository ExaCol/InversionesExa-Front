import { useState } from "react";
import { FlatList, Pressable, TextInput, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

// ─── Types ────────────────────────────────────────────────────────────────────

type AssetCategory = "Todos" | "Acciones" | "ETFs" | "Cripto";

interface Asset {
  id: string;
  ticker: string;
  name: string;
  price: number;
  changePercent: number;
  category: Exclude<AssetCategory, "Todos">;
}

// ─── Mock data (reemplazar con hook de datos real) ────────────────────────────

const ASSETS: Asset[] = [
  { id: "1", ticker: "AAPL", name: "Apple Inc.", price: 189.3, changePercent: 1.2, category: "Acciones" },
  { id: "2", ticker: "MSFT", name: "Microsoft Corp.", price: 415.5, changePercent: -0.4, category: "Acciones" },
  { id: "3", ticker: "SPY", name: "S&P 500 ETF", price: 521.0, changePercent: 0.8, category: "ETFs" },
  { id: "4", ticker: "BTC", name: "Bitcoin", price: 67_200.0, changePercent: 2.1, category: "Cripto" },
  { id: "5", ticker: "ETH", name: "Ethereum", price: 3_450.0, changePercent: -1.3, category: "Cripto" },
  { id: "6", ticker: "QQQ", name: "Nasdaq 100 ETF", price: 448.7, changePercent: 0.5, category: "ETFs" },
];

const CATEGORIES: AssetCategory[] = ["Todos", "Acciones", "ETFs", "Cripto"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function AssetRow({ asset }: { readonly asset: Asset }) {
  const isPositive = asset.changePercent >= 0;
  const changeColor = isPositive ? "#22c55e" : "#ef4444";
  const changePrefix = isPositive ? "+" : "";

  return (
    <Pressable>
      <ThemedView
        type="backgroundElement"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
          borderRadius: 12,
          marginBottom: 8,
        }}
      >
        <ThemedView type="backgroundElement" style={{ flex: 1 }}>
          <ThemedText type="smallBold">{asset.ticker}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
            {asset.name}
          </ThemedText>
        </ThemedView>
        <ThemedView
          type="backgroundElement"
          style={{ alignItems: "flex-end" }}
        >
          <ThemedText type="smallBold">
            ${asset.price.toLocaleString("es-CO", { minimumFractionDigits: 2 })}
          </ThemedText>
          <ThemedText type="small" style={{ color: changeColor }}>
            {changePrefix}
            {asset.changePercent}%
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<AssetCategory>("Todos");
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const filtered = ASSETS.filter((a) => {
    const matchesCategory =
      activeCategory === "Todos" || a.category === activeCategory;
    const matchesQuery =
      query.trim() === "" ||
      a.ticker.toLowerCase().includes(query.toLowerCase()) ||
      a.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <ThemedView className="flex-1">
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedView style={{ paddingHorizontal: 24 }}>
          <ThemedText type="subtitle" style={{ marginTop: 32, marginBottom: 16 }}>
            Buscar
          </ThemedText>

          {/* Search input */}
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Ticker o nombre..."
            placeholderTextColor={isDark ? "#B0B4BA" : "#60646C"}
            style={{
              backgroundColor: isDark ? "#212225" : "#F0F0F3",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
              color: isDark ? "#ffffff" : "#000000",
              fontSize: 14,
              marginBottom: 16,
            }}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
          />

          {/* Category chips */}
          <ThemedView
            style={{
              flexDirection: "row",
              gap: 8,
              marginBottom: 16,
            }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setActiveCategory(cat)}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 6,
                    borderRadius: 20,
                    backgroundColor: isActive
                      ? "#3c87f7"
                      : isDark
                        ? "#212225"
                        : "#F0F0F3",
                  }}
                >
                  <ThemedText
                    type="small"
                    style={{ color: isActive ? "#ffffff" : isDark ? "#B0B4BA" : "#60646C" }}
                  >
                    {cat}
                  </ThemedText>
                </Pressable>
              );
            })}
          </ThemedView>
        </ThemedView>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AssetRow asset={item} />}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </SafeAreaView>
    </ThemedView>
  );
}
