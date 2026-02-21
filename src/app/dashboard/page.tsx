import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import TransactionList from "@/app/dashboard/components/TransactionList";
import AddTransaction from "./components/AddTransaction";
import SpendingChart from "./components/SpendingChart";
import styles from "./Dashboard.module.scss";
import Navbar from "@/app/dashboard/components/Navbar";

// 1. IMPORT RECHARTS
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

type Transaction = {
  id: string;
  description: string;
  amount: number;
  bucket: "SPENDING" | "EMERGENCY" | "MISSION" | "";
  direction: "IN" | "OUT";
  createdAt: Date;
  userId: string;
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  if (!authUser) return <div className={styles.error}>Please log in.</div>;

  const dbUser = await prisma.user.findUnique({
    where: { id: authUser.id },
    include: {
      onboarding: true,
      transactions: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!dbUser || !dbUser.onboarding)
    return <div className={styles.error}>Setup required.</div>;

  const { onboarding, transactions: rawTransactions } = dbUser;

  const transactions: Transaction[] = rawTransactions as any; // type-safe cast

  const fmt = (v: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: onboarding.currency || "USD",
    }).format(v);

  // --- 1. THE PLAN MATH ---
  const billsArray = JSON.parse(onboarding.bills || "[]");
  const totalBills = billsArray.reduce(
    (acc: number, b: any) => acc + (b?.amount || 0),
    0
  );
  const leftOver =
    (onboarding.monthlyIncome || 0) -
    totalBills -
    (onboarding.monthlyContribution || 0);

  const dailySafeLimit = (leftOver * 0.8) / 30;
  const monthlyBufferBase = leftOver * 0.2;

  const now = new Date();
  const isToday = (createdAt: Date) => {
    const d = new Date(createdAt);
    return (
      d.getUTCDate() === now.getUTCDate() &&
      d.getUTCMonth() === now.getUTCMonth() &&
      d.getUTCFullYear() === now.getUTCFullYear()
    );
  };

  // --- 2. BUCKET BALANCES ---
  const emergencyBalance = transactions
    .filter((t) => t.bucket === "EMERGENCY")
    .reduce(
      (acc, t) => (t.direction === "IN" ? acc + t.amount : acc - t.amount),
      0
    );

  const emergencyGiftsFallback = transactions
    .filter((t) => !t.bucket && t.direction === "IN")
    .reduce((acc, t) => acc + t.amount, 0);

  const finalEmergencyBalance =
    transactions.filter((t) => t.bucket === "EMERGENCY").length > 0
      ? emergencyBalance
      : monthlyBufferBase + emergencyGiftsFallback;

  const missionBalance = transactions
    .filter((t) => t.bucket === "MISSION")
    .reduce(
      (acc, t) => (t.direction === "IN" ? acc + t.amount : acc - t.amount),
      0
    );

  const spentToday = transactions
    .filter(
      (t) =>
        t.bucket === "SPENDING" && t.direction === "OUT" && isToday(t.createdAt)
    )
    .reduce((acc, t) => acc + t.amount, 0);

  const currentSafeToSpend = Math.max(0, dailySafeLimit - spentToday);

  const missionGoal = onboarding.missionGoal || 0;
  const missionProgressPercent =
    missionGoal > 0
      ? Math.min(100, Math.round((missionBalance / missionGoal) * 100))
      : 0;

  // --- 3. CHART DATA ---
  const chartData = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dayLabel = d.toLocaleDateString("en-US", { weekday: "short" });

    const dailyTotal = transactions
      .filter(
        (t) =>
          t.bucket === "SPENDING" &&
          t.direction === "OUT" &&
          new Date(t.createdAt).toDateString() === d.toDateString()
      )
      .reduce((acc, t) => acc + t.amount, 0);

    return { name: dayLabel, spent: dailyTotal };
  });

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h1>Welcome, {dbUser.name}</h1>
            <div className={styles.statusPill}>
              <span></span> Live Tracking
            </div>
          </div>
          <p>
            {now.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <div className={styles.grid}>
          {/* Safe to Spend */}
          <section className={styles.heroCard}>
            <div className={styles.heroContent}>
              <h3>Safe to Spend Today</h3>
              <h2 className={styles.mainAmount}>{fmt(currentSafeToSpend)}</h2>
              <div className={styles.limitBar}>
                <div
                  className={styles.limitFill}
                  style={{
                    width: `${
                      (currentSafeToSpend / (dailySafeLimit || 1)) * 100
                    }%`,
                  }}
                />
              </div>
              <span className={styles.percentageBadge}>
                {Math.round((currentSafeToSpend / (dailySafeLimit || 1)) * 100)}
                % left
              </span>
            </div>
          </section>

          {/* Action Center */}
          <section className={styles.actionCard}>
            <AddTransaction />
          </section>

          {/* Buckets */}
          <section className={styles.bucketGrid}>
            <div className={styles.bucketCard}>
              <h4>Emergency Fund</h4>
              <p className={styles.successText}>{fmt(finalEmergencyBalance)}</p>
              {transactions.filter((t) => t.bucket === "EMERGENCY").length ===
                0 && (
                <small style={{ color: "#777" }}>
                  This amount is inferred. Tag deposits as Emergency to make it
                  explicit.
                </small>
              )}
            </div>

            <div className={styles.bucketCard}>
              <h4>Goal / Mission</h4>
              <p className={styles.blueText}>{fmt(missionBalance)}</p>
            </div>
          </section>

          {/* Goal Progress */}
          <section className={styles.goalCard}>
            <div className={styles.goalHeader}>
              <h3>{onboarding.missionTitle}</h3>
              <span>{missionProgressPercent}%</span>
            </div>
            <div className={styles.goalTrack}>
              <div
                className={styles.goalFill}
                style={{ width: `${missionProgressPercent}%` }}
              />
            </div>
            <p>Goal: {fmt(missionGoal)}</p>
            <p>Saved: {fmt(missionBalance)}</p>
          </section>

          {/* Recent Activity */}
          <section className={styles.historyCard}>
            <h3>Recent Activity</h3>
            <TransactionList transactions={transactions.slice(0, 5)} />
          </section>

          {/* Weekly Chart */}
          <section className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h3>Weekly Spending</h3>
              <p>Dotted line: {fmt(dailySafeLimit)}</p>
            </div>
            <SpendingChart
              chartData={chartData}
              dailySafeLimit={dailySafeLimit}
            />
          </section>
        </div>
      </main>
    </>
  );
}
