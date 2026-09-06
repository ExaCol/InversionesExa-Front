import { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

// ─── Types ────────────────────────────────────────────────────────────────────

type TransactionFilter = "Todos" | "Entradas" | "Salidas";

type TransactionStatus = "completed" | "pending" | "failed";

interface Transaction {
  id: string;
  label: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  status: TransactionStatus;
  date: string;
}

// ─── Mock data (reemplazar con hook de datos real) ────────────────────────────

const TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    label: "Apple Inc.",
    description: "Compra 2 acciones",
    amount: 378.6,
    type: "debit",
    status: "completed",
    date: "Hoy",
  },
  {
    id: "2",
    label: "Dividendo ETF",
    description: "SPY Q2 2025",
    amount: 45.5,
    type: "credit",
    status: "completed",
    date: "Hoy",
  },
  {
    id: "3",
    label: "Tesla Inc.",
    description: "Compra 1 acción",
    amount: 210.0,
    type: "debit",
    status: "pending",
    date: "Ayer",
  },
  {
    id: "4",
    label: "Depósito",
    description: "Transferencia bancaria",
    amount: 1_000.0,
    type: "credit",
    status: "completed",
    date: "Lun 2 sep",
  },
  {
    id: "5",
    label: "Bitcoin",
    description: "Compra 0.003 BTC",
    amount: 201.6,
    type: "debit",
    status: "failed",
    date: "Lun 2 sep",
  },
];

const FILTERS: TransactionFilter[] = ["Todos", "Entradas", "Salidas"];

const STATUS_LABEL: Record<TransactionStatus, string> = {
  completed: "Completada",
  pending: "Pendiente",
  failed: "Fallida",
};

const STATUS_COLOR: Record<TransactionStatus, string> = {
  completed: "#22c55e",
  pending: "#f59e0b",
  failed: "#ef4444",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function TransactionRow({ tx }: { readonly tx: Transaction }) {
  const isCredit = tx.type === "credit";
  const amountColor = isCredit ? "#22c55e" : "#ef4444";
  const amountPrefix = isCredit ? "+" : "-";

  return (
    <ThemedView
      type="backgroundElement"
      style={{
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ThemedView type="backgroundElement" style={{ flex: 1, marginRight: 12 }}>
        <ThemedText type="smallBold">{tx.label}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {tx.description}
        </ThemedText>
        <ThemedText
          type="small"
          style={{ color: STATUS_COLOR[tx.status], marginTop: 2 }}
        >
          {STATUS_LABEL[tx.status]}
        </ThemedText>
      </ThemedView>
      <ThemedView type="backgroundElement" style={{ alignItems: "flex-end" }}>
        <ThemedText type="smallBold" style={{ color: amountColor }}>
          {amountPrefix}${tx.amount.toFixed(2)}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {tx.date}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  readonly label: string;
  readonly active: boolean;
  readonly onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 2,
        borderBottomColor: active ? "#3c87f7" : "transparent",
      }}
    >
      <ThemedText
        type="small"
        style={{ color: active ? "#3c87f7" : undefined }}
        themeColor={active ? undefined : "textSecondary"}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function HistoryScreen() {
  const [activeFilter, setActiveFilter] =
    useState<TransactionFilter>("Todos");

  const filtered = TRANSACTIONS.filter((tx) => {
    if (activeFilter === "Entradas") return tx.type === "credit";
    if (activeFilter === "Salidas") return tx.type === "debit";
    return true;
  });

  return (
    <ThemedView className="flex-1">
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedView style={{ paddingHorizontal: 24 }}>
          <ThemedText type="subtitle" style={{ marginTop: 32, marginBottom: 16 }}>
            Historial
          </ThemedText>

          {/* Filter tabs */}
          <ThemedView
            type="backgroundElement"
            style={{
              flexDirection: "row",
              borderRadius: 12,
              marginBottom: 16,
              overflow: "hidden",
            }}
          >
            {FILTERS.map((f) => (
              <FilterChip
                key={f}
                label={f}
                active={f === activeFilter}
                onPress={() => setActiveFilter(f)}
              />
            ))}
          </ThemedView>
        </ThemedView>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionRow tx={item} />}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </ThemedView>
  );
}
