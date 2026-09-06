import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PortfolioSummary {
  totalBalance: number;
  dailyChangePercent: number;
  dailyChangeAmount: number;
}

interface RecentTransaction {
  id: string;
  label: string;
  amount: number;
  type: "credit" | "debit";
  date: string;
}

// ─── Mock data (reemplazar con hook de datos real) ────────────────────────────

const PORTFOLIO: PortfolioSummary = {
  totalBalance: 12_450.75,
  dailyChangePercent: 1.23,
  dailyChangeAmount: 150.3,
};

const RECENT_TRANSACTIONS: RecentTransaction[] = [
  { id: "1", label: "Apple Inc.", amount: 320.0, type: "debit", date: "Hoy" },
  { id: "2", label: "Dividendo ETF", amount: 45.5, type: "credit", date: "Ayer" },
  { id: "3", label: "Tesla Inc.", amount: 210.0, type: "debit", date: "Lun" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PortfolioCard({ summary }: { summary: PortfolioSummary }) {
  const isPositive = summary.dailyChangePercent >= 0;
  const changeColor = isPositive ? "#22c55e" : "#ef4444";
  const changePrefix = isPositive ? "+" : "";

  return (
    <ThemedView
      type="backgroundElement"
      style={{ borderRadius: 16, padding: 24, marginBottom: 24 }}
    >
      <ThemedText type="small" themeColor="textSecondary">
        Portafolio total
      </ThemedText>
      <ThemedText type="title" style={{ marginTop: 4 }}>
        ${summary.totalBalance.toLocaleString("es-CO", { minimumFractionDigits: 2 })}
      </ThemedText>
      <ThemedText type="small" style={{ color: changeColor, marginTop: 6 }}>
        {changePrefix}
        {summary.dailyChangePercent}% ({changePrefix}$
        {summary.dailyChangeAmount.toFixed(2)}) hoy
      </ThemedText>
    </ThemedView>
  );
}

function TransactionRow({ tx }: { tx: RecentTransaction }) {
  const isCredit = tx.type === "credit";
  const amountColor = isCredit ? "#22c55e" : "#ef4444";
  const amountPrefix = isCredit ? "+" : "-";

  return (
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
      <ThemedView type="backgroundElement">
        <ThemedText type="smallBold">{tx.label}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {tx.date}
        </ThemedText>
      </ThemedView>
      <ThemedText type="smallBold" style={{ color: amountColor }}>
        {amountPrefix}${tx.amount.toFixed(2)}
      </ThemedText>
    </ThemedView>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText type="subtitle" style={{ marginTop: 32, marginBottom: 24 }}>
            Inicio
          </ThemedText>

          <PortfolioCard summary={PORTFOLIO} />

          <ThemedText type="smallBold" style={{ marginBottom: 12 }}>
            Recientes
          </ThemedText>
          {RECENT_TRANSACTIONS.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
